'use strict';

const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Storage = require('../models/storage');

const router = express.Router();

router.get('/list/', async (req, res, next) => {});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const storage = Storage.findById(id);
  res.json(storage);
});

router.patch('/:id', routeGuard, async (req, res, next) => {
  const { name, description, price, gallery } = req.body;
  const { id } = req.params;
  const storage = Storage.findByIdAndUpdate(id, {
    name,
    description,
    price,
    gallery
  });
  res.json(storage);
});

router.delete('/:id', routeGuard, async (req, res, next) => {
  const { id } = req.params;
  const deletedStorage = await Storage.findByIdAndDelete(id);
  res.json({ deletedStorage });
});

router.post('/', routeGuard, async (req, res, next) => {
  const { name, description, location, price, gallery } = req.body;
  const storage = new Storage({
    name,
    description,
    owner: req.user._id,
    location,
    price,
    gallery
  });

  const newStorage = await storage.save();
  res.json(newStorage);
});

module.exports = router;
