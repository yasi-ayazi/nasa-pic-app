'use client';
import React, { useEffect, useState } from 'react';

export default function MarsRoverPhotos() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY'
        );
        const data = await res.json();
        if (isMounted) {
          setPhotos(data.photos.slice(0, 6)); // limit to 6 photos
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch Mars photos');
        }
      }
    };

    fetchPhotos();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  if (error) return <p>{error}</p>;
  if (photos.length === 0) return <p>Loading photos...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mars Rover Photos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ width: '300px' }}>
            <img
              src={photo.img_src}
              alt={`Mars Rover - ${photo.camera.full_name}`}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p><strong>Camera:</strong> {photo.camera.full_name}</p>
            <p><strong>Earth Date:</strong> {photo.earth_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
