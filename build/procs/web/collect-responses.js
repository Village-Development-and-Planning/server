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
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
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


__webpack_require__(2);

var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var surveySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  enabled: { type: Boolean, default: true },
  question: { type: {}, required: true },
  respondents: { type: [] }
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
            if (!(!this.respondents || !this.respondents.length)) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return { question: answer.rootQuestion, context: context };

          case 3:
            _context.next = 12;
            break;

          case 5:
            idx = 0;

          case 6:
            if (!(i < this.respondents.length)) {
              _context.next = 12;
              break;
            }

            return _context.delegateYield(answer.rootQuestion.findRespondents(Object.assign({
              respondents: this.respondents,
              refQ: this.rootQuestion,
              idx: idx
            }, context)), 't0', 8);

          case 8:

            ++respIdx;

          case 9:
            i++;
            _context.next = 6;
            break;

          case 12:
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
exports.ChildTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Process = __webpack_require__(4);

var _Process2 = _interopRequireDefault(_Process);

var _child_process = __webpack_require__(12);

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

          p.on('close', function (code) {
            proc.exitCode = code;
            proc.status = 'COMPLETED';
            proc.stdout = stdout.join('\n');
            proc.stderr = stderr.join('\n');
            console.log(proc.stdout);
            proc.save();
          });
          p.stdout.on('data', function (data) {
            return stdout = stdout.concat(data);
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

var ChildTemplate = exports.ChildTemplate = function ChildTemplate(procId) {
  var _this2 = this;

  _classCallCheck(this, ChildTemplate);

  this.promise = _Process2.default.findOne({ _id: procId }).then(function (proc) {
    if (!proc) {
      throw new Error('Unknown process id: ' + procId);
    }
    _this2.proc = proc;
    return _this2.execute(proc);
  }).then(function (output) {
    console.log('Output: ');
    console.log(output);
  }).catch(function (err) {
    console.log('Error: ');
    console.log(err);
  });
};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Schema = __webpack_require__(1);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _AnsweredQuestion = __webpack_require__(16);

var _AnsweredQuestion2 = _interopRequireDefault(_AnsweredQuestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var answerSchema = new _Schema2.default({
  name: { type: String },
  description: { type: String },
  survey: { type: _Schema2.default.Types.ObjectId, ref: 'Survey', required: true },
  surveyor: { type: _Schema2.default.Types.ObjectId, ref: 'Surveyor' },
  version: { type: Number, default: 0 },
  rootQuestion: {
    type: {}, required: true,
    get: function get(a) {
      return new _AnsweredQuestion2.default(a);
    }
  },
  checksum: { type: String, required: true, unique: true },

  // Post-processing concerns
  lastExport: { type: Date }
});
answerSchema.index({ survey: 1, lastExport: 1 });

module.exports = _mongoose2.default.model('Answer', answerSchema);

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Question2 = __webpack_require__(17);

var _Question3 = _interopRequireDefault(_Question2);

var _Location = __webpack_require__(6);

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

      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, ans;

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
                _context.next = 12;
                break;
              }

              ans = _step.value;
              _context.next = 9;
              return this.collectAnswer({
                acc: Object.assign({}, acc),
                ansKey: prefix,
                ans: ans, keys: keys, refQ: refQ
              });

            case 9:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 18:
              _context.prev = 18;
              _context.prev = 19;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 21:
              _context.prev = 21;

              if (!_didIteratorError) {
                _context.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return _context.finish(21);

            case 25:
              return _context.finish(18);

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, collectRespondent, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })
  }, {
    key: '_accumulateValue',
    value: function _accumulateValue(ans, ansKey, refQ) {
      refQ = refQ || this;
      if (!ans.logged_options) return {};
      if (this.type == 'ROOT' || this.type == 'DUMMY' || !this.number) {
        return {};
      }
      var ret = {};
      if (this.type == 'MULTIPLE_CHOICE') {
        ans.logged_options.reduce(function (acc, opt) {
          if (opt.position !== null) {
            acc[ansKey + '_opt' + opt.position] = 1;
          }
          return acc;
        }, ret);
      } else if (this.type == 'GPS') {
        var lat = void 0;
        var long = void 0;
        ans.logged_options.forEach(function (opt) {
          if (opt.type == 'GPS') {
            var val = opt.value || opt.text.english;

            var _val$split = val.split(',');

            var _val$split2 = _slicedToArray(_val$split, 2);

            lat = _val$split2[0];
            long = _val$split2[1];
          }
        });
        ret[ansKey + '_lat'] = lat;
        ret[ansKey + '_long'] = long;
      } else if (['INFO', 'INPUT'].indexOf(this.type) !== -1 || refQ.flow && refQ.flow.pre.fill.length) {
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

      var number, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, ans, respChild, childQ, newAcc;

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
              refQ = refQ || this;

              if (!(this.number === number)) {
                _context2.next = 14;
                break;
              }

              _context2.next = 13;
              return { question: this, context: { acc: acc, keys: keys, prefix: prefix, refQ: refQ } };

            case 13:
              return _context2.abrupt('return');

            case 14:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 17;
              _iterator3 = this.answers[Symbol.iterator]();

            case 19:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 31;
                break;
              }

              ans = _step3.value;

              if (!ans.children) {
                _context2.next = 28;
                break;
              }

              respChild = ans.children.find(function (child, idx) {
                child = AnsweredQuestion.fromChild(child);
                if (child.isParent(number)) {
                  return child;
                } else {
                  return false;
                }
              });

              if (!respChild) {
                _context2.next = 28;
                break;
              }

              respChild = AnsweredQuestion.fromChild(respChild);
              childQ = refQ.findChildByPosition(respChild.position);
              newAcc = this.collectAnswer({
                ans: ans, keys: keys,
                ansKey: prefix,

                ignore: respondents,
                acc: Object.assign({}, acc),

                refQ: childQ
              });
              return _context2.delegateYield(respChild.findRespondents({
                acc: newAcc,
                prefix: prefix + '_',
                refQ: childQ,
                keys: keys, respondents: respondents, idx: idx, cb: cb
              }), 't0', 28);

            case 28:
              _iteratorNormalCompletion3 = true;
              _context2.next = 19;
              break;

            case 31:
              _context2.next = 37;
              break;

            case 33:
              _context2.prev = 33;
              _context2.t1 = _context2['catch'](17);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t1;

            case 37:
              _context2.prev = 37;
              _context2.prev = 38;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 40:
              _context2.prev = 40;

              if (!_didIteratorError3) {
                _context2.next = 43;
                break;
              }

              throw _iteratorError3;

            case 43:
              return _context2.finish(40);

            case 44:
              return _context2.finish(37);

            case 45:
              ;

            case 46:
            case 'end':
              return _context2.stop();
          }
        }
      }, findRespondents, this, [[17, 33, 37, 45], [38,, 40, 44]]);
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
      refQ = refQ || this;

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
      refQ = refQ || this;

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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Schema = __webpack_require__(1);
var Text = __webpack_require__(18);
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

