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
module.exports = sequelize