const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  subscription: {
    type: mongoose.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  successful: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Charge', schema);
