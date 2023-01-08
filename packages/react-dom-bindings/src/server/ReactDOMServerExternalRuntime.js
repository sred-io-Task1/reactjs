/**
 * This file is compiled to a standalone browser script by rollup and loaded by Fizz
 *  clients. Therefore, it should be fast and not have many external dependencies.
 * @flow
 */
/* eslint-disable dot-notation */

// Imports are resolved statically by the closure compiler in release bundles
// and by rollup in jest unit tests
import {
  clientRenderBoundary,
  completeBoundaryWithStyles,
  completeContainerWithStyles,
  completeBoundary,
  completeContainer,
  completeSegment,
} from './fizz-instruction-set/ReactDOMFizzInstructionSetExternalRuntime';

if (document.readyState === 'loading') {
  if (document.body != null) {
    installFizzInstrObserver(document.body);
  } else {
    // body may not exist yet if the fizz runtime is sent in <head>
    // (e.g. as a preinit resource)
    const domBodyObserver = new MutationObserver(() => {
      // We expect the body node to be stable once parsed / created
      if (document.body) {
        if (document.readyState === 'loading') {
          installFizzInstrObserver(document.body);
        }
        handleExistingNodes();
        domBodyObserver.disconnect();
      }
    });
    // documentElement must already exist at this point
    // $FlowFixMe[incompatible-call]
    domBodyObserver.observe(document.documentElement, {childList: true});
  }
}

handleExistingNodes();

function handleExistingNodes() {
  const existingNodes = document.getElementsByTagName('template');
  for (let i = 0; i < existingNodes.length; i++) {
    handleNode(existingNodes[i]);
  }
}

function installFizzInstrObserver(target /*: Node */) {
  const fizzInstrObserver = new MutationObserver(mutations => {
    for (let i = 0; i < mutations.length; i++) {
      const addedNodes = mutations[i].addedNodes;
      for (let j = 0; j < addedNodes.length; j++) {
        if (addedNodes.item(j).parentNode) {
          handleNode(addedNodes.item(j));
        }
      }
    }
  });
  // We assume that instruction data nodes are eventually appended to the
  // body, even if Fizz is streaming to a shell / subtree.
  fizzInstrObserver.observe(target, {
    childList: true,
  });
  window.addEventListener('DOMContentLoaded', () => {
    fizzInstrObserver.disconnect();
  });
}

function handleNode(node_ /*: Node */) {
  if (
    node_.nodeType !== 1 ||
    // $FlowFixMe[incompatible-cast]
    !(node_ /*: HTMLElement*/).dataset
  ) {
    return;
  }
  // $FlowFixMe[incompatible-cast]
  const node = (node_ /*: HTMLElement*/);
  const dataset = node.dataset;

  if (dataset.hasOwnProperty('ri')) {
    node.remove();
    switch (dataset.ri) {
      case 'x':
        return clientRenderBoundary(
          dataset.bid,
          dataset.dgst,
          dataset.msg,
          dataset.stck,
        );
      case 's':
        return completeSegment(dataset.sid, dataset.pid);
      case 'b':
        return completeBoundary(dataset.bid, dataset.sid);
      case 'rb':
        return completeBoundaryWithStyles(
          dataset.bid,
          dataset.sid,
          JSON.parse(dataset.sty),
        );
      case 'c':
        return completeContainer(dataset.bid, dataset.sid);
      case 'rc':
        return completeContainerWithStyles(
          dataset.bid,
          dataset.sid,
          JSON.parse(dataset.sty),
        );
      default:
        throw new Error(
          'React encountered a render instruction it did not recognize.',
        );
    }
  }
}
