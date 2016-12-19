var mongoose = require('mongoose');

var CheckinSchema = new mongoose.Schema({
  userId: String,
  crowdRating: {
    type: Number,
    min: 1,
    max: 5
  },
  coffeeShopId: String,
  comment: {
    type: String,
    max: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Checkin', CheckinSchema);
