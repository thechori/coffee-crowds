// Packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var dotenv = require('dotenv');

// Development
var logger = require('morgan');

// Set Promise provider to bluebird
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
var mongo_url = process.env.MONGOLAB_URI;
mongoose.connect(mongo_url, function(err) {
  if (err)
    return console.log(err);
});

// Initialize the app
var app = express();

// Set view engine
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport
app.use(require('express-session')({
  secret: 'pokemon1',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./routes.js')(app, passport); // Load routes and pass in our app and fully configured passport


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

// Register the routes
app.use('/api', router);

// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
