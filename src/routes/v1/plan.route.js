const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const planValidation = require('../../validations/plan.validation');
const planController = require('../../controllers/plan.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createPlan'), validate(planValidation.createPlan), planController.createPlan)
  .get(auth('getPlan'), validate(planValidation.getPlan), planController.getPlan);

router
  .route('/:planId')
  .get(auth('getPlan'), validate(planValidation.getPlan), planController.getPlan)
  .patch(auth('updatePlan'), validate(planValidation.updatePlan), planController.updatePlan)
  
module.exports = router;
