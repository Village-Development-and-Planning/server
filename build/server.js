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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
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
  data: { type: {} }
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
    secret: 'a general string',
    requestProperty: 'auth'
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
/* 7 */
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController = __webpack_require__(49);

var _BaseController2 = _interopRequireDefault(_BaseController);

var _Mixin = __webpack_require__(2);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _Listing = __webpack_require__(50);

var _Listing2 = _interopRequireDefault(_Listing);

var _Get = __webpack_require__(51);

var _Get2 = _interopRequireDefault(_Get);

var _Delete = __webpack_require__(52);

var _Delete2 = _interopRequireDefault(_Delete);

var _Body = __webpack_require__(53);

var _Body2 = _interopRequireDefault(_Body);

var _Create = __webpack_require__(56);

var _Create2 = _interopRequireDefault(_Create);

var _Update = __webpack_require__(57);

var _Update2 = _interopRequireDefault(_Update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Controller class for documents exposed via CMS APIs.
*
* @class EntityController
*/
var EntityController = function (_Mixin$mixin) {
  _inherits(EntityController, _Mixin$mixin);

  function EntityController() {
    var _ref;

    _classCallCheck(this, EntityController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = EntityController.__proto__ || Object.getPrototypeOf(EntityController)).call.apply(_ref, [this].concat(args)));

    '_findFields _createFields'.split(' ').forEach(function (key) {
      _this[key] = _this[key] || _this.constructor[key];
    });
    return _this;
  }

  _createClass(EntityController, [{
    key: '_parseBody',
    value: function _parseBody() {
      var _this2 = this;

      return _get(EntityController.prototype.__proto__ || Object.getPrototypeOf(EntityController.prototype), '_parseBody', this).call(this).then(function (obj) {
        if (Array.isArray(obj)) {
          return obj.map(function (o) {
            return _this2._parseEntity(o);
          });
        } else {
          obj = _this2._parseEntity(obj);
          return obj;
        }
      });
    }
  }]);

  return EntityController;
}(_Mixin2.default.mixin(_BaseController2.default, _Listing2.default, _Get2.default, _Delete2.default, _Body2.default, _Create2.default, _Update2.default));

;

Object.assign(EntityController, {
  _findFields: '_id name description modifiedAt',
  _createFields: '_id name description modifiedAt'
});

exports.default = EntityController;

/***/ }),
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
            if (!(!this.respondents || !this.respondents.length)) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return { question: answer.rootQuestion, context: context };

          case 3:
            _context.next = 11;
            break;

          case 5:
            idx = 0;

          case 6:
            if (!(idx < this.respondents.length)) {
              _context.next = 11;
              break;
            }

            return _context.delegateYield(answer.rootQuestion.findRespondents(Object.assign({
              respondents: this.respondents,
              refQ: this.question,
              idx: idx
            }, context)), 't0', 8);

          case 8:
            idx++;
            _context.next = 6;
            break;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, respondentsIn, this);
  })
});

module.exports = mongoose.model('Survey', surveySchema);

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 17 */
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
  lastExport: { type: Date },
  createdAt: { type: Date, default: Date.now }

});
answerSchema.index({ survey: 1, lastExport: 1 });
answerSchema.index({ createdAt: 1, survey: 1 });

module.exports = _mongoose2.default.model('Answer', answerSchema);

