var mysqlDb = require('../database_utils/mysqlconnection')

var WalletModule = {
    getAllWallets: function (callback) {
        mysqlDb.query("SELECT * FROM Wallets;", callback)
    },

    selectWalletById: function (walletId, callback) {
        mysqlDb.query("SELECT * FROM Wallets WHERE user_id = ?", walletId, callback)
    },

    selectAllWalletsByEmail: function(email, callback) {
        mysqlDb.query("SELECT * FROM Wallets WHERE email = ?", email, callback)
    }
}

module.exports = WalletModule