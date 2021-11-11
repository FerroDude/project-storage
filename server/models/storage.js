const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 160,
    required: true
  },
  owner: {
    type: mongoose.ObjectId,
    required: true
  },
  location: {
    type: 'Point',
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: { type: String, required: true },
  galery: {
    type: [String]
  },
  isRented: {
    type: Boolean,
    default: false
  },
  renter: {
    type: mongoose.ObjectId,
    default: null
  },
  width: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('storage', schema);
