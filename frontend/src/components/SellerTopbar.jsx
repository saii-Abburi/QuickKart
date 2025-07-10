import React, { useEffect, useState } from 'react';
import fetchUserDetails from '../hooks/useFecthUser';

const SellerTopbar = () => {
  const [sellerName, setSellerName] = useState('Seller');

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const data = await fetchUserDetails();
        if (data?.name) {
          setSellerName(data.name);
        }
      } catch (error) {
        console.error('Failed to fetch seller details:', error);
      }
    };

    fetchSeller();
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">Welcome, {sellerName}</h1>
      <span className="text-sm text-gray-400">Manage your products and orders</span>
    </header>
  );
};

export default SellerTopbar;
