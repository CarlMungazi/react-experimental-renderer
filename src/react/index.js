const REACT_ELEMENT_TYPE = require('./symbols');

const Fiber = {
  tag: null,
  key: null,
  elementType: null,
  type: null,
  stateNode: null,
  return: null,
  child: null,
  sibling: null,
  index: null,
  ref: null,
  pendingProps: null,
  memoizedProps: null,
  updateQueue: null,
  memoizedState: null,
  contextDepenencies: null,
  mode: null,
  effectTag: null,
  nextEffect: null,
  firstEffect: null,
  lastEffect: null,
  expirationTime: null,
  childExperiationTime: null,
  alternate: null,
  actualDuration: null,
  actualStartTime: null,
  selfBaseDuration: null,
  treeBaseDuration: null,
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };

  return element;
};

const ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: (null | Fiber),
};

function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
      ref = config.ref;
      key = '' + config.key;

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if ( hasOwnProperty.call(config, propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}

// 
function Component (props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = {}; // in dev environments, this object is frozen - why?
  this.updater = updater;
}

Component.prototype.isReactComponent = {};

Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
}

Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
}


// Creating the top level React object
const React = {
  Component,
  createElement
}

module.exports = React;