var express = require('express');
var router = express.Router();
var storeController = require("../controllers/StoreController");

// Create store
router.post('/createStore', function(req, res) {
    storeController.createStore(req, res);
});

router.put('/changeStore/:storeId', function(req, res) {
    storeController.updateStore(req, res)
})

router.delete('/deleteStore/:storeId', function (req, res) {
    storeController.deleteStore(req, res)
})

module.exports = router;