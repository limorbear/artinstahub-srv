var router = require('express').Router();
var controller = require('./auth.controller');

router.post('/register', controller.register);

module.exports = router;