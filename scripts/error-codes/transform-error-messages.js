/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const fs = require('fs');
const {
  evalStringConcat,
  evalStringAndTemplateConcat,
} = require('../shared/evalToString');
const invertObject = require('./invertObject');
const helperModuleImports = require('@babel/helper-module-imports');

const errorMap = invertObject(
  JSON.parse(fs.readFileSync(__dirname + '/codes.json', 'utf-8'))
);

const SEEN_SYMBOL = Symbol('transform-error-messages.seen');

module.exports = function(babel) {
  const t = babel.types;

  // TODO: Instead of outputting __DEV__ conditions, only apply this transform
  // in production.
  const DEV_EXPRESSION = t.identifier('__DEV__');

  function CallOrNewExpression(path, file) {
    // Turns this code:
    //
    // new Error(`A ${adj} message that contains ${noun}`);
    //
    // or this code (no constructor):
    //
    // Error(`A ${adj} message that contains ${noun}`);
    //
    // into this:
    //
    // Error(
    //   __DEV__
    //     ? `A ${adj} message that contains ${noun}`
    //     : formatProdErrorMessage(ERR_CODE, adj, noun)
    // );
    const node = path.node;
    if (node[SEEN_SYMBOL]) {
      return;
    }
    node[SEEN_SYMBOL] = true;

    const errorMsgNode = node.arguments[0];
    if (errorMsgNode === undefined) {
      return;
    }

    const errorMsgExpressions = [];
    const errorMsgLiteral = evalStringAndTemplateConcat(
      errorMsgNode,
      errorMsgExpressions
    );

    let prodErrorId = errorMap[errorMsgLiteral];
    if (prodErrorId === undefined) {
      // There is no error code for this message. Add an inline comment
      // that flags this as an unminified error. This allows the build
      // to proceed, while also allowing a post-build linter to detect it.
      //
      // Outputs:
      //   /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
      //   if (!condition) {
      //     throw Error(`A ${adj} message that contains ${noun}`);
      //   }

      const statementParent = path.getStatementParent();
      const leadingComments = statementParent.node.leadingComments;
      if (leadingComments !== undefined) {
        for (let i = 0; i < leadingComments.length; i++) {
          // TODO: Since this only detects one of many ways to disable a lint
          // rule, we should instead search for a custom directive (like
          // no-minify-errors) instead of ESLint. Will need to update our lint
          // rule to recognize the same directive.
          const commentText = leadingComments[i].value;
          if (
            commentText.includes(
              'eslint-disable-next-line react-internal/prod-error-codes'
            )
          ) {
            return;
          }
        }
      }

      statementParent.addComment(
        'leading',
        'FIXME (minify-errors-in-prod): Unminified error message in production build!'
      );
      return;
    }
    prodErrorId = parseInt(prodErrorId, 10);

    // Import formatProdErrorMessage
    const formatProdErrorMessageIdentifier = helperModuleImports.addDefault(
      path,
      'shared/formatProdErrorMessage',
      {nameHint: 'formatProdErrorMessage'}
    );

    // Outputs:
    //   formatProdErrorMessage(ERR_CODE, adj, noun);
    const prodMessage = t.callExpression(formatProdErrorMessageIdentifier, [
      t.numericLiteral(prodErrorId),
      ...errorMsgExpressions,
    ]);

    // Outputs:
    // Error(
    //   __DEV__
    //     ? `A ${adj} message that contains ${noun}`
    //     : formatProdErrorMessage(ERR_CODE, adj, noun)
    // );
    const newErrorCall = t.callExpression(t.identifier('Error'), [
      t.conditionalExpression(DEV_EXPRESSION, errorMsgNode, prodMessage),
    ]);
    newErrorCall[SEEN_SYMBOL] = true;
    path.replaceWith(newErrorCall);
  }

  return {
    visitor: {
      NewExpression(path, file) {
        const noMinify = file.opts.noMinify;
        if (!noMinify && path.get('callee').isIdentifier({name: 'Error'})) {
          CallOrNewExpression(path, file);
        }
      },

      CallExpression(path, file) {
        const node = path.node;
        const noMinify = file.opts.noMinify;

        if (!noMinify && path.get('callee').isIdentifier({name: 'Error'})) {
          CallOrNewExpression(path, file);
          return;
        }

        if (path.get('callee').isIdentifier({name: 'invariant'})) {
          // Turns this code:
          //
          // invariant(condition, 'A %s message that contains %s', adj, noun);
          //
          // into this:
          //
          // if (!condition) {
          //   throw Error(
          //     __DEV__
          //       ? `A ${adj} message that contains ${noun}`
          //       : formatProdErrorMessage(ERR_CODE, adj, noun)
          //   );
          // }
          //
          // where ERR_CODE is an error code: a unique identifier (a number
          // string) that references a verbose error message. The mapping is
          // stored in `scripts/error-codes/codes.json`.
          const condition = node.arguments[0];
          const errorMsgLiteral = evalStringConcat(node.arguments[1]);
          const errorMsgExpressions = Array.from(node.arguments.slice(2));
          const errorMsgQuasis = errorMsgLiteral
            .split('%s')
            .map(raw => t.templateElement({raw, cooked: String.raw({raw})}));

          // Outputs:
          //   `A ${adj} message that contains ${noun}`;
          const devMessage = t.templateLiteral(
            errorMsgQuasis,
            errorMsgExpressions
          );

          const parentStatementPath = path.parentPath;
          if (parentStatementPath.type !== 'ExpressionStatement') {
            throw path.buildCodeFrameError(
              'invariant() cannot be called from expression context. Move ' +
                'the call to its own statement.'
            );
          }

          if (noMinify) {
            // Error minification is disabled for this build.
            //
            // Outputs:
            //   if (!condition) {
            //     throw Error(`A ${adj} message that contains ${noun}`);
            //   }
            const errorCallNode = t.callExpression(t.identifier('Error'), [
              devMessage,
            ]);
            errorCallNode[SEEN_SYMBOL] = true;
            parentStatementPath.replaceWith(
              t.ifStatement(
                t.unaryExpression('!', condition),
                t.blockStatement([t.throwStatement(errorCallNode)])
              )
            );

            return;
          }

          let prodErrorId = errorMap[errorMsgLiteral];

          if (prodErrorId === undefined) {
            // There is no error code for this message. Add an inline comment
            // that flags this as an unminified error. This allows the build
            // to proceed, while also allowing a post-build linter to detect it.
            //
            // Outputs:
            //   /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
            //   if (!condition) {
            //     throw Error(`A ${adj} message that contains ${noun}`);
            //   }
            const errorCall = t.callExpression(t.identifier('Error'), [
              devMessage,
            ]);
            errorCall[SEEN_SYMBOL] = true;
            parentStatementPath.replaceWith(
              t.ifStatement(
                t.unaryExpression('!', condition),
                t.blockStatement([t.throwStatement(errorCall)])
              )
            );
            parentStatementPath.addComment(
              'leading',
              'FIXME (minify-errors-in-prod): Unminified error message in production build!'
            );
            return;
          }
          prodErrorId = parseInt(prodErrorId, 10);

          // Import formatProdErrorMessage
          const formatProdErrorMessageIdentifier = helperModuleImports.addDefault(
            path,
            'shared/formatProdErrorMessage',
            {nameHint: 'formatProdErrorMessage'}
          );

          // Outputs:
          //   formatProdErrorMessage(ERR_CODE, adj, noun);
          const prodMessage = t.callExpression(
            formatProdErrorMessageIdentifier,
            [t.numericLiteral(prodErrorId), ...errorMsgExpressions]
          );

          const errorCall = t.callExpression(t.identifier('Error'), [
            t.conditionalExpression(DEV_EXPRESSION, devMessage, prodMessage),
          ]);
          errorCall[SEEN_SYMBOL] = true;

          // Outputs:
          // if (!condition) {
          //   throw Error(
          //     __DEV__
          //       ? `A ${adj} message that contains ${noun}`
          //       : formatProdErrorMessage(ERR_CODE, adj, noun)
          //   );
          // }
          parentStatementPath.replaceWith(
            t.ifStatement(
              t.unaryExpression('!', condition),
              t.blockStatement([
                t.blockStatement([t.throwStatement(errorCall)]),
              ])
            )
          );
        }
      },
    },
  };
};
