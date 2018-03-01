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
/******/ 	return __webpack_require__(__webpack_require__.s = 86);
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


var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var processSchema = new Schema({
    name: { type: String, required: true },
    path: { type: String },
    args: { type: {} },
    status: { type: String },
    exitCode: { type: Number },
    stdout: { type: String },
    stderr: { type: String }
});
processSchema.index({ status: 1, name: 1 });
processSchema.index({ name: 1 });

module.exports = mongoose.model('Process', processSchema);

/***/ }),

/***/ 11:
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


__webpack_require__(3);

var _Question = __webpack_require__(6);

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
  aggregates: { type: [] }
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

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildTemplate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Process = __webpack_require__(10);

var _Process2 = _interopRequireDefault(_Process);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _child_process = __webpack_require__(15);

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

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Schema = __webpack_require__(1);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _AnsweredQuestion = __webpack_require__(19);

var _AnsweredQuestion2 = _interopRequireDefault(_AnsweredQuestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var answerSchema = new _Schema2.default({
  name: { type: String },
  description: { type: String },
  survey: { type: _Schema2.default.Types.ObjectId, ref: 'Survey', required: true },
  surveyor: { type: String },
  version: { type: Number, default: 0 },
  rootQuestion: {
    type: {}, required: true,
    get: function get(a) {
      return new _AnsweredQuestion2.default(a);
    }
  },
  checksum: { type: String, required: true, unique: true },

  // Post-processing concerns
  lastExport: { type: Date },
  createdAt: { type: Date, default: Date.now }

});
answerSchema.index({ survey: 1, lastExport: 1 });
answerSchema.index({ createdAt: 1, survey: 1 });

module.exports = _mongoose2.default.model('Answer', answerSchema);

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Question2 = __webpack_require__(6);

var _Question3 = _interopRequireDefault(_Question2);

var _Location = __webpack_require__(7);

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Provides export functionalities
 */
var AnsweredQuestion = function (_Question) {
  _inherits(AnsweredQuestion, _Question);

  function AnsweredQuestion() {
    _classCallCheck(this, AnsweredQuestion);

    return _possibleConstructorReturn(this, (AnsweredQuestion.__proto__ || Object.getPrototypeOf(AnsweredQuestion)).apply(this, arguments));
  }

  _createClass(AnsweredQuestion, [{
    key: 'collectRespondent',
    value: /*#__PURE__*/regeneratorRuntime.mark(function collectRespondent(_ref) {
      var acc = _ref.acc,
          prefix = _ref.prefix,
          refQ = _ref.refQ,
          keys = _ref.keys;

      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, ans, obj;

      return regeneratorRuntime.wrap(function collectRespondent$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = this.answers[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 14;
                break;
              }

              ans = _step.value;
              obj = this.collectAnswer({
                acc: Object.assign({}, acc),
                ansKey: prefix,
                ans: ans, keys: keys, refQ: refQ
              });

              if (ans.startTimestamp) {
                obj.START_TIME = ans.startTimestamp;
                obj.END_TIME = ans.endTimestamp;
                if (!keys.posSTART_TIME) {
                  keys.push('START_TIME');
                  keys.push('END_TIME');
                  keys.posSTART_TIME = 'Start time of respondent.';
                  keys.posEND_TIME = 'End time of respondent.';
                }
              }
              _context.next = 11;
              return obj;

            case 11:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 14:
              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 20:
              _context.prev = 20;
              _context.prev = 21;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 23:
              _context.prev = 23;

              if (!_didIteratorError) {
                _context.next = 26;
                break;
              }

              throw _iteratorError;

            case 26:
              return _context.finish(23);

            case 27:
              return _context.finish(20);

            case 28:
            case 'end':
              return _context.stop();
          }
        }
      }, collectRespondent, this, [[3, 16, 20, 28], [21,, 23, 27]]);
    })
  }, {
    key: '_accumulateValue',
    value: function _accumulateValue(ans, ansKey, refQ) {
      if (!ans.logged_options) return {};
      var ret = {};
      if (refQ.type === 'ROOT' || refQ.type === 'DUMMY' || !this.number) {
        return ret;
      }
      if (refQ.type == 'MULTIPLE_CHOICE') {
        ans.logged_options.reduce(function (acc, opt) {
          if (opt.position !== null) {
            acc[ansKey + '_opt' + opt.position] = 1;
          }
          return acc;
        }, ret);
      } else if (refQ.type == 'GPS') {
        var lat = void 0,
            long = void 0,
            val = void 0;
        var opt = ans.logged_options[0];
        val = opt && (opt.value || opt.text.english);
        val = val || '';

        var _val$split = val.split(',');

        var _val$split2 = _slicedToArray(_val$split, 2);

        lat = _val$split2[0];
        long = _val$split2[1];

        ret[ansKey + '_lat'] = lat;
        ret[ansKey + '_long'] = long;
      } else if (['INFO', 'INPUT', 'CONFIRMATION'].indexOf(refQ.type) !== -1 || refQ.flow && refQ.flow.pre.fill.length) {
        ret[ansKey] = ans.logged_options.map(function (opt) {
          return opt.value || opt.text.english;
        }).join(',').toUpperCase();
      } else {
        ret[ansKey] = ans.logged_options.map(function (opt) {
          return opt.position || opt.value || opt.text.english;
        }).join(',');
      }

      if (refQ.flow.pre.fill.length) {
        var _loop = function _loop(el) {
          var field = void 0;
          var type = void 0;
          var other = void 0;

          if (el.endsWith('_NAME')) {
            field = 'name';other = 'code';
          } else if (el.endsWith('_CODE')) {
            field = 'code';other = 'name';
          }
          type = el.slice(0, -5);
          if (type && field) {
            ret[type + '_' + other.toUpperCase()] = _Location2.default.findOne(_defineProperty({
              type: type }, field, ret[ansKey])).then(function (loc) {
              return loc && loc[other] || 'UNKNOWN';
            }).catch(function (err) {
              return console.log(err) || 'UNKNOWN';
            });
          }
        };

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = refQ.flow.pre.fill[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var el = _step2.value;

            _loop(el);
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
      return ret;
    }
  }, {
    key: 'findRespondents',
    value: /*#__PURE__*/regeneratorRuntime.mark(function findRespondents(_ref2) {
      var acc = _ref2.acc,
          prefix = _ref2.prefix,
          keys = _ref2.keys,
          respondents = _ref2.respondents,
          idx = _ref2.idx,
          refQ = _ref2.refQ;

      var number, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, ans, _respChild, childQ, newAcc;

      return regeneratorRuntime.wrap(function findRespondents$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              number = respondents[idx];

              if (this.isParent(number)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return');

            case 3:
              if (this.answers) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return');

            case 5:

              acc = acc || {};
              prefix = prefix || 'Q';
              keys = keys || [];
              prefix = '' + prefix + (this.position || '');

              if (!(this.number === number)) {
                _context2.next = 13;
                break;
              }

              _context2.next = 12;
              return { question: this, context: { acc: acc, keys: keys, prefix: prefix, refQ: refQ } };

            case 12:
              return _context2.abrupt('return');

            case 13:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 16;
              _iterator3 = this.answers[Symbol.iterator]();

            case 18:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 32;
                break;
              }

              ans = _step3.value;

              if (!ans.children) {
                _context2.next = 29;
                break;
              }

              _respChild = ans.children.find(function (child, idx) {
                child = AnsweredQuestion.fromChild(child);
                if (child.isParent(number)) {
                  return child;
                } else {
                  return false;
                }
              });

              if (!_respChild) {
                _context2.next = 29;
                break;
              }

              _respChild = AnsweredQuestion.fromChild(_respChild);
              childQ = refQ.findChildByPosition(_respChild.position);
              newAcc = this.collectAnswer({
                ans: ans, keys: keys, refQ: refQ,
                ansKey: prefix,

                ignore: respondents,
                acc: Object.assign({}, acc)
              });

              if (childQ) {
                _context2.next = 28;
                break;
              }

              throw new Error('Child question ' + _respChild.position + ' not found.\n               In Q ' + (refQ.number || refQ.type) + '.');

            case 28:
              return _context2.delegateYield(_respChild.findRespondents({
                acc: newAcc,
                prefix: prefix + '_',
                refQ: childQ,
                keys: keys, respondents: respondents, idx: idx
              }), 't0', 29);

            case 29:
              _iteratorNormalCompletion3 = true;
              _context2.next = 18;
              break;

            case 32:
              _context2.next = 38;
              break;

            case 34:
              _context2.prev = 34;
              _context2.t1 = _context2['catch'](16);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t1;

            case 38:
              _context2.prev = 38;
              _context2.prev = 39;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 41:
              _context2.prev = 41;

              if (!_didIteratorError3) {
                _context2.next = 44;
                break;
              }

              throw _iteratorError3;

            case 44:
              return _context2.finish(41);

            case 45:
              return _context2.finish(38);

            case 46:
              ;

            case 47:
            case 'end':
              return _context2.stop();
          }
        }
      }, findRespondents, this, [[16, 34, 38, 46], [39,, 41, 45]]);
    })
  }, {
    key: 'collectAnswer',
    value: function collectAnswer(_ref3) {
      var ans = _ref3.ans,
          acc = _ref3.acc,
          ansKey = _ref3.ansKey,
          suffix = _ref3.suffix,
          keys = _ref3.keys,
          ignore = _ref3.ignore,
          refQ = _ref3.refQ;

      acc = acc || {};
      ansKey = ansKey || 'Q';
      suffix = suffix || '';
      keys = keys || [];

      var valObj = this._accumulateValue(ans, ansKey, refQ);
      Object.keys(valObj).forEach(function (key) {
        var oKey = key + suffix;
        acc[oKey] = valObj[key];
        if (!keys['pos' + oKey]) {
          keys.push(oKey);
          var text = valObj['pos' + key];
          if (!text) {
            text = '';
            if (refQ.number) text = text + refQ.number;
            if (refQ.text && refQ.text.english) {
              text = text + (' ' + refQ.text.english);
            }
          }
          keys['pos' + oKey] = text || 'UNKNOWN';
        }
      });

      if (ans.children) {
        ans.children.reduce(function (acc, child) {
          var childQ = refQ.findChildByPosition(child.position);
          var childAnswer = AnsweredQuestion.fromChild(child);
          if (ignore && ignore.reduce(function (acc, ign) {
            return acc || childAnswer.isParent(ign);
          }, false)) return acc;

          if (!childQ) {
            throw new Error('Child question ' + respChild.position + ' not found.\n               In Q ' + (refQ.number || refQ.type) + '.');
          }

          return childAnswer.collect({
            prefix: ansKey + '_',
            refQ: childQ,
            suffix: suffix, keys: keys, acc: acc, ignore: ignore
          });
        }, acc);
      }
      return acc;
    }
  }, {
    key: 'collect',
    value: function collect(_ref4) {
      var _this2 = this;

      var acc = _ref4.acc,
          prefix = _ref4.prefix,
          suffix = _ref4.suffix,
          keys = _ref4.keys,
          ignore = _ref4.ignore,
          refQ = _ref4.refQ;

      acc = acc || {};
      prefix = prefix || 'Q';
      suffix = suffix || '';
      keys = keys || [];

      var pos = refQ.position || '';
      pos = pos.replace(/\./g, '_');
      prefix = '' + prefix + pos;
      return this.answers ? this.answers.reduce(function (acc, ans, idx) {
        var ansKey = prefix;
        var newSuffix = suffix;
        if (refQ.flow && refQ.flow.answer.scope == 'multiple') {
          newSuffix = suffix + ('_ans' + (idx + 1));
        }
        return _this2.collectAnswer({
          ans: ans, idx: idx, acc: acc, ansKey: ansKey, keys: keys, ignore: ignore, refQ: refQ,
          suffix: newSuffix
        });
      }, acc) : acc;
    }
  }], [{
    key: 'fromChild',
    value: function fromChild(child) {
      var childAnswer = void 0;
      if (child.question) {
        // Version 1
        childAnswer = new AnsweredQuestion(child.question, child.position);
      } else {
        childAnswer = new AnsweredQuestion(child);
      }
      return childAnswer;
    }
  }]);

  return AnsweredQuestion;
}(_Question3.default);

