/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 94);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = __webpack_require__(0);

/**
 * Wrapper for our document schemas.
 *
 *   Adds modifiedAt property.
 *
 * @class Schema
 * @extends {mongoose.Schema}
 */

var Schema = function (_mongoose$Schema) {
  _inherits(Schema, _mongoose$Schema);

  function Schema(schema) {
    _classCallCheck(this, Schema);

    return _possibleConstructorReturn(this, (Schema.__proto__ || Object.getPrototypeOf(Schema)).call(this, Object.assign({
      modifiedAt: { type: Date, default: Date.now }
    }, schema)));
  }

  return Schema;
}(mongoose.Schema);

Schema.Types = mongoose.Schema.Types;

module.exports = Schema;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _Question = __webpack_require__(11);

var _Question2 = _interopRequireDefault(_Question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);


var surveySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  enabled: { type: Boolean, default: true },
  question: { type: {}, get: function get(q) {
      return new _Question2.default(q);
    }, required: true },
  respondents: { type: [] },
  aggregates: { type: [] },
  postProcessing: { type: [] }
});
surveySchema.index({ name: 1 });
surveySchema.index({ enabled: 1, name: 1 });

Object.assign(surveySchema.methods, {
  respondentsIn: /*#__PURE__*/regeneratorRuntime.mark(function respondentsIn(answer, context) {
    var idx;
    return regeneratorRuntime.wrap(function respondentsIn$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context = Object.assign({}, context, { refQ: this.question });

            if (!(!this.respondents || !this.respondents.length)) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return { question: answer.rootQuestion, context: context };

          case 4:
            _context.next = 14;
            break;

          case 6:
            context.respondents = this.respondents;
            idx = 0;

          case 8:
            if (!(idx < this.respondents.length)) {
              _context.next = 14;
              break;
            }

            context.idx = idx;
            return _context.delegateYield(answer.rootQuestion.findRespondents(context), 't0', 11);

          case 11:
            idx++;
            _context.next = 8;
            break;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, respondentsIn, this);
  })
});

module.exports = mongoose.model('Survey', surveySchema);

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

__webpack_require__(3);

var Schema = __webpack_require__(1);
var Text = __webpack_require__(12);
var mongoose = __webpack_require__(0);

var questionSchema = new Schema({
  type: { type: String },
  tags: [{ type: String }],
  text: { type: Text },
  number: { type: String },
  position: { type: String },
  options: [{
    position: { type: String, required: true },
    option: { type: {}, required: true }
  }],
  children: [{
    position: { type: String, required: true },
    question: {
      type: {},
      get: function get(q) {
        return new Question(q);
      },

      required: true
    }
  }],
  flow: {
    pre: { type: Object },
    question: { type: Object },
    answer: { type: Object },
    child: { type: Object },
    post: { type: Object },
    exit: { type: Object }
  }
});

