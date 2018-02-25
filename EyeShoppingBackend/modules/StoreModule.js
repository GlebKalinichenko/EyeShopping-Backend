var mysqlDb = require('../database_utils/mysqlconnection')

var StoreModule = {
    /**
     * SQL query for insert new store
     * */
    insertWallet: function (name, description, address, merchantId, callback) {
        var values = [name, description, address, merchantId]
        mysqlDb.query("INSERT INTO Stores (name, description, address, merchant_id) VALUES (?, ?, ?, ?)", values, callback)
    }
}

module.exports = StoreModule