exports.default = AnsweredQuestion;

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _Survey = __webpack_require__(13);

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

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _co = __webpack_require__(8);

var _co2 = _interopRequireDefault(_co);

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
      var iterProc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'iteration';

      var cursor = query.cursor();
      var _this = this;
      return (0, _co2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var doc, remarks;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                doc = void 0;
                remarks = [];

              case 2:
                _context.next = 4;
                return cursor.next().then(function (doc) {
                  return doc && _this[iterProc](doc);
                });

              case 4:
                if (!(doc = _context.sent)) {
                  _context.next = 8;
                  break;
                }

                remarks.push(doc);
                _context.next = 2;
                break;

              case 8:
                return _context.abrupt('return', remarks);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);

  return _class;
}(_Mixin3.default);

exports.default = _class;

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);

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
  data: { type: {} }
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

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Schema = __webpack_require__(1);
var Text = __webpack_require__(12);
var mongoose = __webpack_require__(0);

var Question = void 0;

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
      return new Question(ret.question, ret.position);
    }
    return null;
  },
  findOptionByPosition: function findOptionByPosition(pos) {
    return this.options.find(function (el) {
      return el.position == pos;
    });
  }
});

var QuestionM = mongoose.model('Question', questionSchema);
module.exports = Question = function (_QuestionM) {
  _inherits(Question, _QuestionM);

  function Question(obj, position) {
    _classCallCheck(this, Question);

    var _this = _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).call(this, obj));

    Object.assign(_this, obj);
    if (position) _this.position = position;
    return _this;
  }

  return Question;
}(QuestionM);

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Schema = __webpack_require__(1);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _Schema2.default({
  type: { type: String, required: true },
  code: { type: String, required: true },
  uid: { type: String, require: true },
  name: { type: String, required: true },
  children: [{
    code: { type: String },
    name: { type: String },
    uid: { type: String }
  }],
  payload: { type: {} }
});
schema.index({ type: 1, uid: 1 });
schema.index({ type: 1, code: 1 });
schema.index({ name: 1, type: 1 });

