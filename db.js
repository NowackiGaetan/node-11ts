const mysql = require("mysql");

function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'GaetanAdmin',
    password: 'MyCharlie23',
    database: 'command'
  });
}

module.exports = getConnection;
