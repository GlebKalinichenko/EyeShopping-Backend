var mysqlDb = require('../database_utils/mysqlconnection')

var ItemModule = {
    selectAllItems: function(callback) {
        mysqlDb.query("SELECT * FROM Items", callback)
    },

    selectAllItemsWithStore: function(callback) {
        mysqlDb.query("SELECT store.*, item.*, storeItems.id as idStoreItem FROM eyeshopping.StoresWithItems storeItems INNER JOIN eyeshopping.Stores store ON storeItems.idStore = store.id\n" +
            "INNER JOIN eyeshopping.Items item ON storeItems.idItem = item.id", callback)
    },

    selectAllItemsByStore: function (idStore, callback) {
        mysqlDb.query("SELECT store.*, item.*, storeItems.id as idStoreItem FROM eyeshopping.StoresWithItems storeItems INNER JOIN eyeshopping.Stores store ON storeItems.idStore = store.id\n" +
            "INNER JOIN eyeshopping.Items item ON storeItems.idItem = item.id where store.id = ?", idStore, callback)
    }
}

module.exports = ItemModule