exports.default = _mongoose2.default.model('Location', schema);

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(24);


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(88);

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

var _co = __webpack_require__(8);

var _co2 = _interopRequireDefault(_co);

var _childProcess = __webpack_require__(14);

var _Mixin = __webpack_require__(2);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _SurveyExport = __webpack_require__(22);

var _SurveyExport2 = _interopRequireDefault(_SurveyExport);

var _Cursor = __webpack_require__(23);

var _Cursor2 = _interopRequireDefault(_Cursor);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _Answer = __webpack_require__(17);

var _Answer2 = _interopRequireDefault(_Answer);

var _hotFormulaParser = __webpack_require__(89);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollectResponses = function (_Mixin$mixin) {
  _inherits(CollectResponses, _Mixin$mixin);

  function CollectResponses() {
    _classCallCheck(this, CollectResponses);

    return _possibleConstructorReturn(this, (CollectResponses.__proto__ || Object.getPrototypeOf(CollectResponses)).apply(this, arguments));
  }

  _createClass(CollectResponses, [{
    key: 'execute',
    value: function execute(proc) {
      var _this3 = this;

      this.surveyId = proc.args;
      return this.getSurvey().then(function () {
        return _this3.getExportHeader();
      }).then(function () {
        return _this3.collectAnswers();
      }).then(function (response) {
        return _this3.response = response;
      }).then(function () {
        return _this3.updateExportHeader();
      }).then(function () {
        return _this3.response;
      });
    }
  }, {
    key: 'collectAnswers',
    value: function collectAnswers() {
      var _this4 = this;

      this.answersCount = 0;
      this.totalStatsCount = 0;
      this.aggregates = {};

      return this.iterateCursor(_Answer2.default.find({
        survey: this.surveyId,
        lastExport: null
      }).limit(1000), 'collectOneAnswer').then(function (answers) {
        return _this4.answers = answers;
      }).then(function () {
        return _this4._saveAllAggregates();
      }).then(function () {
        return {
          answers: _this4.answers,
          answersCount: _this4.answersCount,
          totalStatsCount: _this4.totalStatsCount
        };
      });
    }
  }, {
    key: 'collectOneAnswer',
    value: function collectOneAnswer(answer) {
      if (!answer.rootQuestion) {
        return { status: 'SKIPPED', reason: 'EMPTY', _id: answer._id };
      }
      if (answer.version === 0) {
        return { status: 'SKIPPED', reason: 'VERSION0', _id: answer._id };
      }

      var _this = this;
      var statsCount = 0;
      var keys = this.collectionKeys;
      if (!keys.posUPLOAD_TIME) {
        keys.push('UPLOAD_TIME');
        keys.posUPLOAD_TIME = 'Time of upload.';
      }
      return (0, _co2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref, question, context, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, o;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 4;
                _iterator = _this.survey.respondentsIn(answer, { keys: _this.collectionKeys })[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 41;
                  break;
                }

                _ref = _step.value;
                question = _ref.question;
                context = _ref.context;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 13;
                _iterator2 = question.collectRespondent(context)[Symbol.iterator]();

              case 15:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 24;
                  break;
                }

                o = _step2.value;

                if (answer.createdAt) {
                  o.UPLOAD_TIME = answer.createdAt.getTime();
                }
                _context.next = 20;
                return _this.writeStatsObj(o);

              case 20:
                ++statsCount;

              case 21:
                _iteratorNormalCompletion2 = true;
                _context.next = 15;
                break;

              case 24:
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context['catch'](13);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t0;

              case 30:
                _context.prev = 30;
                _context.prev = 31;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 33:
                _context.prev = 33;

                if (!_didIteratorError2) {
                  _context.next = 36;
                  break;
                }

                throw _iteratorError2;

              case 36:
                return _context.finish(33);

              case 37:
                return _context.finish(30);

              case 38:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 41:
                _context.next = 47;
                break;

              case 43:
                _context.prev = 43;
                _context.t1 = _context['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 47:
                _context.prev = 47;
                _context.prev = 48;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 50:
                _context.prev = 50;

                if (!_didIteratorError) {
                  _context.next = 53;
                  break;
                }

                throw _iteratorError;

              case 53:
                return _context.finish(50);

              case 54:
                return _context.finish(47);

              case 55:
                answer.set('lastExport', new Date());
                return _context.abrupt('return', answer.save().then(function () {
                  return _this.totalStatsCount = _this.totalStatsCount + statsCount;
                }).then(function () {
                  return ++_this.answersCount;
                }).then(function () {
                  return { status: 'DONE', statsCount: statsCount, _id: answer._id };
                }));

              case 59:
                _context.prev = 59;
                _context.t2 = _context['catch'](0);

                console.log('Error processing ' + answer._id + ':\n' + _context.t2.message);
                return _context.abrupt('return', Promise.resolve({ status: 'ERROR', _id: answer._id }));

              case 63:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 59], [4, 43, 47, 55], [13, 26, 30, 38], [31,, 33, 37], [48,, 50, 54]]);
      }));
    }
  }, {
    key: '_parseExpression',
    value: function _parseExpression(exp) {
      var parsed = this.parser.parse(exp);
      if (parsed.error) {
        return;
      }
      return parsed.result;
    }
  }, {
    key: '_findAggregate',
    value: function _findAggregate(_ref2) {
      var _this5 = this;

      var type = _ref2.type,
          key = _ref2.key;

      var objKey = type + '/' + key;
      var agg = void 0;
      if (agg = this.aggregates[objKey]) {
        return Promise.resolve(agg);
      }
      return this.aggregates[objKey] = _Statistic2.default.findOne({ type: type, key: key }).catch(function (err) {
        return null;
      }).then(function (stat) {
        return stat ? stat.toObject({ versionKey: false }) : { type: type, key: key };
      }).then(function (stat) {
        return _this5.aggregates[objKey] = stat;
      });
    }
  }, {
    key: '_saveAllAggregates',
    value: function _saveAllAggregates() {
      var _this6 = this;

      return Promise.all(Object.keys(this.aggregates).map(function (key) {
        var agg = _this6.aggregates[key];
        return _Statistic2.default.findOneAndUpdate({ type: agg.type, key: agg.key }, agg, { upsert: true, new: true }).then(function (stat) {
          return console.log('Stat: ', stat);
        });
      })).catch(function (err) {
        return console.log('Error saving aggreagtes', err);
      });
    }
  }, {
    key: 'accumulateAggregates',
    value: function accumulateAggregates(stat) {
      var _this7 = this;

      if (!this.survey.aggregates || !this.survey.aggregates.length) return;
      if (!stat.data) return;

      this.parser = new _hotFormulaParser.Parser();
      this.parser.on('callVariable', function (name, done) {
        var obj = stat.data;
        if (obj.hasOwnProperty(name)) {
          var val = obj[name];
          done(val);
        }
      });

      var promises = [];

      var _loop = function _loop(agg) {
        var type = void 0,
            key = void 0,
            name = void 0,
            data = void 0;
        if (agg.select) {
          if (!_this7._parseExpression(agg.select)) return 'continue';
        }
        if (agg.key) {
          key = _this7._parseExpression(agg.key);
        }
        if (!key) {
          console.error('Error parsing key: ' + agg.key);
          return 'continue';
        };
        key = key || null;

        if (agg.type) {
          type = _this7._parseExpression(agg.type);
        }
        type = type || 'Aggregate';

        if (agg.name) {
          name = _this7._parseExpression(agg.name);
        }
        name = name || _this7.survey.name || 'Unnamed';

        promises.push(_this7._findAggregate({ type: type, key: key })
        // Statistic.findOne({type, key})
        // .then((stat) => stat || new Statistic({type, key}))
        .then(function (stat) {
          if (_typeof(agg.data) === 'object') {
            data = stat.data = stat.data || {};
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = Object.keys(agg.data)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var dataKey = _step4.value;

                var dataObj = agg.data[dataKey];
                if (!dataObj) continue;
                var formula = void 0,
                    _type = void 0;
                if (typeof dataObj === 'string') {
                  formula = dataObj;
                } else {
                  formula = dataObj.formula;
                  _type = dataObj.type;
                }
                _type = _type || 'count';

                if (!formula) {
                  continue;
                } else {
                  var value = _this7._parseExpression(formula);
                  if (typeof value === 'undefined') continue;
                  if (_type === 'count') {
                    value = parseInt(value);
                    if (value === NaN) value = 0;

                    var obj = data[dataKey] = data[dataKey] || {};
                    obj.value = obj.value || 0;
                    obj.count = obj.count || 0;

                    obj.value = obj.value + value;
                    obj.count++;
                  } else if (_type === 'histogram') {
                    var _obj = data[dataKey] = data[dataKey] || {};

                    _obj.value = _obj.value || {};
                    _obj.count = _obj.count || 0;
                    _obj.value[value] = _obj.value[value] || 0;
                    _obj.value[value]++;
                    _obj.count++;
                  }
                }
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
          } else {
            data = agg.data;
          }
        }).catch(function (err) {}));
      };

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.survey.aggregates[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var agg = _step3.value;

          var _ret = _loop(agg);

          if (_ret === 'continue') continue;
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

      return Promise.all(promises).then(function (p) {
        return p.length;
      });
    }
  }, {
    key: 'writeStatsObj',
    value: function writeStatsObj(obj) {
      var _this8 = this;

      return (0, _co2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return obj;

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })).then(function (obj) {
        return _Statistic2.default.create({
          key: _this8.surveyId,
          type: 'SurveyResponse',
          data: obj
        });
      }).then(function (stat) {
        return _this8.accumulateAggregates(stat);
      });
    }
  }]);

  return CollectResponses;
}(_Mixin2.default.mixin(_childProcess.ChildTemplate, _SurveyExport2.default, _Cursor2.default));

exports.default = CollectResponses;

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

module.exports = require("hot-formula-parser");

/***/ })

/******/ });