var Sequelize = require('sequelize');
var sequelizeDb = require('../config/databaseconnection')

const Store = sequelizeDb.define('Store', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },

    storeName: {
        type: Sequelize.STRING,
        field: 'store_name'
    },

    description: {
        type: Sequelize.STRING,
        field: 'description'
    },

    address: {
        type: Sequelize.STRING,
        field: 'address'
    },

    merchantId: {
        type: Sequelize.INTEGER,
        field: 'merchant_id'
    },
});

var StoreModule = {
    getAllStores: function (callback) {
        Store.findAll().then(function (stores) {
            callback(null, stores)
        })
    },

    /**
     * SQL query for insert new store
     * */
    insertStore: function (name, description, address, merchantId, callback) {
        Store.create({
            storeName: name,
            description: description,
            address: address,
            merchantId: merchantId,
        }).then(function (newStore) {
            callback(null, newStore)
        })
    },

    /**
     * SQL query for update store
     * */
    updateStore: function (name, description, address, merchantId, storeId, callback) {
        Store.update({
            storeName: name,
            description: description,
            address: address,
            merchantId: merchantId,
        }, {returning: true, where: {id: storeId}}).then(function (updatedStore) {
            callback(null, updatedStore)
        })
    },

    deleteStore: function (storeId, callback) {
        Store.destroy({
            where: {
                id: storeId
            }
        }).then(function (row) {
            callback(null, row)
        })
    }
}

module.exports = StoreModule