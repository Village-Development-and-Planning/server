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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = __webpack_require__(1);

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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseController2 = __webpack_require__(5);

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = __webpack_require__(1);

/**
* Controller class for documents exposed via CMS APIs.
* 
* @class EntityController
*/
var EntityController = function (_BaseController) {
  _inherits(EntityController, _BaseController);

  function EntityController() {
    _classCallCheck(this, EntityController);

    return _possibleConstructorReturn(this, (EntityController.__proto__ || Object.getPrototypeOf(EntityController)).apply(this, arguments));
  }

  _createClass(EntityController, [{
    key: 'findFromId',
    value: function findFromId(_ref) {
      var _id = _ref._id;

      return this.constructor.collection.findOne({ _id: _id }).then(function (e) {
        return e || Promise.reject({ status: 404 });
      });
    }
  }, {
    key: 'findAll',
    value: function findAll(query) {
      return this.constructor.collection.find(query);
    }
  }, {
    key: 'updateFromId',
    value: function updateFromId(_ref2) {
      var _id = _ref2._id;

      return Promise.reject({ status: 405 });
    }
  }, {
    key: 'deleteFromId',
    value: function deleteFromId(query) {
      return this.constructor.collection.remove(query);
    }
  }, {
    key: '_validateId',
    value: function _validateId() {
      var _id = this.req.params.id;
      if (_id && mongoose.Types.ObjectId.isValid(_id)) {
        return Promise.resolve({ _id: _id });
      } else {
        return Promise.reject({ status: 400, details: 'Unreadable Id' });
      }
    }
  }, {
    key: 'index',
    value: function index() {
      this.renderer.renderPromise(this.findAll({}));
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this2 = this;

      this.renderer.renderPromise(this._validateId().then(function (_ref3) {
        var _id = _ref3._id;
        return _this2.deleteFromId({ _id: _id });
      }));
    }
  }, {
    key: 'get',
    value: function get() {
      var _this3 = this;

      this.renderer.renderPromise(this._validateId().then(function (_ref4) {
        var _id = _ref4._id;
        return _this3.findFromId({ _id: _id });
      }));
    }
  }, {
    key: 'update',
    value: function update() {
      var _this4 = this;

      this.renderer.renderPromise(this._validateId().then(function (_ref5) {
        var _id = _ref5._id;
        return _this4.updateFromId({ _id: _id });
      }));
    }
  }, {
    key: 'create',
    value: function create() {
      var req = this.req;
      if (req.is('multipart/form-data')) {
        this.createFromMultipart();
      } else if (req.is('application/json') && req.body) {
        this.createFromJson();
      } else {
        this.renderer.sendError({
          status: 400, details: 'Unsupported upload type.'
        });
      }
    }
  }, {
    key: 'createFromMultipart',
    value: function createFromMultipart() {
      this.renderer.sendError({
        status: 400, details: 'Multipart is not implemented.'
      });
    }
  }, {
    key: 'createFromJson',
    value: function createFromJson() {
      this.renderer.sendError({
        status: 400, details: 'JSON is not supported.'
      });
    }
  }]);

  return EntityController;
}(_BaseController3.default);

;

exports.default = EntityController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {
  app.use('/cms', __webpack_require__(37));
  app.use('/app', __webpack_require__(39));

  // redirect the home to /cms
  app.get('/', function (req, res) {
    res.redirect('/cms');
  });
};

/***/ }),
/* 4 */
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
  }
};

/***/ }),
/* 5 */
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
      this[method]();
    }
  }]);

  return BaseController;
}();

exports.default = BaseController;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(0);

module.exports = new Schema({
  default: { type: String },
  english: { type: String },
  tamil: { type: String },
  hindi: { type: String }
});

/***/ }),
/* 7 */
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
      // 'INFO'

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var questionDefault = __webpack_require__(7);

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

