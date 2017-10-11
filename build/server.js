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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

var _BaseController2 = __webpack_require__(11);

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = __webpack_require__(0);

/**
* Controller class for documents exposed via CMS APIs.
* 
* @class EntityController
*/
var EntityController = function (_BaseController) {
  _inherits(EntityController, _BaseController);

  function EntityController(opts) {
    _classCallCheck(this, EntityController);

    var _this = _possibleConstructorReturn(this, (EntityController.__proto__ || Object.getPrototypeOf(EntityController)).call(this, opts));

    _this.router.get('/', _this.getList.bind(_this));
    _this.router.get('/:id', _this.getOne.bind(_this));
    return _this;
  }

  /**
  * Get one object matching query.
  * Uses findOne with _id of Object.
  * Derived controllers can augment behaviour.
  * @param  {Object.<_id>} _id Object ID to search for.
  * @return {Promise} Document.
  */


  _createClass(EntityController, [{
    key: 'findFromId',
    value: function findFromId(_ref) {
      var _id = _ref._id;

      return this.constructor.collection.findOne({ _id: _id }).exec();
    }
  }, {
    key: 'findAll',
    value: function findAll(query) {
      return this.constructor.collection.find(query);
    }
  }, {
    key: '_servePromise',
    value: function _servePromise(p, res, next) {
      return p.then(function (json) {
        return res.json(json);
      }).catch(function (err) {
        return next(err);
      });
    }

    /**
    * Serve a list of items matching query.
    * Base implementation returns all objects using `findAll`.
    * 
    * @param {Request} req 
    * @param {Response} res 
    * @param {Next} next 
    */

  }, {
    key: 'getList',
    value: function getList(req, res, next) {
      this._servePromise(this.findAll({}), res, next);
    }
  }, {
    key: 'getOne',
    value: function getOne(req, res, next) {
      var _id = req.params.id;
      if (_id && mongoose.Types.ObjectId.isValid(_id)) {
        this._servePromise(this.findFromId({ _id: _id }), res, next);
      } else {
        next(new Error('Object ID missing or invalid.'));
      }
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
  app.use('/cms', __webpack_require__(32));
  app.use('/app', __webpack_require__(33));

  // redirect the home to /cms
  app.get('/', function (req, res) {
    res.redirect('/cms');
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);
var Text = __webpack_require__(6);
var mongoose = __webpack_require__(0);
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

questionSchema.statics.fetchDeep = function (query) {
  var _this = this;

  return this.findOne(query).populate({ path: 'options.option' }).then(function (node) {
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var questionDefault = __webpack_require__(21);

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
        acc._tags[tag] = m.tagPrefix;
      };
      return acc2;
    }, acc);
  }, Object.assign({}, questionDefault(type, parentContext)));
};
module.exports = tagsParser;

var tagModules = [].concat([__webpack_require__(22), __webpack_require__(23), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28)]);
// .reduce(
//   (acc, m) => {
//     return acc[m.tagPrefix] = m;
//   }, {}
// );

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(4);
var http = __webpack_require__(39);

// Create the server and load the components.
var app = express();

// 1. Connect to DB (doesn't need the app object)
__webpack_require__(29);

// 2. Add security to all end points.
__webpack_require__(30)(app);

// 3. Setup body-parser.
__webpack_require__(31)(app);

// 4. Setup the routes:
__webpack_require__(3)(app);

// 5. Setup error-handling
__webpack_require__(34)(app);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


global.appRequire = function (name) {
  return __webpack_require__(36)("./" + name);
};
appRequire('server');

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = __webpack_require__(0);
var express = __webpack_require__(4);

/**
 * Base Controller.
 * 
 * @class BaseController
 */

var BaseController = function () {
  function BaseController(_ref) {
    var router = _ref.router;

    _classCallCheck(this, BaseController);

    this.router = router;
  }

  _createClass(BaseController, null, [{
    key: 'registerRoute',
    value: function registerRoute(app) {
      if (this.routeName) {
        console.log('Registering: /' + this.routeName + ' => ' + this.name);
        var ctrl = new this({ router: new express.Router() });
        app.use('/' + this.routeName, ctrl.router);
      }
    }
  }]);

  return BaseController;
}();

exports.default = BaseController;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntitiyController = __webpack_require__(2);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Question = __webpack_require__(5);

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

var Survey = __webpack_require__(14);
var Question = __webpack_require__(5);


var mpHandler = __webpack_require__(15);
var SurveyCSVParser = __webpack_require__(16);

/**
 * Survey document controller.
 * 
 * @class SurveyController
 * @extends {BaseController}
 */

var SurveyController = function (_EntityController) {
  _inherits(SurveyController, _EntityController);

  /**
   * Creates an instance of SurveyController.
   * @param {any} opts 
   * 
   * @memberOf SurveyController
   */
  function SurveyController(opts) {
    _classCallCheck(this, SurveyController);

    var _this = _possibleConstructorReturn(this, (SurveyController.__proto__ || Object.getPrototypeOf(SurveyController)).call(this, opts));

    _this.router.post('/', mpHandler(_this.createFromFile.bind(_this)));
    return _this;
  }

  _createClass(SurveyController, [{
    key: 'findFromId',
    value: function findFromId(surveyID) {
      return Survey.findOne({ _id: surveyID }).exec().then(function (survey) {
        if (!survey) {
          return Promise.reject(new Error('No Survey found!'));
        }
        return Question.fetchDeep(survey.question).then(function (q) {
          survey.question = q;
          return survey;
        });
      });
    }
  }, {
    key: 'createFromFile',
    value: function createFromFile(name, file, fname) {
      if (fname.endsWith('.csv')) {
        return this.parseCSV(file, { name: name });
      } else {
        return null;
      }
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var surveySchema = new Schema({
  name: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  description: { type: String }
});

module.exports = mongoose.model('Survey', surveySchema);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Busboy = __webpack_require__(37);

module.exports = function (cb) {
  return function (req, res, next) {
    var busboy = new Busboy({ headers: req.headers });
    var responses = [];
    var partNames = {};

    busboy.on('file', function (field, file, fname, encoding, mime) {
      if (partNames[field + 'Name']) {
        field = partNames[field + 'Name'];
      }
      var p = null;
      if (p = cb(field, file, fname, encoding, mime)) {
        responses.push(Promise.resolve(p).then(function (data) {
          return { name: field, entity: data };
        }).catch(function (err) {
          file.resume();
          console.log(err);
          return {
            name: field,
            error: err.message
          };
        }));
      } else {
        file.resume();
      }
    });

    busboy.on('field', function (field, val) {
      partNames[field] = val;
    });
    busboy.on('finish', function () {
      Promise.all(responses).then(function (resps) {
        return res.json(resps);
      });
    });
    req.pipe(busboy);
  };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Survey = appRequire('data/models/Survey');
var Question = appRequire('data/models/Question');
var Option = appRequire('data/models/Option');
var TreeParser = __webpack_require__(17);
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
      return Option.create({
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
        return Question.create(Object.assign(q, {
          text: _this2._createTextJson(node, qText),
          type: node[qType] || 'GENERIC',
          tags: node[qTags],
          number: node[qNo],
          flow: node[qParsedTag]
        }));
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
        return Question.create({ type: 'ROOT', options: [], children: ch });
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVParser = __webpack_require__(18);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(38),
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _EntitiyController = __webpack_require__(2);

var _EntitiyController2 = _interopRequireDefault(_EntitiyController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Surveyor = __webpack_require__(20);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);
var mongoose = __webpack_require__(0);

var surveyorSchema = new Schema({
    name: { type: String, required: true },
    surveys: [{
        position: { type: String, required: true },
        survey: { type: Schema.Types.ObjectId, ref: 'Survey', required: true }
    }]
});

module.exports = mongoose.model('Surveyor', surveyorSchema);

/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'SELECT_',
  adorn: function adorn(tag, obj) {
    obj.question.strategy = 'LOOP';
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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'IMAGES',
  adorn: function adorn(tag, obj) {
    obj.question.showImage = true;
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  tagPrefix: 'NUMBER',
  adorn: function adorn(tag, obj) {
    obj.question.validation = '[0-9]+';
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// connect to mongoose
var constants = appRequire('config/Constants');
var mongoose = __webpack_require__(0);

var options = constants.db;
mongoose.Promise = global.Promise;
mongoose.connect(options.connectionString, options.connectionOptions, function (err) {
  if (err) {
    console.log('Error connecting to the DB: ' + err);
  }
});

// import so the schema is initially created. 
/* eslint-disable no-unused-vars */
var Survey = appRequire('data/models/Survey');
var Question = appRequire('data/models/Question');
var Option = appRequire('data/models/Option');
var Surveyor = appRequire('data/models/Surveyor');

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jwt = __webpack_require__(40);
var constants = __webpack_require__(10);

module.exports = function (app) {
  app.use(jwt(constants.jwt));
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodyParser = __webpack_require__(41);

module.exports = function (app) {
  // parse application/x-www-form-urlencoded 
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json 
  app.use(bodyParser.json());
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(4);
var cmsRouter = new express.Router();

__webpack_require__(12).registerRoute(cmsRouter);
__webpack_require__(13).registerRoute(cmsRouter);
__webpack_require__(19).registerRoute(cmsRouter);

module.exports = cmsRouter;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(4);
var app = new express.Router();

module.exports = app;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {
  // Remove console log in production mode
  if (process.env.NODE_ENV == 'production') {
    console.log = function () {};
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: {}
      });
    });
  } else {
    // Dev mode will print stacktrace

    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err,
        stack: err.stack.split('\n')
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schema = __webpack_require__(1);

var Text = __webpack_require__(6);

var mongoose = __webpack_require__(0);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app": 9,
	"./app.js": 9,
	"./config/Constants": 10,
	"./config/Constants.js": 10,
	"./controllers/BaseController": 11,
	"./controllers/BaseController.js": 11,
	"./controllers/EntitiyController": 2,
	"./controllers/EntitiyController.js": 2,
	"./controllers/QuestionController": 12,
	"./controllers/QuestionController.js": 12,
	"./controllers/SurveyController": 13,
	"./controllers/SurveyController.js": 13,
	"./controllers/SurveyorController": 19,
	"./controllers/SurveyorController.js": 19,
	"./data/models/Option": 35,
	"./data/models/Option.js": 35,
	"./data/models/Question": 5,
	"./data/models/Question.js": 5,
	"./data/models/Schema": 1,
	"./data/models/Schema.js": 1,
	"./data/models/Survey": 14,
	"./data/models/Survey.js": 14,
	"./data/models/Surveyor": 20,
	"./data/models/Surveyor.js": 20,
	"./data/models/Text": 6,
	"./data/models/Text.js": 6,
	"./lib/csv/csv-parser": 18,
	"./lib/csv/csv-parser.js": 18,
	"./lib/csv/survey-csv-parser": 16,
	"./lib/csv/survey-csv-parser.js": 16,
	"./lib/csv/tree-csv-parser": 17,
	"./lib/csv/tree-csv-parser.js": 17,
	"./lib/tags": 7,
	"./lib/tags/": 7,
	"./lib/tags/core/loop": 24,
	"./lib/tags/core/loop.js": 24,
	"./lib/tags/core/select": 25,
	"./lib/tags/core/select.js": 25,
	"./lib/tags/data/auth": 23,
	"./lib/tags/data/auth.js": 23,
	"./lib/tags/data/pre-fill": 22,
	"./lib/tags/data/pre-fill.js": 22,
	"./lib/tags/index": 7,
	"./lib/tags/index.js": 7,
	"./lib/tags/question-default": 21,
	"./lib/tags/question-default.js": 21,
	"./lib/tags/ui/grid": 26,
	"./lib/tags/ui/grid.js": 26,
	"./lib/tags/ui/images": 27,
	"./lib/tags/ui/images.js": 27,
	"./lib/tags/ui/number": 28,
	"./lib/tags/ui/number.js": 28,
	"./lib/utils/multipart-handler": 15,
	"./lib/utils/multipart-handler.js": 15,
	"./server": 8,
	"./server/": 8,
	"./server/body-parser": 31,
	"./server/body-parser.js": 31,
	"./server/database": 29,
	"./server/database.js": 29,
	"./server/error-handler": 34,
	"./server/error-handler.js": 34,
	"./server/index": 8,
	"./server/index.js": 8,
	"./server/routes": 3,
	"./server/routes/": 3,
	"./server/routes/app": 33,
	"./server/routes/app.js": 33,
	"./server/routes/cms": 32,
	"./server/routes/cms.js": 32,
	"./server/routes/index": 3,
	"./server/routes/index.js": 3,
	"./server/security": 30,
	"./server/security.js": 30
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
webpackContext.id = 36;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("busboy");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("csv-parse");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ })
/******/ ]);