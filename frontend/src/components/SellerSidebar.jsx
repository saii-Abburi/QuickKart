import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  User,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SellerSidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('Dashboard');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/seller/dashboard' },
    { label: 'Products', icon: <Package size={20} />, path: '/seller/products' },
    { label: 'Orders', icon: <ClipboardList size={20} />, path: '/seller/orders' },
    { label: 'Profile', icon: <User size={20} />, path: '/profile' },
  ];

  const handleNavClick = (label, path) => {
    setActive(label);
    navigate(path);
  };

  return (
    <aside className="w-64 bg-white shadow-md h-full p-5 hidden md:block">
      <h2 className="text-2xl font-bold text-purple-700 mb-8">Quick Cart</h2>
      <nav className="space-y-2">
        {menuItems.map(({ label, icon, path }) => (
          <button
            key={label}
            onClick={() => handleNavClick(label, path)}
            className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg
              ${
                active === label
                  ? 'bg-purple-100 text-purple-700 font-semibold'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-100'
              }`}
          >
            {icon} {label}
          </button>
        ))}

        <button
          className="flex items-center gap-3 text-red-600 mt-10 px-4 py-2 rounded-lg hover:bg-red-100"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default SellerSidebar;
