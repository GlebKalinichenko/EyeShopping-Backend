var mysql = require('mysql');

var connection = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : '1234',
    database : 'eyeshopping'
});
/*
connection.connect();

connection.query('SELECT * FROM Wallets;', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();
*/

module.exports = connection;