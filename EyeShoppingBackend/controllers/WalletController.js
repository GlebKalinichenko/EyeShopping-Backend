var LoginModule = require("../modules/WalletModule");
var multer  =   require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

//var upload = multer({ storage: storage })
var upload = multer({ dest: 'uploads/' }).array('avatar', 12)
var walletController = {};

walletController.getWalletById = function(req, res) {
    var walletId = req.params.walletId

    LoginModule.selectWalletById(walletId, function (err, users) {
        if (err) {
            res.json(err)
        }
        else {
            res.json(users)
        }
    })
}

walletController.getAllWallets = function(req, res) {
    LoginModule.getAllWallets(function (err, users) {
        if (err) {
            res.json(err)
        }
        else {
            res.json(users)
        }
    })
}

walletController.uploadProfileImage = function (req, res) {
    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
        if (err) {
            var errorJson = {
                message: "Error uploading file."
            }
            return res.json(404, errorJson);
        }

        var success = {
            message: "File is uploaded"
        }
        res.json(200, success);
    });
}


module.exports = walletController
