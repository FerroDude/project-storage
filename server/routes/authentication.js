'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

const router = express.Router();

router.post('/sign-up', async (req, res, next) => {
  const {
    username,
    fName,
    lName,
    phoneNumber,
    email,
    role,
    lon,
    lat,
    password
  } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      fName,
      lName,
      phoneNumber,
      email,
      role,
      location: [lon, lat],
      passwordHash
    });

    const newUser = await user.save();

    req.session.userId = newUser._id;
    res.json({ newUser });
  } catch (err) {
    next(err);
  }
});

router.post('/sign-in', async (req, res, next) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({ emailOrUsername }).or([
      { username: emailOrUsername },
      { email: emailOrUsername }
    ]);

    const authorized =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && authorized)) {
      throw new Error('Wrong username or password');
    }

    req.session.userId = user._id;

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
