var ItemModule = require('../modules/ItemModule')
var ItemConverter = require('../converters/ItemConverter')
var itemController = {}

itemController.selectAllItems = function(req, res) {
    ItemModule.selectAllItems(function(err, items) {
        if (err) {
            res.json(err)
        }
        else {
            res.json(items)
        }
    })
}

itemController.selectAllItemsWithStore = function(req, res) {
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

itemController.selectAllItemsByStoreId = function(req, res) {
    var storeId = req.params.storeId
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

module.exports = itemController

