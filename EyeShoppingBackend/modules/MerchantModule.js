var mysqlDb = require('../database_utils/mysqlconnection')

var MerchantModule = {

    selectAllMerchantsByEmail: function(email, callback) {
        mysqlDb.query("SELECT * FROM Merchants WHERE email = ?", email, callback)
    },

    /**
     * SQL query for insert new merchant
     * */
    insertMerchant: function (email, password, hashPassword, firstName, lastName, type_id, callback) {
        var values = [firstName, lastName, email, hashPassword, type_id]
        mysqlDb.query("INSERT INTO Merchants (first_name, last_name, email, password, type_id) VALUES (?, ?, ?, ?, ?)", values, callback)
    }
}

module.exports = MerchantModule