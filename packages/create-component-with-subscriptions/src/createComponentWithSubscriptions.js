/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';

type SubscrptionConfig = {
  // Maps property names of subscribable sources (e.g. 'eventDispatcher'),
  // To property names for subscribed values (e.g. 'value').
  subscribablePropertiesMap: {[subscribableProperty: string]: string},

  // Synchronously get data for a given subscribable property.
  // If your component has multiple subscriptions,
  // The second 'propertyName' parameter can be used to distinguish between them.
  getDataFor: (subscribable: any, propertyName: string) => any,

  // Subscribe to a subscribable.
  // Due to the variety of change event types, subscribers should provide their own handlers.
  // Those handlers should NOT update state though;
  // They should call the valueChangedCallback() instead when a subscription changes.
  // If your component has multiple subscriptions,
  // The third 'propertyName' parameter can be used to distinguish between them.
  subscribeTo: (
    valueChangedCallback: (value: any) => void,
    subscribable: any,
    propertyName: string,
  ) => any,

  // Unsubscribe from a given subscribable.
  // If your component has multiple subscriptions,
  // The second 'propertyName' parameter can be used to distinguish between them.
  // The value returned by subscribeTo() is the third 'subscription' parameter.
  unsubscribeFrom: (
    subscribable: any,
    propertyName: string,
    subscription: any,
  ) => void,
};

export function createComponent(
  config: SubscrptionConfig,
  Component: React$ComponentType<*>,
): React$ComponentType<*> {
  const {
    getDataFor,
    subscribablePropertiesMap,
    subscribeTo,
    unsubscribeFrom,
  } = config;

  class SubscribableContainer extends React.Component {
    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
      const nextState = {};

      let hasUpdates = false;

      // Read value (if sync read is possible) for upcoming render
      for (let propertyName in subscribablePropertiesMap) {
        const prevSubscribable = prevState[propertyName];
        const nextSubscribable = nextProps[propertyName];

        if (prevSubscribable !== nextSubscribable) {
          nextState[propertyName] = {
            ...prevState[propertyName],
            subscribable: nextSubscribable,
            value:
              nextSubscribable != null
                ? getDataFor(nextSubscribable, propertyName)
                : undefined,
          };

          hasUpdates = true;
        }
      }

      return hasUpdates ? nextState : null;
    }

    componentDidMount() {
      for (let propertyName in subscribablePropertiesMap) {
        const subscribable = this.props[propertyName];
        this.subscribeTo(subscribable, propertyName);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      for (let propertyName in subscribablePropertiesMap) {
        const prevSubscribable = prevProps[propertyName];
        const nextSubscribable = this.props[propertyName];
        if (prevSubscribable !== nextSubscribable) {
          this.unsubscribeFrom(prevSubscribable, propertyName);
          this.subscribeTo(nextSubscribable, propertyName);
        }
      }
    }

    componentWillUnmount() {
      for (let propertyName in subscribablePropertiesMap) {
        const subscribable = this.props[propertyName];
        this.unsubscribeFrom(subscribable, propertyName);
      }
    }

    // Event listeners are only safe to add during the commit phase,
    // So they won't leak if render is interrupted or errors.
    subscribeTo(subscribable, propertyName) {
      if (subscribable != null) {
        const wrapper = this.state[propertyName];

        const valueChangedCallback = value => {
          this.setState(state => {
            const currentWrapper = state[propertyName];

            // If the value is the same, skip the unnecessary state update.
            if (currentWrapper.value === value) {
              return null;
            }

            // If this event belongs to an old or uncommitted data source, ignore it.
            if (subscribable !== currentWrapper.subscribable) {
              return null;
            }

            return {
              [propertyName]: {
                ...currentWrapper,
                value,
              },
            };
          });
        };

        // Store subscription for later (in case it's needed to unsubscribe).
        // This is safe to do via mutation since:
        // 1) It does not impact render.
        // 2) This method will only be called during the "commit" phase.
        wrapper.subscription = subscribeTo(
          valueChangedCallback,
          subscribable,
          propertyName,
        );

        // External values could change between render and mount,
        // In some cases it may be important to handle this case.
        const value = getDataFor(subscribable, propertyName);
        if (value !== wrapper.value) {
          this.setState({
            [propertyName]: {
              ...wrapper,
              value,
            },
          });
        }
      }
    }

    unsubscribeFrom(subscribable, propertyName) {
      if (subscribable != null) {
        const wrapper = this.state[propertyName];

        unsubscribeFrom(subscribable, propertyName, wrapper.subscription);

        wrapper.subscription = null;
      }
    }

    render() {
      const filteredProps = {};
      const subscribedValues = {};

      for (let key in this.props) {
        if (!subscribablePropertiesMap.hasOwnProperty(key)) {
          filteredProps[key] = this.props[key];
        }
      }

      for (let fromProperty in subscribablePropertiesMap) {
        const toProperty = subscribablePropertiesMap[fromProperty];
        const wrapper = this.state[fromProperty];
        subscribedValues[toProperty] =
          wrapper != null ? wrapper.value : undefined;
      }

      return <Component {...filteredProps} {...subscribedValues} />;
    }
  }

  return SubscribableContainer;
}
