var mongoose = require('mongoose');

var OwnerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nameFirst: String,
  nameLast: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  bio: String
}, {
  timestamps: true
});

// Execute before each owner.save() call
OwnerSchema.pre('save', function(callback) {
  var owner = this;

  // Break out if the password hasn't changed
  if (!owner.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(owner.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      owner.password = hash;
      callback();
    });
  });
});

OwnerSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};


module.exports = mongoose.model('Owner', OwnerSchema);
