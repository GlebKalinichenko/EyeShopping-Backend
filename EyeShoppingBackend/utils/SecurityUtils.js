var bcrypt = require('bcrypt')

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
    }
}

module.exports = SecurityUtils