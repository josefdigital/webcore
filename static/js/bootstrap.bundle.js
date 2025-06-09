"use strict";
(self["webpackChunkwebcore"] = self["webpackChunkwebcore"] || []).push([["bootstrap"],{

/***/ "./node_modules/bootstrap/dist/js/bootstrap.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/bootstrap/dist/js/bootstrap.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alert: () => (/* binding */ Alert),
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   Carousel: () => (/* binding */ Carousel),
/* harmony export */   Collapse: () => (/* binding */ Collapse),
/* harmony export */   Dropdown: () => (/* binding */ Dropdown),
/* harmony export */   Modal: () => (/* binding */ Modal),
/* harmony export */   Offcanvas: () => (/* binding */ Offcanvas),
/* harmony export */   Popover: () => (/* binding */ Popover),
/* harmony export */   ScrollSpy: () => (/* binding */ ScrollSpy),
/* harmony export */   Tab: () => (/* binding */ Tab),
/* harmony export */   Toast: () => (/* binding */ Toast),
/* harmony export */   Tooltip: () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
/*!
  * Bootstrap v5.3.6 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */


/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

const elementMap = new Map();
const Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }
    const instanceMap = elementMap.get(element);

    // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }
    instanceMap.set(key, instance);
  },
  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }
    return null;
  },
  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }
    const instanceMap = elementMap.get(element);
    instanceMap.delete(key);

    // free up element references if there are no instances left for an element
    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const MAX_UID = 1000000;
const MILLISECONDS_MULTIPLIER = 1000;
const TRANSITION_END = 'transitionend';

/**
 * Properly escape IDs selectors to handle weird IDs
 * @param {string} selector
 * @returns {string}
 */
const parseSelector = selector => {
  if (selector && window.CSS && window.CSS.escape) {
    // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
    selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
  }
  return selector;
};

// Shout-out Angus Croll (https://goo.gl/pxwQGp)
const toType = object => {
  if (object === null || object === undefined) {
    return `${object}`;
  }
  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};

/**
 * Public Util API
 */

const getUID = prefix => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));
  return prefix;
};
const getTransitionDurationFromElement = element => {
  if (!element) {
    return 0;
  }

  // Get transition-duration of the element
  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
const triggerTransitionEnd = element => {
  element.dispatchEvent(new Event(TRANSITION_END));
};
const isElement = object => {
  if (!object || typeof object !== 'object') {
    return false;
  }
  if (typeof object.jquery !== 'undefined') {
    object = object[0];
  }
  return typeof object.nodeType !== 'undefined';
};
const getElement = object => {
  // it's a jQuery object or a node element
  if (isElement(object)) {
    return object.jquery ? object[0] : object;
  }
  if (typeof object === 'string' && object.length > 0) {
    return document.querySelector(parseSelector(object));
  }
  return null;
};
const isVisible = element => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }
  const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  // Handle `details` element as its content may falsie appear visible when it is closed
  const closedDetails = element.closest('details:not([open])');
  if (!closedDetails) {
    return elementIsVisible;
  }
  if (closedDetails !== element) {
    const summary = element.closest('summary');
    if (summary && summary.parentNode !== closedDetails) {
      return false;
    }
    if (summary === null) {
      return false;
    }
  }
  return elementIsVisible;
};
const isDisabled = element => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element.classList.contains('disabled')) {
    return true;
  }
  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }
  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};
const findShadowRoot = element => {
  if (!document.documentElement.attachShadow) {
    return null;
  }

  // Can find the shadow root otherwise it'll return the document
  if (typeof element.getRootNode === 'function') {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element instanceof ShadowRoot) {
    return element;
  }

  // when we don't find a shadow root
  if (!element.parentNode) {
    return null;
  }
  return findShadowRoot(element.parentNode);
};
const noop = () => {};

/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.harrytheo.com/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
const reflow = element => {
  element.offsetHeight; // eslint-disable-line no-unused-expressions
};
const getjQuery = () => {
  if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return window.jQuery;
  }
  return null;
};
const DOMContentLoadedCallbacks = [];
const onDOMContentLoaded = callback => {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const callback of DOMContentLoadedCallbacks) {
          callback();
        }
      });
    }
    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};
const isRTL = () => document.documentElement.dir === 'rtl';
const defineJQueryPlugin = plugin => {
  onDOMContentLoaded(() => {
    const $ = getjQuery();
    /* istanbul ignore if */
    if ($) {
      const name = plugin.NAME;
      const JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};
const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
  return typeof possibleCallback === 'function' ? possibleCallback.call(...args) : defaultValue;
};
const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({
    target
  }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};

/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */
const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  const listLength = list.length;
  let index = list.indexOf(activeElement);

  // if the element does not exist in the list return an element
  // depending on the direction and if cycle is allowed
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {}; // Events storage
let uidEvent = 1;
const customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

/**
 * Private methods
 */

function makeEventUid(element, uid) {
  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}
function getElementEvents(element) {
  const uid = makeEventUid(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}
function bootstrapHandler(element, fn) {
  return function handler(event) {
    hydrateObj(event, {
      delegateTarget: element
    });
    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }
    return fn.apply(element, [event]);
  };
}
function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);
    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (const domElement of domElements) {
        if (domElement !== target) {
          continue;
        }
        hydrateObj(event, {
          delegateTarget: target
        });
        if (handler.oneOff) {
          EventHandler.off(element, event.type, selector, fn);
        }
        return fn.apply(target, [event]);
      }
    }
  };
}
function findHandler(events, callable, delegationSelector = null) {
  return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
}
function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  const isDelegated = typeof handler === 'string';
  // TODO: tooltip passes `false` instead of selector, so we need to check
  const callable = isDelegated ? delegationFunction : handler || delegationFunction;
  let typeEvent = getTypeEvent(originalTypeEvent);
  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent;
  }
  return [isDelegated, callable, typeEvent];
}
function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }
  let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

  // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does
  if (originalTypeEvent in customEvents) {
    const wrapFunction = fn => {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };
    callable = wrapFunction(callable);
  }
  const events = getElementEvents(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff;
    return;
  }
  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
  const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
  fn.delegationSelector = isDelegated ? handler : null;
  fn.callable = callable;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, isDelegated);
}
function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn) {
    return;
  }
  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
    if (handlerKey.includes(namespace)) {
      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    }
  }
}
function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}
const EventHandler = {
  on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false);
  },
  one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true);
  },
  off(element, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getElementEvents(element);
    const storeElementEvent = events[typeEvent] || {};
    const isNamespace = originalTypeEvent.startsWith('.');
    if (typeof callable !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!Object.keys(storeElementEvent).length) {
        return;
      }
      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
      return;
    }
    if (isNamespace) {
      for (const elementEvent of Object.keys(events)) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      }
    }
    for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
      const handlerKey = keyHandlers.replace(stripUidRegex, '');
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  },
  trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }
    const $ = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    let jQueryEvent = null;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    const evt = hydrateObj(new Event(event, {
      bubbles,
      cancelable: true
    }), args);
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
function hydrateObj(obj, meta = {}) {
  for (const [key, value] of Object.entries(meta)) {
    try {
      obj[key] = value;
    } catch (_unused) {
      Object.defineProperty(obj, key, {
        configurable: true,
        get() {
          return value;
        }
      });
    }
  }
  return obj;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(value) {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === '' || value === 'null') {
    return null;
  }
  if (typeof value !== 'string') {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (_unused) {
    return value;
  }
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },
  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },
  getDataAttributes(element) {
    if (!element) {
      return {};
    }
    const attributes = {};
    const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
    for (const key of bsKeys) {
      let pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    }
    return attributes;
  },
  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Class definition
 */

class Config {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    return config;
  }
  _mergeConfigObj(config, element) {
    const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

    return {
      ...this.constructor.Default,
      ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
      ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
      ...(typeof config === 'object' ? config : {})
    };
  }
  _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    for (const [property, expectedTypes] of Object.entries(configTypes)) {
      const value = config[property];
      const valueType = isElement(value) ? 'element' : toType(value);
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const VERSION = '5.3.6';

/**
 * Class definition
 */

class BaseComponent extends Config {
  constructor(element, config) {
    super();
    element = getElement(element);
    if (!element) {
      return;
    }
    this._element = element;
    this._config = this._getConfig(config);
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      this[propertyName] = null;
    }
  }

  // Private
  _queueCallback(callback, element, isAnimated = true) {
    executeAfterTransition(callback, element, isAnimated);
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config, this._element);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }

  // Static
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }
  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(name) {
    return `${name}${this.EVENT_KEY}`;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const getSelector = element => {
  let selector = element.getAttribute('data-bs-target');
  if (!selector || selector === '#') {
    let hrefAttribute = element.getAttribute('href');

    // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273
    if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
      return null;
    }

    // Just in case some CMS puts out a full URL with the anchor appended
    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
      hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
    }
    selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
  }
  return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null;
};
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },
  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },
  children(element, selector) {
    return [].concat(...element.children).filter(child => child.matches(selector));
  },
  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode.closest(selector);
    while (ancestor) {
      parents.push(ancestor);
      ancestor = ancestor.parentNode.closest(selector);
    }
    return parents;
  },
  prev(element, selector) {
    let previous = element.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(element, selector) {
    let next = element.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren(element) {
    const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
    return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
  },
  getSelectorFromElement(element) {
    const selector = getSelector(element);
    if (selector) {
      return SelectorEngine.findOne(selector) ? selector : null;
    }
    return null;
  },
  getElementFromSelector(element) {
    const selector = getSelector(element);
    return selector ? SelectorEngine.findOne(selector) : null;
  },
  getMultipleElementsFromSelector(element) {
    const selector = getSelector(element);
    return selector ? SelectorEngine.find(selector) : [];
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const enableDismissTrigger = (component, method = 'hide') => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target);

    // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
    instance[method]();
  });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$f = 'alert';
const DATA_KEY$a = 'bs.alert';
const EVENT_KEY$b = `.${DATA_KEY$a}`;
const EVENT_CLOSE = `close${EVENT_KEY$b}`;
const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
const CLASS_NAME_FADE$5 = 'fade';
const CLASS_NAME_SHOW$8 = 'show';

/**
 * Class definition
 */

class Alert extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$f;
  }

  // Public
  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    if (closeEvent.defaultPrevented) {
      return;
    }
    this._element.classList.remove(CLASS_NAME_SHOW$8);
    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  }

  // Private
  _destroyElement() {
    this._element.remove();
    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Alert.getOrCreateInstance(this);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}

/**
 * Data API implementation
 */

enableDismissTrigger(Alert, 'close');

/**
 * jQuery
 */

defineJQueryPlugin(Alert);

/**
 * --------------------------------------------------------------------------
 * Bootstrap button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$e = 'button';
const DATA_KEY$9 = 'bs.button';
const EVENT_KEY$a = `.${DATA_KEY$9}`;
const DATA_API_KEY$6 = '.data-api';
const CLASS_NAME_ACTIVE$3 = 'active';
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

/**
 * Class definition
 */

class Button extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$e;
  }

  // Public
  toggle() {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Button.getOrCreateInstance(this);
      if (config === 'toggle') {
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  const data = Button.getOrCreateInstance(button);
  data.toggle();
});

/**
 * jQuery
 */

defineJQueryPlugin(Button);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/swipe.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$d = 'swipe';
const EVENT_KEY$9 = '.bs.swipe';
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
const POINTER_TYPE_TOUCH = 'touch';
const POINTER_TYPE_PEN = 'pen';
const CLASS_NAME_POINTER_EVENT = 'pointer-event';
const SWIPE_THRESHOLD = 40;
const Default$c = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
};
const DefaultType$c = {
  endCallback: '(function|null)',
  leftCallback: '(function|null)',
  rightCallback: '(function|null)'
};

/**
 * Class definition
 */

class Swipe extends Config {
  constructor(element, config) {
    super();
    this._element = element;
    if (!element || !Swipe.isSupported()) {
      return;
    }
    this._config = this._getConfig(config);
    this._deltaX = 0;
    this._supportPointerEvents = Boolean(window.PointerEvent);
    this._initEvents();
  }

  // Getters
  static get Default() {
    return Default$c;
  }
  static get DefaultType() {
    return DefaultType$c;
  }
  static get NAME() {
    return NAME$d;
  }

  // Public
  dispose() {
    EventHandler.off(this._element, EVENT_KEY$9);
  }

  // Private
  _start(event) {
    if (!this._supportPointerEvents) {
      this._deltaX = event.touches[0].clientX;
      return;
    }
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX;
    }
  }
  _end(event) {
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX - this._deltaX;
    }
    this._handleSwipe();
    execute(this._config.endCallback);
  }
  _move(event) {
    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const absDeltaX = Math.abs(this._deltaX);
    if (absDeltaX <= SWIPE_THRESHOLD) {
      return;
    }
    const direction = absDeltaX / this._deltaX;
    this._deltaX = 0;
    if (!direction) {
      return;
    }
    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    if (this._supportPointerEvents) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
    }
  }
  _eventIsPointerPenTouch(event) {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
  }

  // Static
  static isSupported() {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$c = 'carousel';
const DATA_KEY$8 = 'bs.carousel';
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$5 = '.data-api';
const ARROW_LEFT_KEY$1 = 'ArrowLeft';
const ARROW_RIGHT_KEY$1 = 'ArrowRight';
const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

const ORDER_NEXT = 'next';
const ORDER_PREV = 'prev';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
const EVENT_SLID = `slid${EVENT_KEY$8}`;
const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
const CLASS_NAME_CAROUSEL = 'carousel';
const CLASS_NAME_ACTIVE$2 = 'active';
const CLASS_NAME_SLIDE = 'slide';
const CLASS_NAME_END = 'carousel-item-end';
const CLASS_NAME_START = 'carousel-item-start';
const CLASS_NAME_NEXT = 'carousel-item-next';
const CLASS_NAME_PREV = 'carousel-item-prev';
const SELECTOR_ACTIVE = '.active';
const SELECTOR_ITEM = '.carousel-item';
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
const SELECTOR_ITEM_IMG = '.carousel-item img';
const SELECTOR_INDICATORS = '.carousel-indicators';
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
};
const Default$b = {
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  ride: false,
  touch: true,
  wrap: true
};
const DefaultType$b = {
  interval: '(number|boolean)',
  // TODO:v6 remove boolean support
  keyboard: 'boolean',
  pause: '(string|boolean)',
  ride: '(boolean|string)',
  touch: 'boolean',
  wrap: 'boolean'
};

/**
 * Class definition
 */

class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._interval = null;
    this._activeElement = null;
    this._isSliding = false;
    this.touchTimeout = null;
    this._swipeHelper = null;
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._addEventListeners();
    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle();
    }
  }

  // Getters
  static get Default() {
    return Default$b;
  }
  static get DefaultType() {
    return DefaultType$b;
  }
  static get NAME() {
    return NAME$c;
  }

  // Public
  next() {
    this._slide(ORDER_NEXT);
  }
  nextWhenVisible() {
    // FIXME TODO use `document.visibilityState`
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }
  prev() {
    this._slide(ORDER_PREV);
  }
  pause() {
    if (this._isSliding) {
      triggerTransitionEnd(this._element);
    }
    this._clearInterval();
  }
  cycle() {
    this._clearInterval();
    this._updateInterval();
    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (!this._config.ride) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
      return;
    }
    this.cycle();
  }
  to(index) {
    const items = this._getItems();
    if (index > items.length - 1 || index < 0) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }
    const activeIndex = this._getItemIndex(this._getActive());
    if (activeIndex === index) {
      return;
    }
    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    this._slide(order, items[index]);
  }
  dispose() {
    if (this._swipeHelper) {
      this._swipeHelper.dispose();
    }
    super.dispose();
  }

  // Private
  _configAfterMerge(config) {
    config.defaultInterval = config.interval;
    return config;
  }
  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
    }
    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
    }
    if (this._config.touch && Swipe.isSupported()) {
      this._addTouchEventListeners();
    }
  }
  _addTouchEventListeners() {
    for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
      EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
    }
    const endCallBack = () => {
      if (this._config.pause !== 'hover') {
        return;
      }

      // If it's a touch-enabled device, mouseenter/leave are fired as
      // part of the mouse compatibility events on first tap - the carousel
      // would stop cycling until user tapped out of it;
      // here, we listen for touchend, explicitly pause the carousel
      // (as if it's the second time we tap on it, mouseenter compat event
      // is NOT fired) and after a timeout (to allow for mouse compatibility
      // events to fire) we explicitly restart cycling

      this.pause();
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout);
      }
      this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
    };
    const swipeConfig = {
      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
      endCallback: endCallBack
    };
    this._swipeHelper = new Swipe(this._element, swipeConfig);
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
      event.preventDefault();
      this._slide(this._directionToOrder(direction));
    }
  }
  _getItemIndex(element) {
    return this._getItems().indexOf(element);
  }
  _setActiveIndicatorElement(index) {
    if (!this._indicatorsElement) {
      return;
    }
    const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
    activeIndicator.removeAttribute('aria-current');
    const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
      newActiveIndicator.setAttribute('aria-current', 'true');
    }
  }
  _updateInterval() {
    const element = this._activeElement || this._getActive();
    if (!element) {
      return;
    }
    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
    this._config.interval = elementInterval || this._config.defaultInterval;
  }
  _slide(order, element = null) {
    if (this._isSliding) {
      return;
    }
    const activeElement = this._getActive();
    const isNext = order === ORDER_NEXT;
    const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
    if (nextElement === activeElement) {
      return;
    }
    const nextElementIndex = this._getItemIndex(nextElement);
    const triggerEvent = eventName => {
      return EventHandler.trigger(this._element, eventName, {
        relatedTarget: nextElement,
        direction: this._orderToDirection(order),
        from: this._getItemIndex(activeElement),
        to: nextElementIndex
      });
    };
    const slideEvent = triggerEvent(EVENT_SLIDE);
    if (slideEvent.defaultPrevented) {
      return;
    }
    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      // TODO: change tests that use empty divs to avoid this check
      return;
    }
    const isCycling = Boolean(this._interval);
    this.pause();
    this._isSliding = true;
    this._setActiveIndicatorElement(nextElementIndex);
    this._activeElement = nextElement;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    nextElement.classList.add(orderClassName);
    reflow(nextElement);
    activeElement.classList.add(directionalClassName);
    nextElement.classList.add(directionalClassName);
    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
      this._isSliding = false;
      triggerEvent(EVENT_SLID);
    };
    this._queueCallback(completeCallBack, activeElement, this._isAnimated());
    if (isCycling) {
      this.cycle();
    }
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_SLIDE);
  }
  _getActive() {
    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
  }
  _getItems() {
    return SelectorEngine.find(SELECTOR_ITEM, this._element);
  }
  _clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _directionToOrder(direction) {
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }
    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }
  _orderToDirection(order) {
    if (isRTL()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Carousel.getOrCreateInstance(this, config);
      if (typeof config === 'number') {
        data.to(config);
        return;
      }
      if (typeof config === 'string') {
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return;
  }
  event.preventDefault();
  const carousel = Carousel.getOrCreateInstance(target);
  const slideIndex = this.getAttribute('data-bs-slide-to');
  if (slideIndex) {
    carousel.to(slideIndex);
    carousel._maybeEnableCycle();
    return;
  }
  if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
    carousel.next();
    carousel._maybeEnableCycle();
    return;
  }
  carousel.prev();
  carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
  for (const carousel of carousels) {
    Carousel.getOrCreateInstance(carousel);
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(Carousel);

/**
 * --------------------------------------------------------------------------
 * Bootstrap collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$b = 'collapse';
const DATA_KEY$7 = 'bs.collapse';
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const DATA_API_KEY$4 = '.data-api';
const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$7 = 'show';
const CLASS_NAME_COLLAPSE = 'collapse';
const CLASS_NAME_COLLAPSING = 'collapsing';
const CLASS_NAME_COLLAPSED = 'collapsed';
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
const WIDTH = 'width';
const HEIGHT = 'height';
const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
const Default$a = {
  parent: null,
  toggle: true
};
const DefaultType$a = {
  parent: '(null|element)',
  toggle: 'boolean'
};

/**
 * Class definition
 */

class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isTransitioning = false;
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    for (const elem of toggleList) {
      const selector = SelectorEngine.getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem);
      }
    }
    this._initializeChildren();
    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }
    if (this._config.toggle) {
      this.toggle();
    }
  }

  // Getters
  static get Default() {
    return Default$a;
  }
  static get DefaultType() {
    return DefaultType$a;
  }
  static get NAME() {
    return NAME$b;
  }

  // Public
  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }
    let activeChildren = [];

    // find active children
    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
        toggle: false
      }));
    }
    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    for (const activeInstance of activeChildren) {
      activeInstance.hide();
    }
    const dimension = this._getDimension();
    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.style[dimension] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      this._element.style[dimension] = '';
      EventHandler.trigger(this._element, EVENT_SHOWN$6);
    };
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    const dimension = this._getDimension();
    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    for (const trigger of this._triggerArray) {
      const element = SelectorEngine.getElementFromSelector(trigger);
      if (element && !this._isShown(element)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      EventHandler.trigger(this._element, EVENT_HIDDEN$6);
    };
    this._element.style[dimension] = '';
    this._queueCallback(complete, this._element, true);
  }

  // Private
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  }
  _configAfterMerge(config) {
    config.toggle = Boolean(config.toggle); // Coerce string values
    config.parent = getElement(config.parent);
    return config;
  }
  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }
  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }
    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
    for (const element of children) {
      const selected = SelectorEngine.getElementFromSelector(element);
      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    }
  }
  _getFirstLevelChildren(selector) {
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    // remove children if greater depth
    return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
  }
  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }
    for (const element of triggerArray) {
      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
      element.setAttribute('aria-expanded', isOpen);
    }
  }

  // Static
  static jQueryInterface(config) {
    const _config = {};
    if (typeof config === 'string' && /show|hide/.test(config)) {
      _config.toggle = false;
    }
    return this.each(function () {
      const data = Collapse.getOrCreateInstance(this, _config);
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }
  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(Collapse);

/**
 * --------------------------------------------------------------------------
 * Bootstrap dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$a = 'dropdown';
const DATA_KEY$6 = 'bs.dropdown';
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = '.data-api';
const ESCAPE_KEY$2 = 'Escape';
const TAB_KEY$1 = 'Tab';
const ARROW_UP_KEY$1 = 'ArrowUp';
const ARROW_DOWN_KEY$1 = 'ArrowDown';
const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_SHOW$6 = 'show';
const CLASS_NAME_DROPUP = 'dropup';
const CLASS_NAME_DROPEND = 'dropend';
const CLASS_NAME_DROPSTART = 'dropstart';
const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
const SELECTOR_MENU = '.dropdown-menu';
const SELECTOR_NAVBAR = '.navbar';
const SELECTOR_NAVBAR_NAV = '.navbar-nav';
const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
const PLACEMENT_TOPCENTER = 'top';
const PLACEMENT_BOTTOMCENTER = 'bottom';
const Default$9 = {
  autoClose: true,
  boundary: 'clippingParents',
  display: 'dynamic',
  offset: [0, 2],
  popperConfig: null,
  reference: 'toggle'
};
const DefaultType$9 = {
  autoClose: '(boolean|string)',
  boundary: '(string|element)',
  display: 'string',
  offset: '(array|string|function)',
  popperConfig: '(null|object|function)',
  reference: '(string|element|object)'
};

/**
 * Class definition
 */

class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._popper = null;
    this._parent = this._element.parentNode; // dropdown wrapper
    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
    this._inNavbar = this._detectNavbar();
  }

  // Getters
  static get Default() {
    return Default$9;
  }
  static get DefaultType() {
    return DefaultType$9;
  }
  static get NAME() {
    return NAME$a;
  }

  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._createPopper();

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, 'mouseover', noop);
      }
    }
    this._element.focus();
    this._element.setAttribute('aria-expanded', true);
    this._menu.classList.add(CLASS_NAME_SHOW$6);
    this._element.classList.add(CLASS_NAME_SHOW$6);
    EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    this._completeHide(relatedTarget);
  }
  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper) {
      this._popper.update();
    }
  }

  // Private
  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
    if (hideEvent.defaultPrevented) {
      return;
    }

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, 'mouseover', noop);
      }
    }
    if (this._popper) {
      this._popper.destroy();
    }
    this._menu.classList.remove(CLASS_NAME_SHOW$6);
    this._element.classList.remove(CLASS_NAME_SHOW$6);
    this._element.setAttribute('aria-expanded', 'false');
    Manipulator.removeDataAttribute(this._menu, 'popper');
    EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);

    // Explicitly return focus to the trigger element
    this._element.focus();
  }
  _getConfig(config) {
    config = super._getConfig(config);
    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
      // Popper virtual elements require a getBoundingClientRect method
      throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }
    return config;
  }
  _createPopper() {
    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org/docs/v2/)');
    }
    let referenceElement = this._element;
    if (this._config.reference === 'parent') {
      referenceElement = this._parent;
    } else if (isElement(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === 'object') {
      referenceElement = this._config.reference;
    }
    const popperConfig = this._getPopperConfig();
    this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(referenceElement, this._menu, popperConfig);
  }
  _isShown() {
    return this._menu.classList.contains(CLASS_NAME_SHOW$6);
  }
  _getPlacement() {
    const parentDropdown = this._parent;
    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
      return PLACEMENT_TOPCENTER;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
      return PLACEMENT_BOTTOMCENTER;
    }

    // We need to trim the value because custom properties can also include spaces
    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }
    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  }
  _getOffset() {
    const {
      offset
    } = this._config;
    if (typeof offset === 'string') {
      return offset.split(',').map(value => Number.parseInt(value, 10));
    }
    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }
    return offset;
  }
  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }]
    };

    // Disable Popper if we have a static display or Dropdown is in Navbar
    if (this._inNavbar || this._config.display === 'static') {
      Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
      defaultBsPopperConfig.modifiers = [{
        name: 'applyStyles',
        enabled: false
      }];
    }
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
    };
  }
  _selectMenuItem({
    key,
    target
  }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
    if (!items.length) {
      return;
    }

    // if target isn't included in items (e.g. when expanding the dropdown)
    // allow cycling to get the last item in case key equals ARROW_UP_KEY
    getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Dropdown.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
  static clearMenus(event) {
    if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
      return;
    }
    const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    for (const toggle of openToggles) {
      const context = Dropdown.getInstance(toggle);
      if (!context || context._config.autoClose === false) {
        continue;
      }
      const composedPath = event.composedPath();
      const isMenuTarget = composedPath.includes(context._menu);
      if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
        continue;
      }

      // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
      if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
        continue;
      }
      const relatedTarget = {
        relatedTarget: context._element
      };
      if (event.type === 'click') {
        relatedTarget.clickEvent = event;
      }
      context._completeHide(relatedTarget);
    }
  }
  static dataApiKeydownHandler(event) {
    // If not an UP | DOWN | ESCAPE key => not a dropdown command
    // If input/textarea && if key is other than ESCAPE => not a dropdown command

    const isInput = /input|textarea/i.test(event.target.tagName);
    const isEscapeEvent = event.key === ESCAPE_KEY$2;
    const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
    if (!isUpOrDownEvent && !isEscapeEvent) {
      return;
    }
    if (isInput && !isEscapeEvent) {
      return;
    }
    event.preventDefault();

    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
    const instance = Dropdown.getOrCreateInstance(getToggleButton);
    if (isUpOrDownEvent) {
      event.stopPropagation();
      instance.show();
      instance._selectMenuItem(event);
      return;
    }
    if (instance._isShown()) {
      // else is escape and we check if it is shown
      event.stopPropagation();
      instance.hide();
      getToggleButton.focus();
    }
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});

/**
 * jQuery
 */

defineJQueryPlugin(Dropdown);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$9 = 'backdrop';
const CLASS_NAME_FADE$4 = 'fade';
const CLASS_NAME_SHOW$5 = 'show';
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
const Default$8 = {
  className: 'modal-backdrop',
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: 'body' // give the choice to place backdrop under different elements
};
const DefaultType$8 = {
  className: 'string',
  clickCallback: '(function|null)',
  isAnimated: 'boolean',
  isVisible: 'boolean',
  rootElement: '(element|string)'
};

/**
 * Class definition
 */

class Backdrop extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  // Getters
  static get Default() {
    return Default$8;
  }
  static get DefaultType() {
    return DefaultType$8;
  }
  static get NAME() {
    return NAME$9;
  }

  // Public
  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._append();
    const element = this._getElement();
    if (this._config.isAnimated) {
      reflow(element);
    }
    element.classList.add(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      execute(callback);
    });
  }
  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  }
  dispose() {
    if (!this._isAppended) {
      return;
    }
    EventHandler.off(this._element, EVENT_MOUSEDOWN);
    this._element.remove();
    this._isAppended = false;
  }

  // Private
  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement('div');
      backdrop.className = this._config.className;
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }
      this._element = backdrop;
    }
    return this._element;
  }
  _configAfterMerge(config) {
    // use getElement() with the default "body" to get a fresh Element on each instantiation
    config.rootElement = getElement(config.rootElement);
    return config;
  }
  _append() {
    if (this._isAppended) {
      return;
    }
    const element = this._getElement();
    this._config.rootElement.append(element);
    EventHandler.on(element, EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$8 = 'focustrap';
const DATA_KEY$5 = 'bs.focustrap';
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
const TAB_KEY = 'Tab';
const TAB_NAV_FORWARD = 'forward';
const TAB_NAV_BACKWARD = 'backward';
const Default$7 = {
  autofocus: true,
  trapElement: null // The element to trap focus inside of
};
const DefaultType$7 = {
  autofocus: 'boolean',
  trapElement: 'element'
};

/**
 * Class definition
 */

class FocusTrap extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }

  // Getters
  static get Default() {
    return Default$7;
  }
  static get DefaultType() {
    return DefaultType$7;
  }
  static get NAME() {
    return NAME$8;
  }

  // Public
  activate() {
    if (this._isActive) {
      return;
    }
    if (this._config.autofocus) {
      this._config.trapElement.focus();
    }
    EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
    EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
    this._isActive = true;
  }
  deactivate() {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$5);
  }

  // Private
  _handleFocusin(event) {
    const {
      trapElement
    } = this._config;
    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
      return;
    }
    const elements = SelectorEngine.focusableChildren(trapElement);
    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }
  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return;
    }
    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
const SELECTOR_STICKY_CONTENT = '.sticky-top';
const PROPERTY_PADDING = 'padding-right';
const PROPERTY_MARGIN = 'margin-right';

/**
 * Class definition
 */

