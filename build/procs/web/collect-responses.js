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
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String },

  passphrase: { type: String },
  roles: [{ type: String }],

  payload: { type: {} }
});
userSchema.index({ username: 1 });
userSchema.index({ name: 1 });
userSchema.index({ roles: 1 });

module.exports = mongoose.model('User', userSchema);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

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
/* 8 */
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),
/* 9 */
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
schema.index({ uid: 1, type: 1 });
schema.index({ type: 1, code: 1 });
schema.index({ name: 1, type: 1 });

exports.default = _mongoose2.default.model('Location', schema);

/***/ }),
/* 10 */,
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _Question = __webpack_require__(7);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildTemplate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Process = __webpack_require__(11);

var _Process2 = _interopRequireDefault(_Process);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _child_process = __webpack_require__(16);

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
/* 16 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 17 */,
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Question2 = __webpack_require__(7);

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
      if (refQ.type === 'MULTIPLE_CHOICE') {
        ans.logged_options.reduce(function (acc, opt) {
          if (opt.position !== null) {
            acc[ansKey + '_opt' + opt.position] = 1;
          }
          return acc;
        }, ret);
      } else if (refQ.type === 'GPS') {
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

      var number, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, ans, _respChild, childQ, newAcc;

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
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 16;
              _iterator2 = this.answers[Symbol.iterator]();

            case 18:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 32;
                break;
              }

              ans = _step2.value;

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
              _iteratorNormalCompletion2 = true;
              _context2.next = 18;
              break;

            case 32:
              _context2.next = 38;
              break;

            case 34:
              _context2.prev = 34;
              _context2.t1 = _context2['catch'](16);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t1;

            case 38:
              _context2.prev = 38;
              _context2.prev = 39;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 41:
              _context2.prev = 41;

              if (!_didIteratorError2) {
                _context2.next = 44;
                break;
              }

              throw _iteratorError2;

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
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _Survey = __webpack_require__(14);

var _Survey2 = _interopRequireDefault(_Survey);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _Location = __webpack_require__(9);

var _Location2 = _interopRequireDefault(_Location);

var _User = __webpack_require__(6);

var _User2 = _interopRequireDefault(_User);

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
  }, {
    key: '_ppClassHousehold',
    value: function _ppClassHousehold(_ref3, obj) {
      var _this5 = this;

      var _ref3$select = _ref3.select,
          select = _ref3$select === undefined ? 'Q_1_12' : _ref3$select,
          _ref3$surveyorKey = _ref3.surveyorKey,
          surveyorKey = _ref3$surveyorKey === undefined ? 'Q_1_1' : _ref3$surveyorKey,
          _ref3$habitationKey = _ref3.habitationKey,
          habitationKey = _ref3$habitationKey === undefined ? 'Q_1_6' : _ref3$habitationKey;

      if (!obj[surveyorKey]) return;
      if (!obj[select]) return { _ignore: true };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (typeof obj[key] === 'string') {
            if (obj[key].toUpperCase && obj[key].trim().toUpperCase() === 'DUMMY') {
              return { _ignore: true };
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

      var username = obj[surveyorKey];
      return _User2.default.findOne({ username: username }).then(function (user) {
        if (!user || !user.payload) return;
        var locSpec = [];
        ['DISTRICT', 'BLOCK', 'PANCHAYAT'].forEach(function (loc) {
          ['NAME', 'CODE'].forEach(function (dat) {
            _this5._pushKey(loc + '_' + dat, 'Location payload');
            obj[loc + '_' + dat] = user.payload[loc + '_' + dat];
          });
          locSpec.push(obj[loc + '_CODE']);
        });
        return _Location2.default.findOne({ type: 'PANCHAYAT', uid: locSpec.join('/') });
      }).then(function (loc) {
        if (!loc || !loc.children || !loc.children.length) return;
        if (!obj[habitationKey]) return;
        var habitation = loc.children.find(function (child) {
          return child.name === obj[habitationKey];
        });
        _this5._pushKey('HABITATION_CODE', habitationKey);
        if (habitation) obj['HABITATION_CODE'] = habitation.code;
      });
    }
  }]);

  return _class;
}(_Mixin3.default);

exports.default = _class;

