var mysqlDb = require('../database_utils/mysqlconnection')
var bcrypt = require('bcrypt')

var LoginModule = {

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
    insertWallet: function (email, password, hashPassword, firstName, lastName, type_id, callback) {
        var values = [firstName, lastName, email, hashPassword, type_id]
        mysqlDb.query("INSERT INTO Wallets (first_name, last_name, email, password, type_id) VALUES (?, ?, ?, ?, ?)", values, callback)
    }
}

module.exports = LoginModule