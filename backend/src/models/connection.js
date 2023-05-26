const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'StoreManager',
  waitForConnections: true,
});

module.exports = connection;