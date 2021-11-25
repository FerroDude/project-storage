'use strict';

require('dotenv').config();
const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Storage = require('../models/storage');
const sortStorageByProximity = require('../utils/sort-storage-by-proximity');

const router = express.Router();

//Temporary for testing
router.get('/listAll', async (req, res) => {
  const storages = await Storage.find({});
  res.json(storages);
});

router.post('/search', async (req, res, next) => {
  const { lng, lat, userCoords, filters } = req.body;
  try {
    const radius = filters.radius ? filters.radius : 10;

    const storages = await Storage.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius / process.env.EARTH_RADIUS]
        }
      },
      price: {
        $gte: filters.price ? filters.price[0] : 0,
        $lte: filters.price ? filters.price[1] : 2000
      },
      area: {
        $gte: filters.area ? filters.area[0] : 0,
        $lte: filters.area ? filters.area[1] : 10000
      }
    });

    const sortedStorages = [...sortStorageByProximity(storages, userCoords)];
    console.log(sortedStorages);
    res.json({ sortedStorages });
  } catch (err) {
    next(err);
  }
});

router.get('/mystorages', async (req, res, next) => {
  const storages = await Storage.find({ owner: req.user._id });
  res.json(storages);
});

router.get('/rented', async (req, res, next) => {
  const storages = await Storage.find({ renter: req.user._id });
  res.json(storages);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const storage = await Storage.findById(id);
  res.json(storage);
});

router.patch('/:id/rent', routeGuard, async (req, res, next) => {
  const { id } = req.params;
  const { isRented, renter } = req.body;
  const storage = await Storage.findByIdAndUpdate(
    id,
    {
      isRented,
      renter
    },
    { new: true }
  );
  res.json(storage);
});

router.patch('/:id', routeGuard, async (req, res, next) => {
  const { name, description, price, gallery } = req.body;
  const { id } = req.params;
  const storage = await Storage.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      gallery
    },
    { new: true }
  );
  res.json(storage);
});

router.delete('/:id', routeGuard, async (req, res, next) => {
  const { id } = req.params;
  const deletedStorage = await Storage.findByIdAndDelete(id);
  res.json(deletedStorage);
});

router.post('/', routeGuard, async (req, res, next) => {
  const { name, description, price, gallery, coordinates, width, length } =
    req.body;

  const storage = new Storage({
    name,
    description,
    owner: req.user._id,
    location: {
      coordinates: [coordinates.lng, coordinates.lat]
    },
    price,
    gallery,
    width,
    length,
    area: width * length
  });

  try {
    const newStorage = await storage.save();
    res.json(newStorage);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
