var StoreModule = require("../modules/StoreModule");
var jwt = require('jsonwebtoken');
var config = require("../database_utils/config")
var typeConfig = require("../constants/TypeConfig")
var storeController = {};

/**
 * Add new store endpoint
 * */
storeController.createStore = function (req, res) {
    var name = req.body.name
    var description = req.body.description
    var address = req.body.address
    var authHeader = req.header('authorization')

    var decodedHeader = jwt.verify(authHeader, config.secret)
    var merchantId = decodedHeader.merchant_id
    var typeId = decodedHeader.type_id

    if (typeConfig.wallet_type_id == typeId) {
        res.status(404).json({'message': 'Only merchant can create store'})
        return
    }

    StoreModule.insertStore(name, description, address, merchantId, function(err, rows) {
        if (err) res.json(err)
        else {
            res.status(200).json({'store_id':  rows.insertId})
        }
    })

};

/**
 * Add store endpoint
 * */
storeController.updateStore = function (req, res) {
    var name = req.body.name
    var description = req.body.description
    var address = req.body.address
    var storeId = req.params.storeId
    var authHeader = req.header('authorization')

    var decodedHeader = jwt.verify(authHeader, config.secret)
    var merchantId = decodedHeader.merchant_id
    var typeId = decodedHeader.type_id

    if (typeConfig.wallet_type_id == typeId) {
        res.status(404).json({'message': 'Only merchant can create store'})
        return
    }

    StoreModule.updateStore(name, description, address, merchantId, storeId, function(err, rows) {
        if (err) res.json(err)
        else {
            res.status(200).json(rows)
        }
    })
};

storeController.deleteStore = function (req, res) {
    var storeId = req.params.storeId
    var a = {}
}

module.exports = storeController
