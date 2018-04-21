var Sequelize = require('sequelize');
var sequelizeDb = require('../config/databaseconnection')

const Merchant = sequelizeDb.define('Merchant', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },

    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },

    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    },

    email: {
        type: Sequelize.STRING,
        field: 'email'
    },

    password: {
        type: Sequelize.STRING,
        field: 'password'
    },

    typeId: {
        type: Sequelize.INTEGER,
        field: 'type_id'
    }
});

var MerchantModule = {

    selectAllMerchantsByEmail: function(email, callback) {
        Merchant.findAll().then(function (merchants) {
            callback(null, merchants)
        })
    },

    /**
     * SQL query for insert new merchant
     * */
    insertMerchant: function (email, password, hashPassword, firstName, lastName, type_id, callback) {
        Merchant.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            typeId: type_id
        }).then(function (newWallet) {
            callback(null, newWallet)
        })
    }
}

module.exports = MerchantModule