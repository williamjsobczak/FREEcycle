const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
// const multer = require('multer');

// const upload = multer({ 
//   limits: { fileSize: 50 * 1024 * 1024 }, // for 50MB
// });

//all Item Post and name
router.get("/", authorize, async (req, res) => {
  try {
    if (!req.user) {
      console.log(req.user)
      return 
    }
    // get todo name and description for a specified user id
    const user = await pool.query(
      "SELECT users.username, users.email, users.zip_code FROM users WHERE users.user_id = $1",
      [req.user]
    );
    // console.log(user.rows)
    res.json(user.rows);
  } catch (err) {
    // console.log('bob')
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a item post, using authorize middleware
router.post("/create-post", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { title, uploadSuccess } = req.body;
    const file = req.file;


    if (!file) {
      return res.status(400).send("No files were uploaded.");
    }

    const imageData = file.buffer; 

      const newPost = await pool.query(
          "INSERT INTO posts (title, attached_photo, user_id) VALUES ($1, $2, $3) RETURNING *",
          [title, imageData, req.user.id]
      );
      

    // res.json(newTodo.rows[0]);
    setUploadSuccess(true);
    return res.json(uploadSuccess);

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
  
});

//update a todo
router.put("/update-post/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const { title, userId } = req.body;
    const { name, data } = req.files.pic;

    const updateTodo = await pool.query(
      "UPDATE posts SET title = $1 WHERE post_id = $2 AND user_id = $3 RETURNING *",
      [title, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This Post is not yours");
    }

    res.json("Item Post was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a item post
router.delete("/delete-post/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM posts WHERE post_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This Post is not yours");
    }

    res.json("Post was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;