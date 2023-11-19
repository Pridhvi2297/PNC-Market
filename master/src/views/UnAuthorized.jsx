import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <img src="/images/error.png" alt="Error" className="mb-8 mx-auto" />
        <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
