var Option = require('../data/models/Option');
var Question = require('../data/models/Question');
var async = require('async');

function BaseDataUploadController() {
    this.childrenIDs = new Map();
    this.errors = '';
}

/**
 * This promise returns a error string object which is empty if there are no errors. 
 * 
 * @param root - The root question. 
 * @param cb - error only callback.
 */
BaseDataUploadController.prototype.saveQuestion = function (root) {
    var self = this;

    return new Promise(function (resolve, reject) {
        if (!root) {
            self.errors += 'Root is null.';
            resolve(self.errors);
        } else {
            var type = root.type || '';
            var tag = root.tag || [];
            var number = root.number;
            var text = root.text;
            var questionChildren = root.children || [];
            var options = root.options || [];

            if (!text || !number) {
                self.errors += 'The Question has properties that are not defined at question number ' + number;
                resolve(self.errors);
            } else {
                questionChildren.forEach(function (child) {
                    self.saveQuestion(child);
                });

                insertSingleQuestion.call(self, root, function (err) {
                    if (!err) {
                        resolve();
                    } else {
                        self.errors += err.message;
                        self.errors += '\n';
                        resolve(self.errors);
                    }
                });
            }
        }
    });
}

/**
 * Inserts one question to DB.
 * @param questionRaw - The question JSON from the CSV
 * @param cb - error only callback
 */
function insertSingleQuestion(questionRaw, cb) {
    var self = this;

    if (!questionRaw) {
        cb(new Error('Question object empty'));
        return;
    }

    var options = questionRaw.options;

    if (options) {
        async.map(options, function (item, callback) {
            self.saveOption(item, callback);
        }, function (err, optionIds) {
            innerQuestionsInsert(optionIds)
        });
    } else {
        innerQuestionsInsert();
    }

    // Helper function to insert questions with no children. 
    function innerQuestionsInsert(optionIds) {
        var question = new Question({
            type: questionRaw.type,
            tags: questionRaw.tag,
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
                cb(err);
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

                }, cb);
            }
        });
    }
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