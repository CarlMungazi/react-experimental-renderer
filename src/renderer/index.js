/**
  This renderer does the bare minimum to update the example application
*/

const Reconciler = require('react-reconciler');

const HostConfig = {
  now: Date.now, // this will be used by the reconciler to calculate the current time

  /**
  * This function allows you to share you context with other function in the HostConfig
  * @param nextRootInstance the root dom node specified when render is called. Usually <div id="root"></div>
  * @return a context object which is passed on to the immediate child
  */
  getRootHostContext: function(nextRootInstance) {
    let rootContext = {};
    return rootContext;
  },

  /**
  * This function gives you a way to access context from the parent and to pass some context
  * to the immediate child of the current node. It is a regular object containing some information
  * @param parentContext the context from the parent
  * @param fiberType the type of fiber e.g 'div', 'span'
  * @param rootInstance the root dom node specified when render is called. Usually <div id="root"></div>
  * @return a context object which is passed on to the immediate child
  */
  getChildHostContext: function(parentContext, fiberType, rootInstance) {
    let context = {}; // data you want to pass down to the immediate child
    return context;
  },

  /**
  * This function determines whether or not a text node should be created
  * @param nextProps the props passed to the host react element
  * @param type the type of fiber e.g 'div', 'span'
  * @return a boolean value
  */
  shouldSetTextContent: function(type, nextProps) {
    return false;
  },

  /**
  * This function specifies how the renderer should handle the text content
  * @param newText the text string which needs rendering
  * @param rootContainerInstance the root dom node specified when render is called. Usually <div id="root"></div>
  * @param currentHostContext the context from the host node enclosing the text node
  * @param workInProgress the fiber node the text instance
  * @return the text view element
  */
  createTextInstance: function(newText, rootContainerInstance, currentHostContext, workInProgress) {
    return document.createTextNode(newText);
  },

  /**
  * This function creates dom elements on all host nodes except for leaf text nodes. This is so we return the correct
  * view element for each host type
  * @param newText the text string which needs rendering
  * @param rootContainerInstance the root dom node specified when render is called. Usually <div id="root"></div>
  * @param currentHostContext the context from the host node enclosing the text node
  * @param workInProgress the fiber node the text instance
  * @return the dom element
  */
  createInstance: function(type, newProps, rootContainerInstance, currentHostContext, workInProgress) {
    const element = document.createElement(type);
    element.className = newProps.className || '';
    element.style = newProps.style;

    // this function also takes care of the props sent to the host element e.g setting up event listeners
    if (newProps.onClick) {
      element.addEventListener('click', newProps.onClick)
    }

    return element;
  },

  /**
  * This function attaches the child dom node to the parent on the initial render phase. It is called
  * for each child of the current node
  * @param parent the current node in the traversal
  * @param child the child dom node of the current node
  */
  appendInitialChild: function(parent, child) {
    parent.appendChild(child);
  },

  /**
  * This function adds default dom properties such as event listeners
  * @param instance the dom element from appendInitialChild
  * @param type the type of fiber e.g 'div', 'span'
  * @param newProps the props passed to the host react element
  * @param rootContainerInstance the root dom node specified when render is called. Usually <div id="root"></div>
  * @param currentHostContext the context from the parent node enclosing this node. This is the return value from
  * getChildHostContext of the parent node
  * @return a boolean value which decides if commitMount for this element needs to be called
  */
  finalizeInitialChildren: function(instance, type, newProps, rootContainerInstance, currentHostContext) {
    return newProps.autofocus // return true for experimenting
  },

  /**
  * This function is called on in-memory render trees. Any prepatory work that needs to be done on the rootContainer
  * is done before it is attached. For example, it tracks all the currently focused elements or temporarily disabled
  * events
  * @param rootContainerInstance the root dom node specified when render is called. Usually <div id="root"></div>
  */
  prepareForCommit: function(rootContainerInstance) {
    // no-op in our case
  },

  /**
  * This function is called when the in-memory render tree is attached to the root dom element. You can do post-attach
  * operations such as re-enabling events and refocusing elements
  * @param rootContainerInstance the root dom node specified when render is called. Usually <div id="root"></div>
  */
  resetAfterCommit: function(rootContainerInstance) {
    // no-op in our case
  },

  /**
  * This function attaches the in-memory render tree to the root host div. It only works if supportsMutation is set
  * to true
  * @param parent the root div or container
  * @param child the child dom node tree or the in-memory tree
  */
  appendChildToContainer: function(parent, child) {
    parent.appendChild(child);
  },

  /**
  * This function is called on every element which has set the return value of finalizeInitialChildren to true. It
  * is called when the entire tree has been attached to the dom
  * @param parent the root div or container
  * @param child the child dom node tree or the in-memory tree
  */
  commitMount: function(domElement, type, newProps, fiberNode) {
    domElement.focus();
  },
  supportsMutation: true,

  /**
  * This function tells the reconciler whether an update should be performed. No DOM changes are done here
  * @param instance the current dom instance of the node
  * @param type the type of fiber e.g 'div', 'span'
  * @param oldProps the props before this update
  * @param newProps the new props
  * @param rootContainerInstance the root dom node specified when render is called. Usually <div id="root"></div>
  * @param currentHostContext the context from the parent node enclosing this node. This is the return value from
  * getChildHostContext of the parent node
  * @return a payload object containing informaton on what needs to be changed on the host element
  */
  prepareUpdate: function(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
    return; // nothing in our case
  },

  /**
  * This function performs all the updates queued by prepareUpdate. DOM manipulation work can be done here
  * @param updatePayload the payload object from from prepareUpdate
  * @param type the type of fiber e.g 'div', 'span'
  * @param oldProps the props before this update
  * @param newProps the new props
  * @param finishedWork the fiber node which manages work for this instance
  */
  commitUpdate: function(instance, updatePayload, type, oldProps, newProps, finishedWork) {
    return; // nothing in our case
  },

  
  /**
  * This function performs the actual DOM update on the text node
  * @param textInstance the current text node on the dom
  * @param oldText the text before this update
  * @param newText the new text to be updated
  */
  commitTextUpdate: function(textInstance, oldText, newText) {
    textInstance.nodeValue = newText;
  }
}

const reconcilerInstance = Reconciler(HostConfig);

const ReactExperimentalRenderer = {
  render(element, renderDom, callback) {
    /**
    * @param element The react element
    * @param renderDom The host root element to which the rendered app will be attached
    * @param callback The callback will be called after render is done
    */
    
    const isAsync = false; // disable async rendering
    const container = reconcilerInstance.createContainer(renderDom, isAsync); // create root fiber node

    const parentComponent = null; // set parentComponent to null since this is the root fiber. There is no parent
    reconcilerInstance.updateContainer(
      element,
      container,
      parentComponent,
      callback
    ); // start reconciliation and render the result
  }
}

module.exports = ReactExperimentalRenderer;