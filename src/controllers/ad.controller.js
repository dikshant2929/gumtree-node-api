const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { adService } = require('../services');

const createAd = catchAsync(async (req, res) => {
  const ad = await adService.createAd(req.body);
  res.status(httpStatus.CREATED).send(ad);
});

const getAd = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
  
    const result = await adService.getAd(req.params.adId ? req.params.adId : "" , filter , options);
    res.send(result);
});


const updateAd = catchAsync(async (req, res) => {
  const ad = await adService.updateAdById(req.params.adId, req.body);
  res.send(ad);
});

const deleteAd = catchAsync(async (req, res) => {
  const ad = await adService.deleteAdById(req.params.adId);
  res.send(ad);
});

module.exports = {
  createAd,
  getAd,
  updateAd,
  deleteAd,
};
