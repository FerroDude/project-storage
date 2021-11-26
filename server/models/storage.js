const mongoose = require('mongoose');

// const ratingSchema = new mongoose.Schema({
//   ratings: [Number],
//   average: {
//     type: Number,
//     default: 0
//   }
// });

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
    price: { type: Number, required: true },
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
    area: Number,
    rating: [Number],
    average: {
      type: Number,
      default: 0
    },
    review: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Review'
    }
    // TODO : we might want to iterate over the rating array in the rating property of the storage model and used array.reduce to sum all the ratings and divide by the number of ratings in that array
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' } }
);

const Storage = mongoose.model('Storage', schema);

Storage.ensureIndexes({
  location: '2dSphere'
});

module.exports = mongoose.model('Storage', schema);
