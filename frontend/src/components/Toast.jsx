import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white flex items-center gap-4 transition-transform animate-slide-in 
      ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`}>
      <span className="font-semibold">{message}</span>
      <button onClick={onClose}>
        <X className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default Toast;
