// Load required packages
var CoffeeShop = require('../models/coffeeShop');

exports.getCoffeeShops = function(req, res) {
  CoffeeShop.find({}, function(err, coffeeShops) {
    if (err) { res.send(err); }

    res.send(coffeeShops);
  });
};

exports.postCoffeeShops = function(req, res) {
  var coffeeShop = new CoffeeShop();

  coffeeShop.name = req.body.name;
  coffeeShop.ownerId = req.body.ownerId;
  coffeeShop.address = req.body.address;

  // Save
  coffeeShop.save(function(err) {
    if (err) { res.send(err); }

    res.json({
      message: "Successfully created CoffeeShop!",
      data: coffeeShop
    })
  });
};

exports.getCoffeeShopById = function(req, res) {
  CoffeeShop.findOne({
    _id: req.params.coffeeShopId
  }, function(err, coffeeShop) {
    if (err) { return res.send(err); }

    res.json({
      message: "Successfully retrieved CoffeeShop!",
      data: coffeeShop
    });
  });
};

exports.putCoffeeShopById = function(req, res) {

};

exports.deleteCoffeeShopById = function(req, res) {

};
