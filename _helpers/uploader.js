const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dmeigxy1t',
    api_key: '678577587938757',
    api_secret: 'lyMl0JcL6LTlhn2Knz_k-LV_Geg'
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DEV",
    },
});

module.exports = multer({ 
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    }, 
});
