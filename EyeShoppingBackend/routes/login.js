var express = require('express');
var router = express.Router();
var loginController = require("../controllers/LoginController");

// Sign up wallet
router.post('/wallet/signUp', function(req, res) {
    loginController.signUpWallet(req, res);
});

// Sign in wallet
router.post('/wallet/signIn', function(req, res) {
    loginController.signInWallet(req, res);
});

// Sign up merchant
router.post('/merchant/signUp', function(req, res) {
    loginController.signUpMerchant(req, res);
});

// Sign in merchant
router.post('/merchant/signIn', function(req, res) {
    loginController.signInMerchant(req, res);
});

module.exports = router;