Object.assign(questionSchema.methods, {
  isParent: function isParent(number) {
    if (!this.number) return true;
    return number === this.number || number.startsWith(this.number + '.');
  },
  find: function find(number) {
    if (!this.isParent(number)) return null;

    if (this.number === number) return this;
    var child = this.children.find(function (el) {
      return el.question && el.question.isParent(number);
    });
    if (child) {
      return child.question.find(number);
    } else {
      return null;
    }
  },
  findChildByPosition: function findChildByPosition(pos) {
    var ret = this.children.find(function (el) {
      return el.position == pos;
    });
    if (ret) {
      return ret.question;
    }
    return null;
  },
  findOptionByPosition: function findOptionByPosition(pos) {
    return this.options.find(function (el) {
      return el.position == pos;
    });
  },
  values: /*#__PURE__*/regeneratorRuntime.mark(function values(answer) {
    var qType, qFlow, qValue, qConcat, opts, valueF, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, o, value, ansValue, _ansValue$split, _ansValue$split2, lat, long;

    return regeneratorRuntime.wrap(function values$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            qType = this.type, qFlow = this.flow;
            qValue = void 0, qConcat = void 0;

            if (!(qType === 'ROOT' || qType === 'DUMMY' || qType === 'MESSAGE')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return');

          case 4:
            opts = answer.logged_options;

            if (!(!opts || !opts.length)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return');

          case 7:

            if (qFlow && qFlow.pre.fill.length) qValue = 1;

            if (qType === 'MULTIPLE_CHOICE') qConcat = 1;
            if (qType === 'INPUT' || qType === 'INFO' || qType === 'CONFIRMATION' || qType === 'GPS') qValue = 1;

            valueF = function valueF(el) {
              return qValue ? (el.value || el.text.english || '').toUpperCase() : el.position;
            };

            if (!qConcat) {
              _context.next = 42;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 15;
            _iterator = opts[Symbol.iterator]();

          case 17:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 27;
              break;
            }

            o = _step.value;
            value = valueF(o);

            if (value) {
              _context.next = 22;
              break;
            }

            return _context.abrupt('continue', 24);

          case 22:
            _context.next = 24;
            return { key: '_opt' + valueF(o), value: 1 };

          case 24:
            _iteratorNormalCompletion = true;
            _context.next = 17;
            break;

          case 27:
            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context['catch'](15);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 33:
            _context.prev = 33;
            _context.prev = 34;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 36:
            _context.prev = 36;

            if (!_didIteratorError) {
              _context.next = 39;
              break;
            }

            throw _iteratorError;

          case 39:
            return _context.finish(36);

          case 40:
            return _context.finish(33);

          case 41:
            return _context.abrupt('return');

          case 42:
            ansValue = valueF(opts[0]);

            if (!(qType === 'GPS')) {
              _context.next = 53;
              break;
            }

            _ansValue$split = ansValue.split(','), _ansValue$split2 = _slicedToArray(_ansValue$split, 2), lat = _ansValue$split2[0], long = _ansValue$split2[1];

            if (!(!lat || !long)) {
              _context.next = 47;
              break;
            }

            return _context.abrupt('return');

          case 47:
            _context.next = 49;
            return { key: '_lat', value: lat };

          case 49:
            _context.next = 51;
            return { key: '_long', value: long };

          case 51:
            _context.next = 55;
            break;

          case 53:
            _context.next = 55;
            return { key: '', value: ansValue };

          case 55:
          case 'end':
            return _context.stop();
        }
      }
    }, values, this, [[15, 29, 33, 41], [34,, 36, 40]]);
  })
});

var Question = mongoose.model('Question', questionSchema);
exports.default = Question;

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);

module.exports = new Schema({
  default: { type: String },
  english: { type: String },
  tamil: { type: String },
  hindi: { type: String }
});

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildTemplate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Process = __webpack_require__(7);

var _Process2 = _interopRequireDefault(_Process);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _child_process = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChildProcess = function () {
  function ChildProcess(opts) {
    _classCallCheck(this, ChildProcess);

    Object.assign(this, opts);
  }

  _createClass(ChildProcess, [{
    key: 'execute',
    value: function execute(args) {
      var _this = this;

      this.procName = this.procName || this.constructor.procName || this.constructor.name || 'Unknown';
      this.procPath = this.procPath || this.constructor.procPath;
      if (!this.procPath) {
        throw new Error('No process path configured for class: ' + this.constructor.name);
      }

      var createP = _Process2.default.create({
        name: this.procName,
        status: 'RUNNING',
        path: this.procPath,
        args: args
      });

      var promise = new Promise(function (res, rej) {
        createP.then(function (proc) {
          var p = (0, _child_process.spawn)(process.execPath, ['build/procs/' + _this.procPath + '.js', proc._id]);
          var stdout = [];
          var stderr = [];

          p.on('close', function (code, signal) {
            proc.exitSignal = signal;
            proc.exitCode = code;
            proc.status = 'COMPLETED';
            proc.stdout = stdout.join('');
            proc.stderr = stderr.join('');
            proc.endDate = new Date();
            proc.save().then(res).catch(rej);
          });
          p.stdout.on('data', function (data) {
            stdout = stdout.concat(data);
          });
          p.stderr.on('data', function (data) {
            return stderr = stderr.concat(data);
          });
        }).catch(rej);
      });
      return { createP: createP, promise: promise };
    }
  }]);

  return ChildProcess;
}();

