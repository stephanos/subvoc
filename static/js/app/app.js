(function (React$1,ReactDOM,$,classNames,Slider) {
'use strict';

React$1 = 'default' in React$1 ? React$1['default'] : React$1;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;
$ = 'default' in $ ? $['default'] : $;
classNames = 'default' in classNames ? classNames['default'] : classNames;
Slider = 'default' in Slider ? Slider['default'] : Slider;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var API = function () {
    function API() {
        classCallCheck(this, API);
    }

    createClass(API, null, [{
        key: 'lookupWord',
        value: function lookupWord(word) {
            return $.getJSON({
                url: '/api/words/' + word.token,
                error: function error(xhr, status, err) {
                    console.error(err); // eslint-disable-line
                }
            });
        }
    }, {
        key: 'loadAnalysis',
        value: function loadAnalysis(imdbId) {
            return $.getJSON({
                url: '/api/analysis/' + imdbId,
                error: function error(xhr, status, err) {
                    console.error(err); // eslint-disable-line
                }
            });
        }
    }, {
        key: 'searchMovie',
        value: function searchMovie(query) {
            return $.getJSON({
                url: '/api/search/' + query,
                error: function error(xhr, status, err) {
                    console.error(err); // eslint-disable-line
                }
            });
        }
    }]);
    return API;
}();

var Nav = function Nav(_ref) {
    var analysis = _ref.analysis,
        selection = _ref.selection,
        onClick = _ref.onClick;
    return React.createElement(
        'nav',
        { className: 'navigation' },
        React.createElement(
            'section',
            { className: 'container' },
            React.createElement(
                'span',
                { className: 'navigation-title' },
                React.createElement(
                    'h1',
                    { className: 'title' },
                    selection && selection.word ? React.createElement(
                        'div',
                        { className: 'media', onClick: onClick },
                        React.createElement(
                            'span',
                            { className: 'arrow left' },
                            '>'
                        ),
                        React.createElement(
                            'span',
                            { className: 'name' },
                            analysis.media.title
                        )
                    ) : React.createElement(
                        'a',
                        { className: 'generic', href: '/' },
                        'subvoc'
                    )
                )
            )
        )
    );
};

var toStr$2 = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toStr$2.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr$2.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

var has = Object.prototype.hasOwnProperty;
var toStr$1 = Object.prototype.toString;
var slice$1 = Array.prototype.slice;

var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr$1.call(object) === '[object Function]';
	var isArguments$$1 = isArguments(object);
	var isString = isObject && toStr$1.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments$$1) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments$$1 && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArguments(object)) {
					return originalKeys(slice$1.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

var index$3 = keysShim;

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var index$5 = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};

var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty$1 = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = index$3(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	index$5(props, function (name) {
		defineProperty$1(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

var index$1 = defineProperties;

var _isNaN = Number.isNaN || function isNaN(a) {
	return a !== a;
};

var $isNaN = Number.isNaN || function (a) { return a !== a; };

var _isFinite = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

var has$1 = Object.prototype.hasOwnProperty;
var assign = Object.assign || function assign(target, source) {
	for (var key in source) {
		if (has$1.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};

var sign = function sign(number) {
	return number >= 0 ? 1 : -1;
};

var mod = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

var isPrimitive = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

var isPrimitive$2 = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$4 = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var index$7 = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr$4.call(value);
	return strClass === fnClass || strClass === genClass;
};

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr$5 = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag$1 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var index$9 = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag$1 ? tryDateObject(value) : toStr$5.call(value) === dateClass;
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$11 = createCommonjsModule(function (module) {
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}
});

var hasSymbols$2 = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';






var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (index$7(method)) {
			result = method.call(O);
			if (isPrimitive$2(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!index$7(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
var es6$2 = function ToPrimitive(input, PreferredType) {
	if (isPrimitive$2(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols$2) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (index$11(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive$2(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (index$9(input) || index$11(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice$2 = Array.prototype.slice;
var toStr$6 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$6.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice$2.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice$2.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice$2.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var index$13 = Function.prototype.bind || implementation;

var toStr$7 = Object.prototype.toString;





// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr$7.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (index$7(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive$2(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
var es5$2 = function ToPrimitive(input, PreferredType) {
	if (isPrimitive$2(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

var ES5 = {
	ToPrimitive: es5$2,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if (_isNaN(number)) { return 0; }
		if (number === 0 || !_isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if (_isNaN(number) || number === 0 || !_isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: index$7,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return _isNaN(x) && _isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	}
};

var es5 = ES5;

var index$17 = index$13.call(Function.call, Object.prototype.hasOwnProperty);

var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr$8 = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var index$15 = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag$2) {
		return toStr$8.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && index$17(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};

var toStr$3 = Object.prototype.toString;
var hasSymbols$1 = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var symbolToStr = hasSymbols$1 ? Symbol.prototype.toString : toStr$3;



var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;






var parseInteger = parseInt;

var strSlice = index$13.call(Function.call, String.prototype.slice);
var isBinary = index$13.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = index$13.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = index$13.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = index$13.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = index$13.call(Function.call, String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};





// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, es5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: es6$2,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : es6$2(argument, 'number');
		if (typeof value === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if (_isNaN(number) || number === 0 || !_isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if (_isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = Math.floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, String);
		return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr$3.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: es5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: Array.isArray || function IsArray(argument) {
		return toStr$3.call(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) { return true; }
		if (isPrimitive(obj)) {
			return false;
		}
		return Object.isExtensible(obj);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || _isNaN(argument) || !_isFinite(argument)) {
			return false;
		}
		var abs = Math.abs(argument);
		return Math.floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols$1) {
			var isRegExp = argument[Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return es5.ToBoolean(isRegExp);
			}
		}
		return index$15(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || (_isNaN(x) && _isNaN(y));
	},

	/**
	 * 7.3.2 GetV (V, P)
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let O be ToObject(V).
	 * 3. ReturnIfAbrupt(O).
	 * 4. Return O.[[Get]](P, V).
	 */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
	 * 7.3.9 - http://www.ecma-international.org/ecma-262/6.0/#sec-getmethod
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let func be GetV(O, P).
	 * 3. ReturnIfAbrupt(func).
	 * 4. If func is either undefined or null, return undefined.
	 * 5. If IsCallable(func) is false, throw a TypeError exception.
	 * 6. Return func.
	 */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return undefined;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
	 * 7.3.1 Get (O, P) - http://www.ecma-international.org/ecma-262/6.0/#sec-get-o-p
	 * 1. Assert: Type(O) is Object.
	 * 2. Assert: IsPropertyKey(P) is true.
	 * 3. Return O.[[Get]](P, O).
	 */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return es5.Type(x);
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols$1 && Symbol.species ? C[Symbol.species] : undefined;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new TypeError('no constructor found');
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

var es6 = ES6;

var implementation$3 = function find(predicate) {
	var list = es6.ToObject(this);
	var length = es6.ToInteger(es6.ToLength(list.length));
	if (!es6.IsCallable(predicate)) {
		throw new TypeError('Array#find: predicate must be a function');
	}
	if (length === 0) {
		return undefined;
	}
	var thisArg = arguments[1];
	for (var i = 0, value; i < length; i++) {
		value = list[i];
		if (es6.Call(predicate, thisArg, [value, i, list])) {
			return value;
		}
	}
	return undefined;
};

var polyfill$1 = function getPolyfill() {
	// Detect if an implementation exists
	// Detect early implementations which skipped holes in sparse arrays
  // eslint-disable-next-line no-sparse-arrays
	var implemented = Array.prototype.find && [, 1].find(function () {
		return true;
	}) !== 1;

  // eslint-disable-next-line global-require
	return implemented ? Array.prototype.find : implementation$3;
};

var shim = function shimArrayPrototypeFind() {
	var polyfill = polyfill$1();

	index$1(Array.prototype, { find: polyfill }, {
		find: function () {
			return Array.prototype.find !== polyfill;
		}
	});

	return polyfill;
};

var slice = Array.prototype.slice;

var polyfill = polyfill$1();

var boundFindShim = function find(array, predicate) { // eslint-disable-line no-unused-vars
	es6.RequireObjectCoercible(array);
	var args = slice.call(arguments, 1);
	return polyfill.apply(array, args);
};

index$1(boundFindShim, {
	getPolyfill: polyfill$1,
	implementation: implementation$3,
	shim: shim
});

var index = boundFindShim;

var WordDefinitionList = function WordDefinitionList(_ref) {
    var definitions = _ref.definitions;
    return React$1.createElement(
        "div",
        { className: "definitions" },
        React$1.createElement(
            "h4",
            null,
            "Definition"
        ),
        definitions.length > 0 ? React$1.createElement(
            "div",
            null,
            React$1.createElement(
                "ol",
                null,
                definitions.map(function (entry, idx) {
                    return React$1.createElement(
                        "li",
                        { key: idx, className: "definition" },
                        entry.definition
                    );
                })
            )
        ) : React$1.createElement(
            "div",
            null,
            "None was found."
        )
    );
};

var WordExcerpt = function WordExcerpt(_ref) {
    var excerpt = _ref.excerpt;
    return React$1.createElement(
        "div",
        { className: "excerpt" },
        excerpt.sentences.map(function (sentence, s_idx) {
            var words = sentence.text.split(/\b/);
            return React$1.createElement(
                "div",
                { key: s_idx, className: "line" },
                words.map(function (word, w_idx) {
                    var className = word === excerpt.token ? 'token' : '';
                    return React$1.createElement(
                        "span",
                        { key: w_idx, className: className },
                        word
                    );
                })
            );
        })
    );
};

var WordExcerptList = function WordExcerptList(_ref2) {
    var excerpts = _ref2.excerpts;
    return React$1.createElement(
        "div",
        null,
        " ",
        excerpts.length > 0 ? React$1.createElement(
            "div",
            { className: "excerpts" },
            React$1.createElement(
                "h4",
                null,
                "Excerpt"
            ),
            excerpts.map(function (excerpt, idx) {
                return React$1.createElement(WordExcerpt, { key: idx, excerpt: excerpt });
            })
        ) : React$1.createElement("div", null),
        " "
    );
};

var PARTS_OF_SPEACH = ['noun', 'verb', 'adj', 'adv'];

function getFreq(word, pos) {
    return (word.byPOS[pos] || {}).freq || 0;
}

function getExcerpts(word, pos) {
    return (word.byPOS[pos] || {}).excerpts || [];
}

function getDefinitions(word, pos) {
    return word.lookup[pos] || [];
}

var WordPartOfSpeachItem = function WordPartOfSpeachItem(_ref) {
    var active = _ref.active,
        enabled = _ref.enabled,
        label = _ref.label,
        freq = _ref.freq,
        onSelect = _ref.onSelect;

    var classes = classNames(label, 'tab', 'card', { 'empty': !enabled }, { active: active });
    return React$1.createElement(
        'div',
        { onClick: function onClick() {
                return enabled ? onSelect(label) : null;
            }, className: classes },
        React$1.createElement(
            'div',
            { className: 'label' },
            label
        ),
        freq ? React$1.createElement(
            'div',
            { className: 'count badge' },
            freq
        ) : React$1.createElement(
            'div',
            { className: 'count' },
            '\xA0'
        )
    );
};

var WordPartOfSpeachSelector = function WordPartOfSpeachSelector(_ref2) {
    var selected = _ref2.selected,
        word = _ref2.word,
        onSelect = _ref2.onSelect;

    return React$1.createElement(
        'div',
        null,
        PARTS_OF_SPEACH.map(function (pos) {
            return React$1.createElement(WordPartOfSpeachItem, {
                key: pos,
                active: selected === pos,
                enabled: (getExcerpts(word, pos).length || getDefinitions(word, pos).lenght) > 0,
                label: pos,
                freq: getFreq(word, pos),
                onSelect: onSelect });
        })
    );
};

function getSelectedPOS(selection) {
    return selection.POS || index(PARTS_OF_SPEACH, function (pos) {
        return getExcerpts(selection.word, pos).length > 0;
    });
}

var WordDetailBody = function WordDetailBody(_ref) {
    var selection = _ref.selection,
        onSelectPOS = _ref.onSelectPOS;

    var selectedPOS = getSelectedPOS(selection);
    var selectedWord = selection.word;

    return React$1.createElement(
        'div',
        null,
        React$1.createElement(
            'header',
            { className: 'tab-group' },
            React$1.createElement(WordPartOfSpeachSelector, { selected: selectedPOS, word: selectedWord, onSelect: onSelectPOS })
        ),
        React$1.createElement(
            'section',
            null,
            React$1.createElement(WordExcerptList, { excerpts: getExcerpts(selectedWord, selectedPOS) })
        ),
        React$1.createElement(
            'section',
            null,
            React$1.createElement(WordDefinitionList, { definitions: getDefinitions(selectedWord, selectedPOS) })
        )
    );
};

var Spinner = function Spinner(_ref) {
    var big = _ref.big,
        centered = _ref.centered;
    return React.createElement(
        "div",
        { className: classNames("spinner", { big: big }, { centered: centered }) },
        React.createElement("div", { className: "double-bounce1" }),
        React.createElement("div", { className: "double-bounce2" })
    );
};

var WordDetail = function (_React$Component) {
    inherits(WordDetail, _React$Component);

    function WordDetail() {
        classCallCheck(this, WordDetail);
        return possibleConstructorReturn(this, (WordDetail.__proto__ || Object.getPrototypeOf(WordDetail)).apply(this, arguments));
    }

    createClass(WordDetail, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                selection = _props.selection,
                onSelectPOS = _props.onSelectPOS;

            if (selection.word) {
                return React$1.createElement(
                    'div',
                    { className: 'word-detail' },
                    React$1.createElement(
                        'h2',
                        { className: 'head' },
                        React$1.createElement(
                            'span',
                            { className: 'label' },
                            selection.word.token
                        )
                    ),
                    React$1.createElement(
                        'section',
                        { className: 'body' },
                        !selection.word.lookup ? React$1.createElement(Spinner, null) : React$1.createElement(WordDetailBody, {
                            selection: selection,
                            onSelectPOS: onSelectPOS })
                    ),
                    selection.word.lookup ? React$1.createElement(
                        'div',
                        { className: 'attribution' },
                        React$1.createElement(
                            'div',
                            { className: 'attribution_dictionary' },
                            React$1.createElement(
                                'a',
                                { href: selection.word.lookup.attribution.url },
                                selection.word.lookup.attribution.text
                            )
                        ),
                        React$1.createElement(
                            'div',
                            { className: 'attribution_api' },
                            React$1.createElement('img', { src: '/static/img/wordnik_badge.png' })
                        )
                    ) : React$1.createElement('div', null)
                );
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            $(window).scrollTop(0);
        }
    }]);
    return WordDetail;
}(React$1.Component);

var WordListItem = function (_React$Component) {
    inherits(WordListItem, _React$Component);

    function WordListItem() {
        classCallCheck(this, WordListItem);
        return possibleConstructorReturn(this, (WordListItem.__proto__ || Object.getPrototypeOf(WordListItem)).apply(this, arguments));
    }

    createClass(WordListItem, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                word = _props.word,
                onSelect = _props.onSelect;

            return React$1.createElement(
                "div",
                { className: "card word-item", onClick: function onClick() {
                        return onSelect(word);
                    } },
                React$1.createElement(
                    "div",
                    { className: "label" },
                    word.token,
                    word.freq > 1 ? React$1.createElement(
                        "span",
                        { className: "count badge" },
                        word.freq
                    ) : React$1.createElement("span", null)
                ),
                React$1.createElement(
                    "div",
                    { className: "arrow right" },
                    ">"
                )
            );
        }
    }]);
    return WordListItem;
}(React$1.Component);

var DifficultyGroup = function DifficultyGroup(_ref) {
    var level = _ref.level,
        label = _ref.label,
        count = _ref.count,
        active = _ref.active,
        onSelect = _ref.onSelect;

    var classNames$$1 = 'group card ' + (active ? 'active' : '');
    return React$1.createElement(
        'div',
        { className: classNames$$1, onClick: function onClick() {
                return onSelect(level);
            } },
        React$1.createElement(
            'div',
            { className: 'label' },
            label.toLowerCase()
        ),
        React$1.createElement(
            'div',
            { className: 'count badge' },
            count
        )
    );
};

var DifficultySelector = function DifficultySelector(_ref2) {
    var selected = _ref2.selected,
        onSelect = _ref2.onSelect,
        words = _ref2.words;

    var groups = {};
    words.forEach(function (word) {
        groups[word.difficulty.label] = {
            level: word.difficulty.level,
            count: (groups[word.difficulty.label] || { count: 0 }).count + 1
        };
    });

    return React$1.createElement(
        'div',
        { className: 'difficulty' },
        Object.keys(groups).map(function (label) {
            var group = groups[label];
            return React$1.createElement(DifficultyGroup, {
                key: group.level,
                level: group.level,
                count: group.count,
                active: selected === group.level,
                label: label.toLowerCase(),
                onSelect: onSelect });
        })
    );
};

var Heading = function Heading(_ref) {
    var analysis = _ref.analysis;
    return React$1.createElement(
        'div',
        null,
        React$1.createElement(
            'h2',
            { className: 'media' },
            React$1.createElement('img', { className: 'poster', src: analysis.media.poster_url }),
            React$1.createElement(
                'span',
                { className: 'title' },
                analysis.media.title
            )
        ),
        React$1.createElement(
            'div',
            null,
            React$1.createElement(
                'span',
                { className: 'badge' },
                analysis.words.length
            ),
            ' unique words'
        )
    );
};

var WordList = function WordList(_ref2) {
    var analysis = _ref2.analysis,
        selection = _ref2.selection,
        onSelectWord = _ref2.onSelectWord,
        onSelectDifficulty = _ref2.onSelectDifficulty;

    var sortedWords = analysis.words.sort(function (a, b) {
        return a.difficulty.value - b.difficulty.value;
    });

    var wordsWithDifficulty = sortedWords.filter(function (w) {
        return w.difficulty.level === selection.difficulty;
    });

    return React$1.createElement(
        'div',
        { className: 'word-list' },
        React$1.createElement(Heading, { analysis: analysis }),
        React$1.createElement(DifficultySelector, {
            selected: selection.difficulty,
            onSelect: onSelectDifficulty,
            words: sortedWords }),
        React$1.createElement(
            'div',
            { className: 'list' },
            wordsWithDifficulty.map(function (item) {
                return React$1.createElement(WordListItem, { key: item.token, word: item,
                    onSelect: onSelectWord });
            })
        )
    );
};

var Analysis = function (_React$Component) {
    inherits(Analysis, _React$Component);

    function Analysis(_ref) {
        var analysis = _ref.analysis;
        classCallCheck(this, Analysis);

        var _this = possibleConstructorReturn(this, (Analysis.__proto__ || Object.getPrototypeOf(Analysis)).call(this));

        _this.state = { selection: { difficulty: 3, POS: undefined, word: undefined } };
        return _this;
    }

    createClass(Analysis, [{
        key: 'handleSelectWord',
        value: function handleSelectWord(word) {
            this.setState(function (prevState) {
                prevState.listScrollPos = $(window).scrollTop();
                prevState.selection.word = word;
            });
            this.lookupWord(word);
        }
    }, {
        key: 'handleSelectDifficulty',
        value: function handleSelectDifficulty(difficulty) {
            this.setState(function (prevState) {
                prevState.selection.difficulty = difficulty;
            });
        }
    }, {
        key: 'handleSelectPOS',
        value: function handleSelectPOS(POS) {
            this.setState(function (prevState) {
                prevState.selection.POS = POS;
            });
        }
    }, {
        key: 'handleUnselectWord',
        value: function handleUnselectWord() {
            window.location.hash = '';
            this.setState(function (prevState) {
                delete prevState.selection.POS;
                delete prevState.selection.word;
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.onpopstate = this.handleUnselectWord.bind(this);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (!this.state.selection.word && this.state.listScrollPos) {
                $(window).scrollTop(this.state.listScrollPos);
                delete this.state.listScrollPos;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var analysis = this.props.analysis;

            return React$1.createElement(
                'div',
                null,
                React$1.createElement(Nav, { analysis: analysis,
                    selection: this.state.selection,
                    onClick: function onClick() {
                        return _this2.handleUnselectWord();
                    } }),
                React$1.createElement(
                    'section',
                    { className: 'container' },
                    React$1.createElement(
                        'div',
                        { className: 'analysis' },
                        this.state.selection.word ? React$1.createElement(WordDetail, {
                            selection: this.state.selection,
                            onSelectPOS: function onSelectPOS(p) {
                                return _this2.handleSelectPOS(p);
                            } }) : React$1.createElement(WordList, {
                            analysis: analysis,
                            selection: this.state.selection,
                            onSelectDifficulty: function onSelectDifficulty(d) {
                                return _this2.handleSelectDifficulty(d);
                            },
                            onSelectWord: function onSelectWord(w) {
                                return _this2.handleSelectWord(w);
                            } })
                    )
                )
            );
        }
    }, {
        key: 'lookupWord',
        value: function lookupWord(word) {
            var _this3 = this;

            var xhr = API.lookupWord(word);
            xhr.then(function (res) {
                _this3.setState(function (prevState) {
                    if (prevState.selection.word) {
                        prevState.selection.word.lookup = res;
                    }
                });
            });
            return xhr;
        }
    }]);
    return Analysis;
}(React$1.Component);

var Intro = function Intro() {
  return React.createElement(
    "div",
    { className: "step-by-step" },
    React.createElement(
      "ol",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          null,
          React.createElement(
            "strong",
            null,
            "search"
          ),
          " for a movie"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          null,
          React.createElement(
            "strong",
            null,
            "browse"
          ),
          " its vocabulary"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          null,
          React.createElement(
            "strong",
            null,
            "learn"
          ),
          " new words"
        )
      )
    )
  );
};

var SearchBar = function SearchBar(_ref) {
    var onSearch = _ref.onSearch;

    var debouncedSearch = $.debounce(500, function (e) {
        return onSearch(e.target.value);
    });

    return React.createElement(
        "div",
        { className: "search" },
        React.createElement("div", { className: "search-input" }),
        React.createElement(
            "div",
            { className: "search-wrapper" },
            React.createElement("input", { type: "text",
                className: "searchbar",
                name: "q",
                autoFocus: true,
                autoComplete: "off",
                onChange: function onChange(e) {
                    e.persist();
                    debouncedSearch(e);
                },
                placeholder: "Search movie ..." })
        )
    );
};

var Attribution = function Attribution() {
    return React.createElement(
        "footer",
        { className: "credit" },
        "Posters provided by ",
        React.createElement(
            "a",
            { href: "https://fanart.tv" },
            "fanart.tv"
        )
    );
};

var SearchResultItem = function SearchResultItem(_ref) {
    var item = _ref.item,
        onSelect = _ref.onSelect;
    return React.createElement(
        'div',
        { className: 'search-result-item', onClick: function onClick() {
                return onSelect(item.id);
            } },
        React.createElement(
            'a',
            { className: 'header' },
            item.poster_url ? React.createElement('img', { className: 'poster', src: item.poster_url }) : React.createElement('img', { className: 'poster empty', src: '/static/img/placeholder.png' })
        ),
        React.createElement(
            'div',
            { className: 'footer' },
            item.title
        )
    );
};

var SearchResults = function SearchResults(_ref2) {
    var items = _ref2.items,
        onSelect = _ref2.onSelect;

    var slickSettings = {
        'infinite': false,
        'slidesToShow': 4,
        'slidesToScroll': 4,
        'responsive': [{
            'breakpoint': 1024,
            'settings': {
                'slidesToShow': 4,
                'slidesToScroll': 4
            }
        }, {
            'breakpoint': 600,
            'settings': {
                'slidesToShow': 3,
                'slidesToScroll': 3
            }
        }, {
            'breakpoint': 480,
            'settings': {
                'slidesToShow': 2,
                'slidesToScroll': 2
            }
        }]
    };

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { className: 'search-result-wrapper' },
            React.createElement(
                'div',
                { className: 'search-result' },
                items.length === 0 ? React.createElement(
                    'div',
                    { className: 'empty' },
                    ' No movie was found. '
                ) : React.createElement(
                    Slider,
                    slickSettings,
                    items.map(function (item) {
                        return React.createElement(
                            'div',
                            { key: item.id },
                            React.createElement(SearchResultItem, { item: item, onSelect: onSelect })
                        );
                    })
                )
            )
        ),
        items.length !== 0 ? React.createElement(Attribution, null) : React.createElement('span', null)
    );
};

var Search = function (_React$Component) {
    inherits(Search, _React$Component);

    function Search() {
        classCallCheck(this, Search);

        var _this = possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

        _this.state = { items: undefined };
        return _this;
    }

    createClass(Search, [{
        key: 'handleSearch',
        value: function handleSearch(query) {
            var _this2 = this;

            this.setState(function (prevState) {
                if (prevState.searchXHR) {
                    prevState.searchXHR.abort();
                }

                prevState.searchXHR = _this2.searchMovie(query);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var onSelect = this.props.onSelect;

            return React$1.createElement(
                'div',
                null,
                React$1.createElement(Nav, null),
                React$1.createElement(
                    'section',
                    { className: 'container' },
                    React$1.createElement(
                        'h1',
                        { className: 'heading' },
                        'Use movies to discover new vocabulary.'
                    ),
                    React$1.createElement(SearchBar, { onSearch: function onSearch(q) {
                            return _this3.handleSearch(q);
                        } }),
                    this.state.searchXHR ? React$1.createElement(Spinner, { big: true }) : this.state.items === undefined ? React$1.createElement(Intro, null) : React$1.createElement(SearchResults, { items: this.state.items,
                        onSelect: onSelect })
                )
            );
        }
    }, {
        key: 'searchMovie',
        value: function searchMovie(query) {
            var _this4 = this;

            if (query && query.trim() === '') {
                return;
            }

            var xhr = API.searchMovie(query);
            xhr.then(function (res) {
                _this4.setState(function (prevState) {
                    prevState.searchXHR = undefined;
                    prevState.items = res.hits;
                });
            }).catch(function (err) {
                if (err.statusText === 'abort') {
                    return;
                }
                document.location.href = "/error";
            });
            return xhr;
        }
    }]);
    return Search;
}(React$1.Component);

var App = function (_React$Component) {
    inherits(App, _React$Component);

    function App() {
        classCallCheck(this, App);

        var _this = possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {};
        return _this;
    }

    createClass(App, [{
        key: 'handleSelection',
        value: function handleSelection(movieId) {
            var _this2 = this;

            this.setState(function (prevState) {
                if (prevState.analysisXHR) {
                    prevState.analysisXHR.abort();
                }

                prevState.analysisXHR = _this2.loadAnalysis(movieId);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React$1.createElement(
                'div',
                null,
                this.state.analysisXHR ? React$1.createElement(
                    'div',
                    null,
                    React$1.createElement(Nav, null),
                    React$1.createElement(Spinner, { big: true, centered: true })
                ) : this.state.analysis ? React$1.createElement(Analysis, { analysis: this.state.analysis }) : React$1.createElement(Search, { onSelect: function onSelect(id) {
                        return _this3.handleSelection(id);
                    } })
            );
        }
    }, {
        key: 'loadAnalysis',
        value: function loadAnalysis(movieId) {
            var _this4 = this;

            var xhr = API.loadAnalysis(movieId);
            xhr.then(function (res) {
                _this4.setState(function (prevState) {
                    prevState.analysisXHR = undefined;
                    prevState.analysis = res;
                });
            }).catch(function (err) {
                if (err.statusText === 'abort') {
                    return;
                }
                document.location.href = "/error";
            });
            return xhr;
        }
    }]);
    return App;
}(React$1.Component);

window.onload = function () {
    var container = document.getElementById('main');
    ReactDOM.render(React$1.createElement(App, null), container);
};

}(React,ReactDOM,$,classNames,Slider));
