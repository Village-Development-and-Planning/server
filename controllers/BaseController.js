var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');

function BaseController() {
}

var proto = {};

proto.childrenQuestionMap = {};

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
            if (root.question) {
                return proto.populateChildren(root)
                    .then(function (currentQuestion) {
                        console.log(currentQuestion)
                        root.question = currentQuestion;
                        return root;
                    });
            }
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
    var id = root.question;

    if (id) {
        return Question.findOne({ _id: id })
            .exec()
            .then(function (question) {
                return question.children.reduce(function (sequence, node) {
                    return sequence.then(function () {
                        return proto.populateChildren(node);
                    }).then(function (currentQuestion) {
                        // save the current question json in the map for later use. 
                        proto.childrenQuestionMap[currentQuestion._id] = currentQuestion;

                        currentQuestion.children = currentQuestion.children.map(
                            function (child) {
                                var childData = proto.childrenQuestionMap[child.question];
                                child.question = childData;
                                return child;
                            });

                        return question;
                    });
                }, Promise.resolve(question));
            });
    } else {
        throw new Error('The question dosen\'t have an ID : ' + root);
    }
}

BaseController.prototype = proto;

module.exports = BaseController;