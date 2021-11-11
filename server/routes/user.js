'use strict';

const express = require('express');
const routeGuard = require('../middleware/route-guard');
const User = require('./../models/user');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

router.get('/', (req, res, next) => {
  res.json(req.user);
});

router.patch('/', async (req, res, next) => {
  const { username, fName, lName, phoneNumber, email, location } = req.body;
  const id = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        fName,
        lName,
        phoneNumber,
        email,
        location
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete('/', async (req, res, next) => {
  const id = req.user._id;
  await User.findByIdAndDelete(id);
  res.json({});
});

module.exports = router;
