var StoreModule = require("../modules/StoreModule")
var typeConfig = require("../constants/TypeConfig")
var SecurityUtils = require("../utils/SecurityUtils")
var storeController = {};

storeController.getStores = function (req, res) {
    var authHeader = req.header('authorization')

    SecurityUtils.validateAccessToken(authHeader, function (err, decodedToken) {
        if (err) {
            res.send(403, err)
        }
        else {
            StoreModule.getAllStores(function (err, stores) {
                if (err) {
                    res.json(err)
                }
                else {
                    res.json(stores)
                }
            })
        }
    })
}

/**
 * Add new store endpoint
 * */
storeController.createStore = function (req, res) {
    var name = req.body.name
    var description = req.body.description
    var address = req.body.address
    var merchantId = req.body.merchantId
    var authHeader = req.header('authorization')

    SecurityUtils.validateAccessToken(authHeader, function (err, decodedToken) {
        if (err) {
            res.send(403, err)
        }
        else {
            var typeId = decodedToken.type_id

            if (typeConfig.wallet_type_id == typeId) {
                res.status(404).json({'message': 'Only merchant can create store'})
                return
            }

            StoreModule.insertStore(name, description, address, merchantId, function(err, rows) {
                if (err) res.json(err)
                else {
                    res.status(200).json({'id':  rows.id})
                }
            })
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
    var merchantId = req.body.merchantId
    var storeId = req.params.storeId
    var authHeader = req.header('authorization')

    SecurityUtils.validateAccessToken(authHeader, function (err, decodedToken) {
        if (err) {
            res.send(403, err)
        }
        else {
            var typeId = decodedToken.type_id

            if (typeConfig.wallet_type_id == typeId) {
                res.status(404).json({'message': 'Only merchant can create store'})
                return
            }

            StoreModule.updateStore(name, description, address, merchantId, storeId, function (err, rows) {
                if (err) res.json(err)
                else {
                    res.status(200).json({message: 'Store was success updated'})
                }
            })
        }
    })
};

storeController.deleteStore = function (req, res) {
    var storeId = req.params.storeId
    var authHeader = req.header('authorization')

    SecurityUtils.validateAccessToken(authHeader, function (err, decodedToken) {
        if (err) {
            return res.send(403, err)
        }
        else {
            var typeId = decodedToken.type_id

            if (typeConfig.wallet_type_id == typeId) {
                res.status(404).json({'message': 'Only merchant can create store'})
                return
            }

            StoreModule.deleteStore(storeId, function (err, rows) {
                if (err) res.json(err)
                else {
                    res.status(200).json({'message': 'Store was removed'})
                }
            })
        }
    })
}

module.exports = storeController
