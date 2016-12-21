var indexController = require('./controllers/index');

module.exports = function(app, passport) {
  app.get('/', indexController.index);

  app.get('/login', function(req, res) {
    res.render('login', {
      message: req.flash('loginMessage')
    });
  });
};