class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }

  // Public
  getWidth() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    // give padding to element to balance the hidden scrollbar width
    this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
    // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
  }
  reset() {
    this._resetElementAttributes(this._element, 'overflow');
    this._resetElementAttributes(this._element, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }

  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, 'overflow');
    this._element.style.overflow = 'hidden';
  }
  _setElementAttributes(selector, styleProperty, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = element => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }
      this._saveInitialAttribute(element, styleProperty);
      const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
      element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _saveInitialAttribute(element, styleProperty) {
    const actualValue = element.style.getPropertyValue(styleProperty);
    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProperty, actualValue);
    }
  }
  _resetElementAttributes(selector, styleProperty) {
    const manipulationCallBack = element => {
      const value = Manipulator.getDataAttribute(element, styleProperty);
      // We only want to remove the property if the value is `null`; the value can also be zero
      if (value === null) {
        element.style.removeProperty(styleProperty);
        return;
      }
      Manipulator.removeDataAttribute(element, styleProperty);
      element.style.setProperty(styleProperty, value);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _applyManipulationCallback(selector, callBack) {
    if (isElement(selector)) {
      callBack(selector);
      return;
    }
    for (const sel of SelectorEngine.find(selector, this._element)) {
      callBack(sel);
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$7 = 'modal';
const DATA_KEY$4 = 'bs.modal';
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const DATA_API_KEY$2 = '.data-api';
const ESCAPE_KEY$1 = 'Escape';
const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_FADE$3 = 'fade';
const CLASS_NAME_SHOW$4 = 'show';
const CLASS_NAME_STATIC = 'modal-static';
const OPEN_SELECTOR$1 = '.modal.show';
const SELECTOR_DIALOG = '.modal-dialog';
const SELECTOR_MODAL_BODY = '.modal-body';
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
const Default$6 = {
  backdrop: true,
  focus: true,
  keyboard: true
};
const DefaultType$6 = {
  backdrop: '(boolean|string)',
  focus: 'boolean',
  keyboard: 'boolean'
};

/**
 * Class definition
 */

class Modal extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
    this._addEventListeners();
  }

  // Getters
  static get Default() {
    return Default$6;
  }
  static get DefaultType() {
    return DefaultType$6;
  }
  static get NAME() {
    return NAME$7;
  }

  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._isTransitioning = true;
    this._scrollBar.hide();
    document.body.classList.add(CLASS_NAME_OPEN);
    this._adjustDialog();
    this._backdrop.show(() => this._showElement(relatedTarget));
  }
  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._isShown = false;
    this._isTransitioning = true;
    this._focustrap.deactivate();
    this._element.classList.remove(CLASS_NAME_SHOW$4);
    this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
  }
  dispose() {
    EventHandler.off(window, EVENT_KEY$4);
    EventHandler.off(this._dialog, EVENT_KEY$4);
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }

  // Private
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _showElement(relatedTarget) {
    // try to append dynamic modal
    if (!document.body.contains(this._element)) {
      document.body.append(this._element);
    }
    this._element.style.display = 'block';
    this._element.removeAttribute('aria-hidden');
    this._element.setAttribute('aria-modal', true);
    this._element.setAttribute('role', 'dialog');
    this._element.scrollTop = 0;
    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW$4);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate();
      }
      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$4, {
        relatedTarget
      });
    };
    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
      if (event.key !== ESCAPE_KEY$1) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      this._triggerBackdropTransition();
    });
    EventHandler.on(window, EVENT_RESIZE$1, () => {
      if (this._isShown && !this._isTransitioning) {
        this._adjustDialog();
      }
    });
    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
      // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
      EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
        if (this._element !== event.target || this._element !== event2.target) {
          return;
        }
        if (this._config.backdrop === 'static') {
          this._triggerBackdropTransition();
          return;
        }
        if (this._config.backdrop) {
          this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = 'none';
    this._element.setAttribute('aria-hidden', true);
    this._element.removeAttribute('aria-modal');
    this._element.removeAttribute('role');
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._scrollBar.reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$4);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$3);
  }
  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const initialOverflowY = this._element.style.overflowY;
    // return if the following background transition hasn't yet completed
    if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
      return;
    }
    if (!isModalOverflowing) {
      this._element.style.overflowY = 'hidden';
    }
    this._element.classList.add(CLASS_NAME_STATIC);
    this._queueCallback(() => {
      this._element.classList.remove(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.style.overflowY = initialOverflowY;
      }, this._dialog);
    }, this._dialog);
    this._element.focus();
  }

  /**
   * The following methods are used to handle overflowing modals
   */

  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;
    if (isBodyOverflowing && !isModalOverflowing) {
      const property = isRTL() ? 'paddingLeft' : 'paddingRight';
      this._element.style[property] = `${scrollbarWidth}px`;
    }
    if (!isBodyOverflowing && isModalOverflowing) {
      const property = isRTL() ? 'paddingRight' : 'paddingLeft';
      this._element.style[property] = `${scrollbarWidth}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = '';
    this._element.style.paddingRight = '';
  }

  // Static
  static jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      const data = Modal.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](relatedTarget);
    });
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  EventHandler.one(target, EVENT_SHOW$4, showEvent => {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$4, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });

  // avoid conflict when clicking modal toggler while another one is open
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
  if (alreadyOpen) {
    Modal.getInstance(alreadyOpen).hide();
  }
  const data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);

/**
 * jQuery
 */

defineJQueryPlugin(Modal);

/**
 * --------------------------------------------------------------------------
 * Bootstrap offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$6 = 'offcanvas';
const DATA_KEY$3 = 'bs.offcanvas';
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const DATA_API_KEY$1 = '.data-api';
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
const ESCAPE_KEY = 'Escape';
const CLASS_NAME_SHOW$3 = 'show';
const CLASS_NAME_SHOWING$1 = 'showing';
const CLASS_NAME_HIDING = 'hiding';
const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
const OPEN_SELECTOR = '.offcanvas.show';
const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
const Default$5 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  scroll: 'boolean'
};

/**
 * Class definition
 */

class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }

  // Getters
  static get Default() {
    return Default$5;
  }
  static get DefaultType() {
    return DefaultType$5;
  }
  static get NAME() {
    return NAME$6;
  }

  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._backdrop.show();
    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }
    this._element.setAttribute('aria-modal', true);
    this._element.setAttribute('role', 'dialog');
    this._element.classList.add(CLASS_NAME_SHOWING$1);
    const completeCallBack = () => {
      if (!this._config.scroll || this._config.backdrop) {
        this._focustrap.activate();
      }
      this._element.classList.add(CLASS_NAME_SHOW$3);
      this._element.classList.remove(CLASS_NAME_SHOWING$1);
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.add(CLASS_NAME_HIDING);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      if (!this._config.scroll) {
        new ScrollBarHelper().reset();
      }
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }

  // Private
  _initializeBackDrop() {
    const clickCallback = () => {
      if (this._config.backdrop === 'static') {
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        return;
      }
      this.hide();
    };

    // 'static' option will be translated to true, and booleans will keep their value
    const isVisible = Boolean(this._config.backdrop);
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: isVisible ? clickCallback : null
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
      if (event.key !== ESCAPE_KEY) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    });
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Offcanvas.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  EventHandler.one(target, EVENT_HIDDEN$3, () => {
    // focus on trigger when it is closed
    if (isVisible(this)) {
      this.focus();
    }
  });

  // avoid conflict when clicking a toggler of an offcanvas, while another is open
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
  if (alreadyOpen && alreadyOpen !== target) {
    Offcanvas.getInstance(alreadyOpen).hide();
  }
  const data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
    Offcanvas.getOrCreateInstance(selector).show();
  }
});
EventHandler.on(window, EVENT_RESIZE, () => {
  for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
    if (getComputedStyle(element).position !== 'fixed') {
      Offcanvas.getOrCreateInstance(element).hide();
    }
  }
});
enableDismissTrigger(Offcanvas);

/**
 * jQuery
 */

defineJQueryPlugin(Offcanvas);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

// js-docs-start allow-list
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
const DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
// js-docs-end allow-list

const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

/**
 * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
 * contexts.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
 */
// eslint-disable-next-line unicorn/better-regex
const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
const allowedAttribute = (attribute, allowedAttributeList) => {
  const attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }

  // Check if a regular expression validates the attribute.
  return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFunction && typeof sanitizeFunction === 'function') {
    return sanitizeFunction(unsafeHtml);
  }
  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
  for (const element of elements) {
    const elementName = element.nodeName.toLowerCase();
    if (!Object.keys(allowList).includes(elementName)) {
      element.remove();
      continue;
    }
    const attributeList = [].concat(...element.attributes);
    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
    for (const attribute of attributeList) {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName);
      }
    }
  }
  return createdDocument.body.innerHTML;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/template-factory.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$5 = 'TemplateFactory';
const Default$4 = {
  allowList: DefaultAllowlist,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: '',
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: '<div></div>'
};
const DefaultType$4 = {
  allowList: 'object',
  content: 'object',
  extraClass: '(string|function)',
  html: 'boolean',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  template: 'string'
};
const DefaultContentType = {
  entry: '(string|element|function|null)',
  selector: '(string|element)'
};

/**
 * Class definition
 */

class TemplateFactory extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
  }

  // Getters
  static get Default() {
    return Default$4;
  }
  static get DefaultType() {
    return DefaultType$4;
  }
  static get NAME() {
    return NAME$5;
  }

  // Public
  getContent() {
    return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(content) {
    this._checkContent(content);
    this._config.content = {
      ...this._config.content,
      ...content
    };
    return this;
  }
  toHtml() {
    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
    for (const [selector, text] of Object.entries(this._config.content)) {
      this._setContent(templateWrapper, text, selector);
    }
    const template = templateWrapper.children[0];
    const extraClass = this._resolvePossibleFunction(this._config.extraClass);
    if (extraClass) {
      template.classList.add(...extraClass.split(' '));
    }
    return template;
  }

  // Private
  _typeCheckConfig(config) {
    super._typeCheckConfig(config);
    this._checkContent(config.content);
  }
  _checkContent(arg) {
    for (const [selector, content] of Object.entries(arg)) {
      super._typeCheckConfig({
        selector,
        entry: content
      }, DefaultContentType);
    }
  }
  _setContent(template, content, selector) {
    const templateElement = SelectorEngine.findOne(selector, template);
    if (!templateElement) {
      return;
    }
    content = this._resolvePossibleFunction(content);
    if (!content) {
      templateElement.remove();
      return;
    }
    if (isElement(content)) {
      this._putElementInTemplate(getElement(content), templateElement);
      return;
    }
    if (this._config.html) {
      templateElement.innerHTML = this._maybeSanitize(content);
      return;
    }
    templateElement.textContent = content;
  }
  _maybeSanitize(arg) {
    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [undefined, this]);
  }
  _putElementInTemplate(element, templateElement) {
    if (this._config.html) {
      templateElement.innerHTML = '';
      templateElement.append(element);
      return;
    }
    templateElement.textContent = element.textContent;
  }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$4 = 'tooltip';
const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
const CLASS_NAME_FADE$2 = 'fade';
const CLASS_NAME_MODAL = 'modal';
const CLASS_NAME_SHOW$2 = 'show';
const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
const EVENT_MODAL_HIDE = 'hide.bs.modal';
const TRIGGER_HOVER = 'hover';
const TRIGGER_FOCUS = 'focus';
const TRIGGER_CLICK = 'click';
const TRIGGER_MANUAL = 'manual';
const EVENT_HIDE$2 = 'hide';
const EVENT_HIDDEN$2 = 'hidden';
const EVENT_SHOW$2 = 'show';
const EVENT_SHOWN$2 = 'shown';
const EVENT_INSERTED = 'inserted';
const EVENT_CLICK$1 = 'click';
const EVENT_FOCUSIN$1 = 'focusin';
const EVENT_FOCUSOUT$1 = 'focusout';
const EVENT_MOUSEENTER = 'mouseenter';
const EVENT_MOUSELEAVE = 'mouseleave';
const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
const Default$3 = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: 'clippingParents',
  container: false,
  customClass: '',
  delay: 0,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  html: false,
  offset: [0, 6],
  placement: 'top',
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  title: '',
  trigger: 'hover focus'
};
const DefaultType$3 = {
  allowList: 'object',
  animation: 'boolean',
  boundary: '(string|element)',
  container: '(string|element|boolean)',
  customClass: '(string|function)',
  delay: '(number|object)',
  fallbackPlacements: 'array',
  html: 'boolean',
  offset: '(array|string|function)',
  placement: '(string|function)',
  popperConfig: '(null|object|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  selector: '(string|boolean)',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string'
};

/**
 * Class definition
 */

class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org/docs/v2/)');
    }
    super(element, config);

    // Private
    this._isEnabled = true;
    this._timeout = 0;
    this._isHovered = null;
    this._activeTrigger = {};
    this._popper = null;
    this._templateFactory = null;
    this._newContent = null;

    // Protected
    this.tip = null;
    this._setListeners();
    if (!this._config.selector) {
      this._fixTitle();
    }
  }

  // Getters
  static get Default() {
    return Default$3;
  }
  static get DefaultType() {
    return DefaultType$3;
  }
  static get NAME() {
    return NAME$4;
  }

  // Public
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!this._isEnabled) {
      return;
    }
    if (this._isShown()) {
      this._leave();
      return;
    }
    this._enter();
  }
  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this._element.getAttribute('data-bs-original-title')) {
      this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
    }
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === 'none') {
      throw new Error('Please use show on visible elements');
    }
    if (!(this._isWithContent() && this._isEnabled)) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }

    // TODO: v6 remove this or make it optional
    this._disposePopper();
    const tip = this._getTipElement();
    this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
    const {
      container
    } = this._config;
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    }
    this._popper = this._createPopper(tip);
    tip.classList.add(CLASS_NAME_SHOW$2);

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, 'mouseover', noop);
      }
    }
    const complete = () => {
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
      if (this._isHovered === false) {
        this._leave();
      }
      this._isHovered = false;
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
    if (hideEvent.defaultPrevented) {
      return;
    }
    const tip = this._getTipElement();
    tip.classList.remove(CLASS_NAME_SHOW$2);

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, 'mouseover', noop);
      }
    }
    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    this._isHovered = null; // it is a trick to support manual triggering

    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }
      if (!this._isHovered) {
        this._disposePopper();
      }
      this._element.removeAttribute('aria-describedby');
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  update() {
    if (this._popper) {
      this._popper.update();
    }
  }

  // Protected
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    if (!this.tip) {
      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    }
    return this.tip;
  }
  _createTipElement(content) {
    const tip = this._getTemplateFactory(content).toHtml();

    // TODO: remove this check in v6
    if (!tip) {
      return null;
    }
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    // TODO: v6 the following can be achieved with CSS only
    tip.classList.add(`bs-${this.constructor.NAME}-auto`);
    const tipId = getUID(this.constructor.NAME).toString();
    tip.setAttribute('id', tipId);
    if (this._isAnimated()) {
      tip.classList.add(CLASS_NAME_FADE$2);
    }
    return tip;
  }
  setContent(content) {
    this._newContent = content;
    if (this._isShown()) {
      this._disposePopper();
      this.show();
    }
  }
  _getTemplateFactory(content) {
    if (this._templateFactory) {
      this._templateFactory.changeContent(content);
    } else {
      this._templateFactory = new TemplateFactory({
        ...this._config,
        // the `content` var has to be after `this._config`
        // to override config.content in case of popover
        content,
        extraClass: this._resolvePossibleFunction(this._config.customClass)
      });
    }
    return this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
  }

  // Private
  _initializeOnDelegatedTarget(event) {
    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
  }
  _createPopper(tip) {
    const placement = execute(this._config.placement, [this, tip, this._element]);
    const attachment = AttachmentMap[placement.toUpperCase()];
    return _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(this._element, tip, this._getPopperConfig(attachment));
  }
  _getOffset() {
    const {
      offset
    } = this._config;
    if (typeof offset === 'string') {
      return offset.split(',').map(value => Number.parseInt(value, 10));
    }
    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }
    return offset;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [this._element, this._element]);
  }
  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: 'flip',
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }, {
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'arrow',
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: 'preSetPlacement',
        enabled: true,
        phase: 'beforeMain',
        fn: data => {
          // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
          // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
          this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
        }
      }]
    };
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
    };
  }
  _setListeners() {
    const triggers = this._config.trigger.split(' ');
    for (const trigger of triggers) {
      if (trigger === 'click') {
        EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context.toggle();
        });
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
        EventHandler.on(this._element, eventIn, this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
          context._enter();
        });
        EventHandler.on(this._element, eventOut, this._config.selector, event => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
          context._leave();
        });
      }
    }
    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };
    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
  }
  _fixTitle() {
    const title = this._element.getAttribute('title');
    if (!title) {
      return;
    }
    if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
      this._element.setAttribute('aria-label', title);
    }
    this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
    this._element.removeAttribute('title');
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = true;
      return;
    }
    this._isHovered = true;
    this._setTimeout(() => {
      if (this._isHovered) {
        this.show();
      }
    }, this._config.delay.show);
  }
  _leave() {
    if (this._isWithActiveTrigger()) {
      return;
    }
    this._isHovered = false;
    this._setTimeout(() => {
      if (!this._isHovered) {
        this.hide();
      }
    }, this._config.delay.hide);
  }
  _setTimeout(handler, timeout) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(handler, timeout);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(true);
  }
  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    for (const dataAttribute of Object.keys(dataAttributes)) {
      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
        delete dataAttributes[dataAttribute];
      }
    }
    config = {
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    };
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    config.container = config.container === false ? document.body : getElement(config.container);
    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }
    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }
    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }
    return config;
  }
  _getDelegateConfig() {
    const config = {};
    for (const [key, value] of Object.entries(this._config)) {
      if (this.constructor.Default[key] !== value) {
        config[key] = value;
      }
    }
    config.selector = false;
    config.trigger = 'manual';

    // In the future can be replaced with:
    // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
    // `Object.fromEntries(keysWithDifferentValues)`
    return config;
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
    if (this.tip) {
      this.tip.remove();
      this.tip = null;
    }
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Tooltip.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * jQuery
 */

defineJQueryPlugin(Tooltip);

/**
 * --------------------------------------------------------------------------
 * Bootstrap popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$3 = 'popover';
const SELECTOR_TITLE = '.popover-header';
const SELECTOR_CONTENT = '.popover-body';
const Default$2 = {
  ...Tooltip.Default,
  content: '',
  offset: [0, 8],
  placement: 'right',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
  trigger: 'click'
};
const DefaultType$2 = {
  ...Tooltip.DefaultType,
  content: '(null|string|element|function)'
};

/**
 * Class definition
 */

class Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default$2;
  }
  static get DefaultType() {
    return DefaultType$2;
  }
  static get NAME() {
    return NAME$3;
  }

  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }

  // Private
  _getContentForTemplate() {
    return {
      [SELECTOR_TITLE]: this._getTitle(),
      [SELECTOR_CONTENT]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Popover.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * jQuery
 */

defineJQueryPlugin(Popover);

/**
 * --------------------------------------------------------------------------
 * Bootstrap scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$2 = 'scrollspy';
const DATA_KEY$2 = 'bs.scrollspy';
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY = '.data-api';
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_CLICK = `click${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
const CLASS_NAME_ACTIVE$1 = 'active';
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_TARGET_LINKS = '[href]';
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
const SELECTOR_NAV_LINKS = '.nav-link';
const SELECTOR_NAV_ITEMS = '.nav-item';
const SELECTOR_LIST_ITEMS = '.list-group-item';
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
const SELECTOR_DROPDOWN = '.dropdown';
const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
const Default$1 = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: '0px 0px -25%',
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
};
const DefaultType$1 = {
  offset: '(number|null)',
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: 'string',
  smoothScroll: 'boolean',
  target: 'element',
  threshold: 'array'
};

/**
 * Class definition
 */

class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element, config);

    // this._element is the observablesContainer and config.target the menu links wrapper
    this._targetLinks = new Map();
    this._observableSections = new Map();
    this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    };
    this.refresh(); // initialize
  }

  // Getters
  static get Default() {
    return Default$1;
  }
  static get DefaultType() {
    return DefaultType$1;
  }
  static get NAME() {
    return NAME$2;
  }

  // Public
  refresh() {
    this._initializeTargetsAndObservables();
    this._maybeEnableSmoothScroll();
    if (this._observer) {
      this._observer.disconnect();
    } else {
      this._observer = this._getNewObserver();
    }
    for (const section of this._observableSections.values()) {
      this._observer.observe(section);
    }
  }
  dispose() {
    this._observer.disconnect();
    super.dispose();
  }

  // Private
  _configAfterMerge(config) {
    // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
    config.target = getElement(config.target) || document.body;

    // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
    config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
    if (typeof config.threshold === 'string') {
      config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
    }
    return config;
  }
  _maybeEnableSmoothScroll() {
    if (!this._config.smoothScroll) {
      return;
    }

    // unregister any previous listeners
    EventHandler.off(this._config.target, EVENT_CLICK);
    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
      const observableSection = this._observableSections.get(event.target.hash);
      if (observableSection) {
        event.preventDefault();
        const root = this._rootElement || window;
        const height = observableSection.offsetTop - this._element.offsetTop;
        if (root.scrollTo) {
          root.scrollTo({
            top: height,
            behavior: 'smooth'
          });
          return;
        }

        // Chrome 60 doesn't support `scrollTo`
        root.scrollTop = height;
      }
    });
  }
  _getNewObserver() {
    const options = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver(entries => this._observerCallback(entries), options);
  }

  // The logic of selection
  _observerCallback(entries) {
    const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
    const activate = entry => {
      this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
      this._process(targetElement(entry));
    };
    const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
    const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = parentScrollTop;
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        this._activeTarget = null;
        this._clearActiveClass(targetElement(entry));
        continue;
      }
      const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      // if we are scrolling down, pick the bigger offsetTop
      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry);
        // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
        if (!parentScrollTop) {
          return;
        }
        continue;
      }

      // if we are scrolling up, pick the smallest offsetTop
      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry);
      }
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = new Map();
    this._observableSections = new Map();
    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
    for (const anchor of targetLinks) {
      // ensure that the anchor has an id and is not disabled
      if (!anchor.hash || isDisabled(anchor)) {
        continue;
      }
      const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

      // ensure that the observableSection exists & is visible
      if (isVisible(observableSection)) {
        this._targetLinks.set(decodeURI(anchor.hash), anchor);
        this._observableSections.set(anchor.hash, observableSection);
      }
    }
  }
  _process(target) {
    if (this._activeTarget === target) {
      return;
    }
    this._clearActiveClass(this._config.target);
    this._activeTarget = target;
    target.classList.add(CLASS_NAME_ACTIVE$1);
    this._activateParents(target);
    EventHandler.trigger(this._element, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }
  _activateParents(target) {
    // Activate dropdown parents
    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
      return;
    }
    for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
      // Set triggered links parents as active
      // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
      for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
        item.classList.add(CLASS_NAME_ACTIVE$1);
      }
    }
  }
  _clearActiveClass(parent) {
    parent.classList.remove(CLASS_NAME_ACTIVE$1);
    const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
    for (const node of activeNodes) {
      node.classList.remove(CLASS_NAME_ACTIVE$1);
    }
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = ScrollSpy.getOrCreateInstance(this, config);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * Data API implementation
 */

EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
  for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
    ScrollSpy.getOrCreateInstance(spy);
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(ScrollSpy);

/**
 * --------------------------------------------------------------------------
 * Bootstrap tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME$1 = 'tab';
const DATA_KEY$1 = 'bs.tab';
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const HOME_KEY = 'Home';
const END_KEY = 'End';
const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE$1 = 'fade';
const CLASS_NAME_SHOW$1 = 'show';
const CLASS_DROPDOWN = 'dropdown';
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
const SELECTOR_OUTER = '.nav-item, .list-group-item';
const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

/**
 * Class definition
 */

class Tab extends BaseComponent {
  constructor(element) {
    super(element);
    this._parent = this._element.closest(SELECTOR_TAB_PANEL);
    if (!this._parent) {
      return;
      // TODO: should throw exception in v6
      // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
    }

    // Set up initial aria attributes
    this._setInitialAttributes(this._parent, this._getChildren());
    EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
  }

  // Getters
  static get NAME() {
    return NAME$1;
  }

  // Public
  show() {
    // Shows this elem and deactivate the active sibling if exists
    const innerElem = this._element;
    if (this._elemIsActive(innerElem)) {
      return;
    }

    // Search for active tab on same parent to deactivate it
    const active = this._getActiveElem();
    const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
      relatedTarget: innerElem
    }) : null;
    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
      relatedTarget: active
    });
    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
      return;
    }
    this._deactivate(active, innerElem);
    this._activate(innerElem, active);
  }

  // Private
  _activate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.add(CLASS_NAME_ACTIVE);
    this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.add(CLASS_NAME_SHOW$1);
        return;
      }
      element.removeAttribute('tabindex');
      element.setAttribute('aria-selected', true);
      this._toggleDropDown(element, true);
      EventHandler.trigger(element, EVENT_SHOWN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _deactivate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.remove(CLASS_NAME_ACTIVE);
    element.blur();
    this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.remove(CLASS_NAME_SHOW$1);
        return;
      }
      element.setAttribute('aria-selected', false);
      element.setAttribute('tabindex', '-1');
      this._toggleDropDown(element, false);
      EventHandler.trigger(element, EVENT_HIDDEN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _keydown(event) {
    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
      return;
    }
    event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
    event.preventDefault();
    const children = this._getChildren().filter(element => !isDisabled(element));
    let nextActiveElement;
    if ([HOME_KEY, END_KEY].includes(event.key)) {
      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
    } else {
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
    }
    if (nextActiveElement) {
      nextActiveElement.focus({
        preventScroll: true
      });
      Tab.getOrCreateInstance(nextActiveElement).show();
    }
  }
  _getChildren() {
    // collection of inner elements
    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find(child => this._elemIsActive(child)) || null;
  }
  _setInitialAttributes(parent, children) {
    this._setAttributeIfNotExists(parent, 'role', 'tablist');
    for (const child of children) {
      this._setInitialAttributesOnChild(child);
    }
  }
  _setInitialAttributesOnChild(child) {
    child = this._getInnerElement(child);
    const isActive = this._elemIsActive(child);
    const outerElem = this._getOuterElement(child);
    child.setAttribute('aria-selected', isActive);
    if (outerElem !== child) {
      this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
    }
    if (!isActive) {
      child.setAttribute('tabindex', '-1');
    }
    this._setAttributeIfNotExists(child, 'role', 'tab');

    // set attributes to the related panel too
    this._setInitialAttributesOnTargetPanel(child);
  }
  _setInitialAttributesOnTargetPanel(child) {
    const target = SelectorEngine.getElementFromSelector(child);
    if (!target) {
      return;
    }
    this._setAttributeIfNotExists(target, 'role', 'tabpanel');
    if (child.id) {
      this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
    }
  }
  _toggleDropDown(element, open) {
    const outerElem = this._getOuterElement(element);
    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
      return;
    }
    const toggle = (selector, className) => {
      const element = SelectorEngine.findOne(selector, outerElem);
      if (element) {
        element.classList.toggle(className, open);
      }
    };
    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
    outerElem.setAttribute('aria-expanded', open);
  }
  _setAttributeIfNotExists(element, attribute, value) {
    if (!element.hasAttribute(attribute)) {
      element.setAttribute(attribute, value);
    }
  }
  _elemIsActive(elem) {
    return elem.classList.contains(CLASS_NAME_ACTIVE);
  }

  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(elem) {
    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
  }

  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(elem) {
    return elem.closest(SELECTOR_OUTER) || elem;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Tab.getOrCreateInstance(this);
      if (typeof config !== 'string') {
        return;
      }
      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  Tab.getOrCreateInstance(this).show();
});

/**
 * Initialize on focus
 */
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    Tab.getOrCreateInstance(element);
  }
});
/**
 * jQuery
 */

defineJQueryPlugin(Tab);

/**
 * --------------------------------------------------------------------------
 * Bootstrap toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * Constants
 */

const NAME = 'toast';
const DATA_KEY = 'bs.toast';
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';
const DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5000
};

/**
 * Class definition
 */

class Toast extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }

  // Getters
  static get Default() {
    return Default;
  }
  static get DefaultType() {
    return DefaultType;
  }
  static get NAME() {
    return NAME;
  }

  // Public
  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._clearTimeout();
    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }
    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      EventHandler.trigger(this._element, EVENT_SHOWN);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
      this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    if (this.isShown()) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }
    super.dispose();
  }
  isShown() {
    return this._element.classList.contains(CLASS_NAME_SHOW);
  }

  // Private
  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }
    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }
    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }
  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case 'mouseover':
      case 'mouseout':
        {
          this._hasMouseInteraction = isInteracting;
          break;
        }
      case 'focusin':
      case 'focusout':
        {
          this._hasKeyboardInteraction = isInteracting;
          break;
        }
    }
    if (isInteracting) {
      this._clearTimeout();
      return;
    }
    const nextElement = event.relatedTarget;
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }
    this._maybeScheduleHide();
  }
  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }

  // Static
  static jQueryInterface(config) {
    return this.each(function () {
      const data = Toast.getOrCreateInstance(this, config);
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      }
    });
  }
}

/**
 * Data API implementation
 */

enableDismissTrigger(Toast);

/**
 * jQuery
 */

defineJQueryPlugin(Toast);


