var TestModule = require("../modules/TestModule");

var testController = {};

testController.getAllTest = function(req, res) {

    TestModule.getAllTest(function(err, users) {
        if (err) {
            res.json(err)
        }
        else {
            res.json(users)
        }
    })
}

module.exports = testController