/***/ }),
/* 18 */
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
/* 19 */
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
      if (refQ.type == 'ROOT' || refQ.type == 'DUMMY' || !this.number) {
        return {};
      }
      var ret = {};
      if (refQ.type == 'MULTIPLE_CHOICE') {
        ans.logged_options.reduce(function (acc, opt) {
          if (opt.position !== null) {
            acc[ansKey + '_opt' + opt.position] = 1;
          }
          return acc;
        }, ret);
      } else if (refQ.type == 'GPS') {
        var lat = void 0;
        var long = void 0;
        ans.logged_options.forEach(function (opt) {
          if (opt.position == 'GPS') {
            var val = opt.value || opt.text.english;

            var _val$split = val.split(',');

            var _val$split2 = _slicedToArray(_val$split, 2);

            lat = _val$split2[0];
            long = _val$split2[1];
          }
        });
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
                ans: ans, keys: keys, refQ: refQ,
                ansKey: prefix,

                ignore: respondents,
                acc: Object.assign({}, acc)
              });
              return _context2.delegateYield(respChild.findRespondents({
                acc: newAcc,
                prefix: prefix + '_',
                refQ: childQ,
                keys: keys, respondents: respondents, idx: idx
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
/* 20 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(73),
    Parser = _require.Parser;

/**
 * Abstraction for csv-parse with our default options.
 *
 * @class CSVParser
 * @extends {Parser}
 */


var CSVParser = function (_Parser) {
  _inherits(CSVParser, _Parser);

  /**
   * Creates an instance of CSVParser.
   * @param {any} opts (passed to csv-parse)
   *
   * @memberOf CSVParser
   */
  function CSVParser(opts) {
    _classCallCheck(this, CSVParser);

    opts = Object.assign({
      columns: true,
      delimiter: ',' }, opts);

    var _this = _possibleConstructorReturn(this, (CSVParser.__proto__ || Object.getPrototypeOf(CSVParser)).call(this, opts));

    _this.on('readable', _this._onReadable.bind(_this));
    return _this;
  }

  /**
   * 'readable' event listener
   *
   *
   * @memberOf CSVParser
   * @private
   */


  _createClass(CSVParser, [{
    key: '_onReadable',
    value: function _onReadable() {
      var record = null;
      while (record = this.read()) {
        this.emit('csvRecord', record);
      }
    }
  }]);

  return CSVParser;
}(Parser);

module.exports = CSVParser;

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dispatcher;

var _render = __webpack_require__(48);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Dispatch action to given controller
 * @param {Class.<BaseController>} Controller 
 * @param {String} method name to call
 * @return {Function.<ExpressMiddleware>}
 */
function dispatcher(Controller, method) {
  return function (req, res, next) {
    var renderer = new _render2.default({ res: res, next: next });
    new Controller({ req: req, renderer: renderer }).dispatch(method);
  };
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Answer = __webpack_require__(17);

var _Answer2 = _interopRequireDefault(_Answer);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _fs = __webpack_require__(20);

var _fs2 = _interopRequireDefault(_fs);

var _co = __webpack_require__(8);

var _co2 = _interopRequireDefault(_co);

var _EntitiyController = __webpack_require__(9);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Survey = __webpack_require__(13);

var SurveyCSVParser = __webpack_require__(58);

/**
 * Survey document controller.
 *
 * @class SurveyController
 * @extends {BaseController}
 */

var SurveyController = function (_EntityController) {
  _inherits(SurveyController, _EntityController);

  function SurveyController() {
    _classCallCheck(this, SurveyController);

    return _possibleConstructorReturn(this, (SurveyController.__proto__ || Object.getPrototypeOf(SurveyController)).apply(this, arguments));
  }

  _createClass(SurveyController, [{
    key: 'reset',
    value: function reset() {
      var _id = this.req.params.id;
      this.renderer.renderPromise(_Statistic2.default.deleteMany({ key: _id }).then(function () {
        return _Answer2.default.update({ survey: _id, lastExport: { $ne: null } }, { lastExport: null }, { multi: true });
      }));
    }
  }, {
    key: 'answers',
    value: function answers() {
      var _id = this.req.params.id;
      this.renderer.renderPromise(_Statistic2.default.findOne({ type: 'SurveyResponseHeader', key: _id }).then(function (header) {
        return header && header.data || { keys: [], keyDescriptions: [] };
      }).then(function (_ref) {
        var keys = _ref.keys,
            keyDescriptions = _ref.keyDescriptions;

        return _Statistic2.default.find({
          type: 'SurveyResponse', key: _id
        }).limit(50).then(function (stats) {
          return stats.reduce(function (acc, stat) {
            var data = stat.data;
            if (data) {
              acc.push(keys.map(function (k) {
                return data[k];
              }));
            }
            return acc;
          }, [keys, keyDescriptions]);
        });
      }));
    }
  }, {
    key: 'download',
    value: function download() {
      var _this2 = this;

      return Promise.resolve(this._getQuery()).then(function (q) {
        return q && _this2._findOne(q);
      }).then(function (e) {
        return e || Promise.reject(new Error('Entity not found.'));
      }).catch(function (err) {
        return _this2.renderer.renderPromise(Promise.reject(err));
      }).then(function (survey) {
        var _id = survey._id;
        var path = 'data/export-responses/' + _id + '.csv';
        if (_fs2.default.existsSync(path)) {
          var res = _this2.renderer.res;
          res.attachment((survey.name || _id) + '.csv');
          var csvOutput = _fs2.default.createReadStream(path);
          csvOutput.on('end', function () {
            return res.end();
          });
          csvOutput.pipe(res);
        } else {
          _this2.renderer.renderPromise(Promise.reject(new Error('Export file not found.')));
        }
      });
    }
  }, {
    key: '_find',
    value: function _find(query) {
      return _get(SurveyController.prototype.__proto__ || Object.getPrototypeOf(SurveyController.prototype), '_find', this).call(this, query).select('name description enabled modifiedAt');
    }
  }, {
    key: '_findOne',
    value: function _findOne(query) {
      return _get(SurveyController.prototype.__proto__ || Object.getPrototypeOf(SurveyController.prototype), '_findOne', this).call(this, query).then(function (survey) {
        return survey.toObject();
      }).then(function (survey) {
        return (0, _co2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _Answer2.default.count({
                    survey: survey._id
                  });

                case 2:
                  _context.t0 = _context.sent;
                  _context.next = 5;
                  return _Answer2.default.count({
                    survey: survey._id,
                    lastExport: null
                  });

                case 5:
                  _context.t1 = _context.sent;
                  survey.answerStats = {
                    total: _context.t0,
                    unProcessed: _context.t1
                  };

                  survey.answerStats.processed = survey.answerStats.total - survey.answerStats.unProcessed;
                  return _context.abrupt('return', survey);

                case 9:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
      });
    }
  }, {
    key: '_parseEntity',
    value: function _parseEntity(obj) {
      obj.enabled = !!obj.enabled;
      if (typeof obj.respondents === 'string') {
        if (obj.respondents == 'none') {
          obj.respondents = null;
        } else {
          obj.respondents = obj.respondents && obj.respondents.split(',');
        }
      }

      if (obj.csv) {
        if (obj.csv.warnings) {
          var _parseWarnings;

          (_parseWarnings = this._parseWarnings).push.apply(_parseWarnings, _toConsumableArray(obj.csv.warnings));
        }
        obj.question = obj.csv.root;
      }

      var filter = 'name description respondents enabled question aggregates';
      if (this.action === 'create') {
        filter = filter + ' _id';
      }
      return this._filterObject(obj, filter);
    }
  }, {
    key: '_parseFileField',
    value: function _parseFileField(_ref2) {
      var mime = _ref2.mime,
          field = _ref2.field,
          file = _ref2.file,
          fields = _ref2.fields;

      if (mime == 'application/octet-stream' || mime == 'text/csv' || mime == 'application/vnd.ms-excel') {
        return this._parseCSV(file);
      } else {
        return null;
      }
    }

    /**
     * parse CSV from stream and return promise that resolves to created DB
     * record.
     * @param  {Stream} stream Readable stream of CSV file
     * @return {Promise.<Survey>} Promise resolving to Survey record
     */

  }, {
    key: '_parseCSV',
    value: function _parseCSV(stream) {
      var parser = new SurveyCSVParser();
      stream.pipe(parser);
      return parser.promise;
    }
  }]);

  return SurveyController;
}(_EntitiyController2.default);

Object.assign(SurveyController, {
  collection: Survey,
  entityName: 'survey',
  routeName: 'surveys'
});
module.exports = SurveyController;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (type, parent) {
  var ret = {
    _tags: {},
    pre: {
      fill: [
        // eg. {scope: 'global', name: 'selectedDistrict.villages'},
        // eg. {scope: 'answer', name: '2.10'},
      ]
    },
    question: {
      ui: type,
      // 'MULTIPLE_CHOICE',
      // 'GPS',
      // 'INPUT',
      // 'INFO',
      // 'MESSAGE',
      // 'NONE',

      validation: null
      // 'NUMBER',
      // 'SURVEYOR_CODE ( 4-digit /[0-9]{4}/ ),
    },
    answer: {
      scope: parent && parent.child.strategy == 'select' && parent.child.select && parent.child.select.repeat ? parent.child.select.repeat : 'once'
    },
    child: {
      strategy: 'cascade' // OR 'select'
      // select: {
      //   ui: 'grid',
      //   repeat: 'multiple', // OR 'multiple',
      // },
    },
    post: [],
    exit: {
      strategy: 'parent' // OR 'loop'
    }
  };

  if (parent && parent.child.strategy == 'select') {
    ret.exit.incrementBubble = true;
  }

  return ret;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Helper to split string into tags
 *
 * @param {String} str
 * @return {String[]}
 */
function _createTagsList(str) {
  return str.split(',').reduce(function (acc, e) {
    if (e = e.trim()) {
      acc.push(e);
    }
    return acc;
  }, []);
}

exports.default = function (array, tagModules, operator, initialPromise) {
  if (typeof array === 'string') {
    array = _createTagsList(array);
  }
  var warnings = [];
  return array.reduce(function (acc, tag) {
    var handled = false;
    acc = tagModules.reduce(function (acc, mod) {
      if (tag.startsWith(mod.tagPrefix)) {
        handled = true;
        acc = acc.then(function (o) {
          return operator(o, mod, tag) || o;
        });
      }
      return acc;
    }, acc);
    if (!handled) {
      warnings.push({
        message: 'Unknown tag ' + tag + '.'
      });
    }
    return acc;
  }, initialPromise).then(function (output) {
    return { output: output, warnings: warnings };
  });
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var artifactSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  mimeType: { type: String, required: true },
  data: { type: Buffer, required: true }
});
artifactSchema.index({ name: 1, type: 1 });
artifactSchema.index({ type: 1, mimeType: 1 });

module.exports = mongoose.model('Artifact', artifactSchema);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Answer = __webpack_require__(17);

var _Answer2 = _interopRequireDefault(_Answer);

var _EntitiyController = __webpack_require__(9);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _csvWriteStream = __webpack_require__(74);

var _csvWriteStream2 = _interopRequireDefault(_csvWriteStream);

var _streamToArray = __webpack_require__(31);

var _streamToArray2 = _interopRequireDefault(_streamToArray);

var _crypto = __webpack_require__(75);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Question document controller
 *
 * @class QuestionController
 * @extends {BaseController}
 */
var AnswerController = function (_EntityController) {
  _inherits(AnswerController, _EntityController);

  function AnswerController() {
    _classCallCheck(this, AnswerController);

    return _possibleConstructorReturn(this, (AnswerController.__proto__ || Object.getPrototypeOf(AnswerController)).apply(this, arguments));
  }

  _createClass(AnswerController, [{
    key: '_create',
    value: function _create(query) {
      var _this2 = this;

      return _get(AnswerController.prototype.__proto__ || Object.getPrototypeOf(AnswerController.prototype), '_findOne', this).call(this, { checksum: query.checksum }).then(function (ans) {
        if (ans) {
          ans = ans.toObject();
          ans.existing = true;
          return _this2._filterObject(ans, _this2._createFields);
        } else {
          return _get(AnswerController.prototype.__proto__ || Object.getPrototypeOf(AnswerController.prototype), '_create', _this2).call(_this2, query);
        }
      });
    }
  }, {
    key: '_parseDataFile',
    value: function _parseDataFile(json, fields) {
      if (!json) return;
      fields.version = fields.version || json.version || 0;
      if (fields.version == 0) {
        if (json.id) fields.survey = json.id;
        if (json.questions && json.questions[0]) {
          fields.rootQuestion = json.questions[0];
        }
      } else {
        fields.rootQuestion = json.question;
        fields.survey = json._id;
      }
      return;
    }
  }, {
    key: '_parseFileField',
    value: function _parseFileField(_ref) {
      var _this3 = this;

      var mime = _ref.mime,
          field = _ref.field,
          file = _ref.file,
          fields = _ref.fields,
          encoding = _ref.encoding;

      if (field === 'data-file' || field === 'dataFile') {
        return (0, _streamToArray2.default)(file).then(function (arr) {
          return Buffer.concat(arr);
        }).then(function (buff) {
          fields.checksum = _crypto2.default.createHash('sha256').update(buff).digest('hex');
          return buff.toString();
        }).then(function (jsonStr) {
          return JSON.parse(jsonStr);
        }).then(function (json) {
          return json;
        }).then(function (json) {
          return _this3._parseDataFile ? _this3._parseDataFile(json, fields) : Promise.reject({
            message: 'Unknown data format: ' + field,
            status: 400
          });
        });
      } else {
        return null;
      }
    }
  }, {
    key: '_parseEntity',
    value: function _parseEntity(obj) {
      return this._filterObject(obj, 'name description rootQuestion surveyor survey version checksum');
    }
  }, {
    key: 'download',
    value: function download() {
      var _this4 = this;

      var query = this._getQuery();
      Promise.resolve(query && this._findOne(query)).then(function (e) {
        return e || Promise.reject(new Error('Entity not found.'));
      }).catch(function (err) {
        return _this4.renderer.renderPromise(Promise.reject(err));
      }).then(function (answer) {
        var res = _this4.renderer.res;
        res.attachment(answer._id + '.csv');

        var csvWriter = new _csvWriteStream2.default();
        csvWriter.pipe(res);

        csvWriter.on('end', function () {
          return res.end();
        });
        csvWriter.write(answer.rootQuestion.collect({}));
        csvWriter.end();
      }).catch(function (err) {});
    }
  }]);

  return AnswerController;
}(_EntitiyController2.default);

Object.assign(AnswerController, {
  collection: _Answer2.default,
  routeName: 'answers',

  _findFields: 'name description surveyor survey checksum modifiedAt',
  _createFields: '_id name description survey surveyor checksum modifiedAt existing'
});

module.exports = AnswerController;
exports.default = AnswerController;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("stream-to-array");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EntitiyController = __webpack_require__(9);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _surveyorCsvParser = __webpack_require__(82);

var _surveyorCsvParser2 = _interopRequireDefault(_surveyorCsvParser);

var _User = __webpack_require__(18);

var _User2 = _interopRequireDefault(_User);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Surveyor document controller.
 *
 * @class LocationController
 * @extends {BaseController}
 */
var SurveyorController = function (_EntityController) {
  _inherits(SurveyorController, _EntityController);

  function SurveyorController() {
    _classCallCheck(this, SurveyorController);

    return _possibleConstructorReturn(this, (SurveyorController.__proto__ || Object.getPrototypeOf(SurveyorController)).apply(this, arguments));
  }

  _createClass(SurveyorController, [{
    key: '_create',
    value: function _create(query) {
      if (query._done) {
        delete query._done;
        return Promise.resolve(query);
      }
      return _get(SurveyorController.prototype.__proto__ || Object.getPrototypeOf(SurveyorController.prototype), '_create', this).call(this, query);
    }
  }, {
    key: '_parseEntity',
    value: function _parseEntity(obj) {
      var filter = 'username name roles payload surveyor-csv _done';
      return this._filterObject(obj, filter);
    }
  }, {
    key: '_parseFileField',
    value: function _parseFileField(_ref) {
      var mime = _ref.mime,
          field = _ref.field,
          file = _ref.file,
          fields = _ref.fields;

      if (field === 'surveyor-csv') {
        fields._done = true;
        var parser = new _surveyorCsvParser2.default({
          deleteExisting: fields['delete-existing']
        });
        file.pipe(parser);
        return parser.promise;
      }
      return null;
    }
  }, {
    key: 'auth',
    value: function auth() {
      this.renderer.renderPromise(_User2.default.find({ roles: 'SURVEYOR' }).then(function (users) {
        return users.reduce(function (acc, user) {
          acc[user.username] = user.payload;
          return acc;
        }, {});
      }));
    }
  }, {
    key: '_indexQuery',
    value: function _indexQuery() {
      return { roles: 'SURVEYOR' };
    }
  }, {
    key: '_getQuery',
    value: function _getQuery() {
      var query = _get(SurveyorController.prototype.__proto__ || Object.getPrototypeOf(SurveyorController.prototype), '_getQuery', this).call(this);
      return query && Object.assign(query, this._indexQuery());
    }
  }, {
    key: '_findOne',
    value: function _findOne(query) {
      return _get(SurveyorController.prototype.__proto__ || Object.getPrototypeOf(SurveyorController.prototype), '_findOne', this).call(this, query).then(function (surveyor) {
        if (surveyor) {
          return _Statistic2.default.find({
            type: /^SurveyorAggregate/,
            key: surveyor.username
          }).then(function (stats) {
            surveyor.set('aggregates', stats, { strict: false });
            return surveyor;
          });
        }
        return surveyor;
      });
    }
  }]);

  return SurveyorController;
}(_EntitiyController2.default);

exports.default = SurveyorController;


Object.assign(SurveyorController, {
  collection: _User2.default,
  entityName: 'User',
  routeName: 'surveyors',

  _findFields: '_id name username roles modifiedAt',
  _createFields: '_id name username roles modifiedAt'
});
module.exports = SurveyorController;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(34);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(11);

var express = __webpack_require__(16);
var http = __webpack_require__(35);


// Create the server and load the components.
var app = express();

// 1 Setup Database


// 2.1 Setup cookies
__webpack_require__(36)(app);

// 2.2. Add security to all end points.
__webpack_require__(38)(app);

// 2.3. Setup body-parser.
__webpack_require__(44)(app);

// 10. Setup the routes:
__webpack_require__(46)(app);

// 99. Setup error-handling
__webpack_require__(84)(app);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);

/**
 * Normalize a port into a number, string or false.
 *
 * @param {any} val
 * @return {String|Number|Boolean}
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event
 *
 * @param {Error} error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cookieParser = __webpack_require__(37);
module.exports = function (app) {
  return app.use(cookieParser());
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(16);

var _express2 = _interopRequireDefault(_express);

var _authentication = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var jwt = __webpack_require__(43);
var constants = __webpack_require__(5);

var secRouter = new _express2.default.Router();

var jwtOpts = Object.assign({
  getToken: function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      req.skipCSRF = true;
      return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.ptracking_jwt) {
      req.skipCSRF = false;
      return req.cookies.ptracking_jwt;
    } else {
      return null;
    }
  }
}, constants.jwt);

secRouter.use.apply(secRouter, [jwt(jwtOpts), function (req, res, next) {
  return console.log('jwt success') || next('router');
}, function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    next();
  } else {
    next(err);
  }
}].concat(_toConsumableArray(_authentication.signIn)));

module.exports = function (app) {
  app.use(secRouter);
  app.get('/auth', function (req, res, next) {
    res.json(req.user);
  });
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = undefined;

var _User = __webpack_require__(18);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = __webpack_require__(40);
var Digest = __webpack_require__(41).DigestStrategy;
var jwt = __webpack_require__(42);
var Constants = __webpack_require__(5);

passport.use(new Digest({ qop: 'auth' }, function (username, cb) {
  if (username === Constants.admin.username) {
    return cb(null, {
      username: Constants.admin.username,
      name: 'Admin',
      roles: ['root'] }, Constants.admin.passphrase);
  } else {
    _User2.default.findOne({ username: username }).then(function (user) {
      if (!user) cb(null, false);
      cb(null, {
        username: user.username,
        name: user.name,
        roles: user.roles
      }, user.passphrase || 'none');
    }).catch(function (err) {
      return cb(err);
    });
  }
}));

var passportMiddleware = passport.authenticate('digest', { session: false });

/**
 * Inspects roles based on the route
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
function rolesMiddleware(req, res, next) {
  if (req.path.startsWith('/auth')) {
    next();
    return;
  }
  var user = req.user;
  var rolesHash = {};
  for (var role in user.roles) {
    rolesHash[role.toLowerCase()] = 1;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Constants.routeSecurity[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var sec = _step.value;

      if (req.path.startsWith(sec.prefix)) {
        var roles2Check = sec.roles.split(' ');
        for (var _role in roles2Check) {
          if (rolesHash[_role]) {
            next();
            return;
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

  next({ status: 401, message: 'Unauthorized' });
}

var setCookie = function setCookie(req, res, next) {
  res.cookie('ptracking_jwt', jwt.sign(req.user, Constants.jwt.secret));
  next();
};

var signIn = [passportMiddleware, rolesMiddleware, setCookie];
exports.signIn = signIn;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("passport-http");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodyParser = __webpack_require__(45);

module.exports = function (app) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json({ limit: '10mb' }));
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {
  app.use('/cms', __webpack_require__(47));
  app.use('/app', __webpack_require__(83));

  // redirect the home to /cms
  app.get('/', function (req, res) {
    res.redirect('/cms');
  });
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dispatcher = __webpack_require__(25);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(16);


/**
 *
 * @param {Express.App} app
 * @param {Class.<BaseController>} Controller
 * @param {Function} extra
 */
function registerCmsRoutes(app, Controller, extra) {
  var router = new express.Router();

  router.get('/', (0, _dispatcher2.default)(Controller, 'index'));
  router.post('/', (0, _dispatcher2.default)(Controller, 'create'));
  router.get('/new', (0, _dispatcher2.default)(Controller, 'new'));
  router.get('/:id', (0, _dispatcher2.default)(Controller, 'get'));
  router.patch('/:id', (0, _dispatcher2.default)(Controller, 'update'));
  router.delete('/:id', (0, _dispatcher2.default)(Controller, 'delete'));
  router.get('/:id/edit', (0, _dispatcher2.default)(Controller, 'edit'));
  extra && extra(router, Controller);
  app.use('/' + Controller.routeName, router);
  console.log('[CMS] Registered @ /' + Controller.routeName + ' for ' + Controller.name);
}

var cmsRouter = new express.Router();
registerCmsRoutes(cmsRouter, __webpack_require__(26), function (app, ctrl) {
  app.get('/:id/download', (0, _dispatcher2.default)(ctrl, 'download'));
  app.get('/:id/answers', (0, _dispatcher2.default)(ctrl, 'answers'));
  app.post('/:id/reset', (0, _dispatcher2.default)(ctrl, 'reset'));
});
registerCmsRoutes(cmsRouter, __webpack_require__(30));
registerCmsRoutes(cmsRouter, __webpack_require__(76));
registerCmsRoutes(cmsRouter, __webpack_require__(78));
registerCmsRoutes(cmsRouter, __webpack_require__(80));
registerCmsRoutes(cmsRouter, __webpack_require__(32));
module.exports = cmsRouter;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Render helper
 */
var Renderer = function () {
  function Renderer(_ref) {
    var res = _ref.res,
        next = _ref.next;

    _classCallCheck(this, Renderer);

    this.res = res;
    this.next = next;
  }

  _createClass(Renderer, [{
    key: 'sendError',
    value: function sendError(err) {
      if (!err.message) {
        if (err.status == '400') err.message = 'Bad request';
        if (err.status == '404') err.message = 'Not found';
        if (err.status == '405') err.message = 'Method not allowed';
      }
      this.next(err);
    }
  }, {
    key: 'render',
    value: function render(err, data) {
      if (err) {
        this.sendError(err);
      } else {
        this.res.json(data);
      }
    }
  }, {
    key: 'renderTemplate',
    value: function renderTemplate(template, data) {
      this.res.render(template, data, this._renderCallback.bind(this));
    }
  }, {
    key: '_renderCallback',
    value: function _renderCallback(err, data) {}
  }, {
    key: 'renderPromise',
    value: function renderPromise(p) {
      var _this = this;

      return p.then(function (data) {
        if (data && data.template) {
          var json = data.json,
              template = data.template;

          _this.renderTemplate(template, json);
        } else {
          _this.render(null, data);
        }
      }).catch(function (err) {
        return _this.render(err, {});
      });
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;
;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base Controller.
 * 
 * @class BaseController
 */
var BaseController = function () {
  function BaseController(_ref) {
    var renderer = _ref.renderer,
        req = _ref.req;

    _classCallCheck(this, BaseController);

    this.req = req;
    this.renderer = renderer;
  }

  _createClass(BaseController, [{
    key: "dispatch",
    value: function dispatch(method) {
      this.action = method;
      this[method]();
    }
  }]);

  return BaseController;
}();

exports.default = BaseController;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles creating an object via POST
 */
var ListingConcerns = function (_Mixin) {
  _inherits(ListingConcerns, _Mixin);

  function ListingConcerns() {
    _classCallCheck(this, ListingConcerns);

    return _possibleConstructorReturn(this, (ListingConcerns.__proto__ || Object.getPrototypeOf(ListingConcerns)).apply(this, arguments));
  }

  _createClass(ListingConcerns, [{
    key: '_find',
    value: function _find(query) {
      if (this.constructor.collection) {
        return this.constructor.collection.find(query).select(this._findFields);
      }
    }
  }, {
    key: '_indexQuery',
    value: function _indexQuery() {
      return {};
    }
  }, {
    key: 'index',
    value: function index() {
      this.renderer.renderPromise(this._find(this._indexQuery()));
    }
  }]);

  return ListingConcerns;
}(_Mixin3.default);

exports.default = ListingConcerns;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = __webpack_require__(0);

/**
 * Handles creating an object via POST
 */

var GetConcerns = function (_Mixin) {
  _inherits(GetConcerns, _Mixin);

  function GetConcerns() {
    _classCallCheck(this, GetConcerns);

    return _possibleConstructorReturn(this, (GetConcerns.__proto__ || Object.getPrototypeOf(GetConcerns)).apply(this, arguments));
  }

  _createClass(GetConcerns, [{
    key: '_findOne',
    value: function _findOne(query) {
      return this.constructor.collection.findOne(query);
    }
  }, {
    key: '_getQuery',
    value: function _getQuery() {
      var _id = this.req.params.id;
      if (_id && mongoose.Types.ObjectId.isValid(_id)) {
        return { _id: _id };
      } else {
        return null;
      }
    }
  }, {
    key: 'get',
    value: function get() {
      var query = this._getQuery();
      this.renderer.renderPromise(Promise.resolve(query && this._findOne(query)).then(function (e) {
        return e || Promise.reject(new Error('Entity not found.'));
      }).catch(function (e) {
        return Promise.reject(Object.assign(e, { status: 404 }));
      }));
    }
  }]);

  return GetConcerns;
}(_Mixin3.default);

exports.default = GetConcerns;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles creating an object via POST
 */
var DeleteConcerns = function (_Mixin) {
  _inherits(DeleteConcerns, _Mixin);

  function DeleteConcerns() {
    _classCallCheck(this, DeleteConcerns);

    return _possibleConstructorReturn(this, (DeleteConcerns.__proto__ || Object.getPrototypeOf(DeleteConcerns)).apply(this, arguments));
  }

  _createClass(DeleteConcerns, [{
    key: '_remove',
    value: function _remove(query) {
      return this.constructor.collection.remove(query);
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var query = this._getQuery();
      this.renderer.renderPromise(Promise.resolve(query && this._remove(query)).then(function (e) {
        return e || Promise.reject(new Error('Entity not found.'));
      }).catch(function (e) {
        e.status = 404;
        return Promise.reject(e);
      }));
    }
  }]);

  return DeleteConcerns;
}(_Mixin3.default);

exports.default = DeleteConcerns;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _multipartHandler = __webpack_require__(54);

var _multipartHandler2 = _interopRequireDefault(_multipartHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles creating an object via POST
 */
var BodyConcerns = function (_Mixin) {
  _inherits(BodyConcerns, _Mixin);

  function BodyConcerns() {
    _classCallCheck(this, BodyConcerns);

    return _possibleConstructorReturn(this, (BodyConcerns.__proto__ || Object.getPrototypeOf(BodyConcerns)).apply(this, arguments));
  }

  _createClass(BodyConcerns, [{
    key: '_parseFileField',
    value: function _parseFileField() {
      return null;
    }
  }, {
    key: '_parseMultipart',
    value: function _parseMultipart() {
      return new _multipartHandler2.default(this.req, this._parseFileField.bind(this)).promise;
    }
  }, {
    key: '_filterObject',
    value: function _filterObject(obj, keys) {
      if (typeof keys === 'string') keys = keys.split(' ');
      return keys.reduce(function (acc, key) {
        if (obj[key] !== undefined) acc[key] = obj[key];
        return acc;
      }, {});
    }
  }, {
    key: '_setIf',
    value: function _setIf(dest, key, val) {
      if (val) {
        dest[key] = val;
      }
      return dest;
    }
  }, {
    key: '_parseJson',
    value: function _parseJson() {
      return Promise.resolve(this.req.body);
    }
  }, {
    key: '_parseBody',
    value: function _parseBody() {
      this._parseWarnings = [];
      var req = this.req;
      if (req.is('multipart/form-data')) {
        return this._parseMultipart();
      } else if (req.is('application/json') && req.body) {
        return this._parseJson();
      } else {
        return Promise.reject(new Error('Unsupported upload type.'));
      }
    }
  }]);

  return BodyConcerns;
}(_Mixin3.default);

exports.default = BodyConcerns;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _busboy = __webpack_require__(55);

var _busboy2 = _interopRequireDefault(_busboy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Our multi-part form handler.
*/
var MPHandler = function (_Busboy) {
  _inherits(MPHandler, _Busboy);

  function MPHandler(request, fileHandler) {
    _classCallCheck(this, MPHandler);

    var _this = _possibleConstructorReturn(this, (MPHandler.__proto__ || Object.getPrototypeOf(MPHandler)).call(this, { headers: request.headers }));

    _this.childPromises = [];
    _this.fileHandler = fileHandler || _this.fileHandler;
    _this.promise = new Promise(function (resolve, reject) {
      _this.data = {};
      _this.on('file', _this._fileHandler.bind(_this));
      _this.on('field', function (field, val) {
        _this.data[field] = val;
      });
      _this.on('finish', function () {
        resolve(Promise.all(_this.childPromises).then(function () {
          return _this.data;
        }));
      });
    });
    request.pipe(_this);
    return _this;
  }

  _createClass(MPHandler, [{
    key: '_fileHandler',
    value: function _fileHandler(field, file, fname, encoding, mime) {
      var _this2 = this;

      var filePromise = this.fileHandler({ field: field, file: file, fname: fname, encoding: encoding, mime: mime, fields: this.data });
      if (filePromise && filePromise.then) {
        this.childPromises.push(filePromise.then(function (fileData) {
          _this2.data[field] = fileData;
        }).catch(function (err) {
          file.resume();
          _this2.data[field] = { error: err };
          return Promise.reject(err);
        }));
      } else {
        file.resume();
      }
    }
  }]);

  return MPHandler;
}(_busboy2.default);

exports.default = MPHandler;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("busboy");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles creating an object via POST
 */
var CreateConcerns = function (_Mixin) {
  _inherits(CreateConcerns, _Mixin);

  function CreateConcerns() {
    _classCallCheck(this, CreateConcerns);

    return _possibleConstructorReturn(this, (CreateConcerns.__proto__ || Object.getPrototypeOf(CreateConcerns)).apply(this, arguments));
  }

  _createClass(CreateConcerns, [{
    key: '_create',
    value: function _create(query) {
      var _this2 = this;

      return this.constructor.collection.create(query).then(function (obj) {
        return _this2._filterObject(obj, _this2._createFields);
      });
    }
  }, {
    key: '_createQuery',
    value: function _createQuery() {
      return this._parseBody();
    }
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      var query = this._createQuery();
      this.renderer.renderPromise(query.then(function (o) {
        return o && _this3._create(o);
      }).then(function (e) {
        return e || Promise.reject(new Error('Entity not created.'));
      }).then(function (e) {
        return _defineProperty({
          warnings: _this3._parseWarnings
        }, _this3.constructor.entityName || 'entity', e);
      }).catch(function (e) {
        e.status = 400;
        if (e.errors) {
          e.details = Object.keys(e.errors).map(function (key) {
            return { key: key, message: e.errors[key].message };
          });
        }
        return Promise.reject(e);
      }));
    }
  }, {
    key: 'new',
    value: function _new() {
      this.renderer.render(null, {});
    }
  }]);

  return CreateConcerns;
}(_Mixin3.default);

exports.default = CreateConcerns;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles creating an object via POST
 */
var UpdateConcerns = function (_Mixin) {
  _inherits(UpdateConcerns, _Mixin);

  function UpdateConcerns() {
    _classCallCheck(this, UpdateConcerns);

    return _possibleConstructorReturn(this, (UpdateConcerns.__proto__ || Object.getPrototypeOf(UpdateConcerns)).apply(this, arguments));
  }

  _createClass(UpdateConcerns, [{
    key: '_findOneAndUpdate',
    value: function _findOneAndUpdate(getQuery, query) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.constructor.collection.findOneAndUpdate(getQuery, query, Object.assign({ new: true }, opts));
    }
  }, {
    key: '_updateQuery',
    value: function _updateQuery() {
      return this._parseBody();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.renderer.renderPromise(Promise.resolve(this._getQuery() || Promise.reject(new Error('Entity not found.'))).then(function (getQ) {
        return _this2._updateQuery().then(function (updQ) {
          return _this2._findOneAndUpdate(getQ, updQ);
        });
      }).then(function (e) {
        return e || Promise.reject(new Error('Entity not created.'));
      }).then(function (e) {
        return _defineProperty({
          warnings: _this2._parseWarnings
        }, _this2.constructor.entityName || 'entity', e);
      }).catch(function (e) {
        e.status = 400;
        return Promise.reject(e);
      }));
    }
  }, {
    key: 'edit',
    value: function edit() {
      this.get();
    }
  }]);

  return UpdateConcerns;
}(_Mixin3.default);

exports.default = UpdateConcerns;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tags = __webpack_require__(59);

var _tags2 = _interopRequireDefault(_tags);

var _options = __webpack_require__(70);

var _options2 = _interopRequireDefault(_options);

var _treeCsvParser = __webpack_require__(72);

var _treeCsvParser2 = _interopRequireDefault(_treeCsvParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Tree based parser for questions provided in CSV for mapping/household survey.
*
* @class SurveyCSVParser
* @extends {TreeParser}
*/
var SurveyCSVParser = function (_TreeParser) {
  _inherits(SurveyCSVParser, _TreeParser);

  /**
  * Creates an instance of SurveyCSVParser.
  * @param {any} opts
  *
  * @memberOf SurveyCSVParser
  */
  function SurveyCSVParser(opts) {
    _classCallCheck(this, SurveyCSVParser);

    opts = opts || {};
    opts.survey = Object.assign({
      name: 'Unnamed',
      description: 'Created via CSV.',
      question: 'Q',
      opt: 'Opt',
      default: 'English'
    }, opts.survey);

    opts.tree = Object.assign({
      sectionField: opts.survey.question + '.No'
    }, opts.tree);

    var _this = _possibleConstructorReturn(this, (SurveyCSVParser.__proto__ || Object.getPrototypeOf(SurveyCSVParser)).call(this, { csv: opts.csv, tree: opts.tree }));

    _this.surveyOpts = opts.survey;
    var qNo = _this.surveyOpts.question + '.No';

    _this.rootQuestion = {};
    _this.rootQuestion[qNo] = '';

    _this.on('nodeCompleted', _this._onNodeCompleted.bind(_this));
    _this.on('nodePushed', _this._onNodePushed.bind(_this));
    _this.on('error', _this._onError.bind(_this));

    _this.promise = new Promise(function (res, rej) {
      _this.res = res;_this.rej = rej;
    });

    _this.warnings = [];
    return _this;
  }

  /**
   * Process tags from the stack and create template object.
   *
   * @param {any} stack
   *
   * @memberOf SurveyCSVParser
   */


  _createClass(SurveyCSVParser, [{
    key: '_onNodePushed',
    value: function _onNodePushed(stack) {
      var _this2 = this;

      var qParsedTag = '_parsedTag';
      var qTags = this.surveyOpts.question + '.Tags';
      var qType = this.surveyOpts.question + '.Type';
      var qNo = this.surveyOpts.question + '.No';
      var optNo = this.surveyOpts.opt + '.No';
      var node = stack[stack.length - 1];
      var parent = null;
      if (stack.length > 1) {
        parent = stack[stack.length - 2];
      }
      if (!node[qNo] && node[optNo]) {
        node[qParsedTag] = (0, _options2.default)(node[qTags]).then(function (_ref) {
          var output = _ref.output,
              warnings = _ref.warnings;

          _this2.warnings = _this2.warnings.concat(warnings);
          return output;
        });
      } else if (node[qNo]) {
        node[qParsedTag] = (0, _tags2.default)(node[qType], node[qTags], parent && parent[qParsedTag]).then(function (_ref2) {
          var output = _ref2.output,
              warnings = _ref2.warnings;

          _this2.warnings = _this2.warnings.concat(warnings);
          return output;
        });
      }
    }

    /**
    *
    *
    * @param {CSVRowObject} node, parent
    *
    * @memberOf SurveyCSVParser
    */

  }, {
    key: '_onNodeCompleted',
    value: function _onNodeCompleted(_ref3) {
      var node = _ref3.node,
          parent = _ref3.parent;

      var qNo = this.surveyOpts.question + '.No';
      var optNo = this.surveyOpts.opt + '.No';

      // 1. If parent is null, the survey object is the parent.
      if (parent == null) {
        parent = this.rootQuestion;
      }
      this._createPromises(parent);

      // 2. Figure node type (Q or Opt) and create entity accordingly.
      if (!node[qNo] && node[optNo]) {
        parent.optionPromises.push(this._createOption(node).then(function (e) {
          return { position: node[optNo], option: e };
        }));
      } else if (node[qNo]) {
        parent.childrenPromises.push(this._createQuestion(node, parent).then(function (e) {
          return {
            position: node[qNo].slice(parent[qNo].length == 0 ? 0 : parent[qNo].length + 1),
            question: e
          };
        }));
      }
    }

    /**
    * Helper to create promises array on question/survey.
    *
    * @param {CSVRowObject} parent
    *
    * @memberOf SurveyCSVParser
    */

  }, {
    key: '_createPromises',
    value: function _createPromises(parent) {
      parent.childrenPromises = parent.childrenPromises || [];
      parent.optionPromises = parent.optionPromises || [];
    }

    /**
    * Private helper to create Option doc
    *
    * @param {any} node
    * @return {Promise.<Option>}
    *
    * @memberOf SurveyCSVParser
    */

  }, {
    key: '_createOption',
    value: function _createOption(node) {
      var _this3 = this;

      var optText = this.surveyOpts.opt + '.Text.';
      var optType = this.surveyOpts.opt + '.Type';
      var qParsedTag = '_parsedTag';

      return Promise.resolve(node[qParsedTag]).then(function (opt) {
        return Object.assign({
          type: node[optType] || 'GENERIC',
          text: _this3._createTextJson(node, optText)
        }, opt);
      });
    }

    /**
    * Private helper to create Question doc.
    *
    * @param {CSVRowObject} node
    * @return {Promise} Question doc.
    *
    * @memberOf SurveyCSVParser
    */

  }, {
    key: '_createQuestion',
    value: function _createQuestion(node) {
      var _this4 = this;

      var qText = this.surveyOpts.question + '.Text.';
      var qTags = this.surveyOpts.question + '.Tags';
      var qType = this.surveyOpts.question + '.Type';
      var qNo = this.surveyOpts.question + '.No';
      var qPre = this.surveyOpts.question + '.PreReq.';
      var qPreQ = qPre + this.surveyOpts.question;
      var qPreOpt = qPre + this.surveyOpts.opt;
      var qParsedTag = '_parsedTag';

      if (!node[qType]) {
        this.warnings.push({ message: 'Missing ' + qType + ' in ' + qNo + ' ' + node[qNo] });
      }

      this._createPromises(node);
      return Promise.all(node.childrenPromises).then(function (ch) {
        return Promise.all(node.optionPromises).then(function (opts) {
          return { options: opts, children: ch };
        });
      }).then(function (q) {
        return Promise.resolve(node[qParsedTag]).then(function (flow) {
          return q.flow = flow;
        }).then(function () {
          return q;
        });
      }).then(function (q) {
        if (node[qPreQ]) {
          q.flow.pre.skipUnless = {
            question: node[qPreQ],
            option: node[qPreOpt]
          };
        }
        return Object.assign(q, {
          text: _this4._createTextJson(node, qText),
          type: node[qType] || 'GENERIC',
          tags: node[qTags],
          number: node[qNo]
        });
      });
    }

    /**
    * Private helper
    *
    * @param {String} str
    * @return {[String]} tags
    *
    * @memberOf SurveyCSVParser
    */

    /**
    * Private helper to create Text sub-doc
    *
    * @param {CSVRowObject} node
    * @param {String} prefix
    * @return {Text} Text sub-doc
    *
    * @memberOf SurveyCSVParser
    */

  }, {
    key: '_createTextJson',
    value: function _createTextJson(node, prefix) {
      var tObj = {};
      var pLen = prefix.length;
      for (var k in node) {
        if (k.startsWith(prefix)) {
          tObj[k.slice(pLen).toLowerCase()] = node[k];
        }
      }
      return tObj;
    }

    /**
    * Private 'finish' callback
    *
    * @private
    *
    * @memberOf SurveyCSVParser
    */

  }, {
    key: '_onFinish',
    value: function _onFinish() {
      var _this5 = this;

      _get(SurveyCSVParser.prototype.__proto__ || Object.getPrototypeOf(SurveyCSVParser.prototype), '_onFinish', this).call(this);

      // Create the root Question object.
      Promise.all(this.rootQuestion.childrenPromises).then(function (ch) {
        return {
          type: 'ROOT',
          options: [],
          children: ch,
          flow: __webpack_require__(27)('NONE', null)
        };
      }).then(function (q) {
        _this5.res({ root: q, warnings: _this5.warnings });
      }).catch(function (err) {
        _this5.rej({ error: err });
      });
    }

    /**
    * Private 'error' callback
    *
    * @param {any} err
    *
    * @memberOf SurveyCSVParser
    */

  }, {
    key: '_onError',
    value: function _onError(err) {
      this.rej(err);
    }
  }]);

  return SurveyCSVParser;
}(_treeCsvParser2.default);

module.exports = SurveyCSVParser;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _questionDefault = __webpack_require__(27);

var _questionDefault2 = _interopRequireDefault(_questionDefault);

var _promiseProcess = __webpack_require__(28);

var _promiseProcess2 = _interopRequireDefault(_promiseProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (type, tags, parentContext) {
  var moreWarnings = [];

  return (0, _promiseProcess2.default)(tags, tagModules, function (o, mod, tag) {
    return mod.adorn(tag, o, moreWarnings);
  }, Promise.resolve(parentContext).then(function (pCtx) {
    return Object.assign({}, (0, _questionDefault2.default)(type, pCtx));
  })).then(function (_ref) {
    var output = _ref.output,
        warnings = _ref.warnings;
    return {
      output: output,
      warnings: warnings.concat(moreWarnings)
    };
  });
};

var tagModules = [].concat([__webpack_require__(60), __webpack_require__(61), __webpack_require__(62), __webpack_require__(63), __webpack_require__(64), __webpack_require__(65), __webpack_require__(66), __webpack_require__(67), __webpack_require__(68), __webpack_require__(69)]);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'FILL_',
  adorn: function adorn(tag, obj) {
    obj.pre.fill.push(tag.slice(5 // 'FILL_'.length
    ));
  }
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'AUTH_',
  adorn: function adorn(tag, obj) {
    obj.post.push(tag.slice(5 // 'AUTH_'.length
    ));
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'LOOP_',
  adorn: function adorn(tag, obj) {
    obj.exit.strategy = 'LOOP';
    var suffix = tag.slice(5);
    if (suffix == 'OPTIONS') {
      obj.answer.scope = 'options';
    } else {
      obj.answer.scope = 'multiple';
    }
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'SELECT_',
  adorn: function adorn(tag, obj) {
    var suffix = tag.slice(7);
    if (suffix == 'ONCE') {
      obj.answer.scope = 'once';
    } else if (suffix == 'OPTIONS') {
      obj.answer.scope = 'options';
    } else {
      obj.answer.scope = 'multiple';
    }
  }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'OPTIONS_COUNT_',
  adorn: function adorn(tag, obj) {
    var count = parseInt(tag.slice(module.exports.tagPrefix.length));
    obj.question.optionsLimit = count || false;
  }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'UI_BACK_DISABLED',
  adorn: function adorn(tag, obj) {
    obj.question.back = false;
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'GRID',
  adorn: function adorn(tag, obj) {
    var suffix = tag.slice(5);
    if (!suffix) {
      suffix = obj.child && obj.child.select || 'multiple';
    }
    obj.child.strategy = 'select';
    obj.child.select = {
      ui: 'grid',
      repeat: suffix.toLowerCase()
    };
  }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'IMAGES',
  adorn: function adorn(tag, obj) {
    obj.question.showImage = true;
  }
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'NUMBER',
  adorn: function adorn(tag, obj) {
    var suffix = tag.slice(6); // NUMBER_
    var match = null;

    obj.question.validationType = 'number';
    obj.question.validation = '[0-9]+';

    if (match = suffix.match(/_LIMIT_([0-9]*)/)) {
      obj.question.validationLimit = parseInt(match[1]);
    }
    if (match = suffix.match(/_DLIMIT_([0-9]*)/)) {
      obj.question.validationDigitsLimit = parseInt(match[1]);
    }
  }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'SHOWN_TOGETHER',
  adorn: function adorn(tag, obj) {
    obj.child.strategy = 'together';
  }
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promiseProcess = __webpack_require__(28);

var _promiseProcess2 = _interopRequireDefault(_promiseProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionsDefault = {};

exports.default = function (tags) {
  var moreWarnings = [];

  return (0, _promiseProcess2.default)(tags, optModules, function (o, mod, tag) {
    return mod.adorn(tag, o, moreWarnings);
  }, Promise.resolve(Object.assign({}, optionsDefault))).then(function (_ref) {
    var output = _ref.output,
        warnings = _ref.warnings;
    return {
      output: output,
      warnings: warnings.concat(moreWarnings)
    };
  });
};

var optModules = [].concat([__webpack_require__(71)]);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Artifact = __webpack_require__(29);

var _Artifact2 = _interopRequireDefault(_Artifact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  tagPrefix: 'IMG_',
  adorn: function adorn(tag, obj, warnings) {
    var name = tag.slice(4);
    return _Artifact2.default.findOne({ name: name, type: 'image' }).then(function (art) {
      if (art) {
        obj.image = {
          data: art.data.toString('base64'),
          mimeType: art.mimeType
        };
      } else {
        warnings.push({ message: 'Unknown image: ' + name + ' (tag=' + tag });
      }
      return obj;
    });
  }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVParser = __webpack_require__(21);

/** 
 * A stack-based parser to parse hierarchical CSVs.
 *
 * Uses options:
 *
 * {
 *   csv: CSVParser opts,
 *   tree: {
 *     sectionField:  col for sec. numbering (1, 1.2, 1.2.4, etc.)
 *   }
 * }
 */

var TreeParser = function (_CSVParser) {
  _inherits(TreeParser, _CSVParser);

  function TreeParser(opts) {
    _classCallCheck(this, TreeParser);

    opts.csv = Object.assign(opts.csv || {}, { columns: function columns(r) {
        return _this._parseColumn(r);
      } });

    var _this = _possibleConstructorReturn(this, (TreeParser.__proto__ || Object.getPrototypeOf(TreeParser)).call(this, opts.csv));

    opts = opts.tree;
    _this.sectionField = opts.sectionField || 'Section';
    _this.subTextField = opts.subTextField || 'Opt.Text';
    _this.subField = opts.subField || 'Opt.No';

    _this.on('csvRecord', _this._parseRecord.bind(_this));
    _this.on('finish', _this._onFinish.bind(_this));

    _this.parentStack = [];
    return _this;
  }

  _createClass(TreeParser, [{
    key: '_parseColumn',
    value: function _parseColumn(row) {
      var _this2 = this;

      if (row.indexOf(this.sectionField) == -1) {
        throw new Error('Section field: ' + this.sectionField + ' not found in header.');
      }
      this.subTextFields = row.reduce(function (acc, e) {
        if (e.startsWith(_this2.subTextField + '.')) {
          acc.push(e);
        }
        return acc;
      }, []);
      return row;
    }
  }, {
    key: '_parseRecord',
    value: function _parseRecord(record) {
      // 1. Pop from stack until we find parent of the current record.
      while (!this._lastIsParent(record)) {
        this._popStack();
      }

      // 2. Push the current record into the stack.
      this.parentStack.push(record);
      this.emit('nodePushed', this.parentStack);

      // 3. Finally, for compatibility emulate records for options stored in the
      // same cell as the question itself.
      var recSection = record[this.sectionField];
      var recSubText = record[this.subTextFields[0]];
      if (recSubText != '' && recSection != '') {
        this._doCompatibilityParsing(record);
      }
    }
  }, {
    key: '_doCompatibilityParsing',
    value: function _doCompatibilityParsing(record) {
      var recSubTexts = this.subTextFields.reduce(function (acc, f) {
        return record[f].split(/([0-9]+\.)/).reduce(function (acc, e, i, arr) {
          var m = null;
          var pos = null;
          if ((m = e.match(/([0-9]+)\./)) && m.index == 0 && (pos = m[1]) && i < arr.length - 1) {
            acc[pos] = acc[pos] || {};
            acc[pos][f] = arr[i + 1].trim();
          }
          return acc;
        }, acc);
      }, {});

      for (var k in recSubTexts) {
        var dupRecord = Object.create(record);
        dupRecord[this.sectionField] = '';
        dupRecord[this.subField] = k;
        for (var kk in recSubTexts[k]) {
          dupRecord[kk] = recSubTexts[k][kk];
        }
        this._parseRecord(dupRecord);
      }
    }
  }, {
    key: '_onFinish',
    value: function _onFinish() {
      while (!this._lastIsParent(null)) {
        this._popStack();
      }
    }
  }, {
    key: '_lastIsParent',
    value: function _lastIsParent(record) {
      var len = this.parentStack.length;

      // An empty stack is always the parent of any record.
      if (len == 0) return true;

      // No record implies end of doc, so we pop out everything.
      if (!record) return false;

      var parentRecord = this.parentStack[len - 1];
      var recordSection = record[this.sectionField] || '';
      var parentSection = parentRecord[this.sectionField] || '';

      if (parentSection != '' && (recordSection.startsWith(parentSection + '.') || recordSection == '')) {
        return true;
      }
      return false;
    }
  }, {
    key: '_popStack',
    value: function _popStack() {
      var record = this.parentStack.pop();
      var parent = null;
      var len = this.parentStack.length;

      if (len != 0) {
        parent = this.parentStack[len - 1];
      }

      this.emit('nodeCompleted', { node: record, parent: parent, stack: this.parentStack });
    }
  }]);

  return TreeParser;
}(CSVParser);

module.exports = TreeParser;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("csv-parse");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("csv-write-stream");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EntitiyController = __webpack_require__(9);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _streamToArray = __webpack_require__(31);

var _streamToArray2 = _interopRequireDefault(_streamToArray);

var _fileType = __webpack_require__(77);

var _fileType2 = _interopRequireDefault(_fileType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Artifact = __webpack_require__(29);

/**
 * Artifact document controller.
 *
 * @class ArtifactController
 * @extends {BaseController}
 */
var ArtifactController = function (_EntityController) {
  _inherits(ArtifactController, _EntityController);

  function ArtifactController() {
    _classCallCheck(this, ArtifactController);

    return _possibleConstructorReturn(this, (ArtifactController.__proto__ || Object.getPrototypeOf(ArtifactController)).apply(this, arguments));
  }

  _createClass(ArtifactController, [{
    key: '_parseEntity',
    value: function _parseEntity(obj) {
      if (obj.data && !obj.mimeType) {
        var fType = (0, _fileType2.default)(obj.data);
        if (fType) obj.mimeType = fType.mime;
      }

      var filter = ['name', 'description', 'type', 'mimeType', 'data'];
      if (this.action === 'create') {
        filter = filter.concat('_id');
      }
      return this._filterObject(obj, filter);
    }
  }, {
    key: '_parseFileField',
    value: function _parseFileField(_ref) {
      var mime = _ref.mime,
          field = _ref.field,
          file = _ref.file,
          fields = _ref.fields;

      if (field === 'data') {
        return (0, _streamToArray2.default)(file).then(function (arr) {
          return Buffer.concat(arr);
        });
      }
      return null;
    }
  }, {
    key: '_findOne',
    value: function _findOne(query) {
      var _this2 = this;

      return _get(ArtifactController.prototype.__proto__ || Object.getPrototypeOf(ArtifactController.prototype), '_findOne', this).call(this, query).then(function (a) {
        if (a) {
          var b = _this2._findFields.split(' ').reduce(function (acc, key) {
            acc[key] = a[key];
            return acc;
          }, {});
          b.dataBase64 = a.data.toString('base64');
          delete b.data;
          return b;
        }
      });
    }
  }]);

  return ArtifactController;
}(_EntitiyController2.default);

Object.assign(ArtifactController, {
  collection: Artifact,
  entityName: 'Artifact',
  routeName: 'artifacts',

  _findFields: '_id name description type mimeType modifiedAt',
  _createFields: '_id name description type mimeType modifiedAt'
});
module.exports = ArtifactController;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("file-type");

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntitiyController = __webpack_require__(9);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _procs = __webpack_require__(79);

var _procs2 = _interopRequireDefault(_procs);

var _Process = __webpack_require__(10);

var _Process2 = _interopRequireDefault(_Process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Process controller.
 *
 * @class ProcessController
 * @extends {EntityController}
 */
var ProcessController = function (_EntityController) {
  _inherits(ProcessController, _EntityController);

  function ProcessController() {
    _classCallCheck(this, ProcessController);

    return _possibleConstructorReturn(this, (ProcessController.__proto__ || Object.getPrototypeOf(ProcessController)).apply(this, arguments));
  }

  _createClass(ProcessController, [{
    key: '_parseEntity',
    value: function _parseEntity(obj) {
      if (!_procs2.default[obj.name]) {
        return null;
      }

      return this._filterObject(obj, 'name args');
    }
  }, {
    key: '_create',
    value: function _create(query) {
      return _procs2.default[query.name].execute(query.args).createP;
    }
  }]);

  return ProcessController;
}(_EntitiyController2.default);

Object.assign(ProcessController, {
  collection: _Process2.default,
  entityName: 'Process',
  routeName: 'processes',

  _findFields: 'name path status modifiedAt'
});
module.exports = ProcessController;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportResponses = exports.CollectResponses = undefined;

var _childProcess = __webpack_require__(14);

var _childProcess2 = _interopRequireDefault(_childProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectResponses = exports.CollectResponses = new _childProcess2.default({
  procName: 'CollectResponses',
  procPath: 'web/collect-responses'
});
var ExportResponses = exports.ExportResponses = new _childProcess2.default({
  procName: 'ExportResponses',
  procPath: 'web/export-responses'
});

exports.default = { CollectResponses: CollectResponses, ExportResponses: ExportResponses };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Location = __webpack_require__(7);

var _Location2 = _interopRequireDefault(_Location);

var _EntitiyController = __webpack_require__(9);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _locationCsvParser = __webpack_require__(81);

var _locationCsvParser2 = _interopRequireDefault(_locationCsvParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Location document controller.
 *
 * @class LocationController
 * @extends {BaseController}
 */
var LocationController = function (_EntityController) {
  _inherits(LocationController, _EntityController);

  function LocationController() {
    _classCallCheck(this, LocationController);

    return _possibleConstructorReturn(this, (LocationController.__proto__ || Object.getPrototypeOf(LocationController)).apply(this, arguments));
  }

  _createClass(LocationController, [{
    key: '_create',
    value: function _create(query) {
      if (query._done) {
        delete query._done;
        return Promise.resolve(query);
      }
      return _get(LocationController.prototype.__proto__ || Object.getPrototypeOf(LocationController.prototype), '_create', this).call(this, query);
    }
  }, {
    key: '_parseEntity',
    value: function _parseEntity(obj) {
      var filter = 'name code type children _done csv';
      return this._filterObject(obj, filter);
    }
  }, {
    key: '_parseFileField',
    value: function _parseFileField(_ref) {
      var mime = _ref.mime,
          field = _ref.field,
          file = _ref.file,
          fields = _ref.fields;

      if (field === 'csv') {
        fields._done = true;
        var parser = new _locationCsvParser2.default({
          deleteExisting: fields['delete-existing']
        });
        file.pipe(parser);
        return parser.promise;
      }
      return null;
    }
  }]);

  return LocationController;
}(_EntitiyController2.default);

exports.default = LocationController;


Object.assign(LocationController, {
  collection: _Location2.default,
  entityName: 'Location',
  routeName: 'locations',

  _findFields: '_id name code uid type modifiedAt',
  _createFields: '_id name code uid type children modifiedAt'
});
module.exports = LocationController;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _csvParser = __webpack_require__(21);

var _csvParser2 = _interopRequireDefault(_csvParser);

var _Location = __webpack_require__(7);

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Abstraction for csv-parse with our default options.
 *
 * @class CSVParser
 * @extends {Parser}
 */
var _class = function (_CSVParser) {
  _inherits(_class, _CSVParser);

  /**
   * Creates an instance of CSVParser.
   * @param {any} opts (passed to csv-parse)
   *
   * @memberOf CSVParser
   */
  function _class(opts) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, Object.assign({
      columns: function columns(r) {
        return _this._parseColumn(r);
      },
      delimiter: ','
    }, opts && opts.csv)));

    _this.opts = opts || {};
    _this.on('csvRecord', _this._parseLocation.bind(_this));
    _this.on('finish', _this._createLocations.bind(_this));
    _this.on('error', _this._onError.bind(_this));

    _this.promise = new Promise(function (res, rej) {
      _this._res = res;
      _this._rej = rej;
    });
    _this.initialPromise = Promise.resolve({});
    return _this;
  }

  _createClass(_class, [{
    key: '_onError',
    value: function _onError(err) {
      this._rej(err);
    }
  }, {
    key: '_parseColumn',
    value: function _parseColumn(arr) {
      var _this2 = this;

      this.types = [];
      this.locations = [];
      arr.forEach(function (element) {
        if (element.endsWith('_CODE')) {
          _this2.types.push(element.slice(0, -5));
          _this2.locations.push({});
        }
      });
      if (this.opts.deleteExisting) {
        this.initialPromise = _Location2.default.deleteMany({ type: { $in: this.types } });
      }
      return arr;
    }
  }, {
    key: '_parseLocation',
    value: function _parseLocation(row) {
      var _this3 = this;

      this.types.forEach(function (loc, idx) {
        var codeKey = loc + '_CODE';
        var trueCodeKey = loc + '_TRUECODE';

        if (idx == 0) {
          row[trueCodeKey] = row[codeKey];
        } else {
          var lastLocKey = _this3.types[idx - 1] + '_TRUECODE';
          row[trueCodeKey] = row[lastLocKey] + '/' + row[codeKey];
        }
      });

      var payload = {};
      this.types.forEach(function (loc, idx) {
        var codeKey = loc + '_CODE';
        var nameKey = loc + '_NAME';
        var trueCodeKey = loc + '_TRUECODE';

        payload[codeKey] = row[codeKey];
        payload[nameKey] = row[nameKey];

        _this3.locations[idx][row[trueCodeKey]] = _this3.locations[idx][row[trueCodeKey]] || {
          type: loc,
          name: row[nameKey],
          code: row[codeKey],
          uid: row[trueCodeKey],
          children: [],
          payload: Object.assign({}, payload)
        };
      });
      this.types.forEach(function (loc, idx) {
        var trueCodeKey = loc + '_TRUECODE';
        var jidx = idx + 1;
        var locObj = _this3.locations[idx][row[trueCodeKey]];
        if (jidx < _this3.types.length) {
          var jloc = _this3.types[jidx];
          var jTrueCodeKey = jloc + '_TRUECODE';
          var jlocObj = _this3.locations[jidx][row[jTrueCodeKey]];
          _this3._addChild(locObj, jlocObj);
        }
      });
    }
  }, {
    key: '_addChild',
    value: function _addChild(parent, child) {
      var exists = false;
      parent.children.forEach(function (c) {
        if (child.code == c.code) {
          exists = true;
        }
      });
      if (!exists) {
        var name = child.name,
            code = child.code,
            uid = child.uid;

        parent.children.push({ name: name, code: code, uid: uid });
      }
    }
  }, {
    key: '_createLocations',
    value: function _createLocations() {
      var _this4 = this;

      this._res(this.initialPromise.then(function () {
        return Promise.all(_this4.locations.reduce(function (acc, locs, idx) {
          return acc.concat(Object.keys(locs).map(function (k) {
            return locs[k];
          }).map(function (loc) {
            return _Location2.default.create(loc);
          }));
        }, []));
      }));
    }
  }]);

  return _class;
}(_csvParser2.default);

exports.default = _class;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _csvParser = __webpack_require__(21);

var _csvParser2 = _interopRequireDefault(_csvParser);

var _User = __webpack_require__(18);

var _User2 = _interopRequireDefault(_User);

var _Location = __webpack_require__(7);

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Abstraction for csv-parse with our default options.
 *
 * @class CSVParser
 * @extends {Parser}
 */
var _class = function (_CSVParser) {
  _inherits(_class, _CSVParser);

  /**
   * Creates an instance of CSVParser.
   * @param {any} opts (passed to csv-parse)
   *
   * @memberOf CSVParser
   */
  function _class(opts) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, Object.assign({
      columns: function columns(r) {
        return _this._parseColumn(r);
      },
      delimiter: ','
    }, opts && opts.csv)));

    _this.opts = opts || {};

    _this.on('csvRecord', _this._parseSurveyor.bind(_this));
    _this.on('finish', _this._onFinish.bind(_this));
    _this.on('error', _this._onError.bind(_this));

    _this.promise = new Promise(function (res, rej) {
      _this._res = res;
      _this._rej = rej;
    });
    _this.promises = [];
    _this.initialPromise = Promise.resolve({});
    return _this;
  }

  _createClass(_class, [{
    key: '_onError',
    value: function _onError(err) {
      this._rej(err);
    }
  }, {
    key: '_parseColumn',
    value: function _parseColumn(arr) {
      this.location = ['DISTRICT', 'BLOCK', 'PANCHAYAT'];
      if (this.opts.deleteExisting) {
        this.initialPromise = _User2.default.deleteMany({ roles: 'SURVEYOR' });
      }
      return arr;
    }
  }, {
    key: '_parseSurveyor',
    value: function _parseSurveyor(row) {
      var panchayatUid = this.location.reduce(function (acc, loc) {
        return acc + '/' + row[loc + '_CODE'];
      }, '').slice(1);
      this.promises.push(this.initialPromise.then(function () {
        return _Location2.default.findOne({ type: 'PANCHAYAT', uid: panchayatUid }).then(function (loc) {
          return loc || Promise.reject({
            message: 'Panchayat ' + panchayatUid + ' not found.'
          });
        }).then(function (loc) {
          var userPayload = Object.assign(loc.payload || {}, row, {
            'HABITATION_NAME': loc.children.map(function (c) {
              return c.name;
            })
          });
          return _User2.default.create({
            username: row['SURVEYOR_CODE'],
            name: row.SURVEYOR_NAME,
            roles: ['SURVEYOR'],
            payload: userPayload
          });
        });
      }));
    }
  }, {
    key: '_onFinish',
    value: function _onFinish() {
      this._res(Promise.all(this.promises));
    }
  }]);

  return _class;
}(_csvParser2.default);

exports.default = _class;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dispatcher = __webpack_require__(25);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _SurveyorController = __webpack_require__(32);

var _SurveyorController2 = _interopRequireDefault(_SurveyorController);

var _AnswerController = __webpack_require__(30);

var _AnswerController2 = _interopRequireDefault(_AnswerController);

var _SurveyController = __webpack_require__(26);

var _SurveyController2 = _interopRequireDefault(_SurveyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(16);
var app = new express.Router();


app.get('/auth', (0, _dispatcher2.default)(_SurveyorController2.default, 'auth'));

app.post('/upload', (0, _dispatcher2.default)(_AnswerController2.default, 'create'));

app.get('/download', (0, _dispatcher2.default)(_SurveyController2.default, 'index'));
app.get('/download/:id', (0, _dispatcher2.default)(_SurveyController2.default, 'get'));

//  (req, res, next) => {
//   res.sendFile(path.resolve('data/auth.json'));
// })

module.exports = app;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {
  if (process.env.NODE_ENV == 'production') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
          details: err.details || {}
        }
      });
    });
  } else {
    // Dev mode will print stacktrace

    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        details: err.details || null,
        stack: err.stack && err.stack.split('\n')
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
};

/***/ })
/******/ ]);