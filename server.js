// Packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Local files
var authController = require('./controllers/auth');
var userController = require('./controllers/user');
var coffeeShopController = require('./controllers/coffeeShop');

// Config
var config = require('./config.json');

// Connect to DB
var mongo_url = config.mongo_url || process.env.MONGO_URL;
mongoose.connect(mongo_url, function(err) {
  if (err)
    return console.log(err);
});

// Initialize the app
var app = express();

// Use body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create the Express router
var router = express.Router();

// Define router endpoints
router.route('/coffeeShops')
  .get(authController.isAuthenticated, coffeeShopController.getCoffeeShops)
  .post(authController.isAuthenticated, coffeeShopController.postCoffeeShops)

router.route('/users')
  .get(authController.isAuthenticated, userController.getUsers)
  .post(authController.isAuthenticated, userController.postUsers)

// Register the routes
app.use('/api', router);

// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
