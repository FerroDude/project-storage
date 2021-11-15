const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  ratings: [Number],
  average: Number
});

const schema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    location: {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [
        {
          type: Number
        }
      ]
    },
    price: { type: String, required: true },
    gallery: {
      type: [String]
    },
    isRented: {
      type: Boolean,
      default: false
    },
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    width: {
      type: Number,
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    rating: [ratingSchema],
    review: {
      type: [mongoose.ObjectId]
    }
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } }
);

const Storage = mongoose.model('Storage', schema);

Storage.ensureIndexes({
  location: '2dSphere'
});

module.exports = mongoose.model('Storage', schema);
