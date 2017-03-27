/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BrowserAdapter = {
  // Basic logging
  log: function log() {
    var _console;

    (_console = console).log.apply(_console, arguments);
  },
  debug: function debug() {
    var _console2;

    (_console2 = console).debug.apply(_console2, arguments);
  },
  info: function info() {
    var _console3;

    (_console3 = console).info.apply(_console3, arguments);
  },
  warn: function warn() {
    var _console4;

    (_console4 = console).warn.apply(_console4, arguments);
  },
  error: function error() {
    var _console5;

    (_console5 = console).error.apply(_console5, arguments);
  },

  // Grouping
  group: function group() {
    var _console6;

    (_console6 = console).group.apply(_console6, arguments);
  },
  groupCollapsed: function groupCollapsed() {
    var _console7;

    (_console7 = console).groupCollapsed.apply(_console7, arguments);
  },
  groupEnd: function groupEnd() {
    var _console8;

    (_console8 = console).groupEnd.apply(_console8, arguments);
  },

  // Misc
  assert: function assert() {
    var _console9;

    (_console9 = console).assert.apply(_console9, arguments);
  },
  count: function count() {
    var _console10;

    (_console10 = console).count.apply(_console10, arguments);
  },
  clear: function clear() {
    var _console11;

    (_console11 = console).clear.apply(_console11, arguments);
  },
  dir: function dir() {
    var _console12;

    (_console12 = console).dir.apply(_console12, arguments);
  },
  dirxml: function dirxml() {
    var _console13;

    (_console13 = console).dirxml.apply(_console13, arguments);
  },
  profile: function profile() {
    var _console14;

    (_console14 = console).profile.apply(_console14, arguments);
  },
  profileEnd: function profileEnd() {
    var _console15;

    (_console15 = console).profileEnd.apply(_console15, arguments);
  },
  time: function time() {
    var _console16;

    (_console16 = console).time.apply(_console16, arguments);
  },
  timeEnd: function timeEnd() {
    var _console17;

    (_console17 = console).timeEnd.apply(_console17, arguments);
  },
  timeStamp: function timeStamp() {
    var _console18;

    (_console18 = console).timeStamp.apply(_console18, arguments);
  },
  trace: function trace() {
    var _console19;

    (_console19 = console).trace.apply(_console19, arguments);
  }
};

exports.default = BrowserAdapter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browserAdapter = __webpack_require__(0);

var _browserAdapter2 = _interopRequireDefault(_browserAdapter);

var _formatter = __webpack_require__(2);

var _formatter2 = _interopRequireDefault(_formatter);

var _namespaceManager = __webpack_require__(3);

var _namespaceManager2 = _interopRequireDefault(_namespaceManager);

var _stylesheet = __webpack_require__(4);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Logalize() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  Logalize.print.apply(Logalize, ['log'].concat(args));
}

