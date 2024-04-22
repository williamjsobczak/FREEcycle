import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Import the CSS file

function HomePage({ zipCode }) {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <h1>Items Showing for Zip Code: {zipCode}</h1> {/* Display the zip code */}
      <div className="photo-container">
        {/* Map over the posts and render each photo */}
        {posts.map(post => (
          <div key={post.post_id} className="photo-item">
            {/* Apply styles to create spacing and a box outline */}
            <div className="photo-box">
              {/* Display the title text above the image */}
              <p className="photo-title">{post.title}</p>
              {/* Render the image using the base64 data */}
              <img src={`data:image/*;base64,${post.attached_photo}`} alt={post.title} className="center-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
