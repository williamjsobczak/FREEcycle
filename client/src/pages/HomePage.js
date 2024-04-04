import React, { useState, useEffect } from 'react';

function HomePage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // List of postIds for which you want to fetch images
    const postIds = [6, 7, 9]; // Example: Replace with actual list of postIds

    // Fetch photos for each postId from the backend when the component mounts
    const fetchPhotos = async () => {
      try {
        const photoData = [];
        for (const postId of postIds) {
          const response = await fetch(`http://localhost:5000/images/${postId}`); // Adjust the endpoint URL
          console.log(typeof response);
          if (!response.ok) {
            throw new Error(`Failed to fetch photos for postId ${postId}`);
          }
          const dataBuffer = await response.buffer();
          photoData.push(...dataBuffer); // Concatenate fetched photos for each postId
        }
        setPhotos(photoData); // Set the fetched photos in state
      } catch (error) {
        console.error('Error fetching photos:', error.message);
      }
    };

    fetchPhotos();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Function to convert bytea data to a Blob
  const byteaToBlob = (bytea) => {
    const binaryString = window.atob(bytea);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'image/*' }); // Adjust the type based on your image format
  };

  return (
    <div>
      <h1>Photos</h1>
      <div className="photo-container">
        {/* Map over the photos and render each photo */}
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
            {/* Render the image using the blob URL */}
            <img src={URL.createObjectURL(byteaToBlob(photo.data))} alt={photo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
