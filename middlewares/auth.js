var jwt = require('jsonwebtoken');

var authMiddleware = (req, res, next) => {
    var token = req.headers['x-access-token'] || req.query.token;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'please login first'
        });
    }

    var p = new Promise((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if (err) reject(err);
            resolve (decoded);
        });
    })

    var onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        });
    }

    p.then((decoded) => {
        req.decoded = decoded;
        next()
    }).catch(onError);
}

module.exports = authMiddleware;