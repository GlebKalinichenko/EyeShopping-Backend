var express = require('express');
var router = express.Router();
var walletController = require("../controllers/WalletController");

// Get all wallets list
router.get('/allWallets', function(req, res) {
    walletController.getAllWallets(req, res);
});

router.get('/:walletId', function(req, res) {
    walletController.getWalletById(req, res);
});

router.post('/uploadProfileImage/:walletId', function (req, res) {
    walletController.uploadProfileImage(req, res)
})

module.exports = router;