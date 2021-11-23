const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  nextBillingDate: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  customerId: {
    type: String,
    required: true
  },
  storage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Storage',
    required: true
  },
  paymentMethodToken: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Subscription', schema);
