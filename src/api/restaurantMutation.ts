const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import axios from 'axios';

const BASE_URL = 'https://cheez-api-cba74d56272d.herokuapp.com';

export const fetchRestaurants = async () => {
  const response = await axios.get(`${BASE_URL}/restaurants`);
  return response.data;
};
