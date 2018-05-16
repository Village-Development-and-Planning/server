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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
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

var _Aggregates = __webpack_require__(12);

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
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseController = __webpack_require__(53);

var _BaseController2 = _interopRequireDefault(_BaseController);

var _Mixin = __webpack_require__(2);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _Listing = __webpack_require__(54);

var _Listing2 = _interopRequireDefault(_Listing);

var _Get = __webpack_require__(55);

var _Get2 = _interopRequireDefault(_Get);

var _Delete = __webpack_require__(56);

var _Delete2 = _interopRequireDefault(_Delete);

var _Body = __webpack_require__(57);

var _Body2 = _interopRequireDefault(_Body);

var _Create = __webpack_require__(60);

var _Create2 = _interopRequireDefault(_Create);

var _Update = __webpack_require__(61);

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
          return Promise.all(obj.map(function (o) {
            return _this2._parseEntity(o);
          }));
        } else {
          return _this2._parseEntity(obj);
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
/* 8 */
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
    exitSignal: { type: String },
    stdout: { type: String },
    stderr: { type: String },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date }
});
processSchema.index({ status: 1, name: 1 });
processSchema.index({ name: 1 });

module.exports = mongoose.model('Process', processSchema);

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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _hotFormulaParser = __webpack_require__(13);

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
      var metadata = this.metadata || {};

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
      this.markModified('metadata');
    }
  }, {
    key: 'accumulate',
    value: function accumulate(_ref2) {
      var stat = _ref2.stat,
          aggregate = _ref2.aggregate,
          invert = _ref2.invert;

      if (!aggregate.data) return;

      var parser = stat.parser();
      var data = this.data || {};

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
          _count = val.count || 0;
          _value = val.value || {};
        } else {
          _value = _defineProperty({}, val, 1);
          _count = 1;
        }
        if ((typeof _value === 'undefined' ? 'undefined' : _typeof(_value)) !== 'object') {
          _value = _defineProperty({}, _value, 1);
          _count = 1;
        }
        if (!_count) _count = 1;
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
                _context.next = 26;
                break;
              }

              agg = _step4.value;
              type = void 0, key = void 0;

              if (!(agg.preSelect && !parser.value(agg.preSelect))) {
                _context.next = 17;
                break;
              }

              return _context.abrupt('continue', 23);

            case 17:
              if (!(!agg.key || !(key = parser.value(agg.key)))) {
                _context.next = 19;
                break;
              }

              return _context.abrupt('continue', 23);

            case 19:
              if (agg.type) {
                type = parser.value(agg.type);
              }
              if (!type) type === 'Aggregate';
              _context.next = 23;
              return { aggregate: agg, aggregateKey: { key: key, type: type } };

            case 23:
              _iteratorNormalCompletion4 = true;
              _context.next = 12;
              break;

            case 26:
              _context.next = 32;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context['catch'](10);
              _didIteratorError4 = true;
              _iteratorError4 = _context.t0;

            case 32:
              _context.prev = 32;
              _context.prev = 33;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 35:
              _context.prev = 35;

              if (!_didIteratorError4) {
                _context.next = 38;
                break;
              }

              throw _iteratorError4;

            case 38:
              return _context.finish(35);

            case 39:
              return _context.finish(32);

            case 40:
            case 'end':
              return _context.stop();
          }
        }
      }, walkAggregates, this, [[10, 28, 32, 40], [33,, 35, 39]]);
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
        if (!data) return;
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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("hot-formula-parser");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(3);

var _Question = __webpack_require__(15);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

__webpack_require__(3);

var Schema = __webpack_require__(1);
var Text = __webpack_require__(16);
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
/* 16 */
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
/* 17 */
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

