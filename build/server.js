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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("csv-parse");

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Schema = __webpack_require__(1);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

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

  function AnsweredQuestion(obj, position) {
    _classCallCheck(this, AnsweredQuestion);

    var _this = _possibleConstructorReturn(this, (AnsweredQuestion.__proto__ || Object.getPrototypeOf(AnsweredQuestion)).call(this, obj));

    Object.assign(_this, obj);
    if (position) _this.position = position;
    return _this;
  }

  _createClass(AnsweredQuestion, [{
    key: 'accumulateValue',
    value: function accumulateValue(ans, ansKey) {
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
      } else {
        ret[ansKey] = ans.logged_options.map(function (opt) {
          return opt.position || opt.text.english;
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
          cb = _ref.cb;

      var number = respondents[idx];
      if (!this.isParent(number)) return;
      if (!this.answers) return;

      acc = acc || {};
      prefix = prefix || 'Q';
      keys = keys || [];
      prefix = '' + prefix + (this.position || '');

      if (this.number === number) {
        cb(this, { acc: acc, keys: keys, prefix: prefix });
        return;
      }

      this.answers.forEach(function (ans, ansIdx) {
        if (ans.children) {
          var respChild = null;
          ans.children.find(function (child, idx) {
            child = AnsweredQuestion.fromChild(child);
            if (child.isParent(number)) {
              return respChild = child;
            } else {
              return false;
            }
          });
          if (respChild) {
            var newAcc = _this2.collectAnswer({
              ans: ans, keys: keys,
              idx: ansIdx,
              ansKey: prefix,

              ignore: respondents,
              acc: Object.assign({}, acc)
            });
            respChild.findRespondents({
              acc: newAcc,
              prefix: prefix + '_',
              keys: keys, respondents: respondents, idx: idx, cb: cb
            });
          }
        }
      });
    }
  }, {
    key: 'collectAnswer',
    value: function collectAnswer(_ref2) {
      var _this3 = this;

      var ans = _ref2.ans,
          idx = _ref2.idx,
          acc = _ref2.acc,
          ansKey = _ref2.ansKey,
          suffix = _ref2.suffix,
          keys = _ref2.keys,
          ignore = _ref2.ignore;

      acc = acc || {};
      ansKey = ansKey || 'Q';
      suffix = suffix || '';
      keys = keys || [];

      var valObj = this.accumulateValue(ans, ansKey);
      Object.keys(valObj).forEach(function (key) {
        var oKey = key + suffix;
        acc[oKey] = valObj[key];
        if (!keys['pos' + oKey]) {
          keys.push(oKey);
          var text = '';
          if (_this3.number) text = text + _this3.number;
          if (_this3.text && _this3.text.english) {
            text = text + (' ' + _this3.text.english);
          }
          keys['pos' + oKey] = text || 'UNKNOWN';
        }
      });

      if (ans.children) {
        ans.children.reduce(function (acc, child) {
          var childAnswer = AnsweredQuestion.fromChild(child);
          if (ignore && ignore.reduce(function (acc, ign) {
            return acc || childAnswer.isParent(ign);
          }, false)) return acc;

          return childAnswer.collect({
            prefix: ansKey + '_',
            suffix: suffix, keys: keys, acc: acc, ignore: ignore
          });
        }, acc);
      }
      return acc;
    }
  }, {
    key: 'collect',
    value: function collect(_ref3) {
      var _this4 = this;

      var acc = _ref3.acc,
          prefix = _ref3.prefix,
          suffix = _ref3.suffix,
          keys = _ref3.keys,
          ignore = _ref3.ignore;

      acc = acc || {};
      prefix = prefix || 'Q';
      suffix = suffix || '';
      keys = keys || [];

      var pos = this.position || '';
      pos = pos.replace(/\./g, '_');
      prefix = '' + prefix + pos;
      return this.answers ? this.answers.reduce(function (acc, ans, idx) {
        var ansKey = prefix;
        var newSuffix = suffix;
        if (_this4.flow && _this4.flow.answer.scope == 'multiple') {
          newSuffix = suffix + ('_ans' + idx);
        }
        return _this4.collectAnswer({
          ans: ans, idx: idx, acc: acc, ansKey: ansKey, keys: keys, ignore: ignore,
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

var answerSchema = new _Schema2.default({
  name: { type: String },
  description: { type: String },
  survey: { type: _Schema2.default.Types.ObjectId, ref: 'Survey', required: true },
  surveyor: { type: _Schema2.default.Types.ObjectId, ref: 'Surveyor' },
  version: { type: Number, default: 0 },
  rootQuestion: {
    type: {}, required: true,
    get: function get(a) {
      return new AnsweredQuestion(a);
    }
  },

  // Post-processing concerns
  lastExport: { type: Date }
});
answerSchema.index({ survey: 1, lastExport: 1 });

module.exports = _mongoose2.default.model('Answer', answerSchema);

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController = __webpack_require__(37);

var _BaseController2 = _interopRequireDefault(_BaseController);

var _Mixin = __webpack_require__(2);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _Listing = __webpack_require__(38);

var _Listing2 = _interopRequireDefault(_Listing);

var _Get = __webpack_require__(39);

var _Get2 = _interopRequireDefault(_Get);

var _Delete = __webpack_require__(40);

var _Delete2 = _interopRequireDefault(_Delete);

var _Body = __webpack_require__(41);

var _Body2 = _interopRequireDefault(_Body);

var _Create = __webpack_require__(44);

var _Create2 = _interopRequireDefault(_Create);

var _Update = __webpack_require__(45);

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
    _classCallCheck(this, EntityController);

    return _possibleConstructorReturn(this, (EntityController.__proto__ || Object.getPrototypeOf(EntityController)).apply(this, arguments));
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

exports.default = EntityController;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("csv-stringify");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);
var Text = __webpack_require__(13);
var mongoose = __webpack_require__(0);

var questionSchema = new Schema({
  type: { type: String },
  tags: [{ type: String }],
  text: { type: Text },
  number: { type: String },
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
  }
});

var Question = mongoose.model('Question', questionSchema);
module.exports = Question;

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


module.exports = function (type, parent) {
  return {
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
};

/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(18);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _database = __webpack_require__(8);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(9);
var http = __webpack_require__(19);

// Create the server and load the components.
var app = express();

// 1 Setup Database


// 2.1 Setup cookies
__webpack_require__(20)(app);

// 2.2. Add security to all end points.
__webpack_require__(22)(app);

// 2.3. Setup body-parser.
__webpack_require__(29)(app);

// 10. Setup the routes:
__webpack_require__(31)(app);

// 99. Setup error-handling
__webpack_require__(71)(app);

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
/* 19 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cookieParser = __webpack_require__(21);
module.exports = function (app) {
  return app.use(cookieParser());
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jwt = __webpack_require__(23);
var constants = __webpack_require__(3);

var httpDigest = __webpack_require__(24);

var jwtOpts = Object.assign({
  getToken: function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      req.skipCSRF = true;
      return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.ptracking_jwt) {
      return req.cookies.ptracking_jwt;
    } else {
      return null;
    }
  }
}, constants.jwt);

module.exports = function (app) {
  app.use(jwt(jwtOpts).unless({
    path: ['/auth', '/auth/out']
  }), function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.redirect('/auth?referrer=' + encodeURIComponent(req.originalUrl));
    } else {
      next(err);
    }
  });
  httpDigest(app, '/auth');
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _User = __webpack_require__(25);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = __webpack_require__(26);
var Digest = __webpack_require__(27).DigestStrategy;
var jwt = __webpack_require__(28);
var Constants = __webpack_require__(3);

passport.use(new Digest({ qop: 'auth' }, function (username, cb) {
  if (username === Constants.admin.username) {
    return cb(null, {
      username: Constants.admin.username,
      name: 'Dev Admin',
      roles: ['root'] }, Constants.admin.passphrase);
  } else {
    _User2.default.findOne({ username: username }).then(function (user) {
      if (!user) cb(null, false);
      cb(null, {
        username: user.username,
        name: user.name,
        roles: user.roles
      }, user.passphrase);
    }).catch(function (err) {
      return cb(err);
    });
  }
}));

module.exports = function (app, path) {
  app.get(path, passport.authenticate('digest', { session: false }), function (req, res) {
    res.cookie('ptracking_jwt', jwt.sign(req.user, Constants.jwt.secret));
    if (req.query.referrer) {
      res.redirect(req.query.referrer);
    } else {
      res.json(req.user);
    }
  });
  app.get(path + '/out', function (req, res) {
    res.clearCookie('ptracking_jwt');
    res.json({});
  });
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String },

  passphrase: { type: String },
  roles: [{ type: String }]
});
userSchema.index({ username: 1 });
userSchema.index({ name: 1 });

module.exports = mongoose.model('User', userSchema);

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("passport-http");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodyParser = __webpack_require__(30);

module.exports = function (app) {
  // parse application/x-www-form-urlencoded 
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json 
  app.use(bodyParser.json({ limit: '10mb' }));
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {
  app.use('/cms', __webpack_require__(32));
  app.use('/app', __webpack_require__(69));

  // redirect the home to /cms
  app.get('/', function (req, res) {
    res.redirect('/cms');
  });
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dispatcher = __webpack_require__(33);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(9);


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
  console.log('Registered @ /' + Controller.routeName + ' for ' + Controller.name);
}

var cmsRouter = new express.Router();
registerCmsRoutes(cmsRouter, __webpack_require__(35), function (app, ctrl) {
  app.use('/:id/download', (0, _dispatcher2.default)(ctrl, 'download'));
});
registerCmsRoutes(cmsRouter, __webpack_require__(63));
registerCmsRoutes(cmsRouter, __webpack_require__(66));
module.exports = cmsRouter;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dispatcher;

var _render = __webpack_require__(34);

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
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fs = __webpack_require__(4);

var _fs2 = _interopRequireDefault(_fs);

var _streamConcat = __webpack_require__(36);

var _streamConcat2 = _interopRequireDefault(_streamConcat);

var _EntitiyController = __webpack_require__(10);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _surveyResponse = __webpack_require__(46);

var _surveyResponse2 = _interopRequireDefault(_surveyResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Survey = __webpack_require__(6);

var SurveyCSVParser = __webpack_require__(47);

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
        var path = _surveyResponse2.default.csvSortedPath(_id);
        var headerPath = _surveyResponse2.default.csvSortedHeaderPath(_id);
        if (_fs2.default.existsSync(path) && _fs2.default.existsSync(headerPath)) {
          var csvOutput = new _streamConcat2.default([_fs2.default.createReadStream(headerPath), _fs2.default.createReadStream(path)]);
          var res = _this2.renderer.res;
          res.attachment((survey.name || _id) + '.csv');
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
    key: '_parseEntity',
    value: function _parseEntity(obj) {
      obj.enabled = !!obj.enabled;
      if (typeof obj.respondents === 'string') {
        if (obj.respondents == 'none') {
          obj.respondents = null;
        } else {
          obj.respondents = obj.respondents.split(',');
        }
      }

      if (obj.csv) {
        if (obj.csv.warnings) {
          var _parseWarnings;

          (_parseWarnings = this._parseWarnings).push.apply(_parseWarnings, _toConsumableArray(obj.csv.warnings));
        }
        obj.question = obj.csv.root;
      }

      var filter = ['name', 'description', 'respondents', 'enabled', 'question'];
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
/* 36 */
/***/ (function(module, exports) {

module.exports = require("stream-concat");

/***/ }),
/* 37 */
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
/* 38 */
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
        return this.constructor.collection.find(query);
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
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _multipartHandler = __webpack_require__(42);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _busboy = __webpack_require__(43);

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
/* 43 */
/***/ (function(module, exports) {

module.exports = require("busboy");

/***/ }),
/* 44 */
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
      return this.constructor.collection.create(query);
    }
  }, {
    key: '_createQuery',
    value: function _createQuery() {
      return this._parseBody();
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      var query = this._createQuery();
      this.renderer.renderPromise(query.then(function (o) {
        return o && _this2._create(o);
      }).then(function (e) {
        return e || Promise.reject(new Error('Entity not created.'));
      }).then(function (e) {
        return _defineProperty({
          warnings: _this2._parseWarnings
        }, _this2.constructor.entityName || 'entity', e);
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
/* 45 */
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
      return this.constructor.collection.findOneAndUpdate(getQuery, query, { new: true });
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(4);

var _fs2 = _interopRequireDefault(_fs);

var _csvStringify = __webpack_require__(11);

var _csvStringify2 = _interopRequireDefault(_csvStringify);

var _csvParse = __webpack_require__(5);

var _csvParse2 = _interopRequireDefault(_csvParse);

var _Survey = __webpack_require__(6);

var _Survey2 = _interopRequireDefault(_Survey);

var _Answer = __webpack_require__(7);

var _Answer2 = _interopRequireDefault(_Answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Batch post-processor for Survey responses
 */
var SurveyResponseProcessor = function () {
  function SurveyResponseProcessor(surveyId) {
    _classCallCheck(this, SurveyResponseProcessor);

    this.surveyId = surveyId;
    this.surveyPromise = _Survey2.default.findOne({ _id: surveyId });
  }

  _createClass(SurveyResponseProcessor, [{
    key: 'processAnswers',
    value: function processAnswers() {
      var _this = this;

      return this.surveyPromise.then(function (s) {
        return s && s.respondents;
      }).then(function (respondents) {
        return _this.surveyRespondents = respondents;
      }).then(function () {
        return _this._readCSVHeader().then(function (keys) {
          return _this.csvKeys = keys;
        }, function () {
          return _this.csvKeys = [];
        });
      }).then(function () {
        return new Promise(function (res, rej) {
          var cursor = _Answer2.default.find({
            survey: _this.surveyId
          }).cursor();

          _this.csvWriter = _this._createCsvWriter(_this.constructor.csvPath(_this.surveyId), 'a', rej);

          var result = [];
          cursor.on('data', function (answer) {
            if (!answer) return;
            _this._collectAnswer(answer);
            result.push(answer._id);
          });
          cursor.on('error', function (err) {
            return rej(err);
          });
          cursor.on('end', function () {
            _this.csvWriter.end();
            _this._writeCSVHeader();
            res(Promise.all(result));
          });
        });
      });
    }
  }, {
    key: 'sortAnswers',
    value: function sortAnswers() {
      var _this2 = this;

      return this._readCSVHeader().then(function (keys) {
        return _this2.csvKeys = keys;
      }).then(function () {
        return new Promise(function (res, rej) {
          var inPath = _this2.constructor.csvPath(_this2.surveyId);
          var outPath = _this2.constructor.csvSortedPath(_this2.surveyId);
          var reader = _this2._createCsvReader(inPath, rej);
          var writer = _this2._createCsvWriter(outPath, 'w', rej);

          var sortedKeyIndices = _this2.csvKeys.map(function (key, index) {
            return { key: key, index: index };
          }).sort(function (a, b) {
            var ret = _this2._keyListComparator(a.key.split('_'), b.key.split('_'));
            return ret;
          });
          reader.on('end', function () {
            writer.end(null, null, function () {
              var newKeys = [];
              sortedKeyIndices.forEach(function (_ref, index) {
                var key = _ref.key;

                newKeys.push(key);
                newKeys['pos' + key] = _this2.csvKeys['pos' + key];
              });
              _this2.csvKeys = newKeys;
              res(_this2._writeCSVHeader(_this2.constructor.csvSortedHeaderPath(_this2.surveyId)));
            });
          });

          reader.on('readable', function () {
            var data = null;
            while (data = reader.read()) {
              var out = sortedKeyIndices.map(function (_ref2) {
                var key = _ref2.key,
                    index = _ref2.index;
                return data[index];
              });
              writer.write(out);
            }
          });
        });
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
    key: '_writeCSVObj',
    value: function _writeCSVObj(obj) {
      this.csvWriter.write(this.csvKeys.map(function (k) {
        return obj[k];
      }));
    }
  }, {
    key: '_collectAnswer',
    value: function _collectAnswer(answer) {
      var _this3 = this;

      if (!answer || !answer.rootQuestion) return;
      if (answer.version == 0) {
        return;
      }
      if (!this.surveyRespondents || !this.surveyRespondents.length) {
        var obj = answer.rootQuestion.collect({ keys: this.csvKeys });
        this._writeCSVObj(obj);
      } else {
        this.surveyRespondents.forEach(function (resp, idx) {
          answer.rootQuestion.findRespondents({
            keys: _this3.csvKeys,
            respondents: _this3.surveyRespondents,
            cb: _this3._collectRespondent.bind(_this3),
            idx: idx
          });
        });
      }
    }
  }, {
    key: '_collectRespondent',
    value: function _collectRespondent(question, _ref3) {
      var _this4 = this;

      var acc = _ref3.acc,
          prefix = _ref3.prefix;

      question.answers.forEach(function (ans, idx) {
        var obj = question.collectAnswer({
          ans: ans, idx: idx,
          acc: Object.assign({}, acc),
          keys: _this4.csvKeys,
          ansKey: prefix
        });
        _this4._writeCSVObj(obj);
      });
    }
  }, {
    key: '_readCSVHeader',
    value: function _readCSVHeader() {
      var _this5 = this;

      return new Promise(function (res, rej) {
        var filePath = _this5.constructor.csvHeaderPath(_this5.surveyId);
        var reader = _this5._createCsvReader(filePath, rej);

        var rows = [];
        reader.on('end', function () {
          return res(rows);
        });
        reader.on('error', rej);

        reader.on('readable', function () {
          var data = null;
          while (data = reader.read()) {
            rows.push(data);
          }
        });
      }).then(function (rows) {
        var keys = rows[0];
        keys.forEach(function (e, i) {
          return keys['pos' + e] = rows[1] && rows[1][i] || true;
        });
        return keys;
      });
    }
  }, {
    key: '_writeCSVHeader',
    value: function _writeCSVHeader(path) {
      var _this6 = this;

      if (!this.csvKeys || !this.csvKeys.length) return;
      var filePath = path || this.constructor.csvHeaderPath(this.surveyId);
      return new Promise(function (res, rej) {
        var csvWriter = _this6._createCsvWriter(filePath, 'w', rej);
        csvWriter.on('error', rej);
        csvWriter.write(_this6.csvKeys);
        csvWriter.write(_this6.csvKeys.map(function (k) {
          return _this6.csvKeys['pos' + k];
        }));
        csvWriter.end(null, null, res);
      });
    }
  }, {
    key: '_createCsvReader',
    value: function _createCsvReader(path, errH) {
      var fileStream = _fs2.default.createReadStream(path, { encoding: 'utf8' });
      if (errH) fileStream.on('error', errH);
      var csvReader = new _csvParse2.default({ relax_column_count: true });
      fileStream.pipe(csvReader);
      return csvReader;
    }
  }, {
    key: '_createCsvWriter',
    value: function _createCsvWriter(path, mode, errH) {
      if (!mode) mode = 'w';
      var fileStream = _fs2.default.createWriteStream(path, { encoding: 'utf8', flags: mode });
      if (errH) fileStream.on('error', errH);

      var csvWriter = new _csvStringify2.default();
      csvWriter.pipe(fileStream);
      csvWriter.on('end', function () {
        return fileStream.end();
      });
      return csvWriter;
    }
  }], [{
    key: 'csvPath',
    value: function csvPath(surveyId) {
      return 'data/survey-response/' + surveyId + '.csv';
    }
  }, {
    key: 'csvSortedPath',
    value: function csvSortedPath(surveyId) {
      return 'data/survey-response/' + surveyId + '-sorted.csv';
    }
  }, {
    key: 'csvHeaderPath',
    value: function csvHeaderPath(surveyId) {
      return 'data/survey-response/' + surveyId + '-header.csv';
    }
  }, {
    key: 'csvSortedHeaderPath',
    value: function csvSortedHeaderPath(surveyId) {
      return 'data/survey-response/' + surveyId + '-sorted-header.csv';
    }
  }]);

  return SurveyResponseProcessor;
}();

exports.default = SurveyResponseProcessor;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tags = __webpack_require__(48);

var _tags2 = _interopRequireDefault(_tags);

var _options = __webpack_require__(59);

var _options2 = _interopRequireDefault(_options);

var _treeCsvParser = __webpack_require__(61);

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
          flow: __webpack_require__(14)('NONE', null)
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _questionDefault = __webpack_require__(14);

var _questionDefault2 = _interopRequireDefault(_questionDefault);

var _promiseProcess = __webpack_require__(15);

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

var tagModules = [].concat([__webpack_require__(49), __webpack_require__(50), __webpack_require__(51), __webpack_require__(52), __webpack_require__(53), __webpack_require__(54), __webpack_require__(55), __webpack_require__(56), __webpack_require__(57), __webpack_require__(58)]);

/***/ }),
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
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
/* 53 */
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'UI_BACK_DISABLED',
  adorn: function adorn(tag, obj) {
    obj.question.back = false;
  }
};

/***/ }),
/* 55 */
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'IMAGES',
  adorn: function adorn(tag, obj) {
    obj.question.showImage = true;
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'NUMBER',
  adorn: function adorn(tag, obj) {
    var suffix = tag.slice(7); // NUMBER_
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'SHOWN_TOGETHER',
  adorn: function adorn(tag, obj) {
    obj.child.strategy = 'together';
  }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promiseProcess = __webpack_require__(15);

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

var optModules = [].concat([__webpack_require__(60)]);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Artifact = __webpack_require__(16);

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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVParser = __webpack_require__(62);

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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(5),
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Answer = __webpack_require__(7);

var _Answer2 = _interopRequireDefault(_Answer);

var _EntitiyController = __webpack_require__(10);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _csvWriteStream = __webpack_require__(64);

var _csvWriteStream2 = _interopRequireDefault(_csvWriteStream);

var _streamToString = __webpack_require__(65);

var _streamToString2 = _interopRequireDefault(_streamToString);

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
    key: '_find',
    value: function _find(query) {
      return _get(AnswerController.prototype.__proto__ || Object.getPrototypeOf(AnswerController.prototype), '_find', this).call(this, query).select('name description surveyor survey modifiedAt');
    }
  }, {
    key: '_create',
    value: function _create() {
      var _get2,
          _this2 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_get2 = _get(AnswerController.prototype.__proto__ || Object.getPrototypeOf(AnswerController.prototype), '_create', this)).call.apply(_get2, [this].concat(args)).then(function (obj) {
        return _this2._filterObject(obj, ['_id', 'name', 'description', 'version', 'surveyor', 'survey', 'modifiedAt']);
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
          fields = _ref.fields;

      if (field === 'dataFile') {
        return (0, _streamToString2.default)(file).then(function (jsonStr) {
          return JSON.parse(jsonStr);
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
      return this._filterObject(obj, ['name', 'description', 'rootQuestion', 'surveyor', 'survey', 'version']);
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
  routeName: 'answers'
});
module.exports = AnswerController;
exports.default = AnswerController;

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("csv-write-stream");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("stream-to-string");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EntitiyController = __webpack_require__(10);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _streamToArray = __webpack_require__(67);

var _streamToArray2 = _interopRequireDefault(_streamToArray);

var _fileType = __webpack_require__(68);

var _fileType2 = _interopRequireDefault(_fileType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Artifact = __webpack_require__(16);

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
    key: '_find',
    value: function _find(query) {
      return _get(ArtifactController.prototype.__proto__ || Object.getPrototypeOf(ArtifactController.prototype), '_find', this).call(this, query).select('name description type mimeType modifiedAt');
    }
  }, {
    key: '_create',
    value: function _create() {
      var _get2,
          _this2 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_get2 = _get(ArtifactController.prototype.__proto__ || Object.getPrototypeOf(ArtifactController.prototype), '_create', this)).call.apply(_get2, [this].concat(args)).then(function (o) {
        return _this2._filterObject(o, ['_id', 'name', 'description', 'modifiedAt', 'type', 'mimeType']);
      });
    }
  }, {
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
  }]);

  return ArtifactController;
}(_EntitiyController2.default);

Object.assign(ArtifactController, {
  collection: Artifact,
  entityName: 'Artifact',
  routeName: 'artifacts'
});
module.exports = ArtifactController;

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("stream-to-array");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("file-type");

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(70);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(9);
var app = new express.Router();


app.get('/auth', function (req, res, next) {
  res.sendFile(_path2.default.resolve('data/auth.json'));
});

module.exports = app;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 71 */
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