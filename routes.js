var indexController = require('./controllers/index');

module.exports = function(app, passport) {
  app.get('/', indexController.index);

  app.get('/login', isLoggedIn, indexController.showLoginPage);
  app.post('/login', passport.authenticate('local'), indexController.login);

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  }));

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
  if (req.isAuthenticated) {
    return next();
  } else {
    return redirect('/login');
  }
}
