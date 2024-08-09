// // app/api/mutations/useLoginMutation.ts

// import { useMutation, UseMutationResult } from '@tanstack/react-query';
// import axios from 'axios';

// interface LoginVariables {
//   username: string;
//   password: string;
// }

// interface ApiConfig {
//   token: string;
//   url: string;
// }

// const apiConfig: ApiConfig = {
//   token: '',
//   url: 'https://api.example.com',
// };

// interface LoginResponse {
//   token: string;
// }

// // Mutation function should be typed correctly
// const loginUser = async (variables: LoginVariables): Promise<LoginResponse> => {
//   const response = await axios.post(`${apiConfig.url}/login`, variables);
//   return response.data;
// };

// // `useMutation` should take the function and an options object
// export const useLoginMutation = (): UseMutationResult<LoginResponse, Error, LoginVariables> => {
//   return useMutation<LoginResponse, Error, LoginVariables>(
//     loginUser, // The mutation function
//     {
//       onSuccess: (data: LoginResponse) => {
//         apiConfig.token = data.token;
//       },
//       onError: (error: Error) => {
//         console.error('Login error:', error.message);
//       },
//     }
//   );
// };
