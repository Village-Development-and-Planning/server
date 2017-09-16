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

/**
 * Inserts a question and all its options into the db, and references the
 * options in the question document.
 * @param  {[type]} root JSON of the whole question, along with all options.
 * @return {[type]}      promise that resolves when the question is created.
 */
questionSchema.statics.createWithOptions = function(root) {
  root.options = root.options || []
  return Promise.all(
    root.options.map( option => Option.create(option) )
  ).then(
    (optionIds) => {
      root.options = optionIds.map(
        (e, i) => ({position: i, option: e}));
      return root;
  }).then((d) => this.create(d));
}


/**
 * Save the question along with its children and option into the database.
 * This method works recrusively to save the root's children. 
 * 
 * @param root - The root question to save. 
 * @return Promise with the inserted question id.
 */
questionSchema.statics.saveDeep = function(root) {
  var self = this;
  console.log('Currently processing question:\n' + root);
  root.children = root.children || [];
  return Promise.all(
    root.children.map(
      (child) => this.saveDeep(child)
  )).then((children) => {
    root.children = children.map((e, i) => ({position: i, question: e}));
    return root;
  }).then((qdata) => self.createWithOptions(qdata))
  .then((r) => r._id);
}

module.exports = mongoose.model('Question', questionSchema);