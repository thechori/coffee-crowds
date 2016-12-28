// Packages
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var dotenv = require('dotenv');
var expressValidator = require('express-validator');


// Development
var logger = require('morgan');

// Set Promise provider to bluebird -- THIS MAY CONFLICT WITH HACKATHON-STARTER CODE
mongoose.Promise = require('bluebird');

// Local files
var authController = require('./controllers/auth');
var userController = require('./controllers/user');
var coffeeShopController = require('./controllers/coffeeShop');
var checkinController = require('./controllers/checkin');
var indexController = require('./controllers/index');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

// Connect to DB
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// Initialize the app
var app = express();

// Set view engine
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(expressValidator());
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport
/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Create the Express router
var router = express.Router();

// Define router endpoints
router.route('/coffeeShops')
  .get(authController.isAuthenticated, coffeeShopController.getCoffeeShops)
  .post(authController.isAuthenticated, coffeeShopController.postCoffeeShops)

router.route('/coffeeShops/:coffeeShopId')
  .get(authController.isAuthenticated, coffeeShopController.getCoffeeShopById)
  .put(authController.isAuthenticated, coffeeShopController.putCoffeeShopById)
  .delete(authController.isAuthenticated, coffeeShopController.deleteCoffeeShopById)

router.route('/users')
  .get(authController.isAuthenticated, userController.getUsers)
  .post(userController.postUsers)

router.route('/users/:userId')
  .get(authController.isAuthenticated, userController.getUserById)
  .put(authController.isAuthenticated, userController.putUserById)
  .delete(authController.isAuthenticated, userController.deleteUserById)

router.route('/checkins')
  .get(authController.isAuthenticated, checkinController.getCheckins)
  .post(authController.isAuthenticated, checkinController.postCheckins)

router.route('/checkins/:checkinId')
  .get(authController.isAuthenticated, checkinController.getCheckinById)
  .put(authController.isAuthenticated, checkinController.putCheckinById)
  .delete(authController.isAuthenticated, checkinController.deleteCheckinById)

router.route('/mycheckins')
  .get(authController.isAuthenticated, checkinController.getMyCheckins)

// Register the routes object
app.use('/api', router);

// From routes.js
app.get('/', indexController.index);

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);

app.get('/register', function(req, res) {
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

app.get('/profile', function(req, res) {
  res.render('profile', {
    user: req.user
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
// End from routes.js

// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
