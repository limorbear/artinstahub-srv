var router = require('express').Router();
var authMiddleware = require('../../middlewares/auth')
var auth = require('./auth');
var artist = require('./artist');
var account = require('./account');

router.use('/auth', auth);
router.use('/artist', artist);
router.use('/account', authMiddleware);
router.use('/account', account);

module.exports = router;