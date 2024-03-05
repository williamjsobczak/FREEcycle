const Pool = require("pg").Pool;
require("dotenv").config();


const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
});


// const pool = new Pool({
//     user: "kmihcpvt",
//     host: "ruby.db.elephantsql.com",
//     port: 5432,
//     database: "kmihcpvt",
//     username: "kmihcpvt",
//     password: "e8mF8DP3ArWkJTk_9t1dOKlQIZw91qt7"
// });

module.exports = pool;