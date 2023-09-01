require("dotenv").config();
const mysql = require("mysql2");
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

pool.getConnection(function (err, conn) {
  if (err) {
    console.log("mysql", err);
  } else {
    console.log("connected to mysql");
  }
});
const registration = `CREATE TABLE if not exists Registration(
    user_id int auto_increment,
    user_name varchar(30) not null,
    user_email varchar(50) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
    )`;
const profile = `CREATE TABLE if not exists Profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,        
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES Registration(user_id)
)`;
const question = `CREATE TABLE if not exists Question(
    question_id int auto_increment,
    question varchar(255) not null,
    question_description varchar(255),
    question_code_block varchar(255),
    tags varchar(255),
    post_id varchar(255) not null,
    user_id int not null,
    PRIMARY KEY (question_id),
    UNIQUE KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Registration(user_id)
)`;
const answer = `CREATE TABLE if not exists Answer(
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255),
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES Registration(user_id),
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
)`;
pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registration table created");
});
pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile table created");
});
pool.query(question, (err, results2) => {
  if (err) throw err;
  console.log("question table created");
});
pool.query(answer, (err, results2) => {
  if (err) throw err;
  console.log("answer table created");
});

module.exports = pool;
