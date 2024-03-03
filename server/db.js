const Pool = require("pg").Pool;

const pool = new Pool({
    user: "kmihcpvt",
    host: "ruby.db.elephantsql.com",
    port: 5432,
    database: "kmihcpvt",
    username: "kmihcpvt",
    password: "e8mF8DP3ArWkJTk_9t1dOKlQIZw91qt7"
});

module.exports = pool;