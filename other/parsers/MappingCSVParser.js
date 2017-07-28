var TransformStream = require('stream').Transform;
var util = require('util');

var COLUMN_TITLE = {
    questionnumber: 0,
    questiontext: 1,
    optionstext: 2,
    questiontranslation: 3,
    optionstranslation: 4,
    questiontype: 5,
    tags: 6
}

var QUESTION_TYPES = ['LOOP_FOR_ALL', 'BINARY', 'SINGLE_CHOICE'];
var QUESTION_TAGS = ['GPS'];

function MappingCSVParser(options) {
    if (!(this instanceof MappingCSVParser))
        return new MappingCSVParser(options);
    TransformStream.call(this, options);

    this.lastParentQuestion = null;
    this.lastQuestion = null;
    this.lastParentQuestionNumber = null;
    this.lastQuestionNumber = null;

    this.question = null;
}

util.inherits(MappingCSVParser, TransformStream);

MappingCSVParser.prototype._transform = function (data, encoding, cb) {
    var dataArray = data.toString().split(',');

    var removeNonAlphaNumericRegx = /[^A-Za-z0-9]/g;
    var optionsRegex = /[0-9]+./;

    function parseOptions(optionsData) {
        var arr = optionsData.split('\n');
        var finalArr = arr.map(function (option) {
            return option.replace(optionsRegex, '');
        });
        return finalArr;
    }

    function constructOptionsJson(optionsTxt, optionsTranslation) {
        var optionsTextArray = parseOptions(optionsTxt);
        var optionsTranslationArray = parseOptions(optionsTranslation);

        if (optionsTranslationArray.length != optionsTextArray.length) {
            return null;
        }

        var len = optionsTextArray.length;
        var result = [];

        for (var i = 0; i < len; i++) {
            var option = {
                type: '',
                text: {
                    english: optionsTextArray[i],
                    tamil: optionsTranslationArray[i]
                }
            }

            result.push(option);
        }

        return result;
    }

    var questionNumber = dataArray[COLUMN_TITLE.questionnumber];
    var questionText = dataArray[COLUMN_TITLE.questiontext];
    var questionTextTranslation = dataArray[COLUMN_TITLE.questiontranslation];
    var questionType = dataArray[COLUMN_TITLE.questiontype];
    var questionTag = dataArray[COLUMN_TITLE.tags];
    var optionsText = dataArray[COLUMN_TITLE.optionstext];
    var optionsTranslation = dataArray[COLUMN_TITLE.optionstranslation];

    if (!questionNumber || !questionText || !questionTextTranslation || !questionType
        || !optionsText || !optionsTranslation) {
        cb(new Error('The CSV data is not valid.'));
        return;
    }

    questionTag.replace(removeNonAlphaNumericRegx, '');
    optionsText.replace(/['"]+/g, '');
    optionsTranslation.replace(/['"]+/g, '');

    var optionsData = constructOptionsJson(optionsText, optionsTranslation);

    if (!optionsData) {
        cb(new Error('Provided options and options translation are not valid.'));
        return;
    }

    var currentQuestion = {
        number: questionNumber,
        text: {
            english: questionText,
            tamil: questionTextTranslation
        },
        type: questionType,
        tag: questionTag,
        options: optionsData,
        children: []
    }

    var parentQuestionNumber = getParentQuestionNumber(questionNumber);

    // If there is no parent or the parent does not match then this is the start of the parent-child tree. 
    if (!parentQuestionNumber) {
        this.lastParentQuestionNumber = getParentQuestionNumber(questionNumber) || questionNumber;

        if (!parentQuestionNumber) {

            if (this.question) {
                this.push(JSON.stringify(this.question));
            }

            this.question = Object.assign({}, currentQuestion);
            this.lastParentQuestion = this.question;
        }

    } else {

        if ((this.lastParentQuestionNumber != parentQuestionNumber)) {
            this.lastParentQuestionNumber = getParentQuestionNumber(questionNumber) || questionNumber;
            this.lastParentQuestion = this.lastQuestion;
        }

        var child = Object.assign({}, currentQuestion);
        this.lastParentQuestion.children.push(child);
    }

    var lastParentQuestionChildCount = this.lastParentQuestion.children.length;

    if (lastParentQuestionChildCount > 0)
        this.lastQuestion = this.lastParentQuestion.children[lastParentQuestionChildCount - 1];

    cb();
}

MappingCSVParser.prototype._flush = function (cb) {
    this.push(JSON.stringify(this.question));
    cb();
}

function getParentQuestionNumber(questionNumber) {
    var lastIndexOfDot = questionNumber.lastIndexOf('.');

    // Returns the parent question number of the current question. 
    // eg: if the question number is 3.1.1, returns 3.1
    if (lastIndexOfDot >= 0) {
        return questionNumber.substring(0, lastIndexOfDot);
    }

    return null;
}

module.exports = MappingCSVParser;