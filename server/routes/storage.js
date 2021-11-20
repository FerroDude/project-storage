'use strict';

require('dotenv').config();
const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Storage = require('../models/storage');
const sortStorageByProximity = require('..//utils/sort-storage-by-proximity');

const router = express.Router();

//Temporary for testing
router.get('/listAll', async (req, res) => {
  const storages = await Storage.find({});
  res.json(storages);
});

/* router.get('/list/', async (req, res, next) => {
  const user = req.user;
  const [guestLon, guestLat] = req.params;

  if (user) {
    const [lon, lat] = user.location.coordinates;

    try {
      const storages = await Storage.find({
        location: {
          $geoWithin: {
            $centerSphere: [[lon, lat], 10 / process.env.EARTH_RADIUS]
          }
        }
      });

      const sortedStorages = sortStorageByProximity(storages, lon, lat);
      res.json(sortStorageByProximity(sortedStorages, lon, lat));
    } catch (err) {
      next(err);
    }
  } else {
    if (guestLon && guestLat) {
      try {
        const storages = await Storage.find({
          location: {
            $geoWithin: {
              $centerSphere: [
                [guestLon, guestLat],
                10 / process.env.EARTH_RADIUS
              ]
            }
          }
        });

        const sortedStorages = sortStorageByProximity(
          storages,
          guestLon,
          guestLat
        );
        res.json(sortStorageByProximity(sortedStorages, guestLon, guestLat));
      } catch (err) {
        next(err);
      }
    } else {
      const storages = await Storage.find()
        .sort({ 'rating.average': -1 })
        .limit(10);
      res.json(storages);
    }
  }
}); */

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
  console.log(req.body);
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
    length
  });

  try {
    const newStorage = await storage.save();
    res.json(newStorage);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
