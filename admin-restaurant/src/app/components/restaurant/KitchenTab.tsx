'use client';

import React, { useState } from 'react';

const KitchenTab = () => {
  // Dummy purchase data
  const purchaseRecords = [
    { item: 'Tomatoes', quantity: 10, pricePerUnit: 0.5, date: '2024-07-01' },
    { item: 'Onions', quantity: 5, pricePerUnit: 0.3, date: '2024-07-01' },
    { item: 'Chicken', quantity: 2, pricePerUnit: 5.0, date: '2024-07-01' },
    { item: 'Rice', quantity: 3, pricePerUnit: 1.2, date: '2024-07-01' },
  ];

  const [timePeriod, setTimePeriod] = useState('daily');

  const handleChange = (e:any) => {
    setTimePeriod(e.target.value);
    // Here you could also fetch and update the purchase records based on the selected time period
  };

  const totalCost = purchaseRecords.reduce((acc, record) => acc + record.quantity * record.pricePerUnit, 0);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg bg-card-bg">
      <h2 className="text-2xl mb-4 p-4 border-b border-border">Kitchen Purchases</h2>
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per Unit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-border">
          {purchaseRecords.map((record, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.item}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${record.pricePerUnit.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(record.quantity * record.pricePerUnit).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-border text-right">
        <h3 className="text-xl font-semibold">Total Cost: ${totalCost.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default KitchenTab;
