var WalletModule = require("../modules/WalletModule")
var MerchantModule = require("../modules/MerchantModule")
var SecurityUtils = require("../utils/SecurityUtils")
var jwt = require('jsonwebtoken')
var config = require("../database_utils/config")
var bcrypt = require('bcrypt')

var loginController = {};

/**
 * Controller for sign up endpoint
 * */
loginController.signUpWallet = function (req, res) {
    var firstName = req.body.first_name
    var lastName = req.body.last_name
    var email = req.body.email
    var password = req.body.password
    var typeId = 2

    WalletModule.selectAllWalletsByEmail(email, function (err, users) {
        if(err) {
            res.json(err);
        }
        else {
            if (users.length == 0) {
                //var hashPassword = bcrypt.hashSync(password, 10)
                SecurityUtils.createHashPassword(password, function (hashPassword) {
                    WalletModule.insertWallet(email, password, hashPassword, firstName, lastName, typeId, function (err, rows) {
                        if(err) {
                            res.json(err);
                        }
                        else {
                            var payload = {
                                'wallet': rows.insertId,
                                'type_id': typeId
                            }
                            var token = jwt.sign(payload, config.secret);
                            res.json({'user_id': rows.insertId, 'token': token});
                        }
                    })
                })
            }
            else {
                res.status(422).send({ message: 'User already have registered with this email address' });
            }
        }
    })
};

/**
 * Controller for sign in endpoint
 * */
loginController.signInWallet = function (req, res) {
    var email = req.body.email
    var password = req.body.password
    var typeId = 2

    WalletModule.selectAllWalletsByEmail(email, function (err, users) {
        if(err) {
            res.json(err);
        }
        else {
            if (users.length != 0) {
                SecurityUtils.compareHashPassword(password, users[0].password, function (isSamePassword) {
                    if (isSamePassword) {
                        var payload = {
                            'wallet_id': users[0].user_id,
                            'type_id': typeId
                        }
                        var token = jwt.sign(payload, config.secret);
                        res.json({'user_id': users[0].user_id, 'token': token})
                    }
                    else {

                    }
                })
            }
            else {
                res.status(422).send({ message: 'Invalid message or password!' });
            }
        }
    })
}

loginController.signInMerchant = function (req, res) {
    var email = req.body.email
    var password = req.body.password
    var typeId = 1

    MerchantModule.selectAllMerchantsByEmail(email, function (err, users) {
        if(err) {
            res.json(err);
        }
        else {
            if (users.length != 0) {
                SecurityUtils.compareHashPassword(password, users[0].password, function (isSamePassword) {
                    if (isSamePassword) {
                        var payload = {
                            'merchant_id': users[0].id,
                            'type_id': typeId
                        }
                        var token = jwt.sign(payload, config.secret);
                        res.json({'merchant_id': users[0].id, 'token': token})
                    }
                    else {

                    }
                })
            }
            else {
                res.status(422).send({ message: 'Invalid message or password!' });
            }
        }
    })
}

loginController.signUpMerchant = function (req, res) {
    var firstName = req.body.first_name
    var lastName = req.body.last_name
    var email = req.body.email
    var password = req.body.password
    var typeId = 1

    MerchantModule.selectAllMerchantsByEmail(email, function (err, users) {
        if(err) {
            res.json(err);
        }
        else {
            if (users.length == 0) {
                //var hashPassword = bcrypt.hashSync(password, 10)
                SecurityUtils.createHashPassword(password, function (hashPassword) {
                    MerchantModule.insertMerchant(email, password, hashPassword, firstName, lastName, typeId, function (err, rows) {
                        if(err) {
                            res.json(err);
                        }
                        else {
                            var payload = {
                                'merchant_id': rows.insertId,
                                'type_id': typeId
                            }
                            var token = jwt.sign(payload, config.secret);
                            res.json({'merchant_id': rows.insertId, 'token': token});
                        }
                    })
                })
            }
            else {
                res.status(422).send({ message: 'User already have registered with this email address' });
            }
        }
    })
}

module.exports = loginController
