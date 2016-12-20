var mongoose = require('mongoose');

var CheckinSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: String
  },
  crowdRating: {
    required: true,
    type: Number,
    min: 1,
    max: 5
  },
  coffeeShopId: {
    required: true,
    type: String
  },
  comment: {
    type: String,
    max: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Checkin', CheckinSchema);
