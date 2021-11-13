const mongoose = require('mongoose');

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
      type: mongoose.ObjectId,
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
    },
    rating: {
      type: [Number]
    },
    review: {
      type: [mongoose.ObjectId]
    }
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } }
);

module.exports = mongoose.model('storage', schema);
