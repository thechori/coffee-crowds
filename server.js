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
var chalk = require('chalk');

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
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

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
app.get('/register', userController.getRegister);
app.post('/register', userController.postRegister);
app.get('/profile', userController.isAuthenticated, userController.getProfile);
app.get('/profile/edit', userController.isAuthenticated, userController.getProfileEdit);
app.post('/profile/edit', userController.isAuthenticated, userController.postProfileEdit);
app.get('/logout', userController.logout);

app.get('/coffeeShop/:coffeeShopId', coffeeShopController.getCoffeeShop);
app.get('/checkin/:checkinId', checkinController.getCheckin);

app.get('/newCoffeeShop', coffeeShopController.getNewCoffeeShop);
app.post('/newCoffeeShop', coffeeShopController.postNewCoffeeShop);
app.get('/newCheckin', checkinController.getNewCheckin);
app.get('/newCheckin/:coffeeShopId', checkinController.getNewCheckinWithId);
app.post('/newCheckin', checkinController.postNewCheckin);
// End from routes.js

// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
