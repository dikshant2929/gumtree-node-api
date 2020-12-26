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
    let result = {};
    if(req.params.adId){
        result = await adService.getAdById(req.params.adId);
    } else{
        const filter = pick(req.query, ['active', 'is_deleted']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);    
        result = await adService.getAd(filter , options);
    }
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
