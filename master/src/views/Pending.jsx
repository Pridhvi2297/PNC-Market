import React from 'react';

const AccountPending = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <img src="/images/pending.png" alt="Pending" className="mb-8 mx-auto" />
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Account Pending</h1>
        <p className="text-gray-600">Your account is pending approval.</p>
        <p className="text-gray-600">Please wait for further instructions.</p>
      </div>
    </div>
  );
};

export default AccountPending;
