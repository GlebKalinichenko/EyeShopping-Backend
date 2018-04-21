var Sequelize = require('sequelize');
const sequelize = new Sequelize('eyeshopping', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    define: {
        timestamps: false
    }
});

const Test = sequelize.define('Test', {

    idTest: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        field: 'idTest'
    },

    name: {
        type: Sequelize.STRING,
        field: 'name'
    }
});

var TestModule = {
    getAllTest: function (callback) {
        Test.findAll().then(function (c) {
            callback(null, c)
        })
    }
}

module.exports = TestModule