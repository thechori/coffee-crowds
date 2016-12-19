var Checkin = require('../models/checkin');

exports.postCheckins = function(req, res) {
  var checkin = new Checkin();

  checkin.crowdRating = req.body.crowdRating;
  checkin.userId = req.user._id;

  checkin.save(function(err) {
    if (err) { return res.send(err); }

    res.json({
      message: "Successfully created new checkin!",
      data: checkin
    });
  });
};

exports.getCheckins = function(req, res) {
  Checkin.find({
    userId: req.user._id
  }, function(err, checkins) {
    if (err) { return res.send(err); }

    res.json({
      message: "Grabbing Checkins!",
      data: checkins
    });
  });
};

exports.getCheckinById = function(req, res) {

};

exports.putCheckinById = function(req, res) {

};

exports.deleteCheckinById = function(req, res) {

};
