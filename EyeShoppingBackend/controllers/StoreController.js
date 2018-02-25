var StoreModule = require("../modules/StoreModule");
var jwt = require('jsonwebtoken');
var config = require("../database_utils/config")
var typeConfig = require("../constants/TypeConfig")
var storeController = {};

/**
 * Controller for sign up endpoint
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

    StoreModule.insertWallet(name, description, address, merchantId, function(err, rows) {
        if (err) res.json(err)
        else {
            res.status(200).json({'store_id':  rows.insertId})
        }
    })

};

module.exports = storeController
