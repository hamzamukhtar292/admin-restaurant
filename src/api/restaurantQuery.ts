const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import axios from 'axios';

export const fetchRestaurants = async () => {
  const response = await axios.get(`${baseUrl}/restaurants`);
  return response.data;
};