var tagsParser = function tagsParser(type, tags, parentContext) {
  return _createTagsList(tags).reduce(function (acc, tag) {
    acc._tags[tag] = false;
    return tagModules.reduce(function (acc2, m) {
      if (tag.startsWith(m.tagPrefix)) {
        m.adorn(tag, acc2);
        acc2._tags[tag] = m.tagPrefix;
      };
      return acc2;
    }, acc);
  }, Object.assign({}, questionDefault(type, parentContext)));
};
module.exports = tagsParser;

var tagModules = [].concat([__webpack_require__(23), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28), __webpack_require__(29)]);
// .reduce(
//   (acc, m) => {
//     return acc[m.tagPrefix] = m;
//   }, {}
// );

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(31);
var http = __webpack_require__(46);

// Create the server and load the components.
var app = express();

// 1. Connect to DB (doesn't need the app object)
__webpack_require__(32);

// 2.1 Setup cookies
__webpack_require__(33)(app);

// 2.2. Add security to all end points.
__webpack_require__(34)(app);

// 2.3. Setup body-parser.
__webpack_require__(36)(app);

// 10. Setup the routes:
__webpack_require__(3)(app);

// 99. Setup error-handling
__webpack_require__(40)(app);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


global.appRequire = function (name) {
  return __webpack_require__(43)("./" + name);
};
appRequire('server');

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Answer = __webpack_require__(12);

var _Answer2 = _interopRequireDefault(_Answer);

