var router = require('express').Router();
var controller = require('./account.controller');

router.get('/list', controller.list);
router.post('/assign-admin/:username', controller.assignAdmin);

module.exports = router;