exports.default = ChildProcess;

var ChildTemplate = exports.ChildTemplate = function ChildTemplate(procArgs) {
  var _this2 = this;

  _classCallCheck(this, ChildTemplate);

  if (_mongoose2.default.Types.ObjectId.isValid(procArgs)) {
    this.promise = _Process2.default.findOne({ _id: procArgs }).then(function (proc) {
      return proc || Promise.reject('Not found: proc ' + procArgs);
    });
  } else if ((typeof procArgs === 'undefined' ? 'undefined' : _typeof(procArgs)) === 'object' && procArgs._id) {
    this.promise = Promise.resolve(procArgs);
  } else {
    this.promise = Promise.reject('Unknown process/id: ' + procArgs);
  };
  this.promise = this.promise.then(function (proc) {
    return _this2.execute(proc);
  }).then(function (output) {
    return console.log('Output: ', output);
  }).catch(function (err) {
    return console.log('Error: ', err);
  });
};

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Mixin helper.  Extend and define mixin methods
 */
var Mixin = function () {
  function Mixin(klass) {
    _classCallCheck(this, Mixin);

    var C = function (_klass) {
      _inherits(C, _klass);

      function C() {
        _classCallCheck(this, C);

        return _possibleConstructorReturn(this, (C.__proto__ || Object.getPrototypeOf(C)).apply(this, arguments));
      }

      return C;
    }(klass);
    Mixin._copyMethods(C.prototype, this.constructor.prototype);
    return C;
  }

  _createClass(Mixin, null, [{
    key: '_copyMethods',
    value: function _copyMethods(target, src) {
      Object.getOwnPropertyNames(src).forEach(function (prop) {
        if (prop !== 'constructor') {
          target[prop] = src[prop];
        }
      });
    }
  }, {
    key: 'copyTo',
    value: function copyTo(target) {
      this._copyMethods(target, this.prototype);
    }
  }, {
    key: 'mixin',
    value: function mixin(klass) {
      for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        mixins[_key - 1] = arguments[_key];
      }

      return mixins.reduce(function (klass, Mix) {
        return new Mix(klass);
      }, klass);
    }
  }]);

  return Mixin;
}();

exports.default = Mixin;
;

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _Survey = __webpack_require__(10);

var _Survey2 = _interopRequireDefault(_Survey);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles Survey concerns
 */
