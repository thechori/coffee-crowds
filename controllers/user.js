var User = require('../models/user');

exports.getUsers = function(req, res) {
  User.find({}, function(err, users) {
    if (err) { return res.send(err); }

    res.json({
      message: 'Successfully found users!',
      data: users
    });
  });
};

exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    bio: req.body.bio
  });

  user.save(function(err) {
    if (err)
      return res.send(err);

    user.sayMyName();

    res.json({
      message: "New coffee enthusiast added!",
      data: user
    });
  });
};

exports.getUserById = function(req, res) {
  User.find({
    _id: req.params.userId
  }, function(err, user) {
    if (err) { return res.send(err); }

    res.json({
      message: "Successfully found User!",
      data: user
    });
  });
};

exports.putUserById = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) { return res.send(err); }

    // Update User information
    user.username = req.body.username;
    user.password = req.body.password;
    user.nameFirst = req.body.nameFirst;
    user.nameLast = req.body.nameLast;
    user.email = req.body.email;
    user.bio = req.body.bio;

    // Save the User
    user.save(function(err) {
      if (err) { return res.send(err); }

      res.json({
        message: "Successfully PUT User by ID",
        data: user
      });
    });
  });
};

exports.deleteUserById = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err) {
    if (err) { return res.send(err); }

    res.send("Successfully deleted User!");
  });
};
