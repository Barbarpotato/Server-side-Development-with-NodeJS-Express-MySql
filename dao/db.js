const mysql = require('mysql2');
// ignoring th conf file to be push to the github
/*  host: ''
    port: 3306,
    database: '',
    user: 'root',
    password: '' */

const config = require('../config/db.config');

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) console.log(err);
    else console.log('connection to mysql success!');
});

module.exports = connection;