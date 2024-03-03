const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
const fileUpload = require("express-fileupload");

//middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());


//ROUTES//

//create a user
app.post("/create_account", async(req, res) => {
    try {
        console.log(req.body);
        const { username, password, email, zip_code } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (username, password, email, zip_code) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, password, email, zip_code]
        );

        res.json(newUser.rows);
        
    } catch (err) {
        console.error(err.message);
    }
})

// Create a Post
app.post("/create_post", async (req, res) => {
    try {
        if (!req.files || !req.files.pic) {
            return res.status(400).send("No files were uploaded.");
        }

        const { title, userId } = req.body;
        const { name, data } = req.files.pic;

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

// // Fetch all posts
// app.get("/view_posts", async (req, res) => {
//     try {
//         const allPosts = await pool.query("SELECT * FROM posts");
//         res.json(allPosts.rows);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

app.listen(5000, () => {
    console.log("server has started on port 5000")
});