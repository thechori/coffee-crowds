const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/user');

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.getLogin = (req, res) => {
  if (req.user) {
    // If the user is already logged in, redirect to the home page
    return res.redirect('/');
  }
  res.render('login', {
    title: 'Login',
    message: 'Welcome to the better Login page.'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
  // req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    console.log("ERROR LOGGING IN");
    console.log(errors);

    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

exports.getRegister = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('register');
};

exports.postRegister = (req, res, next) => {

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    isAdmin: false
  });

  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('error', { msg: 'Account with that username already exists..' });
      return res.redirect('/register');
    }

    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
};

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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio
  });

  user.save(function(err) {
    if (err)
      return res.send(err);

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
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.firstName) {
      user.profile.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.profile.lastName = req.body.lastName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.bio) {
      user.bio = req.body.bio;
    }

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

exports.getProfile = (req, res) => {
  res.render('profile');
};

exports.getProfileEdit = (req, res) => {
  res.render('profileEdit');
};

exports.postProfileEdit = (req, res) => {
  // Find User
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) { return res.send(err); }

    // Only change values that were supplied
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.picture) {
      user.profile.picture = req.body.picture;
    }
    if (req.body.firstName) {
      user.profile.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.profile.lastName = req.body.lastName;
    }
    if (req.body.location) {
      user.profile.location = req.body.location;
    }
    if (req.body.website) {
      user.profile.website = req.body.website;
    }
    if (req.body.bio) {
      user.profile.bio = req.body.bio;
    }

    user.save((err) => {
      if (err) { return res.send(err); }
      console.log("Successfully updated profile!");
      res.redirect('/profile');
    });
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.deleteUserById = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err) {
    if (err) { return res.send(err); }

    res.send("Successfully deleted User!");
  });
};
