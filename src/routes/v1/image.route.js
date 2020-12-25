const express = require('express');

const ImageController = require('../../controllers/image.controller');

const router = express.Router();

const multer  = require('multer');

const config = require('../../config/config');

// const upload = multer({ dest: 'static/uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.file.imageUploadPath);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  });

var upload = multer({
    storage: storage,
    limits: {
        fileSize: config.file.imageSize, // 2 MB
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

router.post("/uploadImage", upload.single('file'), ImageController.uploadImage);
router.delete("/deleteImage/:id", ImageController.deleteImage);

module.exports = router;



