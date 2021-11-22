'use strict';

const express = require('express');
const routeGuard = require('../middleware/route-guard');

const upload = require('../config/cloudinary');

const router = express.Router();

router.post(
  '/single',
  routeGuard,
  upload.single('profilePicture'),
  async (req, res, next) => {
    if (req.file) {
      res.json(req.file.path);
    } else {
      res.json('');
    }
  }
);

router.post(
  '/multiple',
  routeGuard,
  upload.array('pictures', 15), //revise the max image limit
  async (req, res, next) => {
    console.log(req.files);
    if (req.files) {
      const paths = req.files.map((file) => file.path);
      res.json(paths);
    } else {
      res.json('');
    }
  }
);

module.exports = router;
