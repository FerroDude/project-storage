'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: true
    },
    lName: {
      type: String,
      trim: true,
      required: true
    },
    phoneNumber: {
      type: String,
      maxlength: 15,
      required: true
    },
    passwordHashAndSalt: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['tenant', 'landlord']
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } }
);

const User = mongoose.model('User', schema);

module.exports = User;
