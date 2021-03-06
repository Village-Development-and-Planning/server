const Schema = require('./Schema');
const mongoose = require('mongoose');

const userSchema = new Schema({
  username: {type: String, required: true},
  name: {type: String},

  passphrase: {type: String},
  roles: [{type: String}],

  payload: {type: {}},
});
userSchema.index({username: 1});
userSchema.index({name: 1});
userSchema.index({roles: 1});

module.exports = mongoose.model('User', userSchema);

