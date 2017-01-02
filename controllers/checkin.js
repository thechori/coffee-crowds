var Checkin = require('../models/checkin');
var CoffeeShop = require('../models/coffeeShop');

exports.postCheckins = function(req, res) {
  var checkin = new Checkin();

  checkin.userId = req.user._id;
  checkin.crowdRating = req.body.crowdRating;
  checkin.coffeeShopId = req.body.coffeeShopId;
  checkin.comment = req.body.comment;

  checkin.save(function(err) {
    if (err) { return res.send(err); }

    res.json({
      message: "Successfully created new checkin!",
      data: checkin
    });
  });
};

exports.getMyCheckins = function(req, res) {
  Checkin.find({
    userId: req.user._id
  }, function(err, checkins) {
    if (err) { return res.send(err); }

    res.json({
      message: "Grabbing MY Checkins!",
      data: checkins
    });
  });
};

exports.getCheckin = (req, res) => {
  Checkin.findOne({ _id: req.params.checkinId }, (err, checkin) => {
    if (err) { return res.send(err); }
    res.render('checkin', {
      checkin: checkin
    });
  });
};

exports.getNewCheckin = (req, res) => {
  // Grab the CoffeeShops for the dropdown menu
  CoffeeShop.find((err, coffeeShops) => {
    if (err) { return res.send(err); }
    res.render('checkinNew', {
      title: 'New Checkin',
      coffeeShops: coffeeShops
    });
  });
};

exports.getNewCheckinWithId = (req, res) => {
  // Grab the CoffeeShops for the dropdown menu
  CoffeeShop.find((err, coffeeShops) => {
    if (err) { return res.send(err); }
    res.render('checkinNew', {
      title: 'New Checkin',
      coffeeShops: coffeeShops,
      coffeeShopId: req.params.coffeeShopId
    });
  });
};

exports.postNewCheckin = (req, res) => {
  // return res.send(req.body); // works
  // return res.send(req.user._id); // works


  var checkin = new Checkin({
    userId: req.user._id,
    coffeeShopId: req.body.coffeeShopId,
    crowdRating: req.body.crowdRating,
    comment: req.body.comment
  });

  checkin.save((err) => {
    if (err) { return res.send(err); }
    res.redirect('/checkin/' + checkin._id);
  });
};

// FOR API
exports.getCheckins = function(req, res) {
  Checkin.find(function(err, checkins) {
    if (err) { return res.send(err); }

    res.json({
      message: "Grabbing ALL Checkins!",
      data: checkins
    });
  });
};

exports.getCheckinById = function(req, res) {
  Checkin.findById(req.params.checkinId, function(err, checkin) {
    if (err) { return res.send(err); }

    if (!checkin) { return res.send("No Checkin found.."); }

    res.json({
      message: "Checkin found!",
      data: checkin
    });
  });
};

exports.putCheckinById = function(req, res) {
  Checkin.findOne({
    _id: req.params.checkinId,
    userId: req.user._id
  }, function(err, checkin) {
    if (err) { return res.send(err); }

    if (!checkin) { return res.send("No Checkin found.."); }

    if (req.body.userId) {
      checkin.userId = req.body.userId;
    }
    if (req.body.crowdRating) {
      checkin.crowdRating = req.body.crowdRating;
    }
    if (req.body.coffeeShopId) {
      checkin.coffeeShopId = req.body.coffeeShopId;
    }
    if (req.body.comment) {
      checkin.comment = req.body.comment;
    }

    checkin.save(function(err) {
      if (err) { return res.send(err); }

      res.json({
        message: "Successfully PUT Checkin!",
        data: checkin
      });
    });
  });
};

exports.deleteCheckinById = function(req, res) {
  Checkin.remove({
    userId: req.user._id,
    _id: req.params.checkinId
  }, function(err) {
    if (err) { return res.send(err); }

    res.send("Successfully deleted Checkin!");
  });
};
