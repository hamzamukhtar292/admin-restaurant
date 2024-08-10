import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/login';

export const loginMutation = async (variables: { email: string; password: string }) => {
  try {
    const response = await axios.post(API_URL, variables);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};