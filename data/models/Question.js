var Schema = require('./Schema');

var Text = require('./Text');

var mongoose = require('mongoose');

var questionSchema = new Schema({
  type: { type: String },
  tags: [{ type: String }],
  text: { type: Text, required: true },
  number: { type: String },
  options: [{
    position: { type: String, required: true },
    option: { type: Schema.Types.ObjectId, ref: 'Option', required: true },
  }],
  children: [{
    position: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  }]
});

questionSchema.statics.fetchDeep = function(query) {
  return this.findOne(query)
    .populate({path: 'options.option'})
    .then(
      (node) => {
        if (!node) { return node; }
        node.children = node.children || []
        return Promise.all(node.children.map(
          (child) => {
            if (child.question) {
              return this.fetchDeep({_id: child.question})
                .then((cdata) => {
                  child.question = cdata;
                  return child;
                })
            } else {
              return child;
            }
          }))
          .then((children) => {
            node.children = children;
            return node;
          });
    });
}

module.exports = mongoose.model('Question', questionSchema);