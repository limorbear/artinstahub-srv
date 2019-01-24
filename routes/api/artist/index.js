var router = require('express').Router();
var controller = require('./artist.controller');
var authMiddleware = require('../../../middlewares/auth')

router.get('/all', controller.artistFindAll);
router.get('/random', controller.artistRandom);
router.get('/:artist_id', controller.artistFindOne);
router.get('/portfolio/:artist_id', controller.artistFindPortfolio);

router.use('/create', authMiddleware);
router.post('/create', controller.artistCreate);

router.use('/update', authMiddleware);
router.put('/update', controller.artistUpdate);

router.use('/delete', authMiddleware);
router.delete('/delete', controller.artistDelete);

module.exports = router;