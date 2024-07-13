'use client';

import React from 'react';

const SalaryTab = () => {
  // Dummy salary data
  const salaryRecords = [
    { employee: 'John Doe', salary: 5000 },
    { employee: 'Jane Smith', salary: 3000 },
    { employee: 'Emily Johnson', salary: 4500 },
    { employee: 'Michael Brown', salary: 3500 },
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg bg-card-bg">
      <h2 className="text-2xl mb-4 p-4 border-b border-border">Salary Records</h2>
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-border">
          {salaryRecords.map((record, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.employee}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${record.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTab;
