// Load required packages
var CoffeeShop = require('../models/coffeeShop');
var Checkin = require('../models/checkin');

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
    if (err) { return res.send(err); }

    res.json({
      message: "Successfully created CoffeeShop!",
      data: coffeeShop
    })
  });
};

exports.getCoffeeShop = (req, res) => {
  // Find the CoffeeShop
  CoffeeShop.findOne({ _id: req.params.coffeeShopId }, (err, coffeeShop) => {
    if (err) { return res.send(err); }

    // Find the Checkins for the CoffeeShop
    Checkin.find({ coffeeShopId: req.params.coffeeShopId }, (err, checkins) => {
      if (err) { return res.send(err); }

      res.render('coffeeShop', {
        coffeeShop: coffeeShop,
        checkins: checkins
      });
    });
  });
};

exports.getNewCoffeeShop = (req, res) => {
  res.render('coffeeShopNew');
};

exports.postNewCoffeeShop = (req, res) => {

  let coffeeShop = new CoffeeShop({
    userId: req.user._id,
    name: req.body.name,
    address: req.body.address,
    location: [req.body.lon, req.body.lat]
  });

  coffeeShop.save((err) => {
    if (err) { return res.send(err); }
    return res.redirect('/coffeeShop/' + coffeeShop._id);
  });
};

// FOR API
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
    _id: req.params.coffeeShopId,
    userId: req.user._id
  }, function(err) {
    if (err) { return res.send(err); }

    res.json({
      message: "Successfully removed CoffeeShop!"
    });
  });
};

exports.getCurrentCrowdRatingById = function(req, res) {
  var now = new Date();
  var start = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours

  CoffeeShop.findById(req.params.coffeeShopId, function(err, coffeeShop) {
    if (err) { return res.send(err); }

    // Grab all Checkins with this coffeeShopId that have been
    // created within the last 3 hours
    Checkin.find({
      _id: coffeeShop._id,
      createdAt: {
        $gt: start
      }
    }, function(err, checkins) {
      if (err) { return res.send(err); }

      if (!checkins) { return res.send("No Checkins found!"); }

      // Return the Checkins found
      res.json({
        message: "Checkins from the past 3 hours have been found!",
        data: checkins
      });
    });
  });
};
