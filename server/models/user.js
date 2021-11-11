'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true
    },
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
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } }
);

const User = mongoose.model('User', schema);

module.exports = User;