Object.assign(Logalize, {
  init: function init() {
    this.configure();
  },
  configure: function configure() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$enabled = _ref.enabled,
        enabled = _ref$enabled === undefined ? true : _ref$enabled,
        _ref$enableFormatting = _ref.enableFormatting,
        enableFormatting = _ref$enableFormatting === undefined ? true : _ref$enableFormatting,
        _ref$collapseNamespac = _ref.collapseNamespaces,
        collapseNamespaces = _ref$collapseNamespac === undefined ? false : _ref$collapseNamespac;

    Object.assign(this, {
      enabled: enabled,
      enableFormatting: enableFormatting,
      collapseNamespaces: collapseNamespaces,
      formattableMethods: ['log', 'info', 'debug', 'warn', 'error', 'focus']
    });

    if (this.enableFormatting) {
      this.appendStylesToDOM();
    } else {
      this.removeStylesFromDOM();
    }

    _namespaceManager2.default.configure({
      loggingEnabled: this.isEnabled(),
      collapsed: this.collapseNamespaces
    });
  },
  namespace: function namespace() {
    var _ref2;

    var returnValue = _namespaceManager2.default.setNamespace.apply(_namespaceManager2.default, arguments);
    return typeof (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]) === 'function' ? returnValue : this;
  },
  log: function log() {
    this.print.apply(this, ['log'].concat(Array.prototype.slice.call(arguments)));
  },
  debug: function debug() {
    this.print.apply(this, ['debug'].concat(Array.prototype.slice.call(arguments)));
  },
  info: function info() {
    this.print.apply(this, ['info'].concat(Array.prototype.slice.call(arguments)));
  },
  warn: function warn() {
    this.print.apply(this, ['warn'].concat(Array.prototype.slice.call(arguments)));
  },
  error: function error() {
    this.print.apply(this, ['error'].concat(Array.prototype.slice.call(arguments)));
  },
  assert: function assert() {
    this.print.apply(this, ['assert'].concat(Array.prototype.slice.call(arguments)));
  },
  count: function count(label) {
    this.print('count', label);
  },
  dir: function dir(obj) {
    this.print('dir', obj);
  },
  dirxml: function dirxml(obj) {
    this.print('dirxml', obj);
  },
  profile: function profile() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var func = args.pop();
    if (typeof func === 'function') {
      if (this.isEnabled()) _browserAdapter2.default.profile(args[0]);
      var returnValue = func();
      if (this.isEnabled()) this.profileEnd();
      return returnValue;
    } else {
      if (this.isEnabled()) _browserAdapter2.default.profile(args[0]);
    }
  },
  profileEnd: function profileEnd() {
    if (this.isEnabled()) _browserAdapter2.default.profileEnd();
  },
  time: function time() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var func = args.pop();
    if (typeof func === 'function') {
      if (this.isEnabled()) _browserAdapter2.default.time(args[0]);
      var returnValue = func();
      if (this.isEnabled()) this.timeEnd(args[0]);
      return returnValue;
    } else {
      if (this.isEnabled()) _browserAdapter2.default.time(args[0]);
    }
  },
  timeEnd: function timeEnd(label) {
    if (this.isEnabled()) _browserAdapter2.default.timeEnd(label);
  },
  timeStamp: function timeStamp(label) {
    if (this.isEnabled()) _browserAdapter2.default.timeStamp(label);
  },
  trace: function trace(obj) {
    this.print('trace', obj);
  },
  group: function group() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var func = args.pop();
    if (typeof func === 'function') {
      if (this.isEnabled()) _browserAdapter2.default.group.apply(_browserAdapter2.default, _toConsumableArray(args));
      var returnValue = func();
      if (this.isEnabled()) this.groupEnd();
      return returnValue;
    } else {
      if (this.isEnabled()) _browserAdapter2.default.group.apply(_browserAdapter2.default, _toConsumableArray(args).concat([func]));
    }
  },
  groupCollapsed: function groupCollapsed() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    var func = args.pop();
    if (typeof func === 'function') {
      if (this.isEnabled()) _browserAdapter2.default.groupCollapsed.apply(_browserAdapter2.default, _toConsumableArray(args));
      var returnValue = func();
      if (this.isEnabled()) this.groupEnd();
      return returnValue;
    } else {
      if (this.isEnabled()) _browserAdapter2.default.groupCollapsed.apply(_browserAdapter2.default, _toConsumableArray(args).concat([func]));
    }
  },
  groupEnd: function groupEnd() {
    if (this.isEnabled()) _browserAdapter2.default.groupEnd();
  },
  print: function print(method) {
    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    if (!this.isEnabled()) return;

    if (this.formattableMethods.indexOf(method) > -1 && this.enableFormatting) {
      args = _formatter2.default.format(args);
    }

    _namespaceManager2.default.group();
    _browserAdapter2.default[method].apply(_browserAdapter2.default, _toConsumableArray(args));
  },


  // Enable / disable

  enable: function enable() {
    if (localStorage) localStorage.setItem('logalizeEnabled', 'true');
    _namespaceManager2.default.configure({ loggingEnabled: this.isEnabled() });
  },
  disable: function disable() {
    if (localStorage) localStorage.setItem('logalizeEnabled', 'false');
    _namespaceManager2.default.configure({ loggingEnabled: this.isEnabled() });
  },


  // Private

  isEnabled: function isEnabled() {
    if (localStorage && localStorage.logalizeEnabled) {
      return localStorage.logalizeEnabled !== 'false';
    } else {
      return this.enabled;
    }
  },
  performConsoleAction: function performConsoleAction(action, args) {
    _namespaceManager2.default.clear();
    return _browserAdapter2.default[action].apply(_browserAdapter2.default, _toConsumableArray(args));
  },
  appendStylesToDOM: function appendStylesToDOM() {
    if (document.getElementById('logalize-stylesheet')) return;
    var styleEl = document.createElement('style');
    styleEl.id = 'logalize-stylesheet';
    styleEl.innerHTML = _stylesheet2.default;
    document.head.insertBefore(styleEl, document.head.firstChild);
  },
  removeStylesFromDOM: function removeStylesFromDOM() {
    var stylesheetEl = document.getElementById('logalize-stylesheet');
    if (!stylesheetEl) return;
    stylesheetEl.remove();
  }
});

