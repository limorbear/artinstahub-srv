var router = require('express').Router();
var auth = require('./auth');

router.use('/auth', auth);

module.exports = router;