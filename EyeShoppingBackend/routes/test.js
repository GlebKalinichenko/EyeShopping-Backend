var express = require('express');
var router = express.Router();
var testController = require("../controllers/TestController");

// Get all wallets list
router.get('/allTest', function(req, res) {
    testController.getAllTest(req, res)
});

module.exports = router;