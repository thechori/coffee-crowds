var indexController = require('./controllers/index');
var User = require('./models/user');
var passport = require('passport');

module.exports = function(app, passport) {
  app.get('/', indexController.index);

  app.get('/login', indexController.showLoginPage);
  app.post('/login', passport.authenticate('local'), indexController.login);

  app.get('/register', isLoggedIn, function(req, res) {
    res.render('register');
  });
  app.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
      if (err) { return res.send(err); }

      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    });
  });

  // Utilizes the isLoggedIn middlware function to ensure that
  // the User is logged in before accessing this page
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user: req.user
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })
};

// Route middleware to ensure a User is logged in
function isLoggedIn(req, res, next) {
  console.log("isLoggedIn");

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
