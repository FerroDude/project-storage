const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'storage-app'
  }
});

const upload = multer({ storage });

module.exports = upload;
