'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const restaurantData = [
  {
    id: '1',
    name: 'The Gourmet Kitchen',
    description: 'A fine dining experience with exquisite cuisine.',
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
  },
  {
    id: '2',
    name: 'Pasta Paradise',
    description: 'Delicious homemade pasta dishes.',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
  },
  {
    id: '3',
    name: 'Burger Bonanza',
    description: 'Juicy burgers with a variety of toppings.',
    image: 'https://images.pexels.com/photos/7045681/pexels-photo-7045681.jpeg',
  },
];

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      router.push('/');
    }
  }, [router]);

  const handleCardClick = (id:any) => {
    router.push(`/restaurant/${id}`);
  };
  

  return (
    <div className="flex flex-col items-center h-screen bg-base p-4">
      <h1 className="text-3xl font-bold mb-8 text-textMain">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantData.map((restaurant) => (
          <div
            key={restaurant.id}
            className="cursor-pointer p-4 bg-basae2 border border-borderBase rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => handleCardClick(restaurant.id)}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl  font-semibold text-textMain">{restaurant.name}</h2>
            <p className="text-grey6">{restaurant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
