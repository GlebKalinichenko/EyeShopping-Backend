var ItemModule = require('../modules/ItemModule')
var ItemConverter = require('../converters/ItemConverter')
var SecurityUtils = require("../utils/SecurityUtils")
var itemController = {}

itemController.selectAllItems = function(req, res) {
    var authHeader = req.header('authorization')

    SecurityUtils.validateAccessToken(authHeader, function (err, decodedToken) {
        if (err) {
            res.send(403, err)
        }
        else {
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

    SecurityUtils.validateAccessToken(authHeader, function (err, decodedToken) {
        if (err) {
            res.send(403, err)
        }
        else {
            ItemModule.selectAllItemsWithStore(function (err, items) {
                if (err) {
                    res.json(err)
                }
                else {
                    res.json(results)
/*                    ItemConverter.convertItemsWithStore(items, function (results) {
                        res.json(results)
                    })*/
                }
            })
        }
    })
}

itemController.selectAllItemsByStoreId = function(req, res) {
    var storeId = req.params.storeId
    var authHeader = req.header('authorization')

    SecurityUtils.validateAccessToken(authHeader, function (err, decodedToken) {
        if (err) {
            res.send(403, err)
        }
        else {
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

