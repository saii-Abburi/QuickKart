import React from 'react';

const DashboardContent = () => {
  const products = [
    { id: 1, name: 'Organic Milk', price: '₹60', image: '/images/milk.png' },
    { id: 2, name: 'Fresh Bread', price: '₹40', image: '/images/bread.png' },
    { id: 3, name: 'Almond Cookies', price: '₹120', image: '/images/cookies.png' },
    { id: 4, name: 'Natural Honey', price: '₹250', image: '/images/honey.png' },
    // Add more dummy products as needed
  ];

  return (
    <div className="p-6">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Sort Dropdown */}
        <select className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400">
          <option value="default">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="expiry">Near Expiry</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-purple-600 font-bold">{product.price}</p>
            <button className="mt-3 w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
