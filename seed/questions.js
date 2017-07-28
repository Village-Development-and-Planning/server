var Question = require('../data/models/Question');
var Option = require('../data/models/Option');

var QUESTION_TYPE = ["Type1", "Type2", "Type3", "Type4", "Type5"];

function getQuestions(cb) {
    Option.find().select({
        _id: 1
    }).exec(function (err, ids) {

        if (err) {
            console.log("Error getting options from the database.");
            cb(err);
        } else {
            // create the questions
            var questions = createQuestions(ids);
            cb(null, questions);
        }
    });
}

function createQuestions(optionIDs) {
    var questions = [];

    for (var i = 0; i < 50; i++) {
        var question = new Question({
            type: QUESTION_TYPE[i % QUESTION_TYPE.length],
            tags: [],
            text: {
                english: 'Question ' + i,
                tamil: 'கேள்வி ' + i
            },
            options: createOption(optionIDs),
            children: []
        });

        questions.push(question);
    }

    return questions;
}

function createOption(optionIDs) {
    var options = [];

    for (var i = 0; i < Math.floor(Math.random() * 10); i++) {
        options.push({
            position: i,
            option: optionIDs[i % optionIDs.length]
        });
    }

    return options
}

module.exports = getQuestions;