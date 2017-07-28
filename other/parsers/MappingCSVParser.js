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

    var questionNumber = dataArray[COLUMN_TITLE.questionnumber];
    var questionText = dataArray[COLUMN_TITLE.questiontext];
    var questionTextTranslation = dataArray[COLUMN_TITLE.questiontranslation];
    var questionType = dataArray[COLUMN_TITLE.questiontype];
    var questionTag = dataArray[COLUMN_TITLE.tags];

    // TODO: option.

    var currentQuestion = {
        number: questionNumber,
        text: {
            english: questionText,
            tamil: questionTextTranslation
        },
        type: questionType,
        tag: questionTag,
        children: []
    }

    var parentQuestionNumber = getParentQuestionNumber(questionNumber);

    // If there is no parent or the parent donot match then this is the start of the parent-child tree. 
    if (!parentQuestionNumber) {
        this.lastParentQuestionNumber = getParentQuestionNumber(questionNumber) || questionNumber;

        if (!parentQuestionNumber) {

            if (this.question)
                this.push(JSON.stringify(this.question));

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