var _class = function (_Mixin) {
  _inherits(_class, _Mixin);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'getSurvey',
    value: function getSurvey() {
      var _this2 = this;

      return _Survey2.default.findOne({ _id: this.surveyId }).then(function (survey) {
        _this2.survey = survey;
        if (!survey) {
          return Promise.reject('Survey: ' + _this2.surveyId + ' not found.');
        }
      });
    }
  }, {
    key: '_pushKey',
    value: function _pushKey(key, description) {
      var keys = this.collectionKeys;
      if (!keys['pos' + key]) {
        keys.push(key);
        keys['pos' + key] = description;
      }
    }
  }, {
    key: 'getExportHeader',
    value: function getExportHeader() {
      var _this3 = this;

      return _Statistic2.default.findOne({ key: this.surveyId, type: 'SurveyResponseHeader' }).then(function (stat) {
        _this3.collectionKeys = [];
        if (stat && stat.data) {
          _this3.collectionKeys = stat.data.keys;
          if (stat.data.keyDescriptions) {
            _this3.collectionKeys.forEach(function (key, idx) {
              _this3.collectionKeys['pos' + key] = stat.data.keyDescriptions[idx];
            });
          }
        }
      });
    }
  }, {
    key: 'updateExportHeader',
    value: function updateExportHeader() {
      var _this4 = this;

      var data = this.sortKeys().reduce(function (_ref, _ref2) {
        var keys = _ref.keys,
            keyDescriptions = _ref.keyDescriptions;
        var key = _ref2.key,
            index = _ref2.index;

        keys.push(key);
        keyDescriptions.push(_this4.collectionKeys['pos' + key]);
        return { keys: keys, keyDescriptions: keyDescriptions };
      }, { keys: [], keyDescriptions: [] });
      return _Statistic2.default.findOneAndUpdate({ key: this.surveyId, type: 'SurveyResponseHeader' }, { data: data }, { upsert: true });
    }
  }, {
    key: 'sortKeys',
    value: function sortKeys() {
      return this.collectionKeys.map(function (key, index) {
        return { key: key, index: index };
      }).sort(this._keyListComparator.bind(this));
    }
  }, {
    key: '_questionNumberParser',
    value: function _questionNumberParser(acc, el) {
      var match = el.match(/^([a-zA-Z]*)([0-9]*)$/);
      if (match) {
        acc.push({
          num: parseInt(match[2]),
          type: match[1] || '|question'
        });
      }
      return acc;
    }
  }, {
    key: '_keyListComparator',
    value: function _keyListComparator(arr1, arr2) {
      arr1 = arr1.key;
      arr2 = arr2.key;
      var isQNum = arr1.startsWith('Q_');
      var otherIsQNum = arr2.startsWith('Q_');
      if (isQNum) {
        if (!otherIsQNum) return 1;
      } else {
        if (otherIsQNum) return -1;
        arr1 = arr1.split('').reverse().join('');
        arr2 = arr2.split('').reverse().join('');
      }
      arr1 = arr1.split('_').reduce(this._questionNumberParser, []);
      arr2 = arr2.split('_').reduce(this._questionNumberParser, []);

      var len = arr1.length;
      if (arr2.length < len) len = arr2.length;

      for (var i = 0; i < len; i++) {
        if (arr1[i].type < arr2[i].type) return -1;
        if (arr2[i].type < arr1[i].type) return 1;

        if (arr1[i].num < arr2[i].num) return -1;
        if (arr2[i].num < arr1[i].num) return 1;
      }
      return arr1.length - arr2.length;
    }
  }]);

  return _class;
}(_Mixin3.default);

exports.default = _class;

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles Survey concerns
 */
var _class = function (_Mixin) {
  _inherits(_class, _Mixin);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'iterateCursor',
    value: function iterateCursor(query) {
      var _this2 = this;

      var iterProc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'iteration';

      return new Promise(function (res, rej) {
        var promises = [];
        var cursor = query.cursor();
        cursor.on('data', function (doc) {
          return doc && promises.push(_this2[iterProc](doc));
        }).on('end', function () {
          return res(Promise.all(promises));
        });
      });
    }
  }]);

  return _class;
}(_Mixin3.default);

exports.default = _class;

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Process = Proc.default;
var procId = process.argv[2];

if (!procId) {
  process.exit(-1);
}

var proc = new Process(procId);
if (!proc || !proc.promise) {
  process.exit(-1);
}

proc.promise.then(function () {
  return _mongoose2.default.connection.close();
}, function () {
  return _mongoose2.default.connection.close();
});
process.exitCode = 0;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Schema = __webpack_require__(1);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _Schema2.default({
  type: { type: String, required: true },
  key: { type: String, required: true },
  name: { type: String },
  data: { type: {} },
  metadata: { type: {} },
  aggregates: { type: [] }
});
schema.index({ key: 1, type: 1 });

module.exports = _mongoose2.default.model('Statistic', schema);

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  db: {
    connectionOptions: {
      poolSize: 5,
      useMongoClient: true
    },
    connectionString: 'mongodb://localhost/test'
  },
  jwt: {
    secret: 'a general string'
  },
  admin: {
    username: 'ptracking',
    passphrase: 'vaazhvuT'
  },
  routeSecurity: [{ prefix: '/cms', roles: 'root content-manager' }, { prefix: '/app', roles: 'root surveyor' }]
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var processSchema = new Schema({
    name: { type: String, required: true },
    path: { type: String },
    args: { type: {} },
    status: { type: String },
    exitCode: { type: Number },
    stdout: { type: String },
    stderr: { type: String },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date }
});
processSchema.index({ status: 1, name: 1 });
processSchema.index({ name: 1 });

