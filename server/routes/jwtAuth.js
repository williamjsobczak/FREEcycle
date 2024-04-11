const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.jwtSecret; // Use environment variable

// Function to generate JWT token
function generateJWTToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
}

// Login
router.post("/login", async (req, res) => {
  try {
      console.log(req.body)
      const { email, password } = req.body;

      // Perform authentication logic here
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (user.rows.length === 0) {
          return res.status(401).json("Invalid Credentials");
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
          return res.status(401).json("Invalid Credentials");
      }


      // Generate JWT token with user_id
      const jwtToken = generateJWTToken(user.rows[0].user_id);

      // Log the token payload for testing
      const decoded = jwt.verify(jwtToken, jwtSecret);
      console.log("Token payload after registration:", decoded)

      res.json({ jwtToken });

  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
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

// Update user credentials
router.put("/update-credentials", authorize, async (req, res) => {
  const { username, email, zip_code } = req.body;
  const user_id = req.user; // make sure this matches how you're setting it in authorize.js

  try {
    const updateUser = await pool.query(
      "UPDATE users SET username = $1, email = $2, zip_code = $3 WHERE user_id = $4 RETURNING username, email, zip_code",
      [username, email, zip_code, user_id]
    );

    if (updateUser.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updateUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
