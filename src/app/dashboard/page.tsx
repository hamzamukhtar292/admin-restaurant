'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useQuery } from '@tanstack/react-query';
import { fetchRestaurants } from '../../api';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface ChartData {
  name: string;
  data: number[];
}

interface ChartState {
  series: ChartData[];
  options: ApexOptions;
}

type AttendanceRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

const restaurantData: Restaurant[] = [
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

const attendanceData: Record<AttendanceRange, { name: string; daysPresent: number; totalDays: number; }[]> = {
  daily: [
    { name: 'John Doe', daysPresent: 20, totalDays: 30 },
    { name: 'Jane Smith', daysPresent: 25, totalDays: 30 },
    { name: 'Mark Johnson', daysPresent: 15, totalDays: 30 },
  ],
  weekly: [
    { name: 'John Doe', daysPresent: 5, totalDays: 7 },
    { name: 'Jane Smith', daysPresent: 6, totalDays: 7 },
    { name: 'Mark Johnson', daysPresent: 4, totalDays: 7 },
  ],
  monthly: [
    { name: 'John Doe', daysPresent: 20, totalDays: 30 },
    { name: 'Jane Smith', daysPresent: 22, totalDays: 30 },
    { name: 'Mark Johnson', daysPresent: 18, totalDays: 30 },
  ],
  yearly: [
    { name: 'John Doe', daysPresent: 200, totalDays: 365 },
    { name: 'Jane Smith', daysPresent: 250, totalDays: 365 },
    { name: 'Mark Johnson', daysPresent: 180, totalDays: 365 },
  ],
};

const Dashboard = () => {
  const router = useRouter();

  const { data, error, isLoading } = useQuery<Restaurant[], Error>({
    queryKey: ['restaurants'], // Query key
    queryFn: fetchRestaurants, // Fetch function
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.error('Error fetching restaurants:', error);
    }
  }, [data, error]);

  
  const [salesData, setSalesData] = useState<ChartState>({
    series: [],
    options: {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Sales Data',
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const [purchaseData, setPurchaseData] = useState<ChartState>({
    series: [],
    options: {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Purchase Data',
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const [attendanceRange, setAttendanceRange] = useState<AttendanceRange>('daily');
  const [currentAttendanceData, setCurrentAttendanceData] = useState(attendanceData.daily);
  const [selectedRange, setSelectedRange] = useState('daily');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      router.push('/');
      return;
    }

    // Initialize chart data
    updateSalesData('daily');
    updatePurchaseData('monthly');
    setCurrentAttendanceData(attendanceData.daily);
  }, [router]);

  const updateSalesData = (range: string) => {
    let data: number[] = [];
    let categories: string[] = [];
    switch (range) {
      case 'daily':
        data = [10, 41, 35, 51, 49, 62, 69];
        categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        break;
      case 'weekly':
        data = [210, 341, 295, 451];
        categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        break;
      case 'monthly':
        data = [1000, 2000, 1500, 3000, 2500, 3500, 4000];
        categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        break;
      case 'yearly':
        data = [12000, 14000, 13000, 15000];
        categories = ['2021', '2022', '2023', '2024'];
        break;
    }
    setSalesData({
      series: [{ name: 'Sales', data }],
      options: {
        ...salesData.options,
        xaxis: { categories },
      },
    });
  };

  const updatePurchaseData = (range: string) => {
    let data: number[] = [];
    let categories: string[] = [];
    switch (range) {
      case 'daily':
        data = [12, 30, 20, 25, 15, 45, 55];
        categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        break;
      case 'weekly':
        data = [100, 200, 150, 300];
        categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        break;
      case 'monthly':
        data = [200, 300, 250, 400, 350, 450, 500];
        categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        break;
      case 'yearly':
        data = [1500, 2500, 2000, 3500];
        categories = ['2021', '2022', '2023', '2024'];
        break;
    }
    setPurchaseData({
      series: [{ name: 'Purchases', data }],
      options: {
        ...purchaseData.options,
        xaxis: { categories },
      },
    });
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const range = event.target.value;
    setSelectedRange(range);
    updateSalesData(range);
    updatePurchaseData(range);
  };

  const handleAttendanceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const range = event.target.value as AttendanceRange; // Cast to AttendanceRange
    setAttendanceRange(range);
    setCurrentAttendanceData(attendanceData[range]);
  };

  const handleCardClick = (id: string) => {
    router.push(`/restaurant/${id}`);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-bg p-4">
      <h1 className="text-3xl font-bold mb-8">Your Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantData.map((restaurant) => (
          <div
            key={restaurant.id}
            className="cursor-pointer p-4 bg-card-bg border border-border rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => handleCardClick(restaurant.id)}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-text">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 w-full">
        {/* Sales Section in One Row */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Sales Data</h2>
            <select
              value={selectedRange}
              onChange={handleRangeChange}
              className="p-2 mb-4 border border-border rounded-lg"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <div className="bg-card-bg border border-border rounded-lg p-4 shadow-lg">
              <Chart
                options={salesData.options}
                series={salesData.series}
                type="line"
                height={300}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Purchase Data</h2>
            <div className="bg-card-bg border border-border rounded-lg p-4 shadow-lg">
              <Chart
                options={purchaseData.options}
                series={purchaseData.series}
                type="bar"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Attendance Data</h2>
          <select
            value={attendanceRange}
            onChange={handleAttendanceRangeChange}
            className="p-2 mb-4 border border-border rounded-lg"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div className="bg-card-bg border border-border rounded-lg p-4 shadow-lg">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-card-bg text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-card-bg text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days Present
                  </th>
                  <th className="px-6 py-3 bg-card-bg text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Days
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card-bg divide-y divide-border">
                {currentAttendanceData.map((record) => (
                  <tr key={record.name}>
                    <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.daysPresent}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.totalDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
