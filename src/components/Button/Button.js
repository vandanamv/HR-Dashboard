//src/components/Button/Button.js
"use client";

import React from 'react';

const Button = ({ children, onClick, type = 'button', color = 'blue', className = '' }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${colorClasses[color]} hover:opacity-80 transition-opacity ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
