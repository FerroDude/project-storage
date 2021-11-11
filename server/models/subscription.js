const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  nextBillinggDate: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  customerId: {
    type: String,
    default: false
  }
});

module.exports = mongoose.model('subscription', schema);
