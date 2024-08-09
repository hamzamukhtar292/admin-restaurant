'use client';

import React, { useState } from 'react';

const SalesTab = () => {
  // Dummy sales data
  const salesRecords = [
    { date: '2024-07-01', totalSales: 1000 },
    { date: '2024-07-02', totalSales: 1200 },
    { date: '2024-07-03', totalSales: 950 },
    { date: '2024-07-04', totalSales: 1300 },
  ];

  const [timePeriod, setTimePeriod] = useState('daily');

  const handleChange = (e:any) => {
    setTimePeriod(e.target.value);
    // Here you could also fetch and update the sales records based on the selected time period
  };

  const totalSales = salesRecords.reduce((acc, record) => acc + record.totalSales, 0);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg bg-card-bg">
      <h2 className="text-2xl mb-4 p-4 border-b border-border">Sales Records</h2>
      <div className="p-4">
        <label htmlFor="timePeriod" className="mr-2">Select Time Period:</label>
        <select
          id="timePeriod"
          value={timePeriod}
          onChange={handleChange}
          className="border border-border rounded p-2 bg-white text-black"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-border">
          {salesRecords.map((record, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${record.totalSales.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-border text-right">
        <h3 className="text-xl font-semibold">Total Sales: ${totalSales.toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default SalesTab;
