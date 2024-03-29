// Load required packages
var mongoose = require('mongoose');

// Define Schema
var CoffeeShopSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    max: 50
  },
  userId: {
    required: true,
    type: String
  },
  address: {
    required: true,
    type: String,
    max: 50
  }
}, {
  timestamps: true
});

// Export Schema
module.exports = mongoose.model('CoffeeShop', CoffeeShopSchema);
