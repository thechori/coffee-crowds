// Packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Config
var config = require('./config.json');

// Connect to DB
var mongo_url = config.mongo_url || process.env.MONGO_URL;
console.log("")
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


// Register the routes


// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