//# sourceMappingURL=bootstrap.esm.js.map


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtR0FBbUcsa0NBQWtDO0FBQ3JJO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxlQUFlO0FBQ25GO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsSUFBSSxJQUFJLFdBQVc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxTQUFTLDJCQUEyQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msc0JBQXNCO0FBQzFELEdBQUc7QUFDSDtBQUNBLHVDQUF1QyxzQkFBc0I7QUFDN0QsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHlEQUF5RCxzQkFBc0I7QUFDL0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrR0FBa0c7O0FBRWxHO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQsMEVBQTBFO0FBQzFFLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvQ0FBb0MsWUFBWSxTQUFTLG1CQUFtQixVQUFVLHVCQUF1QixjQUFjO0FBQzFKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0EsY0FBYyxLQUFLLEVBQUUsZUFBZTtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLDRCQUE0QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsOElBQThJLFNBQVM7QUFDdko7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxvQkFBb0I7QUFDekQ7QUFDQSw2REFBNkQsS0FBSztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsS0FBSztBQUN4Rjs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsV0FBVztBQUNuQyw0QkFBNEIsWUFBWTtBQUN4Qyw4QkFBOEIsWUFBWTtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixXQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxZQUFZLEVBQUUsZUFBZTs7QUFFcEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxZQUFZO0FBQ2xELG9DQUFvQyxZQUFZO0FBQ2hELGtDQUFrQyxZQUFZO0FBQzlDLHdDQUF3QyxZQUFZO0FBQ3BELG9DQUFvQyxZQUFZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixXQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4QywwQkFBMEIsWUFBWTtBQUN0QyxrQ0FBa0MsWUFBWTtBQUM5Qyx3Q0FBd0MsWUFBWTtBQUNwRCx3Q0FBd0MsWUFBWTtBQUNwRCxxQ0FBcUMsWUFBWTtBQUNqRCxxQ0FBcUMsWUFBWSxFQUFFLGVBQWU7QUFDbEUsdUNBQXVDLFlBQVksRUFBRSxlQUFlO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLE1BQU07QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLFdBQVc7QUFDbkM7QUFDQSw0QkFBNEIsWUFBWTtBQUN4Qyw4QkFBOEIsWUFBWTtBQUMxQyw0QkFBNEIsWUFBWTtBQUN4QyxnQ0FBZ0MsWUFBWTtBQUM1Qyx1Q0FBdUMsWUFBWSxFQUFFLGVBQWU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMscUJBQXFCLEdBQUcsb0JBQW9CO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxQkFBcUI7QUFDckQ7QUFDQSx3Q0FBd0MsMEJBQTBCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlEQUFpRDtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsT0FBTztBQUN6RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsV0FBVztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCOztBQUU5Qiw0QkFBNEIsWUFBWTtBQUN4QyxnQ0FBZ0MsWUFBWTtBQUM1Qyw0QkFBNEIsWUFBWTtBQUN4Qyw4QkFBOEIsWUFBWTtBQUMxQyx1Q0FBdUMsWUFBWSxFQUFFLGVBQWU7QUFDcEUseUNBQXlDLFlBQVksRUFBRSxlQUFlO0FBQ3RFLHFDQUFxQyxZQUFZLEVBQUUsZUFBZTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyx1QkFBdUIsR0FBRyxrQkFBa0I7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHFCQUFxQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkNBQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsd0RBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0Esb0VBQW9FO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLFdBQVc7QUFDbkMsa0NBQWtDLFlBQVk7QUFDOUMsd0NBQXdDLFlBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELDZDQUE2QztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixXQUFXO0FBQ25DO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4QywrQ0FBK0MsWUFBWTtBQUMzRCxnQ0FBZ0MsWUFBWTtBQUM1Qyw0QkFBNEIsWUFBWTtBQUN4Qyw4QkFBOEIsWUFBWTtBQUMxQyxnQ0FBZ0MsWUFBWTtBQUM1Qyw0Q0FBNEMsWUFBWTtBQUN4RCxvREFBb0QsWUFBWTtBQUNoRSxrREFBa0QsWUFBWTtBQUM5RCx1Q0FBdUMsWUFBWSxFQUFFLGVBQWU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsZUFBZTtBQUN4RDtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsZUFBZTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLFdBQVc7QUFDbkM7QUFDQSxxQ0FBcUMsWUFBWSxFQUFFLGVBQWU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEMsOEJBQThCLFlBQVk7QUFDMUMsNEJBQTRCLFlBQVk7QUFDeEMsNkNBQTZDLFlBQVk7QUFDekQsZ0NBQWdDLFlBQVk7QUFDNUMsOEJBQThCLFlBQVk7QUFDMUMsdUNBQXVDLFlBQVksRUFBRSxlQUFlO0FBQ3BFLGdEQUFnRCxZQUFZO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSwyQ0FBTTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyx3REFBbUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLFdBQVc7QUFDbkM7QUFDQSxrQ0FBa0MsWUFBWTtBQUM5Qyw0QkFBNEIsWUFBWTtBQUN4QyxxQ0FBcUMsWUFBWSxFQUFFLGFBQWE7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQkFBbUIsSUFBSSxvQkFBb0IsSUFBSSxtQkFBbUIsSUFBSSxvQkFBb0I7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRUFBbUUscUJBQXFCO0FBQ3hGOztBQUVBO0FBQ0EsMkNBQTJDLGNBQWM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RCxnQkFBZ0I7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msc0JBQXNCLEdBQUcsb0JBQW9CO0FBQzVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixXQUFXO0FBQ25DLDRCQUE0QixZQUFZO0FBQ3hDLGdDQUFnQyxZQUFZO0FBQzVDLDRCQUE0QixZQUFZO0FBQ3hDLDhCQUE4QixZQUFZO0FBQzFDLHFDQUFxQyxZQUFZO0FBQ2pELGdDQUFnQyxZQUFZO0FBQzVDLG1DQUFtQyxZQUFZO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyx5QkFBeUI7QUFDdEU7QUFDQTtBQUNBLG1DQUFtQyw2QkFBNkIsb0JBQW9CLDZCQUE2QixnQkFBZ0IsNkJBQTZCO0FBQzlKLHlHQUF5RztBQUN6RywrQkFBK0IsZUFBZSxJQUFJLHFCQUFxQjtBQUN2RSx3Q0FBd0Msa0JBQWtCLDJCQUEyQixrQkFBa0IsNEJBQTRCLGtCQUFrQjs7QUFFcko7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG1CQUFtQix5QkFBeUIsb0JBQW9CO0FBQ2hHOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRTs7QUFFcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxTQUFTO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLFNBQVM7QUFDL0Isb0NBQW9DLFVBQVU7QUFDOUMsa0NBQWtDLFVBQVU7QUFDNUMsZ0NBQWdDLFVBQVU7QUFDMUMsa0NBQWtDLFVBQVU7QUFDNUMsMEJBQTBCLFVBQVU7QUFDcEMsOEJBQThCLFVBQVU7QUFDeEMsMEJBQTBCLFVBQVU7QUFDcEMsNEJBQTRCLFVBQVU7QUFDdEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELE9BQU87QUFDekQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFa0g7QUFDbEgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJjb3JlLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9kaXN0L2pzL2Jvb3RzdHJhcC5lc20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gICogQm9vdHN0cmFwIHY1LjMuNiAoaHR0cHM6Ly9nZXRib290c3RyYXAuY29tLylcbiAgKiBDb3B5cmlnaHQgMjAxMS0yMDI1IFRoZSBCb290c3RyYXAgQXV0aG9ycyAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2dyYXBocy9jb250cmlidXRvcnMpXG4gICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICovXG5pbXBvcnQgKiBhcyBQb3BwZXIgZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgZG9tL2RhdGEuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IGVsZW1lbnRNYXAgPSBuZXcgTWFwKCk7XG5jb25zdCBEYXRhID0ge1xuICBzZXQoZWxlbWVudCwga2V5LCBpbnN0YW5jZSkge1xuICAgIGlmICghZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnRNYXAuc2V0KGVsZW1lbnQsIG5ldyBNYXAoKSk7XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlTWFwID0gZWxlbWVudE1hcC5nZXQoZWxlbWVudCk7XG5cbiAgICAvLyBtYWtlIGl0IGNsZWFyIHdlIG9ubHkgd2FudCBvbmUgaW5zdGFuY2UgcGVyIGVsZW1lbnRcbiAgICAvLyBjYW4gYmUgcmVtb3ZlZCBsYXRlciB3aGVuIG11bHRpcGxlIGtleS9pbnN0YW5jZXMgYXJlIGZpbmUgdG8gYmUgdXNlZFxuICAgIGlmICghaW5zdGFuY2VNYXAuaGFzKGtleSkgJiYgaW5zdGFuY2VNYXAuc2l6ZSAhPT0gMCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEJvb3RzdHJhcCBkb2Vzbid0IGFsbG93IG1vcmUgdGhhbiBvbmUgaW5zdGFuY2UgcGVyIGVsZW1lbnQuIEJvdW5kIGluc3RhbmNlOiAke0FycmF5LmZyb20oaW5zdGFuY2VNYXAua2V5cygpKVswXX0uYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGluc3RhbmNlTWFwLnNldChrZXksIGluc3RhbmNlKTtcbiAgfSxcbiAgZ2V0KGVsZW1lbnQsIGtleSkge1xuICAgIGlmIChlbGVtZW50TWFwLmhhcyhlbGVtZW50KSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnRNYXAuZ2V0KGVsZW1lbnQpLmdldChrZXkpIHx8IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuICByZW1vdmUoZWxlbWVudCwga2V5KSB7XG4gICAgaWYgKCFlbGVtZW50TWFwLmhhcyhlbGVtZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbnN0YW5jZU1hcCA9IGVsZW1lbnRNYXAuZ2V0KGVsZW1lbnQpO1xuICAgIGluc3RhbmNlTWFwLmRlbGV0ZShrZXkpO1xuXG4gICAgLy8gZnJlZSB1cCBlbGVtZW50IHJlZmVyZW5jZXMgaWYgdGhlcmUgYXJlIG5vIGluc3RhbmNlcyBsZWZ0IGZvciBhbiBlbGVtZW50XG4gICAgaWYgKGluc3RhbmNlTWFwLnNpemUgPT09IDApIHtcbiAgICAgIGVsZW1lbnRNYXAuZGVsZXRlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHV0aWwvaW5kZXguanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBNQVhfVUlEID0gMTAwMDAwMDtcbmNvbnN0IE1JTExJU0VDT05EU19NVUxUSVBMSUVSID0gMTAwMDtcbmNvbnN0IFRSQU5TSVRJT05fRU5EID0gJ3RyYW5zaXRpb25lbmQnO1xuXG4vKipcbiAqIFByb3Blcmx5IGVzY2FwZSBJRHMgc2VsZWN0b3JzIHRvIGhhbmRsZSB3ZWlyZCBJRHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgcGFyc2VTZWxlY3RvciA9IHNlbGVjdG9yID0+IHtcbiAgaWYgKHNlbGVjdG9yICYmIHdpbmRvdy5DU1MgJiYgd2luZG93LkNTUy5lc2NhcGUpIHtcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIG5lZWRzIGVzY2FwaW5nIHRvIGhhbmRsZSBJRHMgKGh0bWw1KykgY29udGFpbmluZyBmb3IgaW5zdGFuY2UgL1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZSgvIyhbXlxcc1wiIyddKykvZywgKG1hdGNoLCBpZCkgPT4gYCMke0NTUy5lc2NhcGUoaWQpfWApO1xuICB9XG4gIHJldHVybiBzZWxlY3Rvcjtcbn07XG5cbi8vIFNob3V0LW91dCBBbmd1cyBDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuY29uc3QgdG9UeXBlID0gb2JqZWN0ID0+IHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCBvYmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBgJHtvYmplY3R9YDtcbiAgfVxuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkubWF0Y2goL1xccyhbYS16XSspL2kpWzFdLnRvTG93ZXJDYXNlKCk7XG59O1xuXG4vKipcbiAqIFB1YmxpYyBVdGlsIEFQSVxuICovXG5cbmNvbnN0IGdldFVJRCA9IHByZWZpeCA9PiB7XG4gIGRvIHtcbiAgICBwcmVmaXggKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTUFYX1VJRCk7XG4gIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpO1xuICByZXR1cm4gcHJlZml4O1xufTtcbmNvbnN0IGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50ID0gZWxlbWVudCA9PiB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgbGV0IHtcbiAgICB0cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgdHJhbnNpdGlvbkRlbGF5XG4gIH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgY29uc3QgZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gPSBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICBjb25zdCBmbG9hdFRyYW5zaXRpb25EZWxheSA9IE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSk7XG5cbiAgLy8gUmV0dXJuIDAgaWYgZWxlbWVudCBvciB0cmFuc2l0aW9uIGR1cmF0aW9uIGlzIG5vdCBmb3VuZFxuICBpZiAoIWZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uICYmICFmbG9hdFRyYW5zaXRpb25EZWxheSkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuICB0cmFuc2l0aW9uRHVyYXRpb24gPSB0cmFuc2l0aW9uRHVyYXRpb24uc3BsaXQoJywnKVswXTtcbiAgdHJhbnNpdGlvbkRlbGF5ID0gdHJhbnNpdGlvbkRlbGF5LnNwbGl0KCcsJylbMF07XG4gIHJldHVybiAoTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKSArIE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSkpICogTUlMTElTRUNPTkRTX01VTFRJUExJRVI7XG59O1xuY29uc3QgdHJpZ2dlclRyYW5zaXRpb25FbmQgPSBlbGVtZW50ID0+IHtcbiAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChUUkFOU0lUSU9OX0VORCkpO1xufTtcbmNvbnN0IGlzRWxlbWVudCA9IG9iamVjdCA9PiB7XG4gIGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2Ygb2JqZWN0LmpxdWVyeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbMF07XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBvYmplY3Qubm9kZVR5cGUgIT09ICd1bmRlZmluZWQnO1xufTtcbmNvbnN0IGdldEVsZW1lbnQgPSBvYmplY3QgPT4ge1xuICAvLyBpdCdzIGEgalF1ZXJ5IG9iamVjdCBvciBhIG5vZGUgZWxlbWVudFxuICBpZiAoaXNFbGVtZW50KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0LmpxdWVyeSA/IG9iamVjdFswXSA6IG9iamVjdDtcbiAgfVxuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJzZVNlbGVjdG9yKG9iamVjdCkpO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcbmNvbnN0IGlzVmlzaWJsZSA9IGVsZW1lbnQgPT4ge1xuICBpZiAoIWlzRWxlbWVudChlbGVtZW50KSB8fCBlbGVtZW50LmdldENsaWVudFJlY3RzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGVsZW1lbnRJc1Zpc2libGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ3Zpc2liaWxpdHknKSA9PT0gJ3Zpc2libGUnO1xuICAvLyBIYW5kbGUgYGRldGFpbHNgIGVsZW1lbnQgYXMgaXRzIGNvbnRlbnQgbWF5IGZhbHNpZSBhcHBlYXIgdmlzaWJsZSB3aGVuIGl0IGlzIGNsb3NlZFxuICBjb25zdCBjbG9zZWREZXRhaWxzID0gZWxlbWVudC5jbG9zZXN0KCdkZXRhaWxzOm5vdChbb3Blbl0pJyk7XG4gIGlmICghY2xvc2VkRGV0YWlscykge1xuICAgIHJldHVybiBlbGVtZW50SXNWaXNpYmxlO1xuICB9XG4gIGlmIChjbG9zZWREZXRhaWxzICE9PSBlbGVtZW50KSB7XG4gICAgY29uc3Qgc3VtbWFyeSA9IGVsZW1lbnQuY2xvc2VzdCgnc3VtbWFyeScpO1xuICAgIGlmIChzdW1tYXJ5ICYmIHN1bW1hcnkucGFyZW50Tm9kZSAhPT0gY2xvc2VkRGV0YWlscykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3VtbWFyeSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWxlbWVudElzVmlzaWJsZTtcbn07XG5jb25zdCBpc0Rpc2FibGVkID0gZWxlbWVudCA9PiB7XG4gIGlmICghZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgZWxlbWVudC5kaXNhYmxlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZWxlbWVudC5kaXNhYmxlZDtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgIT09ICdmYWxzZSc7XG59O1xuY29uc3QgZmluZFNoYWRvd1Jvb3QgPSBlbGVtZW50ID0+IHtcbiAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0YWNoU2hhZG93KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBDYW4gZmluZCB0aGUgc2hhZG93IHJvb3Qgb3RoZXJ3aXNlIGl0J2xsIHJldHVybiB0aGUgZG9jdW1lbnRcbiAgaWYgKHR5cGVvZiBlbGVtZW50LmdldFJvb3ROb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3Qgcm9vdCA9IGVsZW1lbnQuZ2V0Um9vdE5vZGUoKTtcbiAgICByZXR1cm4gcm9vdCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgPyByb290IDogbnVsbDtcbiAgfVxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8vIHdoZW4gd2UgZG9uJ3QgZmluZCBhIHNoYWRvdyByb290XG4gIGlmICghZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGZpbmRTaGFkb3dSb290KGVsZW1lbnQucGFyZW50Tm9kZSk7XG59O1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG4vKipcbiAqIFRyaWNrIHRvIHJlc3RhcnQgYW4gZWxlbWVudCdzIGFuaW1hdGlvblxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4gdm9pZFxuICpcbiAqIEBzZWUgaHR0cHM6Ly93d3cuaGFycnl0aGVvLmNvbS9ibG9nLzIwMjEvMDIvcmVzdGFydC1hLWNzcy1hbmltYXRpb24td2l0aC1qYXZhc2NyaXB0LyNyZXN0YXJ0aW5nLWEtY3NzLWFuaW1hdGlvblxuICovXG5jb25zdCByZWZsb3cgPSBlbGVtZW50ID0+IHtcbiAgZWxlbWVudC5vZmZzZXRIZWlnaHQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG59O1xuY29uc3QgZ2V0alF1ZXJ5ID0gKCkgPT4ge1xuICBpZiAod2luZG93LmpRdWVyeSAmJiAhZG9jdW1lbnQuYm9keS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYnMtbm8tanF1ZXJ5JykpIHtcbiAgICByZXR1cm4gd2luZG93LmpRdWVyeTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBET01Db250ZW50TG9hZGVkQ2FsbGJhY2tzID0gW107XG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWQgPSBjYWxsYmFjayA9PiB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAvLyBhZGQgbGlzdGVuZXIgb24gdGhlIGZpcnN0IGNhbGwgd2hlbiB0aGUgZG9jdW1lbnQgaXMgaW4gbG9hZGluZyBzdGF0ZVxuICAgIGlmICghRE9NQ29udGVudExvYWRlZENhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgRE9NQ29udGVudExvYWRlZENhbGxiYWNrcykge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBET01Db250ZW50TG9hZGVkQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cbn07XG5jb25zdCBpc1JUTCA9ICgpID0+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIgPT09ICdydGwnO1xuY29uc3QgZGVmaW5lSlF1ZXJ5UGx1Z2luID0gcGx1Z2luID0+IHtcbiAgb25ET01Db250ZW50TG9hZGVkKCgpID0+IHtcbiAgICBjb25zdCAkID0gZ2V0alF1ZXJ5KCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCQpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBwbHVnaW4uTkFNRTtcbiAgICAgIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bbmFtZV07XG4gICAgICAkLmZuW25hbWVdID0gcGx1Z2luLmpRdWVyeUludGVyZmFjZTtcbiAgICAgICQuZm5bbmFtZV0uQ29uc3RydWN0b3IgPSBwbHVnaW47XG4gICAgICAkLmZuW25hbWVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICAgICAgICQuZm5bbmFtZV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICAgIHJldHVybiBwbHVnaW4ualF1ZXJ5SW50ZXJmYWNlO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcbmNvbnN0IGV4ZWN1dGUgPSAocG9zc2libGVDYWxsYmFjaywgYXJncyA9IFtdLCBkZWZhdWx0VmFsdWUgPSBwb3NzaWJsZUNhbGxiYWNrKSA9PiB7XG4gIHJldHVybiB0eXBlb2YgcG9zc2libGVDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyA/IHBvc3NpYmxlQ2FsbGJhY2suY2FsbCguLi5hcmdzKSA6IGRlZmF1bHRWYWx1ZTtcbn07XG5jb25zdCBleGVjdXRlQWZ0ZXJUcmFuc2l0aW9uID0gKGNhbGxiYWNrLCB0cmFuc2l0aW9uRWxlbWVudCwgd2FpdEZvclRyYW5zaXRpb24gPSB0cnVlKSA9PiB7XG4gIGlmICghd2FpdEZvclRyYW5zaXRpb24pIHtcbiAgICBleGVjdXRlKGNhbGxiYWNrKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZHVyYXRpb25QYWRkaW5nID0gNTtcbiAgY29uc3QgZW11bGF0ZWREdXJhdGlvbiA9IGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRyYW5zaXRpb25FbGVtZW50KSArIGR1cmF0aW9uUGFkZGluZztcbiAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICBjb25zdCBoYW5kbGVyID0gKHtcbiAgICB0YXJnZXRcbiAgfSkgPT4ge1xuICAgIGlmICh0YXJnZXQgIT09IHRyYW5zaXRpb25FbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxlZCA9IHRydWU7XG4gICAgdHJhbnNpdGlvbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihUUkFOU0lUSU9OX0VORCwgaGFuZGxlcik7XG4gICAgZXhlY3V0ZShjYWxsYmFjayk7XG4gIH07XG4gIHRyYW5zaXRpb25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoVFJBTlNJVElPTl9FTkQsIGhhbmRsZXIpO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgdHJpZ2dlclRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkVsZW1lbnQpO1xuICAgIH1cbiAgfSwgZW11bGF0ZWREdXJhdGlvbik7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgcHJldmlvdXMvbmV4dCBlbGVtZW50IG9mIGEgbGlzdC5cbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBsaXN0ICAgIFRoZSBsaXN0IG9mIGVsZW1lbnRzXG4gKiBAcGFyYW0gYWN0aXZlRWxlbWVudCAgIFRoZSBhY3RpdmUgZWxlbWVudFxuICogQHBhcmFtIHNob3VsZEdldE5leHQgICBDaG9vc2UgdG8gZ2V0IG5leHQgb3IgcHJldmlvdXMgZWxlbWVudFxuICogQHBhcmFtIGlzQ3ljbGVBbGxvd2VkXG4gKiBAcmV0dXJuIHtFbGVtZW50fGVsZW19IFRoZSBwcm9wZXIgZWxlbWVudFxuICovXG5jb25zdCBnZXROZXh0QWN0aXZlRWxlbWVudCA9IChsaXN0LCBhY3RpdmVFbGVtZW50LCBzaG91bGRHZXROZXh0LCBpc0N5Y2xlQWxsb3dlZCkgPT4ge1xuICBjb25zdCBsaXN0TGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIGxldCBpbmRleCA9IGxpc3QuaW5kZXhPZihhY3RpdmVFbGVtZW50KTtcblxuICAvLyBpZiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgbGlzdCByZXR1cm4gYW4gZWxlbWVudFxuICAvLyBkZXBlbmRpbmcgb24gdGhlIGRpcmVjdGlvbiBhbmQgaWYgY3ljbGUgaXMgYWxsb3dlZFxuICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuICFzaG91bGRHZXROZXh0ICYmIGlzQ3ljbGVBbGxvd2VkID8gbGlzdFtsaXN0TGVuZ3RoIC0gMV0gOiBsaXN0WzBdO1xuICB9XG4gIGluZGV4ICs9IHNob3VsZEdldE5leHQgPyAxIDogLTE7XG4gIGlmIChpc0N5Y2xlQWxsb3dlZCkge1xuICAgIGluZGV4ID0gKGluZGV4ICsgbGlzdExlbmd0aCkgJSBsaXN0TGVuZ3RoO1xuICB9XG4gIHJldHVybiBsaXN0W01hdGgubWF4KDAsIE1hdGgubWluKGluZGV4LCBsaXN0TGVuZ3RoIC0gMSkpXTtcbn07XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBkb20vZXZlbnQtaGFuZGxlci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBuYW1lc3BhY2VSZWdleCA9IC9bXi5dKig/PVxcLi4qKVxcLnwuKi87XG5jb25zdCBzdHJpcE5hbWVSZWdleCA9IC9cXC4uKi87XG5jb25zdCBzdHJpcFVpZFJlZ2V4ID0gLzo6XFxkKyQvO1xuY29uc3QgZXZlbnRSZWdpc3RyeSA9IHt9OyAvLyBFdmVudHMgc3RvcmFnZVxubGV0IHVpZEV2ZW50ID0gMTtcbmNvbnN0IGN1c3RvbUV2ZW50cyA9IHtcbiAgbW91c2VlbnRlcjogJ21vdXNlb3ZlcicsXG4gIG1vdXNlbGVhdmU6ICdtb3VzZW91dCdcbn07XG5jb25zdCBuYXRpdmVFdmVudHMgPSBuZXcgU2V0KFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2V1cCcsICdtb3VzZWRvd24nLCAnY29udGV4dG1lbnUnLCAnbW91c2V3aGVlbCcsICdET01Nb3VzZVNjcm9sbCcsICdtb3VzZW92ZXInLCAnbW91c2VvdXQnLCAnbW91c2Vtb3ZlJywgJ3NlbGVjdHN0YXJ0JywgJ3NlbGVjdGVuZCcsICdrZXlkb3duJywgJ2tleXByZXNzJywgJ2tleXVwJywgJ29yaWVudGF0aW9uY2hhbmdlJywgJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJywgJ3BvaW50ZXJkb3duJywgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJ1cCcsICdwb2ludGVybGVhdmUnLCAncG9pbnRlcmNhbmNlbCcsICdnZXN0dXJlc3RhcnQnLCAnZ2VzdHVyZWNoYW5nZScsICdnZXN0dXJlZW5kJywgJ2ZvY3VzJywgJ2JsdXInLCAnY2hhbmdlJywgJ3Jlc2V0JywgJ3NlbGVjdCcsICdzdWJtaXQnLCAnZm9jdXNpbicsICdmb2N1c291dCcsICdsb2FkJywgJ3VubG9hZCcsICdiZWZvcmV1bmxvYWQnLCAncmVzaXplJywgJ21vdmUnLCAnRE9NQ29udGVudExvYWRlZCcsICdyZWFkeXN0YXRlY2hhbmdlJywgJ2Vycm9yJywgJ2Fib3J0JywgJ3Njcm9sbCddKTtcblxuLyoqXG4gKiBQcml2YXRlIG1ldGhvZHNcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRXZlbnRVaWQoZWxlbWVudCwgdWlkKSB7XG4gIHJldHVybiB1aWQgJiYgYCR7dWlkfTo6JHt1aWRFdmVudCsrfWAgfHwgZWxlbWVudC51aWRFdmVudCB8fCB1aWRFdmVudCsrO1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudEV2ZW50cyhlbGVtZW50KSB7XG4gIGNvbnN0IHVpZCA9IG1ha2VFdmVudFVpZChlbGVtZW50KTtcbiAgZWxlbWVudC51aWRFdmVudCA9IHVpZDtcbiAgZXZlbnRSZWdpc3RyeVt1aWRdID0gZXZlbnRSZWdpc3RyeVt1aWRdIHx8IHt9O1xuICByZXR1cm4gZXZlbnRSZWdpc3RyeVt1aWRdO1xufVxuZnVuY3Rpb24gYm9vdHN0cmFwSGFuZGxlcihlbGVtZW50LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgIGh5ZHJhdGVPYmooZXZlbnQsIHtcbiAgICAgIGRlbGVnYXRlVGFyZ2V0OiBlbGVtZW50XG4gICAgfSk7XG4gICAgaWYgKGhhbmRsZXIub25lT2ZmKSB7XG4gICAgICBFdmVudEhhbmRsZXIub2ZmKGVsZW1lbnQsIGV2ZW50LnR5cGUsIGZuKTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KGVsZW1lbnQsIFtldmVudF0pO1xuICB9O1xufVxuZnVuY3Rpb24gYm9vdHN0cmFwRGVsZWdhdGlvbkhhbmRsZXIoZWxlbWVudCwgc2VsZWN0b3IsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3QgZG9tRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIGZvciAobGV0IHtcbiAgICAgIHRhcmdldFxuICAgIH0gPSBldmVudDsgdGFyZ2V0ICYmIHRhcmdldCAhPT0gdGhpczsgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgIGZvciAoY29uc3QgZG9tRWxlbWVudCBvZiBkb21FbGVtZW50cykge1xuICAgICAgICBpZiAoZG9tRWxlbWVudCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaHlkcmF0ZU9iaihldmVudCwge1xuICAgICAgICAgIGRlbGVnYXRlVGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYW5kbGVyLm9uZU9mZikge1xuICAgICAgICAgIEV2ZW50SGFuZGxlci5vZmYoZWxlbWVudCwgZXZlbnQudHlwZSwgc2VsZWN0b3IsIGZuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGFyZ2V0LCBbZXZlbnRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBmaW5kSGFuZGxlcihldmVudHMsIGNhbGxhYmxlLCBkZWxlZ2F0aW9uU2VsZWN0b3IgPSBudWxsKSB7XG4gIHJldHVybiBPYmplY3QudmFsdWVzKGV2ZW50cykuZmluZChldmVudCA9PiBldmVudC5jYWxsYWJsZSA9PT0gY2FsbGFibGUgJiYgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yID09PSBkZWxlZ2F0aW9uU2VsZWN0b3IpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplUGFyYW1ldGVycyhvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gIGNvbnN0IGlzRGVsZWdhdGVkID0gdHlwZW9mIGhhbmRsZXIgPT09ICdzdHJpbmcnO1xuICAvLyBUT0RPOiB0b29sdGlwIHBhc3NlcyBgZmFsc2VgIGluc3RlYWQgb2Ygc2VsZWN0b3IsIHNvIHdlIG5lZWQgdG8gY2hlY2tcbiAgY29uc3QgY2FsbGFibGUgPSBpc0RlbGVnYXRlZCA/IGRlbGVnYXRpb25GdW5jdGlvbiA6IGhhbmRsZXIgfHwgZGVsZWdhdGlvbkZ1bmN0aW9uO1xuICBsZXQgdHlwZUV2ZW50ID0gZ2V0VHlwZUV2ZW50KG9yaWdpbmFsVHlwZUV2ZW50KTtcbiAgaWYgKCFuYXRpdmVFdmVudHMuaGFzKHR5cGVFdmVudCkpIHtcbiAgICB0eXBlRXZlbnQgPSBvcmlnaW5hbFR5cGVFdmVudDtcbiAgfVxuICByZXR1cm4gW2lzRGVsZWdhdGVkLCBjYWxsYWJsZSwgdHlwZUV2ZW50XTtcbn1cbmZ1bmN0aW9uIGFkZEhhbmRsZXIoZWxlbWVudCwgb3JpZ2luYWxUeXBlRXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25GdW5jdGlvbiwgb25lT2ZmKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWxUeXBlRXZlbnQgIT09ICdzdHJpbmcnIHx8ICFlbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBbaXNEZWxlZ2F0ZWQsIGNhbGxhYmxlLCB0eXBlRXZlbnRdID0gbm9ybWFsaXplUGFyYW1ldGVycyhvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKTtcblxuICAvLyBpbiBjYXNlIG9mIG1vdXNlZW50ZXIgb3IgbW91c2VsZWF2ZSB3cmFwIHRoZSBoYW5kbGVyIHdpdGhpbiBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGZvciBpdHMgRE9NIHBvc2l0aW9uXG4gIC8vIHRoaXMgcHJldmVudHMgdGhlIGhhbmRsZXIgZnJvbSBiZWluZyBkaXNwYXRjaGVkIHRoZSBzYW1lIHdheSBhcyBtb3VzZW92ZXIgb3IgbW91c2VvdXQgZG9lc1xuICBpZiAob3JpZ2luYWxUeXBlRXZlbnQgaW4gY3VzdG9tRXZlbnRzKSB7XG4gICAgY29uc3Qgd3JhcEZ1bmN0aW9uID0gZm4gPT4ge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LnJlbGF0ZWRUYXJnZXQgfHwgZXZlbnQucmVsYXRlZFRhcmdldCAhPT0gZXZlbnQuZGVsZWdhdGVUYXJnZXQgJiYgIWV2ZW50LmRlbGVnYXRlVGFyZ2V0LmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgY2FsbGFibGUgPSB3cmFwRnVuY3Rpb24oY2FsbGFibGUpO1xuICB9XG4gIGNvbnN0IGV2ZW50cyA9IGdldEVsZW1lbnRFdmVudHMoZWxlbWVudCk7XG4gIGNvbnN0IGhhbmRsZXJzID0gZXZlbnRzW3R5cGVFdmVudF0gfHwgKGV2ZW50c1t0eXBlRXZlbnRdID0ge30pO1xuICBjb25zdCBwcmV2aW91c0Z1bmN0aW9uID0gZmluZEhhbmRsZXIoaGFuZGxlcnMsIGNhbGxhYmxlLCBpc0RlbGVnYXRlZCA/IGhhbmRsZXIgOiBudWxsKTtcbiAgaWYgKHByZXZpb3VzRnVuY3Rpb24pIHtcbiAgICBwcmV2aW91c0Z1bmN0aW9uLm9uZU9mZiA9IHByZXZpb3VzRnVuY3Rpb24ub25lT2ZmICYmIG9uZU9mZjtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdWlkID0gbWFrZUV2ZW50VWlkKGNhbGxhYmxlLCBvcmlnaW5hbFR5cGVFdmVudC5yZXBsYWNlKG5hbWVzcGFjZVJlZ2V4LCAnJykpO1xuICBjb25zdCBmbiA9IGlzRGVsZWdhdGVkID8gYm9vdHN0cmFwRGVsZWdhdGlvbkhhbmRsZXIoZWxlbWVudCwgaGFuZGxlciwgY2FsbGFibGUpIDogYm9vdHN0cmFwSGFuZGxlcihlbGVtZW50LCBjYWxsYWJsZSk7XG4gIGZuLmRlbGVnYXRpb25TZWxlY3RvciA9IGlzRGVsZWdhdGVkID8gaGFuZGxlciA6IG51bGw7XG4gIGZuLmNhbGxhYmxlID0gY2FsbGFibGU7XG4gIGZuLm9uZU9mZiA9IG9uZU9mZjtcbiAgZm4udWlkRXZlbnQgPSB1aWQ7XG4gIGhhbmRsZXJzW3VpZF0gPSBmbjtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGVFdmVudCwgZm4sIGlzRGVsZWdhdGVkKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUhhbmRsZXIoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25TZWxlY3Rvcikge1xuICBjb25zdCBmbiA9IGZpbmRIYW5kbGVyKGV2ZW50c1t0eXBlRXZlbnRdLCBoYW5kbGVyLCBkZWxlZ2F0aW9uU2VsZWN0b3IpO1xuICBpZiAoIWZuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlRXZlbnQsIGZuLCBCb29sZWFuKGRlbGVnYXRpb25TZWxlY3RvcikpO1xuICBkZWxldGUgZXZlbnRzW3R5cGVFdmVudF1bZm4udWlkRXZlbnRdO1xufVxuZnVuY3Rpb24gcmVtb3ZlTmFtZXNwYWNlZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBuYW1lc3BhY2UpIHtcbiAgY29uc3Qgc3RvcmVFbGVtZW50RXZlbnQgPSBldmVudHNbdHlwZUV2ZW50XSB8fCB7fTtcbiAgZm9yIChjb25zdCBbaGFuZGxlcktleSwgZXZlbnRdIG9mIE9iamVjdC5lbnRyaWVzKHN0b3JlRWxlbWVudEV2ZW50KSkge1xuICAgIGlmIChoYW5kbGVyS2V5LmluY2x1ZGVzKG5hbWVzcGFjZSkpIHtcbiAgICAgIHJlbW92ZUhhbmRsZXIoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIGV2ZW50LmNhbGxhYmxlLCBldmVudC5kZWxlZ2F0aW9uU2VsZWN0b3IpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZ2V0VHlwZUV2ZW50KGV2ZW50KSB7XG4gIC8vIGFsbG93IHRvIGdldCB0aGUgbmF0aXZlIGV2ZW50cyBmcm9tIG5hbWVzcGFjZWQgZXZlbnRzICgnY2xpY2suYnMuYnV0dG9uJyAtLT4gJ2NsaWNrJylcbiAgZXZlbnQgPSBldmVudC5yZXBsYWNlKHN0cmlwTmFtZVJlZ2V4LCAnJyk7XG4gIHJldHVybiBjdXN0b21FdmVudHNbZXZlbnRdIHx8IGV2ZW50O1xufVxuY29uc3QgRXZlbnRIYW5kbGVyID0ge1xuICBvbihlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgYWRkSGFuZGxlcihlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uLCBmYWxzZSk7XG4gIH0sXG4gIG9uZShlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgYWRkSGFuZGxlcihlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uLCB0cnVlKTtcbiAgfSxcbiAgb2ZmKGVsZW1lbnQsIG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgICBpZiAodHlwZW9mIG9yaWdpbmFsVHlwZUV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhZWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBbaXNEZWxlZ2F0ZWQsIGNhbGxhYmxlLCB0eXBlRXZlbnRdID0gbm9ybWFsaXplUGFyYW1ldGVycyhvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKTtcbiAgICBjb25zdCBpbk5hbWVzcGFjZSA9IHR5cGVFdmVudCAhPT0gb3JpZ2luYWxUeXBlRXZlbnQ7XG4gICAgY29uc3QgZXZlbnRzID0gZ2V0RWxlbWVudEV2ZW50cyhlbGVtZW50KTtcbiAgICBjb25zdCBzdG9yZUVsZW1lbnRFdmVudCA9IGV2ZW50c1t0eXBlRXZlbnRdIHx8IHt9O1xuICAgIGNvbnN0IGlzTmFtZXNwYWNlID0gb3JpZ2luYWxUeXBlRXZlbnQuc3RhcnRzV2l0aCgnLicpO1xuICAgIGlmICh0eXBlb2YgY2FsbGFibGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBTaW1wbGVzdCBjYXNlOiBoYW5kbGVyIGlzIHBhc3NlZCwgcmVtb3ZlIHRoYXQgbGlzdGVuZXIgT05MWS5cbiAgICAgIGlmICghT2JqZWN0LmtleXMoc3RvcmVFbGVtZW50RXZlbnQpLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBjYWxsYWJsZSwgaXNEZWxlZ2F0ZWQgPyBoYW5kbGVyIDogbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc05hbWVzcGFjZSkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50RXZlbnQgb2YgT2JqZWN0LmtleXMoZXZlbnRzKSkge1xuICAgICAgICByZW1vdmVOYW1lc3BhY2VkSGFuZGxlcnMoZWxlbWVudCwgZXZlbnRzLCBlbGVtZW50RXZlbnQsIG9yaWdpbmFsVHlwZUV2ZW50LnNsaWNlKDEpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBba2V5SGFuZGxlcnMsIGV2ZW50XSBvZiBPYmplY3QuZW50cmllcyhzdG9yZUVsZW1lbnRFdmVudCkpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXJLZXkgPSBrZXlIYW5kbGVycy5yZXBsYWNlKHN0cmlwVWlkUmVnZXgsICcnKTtcbiAgICAgIGlmICghaW5OYW1lc3BhY2UgfHwgb3JpZ2luYWxUeXBlRXZlbnQuaW5jbHVkZXMoaGFuZGxlcktleSkpIHtcbiAgICAgICAgcmVtb3ZlSGFuZGxlcihlbGVtZW50LCBldmVudHMsIHR5cGVFdmVudCwgZXZlbnQuY2FsbGFibGUsIGV2ZW50LmRlbGVnYXRpb25TZWxlY3Rvcik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0cmlnZ2VyKGVsZW1lbnQsIGV2ZW50LCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCAkID0gZ2V0alF1ZXJ5KCk7XG4gICAgY29uc3QgdHlwZUV2ZW50ID0gZ2V0VHlwZUV2ZW50KGV2ZW50KTtcbiAgICBjb25zdCBpbk5hbWVzcGFjZSA9IGV2ZW50ICE9PSB0eXBlRXZlbnQ7XG4gICAgbGV0IGpRdWVyeUV2ZW50ID0gbnVsbDtcbiAgICBsZXQgYnViYmxlcyA9IHRydWU7XG4gICAgbGV0IG5hdGl2ZURpc3BhdGNoID0gdHJ1ZTtcbiAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuICAgIGlmIChpbk5hbWVzcGFjZSAmJiAkKSB7XG4gICAgICBqUXVlcnlFdmVudCA9ICQuRXZlbnQoZXZlbnQsIGFyZ3MpO1xuICAgICAgJChlbGVtZW50KS50cmlnZ2VyKGpRdWVyeUV2ZW50KTtcbiAgICAgIGJ1YmJsZXMgPSAhalF1ZXJ5RXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKTtcbiAgICAgIG5hdGl2ZURpc3BhdGNoID0gIWpRdWVyeUV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCk7XG4gICAgICBkZWZhdWx0UHJldmVudGVkID0galF1ZXJ5RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCk7XG4gICAgfVxuICAgIGNvbnN0IGV2dCA9IGh5ZHJhdGVPYmoobmV3IEV2ZW50KGV2ZW50LCB7XG4gICAgICBidWJibGVzLFxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgIH0pLCBhcmdzKTtcbiAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmIChuYXRpdmVEaXNwYXRjaCkge1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICAgIGlmIChldnQuZGVmYXVsdFByZXZlbnRlZCAmJiBqUXVlcnlFdmVudCkge1xuICAgICAgalF1ZXJ5RXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxufTtcbmZ1bmN0aW9uIGh5ZHJhdGVPYmoob2JqLCBtZXRhID0ge30pIHtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobWV0YSkpIHtcbiAgICB0cnkge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGRvbS9tYW5pcHVsYXRvci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHZhbHVlID09PSBOdW1iZXIodmFsdWUpLnRvU3RyaW5nKCkpIHtcbiAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgfVxuICBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSAnbnVsbCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5mdW5jdGlvbiBub3JtYWxpemVEYXRhS2V5KGtleSkge1xuICByZXR1cm4ga2V5LnJlcGxhY2UoL1tBLVpdL2csIGNociA9PiBgLSR7Y2hyLnRvTG93ZXJDYXNlKCl9YCk7XG59XG5jb25zdCBNYW5pcHVsYXRvciA9IHtcbiAgc2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCBrZXksIHZhbHVlKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYGRhdGEtYnMtJHtub3JtYWxpemVEYXRhS2V5KGtleSl9YCwgdmFsdWUpO1xuICB9LFxuICByZW1vdmVEYXRhQXR0cmlidXRlKGVsZW1lbnQsIGtleSkge1xuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWJzLSR7bm9ybWFsaXplRGF0YUtleShrZXkpfWApO1xuICB9LFxuICBnZXREYXRhQXR0cmlidXRlcyhlbGVtZW50KSB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcbiAgICBjb25zdCBic0tleXMgPSBPYmplY3Qua2V5cyhlbGVtZW50LmRhdGFzZXQpLmZpbHRlcihrZXkgPT4ga2V5LnN0YXJ0c1dpdGgoJ2JzJykgJiYgIWtleS5zdGFydHNXaXRoKCdic0NvbmZpZycpKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBic0tleXMpIHtcbiAgICAgIGxldCBwdXJlS2V5ID0ga2V5LnJlcGxhY2UoL15icy8sICcnKTtcbiAgICAgIHB1cmVLZXkgPSBwdXJlS2V5LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgcHVyZUtleS5zbGljZSgxKTtcbiAgICAgIGF0dHJpYnV0ZXNbcHVyZUtleV0gPSBub3JtYWxpemVEYXRhKGVsZW1lbnQuZGF0YXNldFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gIH0sXG4gIGdldERhdGFBdHRyaWJ1dGUoZWxlbWVudCwga2V5KSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZURhdGEoZWxlbWVudC5nZXRBdHRyaWJ1dGUoYGRhdGEtYnMtJHtub3JtYWxpemVEYXRhS2V5KGtleSl9YCkpO1xuICB9XG59O1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgdXRpbC9jb25maWcuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIENvbmZpZyB7XG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgaGF2ZSB0byBpbXBsZW1lbnQgdGhlIHN0YXRpYyBtZXRob2QgXCJOQU1FXCIsIGZvciBlYWNoIGNvbXBvbmVudCEnKTtcbiAgfVxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZyk7XG4gICAgY29uZmlnID0gdGhpcy5fY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpO1xuICAgIHRoaXMuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpO1xuICAgIHJldHVybiBjb25maWc7XG4gIH1cbiAgX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuICBfbWVyZ2VDb25maWdPYmooY29uZmlnLCBlbGVtZW50KSB7XG4gICAgY29uc3QganNvbkNvbmZpZyA9IGlzRWxlbWVudChlbGVtZW50KSA/IE1hbmlwdWxhdG9yLmdldERhdGFBdHRyaWJ1dGUoZWxlbWVudCwgJ2NvbmZpZycpIDoge307IC8vIHRyeSB0byBwYXJzZVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCxcbiAgICAgIC4uLih0eXBlb2YganNvbkNvbmZpZyA9PT0gJ29iamVjdCcgPyBqc29uQ29uZmlnIDoge30pLFxuICAgICAgLi4uKGlzRWxlbWVudChlbGVtZW50KSA/IE1hbmlwdWxhdG9yLmdldERhdGFBdHRyaWJ1dGVzKGVsZW1lbnQpIDoge30pLFxuICAgICAgLi4uKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDoge30pXG4gICAgfTtcbiAgfVxuICBfdHlwZUNoZWNrQ29uZmlnKGNvbmZpZywgY29uZmlnVHlwZXMgPSB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRUeXBlKSB7XG4gICAgZm9yIChjb25zdCBbcHJvcGVydHksIGV4cGVjdGVkVHlwZXNdIG9mIE9iamVjdC5lbnRyaWVzKGNvbmZpZ1R5cGVzKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBjb25maWdbcHJvcGVydHldO1xuICAgICAgY29uc3QgdmFsdWVUeXBlID0gaXNFbGVtZW50KHZhbHVlKSA/ICdlbGVtZW50JyA6IHRvVHlwZSh2YWx1ZSk7XG4gICAgICBpZiAoIW5ldyBSZWdFeHAoZXhwZWN0ZWRUeXBlcykudGVzdCh2YWx1ZVR5cGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5OQU1FLnRvVXBwZXJDYXNlKCl9OiBPcHRpb24gXCIke3Byb3BlcnR5fVwiIHByb3ZpZGVkIHR5cGUgXCIke3ZhbHVlVHlwZX1cIiBidXQgZXhwZWN0ZWQgdHlwZSBcIiR7ZXhwZWN0ZWRUeXBlc31cIi5gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGJhc2UtY29tcG9uZW50LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IFZFUlNJT04gPSAnNS4zLjYnO1xuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBCYXNlQ29tcG9uZW50IGV4dGVuZHMgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICBlbGVtZW50ID0gZ2V0RWxlbWVudChlbGVtZW50KTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgRGF0YS5zZXQodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWSwgdGhpcyk7XG4gIH1cblxuICAvLyBQdWJsaWNcbiAgZGlzcG9zZSgpIHtcbiAgICBEYXRhLnJlbW92ZSh0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKTtcbiAgICBFdmVudEhhbmRsZXIub2ZmKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuRVZFTlRfS0VZKTtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKSkge1xuICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9xdWV1ZUNhbGxiYWNrKGNhbGxiYWNrLCBlbGVtZW50LCBpc0FuaW1hdGVkID0gdHJ1ZSkge1xuICAgIGV4ZWN1dGVBZnRlclRyYW5zaXRpb24oY2FsbGJhY2ssIGVsZW1lbnQsIGlzQW5pbWF0ZWQpO1xuICB9XG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uZmlnID0gdGhpcy5fbWVyZ2VDb25maWdPYmooY29uZmlnLCB0aGlzLl9lbGVtZW50KTtcbiAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZyk7XG4gICAgdGhpcy5fdHlwZUNoZWNrQ29uZmlnKGNvbmZpZyk7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWxlbWVudCkge1xuICAgIHJldHVybiBEYXRhLmdldChnZXRFbGVtZW50KGVsZW1lbnQpLCB0aGlzLkRBVEFfS0VZKTtcbiAgfVxuICBzdGF0aWMgZ2V0T3JDcmVhdGVJbnN0YW5jZShlbGVtZW50LCBjb25maWcgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmdldEluc3RhbmNlKGVsZW1lbnQpIHx8IG5ldyB0aGlzKGVsZW1lbnQsIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbCk7XG4gIH1cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OO1xuICB9XG4gIHN0YXRpYyBnZXQgREFUQV9LRVkoKSB7XG4gICAgcmV0dXJuIGBicy4ke3RoaXMuTkFNRX1gO1xuICB9XG4gIHN0YXRpYyBnZXQgRVZFTlRfS0VZKCkge1xuICAgIHJldHVybiBgLiR7dGhpcy5EQVRBX0tFWX1gO1xuICB9XG4gIHN0YXRpYyBldmVudE5hbWUobmFtZSkge1xuICAgIHJldHVybiBgJHtuYW1lfSR7dGhpcy5FVkVOVF9LRVl9YDtcbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgZG9tL3NlbGVjdG9yLWVuZ2luZS5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IGdldFNlbGVjdG9yID0gZWxlbWVudCA9PiB7XG4gIGxldCBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLXRhcmdldCcpO1xuICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSAnIycpIHtcbiAgICBsZXQgaHJlZkF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cbiAgICAvLyBUaGUgb25seSB2YWxpZCBjb250ZW50IHRoYXQgY291bGQgZG91YmxlIGFzIGEgc2VsZWN0b3IgYXJlIElEcyBvciBjbGFzc2VzLFxuICAgIC8vIHNvIGV2ZXJ5dGhpbmcgc3RhcnRpbmcgd2l0aCBgI2Agb3IgYC5gLiBJZiBhIFwicmVhbFwiIFVSTCBpcyB1c2VkIGFzIHRoZSBzZWxlY3RvcixcbiAgICAvLyBgZG9jdW1lbnQucXVlcnlTZWxlY3RvcmAgd2lsbCByaWdodGZ1bGx5IGNvbXBsYWluIGl0IGlzIGludmFsaWQuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMzIyNzNcbiAgICBpZiAoIWhyZWZBdHRyaWJ1dGUgfHwgIWhyZWZBdHRyaWJ1dGUuaW5jbHVkZXMoJyMnKSAmJiAhaHJlZkF0dHJpYnV0ZS5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIEp1c3QgaW4gY2FzZSBzb21lIENNUyBwdXRzIG91dCBhIGZ1bGwgVVJMIHdpdGggdGhlIGFuY2hvciBhcHBlbmRlZFxuICAgIGlmIChocmVmQXR0cmlidXRlLmluY2x1ZGVzKCcjJykgJiYgIWhyZWZBdHRyaWJ1dGUuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgICBocmVmQXR0cmlidXRlID0gYCMke2hyZWZBdHRyaWJ1dGUuc3BsaXQoJyMnKVsxXX1gO1xuICAgIH1cbiAgICBzZWxlY3RvciA9IGhyZWZBdHRyaWJ1dGUgJiYgaHJlZkF0dHJpYnV0ZSAhPT0gJyMnID8gaHJlZkF0dHJpYnV0ZS50cmltKCkgOiBudWxsO1xuICB9XG4gIHJldHVybiBzZWxlY3RvciA/IHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKHNlbCA9PiBwYXJzZVNlbGVjdG9yKHNlbCkpLmpvaW4oJywnKSA6IG51bGw7XG59O1xuY29uc3QgU2VsZWN0b3JFbmdpbmUgPSB7XG4gIGZpbmQoc2VsZWN0b3IsIGVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLkVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwuY2FsbChlbGVtZW50LCBzZWxlY3RvcikpO1xuICB9LFxuICBmaW5kT25lKHNlbGVjdG9yLCBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3IuY2FsbChlbGVtZW50LCBzZWxlY3Rvcik7XG4gIH0sXG4gIGNoaWxkcmVuKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5lbGVtZW50LmNoaWxkcmVuKS5maWx0ZXIoY2hpbGQgPT4gY2hpbGQubWF0Y2hlcyhzZWxlY3RvcikpO1xuICB9LFxuICBwYXJlbnRzKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcGFyZW50cyA9IFtdO1xuICAgIGxldCBhbmNlc3RvciA9IGVsZW1lbnQucGFyZW50Tm9kZS5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICB3aGlsZSAoYW5jZXN0b3IpIHtcbiAgICAgIHBhcmVudHMucHVzaChhbmNlc3Rvcik7XG4gICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudE5vZGUuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnRzO1xuICB9LFxuICBwcmV2KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgbGV0IHByZXZpb3VzID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIHdoaWxlIChwcmV2aW91cykge1xuICAgICAgaWYgKHByZXZpb3VzLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBbcHJldmlvdXNdO1xuICAgICAgfVxuICAgICAgcHJldmlvdXMgPSBwcmV2aW91cy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIC8vIFRPRE86IHRoaXMgaXMgbm93IHVudXNlZDsgcmVtb3ZlIGxhdGVyIGFsb25nIHdpdGggcHJldigpXG4gIG5leHQoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICBsZXQgbmV4dCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBpZiAobmV4dC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gW25leHRdO1xuICAgICAgfVxuICAgICAgbmV4dCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGZvY3VzYWJsZUNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICBjb25zdCBmb2N1c2FibGVzID0gWydhJywgJ2J1dHRvbicsICdpbnB1dCcsICd0ZXh0YXJlYScsICdzZWxlY3QnLCAnZGV0YWlscycsICdbdGFiaW5kZXhdJywgJ1tjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJdJ10ubWFwKHNlbGVjdG9yID0+IGAke3NlbGVjdG9yfTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pYCkuam9pbignLCcpO1xuICAgIHJldHVybiB0aGlzLmZpbmQoZm9jdXNhYmxlcywgZWxlbWVudCkuZmlsdGVyKGVsID0+ICFpc0Rpc2FibGVkKGVsKSAmJiBpc1Zpc2libGUoZWwpKTtcbiAgfSxcbiAgZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRTZWxlY3RvcihlbGVtZW50KTtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBTZWxlY3RvckVuZ2luZS5maW5kT25lKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIGdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0U2VsZWN0b3IoZWxlbWVudCk7XG4gICAgcmV0dXJuIHNlbGVjdG9yID8gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3RvcikgOiBudWxsO1xuICB9LFxuICBnZXRNdWx0aXBsZUVsZW1lbnRzRnJvbVNlbGVjdG9yKGVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGdldFNlbGVjdG9yKGVsZW1lbnQpO1xuICAgIHJldHVybiBzZWxlY3RvciA/IFNlbGVjdG9yRW5naW5lLmZpbmQoc2VsZWN0b3IpIDogW107XG4gIH1cbn07XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL2NvbXBvbmVudC1mdW5jdGlvbnMuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBlbmFibGVEaXNtaXNzVHJpZ2dlciA9IChjb21wb25lbnQsIG1ldGhvZCA9ICdoaWRlJykgPT4ge1xuICBjb25zdCBjbGlja0V2ZW50ID0gYGNsaWNrLmRpc21pc3Mke2NvbXBvbmVudC5FVkVOVF9LRVl9YDtcbiAgY29uc3QgbmFtZSA9IGNvbXBvbmVudC5OQU1FO1xuICBFdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIGNsaWNrRXZlbnQsIGBbZGF0YS1icy1kaXNtaXNzPVwiJHtuYW1lfVwiXWAsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChbJ0EnLCAnQVJFQSddLmluY2x1ZGVzKHRoaXMudGFnTmFtZSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmIChpc0Rpc2FibGVkKHRoaXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldCA9IFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IodGhpcykgfHwgdGhpcy5jbG9zZXN0KGAuJHtuYW1lfWApO1xuICAgIGNvbnN0IGluc3RhbmNlID0gY29tcG9uZW50LmdldE9yQ3JlYXRlSW5zdGFuY2UodGFyZ2V0KTtcblxuICAgIC8vIE1ldGhvZCBhcmd1bWVudCBpcyBsZWZ0LCBmb3IgQWxlcnQgYW5kIG9ubHksIGFzIGl0IGRvZXNuJ3QgaW1wbGVtZW50IHRoZSAnaGlkZScgbWV0aG9kXG4gICAgaW5zdGFuY2VbbWV0aG9kXSgpO1xuICB9KTtcbn07XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBhbGVydC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBOQU1FJGYgPSAnYWxlcnQnO1xuY29uc3QgREFUQV9LRVkkYSA9ICdicy5hbGVydCc7XG5jb25zdCBFVkVOVF9LRVkkYiA9IGAuJHtEQVRBX0tFWSRhfWA7XG5jb25zdCBFVkVOVF9DTE9TRSA9IGBjbG9zZSR7RVZFTlRfS0VZJGJ9YDtcbmNvbnN0IEVWRU5UX0NMT1NFRCA9IGBjbG9zZWQke0VWRU5UX0tFWSRifWA7XG5jb25zdCBDTEFTU19OQU1FX0ZBREUkNSA9ICdmYWRlJztcbmNvbnN0IENMQVNTX05BTUVfU0hPVyQ4ID0gJ3Nob3cnO1xuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBBbGVydCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRSRmO1xuICB9XG5cbiAgLy8gUHVibGljXG4gIGNsb3NlKCkge1xuICAgIGNvbnN0IGNsb3NlRXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9DTE9TRSk7XG4gICAgaWYgKGNsb3NlRXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDgpO1xuICAgIGNvbnN0IGlzQW5pbWF0ZWQgPSB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0ZBREUkNSk7XG4gICAgdGhpcy5fcXVldWVDYWxsYmFjaygoKSA9PiB0aGlzLl9kZXN0cm95RWxlbWVudCgpLCB0aGlzLl9lbGVtZW50LCBpc0FuaW1hdGVkKTtcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2Rlc3Ryb3lFbGVtZW50KCkge1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfQ0xPU0VEKTtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IEFsZXJ0LmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcyk7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpZy5zdGFydHNXaXRoKCdfJykgfHwgY29uZmlnID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICB9XG4gICAgICBkYXRhW2NvbmZpZ10odGhpcyk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICovXG5cbmVuYWJsZURpc21pc3NUcmlnZ2VyKEFsZXJ0LCAnY2xvc2UnKTtcblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oQWxlcnQpO1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgYnV0dG9uLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkZSA9ICdidXR0b24nO1xuY29uc3QgREFUQV9LRVkkOSA9ICdicy5idXR0b24nO1xuY29uc3QgRVZFTlRfS0VZJGEgPSBgLiR7REFUQV9LRVkkOX1gO1xuY29uc3QgREFUQV9BUElfS0VZJDYgPSAnLmRhdGEtYXBpJztcbmNvbnN0IENMQVNTX05BTUVfQUNUSVZFJDMgPSAnYWN0aXZlJztcbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFJDUgPSAnW2RhdGEtYnMtdG9nZ2xlPVwiYnV0dG9uXCJdJztcbmNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJJDYgPSBgY2xpY2ske0VWRU5UX0tFWSRhfSR7REFUQV9BUElfS0VZJDZ9YDtcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FJGU7XG4gIH1cblxuICAvLyBQdWJsaWNcbiAgdG9nZ2xlKCkge1xuICAgIC8vIFRvZ2dsZSBjbGFzcyBhbmQgc3luYyB0aGUgYGFyaWEtcHJlc3NlZGAgYXR0cmlidXRlIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgYC50b2dnbGUoKWAgbWV0aG9kXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShDTEFTU19OQU1FX0FDVElWRSQzKSk7XG4gIH1cblxuICAvLyBTdGF0aWNcbiAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBCdXR0b24uZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKTtcbiAgICAgIGlmIChjb25maWcgPT09ICd0b2dnbGUnKSB7XG4gICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAqL1xuXG5FdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJJDYsIFNFTEVDVE9SX0RBVEFfVE9HR0xFJDUsIGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoU0VMRUNUT1JfREFUQV9UT0dHTEUkNSk7XG4gIGNvbnN0IGRhdGEgPSBCdXR0b24uZ2V0T3JDcmVhdGVJbnN0YW5jZShidXR0b24pO1xuICBkYXRhLnRvZ2dsZSgpO1xufSk7XG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKEJ1dHRvbik7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL3N3aXBlLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkZCA9ICdzd2lwZSc7XG5jb25zdCBFVkVOVF9LRVkkOSA9ICcuYnMuc3dpcGUnO1xuY29uc3QgRVZFTlRfVE9VQ0hTVEFSVCA9IGB0b3VjaHN0YXJ0JHtFVkVOVF9LRVkkOX1gO1xuY29uc3QgRVZFTlRfVE9VQ0hNT1ZFID0gYHRvdWNobW92ZSR7RVZFTlRfS0VZJDl9YDtcbmNvbnN0IEVWRU5UX1RPVUNIRU5EID0gYHRvdWNoZW5kJHtFVkVOVF9LRVkkOX1gO1xuY29uc3QgRVZFTlRfUE9JTlRFUkRPV04gPSBgcG9pbnRlcmRvd24ke0VWRU5UX0tFWSQ5fWA7XG5jb25zdCBFVkVOVF9QT0lOVEVSVVAgPSBgcG9pbnRlcnVwJHtFVkVOVF9LRVkkOX1gO1xuY29uc3QgUE9JTlRFUl9UWVBFX1RPVUNIID0gJ3RvdWNoJztcbmNvbnN0IFBPSU5URVJfVFlQRV9QRU4gPSAncGVuJztcbmNvbnN0IENMQVNTX05BTUVfUE9JTlRFUl9FVkVOVCA9ICdwb2ludGVyLWV2ZW50JztcbmNvbnN0IFNXSVBFX1RIUkVTSE9MRCA9IDQwO1xuY29uc3QgRGVmYXVsdCRjID0ge1xuICBlbmRDYWxsYmFjazogbnVsbCxcbiAgbGVmdENhbGxiYWNrOiBudWxsLFxuICByaWdodENhbGxiYWNrOiBudWxsXG59O1xuY29uc3QgRGVmYXVsdFR5cGUkYyA9IHtcbiAgZW5kQ2FsbGJhY2s6ICcoZnVuY3Rpb258bnVsbCknLFxuICBsZWZ0Q2FsbGJhY2s6ICcoZnVuY3Rpb258bnVsbCknLFxuICByaWdodENhbGxiYWNrOiAnKGZ1bmN0aW9ufG51bGwpJ1xufTtcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgU3dpcGUgZXh0ZW5kcyBDb25maWcge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgIGlmICghZWxlbWVudCB8fCAhU3dpcGUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICB0aGlzLl9kZWx0YVggPSAwO1xuICAgIHRoaXMuX3N1cHBvcnRQb2ludGVyRXZlbnRzID0gQm9vbGVhbih3aW5kb3cuUG9pbnRlckV2ZW50KTtcbiAgICB0aGlzLl9pbml0RXZlbnRzKCk7XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdCRjO1xuICB9XG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlJGM7XG4gIH1cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FJGQ7XG4gIH1cblxuICAvLyBQdWJsaWNcbiAgZGlzcG9zZSgpIHtcbiAgICBFdmVudEhhbmRsZXIub2ZmKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0tFWSQ5KTtcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX3N0YXJ0KGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9zdXBwb3J0UG9pbnRlckV2ZW50cykge1xuICAgICAgdGhpcy5fZGVsdGFYID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZXZlbnRJc1BvaW50ZXJQZW5Ub3VjaChldmVudCkpIHtcbiAgICAgIHRoaXMuX2RlbHRhWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgfVxuICB9XG4gIF9lbmQoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5fZXZlbnRJc1BvaW50ZXJQZW5Ub3VjaChldmVudCkpIHtcbiAgICAgIHRoaXMuX2RlbHRhWCA9IGV2ZW50LmNsaWVudFggLSB0aGlzLl9kZWx0YVg7XG4gICAgfVxuICAgIHRoaXMuX2hhbmRsZVN3aXBlKCk7XG4gICAgZXhlY3V0ZSh0aGlzLl9jb25maWcuZW5kQ2FsbGJhY2spO1xuICB9XG4gIF9tb3ZlKGV2ZW50KSB7XG4gICAgdGhpcy5fZGVsdGFYID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA+IDEgPyAwIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIC0gdGhpcy5fZGVsdGFYO1xuICB9XG4gIF9oYW5kbGVTd2lwZSgpIHtcbiAgICBjb25zdCBhYnNEZWx0YVggPSBNYXRoLmFicyh0aGlzLl9kZWx0YVgpO1xuICAgIGlmIChhYnNEZWx0YVggPD0gU1dJUEVfVEhSRVNIT0xEKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGFic0RlbHRhWCAvIHRoaXMuX2RlbHRhWDtcbiAgICB0aGlzLl9kZWx0YVggPSAwO1xuICAgIGlmICghZGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV4ZWN1dGUoZGlyZWN0aW9uID4gMCA/IHRoaXMuX2NvbmZpZy5yaWdodENhbGxiYWNrIDogdGhpcy5fY29uZmlnLmxlZnRDYWxsYmFjayk7XG4gIH1cbiAgX2luaXRFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuX3N1cHBvcnRQb2ludGVyRXZlbnRzKSB7XG4gICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfUE9JTlRFUkRPV04sIGV2ZW50ID0+IHRoaXMuX3N0YXJ0KGV2ZW50KSk7XG4gICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfUE9JTlRFUlVQLCBldmVudCA9PiB0aGlzLl9lbmQoZXZlbnQpKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1BPSU5URVJfRVZFTlQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfVE9VQ0hTVEFSVCwgZXZlbnQgPT4gdGhpcy5fc3RhcnQoZXZlbnQpKTtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9UT1VDSE1PVkUsIGV2ZW50ID0+IHRoaXMuX21vdmUoZXZlbnQpKTtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9UT1VDSEVORCwgZXZlbnQgPT4gdGhpcy5fZW5kKGV2ZW50KSk7XG4gICAgfVxuICB9XG4gIF9ldmVudElzUG9pbnRlclBlblRvdWNoKGV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1cHBvcnRQb2ludGVyRXZlbnRzICYmIChldmVudC5wb2ludGVyVHlwZSA9PT0gUE9JTlRFUl9UWVBFX1BFTiB8fCBldmVudC5wb2ludGVyVHlwZSA9PT0gUE9JTlRFUl9UWVBFX1RPVUNIKTtcbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgaXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBjYXJvdXNlbC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBOQU1FJGMgPSAnY2Fyb3VzZWwnO1xuY29uc3QgREFUQV9LRVkkOCA9ICdicy5jYXJvdXNlbCc7XG5jb25zdCBFVkVOVF9LRVkkOCA9IGAuJHtEQVRBX0tFWSQ4fWA7XG5jb25zdCBEQVRBX0FQSV9LRVkkNSA9ICcuZGF0YS1hcGknO1xuY29uc3QgQVJST1dfTEVGVF9LRVkkMSA9ICdBcnJvd0xlZnQnO1xuY29uc3QgQVJST1dfUklHSFRfS0VZJDEgPSAnQXJyb3dSaWdodCc7XG5jb25zdCBUT1VDSEVWRU5UX0NPTVBBVF9XQUlUID0gNTAwOyAvLyBUaW1lIGZvciBtb3VzZSBjb21wYXQgZXZlbnRzIHRvIGZpcmUgYWZ0ZXIgdG91Y2hcblxuY29uc3QgT1JERVJfTkVYVCA9ICduZXh0JztcbmNvbnN0IE9SREVSX1BSRVYgPSAncHJldic7XG5jb25zdCBESVJFQ1RJT05fTEVGVCA9ICdsZWZ0JztcbmNvbnN0IERJUkVDVElPTl9SSUdIVCA9ICdyaWdodCc7XG5jb25zdCBFVkVOVF9TTElERSA9IGBzbGlkZSR7RVZFTlRfS0VZJDh9YDtcbmNvbnN0IEVWRU5UX1NMSUQgPSBgc2xpZCR7RVZFTlRfS0VZJDh9YDtcbmNvbnN0IEVWRU5UX0tFWURPV04kMSA9IGBrZXlkb3duJHtFVkVOVF9LRVkkOH1gO1xuY29uc3QgRVZFTlRfTU9VU0VFTlRFUiQxID0gYG1vdXNlZW50ZXIke0VWRU5UX0tFWSQ4fWA7XG5jb25zdCBFVkVOVF9NT1VTRUxFQVZFJDEgPSBgbW91c2VsZWF2ZSR7RVZFTlRfS0VZJDh9YDtcbmNvbnN0IEVWRU5UX0RSQUdfU1RBUlQgPSBgZHJhZ3N0YXJ0JHtFVkVOVF9LRVkkOH1gO1xuY29uc3QgRVZFTlRfTE9BRF9EQVRBX0FQSSQzID0gYGxvYWQke0VWRU5UX0tFWSQ4fSR7REFUQV9BUElfS0VZJDV9YDtcbmNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJJDUgPSBgY2xpY2ske0VWRU5UX0tFWSQ4fSR7REFUQV9BUElfS0VZJDV9YDtcbmNvbnN0IENMQVNTX05BTUVfQ0FST1VTRUwgPSAnY2Fyb3VzZWwnO1xuY29uc3QgQ0xBU1NfTkFNRV9BQ1RJVkUkMiA9ICdhY3RpdmUnO1xuY29uc3QgQ0xBU1NfTkFNRV9TTElERSA9ICdzbGlkZSc7XG5jb25zdCBDTEFTU19OQU1FX0VORCA9ICdjYXJvdXNlbC1pdGVtLWVuZCc7XG5jb25zdCBDTEFTU19OQU1FX1NUQVJUID0gJ2Nhcm91c2VsLWl0ZW0tc3RhcnQnO1xuY29uc3QgQ0xBU1NfTkFNRV9ORVhUID0gJ2Nhcm91c2VsLWl0ZW0tbmV4dCc7XG5jb25zdCBDTEFTU19OQU1FX1BSRVYgPSAnY2Fyb3VzZWwtaXRlbS1wcmV2JztcbmNvbnN0IFNFTEVDVE9SX0FDVElWRSA9ICcuYWN0aXZlJztcbmNvbnN0IFNFTEVDVE9SX0lURU0gPSAnLmNhcm91c2VsLWl0ZW0nO1xuY29uc3QgU0VMRUNUT1JfQUNUSVZFX0lURU0gPSBTRUxFQ1RPUl9BQ1RJVkUgKyBTRUxFQ1RPUl9JVEVNO1xuY29uc3QgU0VMRUNUT1JfSVRFTV9JTUcgPSAnLmNhcm91c2VsLWl0ZW0gaW1nJztcbmNvbnN0IFNFTEVDVE9SX0lORElDQVRPUlMgPSAnLmNhcm91c2VsLWluZGljYXRvcnMnO1xuY29uc3QgU0VMRUNUT1JfREFUQV9TTElERSA9ICdbZGF0YS1icy1zbGlkZV0sIFtkYXRhLWJzLXNsaWRlLXRvXSc7XG5jb25zdCBTRUxFQ1RPUl9EQVRBX1JJREUgPSAnW2RhdGEtYnMtcmlkZT1cImNhcm91c2VsXCJdJztcbmNvbnN0IEtFWV9UT19ESVJFQ1RJT04gPSB7XG4gIFtBUlJPV19MRUZUX0tFWSQxXTogRElSRUNUSU9OX1JJR0hULFxuICBbQVJST1dfUklHSFRfS0VZJDFdOiBESVJFQ1RJT05fTEVGVFxufTtcbmNvbnN0IERlZmF1bHQkYiA9IHtcbiAgaW50ZXJ2YWw6IDUwMDAsXG4gIGtleWJvYXJkOiB0cnVlLFxuICBwYXVzZTogJ2hvdmVyJyxcbiAgcmlkZTogZmFsc2UsXG4gIHRvdWNoOiB0cnVlLFxuICB3cmFwOiB0cnVlXG59O1xuY29uc3QgRGVmYXVsdFR5cGUkYiA9IHtcbiAgaW50ZXJ2YWw6ICcobnVtYmVyfGJvb2xlYW4pJyxcbiAgLy8gVE9ETzp2NiByZW1vdmUgYm9vbGVhbiBzdXBwb3J0XG4gIGtleWJvYXJkOiAnYm9vbGVhbicsXG4gIHBhdXNlOiAnKHN0cmluZ3xib29sZWFuKScsXG4gIHJpZGU6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgdG91Y2g6ICdib29sZWFuJyxcbiAgd3JhcDogJ2Jvb2xlYW4nXG59O1xuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBDYXJvdXNlbCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICBzdXBlcihlbGVtZW50LCBjb25maWcpO1xuICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICB0aGlzLl9hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnRvdWNoVGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5fc3dpcGVIZWxwZXIgPSBudWxsO1xuICAgIHRoaXMuX2luZGljYXRvcnNFbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShTRUxFQ1RPUl9JTkRJQ0FUT1JTLCB0aGlzLl9lbGVtZW50KTtcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIGlmICh0aGlzLl9jb25maWcucmlkZSA9PT0gQ0xBU1NfTkFNRV9DQVJPVVNFTCkge1xuICAgICAgdGhpcy5jeWNsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0JGI7XG4gIH1cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGUkYjtcbiAgfVxuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIE5BTUUkYztcbiAgfVxuXG4gIC8vIFB1YmxpY1xuICBuZXh0KCkge1xuICAgIHRoaXMuX3NsaWRlKE9SREVSX05FWFQpO1xuICB9XG4gIG5leHRXaGVuVmlzaWJsZSgpIHtcbiAgICAvLyBGSVhNRSBUT0RPIHVzZSBgZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlYFxuICAgIC8vIERvbid0IGNhbGwgbmV4dCB3aGVuIHRoZSBwYWdlIGlzbid0IHZpc2libGVcbiAgICAvLyBvciB0aGUgY2Fyb3VzZWwgb3IgaXRzIHBhcmVudCBpc24ndCB2aXNpYmxlXG4gICAgaWYgKCFkb2N1bWVudC5oaWRkZW4gJiYgaXNWaXNpYmxlKHRoaXMuX2VsZW1lbnQpKSB7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICB9XG4gIH1cbiAgcHJldigpIHtcbiAgICB0aGlzLl9zbGlkZShPUkRFUl9QUkVWKTtcbiAgfVxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICB0cmlnZ2VyVHJhbnNpdGlvbkVuZCh0aGlzLl9lbGVtZW50KTtcbiAgICB9XG4gICAgdGhpcy5fY2xlYXJJbnRlcnZhbCgpO1xuICB9XG4gIGN5Y2xlKCkge1xuICAgIHRoaXMuX2NsZWFySW50ZXJ2YWwoKTtcbiAgICB0aGlzLl91cGRhdGVJbnRlcnZhbCgpO1xuICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5uZXh0V2hlblZpc2libGUoKSwgdGhpcy5fY29uZmlnLmludGVydmFsKTtcbiAgfVxuICBfbWF5YmVFbmFibGVDeWNsZSgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5yaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vbmUodGhpcy5fZWxlbWVudCwgRVZFTlRfU0xJRCwgKCkgPT4gdGhpcy5jeWNsZSgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jeWNsZSgpO1xuICB9XG4gIHRvKGluZGV4KSB7XG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLl9nZXRJdGVtcygpO1xuICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEgfHwgaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vbmUodGhpcy5fZWxlbWVudCwgRVZFTlRfU0xJRCwgKCkgPT4gdGhpcy50byhpbmRleCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleCh0aGlzLl9nZXRBY3RpdmUoKSk7XG4gICAgaWYgKGFjdGl2ZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcmRlciA9IGluZGV4ID4gYWN0aXZlSW5kZXggPyBPUkRFUl9ORVhUIDogT1JERVJfUFJFVjtcbiAgICB0aGlzLl9zbGlkZShvcmRlciwgaXRlbXNbaW5kZXhdKTtcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIGlmICh0aGlzLl9zd2lwZUhlbHBlcikge1xuICAgICAgdGhpcy5fc3dpcGVIZWxwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBzdXBlci5kaXNwb3NlKCk7XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIGNvbmZpZy5kZWZhdWx0SW50ZXJ2YWwgPSBjb25maWcuaW50ZXJ2YWw7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0tFWURPV04kMSwgZXZlbnQgPT4gdGhpcy5fa2V5ZG93bihldmVudCkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlID09PSAnaG92ZXInKSB7XG4gICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfTU9VU0VFTlRFUiQxLCAoKSA9PiB0aGlzLnBhdXNlKCkpO1xuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFTEVBVkUkMSwgKCkgPT4gdGhpcy5fbWF5YmVFbmFibGVDeWNsZSgpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbmZpZy50b3VjaCAmJiBTd2lwZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICB0aGlzLl9hZGRUb3VjaEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG4gIF9hZGRUb3VjaEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGZvciAoY29uc3QgaW1nIG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfSVRFTV9JTUcsIHRoaXMuX2VsZW1lbnQpKSB7XG4gICAgICBFdmVudEhhbmRsZXIub24oaW1nLCBFVkVOVF9EUkFHX1NUQVJULCBldmVudCA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICB9XG4gICAgY29uc3QgZW5kQ2FsbEJhY2sgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlICE9PSAnaG92ZXInKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQncyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlLCBtb3VzZWVudGVyL2xlYXZlIGFyZSBmaXJlZCBhc1xuICAgICAgLy8gcGFydCBvZiB0aGUgbW91c2UgY29tcGF0aWJpbGl0eSBldmVudHMgb24gZmlyc3QgdGFwIC0gdGhlIGNhcm91c2VsXG4gICAgICAvLyB3b3VsZCBzdG9wIGN5Y2xpbmcgdW50aWwgdXNlciB0YXBwZWQgb3V0IG9mIGl0O1xuICAgICAgLy8gaGVyZSwgd2UgbGlzdGVuIGZvciB0b3VjaGVuZCwgZXhwbGljaXRseSBwYXVzZSB0aGUgY2Fyb3VzZWxcbiAgICAgIC8vIChhcyBpZiBpdCdzIHRoZSBzZWNvbmQgdGltZSB3ZSB0YXAgb24gaXQsIG1vdXNlZW50ZXIgY29tcGF0IGV2ZW50XG4gICAgICAvLyBpcyBOT1QgZmlyZWQpIGFuZCBhZnRlciBhIHRpbWVvdXQgKHRvIGFsbG93IGZvciBtb3VzZSBjb21wYXRpYmlsaXR5XG4gICAgICAvLyBldmVudHMgdG8gZmlyZSkgd2UgZXhwbGljaXRseSByZXN0YXJ0IGN5Y2xpbmdcblxuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgaWYgKHRoaXMudG91Y2hUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRvdWNoVGltZW91dCk7XG4gICAgICB9XG4gICAgICB0aGlzLnRvdWNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fbWF5YmVFbmFibGVDeWNsZSgpLCBUT1VDSEVWRU5UX0NPTVBBVF9XQUlUICsgdGhpcy5fY29uZmlnLmludGVydmFsKTtcbiAgICB9O1xuICAgIGNvbnN0IHN3aXBlQ29uZmlnID0ge1xuICAgICAgbGVmdENhbGxiYWNrOiAoKSA9PiB0aGlzLl9zbGlkZSh0aGlzLl9kaXJlY3Rpb25Ub09yZGVyKERJUkVDVElPTl9MRUZUKSksXG4gICAgICByaWdodENhbGxiYWNrOiAoKSA9PiB0aGlzLl9zbGlkZSh0aGlzLl9kaXJlY3Rpb25Ub09yZGVyKERJUkVDVElPTl9SSUdIVCkpLFxuICAgICAgZW5kQ2FsbGJhY2s6IGVuZENhbGxCYWNrXG4gICAgfTtcbiAgICB0aGlzLl9zd2lwZUhlbHBlciA9IG5ldyBTd2lwZSh0aGlzLl9lbGVtZW50LCBzd2lwZUNvbmZpZyk7XG4gIH1cbiAgX2tleWRvd24oZXZlbnQpIHtcbiAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGlyZWN0aW9uID0gS0VZX1RPX0RJUkVDVElPTltldmVudC5rZXldO1xuICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9zbGlkZSh0aGlzLl9kaXJlY3Rpb25Ub09yZGVyKGRpcmVjdGlvbikpO1xuICAgIH1cbiAgfVxuICBfZ2V0SXRlbUluZGV4KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbXMoKS5pbmRleE9mKGVsZW1lbnQpO1xuICB9XG4gIF9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50KGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhY3RpdmVJbmRpY2F0b3IgPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0FDVElWRSwgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQpO1xuICAgIGFjdGl2ZUluZGljYXRvci5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFJDIpO1xuICAgIGFjdGl2ZUluZGljYXRvci5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcpO1xuICAgIGNvbnN0IG5ld0FjdGl2ZUluZGljYXRvciA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoYFtkYXRhLWJzLXNsaWRlLXRvPVwiJHtpbmRleH1cIl1gLCB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCk7XG4gICAgaWYgKG5ld0FjdGl2ZUluZGljYXRvcikge1xuICAgICAgbmV3QWN0aXZlSW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUkMik7XG4gICAgICBuZXdBY3RpdmVJbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAndHJ1ZScpO1xuICAgIH1cbiAgfVxuICBfdXBkYXRlSW50ZXJ2YWwoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2FjdGl2ZUVsZW1lbnQgfHwgdGhpcy5fZ2V0QWN0aXZlKCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnRJbnRlcnZhbCA9IE51bWJlci5wYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1pbnRlcnZhbCcpLCAxMCk7XG4gICAgdGhpcy5fY29uZmlnLmludGVydmFsID0gZWxlbWVudEludGVydmFsIHx8IHRoaXMuX2NvbmZpZy5kZWZhdWx0SW50ZXJ2YWw7XG4gIH1cbiAgX3NsaWRlKG9yZGVyLCBlbGVtZW50ID0gbnVsbCkge1xuICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHRoaXMuX2dldEFjdGl2ZSgpO1xuICAgIGNvbnN0IGlzTmV4dCA9IG9yZGVyID09PSBPUkRFUl9ORVhUO1xuICAgIGNvbnN0IG5leHRFbGVtZW50ID0gZWxlbWVudCB8fCBnZXROZXh0QWN0aXZlRWxlbWVudCh0aGlzLl9nZXRJdGVtcygpLCBhY3RpdmVFbGVtZW50LCBpc05leHQsIHRoaXMuX2NvbmZpZy53cmFwKTtcbiAgICBpZiAobmV4dEVsZW1lbnQgPT09IGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dEVsZW1lbnRJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChuZXh0RWxlbWVudCk7XG4gICAgY29uc3QgdHJpZ2dlckV2ZW50ID0gZXZlbnROYW1lID0+IHtcbiAgICAgIHJldHVybiBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBldmVudE5hbWUsIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogbmV4dEVsZW1lbnQsXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5fb3JkZXJUb0RpcmVjdGlvbihvcmRlciksXG4gICAgICAgIGZyb206IHRoaXMuX2dldEl0ZW1JbmRleChhY3RpdmVFbGVtZW50KSxcbiAgICAgICAgdG86IG5leHRFbGVtZW50SW5kZXhcbiAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3Qgc2xpZGVFdmVudCA9IHRyaWdnZXJFdmVudChFVkVOVF9TTElERSk7XG4gICAgaWYgKHNsaWRlRXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWFjdGl2ZUVsZW1lbnQgfHwgIW5leHRFbGVtZW50KSB7XG4gICAgICAvLyBTb21lIHdlaXJkbmVzcyBpcyBoYXBwZW5pbmcsIHNvIHdlIGJhaWxcbiAgICAgIC8vIFRPRE86IGNoYW5nZSB0ZXN0cyB0aGF0IHVzZSBlbXB0eSBkaXZzIHRvIGF2b2lkIHRoaXMgY2hlY2tcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXNDeWNsaW5nID0gQm9vbGVhbih0aGlzLl9pbnRlcnZhbCk7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIHRoaXMuX2lzU2xpZGluZyA9IHRydWU7XG4gICAgdGhpcy5fc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChuZXh0RWxlbWVudEluZGV4KTtcbiAgICB0aGlzLl9hY3RpdmVFbGVtZW50ID0gbmV4dEVsZW1lbnQ7XG4gICAgY29uc3QgZGlyZWN0aW9uYWxDbGFzc05hbWUgPSBpc05leHQgPyBDTEFTU19OQU1FX1NUQVJUIDogQ0xBU1NfTkFNRV9FTkQ7XG4gICAgY29uc3Qgb3JkZXJDbGFzc05hbWUgPSBpc05leHQgPyBDTEFTU19OQU1FX05FWFQgOiBDTEFTU19OQU1FX1BSRVY7XG4gICAgbmV4dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcmRlckNsYXNzTmFtZSk7XG4gICAgcmVmbG93KG5leHRFbGVtZW50KTtcbiAgICBhY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlyZWN0aW9uYWxDbGFzc05hbWUpO1xuICAgIG5leHRFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlyZWN0aW9uYWxDbGFzc05hbWUpO1xuICAgIGNvbnN0IGNvbXBsZXRlQ2FsbEJhY2sgPSAoKSA9PiB7XG4gICAgICBuZXh0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpcmVjdGlvbmFsQ2xhc3NOYW1lLCBvcmRlckNsYXNzTmFtZSk7XG4gICAgICBuZXh0RWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQUNUSVZFJDIpO1xuICAgICAgYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFJDIsIG9yZGVyQ2xhc3NOYW1lLCBkaXJlY3Rpb25hbENsYXNzTmFtZSk7XG4gICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgIHRyaWdnZXJFdmVudChFVkVOVF9TTElEKTtcbiAgICB9O1xuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGVDYWxsQmFjaywgYWN0aXZlRWxlbWVudCwgdGhpcy5faXNBbmltYXRlZCgpKTtcbiAgICBpZiAoaXNDeWNsaW5nKSB7XG4gICAgICB0aGlzLmN5Y2xlKCk7XG4gICAgfVxuICB9XG4gIF9pc0FuaW1hdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX1NMSURFKTtcbiAgfVxuICBfZ2V0QWN0aXZlKCkge1xuICAgIHJldHVybiBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0FDVElWRV9JVEVNLCB0aGlzLl9lbGVtZW50KTtcbiAgfVxuICBfZ2V0SXRlbXMoKSB7XG4gICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfSVRFTSwgdGhpcy5fZWxlbWVudCk7XG4gIH1cbiAgX2NsZWFySW50ZXJ2YWwoKSB7XG4gICAgaWYgKHRoaXMuX2ludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgX2RpcmVjdGlvblRvT3JkZXIoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGlzUlRMKCkpIHtcbiAgICAgIHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTl9MRUZUID8gT1JERVJfUFJFViA6IE9SREVSX05FWFQ7XG4gICAgfVxuICAgIHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTl9MRUZUID8gT1JERVJfTkVYVCA6IE9SREVSX1BSRVY7XG4gIH1cbiAgX29yZGVyVG9EaXJlY3Rpb24ob3JkZXIpIHtcbiAgICBpZiAoaXNSVEwoKSkge1xuICAgICAgcmV0dXJuIG9yZGVyID09PSBPUkRFUl9QUkVWID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgfVxuICAgIHJldHVybiBvcmRlciA9PT0gT1JERVJfUFJFViA/IERJUkVDVElPTl9SSUdIVCA6IERJUkVDVElPTl9MRUZUO1xuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gQ2Fyb3VzZWwuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzLCBjb25maWcpO1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGRhdGEudG8oY29uZmlnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCB8fCBjb25maWcuc3RhcnRzV2l0aCgnXycpIHx8IGNvbmZpZyA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICovXG5cbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEkkNSwgU0VMRUNUT1JfREFUQV9TTElERSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGNvbnN0IHRhcmdldCA9IFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IodGhpcyk7XG4gIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfQ0FST1VTRUwpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGNhcm91c2VsID0gQ2Fyb3VzZWwuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0YXJnZXQpO1xuICBjb25zdCBzbGlkZUluZGV4ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtc2xpZGUtdG8nKTtcbiAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICBjYXJvdXNlbC50byhzbGlkZUluZGV4KTtcbiAgICBjYXJvdXNlbC5fbWF5YmVFbmFibGVDeWNsZSgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZSh0aGlzLCAnc2xpZGUnKSA9PT0gJ25leHQnKSB7XG4gICAgY2Fyb3VzZWwubmV4dCgpO1xuICAgIGNhcm91c2VsLl9tYXliZUVuYWJsZUN5Y2xlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNhcm91c2VsLnByZXYoKTtcbiAgY2Fyb3VzZWwuX21heWJlRW5hYmxlQ3ljbGUoKTtcbn0pO1xuRXZlbnRIYW5kbGVyLm9uKHdpbmRvdywgRVZFTlRfTE9BRF9EQVRBX0FQSSQzLCAoKSA9PiB7XG4gIGNvbnN0IGNhcm91c2VscyA9IFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9SSURFKTtcbiAgZm9yIChjb25zdCBjYXJvdXNlbCBvZiBjYXJvdXNlbHMpIHtcbiAgICBDYXJvdXNlbC5nZXRPckNyZWF0ZUluc3RhbmNlKGNhcm91c2VsKTtcbiAgfVxufSk7XG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKENhcm91c2VsKTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGNvbGxhcHNlLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkYiA9ICdjb2xsYXBzZSc7XG5jb25zdCBEQVRBX0tFWSQ3ID0gJ2JzLmNvbGxhcHNlJztcbmNvbnN0IEVWRU5UX0tFWSQ3ID0gYC4ke0RBVEFfS0VZJDd9YDtcbmNvbnN0IERBVEFfQVBJX0tFWSQ0ID0gJy5kYXRhLWFwaSc7XG5jb25zdCBFVkVOVF9TSE9XJDYgPSBgc2hvdyR7RVZFTlRfS0VZJDd9YDtcbmNvbnN0IEVWRU5UX1NIT1dOJDYgPSBgc2hvd24ke0VWRU5UX0tFWSQ3fWA7XG5jb25zdCBFVkVOVF9ISURFJDYgPSBgaGlkZSR7RVZFTlRfS0VZJDd9YDtcbmNvbnN0IEVWRU5UX0hJRERFTiQ2ID0gYGhpZGRlbiR7RVZFTlRfS0VZJDd9YDtcbmNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJJDQgPSBgY2xpY2ske0VWRU5UX0tFWSQ3fSR7REFUQV9BUElfS0VZJDR9YDtcbmNvbnN0IENMQVNTX05BTUVfU0hPVyQ3ID0gJ3Nob3cnO1xuY29uc3QgQ0xBU1NfTkFNRV9DT0xMQVBTRSA9ICdjb2xsYXBzZSc7XG5jb25zdCBDTEFTU19OQU1FX0NPTExBUFNJTkcgPSAnY29sbGFwc2luZyc7XG5jb25zdCBDTEFTU19OQU1FX0NPTExBUFNFRCA9ICdjb2xsYXBzZWQnO1xuY29uc3QgQ0xBU1NfTkFNRV9ERUVQRVJfQ0hJTERSRU4gPSBgOnNjb3BlIC4ke0NMQVNTX05BTUVfQ09MTEFQU0V9IC4ke0NMQVNTX05BTUVfQ09MTEFQU0V9YDtcbmNvbnN0IENMQVNTX05BTUVfSE9SSVpPTlRBTCA9ICdjb2xsYXBzZS1ob3Jpem9udGFsJztcbmNvbnN0IFdJRFRIID0gJ3dpZHRoJztcbmNvbnN0IEhFSUdIVCA9ICdoZWlnaHQnO1xuY29uc3QgU0VMRUNUT1JfQUNUSVZFUyA9ICcuY29sbGFwc2Uuc2hvdywgLmNvbGxhcHNlLmNvbGxhcHNpbmcnO1xuY29uc3QgU0VMRUNUT1JfREFUQV9UT0dHTEUkNCA9ICdbZGF0YS1icy10b2dnbGU9XCJjb2xsYXBzZVwiXSc7XG5jb25zdCBEZWZhdWx0JGEgPSB7XG4gIHBhcmVudDogbnVsbCxcbiAgdG9nZ2xlOiB0cnVlXG59O1xuY29uc3QgRGVmYXVsdFR5cGUkYSA9IHtcbiAgcGFyZW50OiAnKG51bGx8ZWxlbWVudCknLFxuICB0b2dnbGU6ICdib29sZWFuJ1xufTtcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgQ29sbGFwc2UgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKTtcbiAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSBbXTtcbiAgICBjb25zdCB0b2dnbGVMaXN0ID0gU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9EQVRBX1RPR0dMRSQ0KTtcbiAgICBmb3IgKGNvbnN0IGVsZW0gb2YgdG9nZ2xlTGlzdCkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBTZWxlY3RvckVuZ2luZS5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW0pO1xuICAgICAgY29uc3QgZmlsdGVyRWxlbWVudCA9IFNlbGVjdG9yRW5naW5lLmZpbmQoc2VsZWN0b3IpLmZpbHRlcihmb3VuZEVsZW1lbnQgPT4gZm91bmRFbGVtZW50ID09PSB0aGlzLl9lbGVtZW50KTtcbiAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCAmJiBmaWx0ZXJFbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLl90cmlnZ2VyQXJyYXkucHVzaChlbGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5faW5pdGlhbGl6ZUNoaWxkcmVuKCk7XG4gICAgaWYgKCF0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fdHJpZ2dlckFycmF5LCB0aGlzLl9pc1Nob3duKCkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY29uZmlnLnRvZ2dsZSkge1xuICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdCRhO1xuICB9XG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlJGE7XG4gIH1cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FJGI7XG4gIH1cblxuICAvLyBQdWJsaWNcbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8IHRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYWN0aXZlQ2hpbGRyZW4gPSBbXTtcblxuICAgIC8vIGZpbmQgYWN0aXZlIGNoaWxkcmVuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgIGFjdGl2ZUNoaWxkcmVuID0gdGhpcy5fZ2V0Rmlyc3RMZXZlbENoaWxkcmVuKFNFTEVDVE9SX0FDVElWRVMpLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQgIT09IHRoaXMuX2VsZW1lbnQpLm1hcChlbGVtZW50ID0+IENvbGxhcHNlLmdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCwge1xuICAgICAgICB0b2dnbGU6IGZhbHNlXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChhY3RpdmVDaGlsZHJlbi5sZW5ndGggJiYgYWN0aXZlQ2hpbGRyZW5bMF0uX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdGFydEV2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPVyQ2KTtcbiAgICBpZiAoc3RhcnRFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgYWN0aXZlSW5zdGFuY2Ugb2YgYWN0aXZlQ2hpbGRyZW4pIHtcbiAgICAgIGFjdGl2ZUluc3RhbmNlLmhpZGUoKTtcbiAgICB9XG4gICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKCk7XG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0UpO1xuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNJTkcpO1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IDA7XG4gICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuX3RyaWdnZXJBcnJheSwgdHJ1ZSk7XG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0lORyk7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9DT0xMQVBTRSwgQ0xBU1NfTkFNRV9TSE9XJDcpO1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJyc7XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTiQ2KTtcbiAgICB9O1xuICAgIGNvbnN0IGNhcGl0YWxpemVkRGltZW5zaW9uID0gZGltZW5zaW9uWzBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoMSk7XG4gICAgY29uc3Qgc2Nyb2xsU2l6ZSA9IGBzY3JvbGwke2NhcGl0YWxpemVkRGltZW5zaW9ufWA7XG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy5fZWxlbWVudCwgdHJ1ZSk7XG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gYCR7dGhpcy5fZWxlbWVudFtzY3JvbGxTaXplXX1weGA7XG4gIH1cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICF0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3RhcnRFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUkNik7XG4gICAgaWYgKHN0YXJ0RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKTtcbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2RpbWVuc2lvbl19cHhgO1xuICAgIHJlZmxvdyh0aGlzLl9lbGVtZW50KTtcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9DT0xMQVBTSU5HKTtcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9DT0xMQVBTRSwgQ0xBU1NfTkFNRV9TSE9XJDcpO1xuICAgIGZvciAoY29uc3QgdHJpZ2dlciBvZiB0aGlzLl90cmlnZ2VyQXJyYXkpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHRyaWdnZXIpO1xuICAgICAgaWYgKGVsZW1lbnQgJiYgIXRoaXMuX2lzU2hvd24oZWxlbWVudCkpIHtcbiAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKFt0cmlnZ2VyXSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9DT0xMQVBTSU5HKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNFKTtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJRERFTiQ2KTtcbiAgICB9O1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnO1xuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIHRoaXMuX2VsZW1lbnQsIHRydWUpO1xuICB9XG5cbiAgLy8gUHJpdmF0ZVxuICBfaXNTaG93bihlbGVtZW50ID0gdGhpcy5fZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX1NIT1ckNyk7XG4gIH1cbiAgX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKSB7XG4gICAgY29uZmlnLnRvZ2dsZSA9IEJvb2xlYW4oY29uZmlnLnRvZ2dsZSk7IC8vIENvZXJjZSBzdHJpbmcgdmFsdWVzXG4gICAgY29uZmlnLnBhcmVudCA9IGdldEVsZW1lbnQoY29uZmlnLnBhcmVudCk7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuICBfZ2V0RGltZW5zaW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0hPUklaT05UQUwpID8gV0lEVEggOiBIRUlHSFQ7XG4gIH1cbiAgX2luaXRpYWxpemVDaGlsZHJlbigpIHtcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLl9nZXRGaXJzdExldmVsQ2hpbGRyZW4oU0VMRUNUT1JfREFUQV9UT0dHTEUkNCk7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNoaWxkcmVuKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudCk7XG4gICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKFtlbGVtZW50XSwgdGhpcy5faXNTaG93bihzZWxlY3RlZCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBfZ2V0Rmlyc3RMZXZlbENoaWxkcmVuKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBTZWxlY3RvckVuZ2luZS5maW5kKENMQVNTX05BTUVfREVFUEVSX0NISUxEUkVOLCB0aGlzLl9jb25maWcucGFyZW50KTtcbiAgICAvLyByZW1vdmUgY2hpbGRyZW4gaWYgZ3JlYXRlciBkZXB0aFxuICAgIHJldHVybiBTZWxlY3RvckVuZ2luZS5maW5kKHNlbGVjdG9yLCB0aGlzLl9jb25maWcucGFyZW50KS5maWx0ZXIoZWxlbWVudCA9PiAhY2hpbGRyZW4uaW5jbHVkZXMoZWxlbWVudCkpO1xuICB9XG4gIF9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModHJpZ2dlckFycmF5LCBpc09wZW4pIHtcbiAgICBpZiAoIXRyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRyaWdnZXJBcnJheSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKENMQVNTX05BTUVfQ09MTEFQU0VELCAhaXNPcGVuKTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKTtcbiAgICB9XG4gIH1cblxuICAvLyBTdGF0aWNcbiAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICBjb25zdCBfY29uZmlnID0ge307XG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgX2NvbmZpZy50b2dnbGUgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gQ29sbGFwc2UuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzLCBfY29uZmlnKTtcbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAqL1xuXG5FdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJJDQsIFNFTEVDVE9SX0RBVEFfVE9HR0xFJDQsIGZ1bmN0aW9uIChldmVudCkge1xuICAvLyBwcmV2ZW50RGVmYXVsdCBvbmx5IGZvciA8YT4gZWxlbWVudHMgKHdoaWNoIGNoYW5nZSB0aGUgVVJMKSBub3QgaW5zaWRlIHRoZSBjb2xsYXBzaWJsZSBlbGVtZW50XG4gIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0EnIHx8IGV2ZW50LmRlbGVnYXRlVGFyZ2V0ICYmIGV2ZW50LmRlbGVnYXRlVGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIFNlbGVjdG9yRW5naW5lLmdldE11bHRpcGxlRWxlbWVudHNGcm9tU2VsZWN0b3IodGhpcykpIHtcbiAgICBDb2xsYXBzZS5nZXRPckNyZWF0ZUluc3RhbmNlKGVsZW1lbnQsIHtcbiAgICAgIHRvZ2dsZTogZmFsc2VcbiAgICB9KS50b2dnbGUoKTtcbiAgfVxufSk7XG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKENvbGxhcHNlKTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGRyb3Bkb3duLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkYSA9ICdkcm9wZG93bic7XG5jb25zdCBEQVRBX0tFWSQ2ID0gJ2JzLmRyb3Bkb3duJztcbmNvbnN0IEVWRU5UX0tFWSQ2ID0gYC4ke0RBVEFfS0VZJDZ9YDtcbmNvbnN0IERBVEFfQVBJX0tFWSQzID0gJy5kYXRhLWFwaSc7XG5jb25zdCBFU0NBUEVfS0VZJDIgPSAnRXNjYXBlJztcbmNvbnN0IFRBQl9LRVkkMSA9ICdUYWInO1xuY29uc3QgQVJST1dfVVBfS0VZJDEgPSAnQXJyb3dVcCc7XG5jb25zdCBBUlJPV19ET1dOX0tFWSQxID0gJ0Fycm93RG93bic7XG5jb25zdCBSSUdIVF9NT1VTRV9CVVRUT04gPSAyOyAvLyBNb3VzZUV2ZW50LmJ1dHRvbiB2YWx1ZSBmb3IgdGhlIHNlY29uZGFyeSBidXR0b24sIHVzdWFsbHkgdGhlIHJpZ2h0IGJ1dHRvblxuXG5jb25zdCBFVkVOVF9ISURFJDUgPSBgaGlkZSR7RVZFTlRfS0VZJDZ9YDtcbmNvbnN0IEVWRU5UX0hJRERFTiQ1ID0gYGhpZGRlbiR7RVZFTlRfS0VZJDZ9YDtcbmNvbnN0IEVWRU5UX1NIT1ckNSA9IGBzaG93JHtFVkVOVF9LRVkkNn1gO1xuY29uc3QgRVZFTlRfU0hPV04kNSA9IGBzaG93biR7RVZFTlRfS0VZJDZ9YDtcbmNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJJDMgPSBgY2xpY2ske0VWRU5UX0tFWSQ2fSR7REFUQV9BUElfS0VZJDN9YDtcbmNvbnN0IEVWRU5UX0tFWURPV05fREFUQV9BUEkgPSBga2V5ZG93biR7RVZFTlRfS0VZJDZ9JHtEQVRBX0FQSV9LRVkkM31gO1xuY29uc3QgRVZFTlRfS0VZVVBfREFUQV9BUEkgPSBga2V5dXAke0VWRU5UX0tFWSQ2fSR7REFUQV9BUElfS0VZJDN9YDtcbmNvbnN0IENMQVNTX05BTUVfU0hPVyQ2ID0gJ3Nob3cnO1xuY29uc3QgQ0xBU1NfTkFNRV9EUk9QVVAgPSAnZHJvcHVwJztcbmNvbnN0IENMQVNTX05BTUVfRFJPUEVORCA9ICdkcm9wZW5kJztcbmNvbnN0IENMQVNTX05BTUVfRFJPUFNUQVJUID0gJ2Ryb3BzdGFydCc7XG5jb25zdCBDTEFTU19OQU1FX0RST1BVUF9DRU5URVIgPSAnZHJvcHVwLWNlbnRlcic7XG5jb25zdCBDTEFTU19OQU1FX0RST1BET1dOX0NFTlRFUiA9ICdkcm9wZG93bi1jZW50ZXInO1xuY29uc3QgU0VMRUNUT1JfREFUQV9UT0dHTEUkMyA9ICdbZGF0YS1icy10b2dnbGU9XCJkcm9wZG93blwiXTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSc7XG5jb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRV9TSE9XTiA9IGAke1NFTEVDVE9SX0RBVEFfVE9HR0xFJDN9LiR7Q0xBU1NfTkFNRV9TSE9XJDZ9YDtcbmNvbnN0IFNFTEVDVE9SX01FTlUgPSAnLmRyb3Bkb3duLW1lbnUnO1xuY29uc3QgU0VMRUNUT1JfTkFWQkFSID0gJy5uYXZiYXInO1xuY29uc3QgU0VMRUNUT1JfTkFWQkFSX05BViA9ICcubmF2YmFyLW5hdic7XG5jb25zdCBTRUxFQ1RPUl9WSVNJQkxFX0lURU1TID0gJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJztcbmNvbnN0IFBMQUNFTUVOVF9UT1AgPSBpc1JUTCgpID8gJ3RvcC1lbmQnIDogJ3RvcC1zdGFydCc7XG5jb25zdCBQTEFDRU1FTlRfVE9QRU5EID0gaXNSVEwoKSA/ICd0b3Atc3RhcnQnIDogJ3RvcC1lbmQnO1xuY29uc3QgUExBQ0VNRU5UX0JPVFRPTSA9IGlzUlRMKCkgPyAnYm90dG9tLWVuZCcgOiAnYm90dG9tLXN0YXJ0JztcbmNvbnN0IFBMQUNFTUVOVF9CT1RUT01FTkQgPSBpc1JUTCgpID8gJ2JvdHRvbS1zdGFydCcgOiAnYm90dG9tLWVuZCc7XG5jb25zdCBQTEFDRU1FTlRfUklHSFQgPSBpc1JUTCgpID8gJ2xlZnQtc3RhcnQnIDogJ3JpZ2h0LXN0YXJ0JztcbmNvbnN0IFBMQUNFTUVOVF9MRUZUID0gaXNSVEwoKSA/ICdyaWdodC1zdGFydCcgOiAnbGVmdC1zdGFydCc7XG5jb25zdCBQTEFDRU1FTlRfVE9QQ0VOVEVSID0gJ3RvcCc7XG5jb25zdCBQTEFDRU1FTlRfQk9UVE9NQ0VOVEVSID0gJ2JvdHRvbSc7XG5jb25zdCBEZWZhdWx0JDkgPSB7XG4gIGF1dG9DbG9zZTogdHJ1ZSxcbiAgYm91bmRhcnk6ICdjbGlwcGluZ1BhcmVudHMnLFxuICBkaXNwbGF5OiAnZHluYW1pYycsXG4gIG9mZnNldDogWzAsIDJdLFxuICBwb3BwZXJDb25maWc6IG51bGwsXG4gIHJlZmVyZW5jZTogJ3RvZ2dsZSdcbn07XG5jb25zdCBEZWZhdWx0VHlwZSQ5ID0ge1xuICBhdXRvQ2xvc2U6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgYm91bmRhcnk6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgZGlzcGxheTogJ3N0cmluZycsXG4gIG9mZnNldDogJyhhcnJheXxzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgcG9wcGVyQ29uZmlnOiAnKG51bGx8b2JqZWN0fGZ1bmN0aW9uKScsXG4gIHJlZmVyZW5jZTogJyhzdHJpbmd8ZWxlbWVudHxvYmplY3QpJ1xufTtcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgRHJvcGRvd24gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKTtcbiAgICB0aGlzLl9wb3BwZXIgPSBudWxsO1xuICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZTsgLy8gZHJvcGRvd24gd3JhcHBlclxuICAgIC8vIFRPRE86IHY2IHJldmVydCAjMzcwMTEgJiBjaGFuZ2UgbWFya3VwIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzUuMy9mb3Jtcy9pbnB1dC1ncm91cC9cbiAgICB0aGlzLl9tZW51ID0gU2VsZWN0b3JFbmdpbmUubmV4dCh0aGlzLl9lbGVtZW50LCBTRUxFQ1RPUl9NRU5VKVswXSB8fCBTZWxlY3RvckVuZ2luZS5wcmV2KHRoaXMuX2VsZW1lbnQsIFNFTEVDVE9SX01FTlUpWzBdIHx8IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoU0VMRUNUT1JfTUVOVSwgdGhpcy5fcGFyZW50KTtcbiAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpO1xuICB9XG5cbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHQkOTtcbiAgfVxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZSQ5O1xuICB9XG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRSRhO1xuICB9XG5cbiAgLy8gUHVibGljXG4gIHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93bigpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgfVxuICBzaG93KCkge1xuICAgIGlmIChpc0Rpc2FibGVkKHRoaXMuX2VsZW1lbnQpIHx8IHRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudFxuICAgIH07XG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPVyQ1LCByZWxhdGVkVGFyZ2V0KTtcbiAgICBpZiAoc2hvd0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3JlYXRlUG9wcGVyKCk7XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgYWRkIGV4dHJhXG4gICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAvLyBvbmx5IG5lZWRlZCBiZWNhdXNlIG9mIGJyb2tlbiBldmVudCBkZWxlZ2F0aW9uIG9uIGlPU1xuICAgIC8vIGh0dHBzOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxNC8wMi9tb3VzZV9ldmVudF9idWIuaHRtbFxuICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgIXRoaXMuX3BhcmVudC5jbG9zZXN0KFNFTEVDVE9SX05BVkJBUl9OQVYpKSB7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgW10uY29uY2F0KC4uLmRvY3VtZW50LmJvZHkuY2hpbGRyZW4pKSB7XG4gICAgICAgIEV2ZW50SGFuZGxlci5vbihlbGVtZW50LCAnbW91c2VvdmVyJywgbm9vcCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgIHRoaXMuX21lbnUuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1ckNik7XG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQ2KTtcbiAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTiQ1LCByZWxhdGVkVGFyZ2V0KTtcbiAgfVxuICBoaWRlKCkge1xuICAgIGlmIChpc0Rpc2FibGVkKHRoaXMuX2VsZW1lbnQpIHx8ICF0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9O1xuICAgIHRoaXMuX2NvbXBsZXRlSGlkZShyZWxhdGVkVGFyZ2V0KTtcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5faW5OYXZiYXIgPSB0aGlzLl9kZXRlY3ROYXZiYXIoKTtcbiAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICB0aGlzLl9wb3BwZXIudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuICBfY29tcGxldGVIaWRlKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICBjb25zdCBoaWRlRXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFJDUsIHJlbGF0ZWRUYXJnZXQpO1xuICAgIGlmIChoaWRlRXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSByZW1vdmUgdGhlIGV4dHJhXG4gICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB3ZSBhZGRlZCBmb3IgaU9TIHN1cHBvcnRcbiAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgW10uY29uY2F0KC4uLmRvY3VtZW50LmJvZHkuY2hpbGRyZW4pKSB7XG4gICAgICAgIEV2ZW50SGFuZGxlci5vZmYoZWxlbWVudCwgJ21vdXNlb3ZlcicsIG5vb3ApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLl9tZW51LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDYpO1xuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1ckNik7XG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICBNYW5pcHVsYXRvci5yZW1vdmVEYXRhQXR0cmlidXRlKHRoaXMuX21lbnUsICdwb3BwZXInKTtcbiAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURERU4kNSwgcmVsYXRlZFRhcmdldCk7XG5cbiAgICAvLyBFeHBsaWNpdGx5IHJldHVybiBmb2N1cyB0byB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAgdGhpcy5fZWxlbWVudC5mb2N1cygpO1xuICB9XG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uZmlnID0gc3VwZXIuX2dldENvbmZpZyhjb25maWcpO1xuICAgIGlmICh0eXBlb2YgY29uZmlnLnJlZmVyZW5jZSA9PT0gJ29iamVjdCcgJiYgIWlzRWxlbWVudChjb25maWcucmVmZXJlbmNlKSAmJiB0eXBlb2YgY29uZmlnLnJlZmVyZW5jZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFBvcHBlciB2aXJ0dWFsIGVsZW1lbnRzIHJlcXVpcmUgYSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke05BTUUkYS50b1VwcGVyQ2FzZSgpfTogT3B0aW9uIFwicmVmZXJlbmNlXCIgcHJvdmlkZWQgdHlwZSBcIm9iamVjdFwiIHdpdGhvdXQgYSByZXF1aXJlZCBcImdldEJvdW5kaW5nQ2xpZW50UmVjdFwiIG1ldGhvZC5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuICBfY3JlYXRlUG9wcGVyKCkge1xuICAgIGlmICh0eXBlb2YgUG9wcGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyBkcm9wZG93bnMgcmVxdWlyZSBQb3BwZXIgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZy9kb2NzL3YyLyknKTtcbiAgICB9XG4gICAgbGV0IHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50O1xuICAgIGlmICh0aGlzLl9jb25maWcucmVmZXJlbmNlID09PSAncGFyZW50Jykge1xuICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX3BhcmVudDtcbiAgICB9IGVsc2UgaWYgKGlzRWxlbWVudCh0aGlzLl9jb25maWcucmVmZXJlbmNlKSkge1xuICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IGdldEVsZW1lbnQodGhpcy5fY29uZmlnLnJlZmVyZW5jZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLnJlZmVyZW5jZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9jb25maWcucmVmZXJlbmNlO1xuICAgIH1cbiAgICBjb25zdCBwb3BwZXJDb25maWcgPSB0aGlzLl9nZXRQb3BwZXJDb25maWcoKTtcbiAgICB0aGlzLl9wb3BwZXIgPSBQb3BwZXIuY3JlYXRlUG9wcGVyKHJlZmVyZW5jZUVsZW1lbnQsIHRoaXMuX21lbnUsIHBvcHBlckNvbmZpZyk7XG4gIH1cbiAgX2lzU2hvd24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfU0hPVyQ2KTtcbiAgfVxuICBfZ2V0UGxhY2VtZW50KCkge1xuICAgIGNvbnN0IHBhcmVudERyb3Bkb3duID0gdGhpcy5fcGFyZW50O1xuICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QRU5EKSkge1xuICAgICAgcmV0dXJuIFBMQUNFTUVOVF9SSUdIVDtcbiAgICB9XG4gICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BTVEFSVCkpIHtcbiAgICAgIHJldHVybiBQTEFDRU1FTlRfTEVGVDtcbiAgICB9XG4gICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BVUF9DRU5URVIpKSB7XG4gICAgICByZXR1cm4gUExBQ0VNRU5UX1RPUENFTlRFUjtcbiAgICB9XG4gICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BET1dOX0NFTlRFUikpIHtcbiAgICAgIHJldHVybiBQTEFDRU1FTlRfQk9UVE9NQ0VOVEVSO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gdHJpbSB0aGUgdmFsdWUgYmVjYXVzZSBjdXN0b20gcHJvcGVydGllcyBjYW4gYWxzbyBpbmNsdWRlIHNwYWNlc1xuICAgIGNvbnN0IGlzRW5kID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9tZW51KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJzLXBvc2l0aW9uJykudHJpbSgpID09PSAnZW5kJztcbiAgICBpZiAocGFyZW50RHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRFJPUFVQKSkge1xuICAgICAgcmV0dXJuIGlzRW5kID8gUExBQ0VNRU5UX1RPUEVORCA6IFBMQUNFTUVOVF9UT1A7XG4gICAgfVxuICAgIHJldHVybiBpc0VuZCA/IFBMQUNFTUVOVF9CT1RUT01FTkQgOiBQTEFDRU1FTlRfQk9UVE9NO1xuICB9XG4gIF9kZXRlY3ROYXZiYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQuY2xvc2VzdChTRUxFQ1RPUl9OQVZCQVIpICE9PSBudWxsO1xuICB9XG4gIF9nZXRPZmZzZXQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb2Zmc2V0XG4gICAgfSA9IHRoaXMuX2NvbmZpZztcbiAgICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBvZmZzZXQuc3BsaXQoJywnKS5tYXAodmFsdWUgPT4gTnVtYmVyLnBhcnNlSW50KHZhbHVlLCAxMCkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHBvcHBlckRhdGEgPT4gb2Zmc2V0KHBvcHBlckRhdGEsIHRoaXMuX2VsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG4gIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgY29uc3QgZGVmYXVsdEJzUG9wcGVyQ29uZmlnID0ge1xuICAgICAgcGxhY2VtZW50OiB0aGlzLl9nZXRQbGFjZW1lbnQoKSxcbiAgICAgIG1vZGlmaWVyczogW3tcbiAgICAgICAgbmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBib3VuZGFyeTogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBvZmZzZXQ6IHRoaXMuX2dldE9mZnNldCgpXG4gICAgICAgIH1cbiAgICAgIH1dXG4gICAgfTtcblxuICAgIC8vIERpc2FibGUgUG9wcGVyIGlmIHdlIGhhdmUgYSBzdGF0aWMgZGlzcGxheSBvciBEcm9wZG93biBpcyBpbiBOYXZiYXJcbiAgICBpZiAodGhpcy5faW5OYXZiYXIgfHwgdGhpcy5fY29uZmlnLmRpc3BsYXkgPT09ICdzdGF0aWMnKSB7XG4gICAgICBNYW5pcHVsYXRvci5zZXREYXRhQXR0cmlidXRlKHRoaXMuX21lbnUsICdwb3BwZXInLCAnc3RhdGljJyk7IC8vIFRPRE86IHY2IHJlbW92ZVxuICAgICAgZGVmYXVsdEJzUG9wcGVyQ29uZmlnLm1vZGlmaWVycyA9IFt7XG4gICAgICAgIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICB9XTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRlZmF1bHRCc1BvcHBlckNvbmZpZyxcbiAgICAgIC4uLmV4ZWN1dGUodGhpcy5fY29uZmlnLnBvcHBlckNvbmZpZywgW3VuZGVmaW5lZCwgZGVmYXVsdEJzUG9wcGVyQ29uZmlnXSlcbiAgICB9O1xuICB9XG4gIF9zZWxlY3RNZW51SXRlbSh7XG4gICAga2V5LFxuICAgIHRhcmdldFxuICB9KSB7XG4gICAgY29uc3QgaXRlbXMgPSBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX1ZJU0lCTEVfSVRFTVMsIHRoaXMuX21lbnUpLmZpbHRlcihlbGVtZW50ID0+IGlzVmlzaWJsZShlbGVtZW50KSk7XG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiB0YXJnZXQgaXNuJ3QgaW5jbHVkZWQgaW4gaXRlbXMgKGUuZy4gd2hlbiBleHBhbmRpbmcgdGhlIGRyb3Bkb3duKVxuICAgIC8vIGFsbG93IGN5Y2xpbmcgdG8gZ2V0IHRoZSBsYXN0IGl0ZW0gaW4gY2FzZSBrZXkgZXF1YWxzIEFSUk9XX1VQX0tFWVxuICAgIGdldE5leHRBY3RpdmVFbGVtZW50KGl0ZW1zLCB0YXJnZXQsIGtleSA9PT0gQVJST1dfRE9XTl9LRVkkMSwgIWl0ZW1zLmluY2x1ZGVzKHRhcmdldCkpLmZvY3VzKCk7XG4gIH1cblxuICAvLyBTdGF0aWNcbiAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICB9XG4gICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgY2xlYXJNZW51cyhldmVudCkge1xuICAgIGlmIChldmVudC5idXR0b24gPT09IFJJR0hUX01PVVNFX0JVVFRPTiB8fCBldmVudC50eXBlID09PSAna2V5dXAnICYmIGV2ZW50LmtleSAhPT0gVEFCX0tFWSQxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wZW5Ub2dnbGVzID0gU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9EQVRBX1RPR0dMRV9TSE9XTik7XG4gICAgZm9yIChjb25zdCB0b2dnbGUgb2Ygb3BlblRvZ2dsZXMpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBEcm9wZG93bi5nZXRJbnN0YW5jZSh0b2dnbGUpO1xuICAgICAgaWYgKCFjb250ZXh0IHx8IGNvbnRleHQuX2NvbmZpZy5hdXRvQ2xvc2UgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgY29tcG9zZWRQYXRoID0gZXZlbnQuY29tcG9zZWRQYXRoKCk7XG4gICAgICBjb25zdCBpc01lbnVUYXJnZXQgPSBjb21wb3NlZFBhdGguaW5jbHVkZXMoY29udGV4dC5fbWVudSk7XG4gICAgICBpZiAoY29tcG9zZWRQYXRoLmluY2x1ZGVzKGNvbnRleHQuX2VsZW1lbnQpIHx8IGNvbnRleHQuX2NvbmZpZy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnICYmICFpc01lbnVUYXJnZXQgfHwgY29udGV4dC5fY29uZmlnLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnICYmIGlzTWVudVRhcmdldCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVGFiIG5hdmlnYXRpb24gdGhyb3VnaCB0aGUgZHJvcGRvd24gbWVudSBvciBldmVudHMgZnJvbSBjb250YWluZWQgaW5wdXRzIHNob3VsZG4ndCBjbG9zZSB0aGUgbWVudVxuICAgICAgaWYgKGNvbnRleHQuX21lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJiAoZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC5rZXkgPT09IFRBQl9LRVkkMSB8fCAvaW5wdXR8c2VsZWN0fG9wdGlvbnx0ZXh0YXJlYXxmb3JtL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogY29udGV4dC5fZWxlbWVudFxuICAgICAgfTtcbiAgICAgIGlmIChldmVudC50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQuY2xpY2tFdmVudCA9IGV2ZW50O1xuICAgICAgfVxuICAgICAgY29udGV4dC5fY29tcGxldGVIaWRlKHJlbGF0ZWRUYXJnZXQpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZGF0YUFwaUtleWRvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgLy8gSWYgbm90IGFuIFVQIHwgRE9XTiB8IEVTQ0FQRSBrZXkgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgIC8vIElmIGlucHV0L3RleHRhcmVhICYmIGlmIGtleSBpcyBvdGhlciB0aGFuIEVTQ0FQRSA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG5cbiAgICBjb25zdCBpc0lucHV0ID0gL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSk7XG4gICAgY29uc3QgaXNFc2NhcGVFdmVudCA9IGV2ZW50LmtleSA9PT0gRVNDQVBFX0tFWSQyO1xuICAgIGNvbnN0IGlzVXBPckRvd25FdmVudCA9IFtBUlJPV19VUF9LRVkkMSwgQVJST1dfRE9XTl9LRVkkMV0uaW5jbHVkZXMoZXZlbnQua2V5KTtcbiAgICBpZiAoIWlzVXBPckRvd25FdmVudCAmJiAhaXNFc2NhcGVFdmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNJbnB1dCAmJiAhaXNFc2NhcGVFdmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gVE9ETzogdjYgcmV2ZXJ0ICMzNzAxMSAmIGNoYW5nZSBtYXJrdXAgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4zL2Zvcm1zL2lucHV0LWdyb3VwL1xuICAgIGNvbnN0IGdldFRvZ2dsZUJ1dHRvbiA9IHRoaXMubWF0Y2hlcyhTRUxFQ1RPUl9EQVRBX1RPR0dMRSQzKSA/IHRoaXMgOiBTZWxlY3RvckVuZ2luZS5wcmV2KHRoaXMsIFNFTEVDVE9SX0RBVEFfVE9HR0xFJDMpWzBdIHx8IFNlbGVjdG9yRW5naW5lLm5leHQodGhpcywgU0VMRUNUT1JfREFUQV9UT0dHTEUkMylbMF0gfHwgU2VsZWN0b3JFbmdpbmUuZmluZE9uZShTRUxFQ1RPUl9EQVRBX1RPR0dMRSQzLCBldmVudC5kZWxlZ2F0ZVRhcmdldC5wYXJlbnROb2RlKTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IERyb3Bkb3duLmdldE9yQ3JlYXRlSW5zdGFuY2UoZ2V0VG9nZ2xlQnV0dG9uKTtcbiAgICBpZiAoaXNVcE9yRG93bkV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGluc3RhbmNlLnNob3coKTtcbiAgICAgIGluc3RhbmNlLl9zZWxlY3RNZW51SXRlbShldmVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZS5faXNTaG93bigpKSB7XG4gICAgICAvLyBlbHNlIGlzIGVzY2FwZSBhbmQgd2UgY2hlY2sgaWYgaXQgaXMgc2hvd25cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaW5zdGFuY2UuaGlkZSgpO1xuICAgICAgZ2V0VG9nZ2xlQnV0dG9uLmZvY3VzKCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAqL1xuXG5FdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0tFWURPV05fREFUQV9BUEksIFNFTEVDVE9SX0RBVEFfVE9HR0xFJDMsIERyb3Bkb3duLmRhdGFBcGlLZXlkb3duSGFuZGxlcik7XG5FdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0tFWURPV05fREFUQV9BUEksIFNFTEVDVE9SX01FTlUsIERyb3Bkb3duLmRhdGFBcGlLZXlkb3duSGFuZGxlcik7XG5FdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJJDMsIERyb3Bkb3duLmNsZWFyTWVudXMpO1xuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9LRVlVUF9EQVRBX0FQSSwgRHJvcGRvd24uY2xlYXJNZW51cyk7XG5FdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJJDMsIFNFTEVDVE9SX0RBVEFfVE9HR0xFJDMsIGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMpLnRvZ2dsZSgpO1xufSk7XG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKERyb3Bkb3duKTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHV0aWwvYmFja2Ryb3AuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSQ5ID0gJ2JhY2tkcm9wJztcbmNvbnN0IENMQVNTX05BTUVfRkFERSQ0ID0gJ2ZhZGUnO1xuY29uc3QgQ0xBU1NfTkFNRV9TSE9XJDUgPSAnc2hvdyc7XG5jb25zdCBFVkVOVF9NT1VTRURPV04gPSBgbW91c2Vkb3duLmJzLiR7TkFNRSQ5fWA7XG5jb25zdCBEZWZhdWx0JDggPSB7XG4gIGNsYXNzTmFtZTogJ21vZGFsLWJhY2tkcm9wJyxcbiAgY2xpY2tDYWxsYmFjazogbnVsbCxcbiAgaXNBbmltYXRlZDogZmFsc2UsXG4gIGlzVmlzaWJsZTogdHJ1ZSxcbiAgLy8gaWYgZmFsc2UsIHdlIHVzZSB0aGUgYmFja2Ryb3AgaGVscGVyIHdpdGhvdXQgYWRkaW5nIGFueSBlbGVtZW50IHRvIHRoZSBkb21cbiAgcm9vdEVsZW1lbnQ6ICdib2R5JyAvLyBnaXZlIHRoZSBjaG9pY2UgdG8gcGxhY2UgYmFja2Ryb3AgdW5kZXIgZGlmZmVyZW50IGVsZW1lbnRzXG59O1xuY29uc3QgRGVmYXVsdFR5cGUkOCA9IHtcbiAgY2xhc3NOYW1lOiAnc3RyaW5nJyxcbiAgY2xpY2tDYWxsYmFjazogJyhmdW5jdGlvbnxudWxsKScsXG4gIGlzQW5pbWF0ZWQ6ICdib29sZWFuJyxcbiAgaXNWaXNpYmxlOiAnYm9vbGVhbicsXG4gIHJvb3RFbGVtZW50OiAnKGVsZW1lbnR8c3RyaW5nKSdcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIEJhY2tkcm9wIGV4dGVuZHMgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICB0aGlzLl9pc0FwcGVuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdCQ4O1xuICB9XG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlJDg7XG4gIH1cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FJDk7XG4gIH1cblxuICAvLyBQdWJsaWNcbiAgc2hvdyhjYWxsYmFjaykge1xuICAgIGlmICghdGhpcy5fY29uZmlnLmlzVmlzaWJsZSkge1xuICAgICAgZXhlY3V0ZShjYWxsYmFjayk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2FwcGVuZCgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9nZXRFbGVtZW50KCk7XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5pc0FuaW1hdGVkKSB7XG4gICAgICByZWZsb3coZWxlbWVudCk7XG4gICAgfVxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1ckNSk7XG4gICAgdGhpcy5fZW11bGF0ZUFuaW1hdGlvbigoKSA9PiB7XG4gICAgICBleGVjdXRlKGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfVxuICBoaWRlKGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0aGlzLl9jb25maWcuaXNWaXNpYmxlKSB7XG4gICAgICBleGVjdXRlKGNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZ2V0RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDUpO1xuICAgIHRoaXMuX2VtdWxhdGVBbmltYXRpb24oKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICBleGVjdXRlKGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIGlmICghdGhpcy5faXNBcHBlbmRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBFdmVudEhhbmRsZXIub2ZmKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFRE9XTik7XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9pc0FwcGVuZGVkID0gZmFsc2U7XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9nZXRFbGVtZW50KCkge1xuICAgIGlmICghdGhpcy5fZWxlbWVudCkge1xuICAgICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJhY2tkcm9wLmNsYXNzTmFtZSA9IHRoaXMuX2NvbmZpZy5jbGFzc05hbWU7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0ZBREUkNCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9lbGVtZW50ID0gYmFja2Ryb3A7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIC8vIHVzZSBnZXRFbGVtZW50KCkgd2l0aCB0aGUgZGVmYXVsdCBcImJvZHlcIiB0byBnZXQgYSBmcmVzaCBFbGVtZW50IG9uIGVhY2ggaW5zdGFudGlhdGlvblxuICAgIGNvbmZpZy5yb290RWxlbWVudCA9IGdldEVsZW1lbnQoY29uZmlnLnJvb3RFbGVtZW50KTtcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG4gIF9hcHBlbmQoKSB7XG4gICAgaWYgKHRoaXMuX2lzQXBwZW5kZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnQoKTtcbiAgICB0aGlzLl9jb25maWcucm9vdEVsZW1lbnQuYXBwZW5kKGVsZW1lbnQpO1xuICAgIEV2ZW50SGFuZGxlci5vbihlbGVtZW50LCBFVkVOVF9NT1VTRURPV04sICgpID0+IHtcbiAgICAgIGV4ZWN1dGUodGhpcy5fY29uZmlnLmNsaWNrQ2FsbGJhY2spO1xuICAgIH0pO1xuICAgIHRoaXMuX2lzQXBwZW5kZWQgPSB0cnVlO1xuICB9XG4gIF9lbXVsYXRlQW5pbWF0aW9uKGNhbGxiYWNrKSB7XG4gICAgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbihjYWxsYmFjaywgdGhpcy5fZ2V0RWxlbWVudCgpLCB0aGlzLl9jb25maWcuaXNBbmltYXRlZCk7XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHV0aWwvZm9jdXN0cmFwLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkOCA9ICdmb2N1c3RyYXAnO1xuY29uc3QgREFUQV9LRVkkNSA9ICdicy5mb2N1c3RyYXAnO1xuY29uc3QgRVZFTlRfS0VZJDUgPSBgLiR7REFUQV9LRVkkNX1gO1xuY29uc3QgRVZFTlRfRk9DVVNJTiQyID0gYGZvY3VzaW4ke0VWRU5UX0tFWSQ1fWA7XG5jb25zdCBFVkVOVF9LRVlET1dOX1RBQiA9IGBrZXlkb3duLnRhYiR7RVZFTlRfS0VZJDV9YDtcbmNvbnN0IFRBQl9LRVkgPSAnVGFiJztcbmNvbnN0IFRBQl9OQVZfRk9SV0FSRCA9ICdmb3J3YXJkJztcbmNvbnN0IFRBQl9OQVZfQkFDS1dBUkQgPSAnYmFja3dhcmQnO1xuY29uc3QgRGVmYXVsdCQ3ID0ge1xuICBhdXRvZm9jdXM6IHRydWUsXG4gIHRyYXBFbGVtZW50OiBudWxsIC8vIFRoZSBlbGVtZW50IHRvIHRyYXAgZm9jdXMgaW5zaWRlIG9mXG59O1xuY29uc3QgRGVmYXVsdFR5cGUkNyA9IHtcbiAgYXV0b2ZvY3VzOiAnYm9vbGVhbicsXG4gIHRyYXBFbGVtZW50OiAnZWxlbWVudCdcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIEZvY3VzVHJhcCBleHRlbmRzIENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLl9sYXN0VGFiTmF2RGlyZWN0aW9uID0gbnVsbDtcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0JDc7XG4gIH1cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGUkNztcbiAgfVxuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIE5BTUUkODtcbiAgfVxuXG4gIC8vIFB1YmxpY1xuICBhY3RpdmF0ZSgpIHtcbiAgICBpZiAodGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hdXRvZm9jdXMpIHtcbiAgICAgIHRoaXMuX2NvbmZpZy50cmFwRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBFdmVudEhhbmRsZXIub2ZmKGRvY3VtZW50LCBFVkVOVF9LRVkkNSk7IC8vIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgZm9jdXMgbG9vcFxuICAgIEV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfRk9DVVNJTiQyLCBldmVudCA9PiB0aGlzLl9oYW5kbGVGb2N1c2luKGV2ZW50KSk7XG4gICAgRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9LRVlET1dOX1RBQiwgZXZlbnQgPT4gdGhpcy5faGFuZGxlS2V5ZG93bihldmVudCkpO1xuICAgIHRoaXMuX2lzQWN0aXZlID0gdHJ1ZTtcbiAgfVxuICBkZWFjdGl2YXRlKCkge1xuICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcbiAgICBFdmVudEhhbmRsZXIub2ZmKGRvY3VtZW50LCBFVkVOVF9LRVkkNSk7XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9oYW5kbGVGb2N1c2luKGV2ZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhcEVsZW1lbnRcbiAgICB9ID0gdGhpcy5fY29uZmlnO1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IGRvY3VtZW50IHx8IGV2ZW50LnRhcmdldCA9PT0gdHJhcEVsZW1lbnQgfHwgdHJhcEVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50cyA9IFNlbGVjdG9yRW5naW5lLmZvY3VzYWJsZUNoaWxkcmVuKHRyYXBFbGVtZW50KTtcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0cmFwRWxlbWVudC5mb2N1cygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fbGFzdFRhYk5hdkRpcmVjdGlvbiA9PT0gVEFCX05BVl9CQUNLV0FSRCkge1xuICAgICAgZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICB9XG4gIH1cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ICE9PSBUQUJfS0VZKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2xhc3RUYWJOYXZEaXJlY3Rpb24gPSBldmVudC5zaGlmdEtleSA/IFRBQl9OQVZfQkFDS1dBUkQgOiBUQUJfTkFWX0ZPUldBUkQ7XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHV0aWwvc2Nyb2xsQmFyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IFNFTEVDVE9SX0ZJWEVEX0NPTlRFTlQgPSAnLmZpeGVkLXRvcCwgLmZpeGVkLWJvdHRvbSwgLmlzLWZpeGVkLCAuc3RpY2t5LXRvcCc7XG5jb25zdCBTRUxFQ1RPUl9TVElDS1lfQ09OVEVOVCA9ICcuc3RpY2t5LXRvcCc7XG5jb25zdCBQUk9QRVJUWV9QQURESU5HID0gJ3BhZGRpbmctcmlnaHQnO1xuY29uc3QgUFJPUEVSVFlfTUFSR0lOID0gJ21hcmdpbi1yaWdodCc7XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFNjcm9sbEJhckhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgLy8gUHVibGljXG4gIGdldFdpZHRoKCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cvaW5uZXJXaWR0aCN1c2FnZV9ub3Rlc1xuICAgIGNvbnN0IGRvY3VtZW50V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgcmV0dXJuIE1hdGguYWJzKHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnRXaWR0aCk7XG4gIH1cbiAgaGlkZSgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKTtcbiAgICB0aGlzLl9kaXNhYmxlT3ZlckZsb3coKTtcbiAgICAvLyBnaXZlIHBhZGRpbmcgdG8gZWxlbWVudCB0byBiYWxhbmNlIHRoZSBoaWRkZW4gc2Nyb2xsYmFyIHdpZHRoXG4gICAgdGhpcy5fc2V0RWxlbWVudEF0dHJpYnV0ZXModGhpcy5fZWxlbWVudCwgUFJPUEVSVFlfUEFERElORywgY2FsY3VsYXRlZFZhbHVlID0+IGNhbGN1bGF0ZWRWYWx1ZSArIHdpZHRoKTtcbiAgICAvLyB0cmljazogV2UgYWRqdXN0IHBvc2l0aXZlIHBhZGRpbmdSaWdodCBhbmQgbmVnYXRpdmUgbWFyZ2luUmlnaHQgdG8gc3RpY2t5LXRvcCBlbGVtZW50cyB0byBrZWVwIHNob3dpbmcgZnVsbHdpZHRoXG4gICAgdGhpcy5fc2V0RWxlbWVudEF0dHJpYnV0ZXMoU0VMRUNUT1JfRklYRURfQ09OVEVOVCwgUFJPUEVSVFlfUEFERElORywgY2FsY3VsYXRlZFZhbHVlID0+IGNhbGN1bGF0ZWRWYWx1ZSArIHdpZHRoKTtcbiAgICB0aGlzLl9zZXRFbGVtZW50QXR0cmlidXRlcyhTRUxFQ1RPUl9TVElDS1lfQ09OVEVOVCwgUFJPUEVSVFlfTUFSR0lOLCBjYWxjdWxhdGVkVmFsdWUgPT4gY2FsY3VsYXRlZFZhbHVlIC0gd2lkdGgpO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX3Jlc2V0RWxlbWVudEF0dHJpYnV0ZXModGhpcy5fZWxlbWVudCwgJ292ZXJmbG93Jyk7XG4gICAgdGhpcy5fcmVzZXRFbGVtZW50QXR0cmlidXRlcyh0aGlzLl9lbGVtZW50LCBQUk9QRVJUWV9QQURESU5HKTtcbiAgICB0aGlzLl9yZXNldEVsZW1lbnRBdHRyaWJ1dGVzKFNFTEVDVE9SX0ZJWEVEX0NPTlRFTlQsIFBST1BFUlRZX1BBRERJTkcpO1xuICAgIHRoaXMuX3Jlc2V0RWxlbWVudEF0dHJpYnV0ZXMoU0VMRUNUT1JfU1RJQ0tZX0NPTlRFTlQsIFBST1BFUlRZX01BUkdJTik7XG4gIH1cbiAgaXNPdmVyZmxvd2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRXaWR0aCgpID4gMDtcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2Rpc2FibGVPdmVyRmxvdygpIHtcbiAgICB0aGlzLl9zYXZlSW5pdGlhbEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50LCAnb3ZlcmZsb3cnKTtcbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIH1cbiAgX3NldEVsZW1lbnRBdHRyaWJ1dGVzKHNlbGVjdG9yLCBzdHlsZVByb3BlcnR5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gdGhpcy5nZXRXaWR0aCgpO1xuICAgIGNvbnN0IG1hbmlwdWxhdGlvbkNhbGxCYWNrID0gZWxlbWVudCA9PiB7XG4gICAgICBpZiAoZWxlbWVudCAhPT0gdGhpcy5fZWxlbWVudCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IGVsZW1lbnQuY2xpZW50V2lkdGggKyBzY3JvbGxiYXJXaWR0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9zYXZlSW5pdGlhbEF0dHJpYnV0ZShlbGVtZW50LCBzdHlsZVByb3BlcnR5KTtcbiAgICAgIGNvbnN0IGNhbGN1bGF0ZWRWYWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wZXJ0eSk7XG4gICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHN0eWxlUHJvcGVydHksIGAke2NhbGxiYWNrKE51bWJlci5wYXJzZUZsb2F0KGNhbGN1bGF0ZWRWYWx1ZSkpfXB4YCk7XG4gICAgfTtcbiAgICB0aGlzLl9hcHBseU1hbmlwdWxhdGlvbkNhbGxiYWNrKHNlbGVjdG9yLCBtYW5pcHVsYXRpb25DYWxsQmFjayk7XG4gIH1cbiAgX3NhdmVJbml0aWFsQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlUHJvcGVydHkpIHtcbiAgICBjb25zdCBhY3R1YWxWYWx1ZSA9IGVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3BlcnR5KTtcbiAgICBpZiAoYWN0dWFsVmFsdWUpIHtcbiAgICAgIE1hbmlwdWxhdG9yLnNldERhdGFBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVQcm9wZXJ0eSwgYWN0dWFsVmFsdWUpO1xuICAgIH1cbiAgfVxuICBfcmVzZXRFbGVtZW50QXR0cmlidXRlcyhzZWxlY3Rvciwgc3R5bGVQcm9wZXJ0eSkge1xuICAgIGNvbnN0IG1hbmlwdWxhdGlvbkNhbGxCYWNrID0gZWxlbWVudCA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IE1hbmlwdWxhdG9yLmdldERhdGFBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVQcm9wZXJ0eSk7XG4gICAgICAvLyBXZSBvbmx5IHdhbnQgdG8gcmVtb3ZlIHRoZSBwcm9wZXJ0eSBpZiB0aGUgdmFsdWUgaXMgYG51bGxgOyB0aGUgdmFsdWUgY2FuIGFsc28gYmUgemVyb1xuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGVQcm9wZXJ0eSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIE1hbmlwdWxhdG9yLnJlbW92ZURhdGFBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVQcm9wZXJ0eSk7XG4gICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHN0eWxlUHJvcGVydHksIHZhbHVlKTtcbiAgICB9O1xuICAgIHRoaXMuX2FwcGx5TWFuaXB1bGF0aW9uQ2FsbGJhY2soc2VsZWN0b3IsIG1hbmlwdWxhdGlvbkNhbGxCYWNrKTtcbiAgfVxuICBfYXBwbHlNYW5pcHVsYXRpb25DYWxsYmFjayhzZWxlY3RvciwgY2FsbEJhY2spIHtcbiAgICBpZiAoaXNFbGVtZW50KHNlbGVjdG9yKSkge1xuICAgICAgY2FsbEJhY2soc2VsZWN0b3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHNlbCBvZiBTZWxlY3RvckVuZ2luZS5maW5kKHNlbGVjdG9yLCB0aGlzLl9lbGVtZW50KSkge1xuICAgICAgY2FsbEJhY2soc2VsKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIG1vZGFsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkNyA9ICdtb2RhbCc7XG5jb25zdCBEQVRBX0tFWSQ0ID0gJ2JzLm1vZGFsJztcbmNvbnN0IEVWRU5UX0tFWSQ0ID0gYC4ke0RBVEFfS0VZJDR9YDtcbmNvbnN0IERBVEFfQVBJX0tFWSQyID0gJy5kYXRhLWFwaSc7XG5jb25zdCBFU0NBUEVfS0VZJDEgPSAnRXNjYXBlJztcbmNvbnN0IEVWRU5UX0hJREUkNCA9IGBoaWRlJHtFVkVOVF9LRVkkNH1gO1xuY29uc3QgRVZFTlRfSElERV9QUkVWRU5URUQkMSA9IGBoaWRlUHJldmVudGVkJHtFVkVOVF9LRVkkNH1gO1xuY29uc3QgRVZFTlRfSElEREVOJDQgPSBgaGlkZGVuJHtFVkVOVF9LRVkkNH1gO1xuY29uc3QgRVZFTlRfU0hPVyQ0ID0gYHNob3cke0VWRU5UX0tFWSQ0fWA7XG5jb25zdCBFVkVOVF9TSE9XTiQ0ID0gYHNob3duJHtFVkVOVF9LRVkkNH1gO1xuY29uc3QgRVZFTlRfUkVTSVpFJDEgPSBgcmVzaXplJHtFVkVOVF9LRVkkNH1gO1xuY29uc3QgRVZFTlRfQ0xJQ0tfRElTTUlTUyA9IGBjbGljay5kaXNtaXNzJHtFVkVOVF9LRVkkNH1gO1xuY29uc3QgRVZFTlRfTU9VU0VET1dOX0RJU01JU1MgPSBgbW91c2Vkb3duLmRpc21pc3Mke0VWRU5UX0tFWSQ0fWA7XG5jb25zdCBFVkVOVF9LRVlET1dOX0RJU01JU1MkMSA9IGBrZXlkb3duLmRpc21pc3Mke0VWRU5UX0tFWSQ0fWA7XG5jb25zdCBFVkVOVF9DTElDS19EQVRBX0FQSSQyID0gYGNsaWNrJHtFVkVOVF9LRVkkNH0ke0RBVEFfQVBJX0tFWSQyfWA7XG5jb25zdCBDTEFTU19OQU1FX09QRU4gPSAnbW9kYWwtb3Blbic7XG5jb25zdCBDTEFTU19OQU1FX0ZBREUkMyA9ICdmYWRlJztcbmNvbnN0IENMQVNTX05BTUVfU0hPVyQ0ID0gJ3Nob3cnO1xuY29uc3QgQ0xBU1NfTkFNRV9TVEFUSUMgPSAnbW9kYWwtc3RhdGljJztcbmNvbnN0IE9QRU5fU0VMRUNUT1IkMSA9ICcubW9kYWwuc2hvdyc7XG5jb25zdCBTRUxFQ1RPUl9ESUFMT0cgPSAnLm1vZGFsLWRpYWxvZyc7XG5jb25zdCBTRUxFQ1RPUl9NT0RBTF9CT0RZID0gJy5tb2RhbC1ib2R5JztcbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFJDIgPSAnW2RhdGEtYnMtdG9nZ2xlPVwibW9kYWxcIl0nO1xuY29uc3QgRGVmYXVsdCQ2ID0ge1xuICBiYWNrZHJvcDogdHJ1ZSxcbiAgZm9jdXM6IHRydWUsXG4gIGtleWJvYXJkOiB0cnVlXG59O1xuY29uc3QgRGVmYXVsdFR5cGUkNiA9IHtcbiAgYmFja2Ryb3A6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgZm9jdXM6ICdib29sZWFuJyxcbiAga2V5Ym9hcmQ6ICdib29sZWFuJ1xufTtcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgTW9kYWwgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKTtcbiAgICB0aGlzLl9kaWFsb2cgPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0RJQUxPRywgdGhpcy5fZWxlbWVudCk7XG4gICAgdGhpcy5fYmFja2Ryb3AgPSB0aGlzLl9pbml0aWFsaXplQmFja0Ryb3AoKTtcbiAgICB0aGlzLl9mb2N1c3RyYXAgPSB0aGlzLl9pbml0aWFsaXplRm9jdXNUcmFwKCk7XG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3Njcm9sbEJhciA9IG5ldyBTY3JvbGxCYXJIZWxwZXIoKTtcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHQkNjtcbiAgfVxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZSQ2O1xuICB9XG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRSQ3O1xuICB9XG5cbiAgLy8gUHVibGljXG4gIHRvZ2dsZShyZWxhdGVkVGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhyZWxhdGVkVGFyZ2V0KTtcbiAgfVxuICBzaG93KHJlbGF0ZWRUYXJnZXQpIHtcbiAgICBpZiAodGhpcy5faXNTaG93biB8fCB0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPVyQ0LCB7XG4gICAgICByZWxhdGVkVGFyZ2V0XG4gICAgfSk7XG4gICAgaWYgKHNob3dFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlO1xuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgdGhpcy5fc2Nyb2xsQmFyLmhpZGUoKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9PUEVOKTtcbiAgICB0aGlzLl9hZGp1c3REaWFsb2coKTtcbiAgICB0aGlzLl9iYWNrZHJvcC5zaG93KCgpID0+IHRoaXMuX3Nob3dFbGVtZW50KHJlbGF0ZWRUYXJnZXQpKTtcbiAgfVxuICBoaWRlKCkge1xuICAgIGlmICghdGhpcy5faXNTaG93biB8fCB0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGlkZUV2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERSQ0KTtcbiAgICBpZiAoaGlkZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgdGhpcy5fZm9jdXN0cmFwLmRlYWN0aXZhdGUoKTtcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDQpO1xuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soKCkgPT4gdGhpcy5faGlkZU1vZGFsKCksIHRoaXMuX2VsZW1lbnQsIHRoaXMuX2lzQW5pbWF0ZWQoKSk7XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICBFdmVudEhhbmRsZXIub2ZmKHdpbmRvdywgRVZFTlRfS0VZJDQpO1xuICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fZGlhbG9nLCBFVkVOVF9LRVkkNCk7XG4gICAgdGhpcy5fYmFja2Ryb3AuZGlzcG9zZSgpO1xuICAgIHRoaXMuX2ZvY3VzdHJhcC5kZWFjdGl2YXRlKCk7XG4gICAgc3VwZXIuZGlzcG9zZSgpO1xuICB9XG4gIGhhbmRsZVVwZGF0ZSgpIHtcbiAgICB0aGlzLl9hZGp1c3REaWFsb2coKTtcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2luaXRpYWxpemVCYWNrRHJvcCgpIHtcbiAgICByZXR1cm4gbmV3IEJhY2tkcm9wKHtcbiAgICAgIGlzVmlzaWJsZTogQm9vbGVhbih0aGlzLl9jb25maWcuYmFja2Ryb3ApLFxuICAgICAgLy8gJ3N0YXRpYycgb3B0aW9uIHdpbGwgYmUgdHJhbnNsYXRlZCB0byB0cnVlLCBhbmQgYm9vbGVhbnMgd2lsbCBrZWVwIHRoZWlyIHZhbHVlLFxuICAgICAgaXNBbmltYXRlZDogdGhpcy5faXNBbmltYXRlZCgpXG4gICAgfSk7XG4gIH1cbiAgX2luaXRpYWxpemVGb2N1c1RyYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBGb2N1c1RyYXAoe1xuICAgICAgdHJhcEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9KTtcbiAgfVxuICBfc2hvd0VsZW1lbnQocmVsYXRlZFRhcmdldCkge1xuICAgIC8vIHRyeSB0byBhcHBlbmQgZHluYW1pYyBtb2RhbFxuICAgIGlmICghZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5fZWxlbWVudCk7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCB0cnVlKTtcbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICB0aGlzLl9lbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgY29uc3QgbW9kYWxCb2R5ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShTRUxFQ1RPUl9NT0RBTF9CT0RZLCB0aGlzLl9kaWFsb2cpO1xuICAgIGlmIChtb2RhbEJvZHkpIHtcbiAgICAgIG1vZGFsQm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgICByZWZsb3codGhpcy5fZWxlbWVudCk7XG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQ0KTtcbiAgICBjb25zdCB0cmFuc2l0aW9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzdHJhcC5hY3RpdmF0ZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTiQ0LCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXRcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayh0cmFuc2l0aW9uQ29tcGxldGUsIHRoaXMuX2RpYWxvZywgdGhpcy5faXNBbmltYXRlZCgpKTtcbiAgfVxuICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0tFWURPV05fRElTTUlTUyQxLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBFU0NBUEVfS0VZJDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fdHJpZ2dlckJhY2tkcm9wVHJhbnNpdGlvbigpO1xuICAgIH0pO1xuICAgIEV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX1JFU0laRSQxLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNTaG93biAmJiAhdGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRoaXMuX2FkanVzdERpYWxvZygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9NT1VTRURPV05fRElTTUlTUywgZXZlbnQgPT4ge1xuICAgICAgLy8gYSBiYWQgdHJpY2sgdG8gc2VncmVnYXRlIGNsaWNrcyB0aGF0IG1heSBzdGFydCBpbnNpZGUgZGlhbG9nIGJ1dCBlbmQgb3V0c2lkZSwgYW5kIGF2b2lkIGxpc3RlbiB0byBzY3JvbGxiYXIgY2xpY2tzXG4gICAgICBFdmVudEhhbmRsZXIub25lKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0NMSUNLX0RJU01JU1MsIGV2ZW50MiA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50ICE9PSBldmVudC50YXJnZXQgfHwgdGhpcy5fZWxlbWVudCAhPT0gZXZlbnQyLnRhcmdldCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmJhY2tkcm9wID09PSAnc3RhdGljJykge1xuICAgICAgICAgIHRoaXMuX3RyaWdnZXJCYWNrZHJvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCkge1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcpO1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdyb2xlJyk7XG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fYmFja2Ryb3AuaGlkZSgoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9PUEVOKTtcbiAgICAgIHRoaXMuX3Jlc2V0QWRqdXN0bWVudHMoKTtcbiAgICAgIHRoaXMuX3Njcm9sbEJhci5yZXNldCgpO1xuICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElEREVOJDQpO1xuICAgIH0pO1xuICB9XG4gIF9pc0FuaW1hdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0ZBREUkMyk7XG4gIH1cbiAgX3RyaWdnZXJCYWNrZHJvcFRyYW5zaXRpb24oKSB7XG4gICAgY29uc3QgaGlkZUV2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERV9QUkVWRU5URUQkMSk7XG4gICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGlzTW9kYWxPdmVyZmxvd2luZyA9IHRoaXMuX2VsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBpbml0aWFsT3ZlcmZsb3dZID0gdGhpcy5fZWxlbWVudC5zdHlsZS5vdmVyZmxvd1k7XG4gICAgLy8gcmV0dXJuIGlmIHRoZSBmb2xsb3dpbmcgYmFja2dyb3VuZCB0cmFuc2l0aW9uIGhhc24ndCB5ZXQgY29tcGxldGVkXG4gICAgaWYgKGluaXRpYWxPdmVyZmxvd1kgPT09ICdoaWRkZW4nIHx8IHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfU1RBVElDKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU1RBVElDKTtcbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NUQVRJQyk7XG4gICAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5vdmVyZmxvd1kgPSBpbml0aWFsT3ZlcmZsb3dZO1xuICAgICAgfSwgdGhpcy5fZGlhbG9nKTtcbiAgICB9LCB0aGlzLl9kaWFsb2cpO1xuICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuICAgKi9cblxuICBfYWRqdXN0RGlhbG9nKCkge1xuICAgIGNvbnN0IGlzTW9kYWxPdmVyZmxvd2luZyA9IHRoaXMuX2VsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHRoaXMuX3Njcm9sbEJhci5nZXRXaWR0aCgpO1xuICAgIGNvbnN0IGlzQm9keU92ZXJmbG93aW5nID0gc2Nyb2xsYmFyV2lkdGggPiAwO1xuICAgIGlmIChpc0JvZHlPdmVyZmxvd2luZyAmJiAhaXNNb2RhbE92ZXJmbG93aW5nKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eSA9IGlzUlRMKCkgPyAncGFkZGluZ0xlZnQnIDogJ3BhZGRpbmdSaWdodCc7XG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IGAke3Njcm9sbGJhcldpZHRofXB4YDtcbiAgICB9XG4gICAgaWYgKCFpc0JvZHlPdmVyZmxvd2luZyAmJiBpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gaXNSVEwoKSA/ICdwYWRkaW5nUmlnaHQnIDogJ3BhZGRpbmdMZWZ0JztcbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbcHJvcGVydHldID0gYCR7c2Nyb2xsYmFyV2lkdGh9cHhgO1xuICAgIH1cbiAgfVxuICBfcmVzZXRBZGp1c3RtZW50cygpIHtcbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gJyc7XG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZywgcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IE1vZGFsLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKTtcbiAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKTtcbiAgICAgIH1cbiAgICAgIGRhdGFbY29uZmlnXShyZWxhdGVkVGFyZ2V0KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSQyLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSQyLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3Rvcih0aGlzKTtcbiAgaWYgKFsnQScsICdBUkVBJ10uaW5jbHVkZXModGhpcy50YWdOYW1lKSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgRXZlbnRIYW5kbGVyLm9uZSh0YXJnZXQsIEVWRU5UX1NIT1ckNCwgc2hvd0V2ZW50ID0+IHtcbiAgICBpZiAoc2hvd0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgRXZlbnRIYW5kbGVyLm9uZSh0YXJnZXQsIEVWRU5UX0hJRERFTiQ0LCAoKSA9PiB7XG4gICAgICBpZiAoaXNWaXNpYmxlKHRoaXMpKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gYXZvaWQgY29uZmxpY3Qgd2hlbiBjbGlja2luZyBtb2RhbCB0b2dnbGVyIHdoaWxlIGFub3RoZXIgb25lIGlzIG9wZW5cbiAgY29uc3QgYWxyZWFkeU9wZW4gPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKE9QRU5fU0VMRUNUT1IkMSk7XG4gIGlmIChhbHJlYWR5T3Blbikge1xuICAgIE1vZGFsLmdldEluc3RhbmNlKGFscmVhZHlPcGVuKS5oaWRlKCk7XG4gIH1cbiAgY29uc3QgZGF0YSA9IE1vZGFsLmdldE9yQ3JlYXRlSW5zdGFuY2UodGFyZ2V0KTtcbiAgZGF0YS50b2dnbGUodGhpcyk7XG59KTtcbmVuYWJsZURpc21pc3NUcmlnZ2VyKE1vZGFsKTtcblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oTW9kYWwpO1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgb2ZmY2FudmFzLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkNiA9ICdvZmZjYW52YXMnO1xuY29uc3QgREFUQV9LRVkkMyA9ICdicy5vZmZjYW52YXMnO1xuY29uc3QgRVZFTlRfS0VZJDMgPSBgLiR7REFUQV9LRVkkM31gO1xuY29uc3QgREFUQV9BUElfS0VZJDEgPSAnLmRhdGEtYXBpJztcbmNvbnN0IEVWRU5UX0xPQURfREFUQV9BUEkkMiA9IGBsb2FkJHtFVkVOVF9LRVkkM30ke0RBVEFfQVBJX0tFWSQxfWA7XG5jb25zdCBFU0NBUEVfS0VZID0gJ0VzY2FwZSc7XG5jb25zdCBDTEFTU19OQU1FX1NIT1ckMyA9ICdzaG93JztcbmNvbnN0IENMQVNTX05BTUVfU0hPV0lORyQxID0gJ3Nob3dpbmcnO1xuY29uc3QgQ0xBU1NfTkFNRV9ISURJTkcgPSAnaGlkaW5nJztcbmNvbnN0IENMQVNTX05BTUVfQkFDS0RST1AgPSAnb2ZmY2FudmFzLWJhY2tkcm9wJztcbmNvbnN0IE9QRU5fU0VMRUNUT1IgPSAnLm9mZmNhbnZhcy5zaG93JztcbmNvbnN0IEVWRU5UX1NIT1ckMyA9IGBzaG93JHtFVkVOVF9LRVkkM31gO1xuY29uc3QgRVZFTlRfU0hPV04kMyA9IGBzaG93biR7RVZFTlRfS0VZJDN9YDtcbmNvbnN0IEVWRU5UX0hJREUkMyA9IGBoaWRlJHtFVkVOVF9LRVkkM31gO1xuY29uc3QgRVZFTlRfSElERV9QUkVWRU5URUQgPSBgaGlkZVByZXZlbnRlZCR7RVZFTlRfS0VZJDN9YDtcbmNvbnN0IEVWRU5UX0hJRERFTiQzID0gYGhpZGRlbiR7RVZFTlRfS0VZJDN9YDtcbmNvbnN0IEVWRU5UX1JFU0laRSA9IGByZXNpemUke0VWRU5UX0tFWSQzfWA7XG5jb25zdCBFVkVOVF9DTElDS19EQVRBX0FQSSQxID0gYGNsaWNrJHtFVkVOVF9LRVkkM30ke0RBVEFfQVBJX0tFWSQxfWA7XG5jb25zdCBFVkVOVF9LRVlET1dOX0RJU01JU1MgPSBga2V5ZG93bi5kaXNtaXNzJHtFVkVOVF9LRVkkM31gO1xuY29uc3QgU0VMRUNUT1JfREFUQV9UT0dHTEUkMSA9ICdbZGF0YS1icy10b2dnbGU9XCJvZmZjYW52YXNcIl0nO1xuY29uc3QgRGVmYXVsdCQ1ID0ge1xuICBiYWNrZHJvcDogdHJ1ZSxcbiAga2V5Ym9hcmQ6IHRydWUsXG4gIHNjcm9sbDogZmFsc2Vcbn07XG5jb25zdCBEZWZhdWx0VHlwZSQ1ID0ge1xuICBiYWNrZHJvcDogJyhib29sZWFufHN0cmluZyknLFxuICBrZXlib2FyZDogJ2Jvb2xlYW4nLFxuICBzY3JvbGw6ICdib29sZWFuJ1xufTtcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgT2ZmY2FudmFzIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHN1cGVyKGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgIHRoaXMuX2JhY2tkcm9wID0gdGhpcy5faW5pdGlhbGl6ZUJhY2tEcm9wKCk7XG4gICAgdGhpcy5fZm9jdXN0cmFwID0gdGhpcy5faW5pdGlhbGl6ZUZvY3VzVHJhcCgpO1xuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdCQ1O1xuICB9XG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlJDU7XG4gIH1cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FJDY7XG4gIH1cblxuICAvLyBQdWJsaWNcbiAgdG9nZ2xlKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHJlbGF0ZWRUYXJnZXQpO1xuICB9XG4gIHNob3cocmVsYXRlZFRhcmdldCkge1xuICAgIGlmICh0aGlzLl9pc1Nob3duKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNob3dFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1ckMywge1xuICAgICAgcmVsYXRlZFRhcmdldFxuICAgIH0pO1xuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pc1Nob3duID0gdHJ1ZTtcbiAgICB0aGlzLl9iYWNrZHJvcC5zaG93KCk7XG4gICAgaWYgKCF0aGlzLl9jb25maWcuc2Nyb2xsKSB7XG4gICAgICBuZXcgU2Nyb2xsQmFySGVscGVyKCkuaGlkZSgpO1xuICAgIH1cbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcsIHRydWUpO1xuICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2RpYWxvZycpO1xuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1dJTkckMSk7XG4gICAgY29uc3QgY29tcGxldGVDYWxsQmFjayA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fY29uZmlnLnNjcm9sbCB8fCB0aGlzLl9jb25maWcuYmFja2Ryb3ApIHtcbiAgICAgICAgdGhpcy5fZm9jdXN0cmFwLmFjdGl2YXRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XJDMpO1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPV0lORyQxKTtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1dOJDMsIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlQ2FsbEJhY2ssIHRoaXMuX2VsZW1lbnQsIHRydWUpO1xuICB9XG4gIGhpZGUoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1Nob3duKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUkMyk7XG4gICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2ZvY3VzdHJhcC5kZWFjdGl2YXRlKCk7XG4gICAgdGhpcy5fZWxlbWVudC5ibHVyKCk7XG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0hJRElORyk7XG4gICAgdGhpcy5fYmFja2Ryb3AuaGlkZSgpO1xuICAgIGNvbnN0IGNvbXBsZXRlQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDMsIENMQVNTX05BTUVfSElESU5HKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLW1vZGFsJyk7XG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuICAgICAgaWYgKCF0aGlzLl9jb25maWcuc2Nyb2xsKSB7XG4gICAgICAgIG5ldyBTY3JvbGxCYXJIZWxwZXIoKS5yZXNldCgpO1xuICAgICAgfVxuICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElEREVOJDMpO1xuICAgIH07XG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZUNhbGxiYWNrLCB0aGlzLl9lbGVtZW50LCB0cnVlKTtcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuX2JhY2tkcm9wLmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9mb2N1c3RyYXAuZGVhY3RpdmF0ZSgpO1xuICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2luaXRpYWxpemVCYWNrRHJvcCgpIHtcbiAgICBjb25zdCBjbGlja0NhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERV9QUkVWRU5URUQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9O1xuXG4gICAgLy8gJ3N0YXRpYycgb3B0aW9uIHdpbGwgYmUgdHJhbnNsYXRlZCB0byB0cnVlLCBhbmQgYm9vbGVhbnMgd2lsbCBrZWVwIHRoZWlyIHZhbHVlXG4gICAgY29uc3QgaXNWaXNpYmxlID0gQm9vbGVhbih0aGlzLl9jb25maWcuYmFja2Ryb3ApO1xuICAgIHJldHVybiBuZXcgQmFja2Ryb3Aoe1xuICAgICAgY2xhc3NOYW1lOiBDTEFTU19OQU1FX0JBQ0tEUk9QLFxuICAgICAgaXNWaXNpYmxlLFxuICAgICAgaXNBbmltYXRlZDogdHJ1ZSxcbiAgICAgIHJvb3RFbGVtZW50OiB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICBjbGlja0NhbGxiYWNrOiBpc1Zpc2libGUgPyBjbGlja0NhbGxiYWNrIDogbnVsbFxuICAgIH0pO1xuICB9XG4gIF9pbml0aWFsaXplRm9jdXNUcmFwKCkge1xuICAgIHJldHVybiBuZXcgRm9jdXNUcmFwKHtcbiAgICAgIHRyYXBFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgfSk7XG4gIH1cbiAgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9LRVlET1dOX0RJU01JU1MsIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgIT09IEVTQ0FQRV9LRVkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERV9QUkVWRU5URUQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gT2ZmY2FudmFzLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKTtcbiAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQgfHwgY29uZmlnLnN0YXJ0c1dpdGgoJ18nKSB8fCBjb25maWcgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKTtcbiAgICAgIH1cbiAgICAgIGRhdGFbY29uZmlnXSh0aGlzKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSQxLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSQxLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3Rvcih0aGlzKTtcbiAgaWYgKFsnQScsICdBUkVBJ10uaW5jbHVkZXModGhpcy50YWdOYW1lKSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGlzRGlzYWJsZWQodGhpcykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgRXZlbnRIYW5kbGVyLm9uZSh0YXJnZXQsIEVWRU5UX0hJRERFTiQzLCAoKSA9PiB7XG4gICAgLy8gZm9jdXMgb24gdHJpZ2dlciB3aGVuIGl0IGlzIGNsb3NlZFxuICAgIGlmIChpc1Zpc2libGUodGhpcykpIHtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGF2b2lkIGNvbmZsaWN0IHdoZW4gY2xpY2tpbmcgYSB0b2dnbGVyIG9mIGFuIG9mZmNhbnZhcywgd2hpbGUgYW5vdGhlciBpcyBvcGVuXG4gIGNvbnN0IGFscmVhZHlPcGVuID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShPUEVOX1NFTEVDVE9SKTtcbiAgaWYgKGFscmVhZHlPcGVuICYmIGFscmVhZHlPcGVuICE9PSB0YXJnZXQpIHtcbiAgICBPZmZjYW52YXMuZ2V0SW5zdGFuY2UoYWxyZWFkeU9wZW4pLmhpZGUoKTtcbiAgfVxuICBjb25zdCBkYXRhID0gT2ZmY2FudmFzLmdldE9yQ3JlYXRlSW5zdGFuY2UodGFyZ2V0KTtcbiAgZGF0YS50b2dnbGUodGhpcyk7XG59KTtcbkV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX0xPQURfREFUQV9BUEkkMiwgKCkgPT4ge1xuICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoT1BFTl9TRUxFQ1RPUikpIHtcbiAgICBPZmZjYW52YXMuZ2V0T3JDcmVhdGVJbnN0YW5jZShzZWxlY3Rvcikuc2hvdygpO1xuICB9XG59KTtcbkV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX1JFU0laRSwgKCkgPT4ge1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgU2VsZWN0b3JFbmdpbmUuZmluZCgnW2FyaWEtbW9kYWxdW2NsYXNzKj1zaG93XVtjbGFzcyo9b2ZmY2FudmFzLV0nKSkge1xuICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICBPZmZjYW52YXMuZ2V0T3JDcmVhdGVJbnN0YW5jZShlbGVtZW50KS5oaWRlKCk7XG4gICAgfVxuICB9XG59KTtcbmVuYWJsZURpc21pc3NUcmlnZ2VyKE9mZmNhbnZhcyk7XG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKE9mZmNhbnZhcyk7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL3Nhbml0aXplci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbi8vIGpzLWRvY3Mtc3RhcnQgYWxsb3ctbGlzdFxuY29uc3QgQVJJQV9BVFRSSUJVVEVfUEFUVEVSTiA9IC9eYXJpYS1bXFx3LV0qJC9pO1xuY29uc3QgRGVmYXVsdEFsbG93bGlzdCA9IHtcbiAgLy8gR2xvYmFsIGF0dHJpYnV0ZXMgYWxsb3dlZCBvbiBhbnkgc3VwcGxpZWQgZWxlbWVudCBiZWxvdy5cbiAgJyonOiBbJ2NsYXNzJywgJ2RpcicsICdpZCcsICdsYW5nJywgJ3JvbGUnLCBBUklBX0FUVFJJQlVURV9QQVRURVJOXSxcbiAgYTogWyd0YXJnZXQnLCAnaHJlZicsICd0aXRsZScsICdyZWwnXSxcbiAgYXJlYTogW10sXG4gIGI6IFtdLFxuICBicjogW10sXG4gIGNvbDogW10sXG4gIGNvZGU6IFtdLFxuICBkZDogW10sXG4gIGRpdjogW10sXG4gIGRsOiBbXSxcbiAgZHQ6IFtdLFxuICBlbTogW10sXG4gIGhyOiBbXSxcbiAgaDE6IFtdLFxuICBoMjogW10sXG4gIGgzOiBbXSxcbiAgaDQ6IFtdLFxuICBoNTogW10sXG4gIGg2OiBbXSxcbiAgaTogW10sXG4gIGltZzogWydzcmMnLCAnc3Jjc2V0JywgJ2FsdCcsICd0aXRsZScsICd3aWR0aCcsICdoZWlnaHQnXSxcbiAgbGk6IFtdLFxuICBvbDogW10sXG4gIHA6IFtdLFxuICBwcmU6IFtdLFxuICBzOiBbXSxcbiAgc21hbGw6IFtdLFxuICBzcGFuOiBbXSxcbiAgc3ViOiBbXSxcbiAgc3VwOiBbXSxcbiAgc3Ryb25nOiBbXSxcbiAgdTogW10sXG4gIHVsOiBbXVxufTtcbi8vIGpzLWRvY3MtZW5kIGFsbG93LWxpc3RcblxuY29uc3QgdXJpQXR0cmlidXRlcyA9IG5ldyBTZXQoWydiYWNrZ3JvdW5kJywgJ2NpdGUnLCAnaHJlZicsICdpdGVtdHlwZScsICdsb25nZGVzYycsICdwb3N0ZXInLCAnc3JjJywgJ3hsaW5rOmhyZWYnXSk7XG5cbi8qKlxuICogQSBwYXR0ZXJuIHRoYXQgcmVjb2duaXplcyBVUkxzIHRoYXQgYXJlIHNhZmUgd3J0LiBYU1MgaW4gVVJMIG5hdmlnYXRpb25cbiAqIGNvbnRleHRzLlxuICpcbiAqIFNob3V0LW91dCB0byBBbmd1bGFyIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi8xNS4yLjgvcGFja2FnZXMvY29yZS9zcmMvc2FuaXRpemF0aW9uL3VybF9zYW5pdGl6ZXIudHMjTDM4XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuY29uc3QgU0FGRV9VUkxfUEFUVEVSTiA9IC9eKD8hamF2YXNjcmlwdDopKD86W2EtejAtOSsuLV0rOnxbXiY6Lz8jXSooPzpbLz8jXXwkKSkvaTtcbmNvbnN0IGFsbG93ZWRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlLCBhbGxvd2VkQXR0cmlidXRlTGlzdCkgPT4ge1xuICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChhbGxvd2VkQXR0cmlidXRlTGlzdC5pbmNsdWRlcyhhdHRyaWJ1dGVOYW1lKSkge1xuICAgIGlmICh1cmlBdHRyaWJ1dGVzLmhhcyhhdHRyaWJ1dGVOYW1lKSkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4oU0FGRV9VUkxfUEFUVEVSTi50ZXN0KGF0dHJpYnV0ZS5ub2RlVmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB2YWxpZGF0ZXMgdGhlIGF0dHJpYnV0ZS5cbiAgcmV0dXJuIGFsbG93ZWRBdHRyaWJ1dGVMaXN0LmZpbHRlcihhdHRyaWJ1dGVSZWdleCA9PiBhdHRyaWJ1dGVSZWdleCBpbnN0YW5jZW9mIFJlZ0V4cCkuc29tZShyZWdleCA9PiByZWdleC50ZXN0KGF0dHJpYnV0ZU5hbWUpKTtcbn07XG5mdW5jdGlvbiBzYW5pdGl6ZUh0bWwodW5zYWZlSHRtbCwgYWxsb3dMaXN0LCBzYW5pdGl6ZUZ1bmN0aW9uKSB7XG4gIGlmICghdW5zYWZlSHRtbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gdW5zYWZlSHRtbDtcbiAgfVxuICBpZiAoc2FuaXRpemVGdW5jdGlvbiAmJiB0eXBlb2Ygc2FuaXRpemVGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBzYW5pdGl6ZUZ1bmN0aW9uKHVuc2FmZUh0bWwpO1xuICB9XG4gIGNvbnN0IGRvbVBhcnNlciA9IG5ldyB3aW5kb3cuRE9NUGFyc2VyKCk7XG4gIGNvbnN0IGNyZWF0ZWREb2N1bWVudCA9IGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcodW5zYWZlSHRtbCwgJ3RleHQvaHRtbCcpO1xuICBjb25zdCBlbGVtZW50cyA9IFtdLmNvbmNhdCguLi5jcmVhdGVkRG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCcqJykpO1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICBjb25zdCBlbGVtZW50TmFtZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIU9iamVjdC5rZXlzKGFsbG93TGlzdCkuaW5jbHVkZXMoZWxlbWVudE5hbWUpKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IGF0dHJpYnV0ZUxpc3QgPSBbXS5jb25jYXQoLi4uZWxlbWVudC5hdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBhbGxvd2VkQXR0cmlidXRlcyA9IFtdLmNvbmNhdChhbGxvd0xpc3RbJyonXSB8fCBbXSwgYWxsb3dMaXN0W2VsZW1lbnROYW1lXSB8fCBbXSk7XG4gICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYXR0cmlidXRlTGlzdCkge1xuICAgICAgaWYgKCFhbGxvd2VkQXR0cmlidXRlKGF0dHJpYnV0ZSwgYWxsb3dlZEF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZS5ub2RlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjcmVhdGVkRG9jdW1lbnQuYm9keS5pbm5lckhUTUw7XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL3RlbXBsYXRlLWZhY3RvcnkuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSQ1ID0gJ1RlbXBsYXRlRmFjdG9yeSc7XG5jb25zdCBEZWZhdWx0JDQgPSB7XG4gIGFsbG93TGlzdDogRGVmYXVsdEFsbG93bGlzdCxcbiAgY29udGVudDoge30sXG4gIC8vIHsgc2VsZWN0b3IgOiB0ZXh0ICwgIHNlbGVjdG9yMiA6IHRleHQyICwgfVxuICBleHRyYUNsYXNzOiAnJyxcbiAgaHRtbDogZmFsc2UsXG4gIHNhbml0aXplOiB0cnVlLFxuICBzYW5pdGl6ZUZuOiBudWxsLFxuICB0ZW1wbGF0ZTogJzxkaXY+PC9kaXY+J1xufTtcbmNvbnN0IERlZmF1bHRUeXBlJDQgPSB7XG4gIGFsbG93TGlzdDogJ29iamVjdCcsXG4gIGNvbnRlbnQ6ICdvYmplY3QnLFxuICBleHRyYUNsYXNzOiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICBodG1sOiAnYm9vbGVhbicsXG4gIHNhbml0aXplOiAnYm9vbGVhbicsXG4gIHNhbml0aXplRm46ICcobnVsbHxmdW5jdGlvbiknLFxuICB0ZW1wbGF0ZTogJ3N0cmluZydcbn07XG5jb25zdCBEZWZhdWx0Q29udGVudFR5cGUgPSB7XG4gIGVudHJ5OiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9ufG51bGwpJyxcbiAgc2VsZWN0b3I6ICcoc3RyaW5nfGVsZW1lbnQpJ1xufTtcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgVGVtcGxhdGVGYWN0b3J5IGV4dGVuZHMgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0JDQ7XG4gIH1cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGUkNDtcbiAgfVxuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIE5BTUUkNTtcbiAgfVxuXG4gIC8vIFB1YmxpY1xuICBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuX2NvbmZpZy5jb250ZW50KS5tYXAoY29uZmlnID0+IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGNvbmZpZykpLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuICBoYXNDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdldENvbnRlbnQoKS5sZW5ndGggPiAwO1xuICB9XG4gIGNoYW5nZUNvbnRlbnQoY29udGVudCkge1xuICAgIHRoaXMuX2NoZWNrQ29udGVudChjb250ZW50KTtcbiAgICB0aGlzLl9jb25maWcuY29udGVudCA9IHtcbiAgICAgIC4uLnRoaXMuX2NvbmZpZy5jb250ZW50LFxuICAgICAgLi4uY29udGVudFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdG9IdG1sKCkge1xuICAgIGNvbnN0IHRlbXBsYXRlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRlbXBsYXRlV3JhcHBlci5pbm5lckhUTUwgPSB0aGlzLl9tYXliZVNhbml0aXplKHRoaXMuX2NvbmZpZy50ZW1wbGF0ZSk7XG4gICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHRleHRdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX2NvbmZpZy5jb250ZW50KSkge1xuICAgICAgdGhpcy5fc2V0Q29udGVudCh0ZW1wbGF0ZVdyYXBwZXIsIHRleHQsIHNlbGVjdG9yKTtcbiAgICB9XG4gICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZVdyYXBwZXIuY2hpbGRyZW5bMF07XG4gICAgY29uc3QgZXh0cmFDbGFzcyA9IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKHRoaXMuX2NvbmZpZy5leHRyYUNsYXNzKTtcbiAgICBpZiAoZXh0cmFDbGFzcykge1xuICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZCguLi5leHRyYUNsYXNzLnNwbGl0KCcgJykpO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF90eXBlQ2hlY2tDb25maWcoY29uZmlnKSB7XG4gICAgc3VwZXIuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpO1xuICAgIHRoaXMuX2NoZWNrQ29udGVudChjb25maWcuY29udGVudCk7XG4gIH1cbiAgX2NoZWNrQ29udGVudChhcmcpIHtcbiAgICBmb3IgKGNvbnN0IFtzZWxlY3RvciwgY29udGVudF0gb2YgT2JqZWN0LmVudHJpZXMoYXJnKSkge1xuICAgICAgc3VwZXIuX3R5cGVDaGVja0NvbmZpZyh7XG4gICAgICAgIHNlbGVjdG9yLFxuICAgICAgICBlbnRyeTogY29udGVudFxuICAgICAgfSwgRGVmYXVsdENvbnRlbnRUeXBlKTtcbiAgICB9XG4gIH1cbiAgX3NldENvbnRlbnQodGVtcGxhdGUsIGNvbnRlbnQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgdGVtcGxhdGVFbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3RvciwgdGVtcGxhdGUpO1xuICAgIGlmICghdGVtcGxhdGVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnRlbnQgPSB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbihjb250ZW50KTtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHRlbXBsYXRlRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzRWxlbWVudChjb250ZW50KSkge1xuICAgICAgdGhpcy5fcHV0RWxlbWVudEluVGVtcGxhdGUoZ2V0RWxlbWVudChjb250ZW50KSwgdGVtcGxhdGVFbGVtZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5odG1sKSB7XG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWF5YmVTYW5pdGl6ZShjb250ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGVtcGxhdGVFbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgfVxuICBfbWF5YmVTYW5pdGl6ZShhcmcpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNhbml0aXplID8gc2FuaXRpemVIdG1sKGFyZywgdGhpcy5fY29uZmlnLmFsbG93TGlzdCwgdGhpcy5fY29uZmlnLnNhbml0aXplRm4pIDogYXJnO1xuICB9XG4gIF9yZXNvbHZlUG9zc2libGVGdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZXhlY3V0ZShhcmcsIFt1bmRlZmluZWQsIHRoaXNdKTtcbiAgfVxuICBfcHV0RWxlbWVudEluVGVtcGxhdGUoZWxlbWVudCwgdGVtcGxhdGVFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5odG1sKSB7XG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0ZW1wbGF0ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBlbGVtZW50LnRleHRDb250ZW50O1xuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB0b29sdGlwLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkNCA9ICd0b29sdGlwJztcbmNvbnN0IERJU0FMTE9XRURfQVRUUklCVVRFUyA9IG5ldyBTZXQoWydzYW5pdGl6ZScsICdhbGxvd0xpc3QnLCAnc2FuaXRpemVGbiddKTtcbmNvbnN0IENMQVNTX05BTUVfRkFERSQyID0gJ2ZhZGUnO1xuY29uc3QgQ0xBU1NfTkFNRV9NT0RBTCA9ICdtb2RhbCc7XG5jb25zdCBDTEFTU19OQU1FX1NIT1ckMiA9ICdzaG93JztcbmNvbnN0IFNFTEVDVE9SX1RPT0xUSVBfSU5ORVIgPSAnLnRvb2x0aXAtaW5uZXInO1xuY29uc3QgU0VMRUNUT1JfTU9EQUwgPSBgLiR7Q0xBU1NfTkFNRV9NT0RBTH1gO1xuY29uc3QgRVZFTlRfTU9EQUxfSElERSA9ICdoaWRlLmJzLm1vZGFsJztcbmNvbnN0IFRSSUdHRVJfSE9WRVIgPSAnaG92ZXInO1xuY29uc3QgVFJJR0dFUl9GT0NVUyA9ICdmb2N1cyc7XG5jb25zdCBUUklHR0VSX0NMSUNLID0gJ2NsaWNrJztcbmNvbnN0IFRSSUdHRVJfTUFOVUFMID0gJ21hbnVhbCc7XG5jb25zdCBFVkVOVF9ISURFJDIgPSAnaGlkZSc7XG5jb25zdCBFVkVOVF9ISURERU4kMiA9ICdoaWRkZW4nO1xuY29uc3QgRVZFTlRfU0hPVyQyID0gJ3Nob3cnO1xuY29uc3QgRVZFTlRfU0hPV04kMiA9ICdzaG93bic7XG5jb25zdCBFVkVOVF9JTlNFUlRFRCA9ICdpbnNlcnRlZCc7XG5jb25zdCBFVkVOVF9DTElDSyQxID0gJ2NsaWNrJztcbmNvbnN0IEVWRU5UX0ZPQ1VTSU4kMSA9ICdmb2N1c2luJztcbmNvbnN0IEVWRU5UX0ZPQ1VTT1VUJDEgPSAnZm9jdXNvdXQnO1xuY29uc3QgRVZFTlRfTU9VU0VFTlRFUiA9ICdtb3VzZWVudGVyJztcbmNvbnN0IEVWRU5UX01PVVNFTEVBVkUgPSAnbW91c2VsZWF2ZSc7XG5jb25zdCBBdHRhY2htZW50TWFwID0ge1xuICBBVVRPOiAnYXV0bycsXG4gIFRPUDogJ3RvcCcsXG4gIFJJR0hUOiBpc1JUTCgpID8gJ2xlZnQnIDogJ3JpZ2h0JyxcbiAgQk9UVE9NOiAnYm90dG9tJyxcbiAgTEVGVDogaXNSVEwoKSA/ICdyaWdodCcgOiAnbGVmdCdcbn07XG5jb25zdCBEZWZhdWx0JDMgPSB7XG4gIGFsbG93TGlzdDogRGVmYXVsdEFsbG93bGlzdCxcbiAgYW5pbWF0aW9uOiB0cnVlLFxuICBib3VuZGFyeTogJ2NsaXBwaW5nUGFyZW50cycsXG4gIGNvbnRhaW5lcjogZmFsc2UsXG4gIGN1c3RvbUNsYXNzOiAnJyxcbiAgZGVsYXk6IDAsXG4gIGZhbGxiYWNrUGxhY2VtZW50czogWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXSxcbiAgaHRtbDogZmFsc2UsXG4gIG9mZnNldDogWzAsIDZdLFxuICBwbGFjZW1lbnQ6ICd0b3AnLFxuICBwb3BwZXJDb25maWc6IG51bGwsXG4gIHNhbml0aXplOiB0cnVlLFxuICBzYW5pdGl6ZUZuOiBudWxsLFxuICBzZWxlY3RvcjogZmFsc2UsXG4gIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIiByb2xlPVwidG9vbHRpcFwiPicgKyAnPGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+JyArICc8L2Rpdj4nLFxuICB0aXRsZTogJycsXG4gIHRyaWdnZXI6ICdob3ZlciBmb2N1cydcbn07XG5jb25zdCBEZWZhdWx0VHlwZSQzID0ge1xuICBhbGxvd0xpc3Q6ICdvYmplY3QnLFxuICBhbmltYXRpb246ICdib29sZWFuJyxcbiAgYm91bmRhcnk6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgY29udGFpbmVyOiAnKHN0cmluZ3xlbGVtZW50fGJvb2xlYW4pJyxcbiAgY3VzdG9tQ2xhc3M6ICcoc3RyaW5nfGZ1bmN0aW9uKScsXG4gIGRlbGF5OiAnKG51bWJlcnxvYmplY3QpJyxcbiAgZmFsbGJhY2tQbGFjZW1lbnRzOiAnYXJyYXknLFxuICBodG1sOiAnYm9vbGVhbicsXG4gIG9mZnNldDogJyhhcnJheXxzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgcGxhY2VtZW50OiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICBwb3BwZXJDb25maWc6ICcobnVsbHxvYmplY3R8ZnVuY3Rpb24pJyxcbiAgc2FuaXRpemU6ICdib29sZWFuJyxcbiAgc2FuaXRpemVGbjogJyhudWxsfGZ1bmN0aW9uKScsXG4gIHNlbGVjdG9yOiAnKHN0cmluZ3xib29sZWFuKScsXG4gIHRlbXBsYXRlOiAnc3RyaW5nJyxcbiAgdGl0bGU6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJyxcbiAgdHJpZ2dlcjogJ3N0cmluZydcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgaWYgKHR5cGVvZiBQb3BwZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXBcXCdzIHRvb2x0aXBzIHJlcXVpcmUgUG9wcGVyIChodHRwczovL3BvcHBlci5qcy5vcmcvZG9jcy92Mi8pJyk7XG4gICAgfVxuICAgIHN1cGVyKGVsZW1lbnQsIGNvbmZpZyk7XG5cbiAgICAvLyBQcml2YXRlXG4gICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLl90aW1lb3V0ID0gMDtcbiAgICB0aGlzLl9pc0hvdmVyZWQgPSBudWxsO1xuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIgPSB7fTtcbiAgICB0aGlzLl9wb3BwZXIgPSBudWxsO1xuICAgIHRoaXMuX3RlbXBsYXRlRmFjdG9yeSA9IG51bGw7XG4gICAgdGhpcy5fbmV3Q29udGVudCA9IG51bGw7XG5cbiAgICAvLyBQcm90ZWN0ZWRcbiAgICB0aGlzLnRpcCA9IG51bGw7XG4gICAgdGhpcy5fc2V0TGlzdGVuZXJzKCk7XG4gICAgaWYgKCF0aGlzLl9jb25maWcuc2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuX2ZpeFRpdGxlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHQkMztcbiAgfVxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZSQzO1xuICB9XG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRSQ0O1xuICB9XG5cbiAgLy8gUHVibGljXG4gIGVuYWJsZSgpIHtcbiAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlO1xuICB9XG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5faXNFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgdG9nZ2xlRW5hYmxlZCgpIHtcbiAgICB0aGlzLl9pc0VuYWJsZWQgPSAhdGhpcy5faXNFbmFibGVkO1xuICB9XG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5faXNTaG93bigpKSB7XG4gICAgICB0aGlzLl9sZWF2ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lbnRlcigpO1xuICB9XG4gIGRpc3Bvc2UoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fZWxlbWVudC5jbG9zZXN0KFNFTEVDVE9SX01PREFMKSwgRVZFTlRfTU9EQUxfSElERSwgdGhpcy5faGlkZU1vZGFsSGFuZGxlcik7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLW9yaWdpbmFsLXRpdGxlJykpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLW9yaWdpbmFsLXRpdGxlJykpO1xuICAgIH1cbiAgICB0aGlzLl9kaXNwb3NlUG9wcGVyKCk7XG4gICAgc3VwZXIuZGlzcG9zZSgpO1xuICB9XG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSB1c2Ugc2hvdyBvbiB2aXNpYmxlIGVsZW1lbnRzJyk7XG4gICAgfVxuICAgIGlmICghKHRoaXMuX2lzV2l0aENvbnRlbnQoKSAmJiB0aGlzLl9pc0VuYWJsZWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNob3dFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX1NIT1ckMikpO1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSBmaW5kU2hhZG93Um9vdCh0aGlzLl9lbGVtZW50KTtcbiAgICBjb25zdCBpc0luVGhlRG9tID0gKHNoYWRvd1Jvb3QgfHwgdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuY29udGFpbnModGhpcy5fZWxlbWVudCk7XG4gICAgaWYgKHNob3dFdmVudC5kZWZhdWx0UHJldmVudGVkIHx8ICFpc0luVGhlRG9tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVE9ETzogdjYgcmVtb3ZlIHRoaXMgb3IgbWFrZSBpdCBvcHRpb25hbFxuICAgIHRoaXMuX2Rpc3Bvc2VQb3BwZXIoKTtcbiAgICBjb25zdCB0aXAgPSB0aGlzLl9nZXRUaXBFbGVtZW50KCk7XG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXAuZ2V0QXR0cmlidXRlKCdpZCcpKTtcbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXJcbiAgICB9ID0gdGhpcy5fY29uZmlnO1xuICAgIGlmICghdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyh0aGlzLnRpcCkpIHtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQodGlwKTtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0lOU0VSVEVEKSk7XG4gICAgfVxuICAgIHRoaXMuX3BvcHBlciA9IHRoaXMuX2NyZWF0ZVBvcHBlcih0aXApO1xuICAgIHRpcC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQyKTtcblxuICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICBFdmVudEhhbmRsZXIub24oZWxlbWVudCwgJ21vdXNlb3ZlcicsIG5vb3ApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX1NIT1dOJDIpKTtcbiAgICAgIGlmICh0aGlzLl9pc0hvdmVyZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2xlYXZlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIHRoaXMudGlwLCB0aGlzLl9pc0FuaW1hdGVkKCkpO1xuICB9XG4gIGhpZGUoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGlkZUV2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfSElERSQyKSk7XG4gICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRpcCA9IHRoaXMuX2dldFRpcEVsZW1lbnQoKTtcbiAgICB0aXAuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1ckMik7XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICBFdmVudEhhbmRsZXIub2ZmKGVsZW1lbnQsICdtb3VzZW92ZXInLCBub29wKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0NMSUNLXSA9IGZhbHNlO1xuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVFJJR0dFUl9GT0NVU10gPSBmYWxzZTtcbiAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RSSUdHRVJfSE9WRVJdID0gZmFsc2U7XG4gICAgdGhpcy5faXNIb3ZlcmVkID0gbnVsbDsgLy8gaXQgaXMgYSB0cmljayB0byBzdXBwb3J0IG1hbnVhbCB0cmlnZ2VyaW5nXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9pc0hvdmVyZWQpIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKTtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0hJRERFTiQyKSk7XG4gICAgfTtcbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCB0aGlzLnRpcCwgdGhpcy5faXNBbmltYXRlZCgpKTtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgdGhpcy5fcG9wcGVyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFByb3RlY3RlZFxuICBfaXNXaXRoQ29udGVudCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLl9nZXRUaXRsZSgpKTtcbiAgfVxuICBfZ2V0VGlwRWxlbWVudCgpIHtcbiAgICBpZiAoIXRoaXMudGlwKSB7XG4gICAgICB0aGlzLnRpcCA9IHRoaXMuX2NyZWF0ZVRpcEVsZW1lbnQodGhpcy5fbmV3Q29udGVudCB8fCB0aGlzLl9nZXRDb250ZW50Rm9yVGVtcGxhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRpcDtcbiAgfVxuICBfY3JlYXRlVGlwRWxlbWVudChjb250ZW50KSB7XG4gICAgY29uc3QgdGlwID0gdGhpcy5fZ2V0VGVtcGxhdGVGYWN0b3J5KGNvbnRlbnQpLnRvSHRtbCgpO1xuXG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgY2hlY2sgaW4gdjZcbiAgICBpZiAoIXRpcCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHRpcC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfRkFERSQyLCBDTEFTU19OQU1FX1NIT1ckMik7XG4gICAgLy8gVE9ETzogdjYgdGhlIGZvbGxvd2luZyBjYW4gYmUgYWNoaWV2ZWQgd2l0aCBDU1Mgb25seVxuICAgIHRpcC5jbGFzc0xpc3QuYWRkKGBicy0ke3RoaXMuY29uc3RydWN0b3IuTkFNRX0tYXV0b2ApO1xuICAgIGNvbnN0IHRpcElkID0gZ2V0VUlEKHRoaXMuY29uc3RydWN0b3IuTkFNRSkudG9TdHJpbmcoKTtcbiAgICB0aXAuc2V0QXR0cmlidXRlKCdpZCcsIHRpcElkKTtcbiAgICBpZiAodGhpcy5faXNBbmltYXRlZCgpKSB7XG4gICAgICB0aXAuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0ZBREUkMik7XG4gICAgfVxuICAgIHJldHVybiB0aXA7XG4gIH1cbiAgc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgdGhpcy5fbmV3Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgaWYgKHRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpO1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG4gIF9nZXRUZW1wbGF0ZUZhY3RvcnkoY29udGVudCkge1xuICAgIGlmICh0aGlzLl90ZW1wbGF0ZUZhY3RvcnkpIHtcbiAgICAgIHRoaXMuX3RlbXBsYXRlRmFjdG9yeS5jaGFuZ2VDb250ZW50KGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90ZW1wbGF0ZUZhY3RvcnkgPSBuZXcgVGVtcGxhdGVGYWN0b3J5KHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICAvLyB0aGUgYGNvbnRlbnRgIHZhciBoYXMgdG8gYmUgYWZ0ZXIgYHRoaXMuX2NvbmZpZ2BcbiAgICAgICAgLy8gdG8gb3ZlcnJpZGUgY29uZmlnLmNvbnRlbnQgaW4gY2FzZSBvZiBwb3BvdmVyXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIGV4dHJhQ2xhc3M6IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKHRoaXMuX2NvbmZpZy5jdXN0b21DbGFzcylcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVGYWN0b3J5O1xuICB9XG4gIF9nZXRDb250ZW50Rm9yVGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFtTRUxFQ1RPUl9UT09MVElQX0lOTkVSXTogdGhpcy5fZ2V0VGl0bGUoKVxuICAgIH07XG4gIH1cbiAgX2dldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbih0aGlzLl9jb25maWcudGl0bGUpIHx8IHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLW9yaWdpbmFsLXRpdGxlJyk7XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9pbml0aWFsaXplT25EZWxlZ2F0ZWRUYXJnZXQoZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5nZXRPckNyZWF0ZUluc3RhbmNlKGV2ZW50LmRlbGVnYXRlVGFyZ2V0LCB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpKTtcbiAgfVxuICBfaXNBbmltYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmFuaW1hdGlvbiB8fCB0aGlzLnRpcCAmJiB0aGlzLnRpcC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9GQURFJDIpO1xuICB9XG4gIF9pc1Nob3duKCkge1xuICAgIHJldHVybiB0aGlzLnRpcCAmJiB0aGlzLnRpcC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TSE9XJDIpO1xuICB9XG4gIF9jcmVhdGVQb3BwZXIodGlwKSB7XG4gICAgY29uc3QgcGxhY2VtZW50ID0gZXhlY3V0ZSh0aGlzLl9jb25maWcucGxhY2VtZW50LCBbdGhpcywgdGlwLCB0aGlzLl9lbGVtZW50XSk7XG4gICAgY29uc3QgYXR0YWNobWVudCA9IEF0dGFjaG1lbnRNYXBbcGxhY2VtZW50LnRvVXBwZXJDYXNlKCldO1xuICAgIHJldHVybiBQb3BwZXIuY3JlYXRlUG9wcGVyKHRoaXMuX2VsZW1lbnQsIHRpcCwgdGhpcy5fZ2V0UG9wcGVyQ29uZmlnKGF0dGFjaG1lbnQpKTtcbiAgfVxuICBfZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9mZnNldFxuICAgIH0gPSB0aGlzLl9jb25maWc7XG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0LnNwbGl0KCcsJykubWFwKHZhbHVlID0+IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBwb3BwZXJEYXRhID0+IG9mZnNldChwb3BwZXJEYXRhLCB0aGlzLl9lbGVtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuICBfcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGV4ZWN1dGUoYXJnLCBbdGhpcy5fZWxlbWVudCwgdGhpcy5fZWxlbWVudF0pO1xuICB9XG4gIF9nZXRQb3BwZXJDb25maWcoYXR0YWNobWVudCkge1xuICAgIGNvbnN0IGRlZmF1bHRCc1BvcHBlckNvbmZpZyA9IHtcbiAgICAgIHBsYWNlbWVudDogYXR0YWNobWVudCxcbiAgICAgIG1vZGlmaWVyczogW3tcbiAgICAgICAgbmFtZTogJ2ZsaXAnLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgZmFsbGJhY2tQbGFjZW1lbnRzOiB0aGlzLl9jb25maWcuZmFsbGJhY2tQbGFjZW1lbnRzXG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBvZmZzZXQ6IHRoaXMuX2dldE9mZnNldCgpXG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBib3VuZGFyeTogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ2Fycm93JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGVsZW1lbnQ6IGAuJHt0aGlzLmNvbnN0cnVjdG9yLk5BTUV9LWFycm93YFxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdwcmVTZXRQbGFjZW1lbnQnLFxuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICBwaGFzZTogJ2JlZm9yZU1haW4nLFxuICAgICAgICBmbjogZGF0YSA9PiB7XG4gICAgICAgICAgLy8gUHJlLXNldCBQb3BwZXIncyBwbGFjZW1lbnQgYXR0cmlidXRlIGluIG9yZGVyIHRvIHJlYWQgdGhlIGFycm93IHNpemVzIHByb3Blcmx5LlxuICAgICAgICAgIC8vIE90aGVyd2lzZSwgUG9wcGVyIG1peGVzIHVwIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IGRpbWVuc2lvbnMgc2luY2UgdGhlIGluaXRpYWwgYXJyb3cgc3R5bGUgaXMgZm9yIHRvcCBwbGFjZW1lbnRcbiAgICAgICAgICB0aGlzLl9nZXRUaXBFbGVtZW50KCkuc2V0QXR0cmlidXRlKCdkYXRhLXBvcHBlci1wbGFjZW1lbnQnLCBkYXRhLnN0YXRlLnBsYWNlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1dXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGVmYXVsdEJzUG9wcGVyQ29uZmlnLFxuICAgICAgLi4uZXhlY3V0ZSh0aGlzLl9jb25maWcucG9wcGVyQ29uZmlnLCBbdW5kZWZpbmVkLCBkZWZhdWx0QnNQb3BwZXJDb25maWddKVxuICAgIH07XG4gIH1cbiAgX3NldExpc3RlbmVycygpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMuX2NvbmZpZy50cmlnZ2VyLnNwbGl0KCcgJyk7XG4gICAgZm9yIChjb25zdCB0cmlnZ2VyIG9mIHRyaWdnZXJzKSB7XG4gICAgICBpZiAodHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfQ0xJQ0skMSksIHRoaXMuX2NvbmZpZy5zZWxlY3RvciwgZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9pbml0aWFsaXplT25EZWxlZ2F0ZWRUYXJnZXQoZXZlbnQpO1xuICAgICAgICAgIGNvbnRleHQudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyICE9PSBUUklHR0VSX01BTlVBTCkge1xuICAgICAgICBjb25zdCBldmVudEluID0gdHJpZ2dlciA9PT0gVFJJR0dFUl9IT1ZFUiA/IHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX01PVVNFRU5URVIpIDogdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfRk9DVVNJTiQxKTtcbiAgICAgICAgY29uc3QgZXZlbnRPdXQgPSB0cmlnZ2VyID09PSBUUklHR0VSX0hPVkVSID8gdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfTU9VU0VMRUFWRSkgOiB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9GT0NVU09VVCQxKTtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIGV2ZW50SW4sIHRoaXMuX2NvbmZpZy5zZWxlY3RvciwgZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9pbml0aWFsaXplT25EZWxlZ2F0ZWRUYXJnZXQoZXZlbnQpO1xuICAgICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nID8gVFJJR0dFUl9GT0NVUyA6IFRSSUdHRVJfSE9WRVJdID0gdHJ1ZTtcbiAgICAgICAgICBjb250ZXh0Ll9lbnRlcigpO1xuICAgICAgICB9KTtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIGV2ZW50T3V0LCB0aGlzLl9jb25maWcuc2VsZWN0b3IsIGV2ZW50ID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5faW5pdGlhbGl6ZU9uRGVsZWdhdGVkVGFyZ2V0KGV2ZW50KTtcbiAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c291dCcgPyBUUklHR0VSX0ZPQ1VTIDogVFJJR0dFUl9IT1ZFUl0gPSBjb250ZXh0Ll9lbGVtZW50LmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICAgIGNvbnRleHQuX2xlYXZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9oaWRlTW9kYWxIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudC5jbG9zZXN0KFNFTEVDVE9SX01PREFMKSwgRVZFTlRfTU9EQUxfSElERSwgdGhpcy5faGlkZU1vZGFsSGFuZGxlcik7XG4gIH1cbiAgX2ZpeFRpdGxlKCkge1xuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5fZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJyk7XG4gICAgaWYgKCF0aXRsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgJiYgIXRoaXMuX2VsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRpdGxlKTtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtb3JpZ2luYWwtdGl0bGUnLCB0aXRsZSk7IC8vIERPIE5PVCBVU0UgSVQuIElzIG9ubHkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RpdGxlJyk7XG4gIH1cbiAgX2VudGVyKCkge1xuICAgIGlmICh0aGlzLl9pc1Nob3duKCkgfHwgdGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICB0aGlzLl9pc0hvdmVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pc0hvdmVyZWQgPSB0cnVlO1xuICAgIHRoaXMuX3NldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2lzSG92ZXJlZCkge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkuc2hvdyk7XG4gIH1cbiAgX2xlYXZlKCkge1xuICAgIGlmICh0aGlzLl9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faXNIb3ZlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5fc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2lzSG92ZXJlZCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkuaGlkZSk7XG4gIH1cbiAgX3NldFRpbWVvdXQoaGFuZGxlciwgdGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcbiAgICB0aGlzLl90aW1lb3V0ID0gc2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KTtcbiAgfVxuICBfaXNXaXRoQWN0aXZlVHJpZ2dlcigpIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLl9hY3RpdmVUcmlnZ2VyKS5pbmNsdWRlcyh0cnVlKTtcbiAgfVxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbnN0IGRhdGFBdHRyaWJ1dGVzID0gTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZXModGhpcy5fZWxlbWVudCk7XG4gICAgZm9yIChjb25zdCBkYXRhQXR0cmlidXRlIG9mIE9iamVjdC5rZXlzKGRhdGFBdHRyaWJ1dGVzKSkge1xuICAgICAgaWYgKERJU0FMTE9XRURfQVRUUklCVVRFUy5oYXMoZGF0YUF0dHJpYnV0ZSkpIHtcbiAgICAgICAgZGVsZXRlIGRhdGFBdHRyaWJ1dGVzW2RhdGFBdHRyaWJ1dGVdO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25maWcgPSB7XG4gICAgICAuLi5kYXRhQXR0cmlidXRlcyxcbiAgICAgIC4uLih0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fSlcbiAgICB9O1xuICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZyk7XG4gICAgY29uZmlnID0gdGhpcy5fY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpO1xuICAgIHRoaXMuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpO1xuICAgIHJldHVybiBjb25maWc7XG4gIH1cbiAgX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKSB7XG4gICAgY29uZmlnLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXIgPT09IGZhbHNlID8gZG9jdW1lbnQuYm9keSA6IGdldEVsZW1lbnQoY29uZmlnLmNvbnRhaW5lcik7XG4gICAgaWYgKHR5cGVvZiBjb25maWcuZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgICBjb25maWcuZGVsYXkgPSB7XG4gICAgICAgIHNob3c6IGNvbmZpZy5kZWxheSxcbiAgICAgICAgaGlkZTogY29uZmlnLmRlbGF5XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbmZpZy50aXRsZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbmZpZy50aXRsZSA9IGNvbmZpZy50aXRsZS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5jb250ZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgY29uZmlnLmNvbnRlbnQgPSBjb25maWcuY29udGVudC50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG4gIF9nZXREZWxlZ2F0ZUNvbmZpZygpIHtcbiAgICBjb25zdCBjb25maWcgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLl9jb25maWcpKSB7XG4gICAgICBpZiAodGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0W2tleV0gIT09IHZhbHVlKSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbmZpZy5zZWxlY3RvciA9IGZhbHNlO1xuICAgIGNvbmZpZy50cmlnZ2VyID0gJ21hbnVhbCc7XG5cbiAgICAvLyBJbiB0aGUgZnV0dXJlIGNhbiBiZSByZXBsYWNlZCB3aXRoOlxuICAgIC8vIGNvbnN0IGtleXNXaXRoRGlmZmVyZW50VmFsdWVzID0gT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnKS5maWx0ZXIoZW50cnkgPT4gdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0W2VudHJ5WzBdXSAhPT0gdGhpcy5fY29uZmlnW2VudHJ5WzBdXSlcbiAgICAvLyBgT2JqZWN0LmZyb21FbnRyaWVzKGtleXNXaXRoRGlmZmVyZW50VmFsdWVzKWBcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG4gIF9kaXNwb3NlUG9wcGVyKCkge1xuICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KCk7XG4gICAgICB0aGlzLl9wb3BwZXIgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy50aXApIHtcbiAgICAgIHRoaXMudGlwLnJlbW92ZSgpO1xuICAgICAgdGhpcy50aXAgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IFRvb2x0aXAuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzLCBjb25maWcpO1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApO1xuICAgICAgfVxuICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oVG9vbHRpcCk7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBwb3BvdmVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUkMyA9ICdwb3BvdmVyJztcbmNvbnN0IFNFTEVDVE9SX1RJVExFID0gJy5wb3BvdmVyLWhlYWRlcic7XG5jb25zdCBTRUxFQ1RPUl9DT05URU5UID0gJy5wb3BvdmVyLWJvZHknO1xuY29uc3QgRGVmYXVsdCQyID0ge1xuICAuLi5Ub29sdGlwLkRlZmF1bHQsXG4gIGNvbnRlbnQ6ICcnLFxuICBvZmZzZXQ6IFswLCA4XSxcbiAgcGxhY2VtZW50OiAncmlnaHQnLFxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJwb3BvdmVyXCIgcm9sZT1cInRvb2x0aXBcIj4nICsgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWFycm93XCI+PC9kaXY+JyArICc8aDMgY2xhc3M9XCJwb3BvdmVyLWhlYWRlclwiPjwvaDM+JyArICc8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PC9kaXY+JyArICc8L2Rpdj4nLFxuICB0cmlnZ2VyOiAnY2xpY2snXG59O1xuY29uc3QgRGVmYXVsdFR5cGUkMiA9IHtcbiAgLi4uVG9vbHRpcC5EZWZhdWx0VHlwZSxcbiAgY29udGVudDogJyhudWxsfHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKSdcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFBvcG92ZXIgZXh0ZW5kcyBUb29sdGlwIHtcbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHQkMjtcbiAgfVxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZSQyO1xuICB9XG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRSQzO1xuICB9XG5cbiAgLy8gT3ZlcnJpZGVzXG4gIF9pc1dpdGhDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRUaXRsZSgpIHx8IHRoaXMuX2dldENvbnRlbnQoKTtcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2dldENvbnRlbnRGb3JUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW1NFTEVDVE9SX1RJVExFXTogdGhpcy5fZ2V0VGl0bGUoKSxcbiAgICAgIFtTRUxFQ1RPUl9DT05URU5UXTogdGhpcy5fZ2V0Q29udGVudCgpXG4gICAgfTtcbiAgfVxuICBfZ2V0Q29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24odGhpcy5fY29uZmlnLmNvbnRlbnQpO1xuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gUG9wb3Zlci5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICB9XG4gICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihQb3BvdmVyKTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHNjcm9sbHNweS5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBOQU1FJDIgPSAnc2Nyb2xsc3B5JztcbmNvbnN0IERBVEFfS0VZJDIgPSAnYnMuc2Nyb2xsc3B5JztcbmNvbnN0IEVWRU5UX0tFWSQyID0gYC4ke0RBVEFfS0VZJDJ9YDtcbmNvbnN0IERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuY29uc3QgRVZFTlRfQUNUSVZBVEUgPSBgYWN0aXZhdGUke0VWRU5UX0tFWSQyfWA7XG5jb25zdCBFVkVOVF9DTElDSyA9IGBjbGljayR7RVZFTlRfS0VZJDJ9YDtcbmNvbnN0IEVWRU5UX0xPQURfREFUQV9BUEkkMSA9IGBsb2FkJHtFVkVOVF9LRVkkMn0ke0RBVEFfQVBJX0tFWX1gO1xuY29uc3QgQ0xBU1NfTkFNRV9EUk9QRE9XTl9JVEVNID0gJ2Ryb3Bkb3duLWl0ZW0nO1xuY29uc3QgQ0xBU1NfTkFNRV9BQ1RJVkUkMSA9ICdhY3RpdmUnO1xuY29uc3QgU0VMRUNUT1JfREFUQV9TUFkgPSAnW2RhdGEtYnMtc3B5PVwic2Nyb2xsXCJdJztcbmNvbnN0IFNFTEVDVE9SX1RBUkdFVF9MSU5LUyA9ICdbaHJlZl0nO1xuY29uc3QgU0VMRUNUT1JfTkFWX0xJU1RfR1JPVVAgPSAnLm5hdiwgLmxpc3QtZ3JvdXAnO1xuY29uc3QgU0VMRUNUT1JfTkFWX0xJTktTID0gJy5uYXYtbGluayc7XG5jb25zdCBTRUxFQ1RPUl9OQVZfSVRFTVMgPSAnLm5hdi1pdGVtJztcbmNvbnN0IFNFTEVDVE9SX0xJU1RfSVRFTVMgPSAnLmxpc3QtZ3JvdXAtaXRlbSc7XG5jb25zdCBTRUxFQ1RPUl9MSU5LX0lURU1TID0gYCR7U0VMRUNUT1JfTkFWX0xJTktTfSwgJHtTRUxFQ1RPUl9OQVZfSVRFTVN9ID4gJHtTRUxFQ1RPUl9OQVZfTElOS1N9LCAke1NFTEVDVE9SX0xJU1RfSVRFTVN9YDtcbmNvbnN0IFNFTEVDVE9SX0RST1BET1dOID0gJy5kcm9wZG93bic7XG5jb25zdCBTRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEUkMSA9ICcuZHJvcGRvd24tdG9nZ2xlJztcbmNvbnN0IERlZmF1bHQkMSA9IHtcbiAgb2Zmc2V0OiBudWxsLFxuICAvLyBUT0RPOiB2NiBAZGVwcmVjYXRlZCwga2VlcCBpdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgcmVhc29uc1xuICByb290TWFyZ2luOiAnMHB4IDBweCAtMjUlJyxcbiAgc21vb3RoU2Nyb2xsOiBmYWxzZSxcbiAgdGFyZ2V0OiBudWxsLFxuICB0aHJlc2hvbGQ6IFswLjEsIDAuNSwgMV1cbn07XG5jb25zdCBEZWZhdWx0VHlwZSQxID0ge1xuICBvZmZzZXQ6ICcobnVtYmVyfG51bGwpJyxcbiAgLy8gVE9ETyB2NiBAZGVwcmVjYXRlZCwga2VlcCBpdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgcmVhc29uc1xuICByb290TWFyZ2luOiAnc3RyaW5nJyxcbiAgc21vb3RoU2Nyb2xsOiAnYm9vbGVhbicsXG4gIHRhcmdldDogJ2VsZW1lbnQnLFxuICB0aHJlc2hvbGQ6ICdhcnJheSdcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFNjcm9sbFNweSBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICBzdXBlcihlbGVtZW50LCBjb25maWcpO1xuXG4gICAgLy8gdGhpcy5fZWxlbWVudCBpcyB0aGUgb2JzZXJ2YWJsZXNDb250YWluZXIgYW5kIGNvbmZpZy50YXJnZXQgdGhlIG1lbnUgbGlua3Mgd3JhcHBlclxuICAgIHRoaXMuX3RhcmdldExpbmtzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuX29ic2VydmFibGVTZWN0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLl9yb290RWxlbWVudCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudCkub3ZlcmZsb3dZID09PSAndmlzaWJsZScgPyBudWxsIDogdGhpcy5fZWxlbWVudDtcbiAgICB0aGlzLl9hY3RpdmVUYXJnZXQgPSBudWxsO1xuICAgIHRoaXMuX29ic2VydmVyID0gbnVsbDtcbiAgICB0aGlzLl9wcmV2aW91c1Njcm9sbERhdGEgPSB7XG4gICAgICB2aXNpYmxlRW50cnlUb3A6IDAsXG4gICAgICBwYXJlbnRTY3JvbGxUb3A6IDBcbiAgICB9O1xuICAgIHRoaXMucmVmcmVzaCgpOyAvLyBpbml0aWFsaXplXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdCQxO1xuICB9XG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlJDE7XG4gIH1cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FJDI7XG4gIH1cblxuICAvLyBQdWJsaWNcbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLl9pbml0aWFsaXplVGFyZ2V0c0FuZE9ic2VydmFibGVzKCk7XG4gICAgdGhpcy5fbWF5YmVFbmFibGVTbW9vdGhTY3JvbGwoKTtcbiAgICBpZiAodGhpcy5fb2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSB0aGlzLl9nZXROZXdPYnNlcnZlcigpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgdGhpcy5fb2JzZXJ2YWJsZVNlY3Rpb25zLnZhbHVlcygpKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHNlY3Rpb24pO1xuICAgIH1cbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICBzdXBlci5kaXNwb3NlKCk7XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIC8vIFRPRE86IG9uIHY2IHRhcmdldCBzaG91bGQgYmUgZ2l2ZW4gZXhwbGljaXRseSAmIHJlbW92ZSB0aGUge3RhcmdldDogJ3NzLXRhcmdldCd9IGNhc2VcbiAgICBjb25maWcudGFyZ2V0ID0gZ2V0RWxlbWVudChjb25maWcudGFyZ2V0KSB8fCBkb2N1bWVudC5ib2R5O1xuXG4gICAgLy8gVE9ETzogdjYgT25seSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgcmVhc29ucy4gVXNlIHJvb3RNYXJnaW4gb25seVxuICAgIGNvbmZpZy5yb290TWFyZ2luID0gY29uZmlnLm9mZnNldCA/IGAke2NvbmZpZy5vZmZzZXR9cHggMHB4IC0zMCVgIDogY29uZmlnLnJvb3RNYXJnaW47XG4gICAgaWYgKHR5cGVvZiBjb25maWcudGhyZXNob2xkID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnLnRocmVzaG9sZCA9IGNvbmZpZy50aHJlc2hvbGQuc3BsaXQoJywnKS5tYXAodmFsdWUgPT4gTnVtYmVyLnBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuICBfbWF5YmVFbmFibGVTbW9vdGhTY3JvbGwoKSB7XG4gICAgaWYgKCF0aGlzLl9jb25maWcuc21vb3RoU2Nyb2xsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdW5yZWdpc3RlciBhbnkgcHJldmlvdXMgbGlzdGVuZXJzXG4gICAgRXZlbnRIYW5kbGVyLm9mZih0aGlzLl9jb25maWcudGFyZ2V0LCBFVkVOVF9DTElDSyk7XG4gICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2NvbmZpZy50YXJnZXQsIEVWRU5UX0NMSUNLLCBTRUxFQ1RPUl9UQVJHRVRfTElOS1MsIGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IG9ic2VydmFibGVTZWN0aW9uID0gdGhpcy5fb2JzZXJ2YWJsZVNlY3Rpb25zLmdldChldmVudC50YXJnZXQuaGFzaCk7XG4gICAgICBpZiAob2JzZXJ2YWJsZVNlY3Rpb24pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuX3Jvb3RFbGVtZW50IHx8IHdpbmRvdztcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gb2JzZXJ2YWJsZVNlY3Rpb24ub2Zmc2V0VG9wIC0gdGhpcy5fZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgIGlmIChyb290LnNjcm9sbFRvKSB7XG4gICAgICAgICAgcm9vdC5zY3JvbGxUbyh7XG4gICAgICAgICAgICB0b3A6IGhlaWdodCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENocm9tZSA2MCBkb2Vzbid0IHN1cHBvcnQgYHNjcm9sbFRvYFxuICAgICAgICByb290LnNjcm9sbFRvcCA9IGhlaWdodDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBfZ2V0TmV3T2JzZXJ2ZXIoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3Q6IHRoaXMuX3Jvb3RFbGVtZW50LFxuICAgICAgdGhyZXNob2xkOiB0aGlzLl9jb25maWcudGhyZXNob2xkLFxuICAgICAgcm9vdE1hcmdpbjogdGhpcy5fY29uZmlnLnJvb3RNYXJnaW5cbiAgICB9O1xuICAgIHJldHVybiBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB0aGlzLl9vYnNlcnZlckNhbGxiYWNrKGVudHJpZXMpLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8vIFRoZSBsb2dpYyBvZiBzZWxlY3Rpb25cbiAgX29ic2VydmVyQ2FsbGJhY2soZW50cmllcykge1xuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBlbnRyeSA9PiB0aGlzLl90YXJnZXRMaW5rcy5nZXQoYCMke2VudHJ5LnRhcmdldC5pZH1gKTtcbiAgICBjb25zdCBhY3RpdmF0ZSA9IGVudHJ5ID0+IHtcbiAgICAgIHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YS52aXNpYmxlRW50cnlUb3AgPSBlbnRyeS50YXJnZXQub2Zmc2V0VG9wO1xuICAgICAgdGhpcy5fcHJvY2Vzcyh0YXJnZXRFbGVtZW50KGVudHJ5KSk7XG4gICAgfTtcbiAgICBjb25zdCBwYXJlbnRTY3JvbGxUb3AgPSAodGhpcy5fcm9vdEVsZW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5zY3JvbGxUb3A7XG4gICAgY29uc3QgdXNlclNjcm9sbHNEb3duID0gcGFyZW50U2Nyb2xsVG9wID49IHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YS5wYXJlbnRTY3JvbGxUb3A7XG4gICAgdGhpcy5fcHJldmlvdXNTY3JvbGxEYXRhLnBhcmVudFNjcm9sbFRvcCA9IHBhcmVudFNjcm9sbFRvcDtcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY2xlYXJBY3RpdmVDbGFzcyh0YXJnZXRFbGVtZW50KGVudHJ5KSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgZW50cnlJc0xvd2VyVGhhblByZXZpb3VzID0gZW50cnkudGFyZ2V0Lm9mZnNldFRvcCA+PSB0aGlzLl9wcmV2aW91c1Njcm9sbERhdGEudmlzaWJsZUVudHJ5VG9wO1xuICAgICAgLy8gaWYgd2UgYXJlIHNjcm9sbGluZyBkb3duLCBwaWNrIHRoZSBiaWdnZXIgb2Zmc2V0VG9wXG4gICAgICBpZiAodXNlclNjcm9sbHNEb3duICYmIGVudHJ5SXNMb3dlclRoYW5QcmV2aW91cykge1xuICAgICAgICBhY3RpdmF0ZShlbnRyeSk7XG4gICAgICAgIC8vIGlmIHBhcmVudCBpc24ndCBzY3JvbGxlZCwgbGV0J3Mga2VlcCB0aGUgZmlyc3QgdmlzaWJsZSBpdGVtLCBicmVha2luZyB0aGUgaXRlcmF0aW9uXG4gICAgICAgIGlmICghcGFyZW50U2Nyb2xsVG9wKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB3ZSBhcmUgc2Nyb2xsaW5nIHVwLCBwaWNrIHRoZSBzbWFsbGVzdCBvZmZzZXRUb3BcbiAgICAgIGlmICghdXNlclNjcm9sbHNEb3duICYmICFlbnRyeUlzTG93ZXJUaGFuUHJldmlvdXMpIHtcbiAgICAgICAgYWN0aXZhdGUoZW50cnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBfaW5pdGlhbGl6ZVRhcmdldHNBbmRPYnNlcnZhYmxlcygpIHtcbiAgICB0aGlzLl90YXJnZXRMaW5rcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgdGFyZ2V0TGlua3MgPSBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX1RBUkdFVF9MSU5LUywgdGhpcy5fY29uZmlnLnRhcmdldCk7XG4gICAgZm9yIChjb25zdCBhbmNob3Igb2YgdGFyZ2V0TGlua3MpIHtcbiAgICAgIC8vIGVuc3VyZSB0aGF0IHRoZSBhbmNob3IgaGFzIGFuIGlkIGFuZCBpcyBub3QgZGlzYWJsZWRcbiAgICAgIGlmICghYW5jaG9yLmhhc2ggfHwgaXNEaXNhYmxlZChhbmNob3IpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2JzZXJ2YWJsZVNlY3Rpb24gPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKGRlY29kZVVSSShhbmNob3IuaGFzaCksIHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgb2JzZXJ2YWJsZVNlY3Rpb24gZXhpc3RzICYgaXMgdmlzaWJsZVxuICAgICAgaWYgKGlzVmlzaWJsZShvYnNlcnZhYmxlU2VjdGlvbikpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0TGlua3Muc2V0KGRlY29kZVVSSShhbmNob3IuaGFzaCksIGFuY2hvcik7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTZWN0aW9ucy5zZXQoYW5jaG9yLmhhc2gsIG9ic2VydmFibGVTZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgX3Byb2Nlc3ModGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZVRhcmdldCA9PT0gdGFyZ2V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2NsZWFyQWN0aXZlQ2xhc3ModGhpcy5fY29uZmlnLnRhcmdldCk7XG4gICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQUNUSVZFJDEpO1xuICAgIHRoaXMuX2FjdGl2YXRlUGFyZW50cyh0YXJnZXQpO1xuICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0FDVElWQVRFLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiB0YXJnZXRcbiAgICB9KTtcbiAgfVxuICBfYWN0aXZhdGVQYXJlbnRzKHRhcmdldCkge1xuICAgIC8vIEFjdGl2YXRlIGRyb3Bkb3duIHBhcmVudHNcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BET1dOX0lURU0pKSB7XG4gICAgICBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0RST1BET1dOX1RPR0dMRSQxLCB0YXJnZXQuY2xvc2VzdChTRUxFQ1RPUl9EUk9QRE9XTikpLmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUkMSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgbGlzdEdyb3VwIG9mIFNlbGVjdG9yRW5naW5lLnBhcmVudHModGFyZ2V0LCBTRUxFQ1RPUl9OQVZfTElTVF9HUk9VUCkpIHtcbiAgICAgIC8vIFNldCB0cmlnZ2VyZWQgbGlua3MgcGFyZW50cyBhcyBhY3RpdmVcbiAgICAgIC8vIFdpdGggYm90aCA8dWw+IGFuZCA8bmF2PiBtYXJrdXAgYSBwYXJlbnQgaXMgdGhlIHByZXZpb3VzIHNpYmxpbmcgb2YgYW55IG5hdiBhbmNlc3RvclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIFNlbGVjdG9yRW5naW5lLnByZXYobGlzdEdyb3VwLCBTRUxFQ1RPUl9MSU5LX0lURU1TKSkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUkMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9jbGVhckFjdGl2ZUNsYXNzKHBhcmVudCkge1xuICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFJDEpO1xuICAgIGNvbnN0IGFjdGl2ZU5vZGVzID0gU2VsZWN0b3JFbmdpbmUuZmluZChgJHtTRUxFQ1RPUl9UQVJHRVRfTElOS1N9LiR7Q0xBU1NfTkFNRV9BQ1RJVkUkMX1gLCBwYXJlbnQpO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBhY3RpdmVOb2Rlcykge1xuICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFJDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IFNjcm9sbFNweS5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpZy5zdGFydHNXaXRoKCdfJykgfHwgY29uZmlnID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICB9XG4gICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKHdpbmRvdywgRVZFTlRfTE9BRF9EQVRBX0FQSSQxLCAoKSA9PiB7XG4gIGZvciAoY29uc3Qgc3B5IG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9TUFkpKSB7XG4gICAgU2Nyb2xsU3B5LmdldE9yQ3JlYXRlSW5zdGFuY2Uoc3B5KTtcbiAgfVxufSk7XG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKFNjcm9sbFNweSk7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB0YWIuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSQxID0gJ3RhYic7XG5jb25zdCBEQVRBX0tFWSQxID0gJ2JzLnRhYic7XG5jb25zdCBFVkVOVF9LRVkkMSA9IGAuJHtEQVRBX0tFWSQxfWA7XG5jb25zdCBFVkVOVF9ISURFJDEgPSBgaGlkZSR7RVZFTlRfS0VZJDF9YDtcbmNvbnN0IEVWRU5UX0hJRERFTiQxID0gYGhpZGRlbiR7RVZFTlRfS0VZJDF9YDtcbmNvbnN0IEVWRU5UX1NIT1ckMSA9IGBzaG93JHtFVkVOVF9LRVkkMX1gO1xuY29uc3QgRVZFTlRfU0hPV04kMSA9IGBzaG93biR7RVZFTlRfS0VZJDF9YDtcbmNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJID0gYGNsaWNrJHtFVkVOVF9LRVkkMX1gO1xuY29uc3QgRVZFTlRfS0VZRE9XTiA9IGBrZXlkb3duJHtFVkVOVF9LRVkkMX1gO1xuY29uc3QgRVZFTlRfTE9BRF9EQVRBX0FQSSA9IGBsb2FkJHtFVkVOVF9LRVkkMX1gO1xuY29uc3QgQVJST1dfTEVGVF9LRVkgPSAnQXJyb3dMZWZ0JztcbmNvbnN0IEFSUk9XX1JJR0hUX0tFWSA9ICdBcnJvd1JpZ2h0JztcbmNvbnN0IEFSUk9XX1VQX0tFWSA9ICdBcnJvd1VwJztcbmNvbnN0IEFSUk9XX0RPV05fS0VZID0gJ0Fycm93RG93bic7XG5jb25zdCBIT01FX0tFWSA9ICdIb21lJztcbmNvbnN0IEVORF9LRVkgPSAnRW5kJztcbmNvbnN0IENMQVNTX05BTUVfQUNUSVZFID0gJ2FjdGl2ZSc7XG5jb25zdCBDTEFTU19OQU1FX0ZBREUkMSA9ICdmYWRlJztcbmNvbnN0IENMQVNTX05BTUVfU0hPVyQxID0gJ3Nob3cnO1xuY29uc3QgQ0xBU1NfRFJPUERPV04gPSAnZHJvcGRvd24nO1xuY29uc3QgU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFID0gJy5kcm9wZG93bi10b2dnbGUnO1xuY29uc3QgU0VMRUNUT1JfRFJPUERPV05fTUVOVSA9ICcuZHJvcGRvd24tbWVudSc7XG5jb25zdCBOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFID0gYDpub3QoJHtTRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEV9KWA7XG5jb25zdCBTRUxFQ1RPUl9UQUJfUEFORUwgPSAnLmxpc3QtZ3JvdXAsIC5uYXYsIFtyb2xlPVwidGFibGlzdFwiXSc7XG5jb25zdCBTRUxFQ1RPUl9PVVRFUiA9ICcubmF2LWl0ZW0sIC5saXN0LWdyb3VwLWl0ZW0nO1xuY29uc3QgU0VMRUNUT1JfSU5ORVIgPSBgLm5hdi1saW5rJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfSwgLmxpc3QtZ3JvdXAtaXRlbSR7Tk9UX1NFTEVDVE9SX0RST1BET1dOX1RPR0dMRX0sIFtyb2xlPVwidGFiXCJdJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfWA7XG5jb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSA9ICdbZGF0YS1icy10b2dnbGU9XCJ0YWJcIl0sIFtkYXRhLWJzLXRvZ2dsZT1cInBpbGxcIl0sIFtkYXRhLWJzLXRvZ2dsZT1cImxpc3RcIl0nOyAvLyBUT0RPOiBjb3VsZCBvbmx5IGJlIGB0YWJgIGluIHY2XG5jb25zdCBTRUxFQ1RPUl9JTk5FUl9FTEVNID0gYCR7U0VMRUNUT1JfSU5ORVJ9LCAke1NFTEVDVE9SX0RBVEFfVE9HR0xFfWA7XG5jb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRV9BQ1RJVkUgPSBgLiR7Q0xBU1NfTkFNRV9BQ1RJVkV9W2RhdGEtYnMtdG9nZ2xlPVwidGFiXCJdLCAuJHtDTEFTU19OQU1FX0FDVElWRX1bZGF0YS1icy10b2dnbGU9XCJwaWxsXCJdLCAuJHtDTEFTU19OQU1FX0FDVElWRX1bZGF0YS1icy10b2dnbGU9XCJsaXN0XCJdYDtcblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgVGFiIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfVEFCX1BBTkVMKTtcbiAgICBpZiAoIXRoaXMuX3BhcmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgICAgLy8gVE9ETzogc2hvdWxkIHRocm93IGV4Y2VwdGlvbiBpbiB2NlxuICAgICAgLy8gdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtlbGVtZW50Lm91dGVySFRNTH0gaGFzIG5vdCBhIHZhbGlkIHBhcmVudCAke1NFTEVDVE9SX0lOTkVSX0VMRU19YClcbiAgICB9XG5cbiAgICAvLyBTZXQgdXAgaW5pdGlhbCBhcmlhIGF0dHJpYnV0ZXNcbiAgICB0aGlzLl9zZXRJbml0aWFsQXR0cmlidXRlcyh0aGlzLl9wYXJlbnQsIHRoaXMuX2dldENoaWxkcmVuKCkpO1xuICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9LRVlET1dOLCBldmVudCA9PiB0aGlzLl9rZXlkb3duKGV2ZW50KSk7XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRSQxO1xuICB9XG5cbiAgLy8gUHVibGljXG4gIHNob3coKSB7XG4gICAgLy8gU2hvd3MgdGhpcyBlbGVtIGFuZCBkZWFjdGl2YXRlIHRoZSBhY3RpdmUgc2libGluZyBpZiBleGlzdHNcbiAgICBjb25zdCBpbm5lckVsZW0gPSB0aGlzLl9lbGVtZW50O1xuICAgIGlmICh0aGlzLl9lbGVtSXNBY3RpdmUoaW5uZXJFbGVtKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNlYXJjaCBmb3IgYWN0aXZlIHRhYiBvbiBzYW1lIHBhcmVudCB0byBkZWFjdGl2YXRlIGl0XG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5fZ2V0QWN0aXZlRWxlbSgpO1xuICAgIGNvbnN0IGhpZGVFdmVudCA9IGFjdGl2ZSA/IEV2ZW50SGFuZGxlci50cmlnZ2VyKGFjdGl2ZSwgRVZFTlRfSElERSQxLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiBpbm5lckVsZW1cbiAgICB9KSA6IG51bGw7XG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIoaW5uZXJFbGVtLCBFVkVOVF9TSE9XJDEsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IGFjdGl2ZVxuICAgIH0pO1xuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCB8fCBoaWRlRXZlbnQgJiYgaGlkZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGVhY3RpdmF0ZShhY3RpdmUsIGlubmVyRWxlbSk7XG4gICAgdGhpcy5fYWN0aXZhdGUoaW5uZXJFbGVtLCBhY3RpdmUpO1xuICB9XG5cbiAgLy8gUHJpdmF0ZVxuICBfYWN0aXZhdGUoZWxlbWVudCwgcmVsYXRlZEVsZW0pIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQUNUSVZFKTtcbiAgICB0aGlzLl9hY3RpdmF0ZShTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKGVsZW1lbnQpKTsgLy8gU2VhcmNoIGFuZCBhY3RpdmF0ZS9zaG93IHRoZSBwcm9wZXIgc2VjdGlvblxuXG4gICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSAhPT0gJ3RhYicpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHRydWUpO1xuICAgICAgdGhpcy5fdG9nZ2xlRHJvcERvd24oZWxlbWVudCwgdHJ1ZSk7XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcihlbGVtZW50LCBFVkVOVF9TSE9XTiQxLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRFbGVtXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIGVsZW1lbnQsIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRkFERSQxKSk7XG4gIH1cbiAgX2RlYWN0aXZhdGUoZWxlbWVudCwgcmVsYXRlZEVsZW0pIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFKTtcbiAgICBlbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLl9kZWFjdGl2YXRlKFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudCkpOyAvLyBTZWFyY2ggYW5kIGRlYWN0aXZhdGUgdGhlIHNob3duIHNlY3Rpb24gdG9vXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAndGFiJykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgdGhpcy5fdG9nZ2xlRHJvcERvd24oZWxlbWVudCwgZmFsc2UpO1xuICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIoZWxlbWVudCwgRVZFTlRfSElEREVOJDEsIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogcmVsYXRlZEVsZW1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgZWxlbWVudCwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9GQURFJDEpKTtcbiAgfVxuICBfa2V5ZG93bihldmVudCkge1xuICAgIGlmICghW0FSUk9XX0xFRlRfS0VZLCBBUlJPV19SSUdIVF9LRVksIEFSUk9XX1VQX0tFWSwgQVJST1dfRE9XTl9LRVksIEhPTUVfS0VZLCBFTkRfS0VZXS5pbmNsdWRlcyhldmVudC5rZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyBzdG9wUHJvcGFnYXRpb24vcHJldmVudERlZmF1bHQgYm90aCBhZGRlZCB0byBzdXBwb3J0IHVwL2Rvd24ga2V5cyB3aXRob3V0IHNjcm9sbGluZyB0aGUgcGFnZVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLl9nZXRDaGlsZHJlbigpLmZpbHRlcihlbGVtZW50ID0+ICFpc0Rpc2FibGVkKGVsZW1lbnQpKTtcbiAgICBsZXQgbmV4dEFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKFtIT01FX0tFWSwgRU5EX0tFWV0uaW5jbHVkZXMoZXZlbnQua2V5KSkge1xuICAgICAgbmV4dEFjdGl2ZUVsZW1lbnQgPSBjaGlsZHJlbltldmVudC5rZXkgPT09IEhPTUVfS0VZID8gMCA6IGNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpc05leHQgPSBbQVJST1dfUklHSFRfS0VZLCBBUlJPV19ET1dOX0tFWV0uaW5jbHVkZXMoZXZlbnQua2V5KTtcbiAgICAgIG5leHRBY3RpdmVFbGVtZW50ID0gZ2V0TmV4dEFjdGl2ZUVsZW1lbnQoY2hpbGRyZW4sIGV2ZW50LnRhcmdldCwgaXNOZXh0LCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKG5leHRBY3RpdmVFbGVtZW50KSB7XG4gICAgICBuZXh0QWN0aXZlRWxlbWVudC5mb2N1cyh7XG4gICAgICAgIHByZXZlbnRTY3JvbGw6IHRydWVcbiAgICAgIH0pO1xuICAgICAgVGFiLmdldE9yQ3JlYXRlSW5zdGFuY2UobmV4dEFjdGl2ZUVsZW1lbnQpLnNob3coKTtcbiAgICB9XG4gIH1cbiAgX2dldENoaWxkcmVuKCkge1xuICAgIC8vIGNvbGxlY3Rpb24gb2YgaW5uZXIgZWxlbWVudHNcbiAgICByZXR1cm4gU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9JTk5FUl9FTEVNLCB0aGlzLl9wYXJlbnQpO1xuICB9XG4gIF9nZXRBY3RpdmVFbGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRDaGlsZHJlbigpLmZpbmQoY2hpbGQgPT4gdGhpcy5fZWxlbUlzQWN0aXZlKGNoaWxkKSkgfHwgbnVsbDtcbiAgfVxuICBfc2V0SW5pdGlhbEF0dHJpYnV0ZXMocGFyZW50LCBjaGlsZHJlbikge1xuICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKHBhcmVudCwgJ3JvbGUnLCAndGFibGlzdCcpO1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuX3NldEluaXRpYWxBdHRyaWJ1dGVzT25DaGlsZChjaGlsZCk7XG4gICAgfVxuICB9XG4gIF9zZXRJbml0aWFsQXR0cmlidXRlc09uQ2hpbGQoY2hpbGQpIHtcbiAgICBjaGlsZCA9IHRoaXMuX2dldElubmVyRWxlbWVudChjaGlsZCk7XG4gICAgY29uc3QgaXNBY3RpdmUgPSB0aGlzLl9lbGVtSXNBY3RpdmUoY2hpbGQpO1xuICAgIGNvbnN0IG91dGVyRWxlbSA9IHRoaXMuX2dldE91dGVyRWxlbWVudChjaGlsZCk7XG4gICAgY2hpbGQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgaXNBY3RpdmUpO1xuICAgIGlmIChvdXRlckVsZW0gIT09IGNoaWxkKSB7XG4gICAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyhvdXRlckVsZW0sICdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuICAgIH1cbiAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgfVxuICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKGNoaWxkLCAncm9sZScsICd0YWInKTtcblxuICAgIC8vIHNldCBhdHRyaWJ1dGVzIHRvIHRoZSByZWxhdGVkIHBhbmVsIHRvb1xuICAgIHRoaXMuX3NldEluaXRpYWxBdHRyaWJ1dGVzT25UYXJnZXRQYW5lbChjaGlsZCk7XG4gIH1cbiAgX3NldEluaXRpYWxBdHRyaWJ1dGVzT25UYXJnZXRQYW5lbChjaGlsZCkge1xuICAgIGNvbnN0IHRhcmdldCA9IFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoY2hpbGQpO1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKHRhcmdldCwgJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICBpZiAoY2hpbGQuaWQpIHtcbiAgICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKHRhcmdldCwgJ2FyaWEtbGFiZWxsZWRieScsIGAke2NoaWxkLmlkfWApO1xuICAgIH1cbiAgfVxuICBfdG9nZ2xlRHJvcERvd24oZWxlbWVudCwgb3Blbikge1xuICAgIGNvbnN0IG91dGVyRWxlbSA9IHRoaXMuX2dldE91dGVyRWxlbWVudChlbGVtZW50KTtcbiAgICBpZiAoIW91dGVyRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfRFJPUERPV04pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRvZ2dsZSA9IChzZWxlY3RvciwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3Rvciwgb3V0ZXJFbGVtKTtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUsIG9wZW4pO1xuICAgICAgfVxuICAgIH07XG4gICAgdG9nZ2xlKFNFTEVDVE9SX0RST1BET1dOX1RPR0dMRSwgQ0xBU1NfTkFNRV9BQ1RJVkUpO1xuICAgIHRvZ2dsZShTRUxFQ1RPUl9EUk9QRE9XTl9NRU5VLCBDTEFTU19OQU1FX1NIT1ckMSk7XG4gICAgb3V0ZXJFbGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW4pO1xuICB9XG4gIF9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyhlbGVtZW50LCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgX2VsZW1Jc0FjdGl2ZShlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfQUNUSVZFKTtcbiAgfVxuXG4gIC8vIFRyeSB0byBnZXQgdGhlIGlubmVyIGVsZW1lbnQgKHVzdWFsbHkgdGhlIC5uYXYtbGluaylcbiAgX2dldElubmVyRWxlbWVudChlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0ubWF0Y2hlcyhTRUxFQ1RPUl9JTk5FUl9FTEVNKSA/IGVsZW0gOiBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0lOTkVSX0VMRU0sIGVsZW0pO1xuICB9XG5cbiAgLy8gVHJ5IHRvIGdldCB0aGUgb3V0ZXIgZWxlbWVudCAodXN1YWxseSB0aGUgLm5hdi1pdGVtKVxuICBfZ2V0T3V0ZXJFbGVtZW50KGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5jbG9zZXN0KFNFTEVDVE9SX09VVEVSKSB8fCBlbGVtO1xuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gVGFiLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcyk7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpZy5zdGFydHNXaXRoKCdfJykgfHwgY29uZmlnID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICB9XG4gICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSwgU0VMRUNUT1JfREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoWydBJywgJ0FSRUEnXS5pbmNsdWRlcyh0aGlzLnRhZ05hbWUpKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAoaXNEaXNhYmxlZCh0aGlzKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKS5zaG93KCk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIG9uIGZvY3VzXG4gKi9cbkV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX0xPQURfREFUQV9BUEksICgpID0+IHtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9UT0dHTEVfQUNUSVZFKSkge1xuICAgIFRhYi5nZXRPckNyZWF0ZUluc3RhbmNlKGVsZW1lbnQpO1xuICB9XG59KTtcbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKFRhYik7XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB0b2FzdC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBOQU1FID0gJ3RvYXN0JztcbmNvbnN0IERBVEFfS0VZID0gJ2JzLnRvYXN0JztcbmNvbnN0IEVWRU5UX0tFWSA9IGAuJHtEQVRBX0tFWX1gO1xuY29uc3QgRVZFTlRfTU9VU0VPVkVSID0gYG1vdXNlb3ZlciR7RVZFTlRfS0VZfWA7XG5jb25zdCBFVkVOVF9NT1VTRU9VVCA9IGBtb3VzZW91dCR7RVZFTlRfS0VZfWA7XG5jb25zdCBFVkVOVF9GT0NVU0lOID0gYGZvY3VzaW4ke0VWRU5UX0tFWX1gO1xuY29uc3QgRVZFTlRfRk9DVVNPVVQgPSBgZm9jdXNvdXQke0VWRU5UX0tFWX1gO1xuY29uc3QgRVZFTlRfSElERSA9IGBoaWRlJHtFVkVOVF9LRVl9YDtcbmNvbnN0IEVWRU5UX0hJRERFTiA9IGBoaWRkZW4ke0VWRU5UX0tFWX1gO1xuY29uc3QgRVZFTlRfU0hPVyA9IGBzaG93JHtFVkVOVF9LRVl9YDtcbmNvbnN0IEVWRU5UX1NIT1dOID0gYHNob3duJHtFVkVOVF9LRVl9YDtcbmNvbnN0IENMQVNTX05BTUVfRkFERSA9ICdmYWRlJztcbmNvbnN0IENMQVNTX05BTUVfSElERSA9ICdoaWRlJzsgLy8gQGRlcHJlY2F0ZWQgLSBrZXB0IGhlcmUgb25seSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbmNvbnN0IENMQVNTX05BTUVfU0hPVyA9ICdzaG93JztcbmNvbnN0IENMQVNTX05BTUVfU0hPV0lORyA9ICdzaG93aW5nJztcbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICBhbmltYXRpb246ICdib29sZWFuJyxcbiAgYXV0b2hpZGU6ICdib29sZWFuJyxcbiAgZGVsYXk6ICdudW1iZXInXG59O1xuY29uc3QgRGVmYXVsdCA9IHtcbiAgYW5pbWF0aW9uOiB0cnVlLFxuICBhdXRvaGlkZTogdHJ1ZSxcbiAgZGVsYXk6IDUwMDBcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFRvYXN0IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHN1cGVyKGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgdGhpcy5fdGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5faGFzTW91c2VJbnRlcmFjdGlvbiA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc0tleWJvYXJkSW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICB0aGlzLl9zZXRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0O1xuICB9XG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlO1xuICB9XG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRTtcbiAgfVxuXG4gIC8vIFB1YmxpY1xuICBzaG93KCkge1xuICAgIGNvbnN0IHNob3dFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1cpO1xuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jbGVhclRpbWVvdXQoKTtcbiAgICBpZiAodGhpcy5fY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfRkFERSk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPV0lORyk7XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTik7XG4gICAgICB0aGlzLl9tYXliZVNjaGVkdWxlSGlkZSgpO1xuICAgIH07XG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfSElERSk7IC8vIEBkZXByZWNhdGVkXG4gICAgcmVmbG93KHRoaXMuX2VsZW1lbnQpO1xuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1csIENMQVNTX05BTUVfU0hPV0lORyk7XG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy5fZWxlbWVudCwgdGhpcy5fY29uZmlnLmFuaW1hdGlvbik7XG4gIH1cbiAgaGlkZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTaG93bigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUpO1xuICAgIGlmIChoaWRlRXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0hJREUpOyAvLyBAZGVwcmVjYXRlZFxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPV0lORywgQ0xBU1NfTkFNRV9TSE9XKTtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJRERFTik7XG4gICAgfTtcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XSU5HKTtcbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCB0aGlzLl9lbGVtZW50LCB0aGlzLl9jb25maWcuYW5pbWF0aW9uKTtcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuX2NsZWFyVGltZW91dCgpO1xuICAgIGlmICh0aGlzLmlzU2hvd24oKSkge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVyk7XG4gICAgfVxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgfVxuICBpc1Nob3duKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX1NIT1cpO1xuICB9XG5cbiAgLy8gUHJpdmF0ZVxuICBfbWF5YmVTY2hlZHVsZUhpZGUoKSB7XG4gICAgaWYgKCF0aGlzLl9jb25maWcuYXV0b2hpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2hhc01vdXNlSW50ZXJhY3Rpb24gfHwgdGhpcy5faGFzS2V5Ym9hcmRJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl90aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkpO1xuICB9XG4gIF9vbkludGVyYWN0aW9uKGV2ZW50LCBpc0ludGVyYWN0aW5nKSB7XG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgY2FzZSAnbW91c2VvdXQnOlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5faGFzTW91c2VJbnRlcmFjdGlvbiA9IGlzSW50ZXJhY3Rpbmc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ2ZvY3VzaW4nOlxuICAgICAgY2FzZSAnZm9jdXNvdXQnOlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5faGFzS2V5Ym9hcmRJbnRlcmFjdGlvbiA9IGlzSW50ZXJhY3Rpbmc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzSW50ZXJhY3RpbmcpIHtcbiAgICAgIHRoaXMuX2NsZWFyVGltZW91dCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0RWxlbWVudCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQgPT09IG5leHRFbGVtZW50IHx8IHRoaXMuX2VsZW1lbnQuY29udGFpbnMobmV4dEVsZW1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21heWJlU2NoZWR1bGVIaWRlKCk7XG4gIH1cbiAgX3NldExpc3RlbmVycygpIHtcbiAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfTU9VU0VPVkVSLCBldmVudCA9PiB0aGlzLl9vbkludGVyYWN0aW9uKGV2ZW50LCB0cnVlKSk7XG4gICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFT1VULCBldmVudCA9PiB0aGlzLl9vbkludGVyYWN0aW9uKGV2ZW50LCBmYWxzZSkpO1xuICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9GT0NVU0lOLCBldmVudCA9PiB0aGlzLl9vbkludGVyYWN0aW9uKGV2ZW50LCB0cnVlKSk7XG4gICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0ZPQ1VTT1VULCBldmVudCA9PiB0aGlzLl9vbkludGVyYWN0aW9uKGV2ZW50LCBmYWxzZSkpO1xuICB9XG4gIF9jbGVhclRpbWVvdXQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuICAgIHRoaXMuX3RpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gVG9hc3QuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzLCBjb25maWcpO1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAqL1xuXG5lbmFibGVEaXNtaXNzVHJpZ2dlcihUb2FzdCk7XG5cbi8qKlxuICogalF1ZXJ5XG4gKi9cblxuZGVmaW5lSlF1ZXJ5UGx1Z2luKFRvYXN0KTtcblxuZXhwb3J0IHsgQWxlcnQsIEJ1dHRvbiwgQ2Fyb3VzZWwsIENvbGxhcHNlLCBEcm9wZG93biwgTW9kYWwsIE9mZmNhbnZhcywgUG9wb3ZlciwgU2Nyb2xsU3B5LCBUYWIsIFRvYXN0LCBUb29sdGlwIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib290c3RyYXAuZXNtLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9