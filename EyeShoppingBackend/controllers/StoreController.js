var StoreModule = require("../modules/StoreModule");
var jwt = require('jsonwebtoken');
var config = require("../database_utils/config")
var storeController = {};

/**
 * Controller for sign up endpoint
 * */
storeController.createStore = function (req, res) {
    var name = req.body.name
    var description = req.body.description
    var address = req.body.address
    var authHeader = req.header('authorization')

    var decodedHeader = jwt.verify(authHeader, config.secret)
    var merchantId = decodedHeader.merchant_id
    var typeId = decodedHeader.type_id
};

module.exports = storeController
