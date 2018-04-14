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
    },

    /**
     * SQL query for insert new wallet
     * */
    insertWallet: function (email, password, hashPassword, firstName, lastName, type_id, callback) {
        var values = [firstName, lastName, email, hashPassword, type_id]
        mysqlDb.query("INSERT INTO Wallets (first_name, last_name, email, password, type_id) VALUES (?, ?, ?, ?, ?)", values, callback)
    }
}

module.exports = WalletModule