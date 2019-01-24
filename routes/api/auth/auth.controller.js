var jwt = require('jsonwebtoken');
var Account = require('../../../models/account');

/* request like bellow:
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
    console.log(req.body)
    var { username, password } = req.body;
    var newAccount = null;

    //create a new account
    var create = (account) => {
        if (account) { //아이디 중복
            throw new Error('same username exists');
        } else {
            return Account.create(username, password);
        }
    }

    var count = (account) => {
        newAccount = account;
        return Account.count({});
    }

    var assign = (count) => {
        if (count === 1) {
            return newAccount.assignAdmin();
        } else {
            return Promise.resolve(false);
        }
    };

    const respond = (isAdmin) => {
        res.json({
            message: 'registerd successfully',
            admin: isAdmin ? true : false
        });
    };

    var onError = (error) => {
        res.status(409).json({
            message: error.message
        });
    };

    Account.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
}

/* request like bellow:
    POST /api/auth/login
    {
        username,
        password
    }
*/
exports.login = (req, res) => {
    var { username, password } = req.body;
    var secret = req.app.get('jwt-secret');

    var check = (account) => {
        if(!account) {
            //계정이 존재하지 않음
            throw new Error('계정이 존재하지 않거나 비밀번호가 잃지하지 않음');            
        } else {
            //계정이 존재함
            if(account.verify(password)) {
                //비밀번호 일치
                var p = new Promise ((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: account._id,
                            username: account.username,
                            admin: account.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: '',
                            subject: 'userInfo'
                        },
                        (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        })
                })
                return p;
            } else {
                throw new Error('계정이 존재하지 않거나 비밀번호가 잃지하지 않음');
            }
        }
    }

    var respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        });
    };
    
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        });
    };
    
    Account.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError);
}

/* request like bellow:
    GET /api/auth/check
*/
exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    });
}