var _child_process = __webpack_require__(18);

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
/* 18 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 20 */
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
    endTimestamp: { type: Date }
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
              if (!(!respondent && question.type === 'ROOT' || !respondent && !question.number || question.number === respondent)) {
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
/* 23 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(77),
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
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dispatcher;

var _render = __webpack_require__(52);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Answer = __webpack_require__(20);

var _Answer2 = _interopRequireDefault(_Answer);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _fs = __webpack_require__(23);

var _fs2 = _interopRequireDefault(_fs);

var _co = __webpack_require__(6);

var _co2 = _interopRequireDefault(_co);

var _EntitiyController = __webpack_require__(7);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Survey = __webpack_require__(14);

var SurveyCSVParser = __webpack_require__(62);

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
      var _this2 = this;

      var _id = this.req.params.id;
      this.renderer.renderPromise(_Statistic2.default.deleteMany({ key: new RegExp('^' + _id) }).then(function () {
        return _Answer2.default.update({ survey: _id, lastExport: { $ne: null } }, { lastExport: null }, { multi: true });
      }).then(function () {
        return _this2._findOneAndUpdate(_this2._getQuery(), { answerStats: { processed: 0 } });
      }));
    }
  }, {
    key: 'answers',
    value: function answers() {
      var resp = this.req.query.resp || null;
      var _id = this.req.params.id;
      var key = _id + '/' + resp;
      this.renderer.renderPromise(_Statistic2.default.findOne({ type: 'SurveyResponseHeader', key: key }).then(function (header) {
        return header && header.data || { keys: [] };
      }).then(function (_ref) {
        var keys = _ref.keys;

        return _Statistic2.default.find({
          type: 'SurveyResponse', key: key
        }).limit(50).then(function (stats) {
          return stats.reduce(function (acc, stat) {
            var data = stat.data;
            if (data) {
              acc.push(keys.map(function (_ref2) {
                var key = _ref2.key;
                return data[key];
              }));
            }
            return acc;
          }, [keys.map(function (_ref3) {
            var key = _ref3.key;
            return key;
          }), keys.map(function (_ref4) {
            var description = _ref4.description;
            return description;
          })]);
        });
      }));
    }
  }, {
    key: 'download',
    value: function download() {
      var _this3 = this;

      var resp = this.req.query.resp || null;
      return Promise.resolve(this._getQuery()).then(function (q) {
        return q && _this3._findOne(q);
      }).then(function (e) {
        return e || Promise.reject(new Error('Entity not found.'));
      }).catch(function (err) {
        return _this3.renderer.renderPromise(Promise.reject(err));
      }).then(function (survey) {
        var _id = survey._id;
        var path = 'data/export-responses/' + _id + '-' + resp + '.csv';
        if (_fs2.default.existsSync(path)) {
          var res = _this3.renderer.res;
          res.attachment((survey.name || _id) + '.csv');
          var csvOutput = _fs2.default.createReadStream(path);
          csvOutput.on('end', function () {
            return res.end();
          });
          csvOutput.pipe(res);
        } else {
          _this3.renderer.renderPromise(Promise.reject(new Error('Export file not found.')));
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
      var _this4 = this;

      var promise = _get(SurveyController.prototype.__proto__ || Object.getPrototypeOf(SurveyController.prototype), '_findOne', this).call(this, query);
      if (this.req.query.light) {
        promise = promise.select('-question');
      }
      return promise.then(function (mSurvey) {
        return _co2.default.call(_this4, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var survey, total, respondents;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (mSurvey) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return');

                case 2:
                  survey = mSurvey.toObject();
                  _context.next = 5;
                  return _Answer2.default.count({
                    survey: survey._id
                  });

                case 5:
                  total = _context.sent;
                  respondents = mSurvey.getRespondents();

                  survey.answerStats = survey.answerStats || {};
                  Object.assign(survey.answerStats, { total: total });
                  Object.assign(survey, { respondents: respondents });
                  return _context.abrupt('return', survey);

                case 11:
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
      if (typeof obj.enabled !== 'undefined') obj.enabled = !!obj.enabled;
      if (typeof obj.respondents === 'string') {
        if (!obj.respondents || obj.respondents == 'none') {
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

      var filter = 'name description respondents enabled question aggregates' + ' postProcessing';
      if (this.action === 'create') {
        filter = filter + ' _id';
      }
      return this._filterObject(obj, filter);
    }
  }, {
    key: '_parseFileField',
    value: function _parseFileField(_ref5) {
      var mime = _ref5.mime,
          field = _ref5.field,
          file = _ref5.file,
          fields = _ref5.fields;

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
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Answer = __webpack_require__(20);

var _Answer2 = _interopRequireDefault(_Answer);

var _EntitiyController = __webpack_require__(7);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _streamToArray = __webpack_require__(34);

var _streamToArray2 = _interopRequireDefault(_streamToArray);

var _crypto = __webpack_require__(78);

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
/* 34 */
/***/ (function(module, exports) {

module.exports = require("stream-to-array");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EntitiyController = __webpack_require__(7);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _surveyorCsvParser = __webpack_require__(85);

var _surveyorCsvParser2 = _interopRequireDefault(_surveyorCsvParser);

var _User = __webpack_require__(11);

var _User2 = _interopRequireDefault(_User);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _Location = __webpack_require__(9);

var _Location2 = _interopRequireDefault(_Location);

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
    key: '_addLocationPayload',
    value: function _addLocationPayload(obj, loc) {
      if (!loc.payload) return obj;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(loc.payload || {})[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          obj['payload.' + key] = loc.payload[key];
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

      obj['payload.HABITATION_NAME'] = loc.children.map(function (c) {
        return c.name;
      });
      return obj;
    }
  }, {
    key: '_parseEntity',
    value: function _parseEntity(obj) {
      var _this2 = this;

      var filter = 'username name roles payload surveyor-csv _done';
      var payload = {};
      var promise = false;
      if (obj.panchayat) {
        promise = _Location2.default.findOne({ type: 'PANCHAYAT', uid: obj.panchayat }).then(function (loc) {
          return loc && _this2._addLocationPayload(payload, loc);
        });
      }
      if (obj.survey) {
        payload['payload.SURVEY'] = obj.survey;
      }
      payload['payload.SURVEYOR_CODE'] = obj.username;
      payload['payload.SURVEYOR_NAME'] = obj.name;
      return promise ? promise.then(function () {
        return Object.assign(payload, _this2._filterObject(obj, filter));
      }) : Object.assign(payload, this._filterObject(obj, filter));
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
      if (!query) {
        var _id = this.req.params.id;
        if (_id) query = { username: _id };
      }
      return query && Object.assign(query, this._indexQuery());
    }
  }, {
    key: '_findOne',
    value: function _findOne(query) {
      return _get(SurveyorController.prototype.__proto__ || Object.getPrototypeOf(SurveyorController.prototype), '_findOne', this).call(this, query).then(function (surveyor) {
        if (surveyor) {
          return _Statistic2.default.find({
            type: /^SurveyorAggregate/,
            key: new RegExp('^' + surveyor.username)
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

  _findFields: '_id name username payload roles modifiedAt',
  _createFields: '_id name username roles modifiedAt'
});
module.exports = SurveyorController;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(37);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(10);

var express = __webpack_require__(19);
var http = __webpack_require__(38);


// Create the server and load the components.
var app = express();

// 1 Setup Database


// 2.1 Setup cookies
__webpack_require__(39)(app);

// 2.2. Add security to all end points.
__webpack_require__(41)(app);

// 2.3. Setup body-parser.
__webpack_require__(48)(app);

// 10. Setup the routes:
__webpack_require__(50)(app);

// 99. Setup error-handling
__webpack_require__(87)(app);

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
/* 38 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cookieParser = __webpack_require__(40);
module.exports = function (app) {
  return app.use(cookieParser());
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(19);

var _express2 = _interopRequireDefault(_express);

var _authentication = __webpack_require__(42);

var _roles = __webpack_require__(46);

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var jwt = __webpack_require__(47);
var constants = __webpack_require__(5);

var secRouter = new _express2.default.Router();

var jwtOpts = Object.assign({
  getToken: function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      req.skipCSRF = true;
      return req.headers.authorization.slice(6).trim();
    } else if (req.cookies && req.cookies.ptracking_jwt) {
      req.skipCSRF = false;
      return req.cookies.ptracking_jwt;
    } else {
      return null;
    }
  }
}, constants.jwt);

secRouter.use.apply(secRouter, [jwt(jwtOpts), function (req, res, next) {
  return req.user ? next('router') : next({ name: 'UnauthorizedError' });
}, function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    next();
  } else {
    next(err);
  }
}].concat(_toConsumableArray(_authentication.signIn)));

module.exports = function (app) {
  app.use(secRouter);
  app.use(_roles2.default);
  app.get('/auth', function (req, res, next) {
    res.json(req.user);
  });
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = undefined;

var _User = __webpack_require__(11);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = __webpack_require__(43);
var Digest = __webpack_require__(44).DigestStrategy;
var jwt = __webpack_require__(45);
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

var setCookie = function setCookie(req, res, next) {
  var cookie = jwt.sign(req.user, Constants.jwt.secret);
  res.cookie('ptracking_jwt', cookie);
  next();
};

var signIn = [passportMiddleware, setCookie];
exports.signIn = signIn;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("passport-http");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rolesMiddleware;
var Constants = __webpack_require__(5);

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

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodyParser = __webpack_require__(49);

module.exports = function (app) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json({ limit: '10mb' }));
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {
  app.use('/cms', __webpack_require__(51));
  app.use('/app', __webpack_require__(86));

  // redirect the home to /cms
  app.get('/', function (req, res) {
    res.redirect('/cms');
  });
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dispatcher = __webpack_require__(28);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(19);


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
registerCmsRoutes(cmsRouter, __webpack_require__(29), function (app, ctrl) {
  app.get('/:id/download', (0, _dispatcher2.default)(ctrl, 'download'));
  app.get('/:id/answers', (0, _dispatcher2.default)(ctrl, 'answers'));
  app.post('/:id/reset', (0, _dispatcher2.default)(ctrl, 'reset'));
});
registerCmsRoutes(cmsRouter, __webpack_require__(33));
registerCmsRoutes(cmsRouter, __webpack_require__(79));
registerCmsRoutes(cmsRouter, __webpack_require__(81));
registerCmsRoutes(cmsRouter, __webpack_require__(83));
registerCmsRoutes(cmsRouter, __webpack_require__(35));
module.exports = cmsRouter;

/***/ }),
/* 52 */
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
/* 53 */
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
/* 54 */
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
/* 55 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin2 = __webpack_require__(2);

var _Mixin3 = _interopRequireDefault(_Mixin2);

var _multipartHandler = __webpack_require__(58);

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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _busboy = __webpack_require__(59);

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
/* 59 */
/***/ (function(module, exports) {

module.exports = require("busboy");

/***/ }),
/* 60 */
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
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tags = __webpack_require__(63);

var _tags2 = _interopRequireDefault(_tags);

var _options = __webpack_require__(74);

var _options2 = _interopRequireDefault(_options);

var _treeCsvParser = __webpack_require__(76);

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
          flow: __webpack_require__(30)('NONE', null)
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _questionDefault = __webpack_require__(30);

var _questionDefault2 = _interopRequireDefault(_questionDefault);

var _promiseProcess = __webpack_require__(31);

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

var tagModules = [].concat([__webpack_require__(64), __webpack_require__(65), __webpack_require__(66), __webpack_require__(67), __webpack_require__(68), __webpack_require__(69), __webpack_require__(70), __webpack_require__(71), __webpack_require__(72), __webpack_require__(73)]);

/***/ }),
/* 64 */
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
/* 65 */
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'UI_BACK_DISABLED',
  adorn: function adorn(tag, obj) {
    obj.question.back = false;
  }
};

/***/ }),
/* 70 */
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'IMAGES',
  adorn: function adorn(tag, obj) {
    obj.question.showImage = true;
  }
};

