/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {AnyNativeEvent} from './legacy-events/PluginModuleType';
import type {Fiber} from 'react-reconciler/src/ReactInternalTypes';
import type {LegacyPluginModule} from './legacy-events/PluginModuleType';
import type {ReactSyntheticEvent} from './legacy-events/ReactSyntheticEventType';
import type {TopLevelType} from './legacy-events/TopLevelEventTypes';

import {registrationNameModules} from './legacy-events/EventPluginRegistry';
import {batchedUpdates} from './legacy-events/ReactGenericBatching';
import accumulateInto from './legacy-events/accumulateInto';

import {plugins} from './legacy-events/EventPluginRegistry';
import getListener from './ReactNativeGetListener';
import {runEventsInBatch} from './legacy-events/EventBatching';

import {RawEventTelemetryEventEmitterOffByDefault} from 'react-native/Libraries/ReactPrivate/ReactNativePrivateInterface';

export {getListener, registrationNameModules as registrationNames};

/**
 * Allows registered plugins an opportunity to extract events from top-level
 * native browser events.
 *
 * @return {*} An accumulation of synthetic events.
 * @internal
 */
function extractPluginEvents(
  topLevelType: TopLevelType,
  targetInst: null | Fiber,
  nativeEvent: AnyNativeEvent,
  nativeEventTarget: null | EventTarget,
): Array<ReactSyntheticEvent> | ReactSyntheticEvent | null {
  let events = null;
  const legacyPlugins = ((plugins: any): Array<LegacyPluginModule<Event>>);
  for (let i = 0; i < legacyPlugins.length; i++) {
    // Not every plugin in the ordering may be loaded at runtime.
    const possiblePlugin: LegacyPluginModule<AnyNativeEvent> = legacyPlugins[i];
    if (possiblePlugin) {
      const extractedEvents = possiblePlugin.extractEvents(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget,
      );
      if (extractedEvents) {
        events = accumulateInto(events, extractedEvents);
      }
    }
  }
  return events;
}

function runExtractedPluginEventsInBatch(
  topLevelType: TopLevelType,
  targetInst: null | Fiber,
  nativeEvent: AnyNativeEvent,
  nativeEventTarget: null | EventTarget,
) {
  const events = extractPluginEvents(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget,
  );
  runEventsInBatch(events);
}

export function dispatchEvent(
  target: null | Object,
  topLevelType: TopLevelType,
  nativeEvent: AnyNativeEvent,
) {
  const targetFiber = (target: null | Fiber);

  let eventTarget = null;
  if (targetFiber != null) {
    const stateNode = targetFiber.stateNode;
    // Guard against Fiber being unmounted
    if (stateNode != null) {
      eventTarget = stateNode.canonical;
    }
  }

  batchedUpdates(function() {
    // Emit event to the event telemetry system.
    //
    // NOTE: this event telemetry system does *nothing* without explicit,
    // per-application opt-in, and merely emits events into the local
    // EventEmitter below. If *you* do not add listeners to the `RawEventTelemetryEventEmitter`,
    // then all of these emitted events will just blackhole and are no-ops.
    // It is available (although not officially supported... yet) if you want to collect
    // telemetry on event latency in your application, and could also be useful for debugging
    // low-level events issues.
    //
    // If you do not have any event telemetry and are extremely concerned about event perf,
    // it is safe to disable these "emit" statements; it will prevent checking the size of
    // an empty array twice and prevent two no-ops. Practically the overhead is so low that
    // we don't think it's worth thinking about in prod; your perf issues probably lie elsewhere.
    //
    // We emit two events here: one for listeners to this specific event,
    // and one for the catchall listener '*', for any listeners that want
    // to be notified for all events.
    // Note that extracted events are *not* emitted into the telemetry system,
    // only events that have a 1:1 mapping with a native event, at least for now.
    const topLevelTypeStr: string = ((topLevelType: any): string);
    const event = {eventName: topLevelTypeStr, nativeEvent};
    RawEventTelemetryEventEmitterOffByDefault.emit(topLevelTypeStr, event);
    RawEventTelemetryEventEmitterOffByDefault.emit('*', event);

    // Heritage plugin event system
    runExtractedPluginEventsInBatch(
      topLevelType,
      targetFiber,
      nativeEvent,
      eventTarget,
    );
  });
  // React Native doesn't use ReactControlledComponent but if it did, here's
  // where it would do it.
}
