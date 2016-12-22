var indexController = require('./controllers/index');

module.exports = function(app, passport) {
  app.get('/', indexController.index);

  app.get('/login', indexController.login);

  app.route('/loginz')
    .get(function(req, res) {
      return res.send("You can't eat all of those cheeseburgers..");
    })
    .post(function(req, res) {
      return res.send(req.body);
    })
};
