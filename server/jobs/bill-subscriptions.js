const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const mongoose = require('mongoose');
const Subscription = require('../models/subscription');
const Storage = require('../models/storage');
const stripe = require('./../api/stripe/api');
const addMonth = require('../utils/add-month');

const MONGODB_URI = process.env.MONGODB_URI;

const billSubscriptions = async () => {
  const subscriptions = await Subscription.find({
    nextBillingDate: { $lte: new Date() }
  });

  for (const subscription of subscriptions) {
    const storage = await Storage.findById(subscription.storage);

    const { price } = storage;
    const { duration } = subscription;

    try {
      await stripe.paymentIntents.create({
        amount: price * duration * 100,
        currency: 'eur',
        customer: subscription.customerId,
        payment_method: subscription.paymentMethodToken,
        confirm: true,
        error_on_requires_action: true
      });
      await Subscription.findByIdAndUpdate(subscription._id, {
        active: true,
        nextBillingDate: addMonth(new Date(Date.now()))
      });
    } catch (error) {
      console.log('There was an error processing payment.');
      console.log(error);
      await Subscription.findByIdAndUpdate(subscription._id, { active: false });
    }
  }
};

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    return billSubscriptions();
  })
  .catch((error) => {
    console.error(`Error connecting the database to URI "${MONGODB_URI}"`);
    process.exit(1);
  })
  .finally(() => {
    mongoose.disconnect();
  });