/***/ }),
/* 72 */
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'SHOWN_TOGETHER',
  adorn: function adorn(tag, obj) {
    obj.child.strategy = 'together';
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promiseProcess = __webpack_require__(31);

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

var optModules = [].concat([__webpack_require__(75)]);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Artifact = __webpack_require__(32);

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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVParser = __webpack_require__(24);

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
/* 77 */
/***/ (function(module, exports) {

module.exports = require("csv-parse");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EntitiyController = __webpack_require__(7);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _streamToArray = __webpack_require__(34);

var _streamToArray2 = _interopRequireDefault(_streamToArray);

var _fileType = __webpack_require__(80);

var _fileType2 = _interopRequireDefault(_fileType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Artifact = __webpack_require__(32);

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
  }, {
    key: '_indexQuery',
    value: function _indexQuery() {
      var query = _get(ArtifactController.prototype.__proto__ || Object.getPrototypeOf(ArtifactController.prototype), '_indexQuery', this).call(this);
      var type = this.req.query.type;

      if (type) query.type = type;
      return query;
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
/* 80 */
/***/ (function(module, exports) {

module.exports = require("file-type");

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntitiyController = __webpack_require__(7);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _procs = __webpack_require__(82);

var _procs2 = _interopRequireDefault(_procs);

var _Process = __webpack_require__(8);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportResponses = exports.CollectResponses = undefined;

var _childProcess = __webpack_require__(17);

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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Location = __webpack_require__(9);

var _Location2 = _interopRequireDefault(_Location);

var _EntitiyController = __webpack_require__(7);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _locationCsvParser = __webpack_require__(84);

var _locationCsvParser2 = _interopRequireDefault(_locationCsvParser);

var _Statistic = __webpack_require__(4);

var _Statistic2 = _interopRequireDefault(_Statistic);

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
    key: '_indexQuery',
    value: function _indexQuery() {
      var query = _get(LocationController.prototype.__proto__ || Object.getPrototypeOf(LocationController.prototype), '_indexQuery', this).call(this);
      var type = this.req.query.type;

      if (type) query.type = type;
      return query;
    }
  }, {
    key: '_getQuery',
    value: function _getQuery() {
      var query = _get(LocationController.prototype.__proto__ || Object.getPrototypeOf(LocationController.prototype), '_getQuery', this).call(this);
      if (!query) {
        var _id = this.req.params.id;
        if (_id) query = { uid: _id.replace(/_/g, '/') };
      }
      return query;
    }
  }, {
    key: '_findOne',
    value: function _findOne(query) {
      return _get(LocationController.prototype.__proto__ || Object.getPrototypeOf(LocationController.prototype), '_findOne', this).call(this, query).then(function (loc) {
        if (loc) {
          var prefix = ['LocationAggregate', loc.type].join('/');
          return _Statistic2.default.find({
            type: new RegExp('^' + prefix),
            key: new RegExp('^' + loc.uid)
          }).then(function (stats) {
            loc.set('aggregates', stats, { strict: false });
            return loc;
          });
        }
        return loc;
      });
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _csvParser = __webpack_require__(24);

var _csvParser2 = _interopRequireDefault(_csvParser);

var _Location = __webpack_require__(9);

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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _csvParser = __webpack_require__(24);

var _csvParser2 = _interopRequireDefault(_csvParser);

var _User = __webpack_require__(11);

var _User2 = _interopRequireDefault(_User);

var _Location = __webpack_require__(9);

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
          return _User2.default.findOneAndUpdate({ username: row['SURVEYOR_CODE'] }, {
            name: row.SURVEYOR_NAME,
            roles: ['SURVEYOR'],
            payload: userPayload
          }, { new: true, upsert: true });
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dispatcher = __webpack_require__(28);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _SurveyorController = __webpack_require__(35);

var _SurveyorController2 = _interopRequireDefault(_SurveyorController);

var _AnswerController = __webpack_require__(33);

var _AnswerController2 = _interopRequireDefault(_AnswerController);

var _SurveyController = __webpack_require__(29);

var _SurveyController2 = _interopRequireDefault(_SurveyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(19);
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
/* 87 */
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