import React from 'react';

const SellerDashboardHome = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Total Products</p>
        <h2 className="text-2xl font-bold text-purple-700">12</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Pending Orders</p>
        <h2 className="text-2xl font-bold text-purple-700">5</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Earnings</p>
        <h2 className="text-2xl font-bold text-purple-700">₹18,000</h2>
      </div>
    </div>
  );
};

export default SellerDashboardHome;
