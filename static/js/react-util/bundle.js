/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PropTypes = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if ("development" !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        "development" !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error) : void 0;
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          "development" !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '') : void 0;
        }
      }
    }
  }
}

module.exports = checkPropTypes;

},{"./lib/ReactPropTypesSecret":4,"fbjs/lib/invariant":6,"fbjs/lib/warning":7}],2:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function (isValidElement) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  var ReactPropTypes;

  if ("development" !== 'production') {
    // Keep in sync with production version below
    ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker
    };
  } else {
    var productionTypeChecker = function () {
      invariant(false, 'React.PropTypes type checking code is stripped in production.');
    };
    productionTypeChecker.isRequired = productionTypeChecker;
    var getProductionTypeChecker = function () {
      return productionTypeChecker;
    };
    // Keep in sync with development version above
    ReactPropTypes = {
      array: productionTypeChecker,
      bool: productionTypeChecker,
      func: productionTypeChecker,
      number: productionTypeChecker,
      object: productionTypeChecker,
      string: productionTypeChecker,
      symbol: productionTypeChecker,

      any: productionTypeChecker,
      arrayOf: getProductionTypeChecker,
      element: productionTypeChecker,
      instanceOf: getProductionTypeChecker,
      node: productionTypeChecker,
      objectOf: getProductionTypeChecker,
      oneOf: getProductionTypeChecker,
      oneOfType: getProductionTypeChecker,
      shape: getProductionTypeChecker
    };
  }

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if ("development" !== 'production') {
      var manualPropTypeCallCache = {};
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if ("development" !== 'production') {
        if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey]) {
            "development" !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
            manualPropTypeCallCache[cacheKey] = true;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      "development" !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      "development" !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./checkPropTypes":1,"./lib/ReactPropTypesSecret":4,"fbjs/lib/emptyFunction":5,"fbjs/lib/invariant":6,"fbjs/lib/warning":7}],3:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var factory = require('./factory');

var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
  Symbol.for &&
  Symbol.for('react.element')) ||
  0xeac7;

function isValidElement(object) {
  return typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE;
}

