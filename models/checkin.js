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
  },
  location: [Number]
}, {
  timestamps: true
});

// Index the location
CheckinSchema.index({ location: '2d' });

module.exports = mongoose.model('Checkin', CheckinSchema);
