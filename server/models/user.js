'use strict';

const mongoose = require('mongoose');
const validateEmail = require('../utils/email-validator');
const capitalize = require('../utils/capitalize');

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    fName: {
      type: String,
      trim: true,
      required: true,
      set: capitalize
    },
    lName: {
      type: String,
      trim: true,
      required: true,
      set: capitalize
    },
    phoneNumber: {
      type: String,
      maxlength: 15,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmail,
        message: 'Please enter a valid email address.'
      }
    },
    passwordHash: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      default: null
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
