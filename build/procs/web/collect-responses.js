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
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
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

  function Schema(schema, opts) {
    _classCallCheck(this, Schema);

    return _possibleConstructorReturn(this, (Schema.__proto__ || Object.getPrototypeOf(Schema)).call(this, Object.assign({
      modifiedAt: { type: Date, default: Date.now }
    }, schema), opts));
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

var _Aggregates = __webpack_require__(10);

var _Aggregates2 = _interopRequireDefault(_Aggregates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _Schema2.default({
  type: { type: String, required: true },
  key: { type: String, required: true },
  name: { type: String },
  data: { type: {} },
  metadata: { type: {} }
});
schema.index({ key: 1, type: 1 });
_Aggregates2.default.copyTo(schema.methods);

module.exports = _mongoose2.default.model('Statistic', schema);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  db: {
    connectionOptions: {
      poolSize: 5,
      useMongoClient: true,
      j: true,
      w: 1
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
/* 6 */,
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _hotFormulaParser = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Mixin) {
  _inherits(_class, _Mixin);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'initialize',
    value: function initialize(_ref) {
      var stat = _ref.stat,
          aggregate = _ref.aggregate;

      if (!aggregate.metadata) return;
      var parser = stat.parser();
      var metadata = Object.assign({}, this.metadata);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(aggregate.metadata)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var formula = aggregate.metadata[key] || key;
          var val = parser.value(formula);
          if (val === null || val === undefined) continue;

          metadata[key] = val;
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

      this.metadata = metadata;
      this.markModified(metadata);
    }
  }, {
    key: 'accumulate',
    value: function accumulate(_ref2) {
      var stat = _ref2.stat,
          aggregate = _ref2.aggregate,
          invert = _ref2.invert;

      if (!aggregate.data) return;

      var parser = stat.parser();
      var data = Object.assign({}, this.data);

      if (aggregate.select && !parser.value(aggregate.select)) return;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(aggregate.data)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          var formula = void 0,
              type = void 0,
              select = void 0;
          formula = aggregate.data[key];
          if (formula && (typeof formula === 'undefined' ? 'undefined' : _typeof(formula)) === 'object') {
            type = formula.type;
            select = formula.select;
            formula = formula.formula;
          }
          if (!formula) formula = key;
          if (select && !parser.value(select)) continue;
          if (!type) type = 'count';

          var val = parser.value(formula);
          if (val === null || val === undefined) continue;

          if (type === 'histogram') {}
          data[key] = this._accumulateRegister(data[key], { val: val, type: type, invert: invert });
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

      this.data = data;
      this.markModified('data');
    }
  }, {
    key: '_accumulateRegister',
    value: function _accumulateRegister(obj, _ref3) {
      var val = _ref3.val,
          type = _ref3.type,
          invert = _ref3.invert;

      obj = obj || {};
      obj.count = obj.count || 0;
      if (type === 'count') {
        obj.value = obj.value || 0;
        var count = void 0,
            value = void 0;
        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
          count = val.count || 1;
          value = val.value || 0;
        } else {
          count = 1;
          value = parseFloat(val);
          if (value === NaN) value = 0;
        }
        if (invert) {
          obj.value = obj.value - value;
          obj.count = obj.count - count;
        } else {
          obj.value = obj.value + value;
          obj.count = obj.count + count;
        }
        if (obj.count <= 0) {
          obj.count = 0;
          obj.value = 0;
        }
      } else if (type === 'histogram') {
        obj.value = obj.value || {};
        var _count = void 0,
            _value = void 0;
        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
          _value = val.value || val;
          _count = Object.keys(_value).count;
        } else {
          _value = _defineProperty({}, val, 1);
          _count = 1;
        }
        if ((typeof _value === 'undefined' ? 'undefined' : _typeof(_value)) !== 'object') {
          _value = _defineProperty({}, _value, 1);
        }
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.keys(_value)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var k = _step3.value;

            obj.value[k] = obj.value[k] || 0;
            if (invert) {
              obj.value[k] = obj.value[k] - _value[k];
            } else {
              obj.value[k] = obj.value[k] + _value[k];
            }
            if (obj.value[k] <= 0) delete obj.value[k];
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

        if (invert) {
          obj.count = obj.count - _count;
        } else {
          obj.count = obj.count + _count;
        }
        if (obj.count <= 0) {
          obj.count = 0;
          obj.value = {};
        }
      }
      return obj;
    }
  }, {
    key: 'walkAggregates',
    value: /*#__PURE__*/regeneratorRuntime.mark(function walkAggregates(ctx) {
      var aggregates, parser, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, agg, type, key;

      return regeneratorRuntime.wrap(function walkAggregates$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              aggregates = ctx.aggregates;

              aggregates = aggregates || this.aggregates;

              if (aggregates) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return');

            case 4:
              if (aggregates.length) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return');

            case 6:
              parser = this.parser();
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context.prev = 10;
              _iterator4 = aggregates[Symbol.iterator]();

            case 12:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context.next = 24;
                break;
              }

              agg = _step4.value;
              type = void 0, key = void 0;

              if (!(!agg.key || !(key = parser.value(agg.key)))) {
                _context.next = 17;
                break;
              }

              return _context.abrupt('continue', 21);

            case 17:
              if (agg.type) {
                type = parser.value(agg.type);
              }
              if (!type) type === 'Aggregate';
              _context.next = 21;
              return { aggregate: agg, aggregateKey: { key: key, type: type } };

            case 21:
              _iteratorNormalCompletion4 = true;
              _context.next = 12;
              break;

            case 24:
              _context.next = 30;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context['catch'](10);
              _didIteratorError4 = true;
              _iteratorError4 = _context.t0;

            case 30:
              _context.prev = 30;
              _context.prev = 31;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 33:
              _context.prev = 33;

              if (!_didIteratorError4) {
                _context.next = 36;
                break;
              }

              throw _iteratorError4;

            case 36:
              return _context.finish(33);

            case 37:
              return _context.finish(30);

            case 38:
            case 'end':
              return _context.stop();
          }
        }
      }, walkAggregates, this, [[10, 26, 30, 38], [31,, 33, 37]]);
    })
  }, {
    key: 'parser',
    value: function parser() {
      var _this2 = this;

      if (this._parser) return this._parser;

      var parser = new _hotFormulaParser.Parser();
      parser.on('callVariable', function (name, done) {
        var data = _this2.metadata;
        if (data && data.hasOwnProperty(name)) {
          return done(data[name]);
        }
      });
      parser.on('callVariable', function (name, done) {
        var data = _this2.data;
        var suffix = void 0;
        if (name.endsWith('__value')) {
          name = name.slice(0, -7);
          suffix = 'value';
        } else if (name.endsWith('__count')) {
          name = name.slice(0, -7);
          suffix = 'count';
        }
        if (data && data.hasOwnProperty(name)) {
          var obj = data[name];
          if (!suffix || !obj || !((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object')) return done(obj);
          return done(obj[suffix]);
        }
      });
      parser.on('callFunction', function (name, params, done) {
        if (name === 'TO_DATE') {
          done(new Date(parseInt(params[0])));
        }
      });
      parser.value = function (exp) {
        return parser.parse(exp).result;
      };
      return this._parser = parser;
    }
  }]);

  return _class;
}(_Mixin3.default);

