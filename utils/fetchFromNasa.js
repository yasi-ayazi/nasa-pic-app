'use client'
const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = process.env.NEXT_PUBLIC_NASA_API_BASE || 'https://api.nasa.gov';

export default  async  function fetchFromNasa(endpoint, options = {}, maxRetries = 3, retryDelay = 1000) {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, options);

      if (res.status === 429) {
        if (attempt === maxRetries) {
          throw new Error('Rate limit exceeded (429). Please try again later.');
        }
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        attempt++;
        continue;
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Error ${res.status}: ${errText}`);
      }

      return await res.json();
    } catch (err) {
      if (attempt === maxRetries) {
        return { error: err.message || 'Unknown error' };
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
      attempt++;
    }
  }
}