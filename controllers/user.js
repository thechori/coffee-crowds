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
