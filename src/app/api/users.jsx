import axios from "axios";

const API_URL = "http://localhost:8080/users";

// Fetch all Users
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUser = async (newUser) => {
  const response = await axios.post(API_URL, newUser);
  return response.data;
};
