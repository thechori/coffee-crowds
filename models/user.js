var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// var UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   nameFirst: String,
//   nameLast: String,
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   bio: String
// });

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
// UserSchema.pre('save', function(callback) {
//   console.log("UserSchema.pre(save, function)");
//
//   var user = this;
//
//   // Break out if the password hasn't changed
//   if (!user.isModified('password')) { return callback(); }
//
//   // Password changed so we need to hash it
//   bcrypt.genSalt(5, function(err, salt) {
//     if (err) { return callback(err); }
//
//     // Hash the password
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) { return callback(err); }
//
//       user.password = hash;
//       // user.save(); // TODO: IS THIS REQUIRED SINCE SAVE SHOULD BE CALLED AFTER THIS??
//       callback();
//     });
//   });
// });

UserSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

UserSchema.methods.sayMyName = function() {
  console.log("My name is " + this.name);
};

module.exports = mongoose.model('User', UserSchema);