module.exports = factory(isValidElement);

},{"./factory":2}],4:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],5:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],6:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ("development" !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],7:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("development" !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
},{"./emptyFunction":5}]},{},[3])(3)
});(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Slider"] = factory(require("react"), require("react-dom"));
	else
		root["Slider"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _innerSlider = __webpack_require__(3);

	var _objectAssign = __webpack_require__(7);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _json2mq = __webpack_require__(15);

	var _json2mq2 = _interopRequireDefault(_json2mq);

	var _reactResponsiveMixin = __webpack_require__(17);

	var _reactResponsiveMixin2 = _interopRequireDefault(_reactResponsiveMixin);

	var _defaultProps = __webpack_require__(10);

	var _defaultProps2 = _interopRequireDefault(_defaultProps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Slider = _react2.default.createClass({
	  displayName: 'Slider',

	  mixins: [_reactResponsiveMixin2.default],
	  innerSlider: null,
	  innerSliderRefHandler: function innerSliderRefHandler(ref) {
	    this.innerSlider = ref;
	  },
	  getInitialState: function getInitialState() {
	    return {
	      breakpoint: null
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    if (this.props.responsive) {
	      var breakpoints = this.props.responsive.map(function (breakpt) {
	        return breakpt.breakpoint;
	      });
	      breakpoints.sort(function (x, y) {
	        return x - y;
	      });

	      breakpoints.forEach(function (breakpoint, index) {
	        var bQuery;
	        if (index === 0) {
	          bQuery = (0, _json2mq2.default)({ minWidth: 0, maxWidth: breakpoint });
	        } else {
	          bQuery = (0, _json2mq2.default)({ minWidth: breakpoints[index - 1], maxWidth: breakpoint });
	        }
	        _this.media(bQuery, function () {
	          _this.setState({ breakpoint: breakpoint });
	        });
	      });

	      // Register media query for full screen. Need to support resize from small to large
	      var query = (0, _json2mq2.default)({ minWidth: breakpoints.slice(-1)[0] });

	      this.media(query, function () {
	        _this.setState({ breakpoint: null });
	      });
	    }
	  },

	  slickPrev: function slickPrev() {
	    this.innerSlider.slickPrev();
	  },

	  slickNext: function slickNext() {
	    this.innerSlider.slickNext();
	  },

	  slickGoTo: function slickGoTo(slide) {
	    this.innerSlider.slickGoTo(slide);
	  },

	  render: function render() {
	    var _this2 = this;

	    var settings;
	    var newProps;
	    if (this.state.breakpoint) {
	      newProps = this.props.responsive.filter(function (resp) {
	        return resp.breakpoint === _this2.state.breakpoint;
	      });
	      settings = newProps[0].settings === 'unslick' ? 'unslick' : (0, _objectAssign2.default)({}, this.props, newProps[0].settings);
	    } else {
	      settings = (0, _objectAssign2.default)({}, _defaultProps2.default, this.props);
	    }

	    var children = this.props.children;
	    if (!Array.isArray(children)) {
	      children = [children];
	    }

	    // Children may contain false or null, so we should filter them
	    children = children.filter(function (child) {
	      return !!child;
	    });

	    if (settings === 'unslick') {
	      // if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML
	      return _react2.default.createElement(
	        'div',
	        null,
	        children
	      );
	    } else {
	      return _react2.default.createElement(
	        _innerSlider.InnerSlider,
	        _extends({ ref: this.innerSliderRefHandler }, settings),
	        children
	      );
	    }
	  }
	});

	module.exports = Slider;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.InnerSlider = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _eventHandlers = __webpack_require__(4);

	var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

	var _helpers = __webpack_require__(8);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _initialState = __webpack_require__(9);

	var _initialState2 = _interopRequireDefault(_initialState);

	var _defaultProps = __webpack_require__(10);

	var _defaultProps2 = _interopRequireDefault(_defaultProps);

	var _classnames = __webpack_require__(11);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _objectAssign = __webpack_require__(7);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _track = __webpack_require__(12);

	var _dots = __webpack_require__(13);

	var _arrows = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var InnerSlider = exports.InnerSlider = _react2.default.createClass({
	  displayName: 'InnerSlider',

	  mixins: [_helpers2.default, _eventHandlers2.default],
	  list: null,
	  track: null,
	  listRefHandler: function listRefHandler(ref) {
	    this.list = ref;
	  },
	  trackRefHandler: function trackRefHandler(ref) {
	    this.track = ref;
	  },
	  getInitialState: function getInitialState() {
	    return _extends({}, _initialState2.default, {
	      currentSlide: this.props.initialSlide
	    });
	  },
	  getDefaultProps: function getDefaultProps() {
	    return _defaultProps2.default;
	  },
	  componentWillMount: function componentWillMount() {
	    if (this.props.init) {
	      this.props.init();
	    }
	    this.setState({
	      mounted: true
	    });
	    var lazyLoadedList = [];
	    for (var i = 0; i < _react2.default.Children.count(this.props.children); i++) {
	      if (i >= this.state.currentSlide && i < this.state.currentSlide + this.props.slidesToShow) {
	        lazyLoadedList.push(i);
	      }
	    }

	    if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {
	      this.setState({
	        lazyLoadedList: lazyLoadedList
	      });
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    // Hack for autoplay -- Inspect Later
	    this.initialize(this.props);
	    this.adaptHeight();

	    // To support server-side rendering
	    if (!window) {
	      return;
	    }
	    if (window.addEventListener) {
	      window.addEventListener('resize', this.onWindowResized);
	    } else {
	      window.attachEvent('onresize', this.onWindowResized);
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.animationEndCallback) {
	      clearTimeout(this.animationEndCallback);
	    }
	    if (window.addEventListener) {
	      window.removeEventListener('resize', this.onWindowResized);
	    } else {
	      window.detachEvent('onresize', this.onWindowResized);
	    }
	    if (this.state.autoPlayTimer) {
	      clearInterval(this.state.autoPlayTimer);
	    }
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.slickGoTo != nextProps.slickGoTo) {
	      if (true) {
	        console.warn('react-slick deprecation warning: slickGoTo prop is deprecated and it will be removed in next release. Use slickGoTo method instead');
	      }
	      this.changeSlide({
	        message: 'index',
	        index: nextProps.slickGoTo,
	        currentSlide: this.state.currentSlide
	      });
	    } else if (this.state.currentSlide >= nextProps.children.length) {
	      this.update(nextProps);
	      this.changeSlide({
	        message: 'index',
	        index: nextProps.children.length - nextProps.slidesToShow,
	        currentSlide: this.state.currentSlide
	      });
	    } else {
	      this.update(nextProps);
	    }
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.adaptHeight();
	  },
	  onWindowResized: function onWindowResized() {
	    this.update(this.props);
	    // animating state should be cleared while resizing, otherwise autoplay stops working
	    this.setState({
	      animating: false
	    });
	    clearTimeout(this.animationEndCallback);
	    delete this.animationEndCallback;
	  },
	  slickPrev: function slickPrev() {
	    this.changeSlide({ message: 'previous' });
	  },
	  slickNext: function slickNext() {
	    this.changeSlide({ message: 'next' });
	  },
	  slickGoTo: function slickGoTo(slide) {
	    typeof slide === 'number' && this.changeSlide({
	      message: 'index',
	      index: slide,
	      currentSlide: this.state.currentSlide
	    });
	  },
	  render: function render() {
	    var className = (0, _classnames2.default)('slick-initialized', 'slick-slider', this.props.className, {
	      'slick-vertical': this.props.vertical
	    });

	    var trackProps = {
	      fade: this.props.fade,
	      cssEase: this.props.cssEase,
	      speed: this.props.speed,
	      infinite: this.props.infinite,
	      centerMode: this.props.centerMode,
	      focusOnSelect: this.props.focusOnSelect ? this.selectHandler : null,
	      currentSlide: this.state.currentSlide,
	      lazyLoad: this.props.lazyLoad,
	      lazyLoadedList: this.state.lazyLoadedList,
	      rtl: this.props.rtl,
	      slideWidth: this.state.slideWidth,
	      slidesToShow: this.props.slidesToShow,
	      slidesToScroll: this.props.slidesToScroll,
	      slideCount: this.state.slideCount,
	      trackStyle: this.state.trackStyle,
	      variableWidth: this.props.variableWidth
	    };

	    var dots;

	    if (this.props.dots === true && this.state.slideCount >= this.props.slidesToShow) {
	      var dotProps = {
	        dotsClass: this.props.dotsClass,
	        slideCount: this.state.slideCount,
	        slidesToShow: this.props.slidesToShow,
	        currentSlide: this.state.currentSlide,
	        slidesToScroll: this.props.slidesToScroll,
	        clickHandler: this.changeSlide,
	        children: this.props.children,
	        customPaging: this.props.customPaging
	      };

	      dots = _react2.default.createElement(_dots.Dots, dotProps);
	    }

	    var prevArrow, nextArrow;

	    var arrowProps = {
	      infinite: this.props.infinite,
	      centerMode: this.props.centerMode,
	      currentSlide: this.state.currentSlide,
	      slideCount: this.state.slideCount,
	      slidesToShow: this.props.slidesToShow,
	      prevArrow: this.props.prevArrow,
	      nextArrow: this.props.nextArrow,
	      clickHandler: this.changeSlide
	    };

	    if (this.props.arrows) {
	      prevArrow = _react2.default.createElement(_arrows.PrevArrow, arrowProps);
	      nextArrow = _react2.default.createElement(_arrows.NextArrow, arrowProps);
	    }

	    var verticalHeightStyle = null;

	    if (this.props.vertical) {
	      verticalHeightStyle = {
	        height: this.state.listHeight
	      };
	    }

	    var centerPaddingStyle = null;

	    if (this.props.vertical === false) {
	      if (this.props.centerMode === true) {
	        centerPaddingStyle = {
	          padding: '0px ' + this.props.centerPadding
	        };
	      }
	    } else {
	      if (this.props.centerMode === true) {
	        centerPaddingStyle = {
	          padding: this.props.centerPadding + ' 0px'
	        };
	      }
	    }

	    var listStyle = (0, _objectAssign2.default)({}, verticalHeightStyle, centerPaddingStyle);

	    return _react2.default.createElement(
	      'div',
	      {
	        className: className,
	        onMouseEnter: this.onInnerSliderEnter,
	        onMouseLeave: this.onInnerSliderLeave,
	        onMouseOver: this.onInnerSliderOver
	      },
	      prevArrow,
	      _react2.default.createElement(
	        'div',
	        {
	          ref: this.listRefHandler,
	          className: 'slick-list',
	          style: listStyle,
	          onMouseDown: this.swipeStart,
	          onMouseMove: this.state.dragging ? this.swipeMove : null,
	          onMouseUp: this.swipeEnd,
	          onMouseLeave: this.state.dragging ? this.swipeEnd : null,
	          onTouchStart: this.swipeStart,
	          onTouchMove: this.state.dragging ? this.swipeMove : null,
	          onTouchEnd: this.swipeEnd,
	          onTouchCancel: this.state.dragging ? this.swipeEnd : null,
	          onKeyDown: this.props.accessibility ? this.keyHandler : null },
	        _react2.default.createElement(
	          _track.Track,
	          _extends({ ref: this.trackRefHandler }, trackProps),
	          this.props.children
	        )
	      ),
	      nextArrow,
	      dots
	    );
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _trackHelper = __webpack_require__(5);

	var _helpers = __webpack_require__(8);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _objectAssign = __webpack_require__(7);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _reactDom = __webpack_require__(6);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EventHandlers = {
	  // Event handler for previous and next
	  changeSlide: function changeSlide(options) {
	    var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
	    var _props = this.props;
	    var slidesToScroll = _props.slidesToScroll;
	    var slidesToShow = _props.slidesToShow;
	    var _state = this.state;
	    var slideCount = _state.slideCount;
	    var currentSlide = _state.currentSlide;

	    unevenOffset = slideCount % slidesToScroll !== 0;
	    indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;

	    if (options.message === 'previous') {
	      slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
	      targetSlide = currentSlide - slideOffset;
	      if (this.props.lazyLoad) {
	        previousInt = currentSlide - slideOffset;
	        targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
	      }
	    } else if (options.message === 'next') {
	      slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
	      targetSlide = currentSlide + slideOffset;
	      if (this.props.lazyLoad) {
	        targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
	      }
	    } else if (options.message === 'dots' || options.message === 'children') {
	      // Click on dots
	      targetSlide = options.index * options.slidesToScroll;
	      if (targetSlide === options.currentSlide) {
	        return;
	      }
	    } else if (options.message === 'index') {
	      targetSlide = parseInt(options.index);
	      if (targetSlide === options.currentSlide) {
	        return;
	      }
	    }

	    this.slideHandler(targetSlide);
	  },

	  // Accessiblity handler for previous and next
	  keyHandler: function keyHandler(e) {
	    //Dont slide if the cursor is inside the form fields and arrow keys are pressed
	    if (!e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
	      if (e.keyCode === 37 && this.props.accessibility === true) {
	        this.changeSlide({
	          message: this.props.rtl === true ? 'next' : 'previous'
	        });
	      } else if (e.keyCode === 39 && this.props.accessibility === true) {
	        this.changeSlide({
	          message: this.props.rtl === true ? 'previous' : 'next'
	        });
	      }
	    }
	  },
	  // Focus on selecting a slide (click handler on track)
	  selectHandler: function selectHandler(options) {
	    this.changeSlide(options);
	  },
	  swipeStart: function swipeStart(e) {
	    var touches, posX, posY;

	    if (this.props.swipe === false || 'ontouchend' in document && this.props.swipe === false) {
	      return;
	    } else if (this.props.draggable === false && e.type.indexOf('mouse') !== -1) {
	      return;
	    }
	    posX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
	    posY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;
	    this.setState({
	      dragging: true,
	      touchObject: {
	        startX: posX,
	        startY: posY,
	        curX: posX,
	        curY: posY
	      }
	    });
	  },
	  swipeMove: function swipeMove(e) {
	    if (!this.state.dragging) {
	      e.preventDefault();
	      return;
	    }
	    if (this.state.animating) {
	      return;
	    }
	    if (this.props.vertical && this.props.swipeToSlide && this.props.verticalSwiping) {
	      e.preventDefault();
	    }
	    var swipeLeft;
	    var curLeft, positionOffset;
	    var touchObject = this.state.touchObject;

	    curLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: this.state.currentSlide,
	      trackRef: this.track
	    }, this.props, this.state));
	    touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
	    touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
	    touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));

	    if (this.props.verticalSwiping) {
	      touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)));
	    }

	    positionOffset = (this.props.rtl === false ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);

	    if (this.props.verticalSwiping) {
	      positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
	    }

	    var currentSlide = this.state.currentSlide;
	    var dotCount = Math.ceil(this.state.slideCount / this.props.slidesToScroll);
	    var swipeDirection = this.swipeDirection(this.state.touchObject);
	    var touchSwipeLength = touchObject.swipeLength;

	    if (this.props.infinite === false) {
	      if (currentSlide === 0 && swipeDirection === 'right' || currentSlide + 1 >= dotCount && swipeDirection === 'left') {
	        touchSwipeLength = touchObject.swipeLength * this.props.edgeFriction;

	        if (this.state.edgeDragged === false && this.props.edgeEvent) {
	          this.props.edgeEvent(swipeDirection);
	          this.setState({ edgeDragged: true });
	        }
	      }
	    }

	    if (this.state.swiped === false && this.props.swipeEvent) {
	      this.props.swipeEvent(swipeDirection);
	      this.setState({ swiped: true });
	    }

	    if (!this.props.vertical) {
	      swipeLeft = curLeft + touchSwipeLength * positionOffset;
	    } else {
	      swipeLeft = curLeft + touchSwipeLength * (this.state.listHeight / this.state.listWidth) * positionOffset;
	    }

	    if (this.props.verticalSwiping) {
	      swipeLeft = curLeft + touchSwipeLength * positionOffset;
	    }

	    this.setState({
	      touchObject: touchObject,
	      swipeLeft: swipeLeft,
	      trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: swipeLeft }, this.props, this.state))
	    });

	    if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
	      return;
	    }
	    if (touchObject.swipeLength > 4) {
	      e.preventDefault();
	    }
	  },
	  getNavigableIndexes: function getNavigableIndexes() {
	    var max = void 0;
	    var breakPoint = 0;
	    var counter = 0;
	    var indexes = [];

	    if (!this.props.infinite) {
	      max = this.state.slideCount;
	    } else {
	      breakPoint = this.props.slidesToShow * -1;
	      counter = this.props.slidesToShow * -1;
	      max = this.state.slideCount * 2;
	    }

	    while (breakPoint < max) {
	      indexes.push(breakPoint);
	      breakPoint = counter + this.props.slidesToScroll;

	      counter += this.props.slidesToScroll <= this.props.slidesToShow ? this.props.slidesToScroll : this.props.slidesToShow;
	    }

	    return indexes;
	  },
	  checkNavigable: function checkNavigable(index) {
	    var navigables = this.getNavigableIndexes();
	    var prevNavigable = 0;

	    if (index > navigables[navigables.length - 1]) {
	      index = navigables[navigables.length - 1];
	    } else {
	      for (var n in navigables) {
	        if (index < navigables[n]) {
	          index = prevNavigable;
	          break;
	        }

	        prevNavigable = navigables[n];
	      }
	    }

	    return index;
	  },
	  getSlideCount: function getSlideCount() {
	    var _this = this;

	    var centerOffset = this.props.centerMode ? this.state.slideWidth * Math.floor(this.props.slidesToShow / 2) : 0;

	    if (this.props.swipeToSlide) {
	      var swipedSlide = void 0;

	      var slickList = _reactDom2.default.findDOMNode(this.list);

	      var slides = slickList.querySelectorAll('.slick-slide');

	      Array.from(slides).every(function (slide) {
	        if (!_this.props.vertical) {
	          if (slide.offsetLeft - centerOffset + _this.getWidth(slide) / 2 > _this.state.swipeLeft * -1) {
	            swipedSlide = slide;
	            return false;
	          }
	        } else {
	          if (slide.offsetTop + _this.getHeight(slide) / 2 > _this.state.swipeLeft * -1) {
	            swipedSlide = slide;
	            return false;
	          }
	        }

	        return true;
	      });

	      var slidesTraversed = Math.abs(swipedSlide.dataset.index - this.state.currentSlide) || 1;

	      return slidesTraversed;
	    } else {
	      return this.props.slidesToScroll;
	    }
	  },

	  swipeEnd: function swipeEnd(e) {
	    if (!this.state.dragging) {
	      if (this.props.swipe) {
	        e.preventDefault();
	      }
	      return;
	    }
	    var touchObject = this.state.touchObject;
	    var minSwipe = this.state.listWidth / this.props.touchThreshold;
	    var swipeDirection = this.swipeDirection(touchObject);

	    if (this.props.verticalSwiping) {
	      minSwipe = this.state.listHeight / this.props.touchThreshold;
	    }

	    // reset the state of touch related state variables.
	    this.setState({
	      dragging: false,
	      edgeDragged: false,
	      swiped: false,
	      swipeLeft: null,
	      touchObject: {}
	    });
	    // Fix for #13
	    if (!touchObject.swipeLength) {
	      return;
	    }
	    if (touchObject.swipeLength > minSwipe) {
	      e.preventDefault();

	      var slideCount = void 0,
	          newSlide = void 0;

	      switch (swipeDirection) {

	        case 'left':
	        case 'down':
	          newSlide = this.state.currentSlide + this.getSlideCount();
	          slideCount = this.props.swipeToSlide ? this.checkNavigable(newSlide) : newSlide;
	          this.state.currentDirection = 0;
	          break;

	        case 'right':
	        case 'up':
	          newSlide = this.state.currentSlide - this.getSlideCount();
	          slideCount = this.props.swipeToSlide ? this.checkNavigable(newSlide) : newSlide;
	          this.state.currentDirection = 1;
	          break;

	        default:
	          slideCount = this.state.currentSlide;

	      }

	      this.slideHandler(slideCount);
	    } else {
	      // Adjust the track back to it's original position.
	      var currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: this.state.currentSlide,
	        trackRef: this.track
	      }, this.props, this.state));

	      this.setState({
	        trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign2.default)({ left: currentLeft }, this.props, this.state))
	      });
	    }
	  },
	  onInnerSliderEnter: function onInnerSliderEnter(e) {
	    if (this.props.autoplay && this.props.pauseOnHover) {
	      this.pause();
	    }
	  },
	  onInnerSliderOver: function onInnerSliderOver(e) {
	    if (this.props.autoplay && this.props.pauseOnHover) {
	      this.pause();
	    }
	  },
	  onInnerSliderLeave: function onInnerSliderLeave(e) {
	    if (this.props.autoplay && this.props.pauseOnHover) {
	      this.autoPlay();
	    }
	  }
	};

	exports.default = EventHandlers;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.getTrackLeft = exports.getTrackAnimateCSS = exports.getTrackCSS = undefined;

	var _reactDom = __webpack_require__(6);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _objectAssign = __webpack_require__(7);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
	  return keysArray.reduce(function (value, key) {
	    return value && spec.hasOwnProperty(key);
	  }, true) ? null : console.error('Keys Missing', spec);
	};

	var getTrackCSS = exports.getTrackCSS = function getTrackCSS(spec) {
	  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth']);

	  var trackWidth, trackHeight;

	  var trackChildren = spec.slideCount + 2 * spec.slidesToShow;

	  if (!spec.vertical) {
	    if (spec.variableWidth) {
	      trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
	    } else if (spec.centerMode) {
	      trackWidth = (spec.slideCount + 2 * (spec.slidesToShow + 1)) * spec.slideWidth;
	    } else {
	      trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
	    }
	  } else {
	    trackHeight = trackChildren * spec.slideHeight;
	  }

	  var style = {
	    opacity: 1,
	    WebkitTransform: !spec.vertical ? 'translate3d(' + spec.left + 'px, 0px, 0px)' : 'translate3d(0px, ' + spec.left + 'px, 0px)',
	    transform: !spec.vertical ? 'translate3d(' + spec.left + 'px, 0px, 0px)' : 'translate3d(0px, ' + spec.left + 'px, 0px)',
	    transition: '',
	    WebkitTransition: '',
	    msTransform: !spec.vertical ? 'translateX(' + spec.left + 'px)' : 'translateY(' + spec.left + 'px)'
	  };

	  if (trackWidth) {
	    (0, _objectAssign2.default)(style, { width: trackWidth });
	  }

	  if (trackHeight) {
	    (0, _objectAssign2.default)(style, { height: trackHeight });
	  }

	  // Fallback for IE8
	  if (window && !window.addEventListener && window.attachEvent) {
	    if (!spec.vertical) {
	      style.marginLeft = spec.left + 'px';
	    } else {
	      style.marginTop = spec.left + 'px';
	    }
	  }

	  return style;
	};

	var getTrackAnimateCSS = exports.getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
	  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth', 'speed', 'cssEase']);

	  var style = getTrackCSS(spec);
	  // useCSS is true by default so it can be undefined
	  style.WebkitTransition = '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase;
	  style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase;
	  return style;
	};

	var getTrackLeft = exports.getTrackLeft = function getTrackLeft(spec) {

	  checkSpecKeys(spec, ['slideIndex', 'trackRef', 'infinite', 'centerMode', 'slideCount', 'slidesToShow', 'slidesToScroll', 'slideWidth', 'listWidth', 'variableWidth', 'slideHeight']);

	  var slideOffset = 0;
	  var targetLeft;
	  var targetSlide;
	  var verticalOffset = 0;

	  if (spec.fade) {
	    return 0;
	  }

	  if (spec.infinite) {
	    if (spec.slideCount >= spec.slidesToShow) {
	      slideOffset = spec.slideWidth * spec.slidesToShow * -1;
	      verticalOffset = spec.slideHeight * spec.slidesToShow * -1;
	    }
	    if (spec.slideCount % spec.slidesToScroll !== 0) {
	      if (spec.slideIndex + spec.slidesToScroll > spec.slideCount && spec.slideCount > spec.slidesToShow) {
	        if (spec.slideIndex > spec.slideCount) {
	          slideOffset = (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) * spec.slideWidth * -1;
	          verticalOffset = (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) * spec.slideHeight * -1;
	        } else {
	          slideOffset = spec.slideCount % spec.slidesToScroll * spec.slideWidth * -1;
	          verticalOffset = spec.slideCount % spec.slidesToScroll * spec.slideHeight * -1;
	        }
	      }
	    }
	  } else {

	    if (spec.slideCount % spec.slidesToScroll !== 0) {
	      if (spec.slideIndex + spec.slidesToScroll > spec.slideCount && spec.slideCount > spec.slidesToShow) {
	        var slidesToOffset = spec.slidesToShow - spec.slideCount % spec.slidesToScroll;
	        slideOffset = slidesToOffset * spec.slideWidth;
	      }
	    }
	  }

	  if (spec.centerMode) {
	    if (spec.infinite) {
	      slideOffset += spec.slideWidth * Math.floor(spec.slidesToShow / 2);
	    } else {
	      slideOffset = spec.slideWidth * Math.floor(spec.slidesToShow / 2);
	    }
	  }

	  if (!spec.vertical) {
	    targetLeft = spec.slideIndex * spec.slideWidth * -1 + slideOffset;
	  } else {
	    targetLeft = spec.slideIndex * spec.slideHeight * -1 + verticalOffset;
	  }

	  if (spec.variableWidth === true) {
	    var targetSlideIndex;
	    if (spec.slideCount <= spec.slidesToShow || spec.infinite === false) {
	      targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).childNodes[spec.slideIndex];
	    } else {
	      targetSlideIndex = spec.slideIndex + spec.slidesToShow;
	      targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).childNodes[targetSlideIndex];
	    }
	    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
	    if (spec.centerMode === true) {
	      if (spec.infinite === false) {
	        targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).children[spec.slideIndex];
	      } else {
	        targetSlide = _reactDom2.default.findDOMNode(spec.trackRef).children[spec.slideIndex + spec.slidesToShow + 1];
	      }

	      if (targetSlide) {
	        targetLeft = targetSlide.offsetLeft * -1 + (spec.listWidth - targetSlide.offsetWidth) / 2;
	      }
	    }
	  }

	  return targetLeft;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(6);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _trackHelper = __webpack_require__(5);

	var _objectAssign = __webpack_require__(7);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var helpers = {
	  initialize: function initialize(props) {
	    var slickList = _reactDom2.default.findDOMNode(this.list);

	    var slideCount = _react2.default.Children.count(props.children);
	    var listWidth = this.getWidth(slickList);
	    var trackWidth = this.getWidth(_reactDom2.default.findDOMNode(this.track));
	    var slideWidth;

	    if (!props.vertical) {
	      var centerPaddingAdj = props.centerMode && parseInt(props.centerPadding) * 2;
	      slideWidth = (this.getWidth(_reactDom2.default.findDOMNode(this)) - centerPaddingAdj) / props.slidesToShow;
	    } else {
	      slideWidth = this.getWidth(_reactDom2.default.findDOMNode(this));
	    }

	    var slideHeight = this.getHeight(slickList.querySelector('[data-index="0"]'));
	    var listHeight = slideHeight * props.slidesToShow;

	    var currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;

	    this.setState({
	      slideCount: slideCount,
	      slideWidth: slideWidth,
	      listWidth: listWidth,
	      trackWidth: trackWidth,
	      currentSlide: currentSlide,
	      slideHeight: slideHeight,
	      listHeight: listHeight
	    }, function () {

	      var targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: this.state.currentSlide,
	        trackRef: this.track
	      }, props, this.state));
	      // getCSS function needs previously set state
	      var trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: targetLeft }, props, this.state));

	      this.setState({ trackStyle: trackStyle });

	      this.autoPlay(); // once we're set up, trigger the initial autoplay.
	    });
	  },
	  update: function update(props) {
	    var slickList = _reactDom2.default.findDOMNode(this.list);
	    // This method has mostly same code as initialize method.
	    // Refactor it
	    var slideCount = _react2.default.Children.count(props.children);
	    var listWidth = this.getWidth(slickList);
	    var trackWidth = this.getWidth(_reactDom2.default.findDOMNode(this.track));
	    var slideWidth;

	    if (!props.vertical) {
	      var centerPaddingAdj = props.centerMode && parseInt(props.centerPadding) * 2;
	      slideWidth = (this.getWidth(_reactDom2.default.findDOMNode(this)) - centerPaddingAdj) / props.slidesToShow;
	    } else {
	      slideWidth = this.getWidth(_reactDom2.default.findDOMNode(this));
	    }

	    var slideHeight = this.getHeight(slickList.querySelector('[data-index="0"]'));
	    var listHeight = slideHeight * props.slidesToShow;

	    // pause slider if autoplay is set to false
	    if (props.autoplay) {
	      this.pause();
	    } else {
	      this.autoPlay();
	    }

	    this.setState({
	      slideCount: slideCount,
	      slideWidth: slideWidth,
	      listWidth: listWidth,
	      trackWidth: trackWidth,
	      slideHeight: slideHeight,
	      listHeight: listHeight
	    }, function () {

	      var targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	        slideIndex: this.state.currentSlide,
	        trackRef: this.track
	      }, props, this.state));
	      // getCSS function needs previously set state
	      var trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: targetLeft }, props, this.state));

	      this.setState({ trackStyle: trackStyle });
	    });
	  },
	  getWidth: function getWidth(elem) {
	    return elem.getBoundingClientRect().width || elem.offsetWidth || 0;
	  },
	  getHeight: function getHeight(elem) {
	    return elem.getBoundingClientRect().height || elem.offsetHeight || 0;
	  },

	  adaptHeight: function adaptHeight() {
	    if (this.props.adaptiveHeight) {
	      var selector = '[data-index="' + this.state.currentSlide + '"]';
	      if (this.list) {
	        var slickList = _reactDom2.default.findDOMNode(this.list);
	        slickList.style.height = slickList.querySelector(selector).offsetHeight + 'px';
	      }
	    }
	  },
	  canGoNext: function canGoNext(opts) {
	    var canGo = true;
	    if (!opts.infinite) {
	      if (opts.centerMode) {
	        // check if current slide is last slide
	        if (opts.currentSlide >= opts.slideCount - 1) {
	          canGo = false;
	        }
	      } else {
	        // check if all slides are shown in slider
	        if (opts.slideCount <= opts.slidesToShow || opts.currentSlide >= opts.slideCount - opts.slidesToShow) {
	          canGo = false;
	        }
	      }
	    }
	    return canGo;
	  },
	  slideHandler: function slideHandler(index) {
	    var _this = this;

	    // Functionality of animateSlide and postSlide is merged into this function
	    // console.log('slideHandler', index);
	    var targetSlide, currentSlide;
	    var targetLeft, currentLeft;
	    var callback;

	    if (this.props.waitForAnimate && this.state.animating) {
	      return;
	    }

	    if (this.props.fade) {
	      currentSlide = this.state.currentSlide;

	      // Don't change slide if it's not infite and current slide is the first or last slide.
	      if (this.props.infinite === false && (index < 0 || index >= this.state.slideCount)) {
	        return;
	      }

	      //  Shifting targetSlide back into the range
	      if (index < 0) {
	        targetSlide = index + this.state.slideCount;
	      } else if (index >= this.state.slideCount) {
	        targetSlide = index - this.state.slideCount;
	      } else {
	        targetSlide = index;
	      }

	      if (this.props.lazyLoad && this.state.lazyLoadedList.indexOf(targetSlide) < 0) {
	        this.setState({
	          lazyLoadedList: this.state.lazyLoadedList.concat(targetSlide)
	        });
	      }

	      callback = function callback() {
	        _this.setState({
	          animating: false
	        });
	        if (_this.props.afterChange) {
	          _this.props.afterChange(targetSlide);
	        }
	        delete _this.animationEndCallback;
	      };

	      this.setState({
	        animating: true,
	        currentSlide: targetSlide
	      }, function () {
	        this.animationEndCallback = setTimeout(callback, this.props.speed);
	      });

	      if (this.props.beforeChange) {
	        this.props.beforeChange(this.state.currentSlide, targetSlide);
	      }

	      this.autoPlay();
	      return;
	    }

	    targetSlide = index;
	    if (targetSlide < 0) {
	      if (this.props.infinite === false) {
	        currentSlide = 0;
	      } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
	        currentSlide = this.state.slideCount - this.state.slideCount % this.props.slidesToScroll;
	      } else {
	        currentSlide = this.state.slideCount + targetSlide;
	      }
	    } else if (targetSlide >= this.state.slideCount) {
	      if (this.props.infinite === false) {
	        currentSlide = this.state.slideCount - this.props.slidesToShow;
	      } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
	        currentSlide = 0;
	      } else {
	        currentSlide = targetSlide - this.state.slideCount;
	      }
	    } else {
	      currentSlide = targetSlide;
	    }

	    targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: targetSlide,
	      trackRef: this.track
	    }, this.props, this.state));

	    currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2.default)({
	      slideIndex: currentSlide,
	      trackRef: this.track
	    }, this.props, this.state));

	    if (this.props.infinite === false) {
	      targetLeft = currentLeft;
	    }

	    if (this.props.beforeChange) {
	      this.props.beforeChange(this.state.currentSlide, currentSlide);
	    }

	    if (this.props.lazyLoad) {
	      var loaded = true;
	      var slidesToLoad = [];
	      for (var i = targetSlide; i < targetSlide + this.props.slidesToShow; i++) {
	        loaded = loaded && this.state.lazyLoadedList.indexOf(i) >= 0;
	        if (!loaded) {
	          slidesToLoad.push(i);
	        }
	      }
	      if (!loaded) {
	        this.setState({
	          lazyLoadedList: this.state.lazyLoadedList.concat(slidesToLoad)
	        });
	      }
	    }

	    // Slide Transition happens here.
	    // animated transition happens to target Slide and
	    // non - animated transition happens to current Slide
	    // If CSS transitions are false, directly go the current slide.

	    if (this.props.useCSS === false) {

	      this.setState({
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: currentLeft }, this.props, this.state))
	      }, function () {
	        if (this.props.afterChange) {
	          this.props.afterChange(currentSlide);
	        }
	      });
	    } else {

	      var nextStateChanges = {
	        animating: false,
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2.default)({ left: currentLeft }, this.props, this.state)),
	        swipeLeft: null
	      };

	      callback = function callback() {
	        _this.setState(nextStateChanges);
	        if (_this.props.afterChange) {
	          _this.props.afterChange(currentSlide);
	        }
	        delete _this.animationEndCallback;
	      };

	      this.setState({
	        animating: true,
	        currentSlide: currentSlide,
	        trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign2.default)({ left: targetLeft }, this.props, this.state))
	      }, function () {
	        this.animationEndCallback = setTimeout(callback, this.props.speed);
	      });
	    }

	    this.autoPlay();
	  },
	  swipeDirection: function swipeDirection(touchObject) {
	    var xDist, yDist, r, swipeAngle;

	    xDist = touchObject.startX - touchObject.curX;
	    yDist = touchObject.startY - touchObject.curY;
	    r = Math.atan2(yDist, xDist);

	    swipeAngle = Math.round(r * 180 / Math.PI);
	    if (swipeAngle < 0) {
	      swipeAngle = 360 - Math.abs(swipeAngle);
	    }
	    if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
	      return this.props.rtl === false ? 'left' : 'right';
	    }
	    if (swipeAngle >= 135 && swipeAngle <= 225) {
	      return this.props.rtl === false ? 'right' : 'left';
	    }
	    if (this.props.verticalSwiping === true) {
	      if (swipeAngle >= 35 && swipeAngle <= 135) {
	        return 'down';
	      } else {
	        return 'up';
	      }
	    }

	    return 'vertical';
	  },
	  play: function play() {
	    var nextIndex;

	    if (!this.state.mounted) {
	      return false;
	    }

	    if (this.props.rtl) {
	      nextIndex = this.state.currentSlide - this.props.slidesToScroll;
	    } else {
	      if (this.canGoNext(_extends({}, this.props, this.state))) {
	        nextIndex = this.state.currentSlide + this.props.slidesToScroll;
	      } else {
	        return false;
	      }
	    }

	    this.slideHandler(nextIndex);
	  },
	  autoPlay: function autoPlay() {
	    if (this.state.autoPlayTimer) {
	      clearTimeout(this.state.autoPlayTimer);
	    }
	    if (this.props.autoplay) {
	      this.setState({
	        autoPlayTimer: setTimeout(this.play, this.props.autoplaySpeed)
	      });
	    }
	  },
	  pause: function pause() {
	    if (this.state.autoPlayTimer) {
	      clearTimeout(this.state.autoPlayTimer);
	      this.setState({
	        autoPlayTimer: null
	      });
	    }
	  }
	};

	exports.default = helpers;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var initialState = {
	    animating: false,
	    dragging: false,
	    autoPlayTimer: null,
	    currentDirection: 0,
	    currentLeft: null,
	    currentSlide: 0,
	    direction: 1,
	    listWidth: null,
	    listHeight: null,
	    // loadIndex: 0,
	    slideCount: null,
	    slideWidth: null,
	    slideHeight: null,
	    // sliding: false,
	    // slideOffset: 0,
	    swipeLeft: null,
	    touchObject: {
	        startX: 0,
	        startY: 0,
	        curX: 0,
	        curY: 0
	    },

	    lazyLoadedList: [],

	    // added for react
	    initialized: false,
	    edgeDragged: false,
	    swiped: false, // used by swipeEvent. differentites between touch and swipe.
	    trackStyle: {},
	    trackWidth: 0

	    // Removed
	    // transformsEnabled: false,
	    // $nextArrow: null,
	    // $prevArrow: null,
	    // $dots: null,
	    // $list: null,
	    // $slideTrack: null,
	    // $slides: null,
	};

	module.exports = initialState;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultProps = {
	    className: '',
	    accessibility: true,
	    adaptiveHeight: false,
	    arrows: true,
	    autoplay: false,
	    autoplaySpeed: 3000,
	    centerMode: false,
	    centerPadding: '50px',
	    cssEase: 'ease',
	    customPaging: function customPaging(i) {
	        return _react2.default.createElement(
	            'button',
	            null,
	            i + 1
	        );
	    },
	    dots: false,
	    dotsClass: 'slick-dots',
	    draggable: true,
	    easing: 'linear',
	    edgeFriction: 0.35,
	    fade: false,
	    focusOnSelect: false,
	    infinite: true,
	    initialSlide: 0,
	    lazyLoad: false,
	    pauseOnHover: true,
	    responsive: null,
	    rtl: false,
	    slide: 'div',
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    speed: 500,
	    swipe: true,
	    swipeToSlide: false,
	    touchMove: true,
	    touchThreshold: 5,
	    useCSS: true,
	    variableWidth: false,
	    vertical: false,
	    waitForAnimate: true,
	    afterChange: null,
	    beforeChange: null,
	    edgeEvent: null,
	    init: null,
	    swipeEvent: null,
	    // nextArrow, prevArrow are react componets
	    nextArrow: null,
	    prevArrow: null
	};

	module.exports = defaultProps;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Track = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _objectAssign = __webpack_require__(7);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _classnames = __webpack_require__(11);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getSlideClasses = function getSlideClasses(spec) {
	  var slickActive, slickCenter, slickCloned;
	  var centerOffset, index;

	  if (spec.rtl) {
	    index = spec.slideCount - 1 - spec.index;
	  } else {
	    index = spec.index;
	  }

	  slickCloned = index < 0 || index >= spec.slideCount;
	  if (spec.centerMode) {
	    centerOffset = Math.floor(spec.slidesToShow / 2);
	    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
	    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
	      slickActive = true;
	    }
	  } else {
	    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
	  }
	  return (0, _classnames2.default)({
	    'slick-slide': true,
	    'slick-active': slickActive,
	    'slick-center': slickCenter,
	    'slick-cloned': slickCloned
	  });
	};

	var getSlideStyle = function getSlideStyle(spec) {
	  var style = {};

	  if (spec.variableWidth === undefined || spec.variableWidth === false) {
	    style.width = spec.slideWidth;
	  }

	  if (spec.fade) {
	    style.position = 'relative';
	    style.left = -spec.index * spec.slideWidth;
	    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
	    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
	    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
	  }

	  return style;
	};

	var getKey = function getKey(child, fallbackKey) {
	  // key could be a zero
	  return child.key === null || child.key === undefined ? fallbackKey : child.key;
	};

	var renderSlides = function renderSlides(spec) {
	  var key;
	  var slides = [];
	  var preCloneSlides = [];
	  var postCloneSlides = [];
	  var count = _react2.default.Children.count(spec.children);

	  _react2.default.Children.forEach(spec.children, function (elem, index) {
	    var child = void 0;
	    var childOnClickOptions = {
	      message: 'children',
	      index: index,
	      slidesToScroll: spec.slidesToScroll,
	      currentSlide: spec.currentSlide
	    };

	    if (!spec.lazyLoad | (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)) {
	      child = elem;
	    } else {
	      child = _react2.default.createElement('div', null);
	    }
	    var childStyle = getSlideStyle((0, _objectAssign2.default)({}, spec, { index: index }));
	    var slickClasses = getSlideClasses((0, _objectAssign2.default)({ index: index }, spec));
	    var cssClasses;

	    if (child.props.className) {
	      cssClasses = (0, _classnames2.default)(slickClasses, child.props.className);
	    } else {
	      cssClasses = slickClasses;
	    }

	    var onClick = function onClick(e) {
	      child.props && child.props.onClick && child.props.onClick(e);
	      if (spec.focusOnSelect) {
	        spec.focusOnSelect(childOnClickOptions);
	      }
	    };

	    slides.push(_react2.default.cloneElement(child, {
	      key: 'original' + getKey(child, index),
	      'data-index': index,
	      className: cssClasses,
	      tabIndex: '-1',
	      style: (0, _objectAssign2.default)({ outline: 'none' }, child.props.style || {}, childStyle),
	      onClick: onClick
	    }));

	    // variableWidth doesn't wrap properly.
	    if (spec.infinite && spec.fade === false) {
	      var infiniteCount = spec.variableWidth ? spec.slidesToShow + 1 : spec.slidesToShow;

	      if (index >= count - infiniteCount) {
	        key = -(count - index);
	        preCloneSlides.push(_react2.default.cloneElement(child, {
	          key: 'precloned' + getKey(child, key),
	          'data-index': key,
	          className: cssClasses,
	          style: (0, _objectAssign2.default)({}, child.props.style || {}, childStyle),
	          onClick: onClick
	        }));
	      }

	      if (index < infiniteCount) {
	        key = count + index;
	        postCloneSlides.push(_react2.default.cloneElement(child, {
	          key: 'postcloned' + getKey(child, key),
	          'data-index': key,
	          className: cssClasses,
	          style: (0, _objectAssign2.default)({}, child.props.style || {}, childStyle),
	          onClick: onClick
	        }));
	      }
	    }
	  });

	  if (spec.rtl) {
	    return preCloneSlides.concat(slides, postCloneSlides).reverse();
	  } else {
	    return preCloneSlides.concat(slides, postCloneSlides);
	  }
	};

	var Track = exports.Track = _react2.default.createClass({
	  displayName: 'Track',

	  render: function render() {
	    var slides = renderSlides.call(this, this.props);
	    return _react2.default.createElement(
	      'div',
	      { className: 'slick-track', style: this.props.trackStyle },
	      slides
	    );
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Dots = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(11);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getDotCount = function getDotCount(spec) {
	  var dots;
	  dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
	  return dots;
	};

	var Dots = exports.Dots = _react2.default.createClass({
	  displayName: 'Dots',


	  clickHandler: function clickHandler(options, e) {
	    // In Autoplay the focus stays on clicked button even after transition
	    // to next slide. That only goes away by click somewhere outside
	    e.preventDefault();
	    this.props.clickHandler(options);
	  },
	  render: function render() {
	    var _this = this;

	    var dotCount = getDotCount({
	      slideCount: this.props.slideCount,
	      slidesToScroll: this.props.slidesToScroll
	    });

	    // Apply join & split to Array to pre-fill it for IE8
	    //
	    // Credit: http://stackoverflow.com/a/13735425/1849458
	    var dots = Array.apply(null, Array(dotCount + 1).join('0').split('')).map(function (x, i) {

	      var leftBound = i * _this.props.slidesToScroll;
	      var rightBound = i * _this.props.slidesToScroll + (_this.props.slidesToScroll - 1);
	      var className = (0, _classnames2.default)({
	        'slick-active': _this.props.currentSlide >= leftBound && _this.props.currentSlide <= rightBound
	      });

	      var dotOptions = {
	        message: 'dots',
	        index: i,
	        slidesToScroll: _this.props.slidesToScroll,
	        currentSlide: _this.props.currentSlide
	      };

	      var onClick = _this.clickHandler.bind(_this, dotOptions);

	      return _react2.default.createElement(
	        'li',
	        { key: i, className: className },
	        _react2.default.cloneElement(_this.props.customPaging(i), { onClick: onClick })
	      );
	    });

	    return _react2.default.createElement(
	      'ul',
	      { className: this.props.dotsClass, style: { display: 'block' } },
	      dots
	    );
	  }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.NextArrow = exports.PrevArrow = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(11);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _helpers = __webpack_require__(8);

	var _helpers2 = _interopRequireDefault(_helpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PrevArrow = exports.PrevArrow = _react2.default.createClass({
	  displayName: 'PrevArrow',


	  clickHandler: function clickHandler(options, e) {
	    if (e) {
	      e.preventDefault();
	    }
	    this.props.clickHandler(options, e);
	  },
	  render: function render() {
	    var prevClasses = { 'slick-arrow': true, 'slick-prev': true };
	    var prevHandler = this.clickHandler.bind(this, { message: 'previous' });

	    if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
	      prevClasses['slick-disabled'] = true;
	      prevHandler = null;
	    }

	    var prevArrowProps = {
	      key: '0',
	      'data-role': 'none',
	      className: (0, _classnames2.default)(prevClasses),
	      style: { display: 'block' },
	      onClick: prevHandler
	    };
	    var customProps = {
	      currentSlide: this.props.currentSlide,
	      slideCount: this.props.slideCount
	    };
	    var prevArrow;

	    if (this.props.prevArrow) {
	      prevArrow = _react2.default.cloneElement(this.props.prevArrow, _extends({}, prevArrowProps, customProps));
	    } else {
	      prevArrow = _react2.default.createElement(
	        'button',
	        _extends({ key: '0', type: 'button' }, prevArrowProps),
	        ' Previous'
	      );
	    }

	    return prevArrow;
	  }
	});

	var NextArrow = exports.NextArrow = _react2.default.createClass({
	  displayName: 'NextArrow',

	  clickHandler: function clickHandler(options, e) {
	    if (e) {
	      e.preventDefault();
	    }
	    this.props.clickHandler(options, e);
	  },
	  render: function render() {
	    var nextClasses = { 'slick-arrow': true, 'slick-next': true };
	    var nextHandler = this.clickHandler.bind(this, { message: 'next' });

	    if (!_helpers2.default.canGoNext(this.props)) {
	      nextClasses['slick-disabled'] = true;
	      nextHandler = null;
	    }

	    var nextArrowProps = {
	      key: '1',
	      'data-role': 'none',
	      className: (0, _classnames2.default)(nextClasses),
	      style: { display: 'block' },
	      onClick: nextHandler
	    };
	    var customProps = {
	      currentSlide: this.props.currentSlide,
	      slideCount: this.props.slideCount
	    };
	    var nextArrow;

	    if (this.props.nextArrow) {
	      nextArrow = _react2.default.cloneElement(this.props.nextArrow, _extends({}, nextArrowProps, customProps));
	    } else {
	      nextArrow = _react2.default.createElement(
	        'button',
	        _extends({ key: '1', type: 'button' }, nextArrowProps),
	        ' Next'
	      );
	    }

	    return nextArrow;
	  }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var camel2hyphen = __webpack_require__(16);

	var isDimension = function (feature) {
	  var re = /[height|width]$/;
	  return re.test(feature);
	};

	var obj2mq = function (obj) {
	  var mq = '';
	  var features = Object.keys(obj);
	  features.forEach(function (feature, index) {
	    var value = obj[feature];
	    feature = camel2hyphen(feature);
	    // Add px to dimension features
	    if (isDimension(feature) && typeof value === 'number') {
	      value = value + 'px';
	    }
	    if (value === true) {
	      mq += feature;
	    } else if (value === false) {
	      mq += 'not ' + feature;
	    } else {
	      mq += '(' + feature + ': ' + value + ')';
	    }
	    if (index < features.length-1) {
	      mq += ' and '
	    }
	  });
	  return mq;
	};

	var json2mq = function (query) {
	  var mq = '';
	  if (typeof query === 'string') {
	    return query;
	  }
	  // Handling array of media queries
	  if (query instanceof Array) {
	    query.forEach(function (q, index) {
	      mq += obj2mq(q);
	      if (index < query.length-1) {
	        mq += ', '
	      }
	    });
	    return mq;
	  }
	  // Handling single media query
	  return obj2mq(query);
	};

	module.exports = json2mq;

/***/ },
/* 16 */
/***/ function(module, exports) {

	var camel2hyphen = function (str) {
	  return str
	          .replace(/[A-Z]/g, function (match) {
	            return '-' + match.toLowerCase();
	          })
	          .toLowerCase();
	};

	module.exports = camel2hyphen;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var canUseDOM = __webpack_require__(18);
	var enquire = canUseDOM && __webpack_require__(19);
	var json2mq = __webpack_require__(15);

	var ResponsiveMixin = {
	  media: function (query, handler) {
	    query = json2mq(query);
	    if (typeof handler === 'function') {
	      handler = {
	        match: handler
	      };
	    }
	    canUseDOM && enquire.register(query, handler);

	    // Queue the handlers to unregister them at unmount  
	    if (! this._responsiveMediaHandlers) {
	      this._responsiveMediaHandlers = [];
	    }
	    this._responsiveMediaHandlers.push({query: query, handler: handler});
	  },
	  componentWillUnmount: function () {
	    if (this._responsiveMediaHandlers) {
	      this._responsiveMediaHandlers.forEach(function(obj) {
	        canUseDOM && enquire.unregister(obj.query, obj.handler);
	      });
	    }
	  }
	};

	module.exports = ResponsiveMixin;


/***/ },
/* 18 */
/***/ function(module, exports) {

	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);

	module.exports = canUseDOM;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * enquire.js v2.1.1 - Awesome Media Queries in JavaScript
	 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */

	;(function (name, context, factory) {
		var matchMedia = window.matchMedia;

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = factory(matchMedia);
		}
		else if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return (context[name] = factory(matchMedia));
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
		else {
			context[name] = factory(matchMedia);
		}
	}('enquire', this, function (matchMedia) {

		'use strict';

	    /*jshint unused:false */
	    /**
	     * Helper function for iterating over a collection
	     *
	     * @param collection
	     * @param fn
	     */
	    function each(collection, fn) {
	        var i      = 0,
	            length = collection.length,
	            cont;

	        for(i; i < length; i++) {
	            cont = fn(collection[i], i);
	            if(cont === false) {
	                break; //allow early exit
	            }
	        }
	    }

	    /**
	     * Helper function for determining whether target object is an array
	     *
	     * @param target the object under test
	     * @return {Boolean} true if array, false otherwise
	     */
	    function isArray(target) {
	        return Object.prototype.toString.apply(target) === '[object Array]';
	    }

	    /**
	     * Helper function for determining whether target object is a function
	     *
	     * @param target the object under test
	     * @return {Boolean} true if function, false otherwise
	     */
	    function isFunction(target) {
	        return typeof target === 'function';
	    }

	    /**
	     * Delegate to handle a media query being matched and unmatched.
	     *
	     * @param {object} options
	     * @param {function} options.match callback for when the media query is matched
	     * @param {function} [options.unmatch] callback for when the media query is unmatched
	     * @param {function} [options.setup] one-time callback triggered the first time a query is matched
	     * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
	     * @constructor
	     */
	    function QueryHandler(options) {
	        this.options = options;
	        !options.deferSetup && this.setup();
	    }
	    QueryHandler.prototype = {

	        /**
	         * coordinates setup of the handler
	         *
	         * @function
	         */
	        setup : function() {
	            if(this.options.setup) {
	                this.options.setup();
	            }
	            this.initialised = true;
	        },

	        /**
	         * coordinates setup and triggering of the handler
	         *
	         * @function
	         */
	        on : function() {
	            !this.initialised && this.setup();
	            this.options.match && this.options.match();
	        },

	        /**
	         * coordinates the unmatch event for the handler
	         *
	         * @function
	         */
	        off : function() {
	            this.options.unmatch && this.options.unmatch();
	        },

	        /**
	         * called when a handler is to be destroyed.
	         * delegates to the destroy or unmatch callbacks, depending on availability.
	         *
	         * @function
	         */
	        destroy : function() {
	            this.options.destroy ? this.options.destroy() : this.off();
	        },

	        /**
	         * determines equality by reference.
	         * if object is supplied compare options, if function, compare match callback
	         *
	         * @function
	         * @param {object || function} [target] the target for comparison
	         */
	        equals : function(target) {
	            return this.options === target || this.options.match === target;
	        }

	    };
	    /**
	     * Represents a single media query, manages it's state and registered handlers for this query
	     *
	     * @constructor
	     * @param {string} query the media query string
	     * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
	     */
	    function MediaQuery(query, isUnconditional) {
	        this.query = query;
	        this.isUnconditional = isUnconditional;
	        this.handlers = [];
	        this.mql = matchMedia(query);

	        var self = this;
	        this.listener = function(mql) {
	            self.mql = mql;
	            self.assess();
	        };
	        this.mql.addListener(this.listener);
	    }
	    MediaQuery.prototype = {

	        /**
	         * add a handler for this query, triggering if already active
	         *
	         * @param {object} handler
	         * @param {function} handler.match callback for when query is activated
	         * @param {function} [handler.unmatch] callback for when query is deactivated
	         * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
	         * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
	         */
	        addHandler : function(handler) {
	            var qh = new QueryHandler(handler);
	            this.handlers.push(qh);

	            this.matches() && qh.on();
	        },

	        /**
	         * removes the given handler from the collection, and calls it's destroy methods
	         * 
	         * @param {object || function} handler the handler to remove
	         */
	        removeHandler : function(handler) {
	            var handlers = this.handlers;
	            each(handlers, function(h, i) {
	                if(h.equals(handler)) {
	                    h.destroy();
	                    return !handlers.splice(i,1); //remove from array and exit each early
	                }
	            });
	        },

	        /**
	         * Determine whether the media query should be considered a match
	         * 
	         * @return {Boolean} true if media query can be considered a match, false otherwise
	         */
	        matches : function() {
	            return this.mql.matches || this.isUnconditional;
	        },

	        /**
	         * Clears all handlers and unbinds events
	         */
	        clear : function() {
	            each(this.handlers, function(handler) {
	                handler.destroy();
	            });
	            this.mql.removeListener(this.listener);
	            this.handlers.length = 0; //clear array
	        },

	        /*
	         * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
	         */
	        assess : function() {
	            var action = this.matches() ? 'on' : 'off';

	            each(this.handlers, function(handler) {
	                handler[action]();
	            });
	        }
	    };
	    /**
	     * Allows for registration of query handlers.
	     * Manages the query handler's state and is responsible for wiring up browser events
	     *
	     * @constructor
	     */
	    function MediaQueryDispatch () {
	        if(!matchMedia) {
	            throw new Error('matchMedia not present, legacy browsers require a polyfill');
	        }

	        this.queries = {};
	        this.browserIsIncapable = !matchMedia('only all').matches;
	    }

	    MediaQueryDispatch.prototype = {

	        /**
	         * Registers a handler for the given media query
	         *
	         * @param {string} q the media query
	         * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
	         * @param {function} options.match fired when query matched
	         * @param {function} [options.unmatch] fired when a query is no longer matched
	         * @param {function} [options.setup] fired when handler first triggered
	         * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
	         * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
	         */
	        register : function(q, options, shouldDegrade) {
	            var queries         = this.queries,
	                isUnconditional = shouldDegrade && this.browserIsIncapable;

	            if(!queries[q]) {
	                queries[q] = new MediaQuery(q, isUnconditional);
	            }

	            //normalise to object in an array
	            if(isFunction(options)) {
	                options = { match : options };
	            }
	            if(!isArray(options)) {
	                options = [options];
	            }
	            each(options, function(handler) {
	                queries[q].addHandler(handler);
	            });

	            return this;
	        },

	        /**
	         * unregisters a query and all it's handlers, or a specific handler for a query
	         *
	         * @param {string} q the media query to target
	         * @param {object || function} [handler] specific handler to unregister
	         */
	        unregister : function(q, handler) {
	            var query = this.queries[q];

	            if(query) {
	                if(handler) {
	                    query.removeHandler(handler);
	                }
	                else {
	                    query.clear();
	                    delete this.queries[q];
	                }
	            }

	            return this;
	        }
	    };

		return new MediaQueryDispatch();

	}));

/***/ }
/******/ ])
});
;