var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nameFirst: {
    type: String
  },
  nameLast: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
