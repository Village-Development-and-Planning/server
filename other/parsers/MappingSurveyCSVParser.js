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

function MappingSurveyCSVParser(options) {
    if (!(this instanceof MappingSurveyCSVParser))
        return new MappingSurveyCSVParser(options);
    TransformStream.call(this, options);

    this.parentArray = [];
}

util.inherits(MappingSurveyCSVParser, TransformStream);

MappingSurveyCSVParser.prototype._transform = function (data, encoding, cb) {
    var dataArray = Helpers.CSVToArray(data.toString());

    var questionNumber = dataArray[COLUMN_TITLE.questionnumber] || '';
    var questionText = dataArray[COLUMN_TITLE.questiontext] || '';
    var questionTextTranslation = dataArray[COLUMN_TITLE.questiontranslation] || '';
    var questionType = dataArray[COLUMN_TITLE.questiontype] || '';
    var questionTag = dataArray[COLUMN_TITLE.tags] || '';
    var optionsText = dataArray[COLUMN_TITLE.optionstext] || '';
    var optionsTranslation = dataArray[COLUMN_TITLE.optionstranslation] || '';

    if (!questionNumber) {
        cb();
        return;
    }

    // convert the tag to array
    questionTag = questionTag.split(',').map(function (value) {
        return value.replace(/[^A-Za-z0-9]/g, '');
    });

    // clear the question tag from any empty values
    questionTag = Helpers.cleanArray(questionTag);

    var optionsData = convertOptionsCSVToJSON(optionsText, optionsTranslation);

    if (!optionsData) {
        cb(new Error('Provided options or options translation is not valid for question number '
            + questionNumber));
        return;
    }

    var currentQuestion = {
        number: questionNumber,
        text: {
            english: questionText,
            tamil: questionTextTranslation
        },
        type: questionType || '',
        tags: questionTag || '',
        options: optionsData || [],
        children: []
    }

    var parent = getParentQuestion.call(this, currentQuestion);

    if (!parent) {
        this.parentArray.push(currentQuestion);
    } else {
        parent.children.push(currentQuestion);
    }

    cb();
}

MappingSurveyCSVParser.prototype._flush = function (cb) {
    this.push(JSON.stringify(this.parentArray));
    cb();
}

function getParentQuestion(currentQuestion) {
    var number = currentQuestion.number,
        rootNumber = number.indexOf('.') >= 0 ? number.substring(0, number.indexOf('.')) : number,
        parentNumber = number.lastIndexOf('.') >= 0 ? number.substring(0, number.lastIndexOf('.')) : number,
        currentRoot = null,
        findParent = function (currQ) {
            var result = null;
            if (currQ.number == parentNumber) {
                return currQ;
            }
            currQ.children.forEach(function (e) {
                result = findParent(e);
            });
            return result;
        };

    currentRoot = this.parentArray.find(function (e) {
        return rootNumber == e.number;
    });

    return currentRoot ? findParent(currentRoot) : null;
}

function convertOptionsCSVToJSON(optionsTxt, optionsTranslation) {
    var optionsTextArray = parseOptionsFromCSVToArray(optionsTxt);
    var optionsTranslationArray = parseOptionsFromCSVToArray(optionsTranslation);

    if (optionsTranslationArray.length != optionsTextArray.length) {
        return null;
    }

    var len = optionsTextArray.length;
    var result = [];

    for (var i = 0; i < len; i++) {
        if (optionsTextArray[i] && optionsTranslationArray[i]) {
            var option = {
                type: '',
                text: {
                    english: optionsTextArray[i],
                    tamil: optionsTranslationArray[i]
                }
            }

            result.push(option);
        }
    }

    return result;
}

function parseOptionsFromCSVToArray(optionsData) {
    var arr = optionsData.split(/[0-9][.]/);
    var finalArr = arr.map(function (option) {
        return option.replace(/ *\<[^)]*\> */g, '')
            .trim()
            .replace(/(\r\n|\n|\r)/gm, '');
    });
    return Helpers.cleanArray(finalArr);
}

module.exports = MappingSurveyCSVParser;