var mongoose = require('mongoose');

var CheckinSchema = new mongoose.Schema({
  userId: String,
  createdAt: Date,
  crowdRating: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Checkin', CheckinSchema);
