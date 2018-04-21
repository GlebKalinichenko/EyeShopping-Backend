var express = require('express');
var router = express.Router();
var config = require("../config/config")
var itemController = require("../controllers/ItemController");

router.get('/items', function(req, res) {
    itemController.selectAllItems(req, res)
});

router.get('/itemsStore', function(req, res) {
    itemController.selectAllItemsWithStore(req, res)
});

router.get('/items/:storeId', function(req, res) {
    itemController.selectAllItemsByStoreId(req, res)
});

module.exports = router;