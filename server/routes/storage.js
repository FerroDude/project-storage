'use strict';

require('dotenv').config();
const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Storage = require('../models/storage');
const sortStorageByProximity = require('..//utils/sort-storage-by-proximity');
const getLngLat = require('../api/google/geoLocation');

const router = express.Router();

router.get('/list/', async (req, res, next) => {
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
});

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
  const { name, description, price, gallery } = req.body.information;
  const { lng, lat } = getLngLat(req.body.address);

  const storage = new Storage({
    name,
    description,
    owner: req.user._id,
    location: {
      coordinates: {
        lon: lng,
        lat: lat
      }
    },
    price,
    gallery
  });

  const newStorage = await storage.save((err, storage) => {
    if (err) {
      next(err);
    }
  });
  res.json(newStorage);
});

module.exports = router;
