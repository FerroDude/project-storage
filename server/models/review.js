const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    reviewer: mongoose.ObjectId,
    storage: mongoose.ObjectId
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt'
    }
  }
);

module.exports = mongoose.model('Review', schema);
