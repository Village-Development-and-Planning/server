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
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
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
/***/ (function(module, exports) {

module.exports = require("csv-stringify");

/***/ }),

/***/ 12:
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
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("csv-parse");

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

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
module.exports = __webpack_require__(74);


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["Proc"] = __webpack_require__(73);

/***/ }),

/***/ 73:
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

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Process = Proc.default;
var arg = process.argv[2];
var method = process.argv[3];

if (!arg || !method) {
  process.exit(-1);
}

var proc = new Process(arg);
if (!proc) {
  process.exit(-1);
}

if (typeof proc[method] !== 'function') {
  process.exit(-1);
}

Promise.resolve(proc[method]()).then(function () {
  return null;
}).then(function () {
  return _mongoose2.default.connection.close();
});
process.exitCode = 0;

/***/ }),

/***/ 8:
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