/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export const enableSchedulerDebugging = false;
export const enableProfiling = false;
export const frameYieldMs = 5;

export const userBlockingPriorityTimeout = 250;
export const normalPriorityTimeout = 5000;
export const lowPriorityTimeout = 10000;
export const enableRequestPaint = true;

// Introduced a regression by not flushing passive effects with Suspensey CSS: https://codesandbox.io/p/sandbox/suspensey-css-and-passive-effects-mww52c
export const enableAlwaysYieldScheduler = false;
