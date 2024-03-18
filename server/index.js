const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt")
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Function to generate JWT token
function generateJWTToken(userId) {
    // Replace 'your_secret_key' with your actual secret key for signing the token
    return jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
}



//middleware
app.use(cors());
app.use(express.json()); // allows us use req.body
app.use(fileUpload());




//ROUTES
app.use("/authentication/register", require("./routes/jwtAuth"));
app.use("/Posting", require("./routes/itemPost"));

//login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Perform authentication logic here (e.g., check credentials against the database)
        // For simplicity, let's assume you're querying the database to find the user with the provided email
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credentials");
        }

        // Check if the password matches
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json("Invalid Credentials");
        }

        // If the email and password are correct, generate and return a JWT token
        // You can customize this response based on your application's needs
        const jwtToken = generateJWTToken(user.rows[0].id);
        res.json({ jwtToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



// create a user
app.post("/authentication/register", async (req, res) => {
    try {
        const { email, password, username, zip_code } = req.body;

        // Add any necessary validation or checks here

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const newUser = await pool.query(
            "INSERT INTO users (email, password, username, zip_code) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, hashedPassword, username, zip_code]
        );

        // Assuming you want to send back a JWT token upon successful registration
        // You can customize this response based on your application's needs
        // Here, we are sending back the user ID and username
        res.json({ userId: newUser.rows[0].id, username: newUser.rows[0].username }); 

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Create a Post
app.post("/create_post", async (req, res) => {
    try {
        if (!req.files || !req.files.pic) {
            return res.status(400).send("No files were uploaded.");
        }

        const { title } = req.body;
        const { name, data } = req.files.pic;

        // Extract userId from the JWT token in the request headers
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'your_secret_key');
        const userId = decoded.userId;

        const newPost = await pool.query(
            "INSERT INTO posts (title, attached_photo, user_id) VALUES ($1, $2, $3) RETURNING *",
            [title, data, userId]
        );
        
        res.json("Upload Success");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000")
});