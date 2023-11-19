import React from 'react';

const Deactive = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <img src="/images/deactive.png" alt="Deactivated" className="mb-8 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-500 mb-4">Account Deactivated</h1>
        <p className="text-gray-600">Your account has been deactivated.</p>
        <p className="text-gray-600">Please contact support for assistance.</p>
      </div>
    </div>
  );
};

export default Deactive;