/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);

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
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(24);


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(88);

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

var _co = __webpack_require__(8);

var _co2 = _interopRequireDefault(_co);

var _childProcess = __webpack_require__(15);

var _Mixin = __webpack_require__(2);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _SurveyExport = __webpack_require__(22);

var _SurveyExport2 = _interopRequireDefault(_SurveyExport);

var _Cursor = __webpack_require__(23);

var _Cursor2 = _interopRequireDefault(_Cursor);

var _Aggregation = __webpack_require__(89);

var _Aggregation2 = _interopRequireDefault(_Aggregation);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _Answer = __webpack_require__(18);

var _Answer2 = _interopRequireDefault(_Answer);

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
      }).limit(50000), 'collectOneAnswer').then(function (answers) {
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
      if (!keys.posANSWER_ID) {
        keys.push('ANSWER_ID');
        keys.posANSWER_ID = 'Answer _id';
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
                  o.ANSWER_ID = answer._id;
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
                return _context.abrupt('return', Promise.resolve({ status: 'ERROR', _id: answer._id }));

              case 62:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 59], [4, 43, 47, 55], [13, 26, 30, 38], [31,, 33, 37], [48,, 50, 54]]);
      }));
    }
  }, {
    key: 'writeStatsObj',
    value: function writeStatsObj(obj) {
      var _this5 = this;

      var self = this;
      return (0, _co2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var pp, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, post, ret;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return obj;

              case 2:
                obj = _context2.sent;
                pp = self.survey.postProcessing;

                if (!(!pp || !pp.length)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return');

              case 6:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context2.prev = 9;
                _iterator3 = pp[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context2.next = 23;
                  break;
                }

                post = _step3.value;

                if (!(!post.class || !self['_ppClass' + post.class])) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt('continue', 20);

              case 15:
                _context2.next = 17;
                return Promise.resolve(self['_ppClass' + post.class](post, obj));

              case 17:
                ret = _context2.sent;

                if (!(ret && ret._ignore)) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt('return', true);

              case 20:
                _iteratorNormalCompletion3 = true;
                _context2.next = 11;
                break;

              case 23:
                _context2.next = 29;
                break;

              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2['catch'](9);
                _didIteratorError3 = true;
                _iteratorError3 = _context2.t0;

              case 29:
                _context2.prev = 29;
                _context2.prev = 30;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 32:
                _context2.prev = 32;

                if (!_didIteratorError3) {
                  _context2.next = 35;
                  break;
                }

                throw _iteratorError3;

              case 35:
                return _context2.finish(32);

              case 36:
                return _context2.finish(29);

              case 37:
                return _context2.abrupt('return');

              case 38:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[9, 25, 29, 37], [30,, 32, 36]]);
      })).then(function (ignore) {
        return ignore || _Statistic2.default.create({
          key: _this5.surveyId,
          type: 'SurveyResponse',
          data: obj
        }).then(function (stat) {
          return _this5.accumulateAggregates(stat, _this5.survey.aggregates);
        });
      });
    }
  }]);

  return CollectResponses;
}(_Mixin2.default.mixin(_childProcess.ChildTemplate, _SurveyExport2.default, _Cursor2.default, _Aggregation2.default));

exports.default = CollectResponses;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _hotFormulaParser = __webpack_require__(90);

var _co = __webpack_require__(8);

var _co2 = _interopRequireDefault(_co);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _jsYaml = __webpack_require__(91);

