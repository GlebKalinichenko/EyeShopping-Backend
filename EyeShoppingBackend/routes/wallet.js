var express = require('express');
var router = express.Router();
var walletController = require("../controllers/WalletController");

// Get all wallets list
router.get('/allWallets', function(req, res) {
    walletController.getAllWallets(req, res);
});

router.post('/:walletId', function(req, res) {
    walletController.getWalletById(req, res);
});

module.exports = router;