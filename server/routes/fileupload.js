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
    console.log(req.file);
    res.json(req.file.path);
  }
);

router.post(
  '/multiple',
  routeGuard,
  upload.array('pictures', 10), //revise the max image limit
  async (req, res, next) => {
    const paths = req.files.map((file) => file.path);
    res.json(paths);
  }
);

module.exports = router;
