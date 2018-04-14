var LoginModule = require("../modules/WalletModule");
var walletController = {};

walletController.getWalletById = function(req, res) {
    var walletId = req.params.walleId

    LoginModule.selectWalletById(walletId, function (err, users) {
        if (err) {
            res.json(err)
        }
        else {
            res.json(users)
        }
    })
}

walletController.getAllWallets = function(req, res) {
    LoginModule.getAllWallets(function (err, users) {
        if (err) {
            res.json(err)
        }
        else {
            res.json(users)
        }
    })
}


module.exports = walletController
