var express = require('express');
var router = express.Router();
var storeController = require("../controllers/StoreController");

// Create store
router.post('/createStore', function(req, res) {
    storeController.createStore(req, res);
});

module.exports = router;