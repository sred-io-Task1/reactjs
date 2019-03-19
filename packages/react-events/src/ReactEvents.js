/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {REACT_EVENT_TARGET_TYPE} from 'shared/ReactSymbols';
import type {ReactEventTarget} from 'shared/ReactTypes';

const TouchHitTarget: ReactEventTarget = {
  $$typeof: REACT_EVENT_TARGET_TYPE,
  type: 'touch-hit',
};

const ReactEvents = {
  TouchHitTarget,
};

export default ReactEvents;