var _EntitiyController = __webpack_require__(2);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

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
    key: 'createFromJson',
    value: function createFromJson(req, res, next) {
      var answer = req.body;
      if (answer) {
        this._servePromise(_Answer2.default.create(answer), res, next);
      } else {
        this.renderer.sendError({
          status: 400,
          details: 'Answer missing.'
        });
      }
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Schema = __webpack_require__(0);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var surveyorSchema = new _Schema2.default({
  survey: { type: _Schema2.default.Types.ObjectId, ref: 'Survey', required: true },
  surveyor: { type: _Schema2.default.Types.ObjectId, ref: 'Surveyor', required: true },
  data: { type: {}, require: true }
});

module.exports = _mongoose2.default.model('Answer', surveyorSchema);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntitiyController = __webpack_require__(2);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Question = __webpack_require__(14);

/**
 * Question document controller
 * 
 * @class QuestionController
 * @extends {BaseController}
 */
var QuestionController = function (_EntityController) {
  _inherits(QuestionController, _EntityController);

  function QuestionController() {
    _classCallCheck(this, QuestionController);

    return _possibleConstructorReturn(this, (QuestionController.__proto__ || Object.getPrototypeOf(QuestionController)).apply(this, arguments));
  }

  _createClass(QuestionController, [{
    key: 'findFromId',
    value: function findFromId(questionId) {
      Question.findOne({ _id: questionId }).populate('options.option').exec();
    }
  }]);

  return QuestionController;
}(_EntitiyController2.default);

Object.assign(QuestionController, {
  collection: Question,
  routeName: 'questions'
});

module.exports = QuestionController;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(0);
var Text = __webpack_require__(6);
var mongoose = __webpack_require__(1);
var questionSchema = new Schema({
  type: { type: String },
  tags: [{ type: String }],
  text: { type: Text },
  number: { type: String },
  options: [{
    position: { type: String, required: true },
    option: { type: Schema.Types.ObjectId, ref: 'Option', required: true }
  }],
  children: [{
    position: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true }
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

questionSchema.pre('findOne', function (next) {
  undefined.populate({ path: 'options.option' });
  next();
});

questionSchema.statics.fetchDeep = function (query) {
  var _this = this;

  return this.findOne(query).then(function (node) {
    if (!node) {
      return node;
    }
    node.children = node.children || [];
    return Promise.all(node.children.map(function (child) {
      if (child.question) {
        return _this.fetchDeep({ _id: child.question }).then(function (cdata) {
          child.question = cdata;
          return child;
        });
      } else {
        return child;
      }
    })).then(function (children) {
      node.children = children;
      return node;
    });
  });
};

/**
* Inserts a question and all its options into the db, and references the
* options in the question document.
* @param  {[type]} root JSON of the whole question, along with all options.
* @return {[type]}      promise that resolves when the question is created.
*/
questionSchema.statics.createWithOptions = function (root) {
  var _this2 = this;

  var Option = this.model('Option');
  root.options = root.options || [];
  return Promise.all(root.options.map(function (option) {
    return Option.create(option);
  })).then(function (optionIds) {
    root.options = optionIds.map(function (e, i) {
      return { position: i, option: e };
    });
    return root;
  }).then(function (d) {
    return _this2.create(d);
  });
};

/**
* Save the question along with its children and option into the database.
* This method works recrusively to save the root's children. 
* 
* @param {Question} root - The root question to save. 
* @return {Promise} resolves to question id.
*/
questionSchema.statics.saveDeep = function (root) {
  var _this3 = this;

  var self = this;
  root.children = root.children || [];
  return Promise.all(root.children.map(function (child) {
    return _this3.saveDeep(child);
  })).then(function (children) {
    root.children = children.map(function (e, i) {
      return { position: i, question: e };
    });
    return root;
  }).then(function (qdata) {
    return self.createWithOptions(qdata);
  }).then(function (r) {
    return r._id;
  });
};

module.exports = mongoose.model('Question', questionSchema);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EntitiyController = __webpack_require__(2);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

var _multipartHandler = __webpack_require__(16);

var _multipartHandler2 = _interopRequireDefault(_multipartHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Survey = __webpack_require__(17);

var SurveyCSVParser = __webpack_require__(18);

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
    key: 'findAll',
    value: function findAll(query) {
      return _get(SurveyController.prototype.__proto__ || Object.getPrototypeOf(SurveyController.prototype), 'findAll', this).call(this, query).select('name description enabled modifiedAt');
    }
  }, {
    key: 'createFromMultipart',
    value: function createFromMultipart() {
      var _this2 = this;

      this.renderer.renderPromise(new _multipartHandler2.default(this.req, function (field, file, fname, encoding, mime, data) {
        if (mime == 'application/octet-stream' || mime == 'text/csv') {
          return _this2.parseCSV(file, {
            name: data[field + 'Name'] || field,
            description: data[field + 'Description'] || field
          });
        } else {
          return null;
        }
      }).promise);
    }

    /**
     * parse CSV from stream and return promise that resolves to created DB
     * record.
     * @param  {Stream} stream Readable stream of CSV file
     * @param  {Object} surveyOpts survey options
     * @return {Promise.<Survey>}        Promise resolving to Survey record
     */

  }, {
    key: 'parseCSV',
    value: function parseCSV(stream, surveyOpts) {
      var parser = new SurveyCSVParser({ survey: surveyOpts });
      stream.pipe(parser);
      return parser.promise;
    }
  }]);

  return SurveyController;
}(_EntitiyController2.default);

Object.assign(SurveyController, {
  collection: Survey,
  routeName: 'surveys'
});
module.exports = SurveyController;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _busboy = __webpack_require__(44);

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

      var filePromise = this.fileHandler(field, file, fname, encoding, mime, this.data);
      if (filePromise && filePromise.then) {
        this.childPromises.push(filePromise);
        filePromise.then(function (fileData) {
          _this2.data[field] = fileData;
        }).catch(function (err) {
          file.resume();
          console.log(err);
          _this2.data[field] = { error: err };
        });
      } else {
        file.resume();
      }
    }
  }]);

  return MPHandler;
}(_busboy2.default);

exports.default = MPHandler;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(0);
var mongoose = __webpack_require__(1);

var surveySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  enabled: { type: Boolean, default: true },
  question: { type: {}, required: true }
});

