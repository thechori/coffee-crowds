// Load required packages
var mongoose = require('mongoose');

// Define Schema
var CoffeeShopSchema = new mongoose.Schema({
  name: String,
  userId: String,
  address: String,
}, {
  timestamps: true
});

// Export Schema
module.exports = mongoose.model('CoffeeShop', CoffeeShopSchema);
