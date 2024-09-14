"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";

// Define the User type
function UsersList() {
  const {
    data: users,
    isLoading: postsLoading,
    error: postsError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Log the data to inspect its structure
  console.log("Data received from API: front end users", users);
  // Ensure data is an array or fallback to an empty array
  //const users = Array.isArray(data) ? data : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        All Users
      </h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user: any) => (
            <li
              key={user.id}
              className="mb-4 p-4 border border-gray-300 rounded-lg"
            >
              <h3 className="text-xl font-semibold">{user.email}</h3>
              <p>{user.password}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UsersList;
