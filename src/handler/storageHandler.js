const multer  = require("multer");
const crypto = require('crypto');
const path = require('path');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "src/uploads");
    },
    filename: (req, file, cb) =>{
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(4).toString('hex');
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

module.exports = storageConfig;