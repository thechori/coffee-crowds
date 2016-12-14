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
