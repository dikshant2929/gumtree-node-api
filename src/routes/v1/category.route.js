const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/user.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createCategory'), validate(categoryValidation.createCategory), categoryController.createCategory)
  .get(auth('getCategory'), validate(categoryValidation.getCategory), categoryController.getCategory);

router
  .route('/:categoryId')
  .get(auth('getCategory'), validate(categoryValidation.getCategory), categoryController.getCategory)
  .patch(auth('updateCategory'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth('deleteCategory'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;
