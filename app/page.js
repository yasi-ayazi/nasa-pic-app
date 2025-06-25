"use client";
import React, { useEffect, useState } from 'react';
import  fetchFromNasa  from '@/utils/fetchFromNasa'; // Adjust path if needed

export default function ApodPage() {
  const [apod, setApod] = useState(null);

 useEffect(() => {
    async function getData() {
      const data = await fetchFromNasa('/planetary/apod');
      setApod(data);
    }
    getData();
  }, []);
  if (!apod) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Astronomy Picture of the Day</h1>
      <p><strong>{apod.title}</strong></p>
      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          width="100%"
          height="500"
          allow="autoplay"
          frameBorder="0"
        />
      )}
      <p style={{ marginTop: '1rem' }}>{apod.explanation}</p>
    </div>
  );
}