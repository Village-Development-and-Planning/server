var Option = require('../data/models/Option');
var Question = require('../data/models/Question');
var Survey = require('../data/models/Survey');
var async = require('async');

function BaseDataUploadController() {
    this.childrenIDs = new Map(); // Holds the ObjectID's for all the question in the given CSV
    this.errors = '';
}

/**
 * Helper to save questions into a survey.
 * 
 * @param surveyName - The name of the survey to save.
 * @param root - Questions JSON after parsing CSV. Used to get the parent question id's.
 * 
 * @return Promise. 
 */
BaseDataUploadController.prototype.saveSurvey = function (surveyName, roots) {
    var self = this;

    var survey = new Survey({
        name: surveyName,
        questions: constructQuestionsForSurvey()
    });

    // Helper to construct survey along with the questions
    function constructQuestionsForSurvey() {
        var questions = [];
        for (var i = 0; i < roots.length; i++) {
            var number = roots[i].number;
            var objectID = self.childrenIDs.get(number);

            // Create a question object and push into Survey
            questions.push({
                position: i,
                question: objectID
            });
        }
        return questions;
    }

    return survey.save();
}

/**
 * Helper to save the questions starting from root.
 * Calls saveQuestion(root) to save all the children recrusively.
 * This method also saves the questions into DB with the given survey name. 
 * 
 * @param root - The root question that may contain may children. 
 * @param surveyName - Name of the survey to save the questions into. 
 * 
 * @return Promise. 
 */
BaseDataUploadController.prototype.saveQuestions = function (roots, surveyName) {
    var self = this;

    var sequence = Promise.resolve();

    roots.forEach(function (r) {
        sequence = self.saveQuestion(r).then(function (initialRoot) {
            return insertSingleQuestion.call(self, initialRoot);
        }).then(function () {
            return self.saveSurvey(surveyName, roots);
        });
    });

    return sequence;
}

/**
 * This promise returns a error string object which is empty if there are no errors. 
 * 
 * @param root - The root question.
 * @return Promise. 
 */
BaseDataUploadController.prototype.saveQuestion = function (root) {
    var self = this;

    return root.children.map(function (val) {
        return self.saveQuestion(val);
    }).reduce(function (sequence, child) {
        return sequence.then(function () {
            return child;
        }).then(function (current) {
            if (current)
                return insertSingleQuestion.call(self, current);
        }).then(function () {
            return root;
        });
    }, Promise.resolve(root));
}

/**
 * Inserts one question to DB.
 * @param questionRaw - The question JSON from the CSV
 * 
 * @return Promise. 
 */
function insertSingleQuestion(questionRaw) {
    var self = this;

    return new Promise(function (resolve, reject) {
        if (!questionRaw) {
            resolve(new Error('Question object empty'));
        }

        var options = questionRaw.options || [];

        async.map(options, function (item, callback) {
            self.saveOption(item, callback);
        }, function (err, optionIds) {
            innerQuestionsInsert(optionIds)
        });

        // Helper function to insert questions with no children. 
        function innerQuestionsInsert(optionIds) {
            var question = new Question({
                type: questionRaw.type || '',
                tags: questionRaw.tag || [],
                text: {
                    tamil: questionRaw.text.tamil || '',
                    english: questionRaw.text.english || ''
                },
                options: [],
                children: []
            });

            // insert the options in the format { position: String, option: ObjectID }
            if (optionIds) {
                var options = optionIds.map(function cb(val, index) {
                    return {
                        position: index,
                        option: val._id
                    };
                });

                question.options = options;
            }

            question.save(function (err, question) {
                if (err) {
                    resolve(err);
                } else {
                    self.childrenIDs.set(questionRaw.number, question._id);

                    // insert the children from our map.
                    async.eachOf(questionRaw.children, function (child, index, callback) {
                        var childID = self.childrenIDs.get(child.number);

                        if (childID) {
                            var child = {
                                position: index,
                                question: childID
                            };

                            Question.update({ _id: question._id }, {
                                $push: { children: child } // push the child to the children array
                            }, callback);
                        }

                    }, function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        }
    });
}

/**
 * @param data - The option to insert in the format: { text: { english:, tamil: } , type: }
 * @param cb - function(error, doc)
 */
BaseDataUploadController.prototype.saveOption = function (data, cb) {
    if (!data || !data.text) {
        cb(new Error('The option object modal is not proper.'));
        return;
    }

    var text = {
        english: data.text.english || '',
        tamil: data.text.tamil || ''
    }

    Option.findOneAndUpdate({ text: text }, { $set: { text: text, type: data.type } }
        , { new: true, upsert: true }, cb);
}

module.exports = BaseDataUploadController;