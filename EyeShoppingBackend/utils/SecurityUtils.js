var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var config = require("../config/config")
var typeConfig = require("../constants/TypeConfig")

var SecurityUtils = {

    compareHashPassword: function(password, existedHashPassword, callback) {
        if(bcrypt.compareSync(password, existedHashPassword)) {
            callback(true)
        } else {
            callback(false)
        }
    },

    createHashPassword: function(password, callback) {
        var hashPassword = bcrypt.hashSync(password, 10)
        callback(hashPassword)
    },

    validateAccessToken: function (authHeader, callback) {
        jwt.verify(authHeader, config.secret, function (err, decoded) {
            if (err) {
                callback(err)
            }
            else {
                var token = {}
                var typeId = decoded.type_id
                token.typeId = typeId

                if (typeId == typeConfig.wallet_type_id)
                    token.walletId = decoded.wallet_id
                else
                    token.merchantId = decoded.merchant_id

                callback(err, token)
            }
        })
    }
}

module.exports = SecurityUtils