var _jsYaml2 = _interopRequireDefault(_jsYaml);

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
    key: '_parseExpression',
    value: function _parseExpression(parser, exp) {
      var parsed = parser.parse(exp);
      if (parsed.error) {
        return;
      }
      return parsed.result;
    }
  }, {
    key: '_findAggregate',
    value: function _findAggregate(_ref) {
      var _this2 = this;

      var type = _ref.type,
          key = _ref.key;

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
        return _this2.aggregates[objKey] = stat;
      }).then(function (stat) {
        if (stat.aggregates) {
          return Promise.resolve(_this2.accumulateAggregates(stat, stat.aggregates, true)).then(function () {
            return stat;
          });
        }
        return stat;
      });
    }
  }, {
    key: '_saveAllAggregates',
    value: function _saveAllAggregates() {
      var _this3 = this;

      var self = this;
      if (!self.aggregates) return;
      return (0, _co2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var key, agg;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                key = void 0, agg = void 0;

              case 1:
                if (!(key = Object.keys(self.aggregates).find(function (key) {
                  return self.aggregates[key]._modified;
                }))) {
                  _context.next = 8;
                  break;
                }

                agg = self.aggregates[key];
                _context.next = 5;
                return Promise.resolve(self.accumulateAggregates(agg, agg.aggregates));

              case 5:
                agg._modified = false;
                _context.next = 1;
                break;

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      })).then(function () {
        return Promise.all(Object.keys(_this3.aggregates).map(function (key) {
          var agg = _this3.aggregates[key];
          return _Statistic2.default.findOneAndUpdate({ type: agg.type, key: agg.key }, agg, { upsert: true, new: true }).then(function (stat) {
            return console.log('Stat: ' + stat.key + ' (' + stat.type + ')') || console.log(_jsYaml2.default.safeDump(stat.data));
          });
        }));
      }).catch(function (err) {
        return console.error('Error saving aggreagtes', err);
      });
    }
  }, {
    key: 'accumulateAggregates',
    value: function accumulateAggregates(stat, aggregates) {
      var _this4 = this;

      var revert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!aggregates || !aggregates.length) return;
      if (!stat.data) return;
      var parser = new _hotFormulaParser.Parser();
      var parseF = function parseF() {
        for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
          a[_key] = arguments[_key];
        }

        return _this4._parseExpression.apply(_this4, [parser].concat(a));
      };
      parser.on('callVariable', function (name, done) {
        // Check in metadata
        var obj = stat.metadata;
        if (obj && obj.hasOwnProperty(name)) {
          var val = obj[name];
          if (val !== undefined) {
            done(val);
            return;
          }
        }

        // Check in data
        obj = stat.data;
        var type = void 0;
        if (name.endsWith('__value')) {
          name = name.slice(0, -7);
          type = 'value';
        } else if (name.endsWith('__count')) {
          name = name.slice(0, -7);
          type = 'count';
        }
        type = type || 'average';
        if (obj && obj.hasOwnProperty(name)) {
          var _val = obj[name];

          if (_val) {
            if (_val.count) {
              if (type === 'average') {
                done(_val.value / _val.count);
              } else if (type === 'count') {
                done(_val.count);
              } else {
                done(_val.value);
              }
            } else {
              done(_val);
            }
            return;
          }
        }
      });
      parser.on('callFunction', function (name, params, done) {
        if (name === 'TO_DATE') {
          done(new Date(parseInt(params[0])));
        }
      });

      var promises = [];

      var _loop = function _loop(agg) {
        var type = void 0,
            key = void 0,
            name = void 0;
        if (agg.select) {
          if (!parseF(agg.select)) return 'continue';
        }
        if (agg.key) {
          key = parseF(agg.key);
        }
        if (!key) {
          console.error('Error parsing key: ' + agg.key);
          return 'continue';
        };
        key = key || null;

        if (agg.type) {
          type = parseF(agg.type);
        }
        type = type || 'Aggregate';
        if (!revert) {
          if (agg.name) {
            name = parseF(agg.name);
          }
          name = name || _this4.survey.name || 'Unnamed';
          promises.push(_this4._findAggregate({ type: type, key: key }).then(function (stat) {
            _this4._evaluateMetadata(agg, stat, parseF);
            _this4._evaluateAggregate(agg, stat, parseF);
            if (agg.aggregates && !stat.aggregates) {
              stat.aggregates = agg.aggregates;
            }
          }));
        } else {
          promises.push(_this4._findAggregate({ type: type, key: key }).then(function (stat) {
            if (stat && stat.data) {
              _this4._evaluateAggregate(agg, stat, parseF, revert);
            }
          }));
        }
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = aggregates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var agg = _step.value;

          var _ret = _loop(agg);

          if (_ret === 'continue') continue;
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

      return Promise.all(promises).then(function (p) {
        return p.length;
      });
    }
  }, {
    key: '_iterateObj',
    value: /*#__PURE__*/regeneratorRuntime.mark(function _iterateObj(obj, parseF) {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _key2, valObj, valType, formula, _type, value, count;

      return regeneratorRuntime.wrap(function _iterateObj$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 3;
              _iterator2 = Object.keys(obj)[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 24;
                break;
              }

              _key2 = _step2.value;
              valObj = obj[_key2];
              valType = typeof valObj === 'undefined' ? 'undefined' : _typeof(valObj);

              if (!(valType === 'undefined')) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt('continue', 21);

            case 11:
              formula = void 0, _type = void 0;

              if (valType === 'string') {
                formula = valObj;
              } else if (valType === 'object' && valObj) {
                formula = valObj.formula;
                _type = valObj.type;
              }
              value = void 0, count = void 0;

              formula = formula || _key2;
              _type = _type || 'count';
              if (_type === 'value') {
                count = parseF(formula + '__count');
                if (count) formula = formula + '__value';
                _type = 'count';
              }
              value = parseF(formula);

              if (!(value !== null && value !== undefined)) {
                _context2.next = 21;
                break;
              }

              _context2.next = 21;
              return { key: _key2, value: value, type: _type, count: count };

            case 21:
              _iteratorNormalCompletion2 = true;
              _context2.next = 5;
              break;

            case 24:
              _context2.next = 30;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2['catch'](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 30:
              _context2.prev = 30;
              _context2.prev = 31;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 33:
              _context2.prev = 33;

              if (!_didIteratorError2) {
                _context2.next = 36;
                break;
              }

              throw _iteratorError2;

            case 36:
              return _context2.finish(33);

            case 37:
              return _context2.finish(30);

            case 38:
            case 'end':
              return _context2.stop();
          }
        }
      }, _iterateObj, this, [[3, 26, 30, 38], [31,, 33, 37]]);
    })
  }, {
    key: '_accumulateObj',
    value: function _accumulateObj(data, _ref2) {
      var key = _ref2.key,
          value = _ref2.value,
          type = _ref2.type,
          count = _ref2.count;

      var obj = data[key] = data[key] || {};
      count = count || 1;

      obj.count = obj.count || 0;
      obj.count += count;
      if (type === 'count') {
        obj.value = obj.value || 0;

        if (typeof value !== 'number') value = parseFloat(value);
        if (value === NaN) value = 0;
        obj.value = obj.value + value;
      } else if (type === 'histogram') {
        obj.value = obj.value || {};

        obj.value[value] = obj.value[value] || 0;
        obj.value[value]++;
      }
    }
  }, {
    key: '_decumulateObj',
    value: function _decumulateObj(data, _ref3) {
      var key = _ref3.key,
          value = _ref3.value,
          type = _ref3.type,
          count = _ref3.count;

      var obj = data[key];
      if (!obj || !obj.count || !obj.value) return;
      count = count || 1;
      obj.count -= count;

      if (type === 'count') {
        value = parseInt(value);
        if (value === NaN) value = 0;
        obj.value = obj.value - value;
      } else if (type === 'histogram') {
        obj.value = obj.value || {};

        if (!obj.value[value]) return;
        obj.value[value]--;
      }
    }
  }, {
    key: '_evaluateAggregate',
    value: function _evaluateAggregate(agg, stat, parseF, revert) {
      if (!_typeof(agg.data) === 'object') return;
      stat.data = stat.data || {};
      stat._modified = true;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._iterateObj(agg.data, parseF)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var o = _step3.value;

          if (!revert) {
            this._accumulateObj(stat.data, o);
          } else {
            this._decumulateObj(stat.data, o);
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
    }
  }, {
    key: '_evaluateMetadata',
    value: function _evaluateMetadata(agg, stat, parseF) {
      if (stat.metadata || !agg.metadata) return;
      if (_typeof(agg.metadata) !== 'object') return;
      stat.metadata = stat.metadata || {};
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._iterateObj(agg.metadata, parseF)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _ref4 = _step4.value;
          var _key3 = _ref4.key;
          var value = _ref4.value;

          stat.metadata[_key3] = value;
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
    }
  }]);

  return _class;
}(_Mixin3.default);

exports.default = _class;

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("hot-formula-parser");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ })
/******/ ]);