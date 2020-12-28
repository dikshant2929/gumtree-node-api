const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { planService } = require('../services');

const createPlan = catchAsync(async (req, res) => {
  const plan = await planService.createPlan(req.body);
  res.status(httpStatus.CREATED).send(plan);
});

const getPlan = catchAsync(async (req, res) => {
  const result = await planService.getPlan(req.params.planId ? req.params.planId : "" , req.query);
  res.send(result);
});


const updatePlan = catchAsync(async (req, res) => {
  const plan = await planService.updatePlanById(req.params.planId, req.body);
  res.send(plan);
});

module.exports = {
  createPlan,
  getPlan,
  updatePlan
};
