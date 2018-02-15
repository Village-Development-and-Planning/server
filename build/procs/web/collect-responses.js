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
/******/ 	return __webpack_require__(__webpack_require__.s = 83);
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

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Question2 = __webpack_require__(12);

var _Question3 = _interopRequireDefault(_Question2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    key: '_accumulateValue',
    value: function _accumulateValue(ans, ansKey) {
      if (!ans.logged_options) return {};
      if (this.type == 'ROOT' || !this.number) {
        return {};
      }
      var ret = {};
      if (this.type == 'MULTIPLE_CHOICE') {
        ans.logged_options.reduce(function (acc, opt) {
          if (opt.position !== null) acc[ansKey + '_opt' + opt.position] = 1;
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
      } else {
        ret[ansKey] = ans.logged_options.map(function (opt) {
          return opt.position || opt.value || opt.text.english;
        }).join(',');
      }
      return ret;
    }
  }, {
    key: 'findRespondents',
    value: function findRespondents(_ref) {
      var _this2 = this;

      var acc = _ref.acc,
          prefix = _ref.prefix,
          keys = _ref.keys,
          respondents = _ref.respondents,
          idx = _ref.idx,
          cb = _ref.cb,
          refQ = _ref.refQ;

      var number = respondents[idx];
      if (!this.isParent(number)) return;
      if (!this.answers) return;

      acc = acc || {};
      prefix = prefix || 'Q';
      keys = keys || [];
      prefix = '' + prefix + (this.position || '');
      refQ = refQ || this;

      if (this.number === number) {
        cb(this, { acc: acc, keys: keys, prefix: prefix, refQ: refQ });
        return;
      }

      this.answers.forEach(function (ans, ansIdx) {
        if (ans.children) {
          var respChild = ans.children.find(function (child, idx) {
            child = AnsweredQuestion.fromChild(child);
            if (child.isParent(number)) {
              return child;
            } else {
              return false;
            }
          });
          if (respChild) {
            respChild = AnsweredQuestion.fromChild(respChild);
            var childQ = refQ.findChildByPosition(respChild.position);
            var newAcc = _this2.collectAnswer({
              ans: ans, keys: keys,
              idx: ansIdx,
              ansKey: prefix,

              ignore: respondents,
              acc: Object.assign({}, acc),

              refQ: childQ
            });
            respChild.findRespondents({
              acc: newAcc,
              prefix: prefix + '_',
              refQ: childQ,
              keys: keys, respondents: respondents, idx: idx, cb: cb
            });
          }
        }
      });
    }
  }, {
    key: 'collectAnswer',
    value: function collectAnswer(_ref2) {
      var ans = _ref2.ans,
          idx = _ref2.idx,
          acc = _ref2.acc,
          ansKey = _ref2.ansKey,
          suffix = _ref2.suffix,
          keys = _ref2.keys,
          ignore = _ref2.ignore,
          refQ = _ref2.refQ;

      acc = acc || {};
      ansKey = ansKey || 'Q';
      suffix = suffix || '';
      keys = keys || [];
      refQ = refQ || this;

      var valObj = this._accumulateValue(ans, ansKey);
      Object.keys(valObj).forEach(function (key) {
        var oKey = key + suffix;
        acc[oKey] = valObj[key];
        if (!keys['pos' + oKey]) {
          keys.push(oKey);
          var text = '';
          if (refQ.number) text = text + refQ.number;
          if (refQ.text && refQ.text.english) {
            text = text + (' ' + refQ.text.english);
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
    value: function collect(_ref3) {
      var _this3 = this;

      var acc = _ref3.acc,
          prefix = _ref3.prefix,
          suffix = _ref3.suffix,
          keys = _ref3.keys,
          ignore = _ref3.ignore,
          refQ = _ref3.refQ;

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
          newSuffix = suffix + ('_ans' + idx);
        }
        return _this3.collectAnswer({
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

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Schema = __webpack_require__(1);
var Text = __webpack_require__(13);
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

/***/ 13:
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

/***/ 14:
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

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Process = __webpack_require__(7);

var _Process2 = _interopRequireDefault(_Process);

var _child_process = __webpack_require__(17);

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

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 4:
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

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Schema = __webpack_require__(1);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _AnsweredQuestion = __webpack_require__(11);

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

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

module.exports = mongoose.model('Survey', surveySchema);

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
    stderr: { type: String }
});

module.exports = mongoose.model('Process', processSchema);

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Constants = __webpack_require__(4);

var _Constants2 = _interopRequireDefault(_Constants);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect to mongoose
var options = _Constants2.default.db;
_mongoose2.default.Promise = global.Promise;

exports.default = _mongoose2.default.connect(options.connectionString, options.connectionOptions);

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
module.exports = __webpack_require__(86);


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(85);

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _childProcess = __webpack_require__(16);

var _Survey = __webpack_require__(6);

var _Survey2 = _interopRequireDefault(_Survey);

var _Answer = __webpack_require__(5);

var _Answer2 = _interopRequireDefault(_Answer);

var _Statistic = __webpack_require__(14);

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
        if (survey) {
          _this3.surveyRespondents = survey.respondents;
        } else {
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
          return ans && _this4.collectOneAnswer(ans);
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
      answer.lastExport = new Date();
      this.answersLog.push(answer.save().then(function () {
        return remarks;
      }).then(function (remarks) {
        console.log('Finishing answer: ' + answer._id);
        remarks._id = answer._id;
        return remarks;
      }));
    }
  }, {
    key: 'collectOneAnswer',
    value: function collectOneAnswer(answer) {
      var _this5 = this;

      if (!answer.rootQuestion) {
        this.finishAnswer(answer, { status: 'SKIPPED', reason: 'EMPTY' });
        return;
      }
      if (answer.version == 0) {
        this.finishAnswer(answer, { status: 'SKIPPED', reason: 'VERSION0' });
        return;
      }
      console.log('Collecting answer: ' + answer._id);
      this.currentAnswer = answer;
      if (!this.surveyRespondents || !this.surveyRespondents.length) {
        var obj = answer.rootQuestion.collect({
          keys: this.collectionKeys
        });
        this.writeStatsObj(obj).then(function () {
          return _this5.finishAnswer(answer, { status: 'DONE', rows: 1 });
        });
      } else {
        this.surveyRespondents.forEach(function (resp, idx) {
          _this5.answerRows = 0;
          answer.rootQuestion.findRespondents({
            keys: _this5.collectionKeys,
            respondents: _this5.surveyRespondents,
            cb: _this5.collectRespondent.bind(_this5),
            refQ: _this5.survey.rootQuestion,
            idx: idx
          });
          _this5.finishAnswer(answer, { status: 'DONE', rows: _this5.answerRows });
        });
      }
    }
  }, {
    key: 'collectRespondent',
    value: function collectRespondent(question, _ref) {
      var _this6 = this;

      var acc = _ref.acc,
          prefix = _ref.prefix,
          refQ = _ref.refQ;

      question.answers.forEach(function (ans, idx) {
        var obj = question.collectAnswer({
          ans: ans, idx: idx,
          acc: Object.assign({}, acc),
          keys: _this6.collectionKeys,
          ansKey: prefix, refQ: refQ
        });
        _this6.writeStatsObj(obj);
        _this6.answerRows++;
      });
    }
  }, {
    key: 'getExportHeader',
    value: function getExportHeader() {
      var _this7 = this;

      return _Statistic2.default.findOne({ survey: this.surveyId, answer: null }).then(function (stat) {
        _this7.collectionKeys = [];
        if (stat && stat.data) {
          _this7.collectionKeys = stat.data.keys;
          if (stat.data.keyDescriptions) {
            _this7.collectionKeys.forEach(function (key, idx) {
              _this7.collectionKeys['pos' + key] = stat.data.keyDescriptions[idx];
            });
          }
        }
      });
    }
  }, {
    key: 'sortKeys',
    value: function sortKeys() {
      var _this8 = this;

      return this.collectionKeys.map(function (key, index) {
        return { key: key, index: index };
      }).sort(function (a, b) {
        return _this8._keyListComparator(a.key.split('_'), b.key.split('_'));
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
      var _this9 = this;

      var data = this.sortKeys().reduce(function (_ref2, _ref3) {
        var keys = _ref2.keys,
            keyDescriptions = _ref2.keyDescriptions;
        var key = _ref3.key,
            index = _ref3.index;

        keys.push(key);
        keyDescriptions.push(_this9.collectionKeys['pos' + key]);
        return { keys: keys, keyDescriptions: keyDescriptions };
      }, { keys: [], keyDescriptions: [] });
      return _Statistic2.default.findOneAndUpdate({ survey: this.surveyId, answer: null }, { data: data }, { upsert: true });
    }
  }, {
    key: 'writeStatsObj',
    value: function writeStatsObj(obj) {
      return _Statistic2.default.create({
        survey: this.surveyId,
        answer: this.currentAnswer,
        data: obj
      });
    }
  }]);

  return CollectResponses;
}(_childProcess.ChildTemplate);

exports.default = CollectResponses;

/***/ }),

/***/ 86:
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

/***/ })

/******/ });