import React, { useState, useEffect } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify';

function CreatePostPage({isAuthenticated, checkAuthenticated}) {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pic", file); // Assuming 'file' is a File object
  
    try {
        const response = await fetch("http://localhost:5000/create_post", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`, // Send JWT token in the Authorization header
            },
            body: formData,
        });
  
        const responseJson = await response.json();
  
        if (response.ok) {
            toast.success("Created Item Post Successfully");
        } else {
            toast.error("Unable to create Item Post");
        }
    } catch (err) {
        console.error(err.message);
        toast.error("An error occurred");
    }
};

  
  
  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>Create a New Post</h1>
      {uploadSuccess && <p style={{ color: 'green' }}>Upload successful!</p>}
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
        {/* <div style={{ marginBottom: '10px' }}>
          <label htmlFor="userId">User ID:</label>
          <input 
            type="text" 
            id="userId" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            required 
          />
        </div> */}
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
      
    </div>

    

  );
}

export default CreatePostPage;
