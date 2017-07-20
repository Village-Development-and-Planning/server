var Question = require('../data/models/Question');
var Survey = require('../data/models/Survey');

function getSurveys(cb) {
    Question
        .find()
        .select({ _id: 1 })
        .exec(function (err, ids) {
            if (err) {
                console.log("Failed to get Questions");
                cb(err);
            } else {
                var survey = new Survey({
                    name: "Survey 1",
                    questions: getQuestionIds(ids)
                });
                cb(null, [survey]);
            }
        });
}

function getQuestionIds(questionIDs) {
    var questions = [];

    for (var i = 0; i < questionIDs.length; i++) {
        questions.push({
            position: i,
            question: questionIDs[i]
        });
    }

    return questions;
}

module.exports = getSurveys;