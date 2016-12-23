// Packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');

// Development
var logger = require('morgan');

// Config
var configDB = require('./config/database');

// Set Promise provider to bluebird
mongoose.Promise = require('bluebird');

// Local files
var authController = require('./controllers/auth');
var userController = require('./controllers/user');
var coffeeShopController = require('./controllers/coffeeShop');
var checkinController = require('./controllers/checkin');
var indexController = require('./controllers/index');

// Connect to DB
var mongo_url = configDB.mongo_url || process.env.MONGO_URL;
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
app.use(session({ secret: "loveislove" })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Create the Express router
var router = express.Router();

require('./config/passport')(passport);
require('./routes.js')(app, passport); // Load routes and pass in our app and fully configured passport

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
