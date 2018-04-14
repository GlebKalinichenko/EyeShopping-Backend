var express = require('express');
var router = express.Router();
var storeController = require("../controllers/StoreController");

// Create store
router.post('/createStore', function(req, res) {
    storeController.createStore(req, res);
});

// Update store
router.put('/changeStore/:storeId', function(req, res) {
    storeController.updateStore(req, res)
})

// Delete store
router.delete('/deleteStore/:storeId', function (req, res) {
    storeController.deleteStore(req, res)
})

module.exports = router;