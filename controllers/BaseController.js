var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');

function BaseController() {
}

var proto = {};

/**
 * Helper to populate surveys with all the questions and its children.
 *
 * @param surveys - array of surveys
 * @return Promise.
 */
proto.populateSurveys = function (surveys) {
    return surveys.reduce(function (sequence, survey) {
        return sequence.then(function () {
            if (survey.questions) {
                return proto.populateQuestions(survey.questions);
            } else {
                throw new Error('The survey have no valid data.');
            }
        });
    }, Promise.resolve());
}

/**
 * Helper to populate the question array with children
 * @param questions - array of root questions that contains children
 * @return Promise.
 */
proto.populateQuestions = function (questions) {
    return questions.reduce(function (sequence, root) {
        return sequence.then(function () {
            if (root.question)
                return proto.populateChildren(root.question)
                    .then(function (currentQuestion) {
                        root.question = currentQuestion;
                        return root;
                    });
            else
                throw new Error('The survey dosen\'t have questions');
        });
    }, Promise.resolve());
}

/**
 * Helper to populate all children nodes of a question.
 * @param question - root question.
 * @return Promise.
 */
proto.populateChildren = function (root) {
    var id = root._id;

    if (id) {
        return Question.find({ _id: id }).exec().then(function (question) {
            return question.children.map(proto.populateChildren)
                .reduce(function (sequence, questionPromise) {
                    return sequence.then(function () {
                        return questionPromise;
                    }).then(function (currentQuestion) {
                        for (var i = 0; i < root.children; i++) {
                            if (root.children.question._id === currentQuestion._id) {
                                root.children.question = currentQuestion;
                                break;
                            }
                        }
                        return root;
                    });
                }, Promise.resolve(root));
        });
    } else {
        throw new Error('The question dosen\'t have an ID : ' + root);
    }
}

BaseController.prototype = proto;

module.exports = BaseController;