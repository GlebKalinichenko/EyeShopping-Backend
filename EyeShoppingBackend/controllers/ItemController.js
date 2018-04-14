var ItemModule = require('../modules/ItemModule')
var ItemConverter = require('../converters/ItemConverter')
var config = require("../database_utils/config")
var jwt = require('jsonwebtoken')
var itemController = {}

itemController.selectAllItems = function(req, res) {
    var authHeader = req.header('authorization')

    jwt.verify(authHeader, config.secret, function (err, decoded) {
        if (err) {
            res.send(403, err)
        }
        else {
            var walletId = decoded.wallet_id
            var typeId = decoded.type_id

            ItemModule.selectAllItems(function(err, items) {
                if (err) {
                    res.json(err)
                }
                else {
                    res.json(items)
                }
            })
        }
    })
}

itemController.selectAllItemsWithStore = function(req, res) {
    var authHeader = req.header('authorization')

    jwt.verify(authHeader, config.secret, function (err, decoded) {
        if (err) {
            res.send(403, err)
        }
        else {
            var walletId = decoded.wallet_id
            var typeId = decoded.type_id

            ItemModule.selectAllItemsWithStore(function (err, items) {
                if (err) {
                    res.json(err)
                }
                else {
                    ItemConverter.convertItemsWithStore(items, function (results) {
                        res.json(results)
                    })
                }
            })
        }
    })
}

itemController.selectAllItemsByStoreId = function(req, res) {
    var storeId = req.params.storeId
    var authHeader = req.header('authorization')

    jwt.verify(authHeader, config.secret, function (err, decoded) {
        if (err) {
            res.send(403, err)
        }
        else {
            var walletId = decoded.wallet_id
            var typeId = decoded.type_id

            ItemModule.selectAllItemsByStore(storeId, function (err, items) {
                if (err) {
                    res.json(err)
                }
                else {
                    ItemConverter.convertItemsWithStore(items, function (results) {
                        res.json(results)
                    })
                }
            })
        }
    })
}

module.exports = itemController

