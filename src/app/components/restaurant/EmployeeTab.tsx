'use client';

import React from 'react';

const EmployeeTab = () => {
  // Dummy employee data
  const employees = [
    { id: 1, name: 'John Doe', role: 'Chef' },
    { id: 2, name: 'Jane Smith', role: 'Waiter' },
    { id: 3, name: 'Emily Johnson', role: 'Manager' },
    { id: 4, name: 'Michael Brown', role: 'Bartender' },
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg bg-base2">
      <h2 className="text-2xl mb-4 p-4 border-b border-borderBase">Employees {employees.length}</h2>
      <table className="min-w-full divide-y divide-border bg-base2">
        <thead>
          <tr className="bg-grey2">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray6 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray6 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray6 uppercase tracking-wider">Role</th>
          </tr>
        </thead>
        <tbody className="bg-base2 divide-y text-textMain divide-borderBase">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm  text-textMain">{employee.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm  text-textMain">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm  text-textMain">{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTab;
