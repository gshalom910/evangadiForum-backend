require("dotenv").config();
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  password: process.env.DB_PASS,
  // port: 3306,
});

// const pool = mysql.createPool(process.env.DATABASE_URL);

// pool.getConnection(function (err, conn) {
//   if (err) {
//     console.log("mysql", err);
//   } else {
//     console.log("connected to mysql");
//   }
// });

module.exports = pool;
