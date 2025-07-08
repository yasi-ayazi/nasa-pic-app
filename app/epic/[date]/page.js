'use client';
import React, { useEffect, useState } from "react";
import  fetchFromNasa  from '@/utils/fetchFromNasa'; // Adjust path if needed

export default function EpicPage({ params }) {
  const { date } = React.use(params); // Unwrap params with React.use()
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Try to get images for the specific date
        const data = await fetchFromNasa(`/EPIC/api/natural/date/${date}`);
        if (data && data.length > 0) {
          const img = data[0];
          const formattedDate = date.replace(/-/g, '/');
          const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/png/${img.image}.png`;
          setImage({ url: imgUrl, caption: img.caption });
        } else {
          // Fallback: get the latest available image
          const fallbackData = await fetchFromNasa(`/EPIC/api/natural`);
          if (fallbackData && fallbackData.length > 0) {
            const fallback = fallbackData[0];
            const fallbackDate = fallback.date.split(' ')[0].replace(/-/g, '/');
            const fallbackUrl = `https://epic.gsfc.nasa.gov/archive/natural/${fallbackDate}/jpg/${fallback.image}.jpg`;
            setImage({ url: fallbackUrl, caption: `[Fallback] ${fallback.caption}` });
          } else {
            setError('No image found even in fallback.');
          }
        }
      } catch (e) {
        setError('Error fetching image.');
      }
    };

    fetchImage();
  }, [date]);

  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">NASA EPIC Image for {date}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {image && (
        <>
          <img src={image.url} alt="NASA EPIC" className="mx-auto max-w-full h-auto" />
          <p className="mt-2 text-sm text-gray-700">{image.caption}</p>
        </>
      )}
    </main>
  );
}