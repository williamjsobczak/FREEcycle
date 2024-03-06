const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorization
router.post("/register", validInfo, async (req, res) => {
// LOGIC
// 1 destrucutre req.body
// 2 check if user exit (throw error)
// 3 bcrypt user password
// 4 enter new user inside database
// 5 generating jwt token

  const { email, name, password, zipcode } = req.body;
   
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);
    if (user.rows.length > 0) {
     
      return res.status(401).json("User already exist!");
    }
   

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
   
    let newUser = await pool.query(
      "INSERT INTO users (username, email, password,zip_code) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, bcryptPassword,zipcode]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
   
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
// LOGIC
// 1 destructure req.body
// 2 check if user doesn't exist (throw error)
// 3 check if incomming passowrd is smae as db password
// 4 give them jwt token
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);
   
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;