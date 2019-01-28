var express = require('express');
var router = express.Router();
var Artist = require('../../../models/artist');
var Account = require('../../../models/account')

/* request like bellow:
    GET /api/artist/all
*/
exports.artistFindAll = (req, res) => {
    var noArtist = (artists) => {
        if (!artists.length) {
            throw new Error('artist not found');
        } else {
            return artists;
        }
    }

    var respond = (artists) => {
        res.json({
            message: 'inquiry successfully',
            artists
        })
    }

    var onError = (error) => {
        res.status(500).json({
            message: error.message
        });
    }

    Artist.findAll()
    .then(noArtist)
    .then(respond)
    .catch(onError);
}

/* request like bellow:
    GET /api/artist/random
*/
exports.artistRandom = (req, res) => {
    var noArtist = (artists) => {
        if (!artists.length) {
            throw new Error('artist not found');
        } else {
            return artists;
        }
    }

    var respond = (artists) => {
        res.json({
            message: 'inquiry successfully',
            artists
        })
    }

    var onError = (error) => {
        res.status(500).json({
            message: error.message
        });
    }

    Artist.findRandom()
    .then(noArtist)
    .then(respond)
    .catch(onError);
}

/* request like bellow:
    GET /api/artist/findOneArtist/:artist_id
*/
exports.artistFindOne = (req,res) => {
    res.end();
}

/* request like bellow:
    GET /api/artist/findOneArtist/:artist_id
*/
exports.artistFindPortfolio = (req,res) => {
    res.end();
}

/* request like bellow:
    POST /api/artist/create
*/
exports.artistCreate = (req, res) => {

    var respond = (artist) => {
        res.json({
            message: 'create successfully',
            artist
        })
    }

    var onError = (error) => {
        res.status(500).json({
            message: error.message
        });
    }

    Account.findOneByUsername(req.decoded.username)
    .then((account) => {
        var payload = Object.assign(req.body, {account: account._id})
        console.log(account._id)
        Artist.create(payload)
    })
    .then(respond)
    .catch(onError);
}

/* request like bellow:
    PUT /api/artist/update/:artist_id
*/
exports.artistUpdate = (req,res) => {
    res.end();
}

/* request like bellow:
    GET /api/artist/delete/:artist_id
*/
exports.artistDelete = (req,res) => {
    res.end();
}