exports.default = _class;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("hot-formula-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _Question = __webpack_require__(13);

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
  postProcessing: { type: [] },
  answerStats: { type: {} }
});
surveySchema.index({ name: 1 });
surveySchema.index({ enabled: 1, name: 1 });

module.exports = mongoose.model('Survey', surveySchema);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

__webpack_require__(3);

var Schema = __webpack_require__(1);
var Text = __webpack_require__(14);
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
/* 14 */
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
/* 15 */
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
  }).catch(function (err) {
    console.error('Error: ', err);
  });
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 17 */
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
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Schema = __webpack_require__(1);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _AnsweredQuestion = __webpack_require__(21);

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
/* 20 */
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AnswerWalk = __webpack_require__(22);

var _AnswerWalk2 = _interopRequireDefault(_AnswerWalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var aqSchema = new Schema({
  number: { type: String },
  answers: [{
    logged_options: { type: [] },
    children: [{
      position: { type: String },
      question: {
        type: {},
        get: function get(e) {
          return new AnsweredQuestionModel(e);
        }
      }
    }],
    startTimestamp: { type: Date },
    endTimeStamp: { type: Date }
  }]
});

_AnswerWalk2.default.copyTo(aqSchema.methods);

var AnsweredQuestionModel = mongoose.model('AnsweredQuestion', aqSchema);
exports.default = AnsweredQuestionModel;

/***/ }),
/* 22 */
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Mixin) {
  _inherits(_class, _Mixin);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'walkAnswers',
    value: /*#__PURE__*/regeneratorRuntime.mark(function walkAnswers() {
      var answerIdx, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, answer;

      return regeneratorRuntime.wrap(function walkAnswers$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.answers || !this.answers.length)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              answerIdx = 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 6;
              _iterator = this.answers[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 16;
                break;
              }

              answer = _step.value;
              _context.next = 12;
              return {
                answer: answer, answerIdx: answerIdx
              };

            case 12:
              answerIdx++;

            case 13:
              _iteratorNormalCompletion = true;
              _context.next = 8;
              break;

            case 16:
              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](6);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 22:
              _context.prev = 22;
              _context.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context.prev = 25;

              if (!_didIteratorError) {
                _context.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context.finish(25);

            case 29:
              return _context.finish(22);

            case 30:
            case 'end':
              return _context.stop();
          }
        }
      }, walkAnswers, this, [[6, 18, 22, 30], [23,, 25, 29]]);
    })
  }, {
    key: 'walkChildren',
    value: /*#__PURE__*/regeneratorRuntime.mark(function walkChildren(_ref) {
      var answer = _ref.answer,
          question = _ref.question;

      var answersHash, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, child, ans;

      return regeneratorRuntime.wrap(function walkChildren$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (question) {
                _context2.next = 2;
                break;
              }

              throw new Error('Question needed');

            case 2:
              if (answer) {
                _context2.next = 4;
                break;
              }

              throw new Error('Answer needed');

            case 4:
              if (!(!question.children || !question.children.length)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return');

            case 6:
              if (!(!answer.children || !answer.children.length)) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt('return');

            case 8:
              answersHash = answer.children.reduce(function (acc, child) {
                return Object.assign(acc, _defineProperty({}, child.position, child));
              }, {});
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 12;
              _iterator2 = question.children[Symbol.iterator]();

            case 14:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 23;
                break;
              }

              child = _step2.value;
              ans = answersHash[child.position];

              if (!ans) {
                _context2.next = 20;
                break;
              }

              _context2.next = 20;
              return {
                position: ans.position,
                question: child.question,
                answeredQuestion: ans.question
              };

            case 20:
              _iteratorNormalCompletion2 = true;
              _context2.next = 14;
              break;

            case 23:
              _context2.next = 29;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2['catch'](12);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 29:
              _context2.prev = 29;
              _context2.prev = 30;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 32:
              _context2.prev = 32;

              if (!_didIteratorError2) {
                _context2.next = 35;
                break;
              }

              throw _iteratorError2;

            case 35:
              return _context2.finish(32);

            case 36:
              return _context2.finish(29);

            case 37:
            case 'end':
              return _context2.stop();
          }
        }
      }, walkChildren, this, [[12, 25, 29, 37], [30,, 32, 36]]);
    })
  }, {
    key: 'walkRespondents',
    value: /*#__PURE__*/regeneratorRuntime.mark(function walkRespondents(context) {
      var question, respondent, _context$ignores, ignores, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, ansCtx, respChild, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _ansCtx, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, child;

      return regeneratorRuntime.wrap(function walkRespondents$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              question = context.question, respondent = context.respondent, _context$ignores = context.ignores, ignores = _context$ignores === undefined ? [] : _context$ignores;

              if (question) {
                _context3.next = 3;
                break;
              }

              throw new Error('Question needed');

            case 3:
              if (!(typeof respondent === 'undefined')) {
                _context3.next = 5;
                break;
              }

              throw new Error('Respondent needed');

            case 5:
              if (!(!respondent && question.type === 'ROOT' || question.number === respondent)) {
                _context3.next = 34;
                break;
              }

              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context3.prev = 9;
              _iterator3 = this.walkAnswers()[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context3.next = 19;
                break;
              }

              ansCtx = _step3.value;

              ansCtx.type = 'respondent';
              _context3.next = 16;
              return [ansCtx, context];

            case 16:
              _iteratorNormalCompletion3 = true;
              _context3.next = 11;
              break;

            case 19:
              _context3.next = 25;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3['catch'](9);
              _didIteratorError3 = true;
              _iteratorError3 = _context3.t0;

            case 25:
              _context3.prev = 25;
              _context3.prev = 26;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 28:
              _context3.prev = 28;

              if (!_didIteratorError3) {
                _context3.next = 31;
                break;
              }

              throw _iteratorError3;

            case 31:
              return _context3.finish(28);

            case 32:
              return _context3.finish(25);

            case 33:
              return _context3.abrupt('return');

            case 34:
              respChild = void 0;
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context3.prev = 38;
              _iterator4 = this.walkAnswers()[Symbol.iterator]();

            case 40:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context3.next = 86;
                break;
              }

              _ansCtx = _step4.value;

              _ansCtx.type = 'respondentAnswer';
              _context3.next = 45;
              return [_ansCtx, context];

            case 45:
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context3.prev = 48;
              _iterator5 = this.walkChildren(_ansCtx)[Symbol.iterator]();

            case 50:
              if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                _context3.next = 64;
                break;
              }

              child = _step5.value;

              if (!child.question.isParent(respondent)) {
                _context3.next = 55;
                break;
              }

              respChild = child;
              return _context3.abrupt('continue', 61);

            case 55:
              if (!this._checkIgnore(child.question, ignores)) {
                _context3.next = 57;
                break;
              }

              return _context3.abrupt('continue', 61);

            case 57:
              child.type = 'child';
              _context3.next = 60;
              return [child, _ansCtx];

            case 60:
              return _context3.delegateYield(child.answeredQuestion.walk(child), 't1', 61);

            case 61:
              _iteratorNormalCompletion5 = true;
              _context3.next = 50;
              break;

            case 64:
              _context3.next = 70;
              break;

            case 66:
              _context3.prev = 66;
              _context3.t2 = _context3['catch'](48);
              _didIteratorError5 = true;
              _iteratorError5 = _context3.t2;

            case 70:
              _context3.prev = 70;
              _context3.prev = 71;

              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }

            case 73:
              _context3.prev = 73;

              if (!_didIteratorError5) {
                _context3.next = 76;
                break;
              }

              throw _iteratorError5;

            case 76:
              return _context3.finish(73);

            case 77:
              return _context3.finish(70);

            case 78:
              if (!respChild) {
                _context3.next = 83;
                break;
              }

              respChild.type = 'respondentChild';
              _context3.next = 82;
              return [respChild, _ansCtx];

            case 82:
              return _context3.delegateYield(respChild.answeredQuestion.walkRespondents(respChild), 't3', 83);

            case 83:
              _iteratorNormalCompletion4 = true;
              _context3.next = 40;
              break;

            case 86:
              _context3.next = 92;
              break;

            case 88:
              _context3.prev = 88;
              _context3.t4 = _context3['catch'](38);
              _didIteratorError4 = true;
              _iteratorError4 = _context3.t4;

            case 92:
              _context3.prev = 92;
              _context3.prev = 93;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 95:
              _context3.prev = 95;

              if (!_didIteratorError4) {
                _context3.next = 98;
                break;
              }

              throw _iteratorError4;

            case 98:
              return _context3.finish(95);

            case 99:
              return _context3.finish(92);

            case 100:
            case 'end':
              return _context3.stop();
          }
        }
      }, walkRespondents, this, [[9, 21, 25, 33], [26,, 28, 32], [38, 88, 92, 100], [48, 66, 70, 78], [71,, 73, 77], [93,, 95, 99]]);
    })
  }, {
    key: 'walk',
    value: /*#__PURE__*/regeneratorRuntime.mark(function walk(context) {
      var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, ansCtx;

      return regeneratorRuntime.wrap(function walk$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _iteratorNormalCompletion6 = true;
              _didIteratorError6 = false;
              _iteratorError6 = undefined;
              _context4.prev = 3;
              _iterator6 = this.walkAnswers(context)[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                _context4.next = 15;
                break;
              }

              ansCtx = _step6.value;

              ansCtx.type = 'answer';
              _context4.next = 10;
              return [ansCtx, context];

            case 10:
              if (!ansCtx.question) ansCtx.question = context.question;
              return _context4.delegateYield(this.walkAnswer(ansCtx), 't0', 12);

            case 12:
              _iteratorNormalCompletion6 = true;
              _context4.next = 5;
              break;

            case 15:
              _context4.next = 21;
              break;

            case 17:
              _context4.prev = 17;
              _context4.t1 = _context4['catch'](3);
              _didIteratorError6 = true;
              _iteratorError6 = _context4.t1;

            case 21:
              _context4.prev = 21;
              _context4.prev = 22;

              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }

            case 24:
              _context4.prev = 24;

              if (!_didIteratorError6) {
                _context4.next = 27;
                break;
              }

              throw _iteratorError6;

            case 27:
              return _context4.finish(24);

            case 28:
              return _context4.finish(21);

            case 29:
            case 'end':
              return _context4.stop();
          }
        }
      }, walk, this, [[3, 17, 21, 29], [22,, 24, 28]]);
    })
  }, {
    key: 'walkAnswer',
    value: /*#__PURE__*/regeneratorRuntime.mark(function walkAnswer(ansCtx) {
      var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, child;

      return regeneratorRuntime.wrap(function walkAnswer$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _iteratorNormalCompletion7 = true;
              _didIteratorError7 = false;
              _iteratorError7 = undefined;
              _context5.prev = 3;
              _iterator7 = this.walkChildren(ansCtx)[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                _context5.next = 14;
                break;
              }

              child = _step7.value;

              child.type = 'child';
              _context5.next = 10;
              return [child, ansCtx];

            case 10:
              return _context5.delegateYield(child.answeredQuestion.walk(child), 't0', 11);

            case 11:
              _iteratorNormalCompletion7 = true;
              _context5.next = 5;
              break;

            case 14:
              _context5.next = 20;
              break;

            case 16:
              _context5.prev = 16;
              _context5.t1 = _context5['catch'](3);
              _didIteratorError7 = true;
              _iteratorError7 = _context5.t1;

            case 20:
              _context5.prev = 20;
              _context5.prev = 21;

              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }

            case 23:
              _context5.prev = 23;

              if (!_didIteratorError7) {
                _context5.next = 26;
                break;
              }

              throw _iteratorError7;

            case 26:
              return _context5.finish(23);

            case 27:
              return _context5.finish(20);

            case 28:
            case 'end':
              return _context5.stop();
          }
        }
      }, walkAnswer, this, [[3, 16, 20, 28], [21,, 23, 27]]);
    })
  }, {
    key: '_checkIgnore',
    value: function _checkIgnore(question, ignores) {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = ignores[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var ign = _step8.value;

          if (question.isParent(ign)) return true;
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return false;
    }
  }]);

  return _class;
}(_Mixin3.default);

