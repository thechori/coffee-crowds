var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Expose this functionality to our app
module.exports = function(passport) {

  // Serialize the User for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the User
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, done) {
      if (err) { return res.send(err); }

      done(err, user);
    });
  });

  // Local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'username': username }, function(err, user) {
        if (err) { return done(err); }

        // Check if username is already taken
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken..'));
        } else {
          // Create the User
          var newUser = new User();
          newUser.username = username;
          newUser.password = newUser.generateHash(password);

          // Save the User
          newUser.save(function(err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));
};
