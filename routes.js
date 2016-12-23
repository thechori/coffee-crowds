var indexController = require('./controllers/index');

module.exports = function(app, passport) {
  app.get('/', indexController.index);

  app.get('/login', indexController.showLoginPage);
  app.post('/login', indexController.login);

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  }));
};

function isLoggedIn(req, res, next) {

}
