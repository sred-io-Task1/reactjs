/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactNodeList} from 'shared/ReactTypes';
import type {BootstrapScriptDescriptor} from 'react-dom-bindings/src/server/ReactDOMServerFormatConfig';

import ReactVersion from 'shared/ReactVersion';

import {
  createRequest,
  startWork,
  startFlowing,
  abort,
} from 'react-server/src/ReactFizzServer';

import {
  createResponseState,
  createRootFormatContext,
  createRootBoundaryID,
} from 'react-dom-bindings/src/server/ReactDOMServerFormatConfig';

type Options = {
  identifierPrefix?: string,
  namespaceURI?: string,
  nonce?: string,
  bootstrapScriptContent?: string,
  bootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  bootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  progressiveChunkSize?: number,
  signal?: AbortSignal,
  onError?: (error: mixed) => ?string,
  unstable_externalRuntimeSrc?: string | BootstrapScriptDescriptor,
};

// TODO: Move to sub-classing ReadableStream.
type ReactDOMServerReadableStream = ReadableStream & {
  allReady: Promise<void>,
};

function renderToReadableStream(
  children: ReactNodeList,
  options?: Options,
): Promise<ReactDOMServerReadableStream> {
  return new Promise((resolve, reject) => {
    let onFatalError;
    let onAllReady;
    const allReady = new Promise((res, rej) => {
      onAllReady = res;
      onFatalError = rej;
    });

    function onShellReady() {
      const stream: ReactDOMServerReadableStream = (new ReadableStream(
        {
          type: 'bytes',
          pull: (controller): ?Promise<void> => {
            startFlowing(request, controller);
          },
          cancel: (reason): ?Promise<void> => {
            abort(request);
          },
        },
        // $FlowFixMe size() methods are not allowed on byte streams.
        {highWaterMark: 0},
      ): any);
      // TODO: Move to sub-classing ReadableStream.
      stream.allReady = allReady;
      resolve(stream);
    }
    function onShellError(error: mixed) {
      // If the shell errors the caller of `renderToReadableStream` won't have access to `allReady`.
      // However, `allReady` will be rejected by `onFatalError` as well.
      // So we need to catch the duplicate, uncatchable fatal error in `allReady` to prevent a `UnhandledPromiseRejection`.
      allReady.catch(() => {});
      reject(error);
    }
    const request = createRequest(
      children,
      undefined, // fallback
      createResponseState(
        options ? options.identifierPrefix : undefined,
        options ? options.nonce : undefined,
        options ? options.bootstrapScriptContent : undefined,
        options ? options.bootstrapScripts : undefined,
        options ? options.bootstrapModules : undefined,
        undefined, // fallbackBootstrapScriptContent
        undefined, // fallbackBootstrapScripts
        undefined, // fallbackBootstrapModules
        options ? options.unstable_externalRuntimeSrc : undefined,
        undefined, // documentEmbedding
      ),
      createRootFormatContext(options ? options.namespaceURI : undefined),
      options ? options.progressiveChunkSize : undefined,
      options ? options.onError : undefined,
      onAllReady,
      onShellReady,
      onShellError,
      onFatalError,
      undefined, // rootBoundaryID
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
    startWork(request);
  });
}

type IntoContainerOptions = {
  identifierPrefix?: string,
  namespaceURI?: string,
  nonce?: string,
  bootstrapScriptContent?: string,
  bootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  bootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  fallbackBootstrapScriptContent?: string,
  fallbackBootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  fallbackBootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  progressiveChunkSize?: number,
  signal?: AbortSignal,
  onError?: (error: mixed) => ?string,
  unstable_externalRuntimeSrc?: string | BootstrapScriptDescriptor,
};

function renderIntoContainer(
  children: ReactNodeList,
  containerID: string,
  options?: IntoContainerOptions,
): ReactDOMServerReadableStream {
  let onFatalError;
  let onAllReady;
  const allReady = new Promise((res, rej) => {
    onAllReady = res;
    onFatalError = rej;
  });

  const request = createRequest(
    children,
    undefined, // fallback
    createResponseState(
      options ? options.identifierPrefix : undefined,
      options ? options.nonce : undefined,
      options ? options.bootstrapScriptContent : undefined,
      options ? options.bootstrapScripts : undefined,
      options ? options.bootstrapModules : undefined,
      options ? options.fallbackBootstrapScriptContent : undefined,
      options ? options.fallbackBootstrapScripts : undefined,
      options ? options.fallbackBootstrapModules : undefined,
      options ? options.unstable_externalRuntimeSrc : undefined,
      undefined, // documentEmbedding
    ),
    createRootFormatContext(options ? options.namespaceURI : undefined),
    options ? options.progressiveChunkSize : undefined,
    options ? options.onError : undefined,
    onAllReady,
    undefined, // onShellReady
    undefined, // onShellError
    onFatalError,
    createRootBoundaryID(containerID),
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
  startWork(request);

  const stream: ReactDOMServerReadableStream = (new ReadableStream(
    {
      type: 'bytes',
      pull: (controller): ?Promise<void> => {
        startFlowing(request, controller);
      },
      cancel: (reason): ?Promise<void> => {
        abort(request);
      },
    },
    // $FlowFixMe size() methods are not allowed on byte streams.
    {highWaterMark: 0},
  ): any);
  stream.allReady = allReady;

  return stream;
}

type IntoDocumentOptions = {
  identifierPrefix?: string,
  namespaceURI?: string,
  nonce?: string,
  bootstrapScriptContent?: string,
  bootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  bootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  fallbackBootstrapScriptContent?: string,
  fallbackBootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  fallbackBootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  progressiveChunkSize?: number,
  signal?: AbortSignal,
  onError?: (error: mixed) => ?string,
  unstable_externalRuntimeSrc?: string | BootstrapScriptDescriptor,
};

function renderDocument(
  children: ReactNodeList,
  fallback?: ReactNodeList,
  options?: IntoDocumentOptions,
): ReactDOMServerReadableStream {
  let onFatalError;
  let onAllReady;
  const allReady = new Promise((res, rej) => {
    onAllReady = res;
    onFatalError = rej;
  });

  const request = createRequest(
    children,
    fallback ? fallback : null,
    createResponseState(
      options ? options.identifierPrefix : undefined,
      options ? options.nonce : undefined,
      options ? options.bootstrapScriptContent : undefined,
      options ? options.bootstrapScripts : undefined,
      options ? options.bootstrapModules : undefined,
      options ? options.fallbackBootstrapScriptContent : undefined,
      options ? options.fallbackBootstrapScripts : undefined,
      options ? options.fallbackBootstrapModules : undefined,
      options ? options.unstable_externalRuntimeSrc : undefined,
      true, // documentEmbedding
    ),
    createRootFormatContext(options ? options.namespaceURI : undefined),
    options ? options.progressiveChunkSize : undefined,
    options ? options.onError : undefined,
    onAllReady,
    undefined, // onShellReady
    undefined, // onShellError
    onFatalError,
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
  startWork(request);

  const stream: ReactDOMServerReadableStream = (new ReadableStream(
    {
      type: 'bytes',
      pull: (controller): ?Promise<void> => {
        startFlowing(request, controller);
      },
      cancel: (reason): ?Promise<void> => {
        abort(request);
      },
    },
    // $FlowFixMe size() methods are not allowed on byte streams.
    {highWaterMark: 0},
  ): any);
  stream.allReady = allReady;

  return stream;
}

export {
  renderToReadableStream,
  renderIntoContainer,
  renderDocument,
  ReactVersion as version,
};
