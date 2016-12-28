var Checkin = require('../models/checkin');

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
