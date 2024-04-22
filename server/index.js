const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt");
require('dotenv').config();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authorize = require("./middleware/authorize");

const jwtSecret = process.env.jwtSecret; // Use environment variable

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// ROUTES
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/Posting", require("./routes/itemPost"));
// app.use("/images", require("./routes/imageRoutes"));
// Backend Route to Fetch Images by postId
app.get('/images/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
   
    // Query the database to retrieve the image data for the given postId
    const result = await pool.query('SELECT attached_photo FROM posts WHERE post_id = $1', [postId]);

    // Check if an image was found for the given postId
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Extract the image data from the database result
    const imageData = result.rows[0].attached_photo;
    const base64ImageData = imageData.toString('base64');
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Embedded Image</title>
      </head>
      <body>
        <h1>Embedded Image</h1>
        <img src="data:image/;base64,${base64ImageData}" alt="Embedded Image">
      </body>
      </html>
    `;


    // Serve the image data as a response with the appropriate content type
    res.writeHead(200, {
      'Content-Type': 'text/html', // Adjust content type based on your image format
      'Worked': 'yes'
    });
    res.end(htmlContent);
 

  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Function to generate JWT token
function generateJWTToken(userId) {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  }

// Use the 'authorize' middleware to validate the JWT token and extract user information
app.put("/update-credentials", authorize, async (req, res) => {
  try {
    // Extracting the user ID added to the req by the 'authorize' middleware
    const user_id = req.user; // This assumes that the authorize middleware adds the user object with 'id' to the req
    
    // Extract user details from request body
    const { username, email, zip_code } = req.body;

    // Update user in the database
    const updateUser = await pool.query(
      "UPDATE users SET username = $1, email = $2, zip_code = $3 WHERE user_id = $4 RETURNING username, email, zip_code",
      [username, email, zip_code, user_id]
    );

    if (updateUser.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the updated user information
    res.json(updateUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});





// Registration
app.post("/authentication/registration", async (req, res) => {
    try {
        const { username, password, email, zip_code } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const newUser = await pool.query(
            "INSERT INTO users (username, password, email, zip_code) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, hashedPassword, email, zip_code]
        );

        // Retrieve user_id based on username
        const { rows } = await pool.query(
            "SELECT user_id FROM users WHERE username = $1",
            [username]
        );

        // Ensure a user_id is found
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = rows[0].user_id;

        // Generate JWT token with user_id
        const jwtToken = generateJWTToken(userId);

        // Log the token payload for testing
        const decoded = jwt.verify(jwtToken, jwtSecret);
        console.log("Token payload after registration:", decoded);

        res.json({ jwtToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//Create post
app.post("/create_post", async (req, res) => {
    try {
        console.log("Received request to create post:", req.body);

        if (!req.files || !req.files.pic || !req.body.title) {
            return res.status(400).send("Title and Image are required.");
        }

        const { title } = req.body;
        const { name, data } = req.files.pic;

        // Verify JWT token and extract user_id
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.userId;

        // Log the extracted user_id for testing
        console.log("Extracted user_id:", userId);

        // Insert post into database with user_id
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



// Backend Route to Fetch All Posts with Attached Photos
app.get('/posts', async (req, res) => {
  try {
    // Query the database to retrieve all posts with their attached photos
    const result = await pool.query('SELECT * FROM posts');

    // Check if any posts were found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    // Map over the posts and extract the necessary data
    const postsWithPhotos = result.rows.map(post => ({
      post_id: post.post_id,
      title: post.title,
      attached_photo: post.attached_photo.toString('base64') // Convert BYTEA to base64 string
    }));

    // Send the posts with attached photos as the response
    res.json(postsWithPhotos);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});




app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