exports.default = _class;

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _Survey = __webpack_require__(12);

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
/* 26 */
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
/* 27 */
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
/* 86 */,
/* 87 */,
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
module.exports = __webpack_require__(27);


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(90);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

var _co = __webpack_require__(20);

var _co2 = _interopRequireDefault(_co);

var _childProcess = __webpack_require__(15);

var _Mixin = __webpack_require__(2);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _SurveyExport = __webpack_require__(25);

var _SurveyExport2 = _interopRequireDefault(_SurveyExport);

var _Cursor = __webpack_require__(26);

var _Cursor2 = _interopRequireDefault(_Cursor);

var _Aggregation = __webpack_require__(91);

var _Aggregation2 = _interopRequireDefault(_Aggregation);

var _AnswerCollector = __webpack_require__(92);

var _AnswerCollector2 = _interopRequireDefault(_AnswerCollector);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _Answer = __webpack_require__(19);

var _Answer2 = _interopRequireDefault(_Answer);

var _Location = __webpack_require__(17);

var _Location2 = _interopRequireDefault(_Location);

var _User = __webpack_require__(9);

var _User2 = _interopRequireDefault(_User);

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
      var _this2 = this;

      this.surveyId = proc.args;
      return this.getSurvey().then(function () {
        if (_this2.survey.answerStats) {
          _this2.surveyProcessed = _this2.survey.answerStats.processed;
        }
        if (!_this2.surveyProcessed) _this2.surveyProcessed = 0;
      }).then(function () {
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
    key: 'collectAnswers',
    value: function collectAnswers() {
      var _this3 = this;

      this.answersCount = 0;
      this.totalStatsCount = 0;
      this.aggregates = {};

      return this.iterateCursor(_Answer2.default.find({
        survey: this.surveyId,
        lastExport: null
      }).limit(5000), 'collectOneAnswer').then(function (answers) {
        return _this3.answers = answers;
      }).then(function () {
        return _this3.saveAggregates();
      }).then(function () {
        return _this3._saveAnswerStats();
      }).then(function () {
        return console.log(JSON.stringify({
          _logHeader: 'stats',
          answers: _this3.answers,
          answersCount: _this3.answersCount,
          totalStatsCount: _this3.totalStatsCount
        }));
      });
    }
  }, {
    key: '_saveAnswerStats',
    value: function _saveAnswerStats() {
      this.survey.answerStats = {
        processed: this.surveyProcessed + this.answersCount
      };
      this.survey.markModified('answerStats');
      return this.survey.save();
    }
  }, {
    key: 'collectOneAnswer',
    value: function collectOneAnswer(answer) {
      var _this4 = this;

      if (!answer.rootQuestion) {
        return { status: 'SKIPPED', reason: 'EMPTY', _id: answer._id };
      }
      if (answer.version === 0) {
        return { status: 'SKIPPED', reason: 'VERSION0', _id: answer._id };
      }

      var survey = this.survey;
      var surveyPP = this.survey.postProcessing || [];
      var statsCount = 0;
      var collector = new _AnswerCollector2.default({
        survey: survey, answer: answer,
        keys: this.collectionKeys
      });

      var promises = [];

      var _loop = function _loop(ctx) {
        ctx.addValue('UPLOAD_TIME', answer.createdAt.getTime(), 'Upload time');
        ctx.addValue('ANSWER_ID', answer._id, 'Answer Id');
        promises.push(_co2.default.call(_this4, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, p, func, ret;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context.prev = 3;
                  _iterator2 = surveyPP[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context.next = 18;
                    break;
                  }

                  p = _step2.value;
                  func = p.class && this['_ppClass' + p.class];
                  ret = void 0;

                  if (!func) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 12;
                  return func(p, ctx) || {};

                case 12:
                  ret = _context.sent;

                case 13:
                  if (!(ret && ret._ignore)) {
                    _context.next = 15;
                    break;
                  }

                  return _context.abrupt('return');

                case 15:
                  _iteratorNormalCompletion2 = true;
                  _context.next = 5;
                  break;

                case 18:
                  _context.next = 24;
                  break;

                case 20:
                  _context.prev = 20;
                  _context.t0 = _context['catch'](3);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context.t0;

                case 24:
                  _context.prev = 24;
                  _context.prev = 25;

                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }

                case 27:
                  _context.prev = 27;

                  if (!_didIteratorError2) {
                    _context.next = 30;
                    break;
                  }

                  throw _iteratorError2;

                case 30:
                  return _context.finish(27);

                case 31:
                  return _context.finish(24);

                case 32:
                  _context.next = 34;
                  return ctx.data;

                case 34:
                  return _context.abrupt('return', this.writeStatsObj(ctx.data).then(function () {
                    return ++statsCount;
                  }));

                case 35:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 20, 24, 32], [25,, 27, 31]]);
        })));
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = collector.collectRespondents()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ctx = _step.value;

          _loop(ctx);
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

      return Promise.all(promises).then(function () {
        answer.set('lastExport', new Date());
        return answer.save();
      }).then(function () {
        _this4.totalStatsCount = _this4.totalStatsCount + statsCount;
        ++_this4.answersCount;
        return { status: 'DONE', statsCount: statsCount, _id: answer._id };
      }).catch(function (e) {
        e = e || { message: 'UNKNOWN' };
        console.error(e.message || e);
        console.error(e.stack);
        return Promise.resolve({ status: 'ERROR', _id: answer._id });
      }).then(function (remarks) {
        if (_this4.answersCount && !(_this4.answersCount % 500)) {
          return _this4._saveAnswerStats().then(function () {
            return remarks;
          });
        }
        return remarks;
      });
    }
  }, {
    key: '_ppClassSurveyor',
    value: function _ppClassSurveyor(_ref, ctx) {
      var _ref$surveyorKey = _ref.surveyorKey,
          surveyorKey = _ref$surveyorKey === undefined ? 'Q_1_1' : _ref$surveyorKey;

      var obj = ctx.data;
      var username = obj[surveyorKey];
      if (!username) return { _ignore: true };
      return _User2.default.findOne({ username: username }).then(function (user) {
        if (!user || !user.payload) return;
        ['DISTRICT', 'BLOCK', 'PANCHAYAT'].forEach(function (loc) {
          ['NAME', 'CODE'].forEach(function (dat) {
            ctx.addValue(loc + '_' + dat, user.payload[loc + '_' + dat], 'Location payload');
          });
        });
      });
    }
  }, {
    key: '_ppClassHabitation',
    value: function _ppClassHabitation(_ref2, ctx) {
      var habitationKey = _ref2.habitationKey;

      if (!habitationKey) return;
      var obj = ctx.data;
      var locSpec = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = 'DISTRICT BLOCK PANCHAYAT'.split(' ')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var loc = _step3.value;

          var key = loc + '_CODE';
          if (!obj[key]) return { _ignore: true };
          locSpec.push(obj[key]);
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

      return _Location2.default.findOne({ type: 'PANCHAYAT', uid: locSpec.join('/') }).then(function (loc) {
        if (!loc || !loc.children || !loc.children.length) return;
        if (!obj[habitationKey]) return;
        var habitation = loc.children.find(function (child) {
          return child.name === obj[habitationKey];
        });
        if (habitation) {
          ctx.addValue('HABITATION_CODE', habitation.code, 'Habitation Code');
        }
      });
    }
  }, {
    key: '_ppClassDummy',
    value: function _ppClassDummy(_ref3, ctx) {
      var select = _ref3.select;

      var obj = ctx.data;
      if (select && !obj[select]) return { _ignore: true };
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Object.keys(obj)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var key = _step4.value;

          if (typeof obj[key] === 'string') {
            if (obj[key].toUpperCase && obj[key].trim().toUpperCase() === 'DUMMY') {
              return { _ignore: true };
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
    }
  }, {
    key: 'writeStatsObj',
    value: function writeStatsObj(obj) {
      var _this5 = this;

      return _Statistic2.default.create({
        key: this.surveyId,
        type: 'SurveyResponse',
        data: obj
      }).then(function (stat) {
        return _this5.accumulateAggregates({ stat: stat, aggregates: _this5.survey.aggregates });
      });
    }
  }]);

  return CollectResponses;
}(_Mixin2.default.mixin(_childProcess.ChildTemplate, _SurveyExport2.default, _Cursor2.default, _Aggregation2.default));

