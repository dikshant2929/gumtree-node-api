const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const AdValidation = require('../../validations/ad.validation');
const adController = require('../../controllers/ad.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createAd'), validate(AdValidation.createAd), adController.createAd)
  .get(auth('getAd'), validate(AdValidation.getAd), adController.getAd);

router
  .route('/:adId')
  .get(auth('getAd'), validate(AdValidation.getAd), adController.getAd)
  .patch(auth('updateAd'), validate(AdValidation.updateAd), adController.updateAd)
  .delete(auth('deleteAd'), validate(AdValidation.deleteAd), adController.deleteAd);

module.exports = router;
