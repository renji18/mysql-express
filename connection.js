const mysql = require('mysql2');
require('dotenv').config()

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: 'employeeDb'
})

mysqlConnection.connect((err) => {
  if (err) {
    console.log('Error in DB connection ', JSON.stringify(err, undefined, 2));
  } else {
    console.log('DB connected successfully');
  }
})

module.exports = mysqlConnection