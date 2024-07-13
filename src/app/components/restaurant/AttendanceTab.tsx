'use client';

import React from 'react';

const AttendanceTab = () => {
  // Dummy attendance data
  const attendanceRecords = [
    { date: '2024-07-01', employee: 'John Doe', status: 'Absent' },
    { date: '2024-07-01', employee: 'Jane Smith', status: 'Absent' },
    { date: '2024-07-02', employee: 'Emily Johnson', status: 'Present' },
    { date: '2024-07-02', employee: 'Michael Brown', status: 'Absent' },
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg bg-card-bg">
      <h2 className="text-2xl mb-4 p-4 border-b border-border">Attendance Records</h2>
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-border">
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.employee}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${record.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTab;
