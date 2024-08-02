'use client';

import React, { useState } from 'react';
import EmployeeTab from '../../components/restaurant/EmployeeTab';
import AttendanceTab from '../../components/restaurant/AttendanceTab';
import SalaryTab from '../../components/restaurant/SalaryTab';
import SalesTab from '../../components/restaurant/SalesTab';
import ReportsTab from '../../components/restaurant/ReportsTab';
import KitchenTab from '../../components/restaurant/KitchenTab';

const RestaurantDetail = ({ params }: any) => {
  const { id } = params;

  // Dummy restaurant data
  const restaurantData = [
    {
      id: '1',
      name: 'The Gourmet Kitchen',
      description: 'A fine dining experience with exquisite cuisine.',
    },
    // Add more restaurants as needed
  ];

  const restaurant = restaurantData.find((r) => r.id === id);
  const [activeTab, setActiveTab] = useState('employees');

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-bg">
      <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
      <p className="text-gray-700 mb-4">{restaurant.description}</p>

      <div className="flex space-x-4 mb-4">
        {['employees', 'attendance', 'salary', 'sales', 'reports', 'kitchen'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab px-4 py-2 rounded-lg transition duration-200 ${
              activeTab === tab
                ? 'bg-accent text-white font-semibold shadow-lg'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'employees' && <EmployeeTab />}
      {activeTab === 'attendance' && <AttendanceTab />}
      {activeTab === 'salary' && <SalaryTab />}
      {activeTab === 'sales' && <SalesTab />}
      {activeTab === 'reports' && <ReportsTab />}
      {activeTab === 'kitchen' && <KitchenTab />}
    </div>
  );
};

export default RestaurantDetail;
