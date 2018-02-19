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
              refQ: this.rootQuestion,
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
            proc.stdout = stdout.join('');
            proc.stderr = stderr.join('');
            proc.save().then(res).catch(rej);
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
    console.log('Output: ', output);
  }).catch(function (err) {
    console.log('Error: ', err);
  });
};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ 21:
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

/***/ 7:
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
schema.index({ type: 1, key: 1, name: 1 });

module.exports = _mongoose2.default.model('Statistic', schema);

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(21);


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(88);

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _childProcess = __webpack_require__(11);

var _Survey = __webpack_require__(10);

var _Survey2 = _interopRequireDefault(_Survey);

var _Statistic = __webpack_require__(7);

var _Statistic2 = _interopRequireDefault(_Statistic);

var _csvStringify = __webpack_require__(89);

var _csvStringify2 = _interopRequireDefault(_csvStringify);

var _fs = __webpack_require__(19);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExportResponses = function (_ChildTemplate) {
  _inherits(ExportResponses, _ChildTemplate);

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
    key: 'collectStatistics',
    value: function collectStatistics() {
      var _this4 = this;

      this.log = [];
      var cursor = _Statistic2.default.find({
        type: 'SurveyResponse',
        key: this.surveyId,
        name: 'obj'
      }).cursor();
      return new Promise(function (res, rej) {
        _this4.writer = _this4._createCsvWriter(_this4.surveyId, rej);
        _this4.writer.on('error', rej);
        _this4.writer.write(_this4.collectionKeys);
        _this4.writer.write(_this4.collectionKeys.map(function (k) {
          return _this4.collectionKeys['pos' + k];
        }));
        cursor.on('data', function (stat) {
          return stat && _this4.collectOneStatistic(stat);
        });
        cursor.on('error', rej);
        cursor.on('end', function () {
          return _this4.writer.end(null, null, res);
        });
      });
    }
  }, {
    key: 'collectOneStatistic',
    value: function collectOneStatistic(stat) {
      this.writer.write(this.collectionKeys.map(function (k) {
        return stat.data[k];
      }));
    }
  }, {
    key: 'getExportHeader',
    value: function getExportHeader() {
      var _this5 = this;

      return _Statistic2.default.findOne({ type: 'SurveyResponse', key: this.surveyId, name: 'objKeys' }).then(function (stat) {
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
    key: '_createCsvWriter',
    value: function _createCsvWriter(surveyId, errH) {
      var path = 'data/export-responses/' + surveyId + '.csv';
      var mode = 'w';
      var fileStream = _fs2.default.createWriteStream(path, { encoding: 'utf8', flags: mode });
      if (errH) fileStream.on('error', errH);

      var csvWriter = new _csvStringify2.default();
      csvWriter.pipe(fileStream);
      csvWriter.on('end', function () {
        return fileStream.end();
      });
      return csvWriter;
    }
  }]);

  return ExportResponses;
}(_childProcess.ChildTemplate);

exports.default = ExportResponses;

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

module.exports = require("csv-stringify");

/***/ }),

/***/ 9:
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

/***/ })

/******/ });