var Sequelize = require('sequelize');
var sequelizeDb = require('../config/databaseconnection')

const Wallet = sequelizeDb.define('Wallet', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id'
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

var WalletModule = {
    getAllWallets: function (callback) {
        Wallet.findAll().then(function (wallets) {
            callback(null, wallets)
        })
    },

    selectWalletById: function (walletId, callback) {
        Wallet.findById(walletId).then(function (wallets) {
            callback(null, wallets)
        })
    },

    selectAllWalletsByEmail: function(email, callback) {
        Wallet.find({
            where: {
                email: email
            }
        }).then(function (wallets) {
            callback(null, wallets)
        })
    },

    /**
     * SQL query for insert new wallet
     * */
    insertWallet: function (email, password, hashPassword, firstName, lastName, type_id, callback) {
        Wallet.create({
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

module.exports = WalletModule