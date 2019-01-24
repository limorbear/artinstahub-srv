var Account = require('../../../models/account');

/* request like bellow:
    GET /api/artist/all
*/

exports.list = (req, res) => {
    //관리자 여부 확인
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    Account.find({})
    .then(
        (accounts) => {
            res.json({ accounts });
        }
    )
}

/* request like bellow:
    POST /api/user/assign-admin/:username
*/
exports.assignAdmin = (req, res) => {
    //관리자 여부 확인
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    
    Account.findOneByUsername(req.params.username)
    .then(
        (account) => account.assignAdmin
    ).then(
        res.json({
            success: true,
            messgae: "assign admin level successfully"
        })
    )
}