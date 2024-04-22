import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  const [zipCode, setZipCode] = useState('');
  const [posts, setPosts] = useState([]);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/Posting/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      if (parseData.length > 0) {
        // Assuming parseData is an array with at least one element
        setZipCode(parseData[0].zip_code); // Set the zip code state
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    // Fetch posts based on the provided zip code when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts?zip_code=${zipCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [zipCode]); // Trigger fetchPosts whenever zipCode changes

  useEffect(() => {
    getProfile(); // Fetch user profile information
  }, []); // Run once on component mount

  return (
    <div>
      <h1>Items Showing for Zip Code: {zipCode}</h1> {/* Display the zip code */}
      <div className="photo-container">
        {/* Map over the posts and render each photo */}
        {posts
          .filter(post => post.post_zip === zipCode) // Filter posts based on user's zip code
          .map(post => (
            <div key={post.post_id} className="photo-item">
              {/* Apply styles to create spacing and a box outline */}
              <div className="photo-box">
                {/* Display the title text above the image */}
                <p className="photo-title">{post.title}</p>
                {/* Render the image using the base64 data */}
                <img src={`data:image/*;base64,${post.attached_photo}`} alt={post.title} className="center-image" />
                {/* Display the email below the title */}
                <p className="photo-email">Contact At: <a href={"mailto:" + post.email}>{post.email}</a></p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
