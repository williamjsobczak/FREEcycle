// Frontend: CreatePostPage.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function CreatePostPage({ checkAuthenticated }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  // Add state to store the uploaded item data
  const [uploadedItem, setUploadedItem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pic", file);
  
    try {
      const response = await fetch("http://localhost:5000/create_post", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Created Item Post Successfully");
        // Set uploaded item data to state
        setUploadedItem({
          title: title,
          imageUrl: URL.createObjectURL(file),
        });
      } else {
        toast.error("Unable to create Item Post");
      }
    } catch (err) {
      console.error(err.message);
      toast.error("An error occurred");
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pic">Choose Image:</label>
          <input 
            type="file" 
            id="pic" 
            onChange={(e) => setFile(e.target.files[0])} 
            required 
          />
        </div>
        <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>Upload</button>
      </form>
      {/* Display the uploaded item if it exists */}
      {uploadedItem && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Item:</h3>
          <p>Title: {uploadedItem.title}</p>
          <img src={uploadedItem.imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default CreatePostPage;