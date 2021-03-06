var LoginModule = require("../modules/LoginModule");
var jwt = require('jsonwebtoken');
var config = require("../database_utils/config")
var loginController = {};

/**
 * Controller for sign up endpoint
 * */
loginController.signUpWallet = function (req, res) {
    var firstName = req.body.first_name
    var lastName = req.body.last_name
    var email = req.body.email
    var password = req.body.password

    LoginModule.selectAllWalletsByEmail(email, function (err, users) {
        if(err) {
            res.json(err);
        }
        else {
            if (users.length == 0) {
                LoginModule.insertWallet(email, password, firstName, lastName, function (err, rows) {
                    if(err) {
                        res.json(err);
                    }
                    else {
                        var payload = {
                            user_id: rows.insertId
                        }
                        var token = jwt.sign(payload, config.secret);
                        res.json({'user_id': rows.insertId, 'token': token});
                    }
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

    LoginModule.selectAllWalletsByEmail(email, function (err, users) {
        if(err) {
            res.json(err);
        }
        else {
            if (users.length != 0) {
                LoginModule.compareHashPassword(password, users[0].password, function (isSamePassword) {
                    if (isSamePassword) {
                        var payload = {
                            user_id: users[0].user_id
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

    LoginModule.selectAllMerchantsByEmail(email, function (err, users) {
        if(err) {
            res.json(err);
        }
        else {
            if (users.length != 0) {
                LoginModule.compareHashPassword(password, users[0].password, function (isSamePassword) {
                    if (isSamePassword) {
                        var payload = {
                            merchant_id: users[0].id
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

    LoginModule.selectAllMerchantsByEmail(email, function (err, users) {
        if(err) {
            res.json(err);
        }
        else {
            if (users.length == 0) {
                LoginModule.insertMerchant(email, password, firstName, lastName, function (err, rows) {
                    if(err) {
                        res.json(err);
                    }
                    else {
                        var payload = {
                            merchant_id: rows.insertId
                        }
                        var token = jwt.sign(payload, config.secret);
                        res.json({'merchant_id': rows.insertId, 'token': token});
                    }
                })
            }
            else {
                res.status(422).send({ message: 'User already have registered with this email address' });
            }
        }
    })
}

module.exports = loginController