/***/ 18:
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

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ 21:
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
    secret: 'a general string',
    requestProperty: 'auth'
  },
  admin: {
    username: 'ptracking',
    passphrase: 'vaazhvuT'
  }
};

/***/ }),

/***/ 4:
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

/***/ 6:
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Constants = __webpack_require__(3);

var _Constants2 = _interopRequireDefault(_Constants);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect to mongoose
var options = _Constants2.default.db;
_mongoose2.default.Promise = global.Promise;

exports.default = _mongoose2.default.connect(options.connectionString, options.connectionOptions);

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
module.exports = __webpack_require__(21);


/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(84);

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(2);

var _childProcess = __webpack_require__(11);

var _Survey = __webpack_require__(10);

var _Survey2 = _interopRequireDefault(_Survey);

var _Answer = __webpack_require__(13);

var _Answer2 = _interopRequireDefault(_Answer);

var _Statistic = __webpack_require__(9);

var _Statistic2 = _interopRequireDefault(_Statistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollectResponses = function (_ChildTemplate) {
  _inherits(CollectResponses, _ChildTemplate);

  function CollectResponses() {
    _classCallCheck(this, CollectResponses);

    return _possibleConstructorReturn(this, (CollectResponses.__proto__ || Object.getPrototypeOf(CollectResponses)).apply(this, arguments));
  }

  _createClass(CollectResponses, [{
    key: 'execute',
    value: function execute(proc) {
      var _this2 = this;

      this.surveyId = proc.args;
      return this.getSurvey().then(function () {
        return _this2.getExportHeader();
      }).then(function () {
        return _this2.collectAnswers();
      }).then(function (response) {
        return _this2.response = response;
      }).then(function () {
        return _this2.updateExportHeader();
      }).then(function () {
        return _this2.response;
      });
    }
  }, {
    key: 'getSurvey',
    value: function getSurvey() {
      var _this3 = this;

      return _Survey2.default.findOne({ _id: this.surveyId }).then(function (survey) {
        _this3.survey = survey;
        if (!survey) {
          return Promise.reject('Survey: ' + _this3.surveyId + ' not found.');
        }
      });
    }
  }, {
    key: 'collectAnswers',
    value: function collectAnswers() {
      var _this4 = this;

      this.answersLog = [];
      var cursor = _Answer2.default.find({
        survey: this.surveyId,
        lastExport: null
      }).cursor();
      return new Promise(function (res, rej) {
        cursor.on('data', function (ans) {
          return _this4.collectOneAnswer(ans);
        });
        cursor.on('error', rej);
        cursor.on('end', function () {
          return res(Promise.all(_this4.answersLog));
        });
      });
    }
  }, {
    key: 'finishAnswer',
    value: function finishAnswer(answer, remarks) {
      remarks._id = answer._id;
      this.answersLog.push(_Answer2.default.findOneAndUpdate({ _id: answer._id }, { lastExport: new Date() }).then(function () {
        return console.log('Marked answer ' + answer._id + ' as processed.');
      }).catch(function (err) {
        console.log('Error saving answer: ' + err);
      }).then(function () {
        return remarks;
      }));
    }
  }, {
    key: 'sealAnswer',
    value: function sealAnswer(remarks) {
      remarks._id = this.currentAnswer._id;
      this.answersLog.push(Promise.all(this.statsPromises).then(function () {
        return _Answer2.default.findOneAndUpdate({ _id: remarks._id }, { lastExport: new Date() });
      }).catch(function (err) {
        console.log('Error saving answer: ' + err);
      }).then(function () {
        return remarks;
      }));
    }
  }, {
    key: 'collectOneAnswer',
    value: function collectOneAnswer(answer) {
      if (!answer) return;
      this.currentAnswer = answer;

      if (!answer.rootQuestion) {
        this.sealAnswer({ status: 'SKIPPED', reason: 'EMPTY' });
        return;
      }
      if (answer.version == 0) {
        this.sealAnswer({ status: 'SKIPPED', reason: 'VERSION0' });
        return;
      }

      console.log('Collecting answer: ' + answer._id);
      this.statsPromises = [];
      var statsCount = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.survey.respondentsIn(answer, { keys: this.collectionKeys })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;
          var question = _ref.question;
          var context = _ref.context;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = question.collectRespondent(context)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var o = _step2.value;

              this.writeStatsObj(o);
              ++statsCount;
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

      this.sealAnswer({ status: 'DONE', statsCount: statsCount });
    }
  }, {
    key: 'getExportHeader',
    value: function getExportHeader() {
      var _this5 = this;

      return _Statistic2.default.findOne({ survey: this.surveyId, answer: null }).then(function (stat) {
        _this5.collectionKeys = [];
        if (stat && stat.data) {
          _this5.collectionKeys = stat.data.keys;
          if (stat.data.keyDescriptions) {
            _this5.collectionKeys.forEach(function (key, idx) {
              _this5.collectionKeys['pos' + key] = stat.data.keyDescriptions[idx];
            });
          }
        }
      });
    }
  }, {
    key: 'sortKeys',
    value: function sortKeys() {
      var _this6 = this;

      return this.collectionKeys.map(function (key, index) {
        return { key: key, index: index };
      }).sort(function (a, b) {
        return _this6._keyListComparator(a.key.split('_'), b.key.split('_'));
      });
    }
  }, {
    key: '_keyListComparator',
    value: function _keyListComparator(arr1, arr2) {
      var ret = arr1.reduce(function (acc, el, index) {
        if (acc) return acc;

        var other = arr2[index];
        if (!other) return 1;
        if (el === other) return 0;

        var match1 = el.match(/^([a-z]*)([0-9]*)$/);
        var match2 = other.match(/^([a-z]*)([0-9]*)$/);
        if (!match1) return -1;
        if (!match2) return 1;
        if (match1[0] && !match2[0]) return -1;
        if (match2[0] && !match1[0]) return 1;
        el = parseInt(match1[2]);
        other = parseInt(match2[2]);
        return el - other;
      }, 0);
      return ret || arr1.length - arr2.length;
    }
  }, {
    key: 'updateExportHeader',
    value: function updateExportHeader() {
      var _this7 = this;

      var data = this.sortKeys().reduce(function (_ref2, _ref3) {
        var keys = _ref2.keys,
            keyDescriptions = _ref2.keyDescriptions;
        var key = _ref3.key,
            index = _ref3.index;

        keys.push(key);
        keyDescriptions.push(_this7.collectionKeys['pos' + key]);
        return { keys: keys, keyDescriptions: keyDescriptions };
      }, { keys: [], keyDescriptions: [] });
      return _Statistic2.default.findOneAndUpdate({ survey: this.surveyId, answer: null }, { data: data }, { upsert: true });
    }
  }, {
    key: 'writeStatsObj',
    value: function writeStatsObj(obj) {
      var _this8 = this;

      var objKeys = Object.keys(obj);
      var objPromise = Promise.all(objKeys.map(function (k) {
        return obj[k];
      })).then(function (arrObj) {
        return objKeys.reduce(function (acc, el, idx) {
          acc[el] = arrObj[idx];
          return acc;
        }, {});
      });

      this.statsPromises.push(objPromise.then(function (obj) {
        return _Statistic2.default.create({
          survey: _this8.surveyId,
          answer: _this8.currentAnswer,
          data: obj
        });
      }));
    }
  }]);

  return CollectResponses;
}(_childProcess.ChildTemplate);

exports.default = CollectResponses;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Schema = __webpack_require__(1);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _Schema2.default({
  survey: { type: _Schema2.default.Types.ObjectId, ref: 'Survey' },
  answer: { type: _Schema2.default.Types.ObjectId, ref: 'Answer' },
  data: { type: {} }
});
schema.index({ survey: 1, answer: 1 });

module.exports = _mongoose2.default.model('Statistic', schema);

/***/ })

/******/ });