exports.default = Logalize;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Formatter = {
  format: function format(args) {
    var _result2;

    var formattedStrings = [];
    var styles = [];
    var formattedArgCount = 0;
    var result;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var arg = _step.value;

        arg = this.formatObject(arg);
        if (typeof arg === 'undefined' || !arg[1].length) break;
        formattedStrings.push(arg[0]);
        styles.push.apply(styles, _toConsumableArray(arg[1]));
        formattedArgCount += 1;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    args.splice(0, formattedArgCount);
    result = [];
    if (formattedStrings.length) {
      var _result;

      result.push(formattedStrings.join(' '));
      (_result = result).push.apply(_result, styles);
    }
    (_result2 = result).push.apply(_result2, _toConsumableArray(args));
    return result;
  },
  formatObject: function formatObject(obj) {
    if (typeof obj !== 'string') return;
    return this.formatString(obj);
  },
  formatString: function formatString(string) {
    var styles = [];
    var classes;

    while (this.canFormat(string)) {
      var match = this.getRelevantMatch(string);
      if (typeof match.format.classes === 'string') {
        classes = match.format.classes;
      } else {
        classes = match.format.classes(match.match);
      }

      string = string.replace(match.format.regex, function (_, m) {
        return '%c' + m + '%c';
      });
      styles.push(this.computeStyle(classes));
      styles.push(this.computeStyle('default'));
    }

    return [string, styles];
  },
  canFormat: function canFormat(string) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.formats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var format = _step2.value;

        if (format.regex.test(string)) return true;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return false;
  },
  getRelevantMatch: function getRelevantMatch(string) {
    var matches = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this.formats[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var format = _step3.value;

        if (format.regex.test(string)) {
          matches.push({ match: string.match(format.regex), format: format });
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return matches.sort(function (a, b) {
      return a.match.index - b.match.index;
    })[0];
  },
  computeStyle: function computeStyle(classes) {
    // Create a temporary div to compute styles
    var div = document.createElement('div');
    div.id = 'logalize';
    div.className = classes;

    // Append the div to the DOM and compute styles
    document.getElementsByTagName('body')[0].appendChild(div);
    var computedStyle = getComputedStyle(div);
    var styles = [];

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = this.supportedStyles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var s = _step4.value;

        styles.push(s + ':' + computedStyle.getPropertyValue(s));
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    div.remove();

    return styles.join(';');
  },


  /* eslint-disable indent, no-useless-escape */
  supportedStyles: ['margin', 'color', 'background-color', 'border-radius', 'padding', 'font-weight', 'font-style', 'text-decoration'],

  formats: [{
    // **bold**
    regex: /\*\*([^\*]+)\*\*/,
    classes: 'bold'
  }, {
    // *italic*
    regex: /\*([^\*]+)\*/,
    classes: 'italic'
  }, {
    // ~strikethrough~
    regex: /~([^~]+)~/,
    classes: 'strikethrough'
  }, {
    // _underline_
    regex: /_([^_]+)_/,
    classes: 'underline'
  }, {
    // [badge]
    regex: /\[([^\[\]]+)\](\.[\.\w]+)?/,
    classes: function badgeClasses(match) {
      var classes = 'badge';
      if (match[2]) classes += match[2] && match[2].split('.').join(' ');
      return classes;
    }
  }, {
    // custom
    // [my text].class1.class2
    regex: /\{([^\{\}]+)\}(\.[\.\w]+)/,
    classes: function classes(match) {
      return match[2].split('.').join(' ');
    }
  }]
};

exports.default = Formatter;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _browserAdapter = __webpack_require__(0);

var _browserAdapter2 = _interopRequireDefault(_browserAdapter);

var _utils = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var NamespaceManager = {
  clojureStack: [],
  currentStack: [],
  previousStack: [],
  configure: function configure(configObject) {
    Object.assign(this, configObject);
    this.clear();
    this.currentStack = [];
  },
  setNamespace: function setNamespace() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[args.length - 1] === 'function') {
      var func = args.pop();
      if (this.loggingEnabled) this.clojureStack.push(args);
      var returnValue = func();
      if (this.loggingEnabled) {
        var currentClojure = this.clojureStack.pop();
        currentClojure.forEach(function () {
          _this.previousStack.pop();
          _browserAdapter2.default.groupEnd();
        });
      }
      return returnValue;
    } else if (this.loggingEnabled) {
      this.currentStack.push(args);
    }
  },
  group: function group() {
    var combinedStack = [];

    var _arr = [].concat(_toConsumableArray(this.clojureStack), _toConsumableArray(this.currentStack));

    for (var _i = 0; _i < _arr.length; _i++) {
      var n = _arr[_i];combinedStack.push.apply(combinedStack, _toConsumableArray(n));
    }if (!(0, _utils.compareArrays)(this.previousStack, combinedStack)) {
      var commonSize = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.previousStack.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var i = _ref2[0];
          var val = _ref2[1];

          if (val === combinedStack[i]) {
            commonSize += 1;
          } else {
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var deleteSize = this.previousStack.length - commonSize;
      for (var _i2 = 0; _i2 < deleteSize; _i2++) {
        _browserAdapter2.default.groupEnd();
      }var toAdd = combinedStack.slice(commonSize);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = toAdd[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _n = _step2.value;
          _browserAdapter2.default[this._groupingMethod()](_n);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    this.previousStack = combinedStack;
    this.currentStack = [];
  },
  clear: function clear() {
    [].concat(_toConsumableArray(this.clojureStack), _toConsumableArray(this.currentStack), _toConsumableArray(this.previousStack)).forEach(function () {
      return _browserAdapter2.default.groupEnd();
    });
    this.previousStack = [];
  },
  _groupingMethod: function _groupingMethod() {
    return this.collapsed ? 'groupCollapsed' : 'group';
  }
};

exports.default = NamespaceManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "#logalize {\n  color: black;\n  background-color: transparent;\n  border-radius: 0;\n  padding: 0;\n  margin: 0;\n  font-weight: normal;\n  font-style: normal;\n  display: none; }\n  #logalize.badge {\n    color: white;\n    background-color: black;\n    border-radius: 3px;\n    padding: 2px;\n    margin: 0 2px; }\n    #logalize.badge.blue {\n      color: white;\n      background-color: #61afef; }\n    #logalize.badge.orange {\n      color: white;\n      background-color: #d19a66; }\n    #logalize.badge.red {\n      color: white;\n      background-color: #e06c75; }\n    #logalize.badge.green {\n      color: white;\n      background-color: #98c379; }\n    #logalize.badge.cyan {\n      color: white;\n      background-color: #56b6c2; }\n    #logalize.badge.purple {\n      color: white;\n      background-color: #c678dd; }\n    #logalize.badge.focus {\n      color: #bada55;\n      background: #444; }\n  #logalize.blue {\n    color: #4078f2; }\n  #logalize.orange {\n    color: #986801; }\n  #logalize.red {\n    color: #e45649; }\n  #logalize.green {\n    color: #50a14f; }\n  #logalize.cyan {\n    color: #0184bc; }\n  #logalize.purple {\n    color: #a626a4; }\n  #logalize.bold {\n    font-weight: bold; }\n  #logalize.italic {\n    font-style: italic; }\n  #logalize.strikethrough {\n    text-decoration: line-through; }\n  #logalize.underline {\n    text-decoration: underline; }\n";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.compareArrays = compareArrays;


function compareArrays(array1, array2) {
  if (array1.length !== array2.length) return false;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array1.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var i = _ref2[0];
      var val = _ref2[1];

      if (val instanceof Array && array2[i] instanceof Array) {
        if (!compareArrays(val, array2[i])) return false;
      } else if (val !== array2[i]) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.logalize = _2.default;
window.logalize.init();

/***/ })
/******/ ]);