module.exports = mongoose.model('Survey', surveySchema);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Survey = appRequire('data/models/Survey');
var TreeParser = __webpack_require__(19);
var tagsParser = appRequire('lib/tags');
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

    opts.survey = Object.assign({
      name: 'Unnamed',
      description: 'Generic uploaded from CSV',
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

    _this.survey = {
      name: _this.surveyOpts.name,
      description: _this.surveyOpts.description
    };
    _this.rootQuestion = {};
    _this.rootQuestion[qNo] = '';

    _this.on('nodeCompleted', _this._onNodeCompleted.bind(_this));
    _this.on('nodePushed', _this._onNodePushed.bind(_this));
    _this.on('error', _this._onError.bind(_this));

    _this.promise = new Promise(function (res, rej) {
      _this.res = res;_this.rej = rej;
    });
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
      var qParsedTag = '_parsedTag';
      var qTags = this.surveyOpts.question + '.Tags';
      var qType = this.surveyOpts.question + '.Type';
      var node = stack[stack.length - 1];
      var parent = null;
      if (stack.length > 1) {
        parent = stack[stack.length - 2];
      }
      node[qParsedTag] = tagsParser(node[qType], node[qTags], parent && parent[qParsedTag]);
      var _tags = node[qParsedTag]._tags;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(_tags)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;

          if (!_tags[k]) {
            console.log('Unknown tag: ' + k);
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
    value: function _onNodeCompleted(_ref) {
      var node = _ref.node,
          parent = _ref.parent;

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
      var optText = this.surveyOpts.opt + '.Text.';
      var optType = this.surveyOpts.opt + '.Type';
      return Promise.resolve({
        type: node[optType] || 'GENERIC',
        text: this._createTextJson(node, optText)
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
      var _this2 = this;

      var qText = this.surveyOpts.question + '.Text.';
      var qTags = this.surveyOpts.question + '.Tags';
      var qType = this.surveyOpts.question + '.Type';
      var qNo = this.surveyOpts.question + '.No';
      var qPre = this.surveyOpts.question + '.PreReq.';
      var qPreQ = qPre + this.surveyOpts.question;
      var qPreOpt = qPre + this.surveyOpts.opt;
      var qParsedTag = '_parsedTag';

      this._createPromises(node);
      return Promise.all(node.childrenPromises).then(function (ch) {
        return Promise.all(node.optionPromises).then(function (opts) {
          return { options: opts, children: ch };
        });
      }).then(function (q) {
        if (node[qPreQ]) {
          node[qParsedTag].pre.skipUnless = {
            question: node[qPreQ],
            option: node[qPreOpt]
          };
        }
        // return Question.create(
        return Object.assign(q, {
          text: _this2._createTextJson(node, qText),
          type: node[qType] || 'GENERIC',
          tags: node[qTags],
          number: node[qNo],
          flow: node[qParsedTag]
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
      var _this3 = this;

      _get(SurveyCSVParser.prototype.__proto__ || Object.getPrototypeOf(SurveyCSVParser.prototype), '_onFinish', this).call(this);

      // Create the root Question object.
      Promise.all(this.rootQuestion.childrenPromises).then(function (ch) {
        return {
          type: 'ROOT',
          options: [],
          children: ch,
          flow: __webpack_require__(7)('NONE', null)
        };
      }).then(function (q) {
        _this3.survey.question = q;
        return Survey.create(_this3.survey);
      }).then(function (s) {
        _this3.res({ survey: s._id });
      }).catch(function (err) {
        _this3.rej(err);
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
}(TreeParser);

module.exports = SurveyCSVParser;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVParser = __webpack_require__(20);

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

      this.emit('nodeCompleted', { node: record, parent: parent });
    }
  }]);

  return TreeParser;
}(CSVParser);

module.exports = TreeParser;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(45),
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _EntitiyController = __webpack_require__(2);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Surveyor = __webpack_require__(22);

/**
 * Surveyor document controller
 * 
 * @class SurveyorController
 * @extends {BaseController}
 */
var SurveyorController = function (_EntityController) {
  _inherits(SurveyorController, _EntityController);

  function SurveyorController() {
    _classCallCheck(this, SurveyorController);

    return _possibleConstructorReturn(this, (SurveyorController.__proto__ || Object.getPrototypeOf(SurveyorController)).apply(this, arguments));
  }

  return SurveyorController;
}(_EntitiyController2.default);

Object.assign(SurveyorController, {
  collection: Surveyor,
  routeName: 'surveyors'
});

module.exports = SurveyorController;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(0);
var mongoose = __webpack_require__(1);

var surveyorSchema = new Schema({
    name: { type: String, required: true },
    surveys: [{
        position: { type: String, required: true },
        survey: { type: Schema.Types.ObjectId, ref: 'Survey', required: true }
    }]
});

module.exports = mongoose.model('Surveyor', surveyorSchema);

/***/ }),
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'IMAGES',
  adorn: function adorn(tag, obj) {
    obj.question.showImage = true;
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'NUMBER',
  adorn: function adorn(tag, obj) {
    obj.question.validation = '[0-9]+';
  }
};

/***/ }),
/* 30 */
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
    value: function _renderCallback(err, data) {
      console.log(data);
    }
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
/* 31 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// connect to mongoose
var constants = appRequire('config/Constants');
var mongoose = __webpack_require__(1);

var options = constants.db;
mongoose.Promise = global.Promise;
mongoose.connect(options.connectionString, options.connectionOptions, function (err) {
  if (err) {
    console.log('Error connecting to the DB: ' + err);
  }
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cookieParser = __webpack_require__(47);
module.exports = function (app) {
  return app.use(cookieParser());
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jwt = __webpack_require__(48);
var constants = __webpack_require__(4);

var httpDigest = __webpack_require__(35);

var jwtOpts = Object.assign({
  getToken: function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.ptracking_jwt) {
      return req.cookies.ptracking_jwt;
    } else {
      return null;
    }
  }
}, constants.jwt);

module.exports = function (app) {
  app.use(function (req, res, next) {
    next();
  }, jwt(jwtOpts).unless({
    path: ['/auth']
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(49);
var Digest = __webpack_require__(50).DigestStrategy;
var jwt = __webpack_require__(51);
var Constants = __webpack_require__(4);

passport.use(new Digest({ qop: 'auth' }, function (username, cb) {
  if (username == 'ptracking') {
    return cb(null, { name: 'ptracking', role: 'admin' }, 'vaazhvuT');
  } else {
    cb(null, false);
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
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodyParser = __webpack_require__(52);

module.exports = function (app) {
  // parse application/x-www-form-urlencoded 
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json 
  app.use(bodyParser.json());
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dispatcher = __webpack_require__(38);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(31);


/**
 * 
 * @param {Express.App} app
 * @param {Class.<BaseController>} Controller 
 */
function registerCmsRoutes(app, Controller) {
  var router = new express.Router();

  router.get('/', (0, _dispatcher2.default)(Controller, 'index'));
  router.post('/', (0, _dispatcher2.default)(Controller, 'create'));

  router.get('/:id', (0, _dispatcher2.default)(Controller, 'get'));
  router.patch('/:id', (0, _dispatcher2.default)(Controller, 'update'));
  router.delete('/:id', (0, _dispatcher2.default)(Controller, 'delete'));
  app.use('/' + Controller.routeName, router);
  console.log('Registered @ /' + Controller.routeName + ' for ' + Controller.name);
}

var cmsRouter = new express.Router();
['Survey', 'Surveyor', 'Answer'].forEach(function (ctrlName) {
  registerCmsRoutes(cmsRouter, __webpack_require__(53)("./" + ctrlName + 'Controller'));
});
module.exports = cmsRouter;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dispatcher;

var _render = __webpack_require__(30);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(31);
var app = new express.Router();

module.exports = app;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {
  // Remove console log in production mode
  if (process.env.NODE_ENV == 'production') {
    console.log = function () {};
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
        stack: err.stack && err.stack.split('\n')
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(0);

var Text = __webpack_require__(6);

var mongoose = __webpack_require__(1);

var optionSchema = new Schema({
  text: { type: Text, required: true, unique: true },
  type: { type: String }
});

// indexes
optionSchema.index({
  text: 1,
  type: 1
});

module.exports = mongoose.model('Option', optionSchema);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Schema = __webpack_require__(0);

var _Schema2 = _interopRequireDefault(_Schema);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var surveyorSchema = new _Schema2.default({
  data: { type: {}, require: true }
});

module.exports = _mongoose2.default.model('Surveyee', surveyorSchema);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app": 10,
	"./app.js": 10,
	"./config/Constants": 4,
	"./config/Constants.js": 4,
	"./controllers/AnswerController": 11,
	"./controllers/AnswerController.js": 11,
	"./controllers/BaseController": 5,
	"./controllers/BaseController.js": 5,
	"./controllers/EntitiyController": 2,
	"./controllers/EntitiyController.js": 2,
	"./controllers/QuestionController": 13,
	"./controllers/QuestionController.js": 13,
	"./controllers/SurveyController": 15,
	"./controllers/SurveyController.js": 15,
	"./controllers/SurveyorController": 21,
	"./controllers/SurveyorController.js": 21,
	"./data/models/Answer": 12,
	"./data/models/Answer.js": 12,
	"./data/models/Option": 41,
	"./data/models/Option.js": 41,
	"./data/models/Question": 14,
	"./data/models/Question.js": 14,
	"./data/models/Schema": 0,
	"./data/models/Schema.js": 0,
	"./data/models/Survey": 17,
	"./data/models/Survey.js": 17,
	"./data/models/Surveyee": 42,
	"./data/models/Surveyee.js": 42,
	"./data/models/Surveyor": 22,
	"./data/models/Surveyor.js": 22,
	"./data/models/Text": 6,
	"./data/models/Text.js": 6,
	"./lib/csv/csv-parser": 20,
	"./lib/csv/csv-parser.js": 20,
	"./lib/csv/survey-csv-parser": 18,
	"./lib/csv/survey-csv-parser.js": 18,
	"./lib/csv/tree-csv-parser": 19,
	"./lib/csv/tree-csv-parser.js": 19,
	"./lib/tags": 8,
	"./lib/tags/": 8,
	"./lib/tags/core/loop": 25,
	"./lib/tags/core/loop.js": 25,
	"./lib/tags/core/select": 26,
	"./lib/tags/core/select.js": 26,
	"./lib/tags/data/auth": 24,
	"./lib/tags/data/auth.js": 24,
	"./lib/tags/data/pre-fill": 23,
	"./lib/tags/data/pre-fill.js": 23,
	"./lib/tags/index": 8,
	"./lib/tags/index.js": 8,
	"./lib/tags/question-default": 7,
	"./lib/tags/question-default.js": 7,
	"./lib/tags/ui/grid": 27,
	"./lib/tags/ui/grid.js": 27,
	"./lib/tags/ui/images": 28,
	"./lib/tags/ui/images.js": 28,
	"./lib/tags/ui/number": 29,
	"./lib/tags/ui/number.js": 29,
	"./lib/utils/multipart-handler": 16,
	"./lib/utils/multipart-handler.js": 16,
	"./lib/utils/render": 30,
	"./lib/utils/render.js": 30,
	"./server": 9,
	"./server/": 9,
	"./server/body-parser": 36,
	"./server/body-parser.js": 36,
	"./server/cookies": 33,
	"./server/cookies.js": 33,
	"./server/database": 32,
	"./server/database.js": 32,
	"./server/digest-auth": 35,
	"./server/digest-auth.js": 35,
	"./server/error-handler": 40,
	"./server/error-handler.js": 40,
	"./server/index": 9,
	"./server/index.js": 9,
	"./server/routes": 3,
	"./server/routes/": 3,
	"./server/routes/app": 39,
	"./server/routes/app.js": 39,
	"./server/routes/cms": 37,
	"./server/routes/cms.js": 37,
	"./server/routes/dispatcher": 38,
	"./server/routes/dispatcher.js": 38,
	"./server/routes/index": 3,
	"./server/routes/index.js": 3,
	"./server/security": 34,
	"./server/security.js": 34
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 43;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("busboy");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("csv-parse");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("passport-http");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./AnswerController": 11,
	"./BaseController": 5,
	"./EntitiyController": 2,
	"./QuestionController": 13,
	"./SurveyController": 15,
	"./SurveyorController": 21
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 53;

/***/ })
/******/ ]);