exports.default = CollectResponses;

/***/ }),
/* 91 */
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

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _co = __webpack_require__(20);

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    key: 'saveAggregates',
    value: function saveAggregates() {
      return _co2.default.call(this, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var aKeys, _loop, _ret;

        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.aggregatesStore) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                aKeys = Object.keys(this.aggregatesStore);
                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                  var aKey, agg;
                  return regeneratorRuntime.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          aKey = aKeys.find(function (key) {
                            var deps = _this2.aggregatesStore[key].dependencies;
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                              for (var _iterator = Object.keys(deps)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var dKey = _step.value;

                                var dStat = deps[dKey];
                                if (dStat.isModified()) return false;
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
                          });

                          if (aKey) {
                            _context.next = 4;
                            break;
                          }

                          console.error('Error: circular dependency!');
                          return _context.abrupt('return', {
                            v: void 0
                          });

                        case 4:
                          agg = _this2.aggregatesStore[aKey];

                          if (!agg.isModified()) {
                            console.error('Unmodified stat: [' + agg.type + '] ' + agg.key);
                          }
                          _context.next = 8;
                          return agg.save().catch(function (err) {
                            return console.error(agg.key, err);
                          });

                        case 8:

                          console.log(JSON.stringify({
                            _logHeader: 'aggregate',
                            type: agg.type,
                            key: agg.key,
                            metadata: agg.metadata,
                            data: agg.data
                          }));

                          if (!agg.aggregates) {
                            _context.next = 12;
                            break;
                          }

                          _context.next = 12;
                          return Promise.resolve(_this2.accumulateAggregates({
                            stat: agg,
                            aggregates: agg.aggregates
                          }));

                        case 12:
                          delete _this2.aggregatesStore[aKey];
                          aKeys = Object.keys(_this2.aggregatesStore);

                        case 14:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this2);
                });

              case 4:
                if (!aKeys.length) {
                  _context2.next = 11;
                  break;
                }

                return _context2.delegateYield(_loop(), 't0', 6);

              case 6:
                _ret = _context2.t0;

                if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', _ret.v);

              case 9:
                _context2.next = 4;
                break;

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: 'accumulateAggregates',
    value: function accumulateAggregates(context) {
      var _this3 = this;

      var stat = context.stat;

      if (!stat.data && !stat.metadata) return;

      var promises = [];

      var _loop2 = function _loop2(ctx) {
        Object.setPrototypeOf(ctx, context);
        promises.push(_this3.findAggregate(ctx).then(function (tgStat) {
          return stat.isNew || tgStat.accumulate(ctx);
        }));
      };

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = stat.walkAggregates(context)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var ctx = _step2.value;

          _loop2(ctx);
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

      return Promise.all(promises);
    }
  }, {
    key: 'findAggregate',
    value: function findAggregate(context) {
      var _this4 = this;

      var aggregateKey = context.aggregateKey,
          stat = context.stat;

      if (!aggregateKey) throw new Error('Aggregate Key needed.');
      this.aggregatesStore = this.aggregatesStore || {};

      var type = aggregateKey.type,
          key = aggregateKey.key;

      if (!type || !key) throw new Error('type, key needed in AggregateKey.');

      var cacheKeyFunction = function cacheKeyFunction(stat) {
        return '[' + stat.type + '] ' + stat.key;
      };
      var cacheKey = cacheKeyFunction(aggregateKey);
      if (this.aggregatesStore[cacheKey]) {
        var a = this.aggregatesStore[cacheKey];
        var promise = void 0;
        if (a.then) {
          promise = a.then(function (st) {
            st.dependencies[cacheKeyFunction(stat)] = stat;
            return st;
          });
        } else {
          a.dependencies[cacheKeyFunction(stat)] = stat;
          promise = Promise.resolve(a);
        }
        return promise;
      }
      return this.aggregatesStore[cacheKey] = _Statistic2.default.findOne({ type: type, key: key }).then(function (stat) {
        if (!stat) {
          stat = new _Statistic2.default();
          stat.set({ type: type, key: key });
          stat.initialize(context);
        }
        stat.aggregates = context.aggregate.aggregates;
        stat.modifiedAt = Date.now();
        stat.dependencies = _defineProperty({}, cacheKeyFunction(context.stat), context.stat);

        // (console.log(`Decumulating stat: [${stat.type}] ${stat.key}`));
        // if (stat.metadata) {
        //   (console.log('Metadata: ', YAML.safeDump(stat.metadata)));
        // }
        // if (stat.data) (console.log('Data: ', YAML.safeDump(stat.data)));

        return Promise.resolve(_this4.accumulateAggregates({
          stat: stat,
          aggregates: context.aggregate.aggregates,
          invert: 1
        })).then(function () {
          _this4.aggregatesStore[cacheKey] = stat;
          return stat;
        });
      }).catch(function (err) {
        console.error(cacheKey, err);
      });
    }
  }]);

  return _class;
}(_Mixin3.default);

