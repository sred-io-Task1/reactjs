/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

'use strict';

var React;
var ReactDOM;

describe('ReactErrorBoundaries', () => {
  var log;

  var BrokenConstructor;
  var BrokenComponentWillMount;
  var BrokenComponentDidMount;
  var BrokenComponentWillUnmount;
  var BrokenErrorBoundary;
  var BrokenRender;
  var ErrorBoundary;
  var ErrorMessage;
  var NoopErrorBoundary;
  var Normal;

  beforeEach(() => {
    ReactDOM = require('ReactDOM');
    React = require('React');

    log = [];

    BrokenConstructor = class BrokenConstructor extends React.Component {
      constructor(props) {
        super(props);
        log.push('BrokenConstructor constructor [!]');
        throw new Error('Hello');
      }
      render() {
        log.push('BrokenConstructor render');
        return <div />;
      }
      componentWillMount() {
        log.push('BrokenConstructor componentWillMount');
      }
      componentDidMount() {
        log.push('BrokenConstructor componentDidMount');
      }
      componentWillUnmount() {
        log.push('BrokenConstructor componentWillUnmount');
      }
    };

    BrokenComponentWillMount = class BrokenComponentWillMount extends React.Component {
      constructor(props) {
        super(props);
        log.push('BrokenComponentWillMount constructor');
      }
      componentWillMount() {
        log.push('BrokenComponentWillMount componentWillMount [!]');
        throw new Error('Hello');
      }
      render() {
        log.push('BrokenComponentWillMount render');
        return <div />;
      }
      componentDidMount() {
        log.push('BrokenComponentWillMount componentDidMount');
      }
      componentWillUnmount() {
        log.push('BrokenComponentWillMount componentWillUnmount');
      }
    };

    BrokenComponentWillUnmount = class BrokenComponentWillUnmount extends React.Component {
      constructor(props) {
        super(props);
        log.push('BrokenComponentWillUnmount constructor');
      }
      componentWillMount() {
        log.push('BrokenComponentWillUnmount componentWillMount');
      }
      render() {
        log.push('BrokenComponentWillUnmount render');
        return <div />;
      }
      componentDidMount() {
        log.push('BrokenComponentWillUnmount componentDidMount');
      }
      componentWillUnmount() {
        log.push('BrokenComponentWillUnmount componentWillUnmount [!]');
        throw new Error('Hello');
      }
    };

    BrokenComponentDidMount = class BrokenComponentDidMount extends React.Component {
      constructor(props) {
        super(props);
        log.push('BrokenComponentDidMount constructor');
      }
      componentWillMount() {
        log.push('BrokenComponentDidMount componentWillMount');
      }
      render() {
        log.push('BrokenComponentDidMount render');
        return <div />;
      }
      componentDidMount() {
        log.push('BrokenComponentDidMount componentDidMount [!]');
        throw new Error('Hello');
      }
      componentWillUnmount() {
        log.push('BrokenComponentDidMount componentWillUnmount');
      }
    };

    BrokenErrorBoundary = class BrokenErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = {error: null};
        log.push('BrokenErrorBoundary constructor');
      }
      render() {
        if (this.state.error) {
          log.push('BrokenErrorBoundary render error [!]');
          throw new Error('Hello');
        }
        log.push('BrokenErrorBoundary render success');
        return <div>{this.props.children}</div>;
      }
      componentWillMount() {
        log.push('BrokenErrorBoundary componentWillMount');
      }
      componentDidMount() {
        log.push('BrokenErrorBoundary componentDidMount');
      }
      componentWillUnmount() {
        log.push('BrokenErrorBoundary componentWillUnmount');
      }
      unstable_handleError(error) {
        log.push('BrokenErrorBoundary unstable_handleError');
        this.setState({error});
      }
    };

    BrokenRender = class BrokenRender extends React.Component {
      constructor(props) {
        super(props);
        log.push('BrokenRender constructor');
      }
      render() {
        log.push('BrokenRender render [!]');
        throw new Error('Hello');
      }
      componentWillMount() {
        log.push('BrokenRender componentWillMount');
      }
      componentDidMount() {
        log.push('BrokenRender componentDidMount');
      }
      componentWillUnmount() {
        log.push('BrokenRender componentWillUnmount');
      }
    };

    NoopErrorBoundary = class NoopErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        log.push('NoopErrorBoundary constructor');
      }
      render() {
        log.push('NoopErrorBoundary render');
        return <BrokenRender />;
      }
      componentWillMount() {
        log.push('NoopErrorBoundary componentWillMount');
      }
      componentDidMount() {
        log.push('NoopErrorBoundary componentDidMount');
      }
      componentWillUnmount() {
        log.push('NoopErrorBoundary componentWillUnmount');
      }
      unstable_handleError() {
        log.push('NoopErrorBoundary unstable_handleError');
      }
    };

    Normal = class Normal extends React.Component {
      static defaultProps = {
        logName: 'Normal',
      };
      constructor(props) {
        super(props);
        log.push(`${this.props.logName} constructor`);
      }
      render() {
        log.push(`${this.props.logName} render`);
        return <div>{this.props.children}</div>;
      }
      componentWillMount() {
        log.push(`${this.props.logName} componentWillMount`);
      }
      componentDidMount() {
        log.push(`${this.props.logName} componentDidMount`);
      }
      componentWillUnmount() {
        log.push(`${this.props.logName} componentWillUnmount`);
      }
    };

    ErrorBoundary = class ErrorBoundary extends React.Component {
      constructor() {
        super();
        this.state = {error: null};
        log.push('ErrorBoundary constructor');
      }
      render() {
        if (this.state.error) {
          log.push('ErrorBoundary render error');
          return this.props.renderError(this.state.error, this.props);
        }
        log.push('ErrorBoundary render success');
        return <div>{this.props.children}</div>;
      }
      unstable_handleError(error) {
        log.push('ErrorBoundary unstable_handleError');
        this.setState({error});
      }
      componentWillMount() {
        log.push('ErrorBoundary componentWillMount');
      }
      componentDidMount() {
        log.push('ErrorBoundary componentDidMount');
      }
      componentWillUnmount() {
        log.push('ErrorBoundary componentWillUnmount');
      }
    };
    ErrorBoundary.defaultProps = {
      renderError(error, props) {
        return (
          <div ref={props.errorMessageRef}>
            Caught an error: {error.message}.
          </div>
        );
      },
    };

    ErrorMessage = class ErrorMessage extends React.Component {
      constructor(props) {
        super(props);
        log.push('ErrorMessage constructor');
      }
      componentWillMount() {
        log.push('ErrorMessage componentWillMount');
      }
      componentDidMount() {
        log.push('ErrorMessage componentDidMount');
      }
      componentWillUnmount() {
        log.push('ErrorMessage componentWillUnmount');
      }
      render() {
        log.push('ErrorMessage render');
        return <div>Caught an error: {this.props.message}.</div>;
      }
    };
  });

  it('renders an error state if child throws in render', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
      container
    );
    expect(container.firstChild.textContent).toBe(
      'Caught an error: Hello.'
    );
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      // Catch and render an error message
      'ErrorBoundary unstable_handleError',
      'ErrorBoundary render error',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('renders an error state if child throws in constructor', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <BrokenConstructor />
      </ErrorBoundary>,
      container
    );
    expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'BrokenConstructor constructor [!]',
      // Catch and render an error message
      'ErrorBoundary unstable_handleError',
      'ErrorBoundary render error',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('renders an error state if child throws in componentWillMount', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <BrokenComponentWillMount />
      </ErrorBoundary>,
      container
    );
    expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'BrokenComponentWillMount constructor',
      'BrokenComponentWillMount componentWillMount [!]',
      // Catch and render an error message
      'ErrorBoundary unstable_handleError',
      'ErrorBoundary render error',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('mounts the error message if mounting fails', () => {
    function renderError(error) {
      return (
        <ErrorMessage message={error.message} />
      );
    }

    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary renderError={renderError}>
        <BrokenRender />
      </ErrorBoundary>,
      container
    );
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      // Handle the error:
      'ErrorBoundary unstable_handleError',
      'ErrorBoundary render error',
      // Mount the error message:
      'ErrorMessage constructor',
      'ErrorMessage componentWillMount',
      'ErrorMessage render',
      'ErrorMessage componentDidMount',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
      'ErrorMessage componentWillUnmount',
    ]);
  });

  // Known limitation because componentDidMount() does not occur on the stack.
  // We could either hardcode searching for parent boundary, or wait for Fiber.
  it('currently does not catch errors in componentDidMount', () => {
    var container = document.createElement('div');
    expect(() => {
      ReactDOM.render(
        <ErrorBoundary>
          <BrokenComponentDidMount />
        </ErrorBoundary>,
        container
      );
    }).toThrow();
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'BrokenComponentDidMount constructor',
      'BrokenComponentDidMount componentWillMount',
      'BrokenComponentDidMount render',
      'BrokenComponentDidMount componentDidMount [!]',
      // FIXME: uncomment when componentDidMount() gets caught.
      // Catch and render an error message
      // 'ErrorBoundary unstable_handleError',
      // 'ErrorBoundary render error',
      // 'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
      'BrokenComponentDidMount componentWillUnmount',
    ]);
  });

  it('propagates errors on retry on mounting', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <NoopErrorBoundary>
          <BrokenRender />
        </NoopErrorBoundary>
      </ErrorBoundary>,
      container
    );
    expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'NoopErrorBoundary constructor',
      'NoopErrorBoundary componentWillMount',
      'NoopErrorBoundary render',
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      // The first error boundary catches the error
      // However, it doesn't adjust its state so next render also fails
      'NoopErrorBoundary unstable_handleError',
      'NoopErrorBoundary render',
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      // This time, the error propagates to the higher boundary
      'ErrorBoundary unstable_handleError',
      // Render the error
      'ErrorBoundary render error',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('propagates errors inside boundary itself on mounting', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <BrokenErrorBoundary>
          <BrokenRender />
        </BrokenErrorBoundary>
      </ErrorBoundary>,
      container
    );
    expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'BrokenErrorBoundary constructor',
      'BrokenErrorBoundary componentWillMount',
      'BrokenErrorBoundary render success',
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      // The first error boundary catches the error
      // It adjusts state but throws displaying the message
      'BrokenErrorBoundary unstable_handleError',
      'BrokenErrorBoundary render error [!]',
      // The error propagates to the higher boundary
      'ErrorBoundary unstable_handleError',
      // Render the error
      'ErrorBoundary render error',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('does not register event handlers for unmounted children', () => {
    var EventPluginHub = require('EventPluginHub');
    var container = document.createElement('div');
    EventPluginHub.putListener = jest.fn();
    ReactDOM.render(
      <ErrorBoundary>
        <button onClick={() => {}}>Click me</button>
        <BrokenRender />
      </ErrorBoundary>,
      container
    );
    expect(EventPluginHub.putListener).not.toBeCalled();

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('does not call componentWillUnmount when aborting initial mount', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <Normal />
        <BrokenRender />
        <Normal />
      </ErrorBoundary>,
      container
    );
    expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      // Render first child
      'Normal constructor',
      'Normal componentWillMount',
      'Normal render',
      // Render second child (it throws)
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      // Error boundary catches the error
      'ErrorBoundary unstable_handleError',
      // Render the error message
      'ErrorBoundary render error',
      'ErrorBoundary componentDidMount'
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('resets refs if mounting aborts', () => {
    function childRef(x) {
      log.push('Child ref is set to ' + x);
    };
    function errorMessageRef(x) {
      log.push('Error message ref is set to ' + x);
    };

    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary errorMessageRef={errorMessageRef}>
        <div ref={childRef} />
        <BrokenRender />
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      // Handle error:
      'ErrorBoundary unstable_handleError',
      // Ref to child should not get set:
      'Child ref is set to null',
      'ErrorBoundary render error',
      // Ref to error message should get set:
      'Error message ref is set to [object HTMLDivElement]',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
      'Error message ref is set to null',
    ]);
  });

  it('successfully mounts if no error occurs', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <div>Mounted successfully.</div>
      </ErrorBoundary>,
      container
    );
    expect(container.firstChild.textContent).toBe('Mounted successfully.');
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('catches if child throws in render during update', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <Normal />
      </ErrorBoundary>,
      container
    );
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'Normal constructor',
      'Normal componentWillMount',
      'Normal render',
      'Normal componentDidMount',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.render(
      <ErrorBoundary>
        <Normal />
        <Normal logName="Normal2" />
        <BrokenRender />
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary render success',
      'Normal render',
      // Normal2 will attempt to mount:
      'Normal2 constructor',
      'Normal2 componentWillMount',
      'Normal2 render',
      // BrokenRender will abort rendering:
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      'ErrorBoundary unstable_handleError',
      // Unmount the previously mounted components:
      'Normal componentWillUnmount',
      // Normal2 does not get lifefycle because it was never mounted
      'ErrorBoundary render error'
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('keeps refs up-to-date during updates', () => {
    function child1Ref(x) {
      log.push('Child1 ref is set to ' + x);
    };
    function child2Ref(x) {
      log.push('Child2 ref is set to ' + x);
    };
    function errorMessageRef(x) {
      log.push('Error message ref is set to ' + x);
    };

    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary errorMessageRef={errorMessageRef}>
        <div ref={child1Ref} />
      </ErrorBoundary>,
      container
    );
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      'Child1 ref is set to [object HTMLDivElement]',
      'ErrorBoundary componentDidMount',
    ]);

    log.length = 0;
    ReactDOM.render(
      <ErrorBoundary errorMessageRef={errorMessageRef}>
        <div ref={child1Ref} />
        <div ref={child2Ref} />
        <BrokenRender />
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary render success',
      // BrokenRender will abort rendering:
      'BrokenRender constructor',
      'BrokenRender componentWillMount',
      'BrokenRender render [!]',
      'ErrorBoundary unstable_handleError',
      // Unmount the previously mounted components:
      'Child1 ref is set to null',
      'ErrorBoundary render error',
      'Error message ref is set to [object HTMLDivElement]',
      // Child2 ref is never set because its mounting aborted
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
      'Error message ref is set to null',
    ]);
  });

  it('recovers from componentWillUnmount errors on update', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <BrokenComponentWillUnmount />
        <BrokenComponentWillUnmount />
        <BrokenComponentWillUnmount />
      </ErrorBoundary>,
      container
    );
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      // Mount three children:
      'BrokenComponentWillUnmount constructor',
      'BrokenComponentWillUnmount componentWillMount',
      'BrokenComponentWillUnmount render',
      'BrokenComponentWillUnmount constructor',
      'BrokenComponentWillUnmount componentWillMount',
      'BrokenComponentWillUnmount render',
      'BrokenComponentWillUnmount constructor',
      'BrokenComponentWillUnmount componentWillMount',
      'BrokenComponentWillUnmount render',
      // Finalize mounting
      'BrokenComponentWillUnmount componentDidMount',
      'BrokenComponentWillUnmount componentDidMount',
      'BrokenComponentWillUnmount componentDidMount',
      'ErrorBoundary componentDidMount'
    ]);

    log.length = 0;
    ReactDOM.render(
      <ErrorBoundary>
        <BrokenComponentWillUnmount />
        <BrokenComponentWillUnmount />
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary render success',
      // Update existing children:
      'BrokenComponentWillUnmount render',
      'BrokenComponentWillUnmount render',
      // Unmounting throws:
      'BrokenComponentWillUnmount componentWillUnmount [!]',
      'ErrorBoundary unstable_handleError',
      // Attempt to unmount previous children:
      'BrokenComponentWillUnmount componentWillUnmount [!]',
      'BrokenComponentWillUnmount componentWillUnmount [!]',
      'ErrorBoundary render error',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('recovers from nested componentWillUnmount errors on update', () => {
    function ParentOfBrokenComponentWillUnmount() {
      return <BrokenComponentWillUnmount />;
    }

    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <Normal>
          <BrokenComponentWillUnmount />
        </Normal>
        <BrokenComponentWillUnmount />
      </ErrorBoundary>,
      container
    );
    expect(log).toEqual([
      'ErrorBoundary constructor',
      'ErrorBoundary componentWillMount',
      'ErrorBoundary render success',
      // Mount first child:
      'Normal constructor',
      'Normal componentWillMount',
      'Normal render',
      'BrokenComponentWillUnmount constructor',
      'BrokenComponentWillUnmount componentWillMount',
      'BrokenComponentWillUnmount render',
      // Mount second child:
      'BrokenComponentWillUnmount constructor',
      'BrokenComponentWillUnmount componentWillMount',
      'BrokenComponentWillUnmount render',
      // Finalize mounting
      'BrokenComponentWillUnmount componentDidMount',
      'Normal componentDidMount',
      'BrokenComponentWillUnmount componentDidMount',
      'ErrorBoundary componentDidMount'
    ]);

    log.length = 0;
    ReactDOM.render(
      <ErrorBoundary>
        <Normal>
          <BrokenComponentWillUnmount />
        </Normal>
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');
    expect(log).toEqual([
      'ErrorBoundary render success',
      // Update existing children:
      'Normal render',
      'BrokenComponentWillUnmount render',
      // Unmounting throws:
      'BrokenComponentWillUnmount componentWillUnmount [!]',
      'ErrorBoundary unstable_handleError',
      // Attempt to unmount previous children:
      'Normal componentWillUnmount',
      'BrokenComponentWillUnmount componentWillUnmount [!]',
      // Render error:
      'ErrorBoundary render error',
    ]);

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('can update multiple times in error state', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');

    ReactDOM.render(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');

    ReactDOM.render(<div>Other screen</div>, container);
    expect(container.textContent).toBe('Other screen');

    ReactDOM.unmountComponentAtNode(container);
  });

  it('doesn\'t get into inconsistent state during removals', () => {
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        <Normal />
        <BrokenComponentWillUnmount />
        <Normal />
      </ErrorBoundary>,
      container
    );

    ReactDOM.render(<ErrorBoundary />, container);
    expect(container.textContent).toBe('Caught an error: Hello.');

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('doesn\'t get into inconsistent state during additions', () => {
    var container = document.createElement('div');
    ReactDOM.render(<ErrorBoundary />, container);
    ReactDOM.render(
      <ErrorBoundary>
        <Normal />
        <BrokenRender />
        <Normal />
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });

  it('doesn\'t get into inconsistent state during reorders', () => {
    function getAMixOfNormalAndBrokenRenderElements() {
      var elements = [];
      for (var i = 0; i < 100; i++) {
        elements.push(<Normal key={i} />);
      }
      elements.push(<MaybeBrokenRender key={100} />);

      var currentIndex = elements.length;
      while (0 !== currentIndex) {
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        var temporaryValue = elements[currentIndex];
        elements[currentIndex] = elements[randomIndex];
        elements[randomIndex] = temporaryValue;
      }
      return elements;
    }

    class MaybeBrokenRender extends React.Component {
      render() {
        if (fail) {
          throw new Error('Hello');
        }
        return <div />;
      }
    }

    var fail = false;
    var container = document.createElement('div');
    ReactDOM.render(
      <ErrorBoundary>
        {getAMixOfNormalAndBrokenRenderElements()}
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).not.toContain('Caught an error');

    fail = true;
    ReactDOM.render(
      <ErrorBoundary>
        {getAMixOfNormalAndBrokenRenderElements()}
      </ErrorBoundary>,
      container
    );
    expect(container.textContent).toBe('Caught an error: Hello.');

    log.length = 0;
    ReactDOM.unmountComponentAtNode(container);
    expect(log).toEqual([
      'ErrorBoundary componentWillUnmount',
    ]);
  });
});
