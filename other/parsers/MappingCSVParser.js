var TransformStream = require('stream').Transform;
var util = require('util');
var Helpers = require('../../other/Helpers');

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

    if (!questionNumber || !questionText || !questionTextTranslation) {
        cb(new Error('The CSV data is not valid.'));
        return;
    }

    // convert the tag to array
    questionTag = questionTag.split('\n').map(function(value) {
        return value.replace(removeNonAlphaNumericRegx, '');
    });
    // clear the question tag of any empty values
    questionTag = Helpers.cleanArray(questionTag);

    optionsText = optionsText.replace(/['"]+/g, '');
    optionsTranslation = optionsTranslation.replace(/['"]+/g, '');

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
        type: questionType || '',
        tag: questionTag || '',
        options: optionsData || '',
        children: []
    }

    var parentQuestionNumber = getParentQuestionNumber(questionNumber);

    // If there is no parent then this is the start of the parent-child tree. 
    if (!parentQuestionNumber) {

        if (this.question) {
            this.push(this.question);
        }

        this.question = Object.assign({}, currentQuestion);
    } else {
        constructQuestionsJson(currentQuestion, this.question);
    }

    cb();
}

MappingCSVParser.prototype._flush = function (cb) {
    this.push(JSON.stringify(this.question));
    cb();
}

/**
 * Appends children to the root question. 
 * Returns if there is no root parent ID or the tree 
 * for a particular root is over.
 * 
 * @param questionJsonToInsert The new questions to insert 
 * @param questionsJson The single set of question tree 
 * (with one root question)
 */
function constructQuestionsJson(questionJsonToInsert, questionsJson) {

    if (!questionsJson || !questionJsonToInsert) {
        return;
    }

    var parentQuestionNumber = getParentQuestionNumber(questionJsonToInsert.number);

    // If there is no parent question number dont proceed. 
    if (!parentQuestionNumber) {
        return;
    }

    var immediateParentQuestion = findParentQuestionObject(questionsJson, parentQuestionNumber);

    if (immediateParentQuestion) {
        immediateParentQuestion.children.push(questionJsonToInsert);
    }
}

// Returns a reference to the appropriate parent question 
// to insert the children to. 
function findParentQuestionObject(questionsJson, number) {

    if (!questionsJson || !number) {
        return;
    }

    var resultQuestionJson = null;

    var currentQuestionNumber = questionsJson.number;

    // return if the current question is found.
    if (currentQuestionNumber == number) {
        return questionsJson;
    }

    // loopover all the children until you find the result
    for (var currentQuestion of questionsJson.children) {
        resultQuestionJson = findParentQuestionObject(currentQuestion, number);
    }

    return resultQuestionJson;
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