module.exports = mongoose.model('Process', processSchema);

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Constants = __webpack_require__(5);

var _Constants2 = _interopRequireDefault(_Constants);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect to mongoose
var options = _Constants2.default.db;
_mongoose2.default.Promise = global.Promise;

exports.default = _mongoose2.default.connect(options.connectionString, options.connectionOptions);

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
module.exports = __webpack_require__(26);


/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(96);

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _childProcess = __webpack_require__(13);

var _Mixin = __webpack_require__(2);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _SurveyExport = __webpack_require__(24);

var _SurveyExport2 = _interopRequireDefault(_SurveyExport);

var _Cursor = __webpack_require__(25);

var _Cursor2 = _interopRequireDefault(_Cursor);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _csvStringify = __webpack_require__(97);

var _csvStringify2 = _interopRequireDefault(_csvStringify);

var _fs = __webpack_require__(22);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExportResponses = function (_Mixin$mixin) {
  _inherits(ExportResponses, _Mixin$mixin);

  function ExportResponses() {
    _classCallCheck(this, ExportResponses);

    return _possibleConstructorReturn(this, (ExportResponses.__proto__ || Object.getPrototypeOf(ExportResponses)).apply(this, arguments));
  }

  _createClass(ExportResponses, [{
    key: 'execute',
    value: function execute(proc) {
      var _this2 = this;

      this.surveyId = proc.args;
      return this.getSurvey().then(function () {
        return _this2.getExportHeader();
      }).then(function () {
        return _this2.collectStatistics();
      });
    }
  }, {
    key: 'collectStatistics',
    value: function collectStatistics() {
      var _this3 = this;

      return new Promise(function (res, rej) {
        _this3.writer = _this3._createCsvWriter(_this3.surveyId, rej);
        _this3.writer.on('error', rej);
        _this3.writer.write(_this3.collectionKeys);
        _this3.writer.write(_this3.collectionKeys.map(function (k) {
          return _this3.collectionKeys['pos' + k];
        }));
        _this3.rowCount = 2;
        _this3.iterateCursor(_Statistic2.default.find({
          type: 'SurveyResponse',
          key: _this3.surveyId
        }), 'collectOneStatistic').then(function (out) {
          _this3.writer.end(null, null, function () {
            return res({
              processedStats: out,
              numRows: _this3.rowCount
            });
          });
        });
      });
    }
  }, {
    key: 'collectOneStatistic',
    value: function collectOneStatistic(stat) {
      var _this4 = this;

      return new Promise(function (res, rej) {
        _this4.writer.write(_this4.collectionKeys.map(function (k) {
          return stat.data[k];
        }), null, function () {
          ++_this4.rowCount;
          res(stat._id);
        });
      });
    }
  }, {
    key: '_createCsvWriter',
    value: function _createCsvWriter(surveyId, errH) {
      var path = 'data/export-responses/' + surveyId + '.csv';
      var mode = 'w';
      var fileStream = _fs2.default.createWriteStream(path, { encoding: 'utf8', flags: mode });
      if (errH) fileStream.on('error', errH);

      var csvWriter = new _csvStringify2.default();
      csvWriter.pipe(fileStream);
      csvWriter.on('end', function () {
        return fileStream.end();
      });
      return csvWriter;
    }
  }]);

  return ExportResponses;
}(_Mixin2.default.mixin(_childProcess.ChildTemplate, _SurveyExport2.default, _Cursor2.default));

exports.default = ExportResponses;

/***/ }),

/***/ 97:
/***/ (function(module, exports) {

module.exports = require("csv-stringify");

/***/ })

/******/ });