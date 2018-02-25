var mysqlDb = require('../database_utils/mysqlconnection')
var bcrypt = require('bcrypt')

var LoginModule = {
    getAllWallets: function (callback) {
        mysqlDb.query("SELECT * FROM Wallets;", callback)
    },

    selectAllWalletsByEmail: function(email, callback) {
        mysqlDb.query("SELECT * FROM Wallets WHERE email = ?", email, callback)
    },

    compareHashPassword: function(password, existedHashPassword, callback) {
        if(bcrypt.compareSync(password, existedHashPassword)) {
            callback(true)
        } else {
            callback(false)
        }
    },

    /**
     * SQL query for insert new wallet
     * */
    insertWallet: function (email, password, firstName, lastName, callback) {
        var hashPassword = bcrypt.hashSync(password, 10)
        var values = [firstName, lastName, email, hashPassword]
        mysqlDb.query("INSERT INTO Wallets (first_name, last_name, email, password) VALUES (?, ?, ?, ?)", values, callback)
    },

    selectAllMerchantsByEmail: function(email, callback) {
        mysqlDb.query("SELECT * FROM Merchants WHERE email = ?", email, callback)
    },

    /**
     * SQL query for insert new merchant
     * */
    insertMerchant: function (email, password, firstName, lastName, callback) {
        var hashPassword = bcrypt.hashSync(password, 10)
        var values = [firstName, lastName, email, hashPassword]
        mysqlDb.query("INSERT INTO Merchants (first_name, last_name, email, password) VALUES (?, ?, ?, ?)", values, callback)
    },
}

module.exports = LoginModule