exports.default = _class;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(opts) {
    _classCallCheck(this, _class);

    Object.assign(this, opts);
    this.data = this.data || {};

    this.suffix = this.suffix || '';
    this.prefix = this.prefix || 'Q';
  }

  _createClass(_class, [{
    key: 'collect',
    value: function collect() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.answeredQuestion.walkAnswer(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var arg = _step.value;

          this._iterProc(arg);
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
    }
  }, {
    key: 'collectRespondents',
    value: /*#__PURE__*/regeneratorRuntime.mark(function collectRespondents() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, respondent, c, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _ref, _ref2, ctx, prev;

      return regeneratorRuntime.wrap(function collectRespondents$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.survey) {
                _context.next = 2;
                break;
              }

              throw new Error('Survey needed');

            case 2:
              if (this.answer) {
                _context.next = 4;
                break;
              }

              throw new Error('Answer needed');

            case 4:

              this.question = this.survey.question;
              this.answeredQuestion = this.answer.rootQuestion;

              this.respondents = this.survey.respondents;
              if (!this.respondents || !this.respondents.length) {
                this.respondents = [null];
              }

              this.ignores = this.respondents;

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 12;
              _iterator2 = this.respondents[Symbol.iterator]();

            case 14:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 53;
                break;
              }

              respondent = _step2.value;
              c = Object.setPrototypeOf({ respondent: respondent }, this);
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 20;
              _iterator3 = this.answeredQuestion.walkRespondents(c)[Symbol.iterator]();

            case 22:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context.next = 36;
                break;
              }

              _ref = _step3.value;
              _ref2 = _slicedToArray(_ref, 2);
              ctx = _ref2[0];
              prev = _ref2[1];

              this._iterProc([ctx, prev]);

              if (!(ctx.type === 'respondent')) {
                _context.next = 33;
                break;
              }

              if (ctx.answer.startTimestamp && ctx.answer.endTimestamp) {
                ctx.addValue('START_TIME', ctx.answer.startTimestamp.getTime(), 'Start');
                ctx.addValue('END_TIME', ctx.answer.endTimestamp.getTime(), 'End');
              }
              ctx.collect();
              _context.next = 33;
              return ctx;

            case 33:
              _iteratorNormalCompletion3 = true;
              _context.next = 22;
              break;

            case 36:
              _context.next = 42;
              break;

            case 38:
              _context.prev = 38;
              _context.t0 = _context['catch'](20);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t0;

            case 42:
              _context.prev = 42;
              _context.prev = 43;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 45:
              _context.prev = 45;

              if (!_didIteratorError3) {
                _context.next = 48;
                break;
              }

              throw _iteratorError3;

            case 48:
              return _context.finish(45);

            case 49:
              return _context.finish(42);

            case 50:
              _iteratorNormalCompletion2 = true;
              _context.next = 14;
              break;

            case 53:
              _context.next = 59;
              break;

            case 55:
              _context.prev = 55;
              _context.t1 = _context['catch'](12);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 59:
              _context.prev = 59;
              _context.prev = 60;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 62:
              _context.prev = 62;

              if (!_didIteratorError2) {
                _context.next = 65;
                break;
              }

              throw _iteratorError2;

            case 65:
              return _context.finish(62);

            case 66:
              return _context.finish(59);

            case 67:
            case 'end':
              return _context.stop();
          }
        }
      }, collectRespondents, this, [[12, 55, 59, 67], [20, 38, 42, 50], [43,, 45, 49], [60,, 62, 66]]);
    })
  }, {
    key: '_iterProc',
    value: function _iterProc(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          ctx = _ref4[0],
          prev = _ref4[1];

      if (prev) Object.setPrototypeOf(ctx, prev);

      if (ctx.type === 'answer') {
        ctx._processAnswer();
      } else if (ctx.type === 'respondentAnswer') {
        ctx.answerIdx = null;
        ctx._cloneStore();
        ctx._processAnswer();
      } else if (ctx.type === 'child') {
        ctx._processChild();
      } else if (ctx.type === 'respondentChild') {
        ctx._processChild();
      }
    }
  }, {
    key: '_cloneStore',
    value: function _cloneStore() {
      this.data = Object.assign({}, this.data);
    }
  }, {
    key: '_processChild',
    value: function _processChild() {
      var num = this.position.replace('.', '_');
      this.prefix = this.prefix + '_' + num;
    }
  }, {
    key: '_processAnswer',
    value: function _processAnswer() {
      var qFlow = this.question.flow;
      if (this.type !== 'respondentAnswer' && qFlow && qFlow.answer.scope === 'multiple') {
        this.suffix = this.suffix + '_ans' + (this.answerIdx + 1);
      }
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.question.values(this.answer)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _ref5 = _step4.value;
          var key = _ref5.key;
          var value = _ref5.value;

          var objKey = '' + this.prefix + this.suffix + key;
          this.addValue(objKey, value);
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
  }, {
    key: 'addValue',
    value: function addValue(key, value, description) {
      if (!this.keys['pos' + key]) {
        this.keys.push(key);
        this.keys['pos' + key] = description || (this.question.number || 'N') + '. ' + ('' + (this.question.text.english || 'TEXT'));
      }
      this.data[key] = value;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);