var mysqlDb = require('../database_utils/mysqlconnection')

var StoreModule = {
    /**
     * SQL query for insert new store
     * */
    insertStore: function (name, description, address, merchantId, callback) {
        var values = [name, description, address, merchantId]
        mysqlDb.query("INSERT INTO Stores (name, description, address, merchant_id) VALUES (?, ?, ?, ?)", values, callback)
    },

    /**
     * SQL query for update store
     * */
    updateStore: function (name, description, address, merchantId, storeId, callback) {
        var values = [name, description, address, merchantId, storeId]
        mysqlDb.query("UPDATE Stores SET name = ?, description = ?, address = ?, merchant_id = ? WHERE id = ?", values, callback)
    }
}

module.exports = StoreModule