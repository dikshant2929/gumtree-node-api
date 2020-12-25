const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const imageUploadRoute = require('./image.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/category', categoryRoute);
router.use('/image', imageUploadRoute);



module.exports = router;
