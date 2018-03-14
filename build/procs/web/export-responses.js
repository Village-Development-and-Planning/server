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
/******/ 	return __webpack_require__(__webpack_require__.s = 93);
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

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _hotFormulaParser = __webpack_require__(12);

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

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("hot-formula-parser");

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(3);

var _Question = __webpack_require__(14);

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

surveySchema.methods = {
  getRespondents: function getRespondents() {
    if (!this.respondents || !this.respondents.length) {
      this.respondents = [null];
    }
    return this.respondents.map(function (resp) {
      if (!resp) return { number: null };
      if ((typeof resp === 'undefined' ? 'undefined' : _typeof(resp)) !== 'object') {
        return { number: String(resp) };
      }
      if (!resp.number) resp.number = null;
      return resp;
    });
  }
};

module.exports = mongoose.model('Survey', surveySchema);

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

__webpack_require__(3);

var Schema = __webpack_require__(1);
var Text = __webpack_require__(15);
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

/***/ 15:
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

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildTemplate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Process = __webpack_require__(8);

var _Process2 = _interopRequireDefault(_Process);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

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

/***/ 17:
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

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 25:
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
        _this2.respondents = _this2.survey.getRespondents();
      });
    }
  }, {
    key: 'getExportHeader',
    value: function getExportHeader() {
      var _this3 = this;

      this.answerKeys = {};
      return Promise.all(this.respondents.map(function (_ref) {
        var number = _ref.number,
            opts = _ref.opts;

        _this3.answerKeys[String(number)] = {
          keys: [],
          keysHash: {}
        };
        return _Statistic2.default.findOne({
          key: _this3.surveyId + '/' + number,
          type: 'SurveyResponseHeader'
        }).then(function (stat) {
          if (!stat || !stat.data || !stat.data.keys) return;
          var keys = stat.data.keys;
          var keysHash = keys.reduce(function (acc, el) {
            return acc[el.key] = 1, acc;
          }, {});
          _this3.answerKeys[String(number)] = { keys: keys, keysHash: keysHash };
        });
      }));
    }
  }, {
    key: 'updateExportHeader',
    value: function updateExportHeader() {
      var _this4 = this;

      return Promise.all(Object.keys(this.answerKeys).map(function (key) {
        var keys = _this4.answerKeys[key].keys;

        return _Statistic2.default.findOneAndUpdate({
          key: _this4.surveyId + '/' + key,
          type: 'SurveyResponseHeader'
        }, {
          data: { keys: _this4.sortKeys(keys) }
        }, { upsert: 1, new: 1 });
      }));
    }
  }, {
    key: 'sortKeys',
    value: function sortKeys(keys) {
      return keys.sort(this._keyListComparator.bind(this));
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

/***/ 26:
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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

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

var _Aggregates = __webpack_require__(11);

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
schema.index({ type: 1 });
_Aggregates2.default.copyTo(schema.methods);

module.exports = _mongoose2.default.model('Statistic', schema);

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  db: {
    connectionOptions: {
      poolSize: 2,
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
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),

/***/ 8:
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

/***/ 9:
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

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
module.exports = __webpack_require__(27);


/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(95);

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _childProcess = __webpack_require__(16);

var _Mixin = __webpack_require__(2);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _SurveyExport = __webpack_require__(25);

var _SurveyExport2 = _interopRequireDefault(_SurveyExport);

var _Cursor = __webpack_require__(26);

var _Cursor2 = _interopRequireDefault(_Cursor);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _csvStringify = __webpack_require__(96);

var _csvStringify2 = _interopRequireDefault(_csvStringify);

var _fs = __webpack_require__(23);

var _fs2 = _interopRequireDefault(_fs);

var _co = __webpack_require__(6);

var _co2 = _interopRequireDefault(_co);

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
      return _co2.default.call(this, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref, number;

        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(_number) {
                  var writer, keys;
                  return regeneratorRuntime.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!_number) _number = null;
                          writer = _this3._createCsvWriter(_this3.surveyId, _number);
                          keys = _this3.answerKeys[_number].keys;

                          writer.write(keys.map(function (_ref2) {
                            var key = _ref2.key;
                            return key;
                          }));
                          writer.write(keys.map(function (_ref3) {
                            var description = _ref3.description;
                            return description;
                          }));
                          _this3.writer = writer;
                          _this3.rowCount = 0;
                          _this3.keys = keys;
                          _context.next = 10;
                          return _this3.iterateCursor(_Statistic2.default.find({
                            type: 'SurveyResponse',
                            key: _this3.surveyId + '/' + _number
                          }), 'collectOneStatistic').then(function (out) {
                            console.log(JSON.stringify({
                              _logHeader: 'stats',
                              respondent: _number,
                              processed: out,
                              numRows: _this3.rowCount
                            }, null, 2));
                          });

                        case 10:
                          number = _number;

                        case 11:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this3);
                });
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _iterator = this.respondents[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 13;
                  break;
                }

                _ref = _step.value;
                number = _ref.number;
                return _context2.delegateYield(_loop(number), 't0', 10);

              case 10:
                _iteratorNormalCompletion = true;
                _context2.next = 6;
                break;

              case 13:
                _context2.next = 19;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t1 = _context2['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 19:
                _context2.prev = 19;
                _context2.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 22:
                _context2.prev = 22;

                if (!_didIteratorError) {
                  _context2.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context2.finish(22);

              case 26:
                return _context2.finish(19);

              case 27:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this, [[4, 15, 19, 27], [20,, 22, 26]]);
      }));
    }
  }, {
    key: 'collectOneStatistic',
    value: function collectOneStatistic(stat) {
      var _this4 = this;

      return new Promise(function (res, rej) {
        _this4.writer.write(_this4.keys.map(function (_ref4) {
          var key = _ref4.key;
          return stat.data[key];
        }), null, function () {
          ++_this4.rowCount;
          res(stat._id);
        });
      });
    }
  }, {
    key: '_createCsvWriter',
    value: function _createCsvWriter(surveyId, resp) {
      var path = 'data/export-responses/' + surveyId + '-' + resp + '.csv';
      var mode = 'w';
      var fileStream = _fs2.default.createWriteStream(path, { encoding: 'utf8', flags: mode });
      fileStream.on('error', function (err) {
        throw err;
      });

      var csvWriter = new _csvStringify2.default();
      csvWriter.on('error', function (err) {
        throw err;
      });

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

/***/ 96:
/***/ (function(module, exports) {

module.exports = require("csv-stringify");

/***/ })

/******/ });