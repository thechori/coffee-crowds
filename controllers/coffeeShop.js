// Load required packages
var CoffeeShop = require('../models/coffeeShop');

exports.getCoffeeShops = function(req, res) {
  CoffeeShop.find({
    userId: req.user._id
  }, function(err, coffeeShops) {
    if (err) { res.send(err); }

    res.send(coffeeShops);
  });
};

exports.postCoffeeShops = function(req, res) {
  var coffeeShop = new CoffeeShop();

  coffeeShop.name = req.body.name;
  coffeeShop.userId = req.user._id;
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
  CoffeeShop.find({
    _id: req.params.coffeeShopId,
    userId: req.user._id
  }, function(err, coffeeShop) {
    if (err) { return res.send(err); }

    res.json({
      message: "Successfully retrieved CoffeeShop!",
      data: coffeeShop
    });
  });
};

exports.putCoffeeShopById = function(req, res) {
  CoffeeShop.findOne({
    _id: req.params.coffeeShopId,
    userId: req.user._id
  }, function(err, coffeeShop) {
    if (err) { return res.send(err); }

    if (!coffeeShop) { return res.send("No CoffeeShop found.."); }

    // Update information using the request's body parameters
    // Only update field if it has been included in body of request
    if (req.body.name) {
      coffeeShop.name = req.body.name;
    }
    if (req.body.userId) {
      coffeeShop.userId = req.body.userId;
    }
    if (req.body.address) {
      coffeeShop.address = req.body.address;
    }

    // Save CoffeeShop
    coffeeShop.save(function(err) {
      if (err) { return res.send(err); }

      res.json({
        message: "Successfully PUT CoffeeShop by ID!",
        data: coffeeShop
      })
    });
  });
};

exports.deleteCoffeeShopById = function(req, res) {
  CoffeeShop.remove({
    _id: req.body.coffeeShopId,
    userId: req.user._id
  }, function(err) {
    if (err) { return res.send(err); }

    res.json({
      message: "Successfully removed CoffeeShop!"
    });
  });
};
