import axios from "axios";

const API_URL = "http://localhost:8080/Restaurant/create";

export const createRestaurant = async (newRestaurant) => {
  console.log("new");
  console.log(newRestaurant);
  const response = await axios.post(API_URL, newRestaurant);
  return response.data;
};
