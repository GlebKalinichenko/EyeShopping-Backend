var Sequelize = require('sequelize');
var sequelizeDb = require('../config/databaseconnection')
var Store = require('../modules/StoreModule')
var mysqlDb = require('../config/mysqlconnection')

const Item = sequelizeDb.define('Item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },

    itemName: {
        type: Sequelize.STRING,
        field: 'item_name'
    },

    addressLine1: {
        type: Sequelize.STRING,
        field: 'addressLine1'
    },

    amount: {
        type: Sequelize.DOUBLE,
        field: 'amount'
    },

    description: {
        type: Sequelize.INTEGER,
        field: 'description'
    },
});

var ItemModule = {
    selectAllItems: function(callback) {
        Item.findAll().then(function (stores) {
            callback(null, stores)
        })
    },

    selectAllItemsWithStore: function(callback) {
/*        mysqlDb.query("SELECT store.*, item.*, storeItems.id as idStoreItem FROM eyeshopping.StoresWithItems storeItems INNER JOIN eyeshopping.Stores store ON storeItems.idStore = store.id\n" +
            "INNER JOIN eyeshopping.Items item ON storeItems.idItem = item.id", callback)*/
        Item.findAll({ include: [{model: Store, required: true}]}).then(function (items) {
            callback(null, items)
        })
    },

        selectAllItemsByStore: function (idStore, callback) {
        mysqlDb.query("SELECT store.*, item.*, storeItems.id as idStoreItem FROM eyeshopping.StoresWithItems storeItems INNER JOIN eyeshopping.Stores store ON storeItems.idStore = store.id\n" +
            "INNER JOIN eyeshopping.Items item ON storeItems.idItem = item.id where store.id = ?", idStore, callback)
    }
}

module.exports = ItemModule