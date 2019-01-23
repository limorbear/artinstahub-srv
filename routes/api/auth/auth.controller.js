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
