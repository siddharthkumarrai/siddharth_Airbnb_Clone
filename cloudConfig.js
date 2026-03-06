const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

// Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wandarlust_Development',
        allowedFormats: ['jpg', 'png', 'jpeg'] // 'formats' ki jagah 'allowedFormats' use karein
    },
});

module.exports = {
    cloudinary,
    storage
};