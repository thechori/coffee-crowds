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

// exports.postUsers = function(req, res) {
//   var user = new User({
//     username: req.body.username,
//     password: req.body.password,
//     nameFirst: req.body.nameFirst,
//     nameLast: req.body.nameLast,
//     email: req.body.email,
//     bio: req.body.bio
//   });
//
//   console.log("Let's call user.save()!");
//
//   user.save(function(err) {
//     if (err) { return res.send(err); }
//
//     res.json({
//       message: "Successfully saved new User!",
//       data: user
//     });
//   });
//
//   console.log("user.save() completed");
// };

exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: "New beer drinker added!",
      data: user
    });
  });
};
