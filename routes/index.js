var express = require('express');
var router = express.Router();
var Artist = require('../models/artist')

// GET ARTISTS LIST
router.get('/api/artists/', function(req,res){
  Artist.findAll()
    .then((artists) => {
      if (!artists.length) return res.status(404).send({ err: 'Artist not found' });
      res.send(artists);
    })
  .catch(err => res.status(500).send(err));
});

router.get('/api/artists/random', function(req,res){
  Artist.findRandom()
    .then((artists) => {
      if (!artists.length) return res.status(404).send({ err: 'Artist not found' });
      res.send(artists);
    })
  .catch(err => res.status(500).send(err));
});

// GET A PORTFOLIO OF AN ARTIST (입력된 작가의 경우; 입력되지 않았으면 false 반환)
router.get('/api/artist/portfolio/:artist_id', function(req, res){
    res.end();
});

// GET A PROFILE OF AN ARTIST 
router.get('/api/artist/:artist_id', function(req, res){
    res.end();
});

// CREATE AN ENTRY ABOUT AN ARTIST
router.post('/api/artist/', function(req, res){
  Artist.create(req.body)
    .then(artist => res.send(artist))
    .catch(err => res.status(500).send(err))
});

// UPDATE THE ARTIST'S ENTRY
router.put('/api/artist/:artist_id', function(req, res){
    res.end();
});

// DELETE THE ENTRY
router.delete('/api/artist/:artist_id', function(req, res){
    res.end();
});

module.exports = router;