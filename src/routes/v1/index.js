const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const adminRoute = require('./admin.route');

const router = express.Router();

router.use('/', adminRoute);
router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);

module.exports = router;
