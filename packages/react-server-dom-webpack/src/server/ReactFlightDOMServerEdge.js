/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactClientValue} from 'react-server/src/ReactFlightServer';
import type {Thenable} from 'shared/ReactTypes';
import type {ClientManifest} from './ReactFlightServerConfigWebpackBundler';
import type {ServerManifest} from 'react-client/src/ReactFlightClientConfig';

import {enableHalt} from 'shared/ReactFeatureFlags';

import {
  createRequest,
  startWork,
  startFlowing,
  stopFlowing,
  abort,
  halt,
} from 'react-server/src/ReactFlightServer';

import {
  createResponse,
  close,
  getRoot,
} from 'react-server/src/ReactFlightReplyServer';

import {
  decodeAction,
  decodeFormState,
} from 'react-server/src/ReactFlightActionServer';

export {
  registerServerReference,
  registerClientReference,
  createClientModuleProxy,
} from '../ReactFlightWebpackReferences';

import type {TemporaryReferenceSet} from 'react-server/src/ReactFlightServerTemporaryReferences';

export {createTemporaryReferenceSet} from 'react-server/src/ReactFlightServerTemporaryReferences';

export type {TemporaryReferenceSet};

type Options = {
  environmentName?: string | (() => string),
  filterStackFrame?: (url: string, functionName: string) => boolean,
  identifierPrefix?: string,
  signal?: AbortSignal,
  temporaryReferences?: TemporaryReferenceSet,
  onError?: (error: mixed) => void,
  onPostpone?: (reason: string) => void,
};

function renderToReadableStream(
  model: ReactClientValue,
  webpackMap: ClientManifest,
  options?: Options,
): ReadableStream {
  const request = createRequest(
    model,
    webpackMap,
    options ? options.onError : undefined,
    options ? options.identifierPrefix : undefined,
    options ? options.onPostpone : undefined,
    options ? options.temporaryReferences : undefined,
    __DEV__ && options ? options.environmentName : undefined,
    __DEV__ && options ? options.filterStackFrame : undefined,
  );
  if (options && options.signal) {
    const signal = options.signal;
    if (signal.aborted) {
      abort(request, (signal: any).reason);
    } else {
      const listener = () => {
        abort(request, (signal: any).reason);
        signal.removeEventListener('abort', listener);
      };
      signal.addEventListener('abort', listener);
    }
  }
  const stream = new ReadableStream(
    {
      type: 'bytes',
      start: (controller): ?Promise<void> => {
        startWork(request);
      },
      pull: (controller): ?Promise<void> => {
        startFlowing(request, controller);
      },
      cancel: (reason): ?Promise<void> => {
        stopFlowing(request);
        abort(request, reason);
      },
    },
    // $FlowFixMe[prop-missing] size() methods are not allowed on byte streams.
    {highWaterMark: 0},
  );
  return stream;
}

type StaticResult = {
  prelude: ReadableStream,
};

function prerender(
  model: ReactClientValue,
  webpackMap: ClientManifest,
  options?: Options,
): Promise<StaticResult> {
  return new Promise((resolve, reject) => {
    const onFatalError = reject;
    function onAllReady() {
      const stream = new ReadableStream(
        {
          type: 'bytes',
          start: (controller): ?Promise<void> => {
            startWork(request);
          },
          pull: (controller): ?Promise<void> => {
            startFlowing(request, controller);
          },
          cancel: (reason): ?Promise<void> => {
            stopFlowing(request);
            abort(request, reason);
          },
        },
        // $FlowFixMe[prop-missing] size() methods are not allowed on byte streams.
        {highWaterMark: 0},
      );
      resolve({prelude: stream});
    }
    const request = createRequest(
      model,
      webpackMap,
      options ? options.onError : undefined,
      options ? options.identifierPrefix : undefined,
      options ? options.onPostpone : undefined,
      options ? options.temporaryReferences : undefined,
      __DEV__ && options ? options.environmentName : undefined,
      __DEV__ && options ? options.filterStackFrame : undefined,
      onAllReady,
      onFatalError,
    );
    if (options && options.signal) {
      const signal = options.signal;
      if (signal.aborted) {
        const reason = (signal: any).reason;
        if (enableHalt) {
          halt(request, reason);
        } else {
          abort(request, reason);
        }
      } else {
        const listener = () => {
          const reason = (signal: any).reason;
          if (enableHalt) {
            halt(request, reason);
          } else {
            abort(request, reason);
          }
          signal.removeEventListener('abort', listener);
        };
        signal.addEventListener('abort', listener);
      }
    }
    startWork(request);
  });
}

function decodeReply<T>(
  body: string | FormData,
  webpackMap: ServerManifest,
  options?: {temporaryReferences?: TemporaryReferenceSet},
): Thenable<T> {
  if (typeof body === 'string') {
    const form = new FormData();
    form.append('0', body);
    body = form;
  }
  const response = createResponse(
    webpackMap,
    '',
    options ? options.temporaryReferences : undefined,
    body,
  );
  const root = getRoot<T>(response);
  close(response);
  return root;
}

export {
  renderToReadableStream,
  prerender,
  decodeReply,
  decodeAction,
  decodeFormState,
};
