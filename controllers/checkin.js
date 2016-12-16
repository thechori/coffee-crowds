var Checkin = require('../models/checkin');

exports.postCheckins = function(req, res) {
  var checkin = new Checkin();

  checkin.createdAt = new Date();
  checkin.crowdRating = req.body.crowdRating;
  checkin.userId = req.user._id;

  checkin.save(funcion(err) {
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

    res.send(checkins);
  });
};
