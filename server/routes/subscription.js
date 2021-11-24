'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Subscription = require('./../models/subscription');
const stripe = require('./../api/stripe/api');

router.get('/', routeGuard, async (req, res, next) => {
  const { id } = req.body;
  try {
    const subscription = await Subscription.findOne({
      storage: id,
      active: true
    });
    res.json(subscription);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { paymentMethodToken, storage, duration } = req.body;
  try {
    const customer = await stripe.customers.create({
      name: req.user.name,
      email: req.user.email,
      payment_method: paymentMethodToken
    });
    const subscription = await Subscription.create({
      user: req.user._id,
      startDate: new Date(),
      nextBillingDate: new Date(),
      duration,
      active: true,
      customerId: customer.id,
      storage,
      paymentMethodToken
    });
    res.json(subscription);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', routeGuard, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Subscription.deleteOne({ storage: id });
    res.json({});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
