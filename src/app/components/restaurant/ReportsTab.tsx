'use client';

import React from 'react';

const ReportsTab = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Reports</h2>
      <p className="mb-4">Generate downloadable reports for attendance, salary, and sales.</p>
      <button className="bg-accent text-white p-2 rounded">Download Attendance Report</button>
      <button className="bg-accent text-white p-2 rounded ml-4">Download Salary Report</button>
      <button className="bg-accent text-white p-2 rounded ml-4">Download Sales Report</button>
      {/* Implement download logic as needed */}
    </div>
  );
};

export default ReportsTab;
