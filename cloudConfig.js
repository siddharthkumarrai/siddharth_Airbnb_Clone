const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

module.exports = cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
  });

module.exports.storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wandarlust_Development',
      formats: [`JPG`, `PNG`,`jpeg`]
    },
  });

