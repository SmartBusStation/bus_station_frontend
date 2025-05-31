"use client";

import React from 'react';
import { BarChart2 } from 'lucide-react';

const RevenueOverview = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Mock data for the chart
  const data = [300, 400, 650, 500, 600, 450, 350];
  const maxValue = Math.max(...data);
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Weekly</button>
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-800">$835</span>
          <span className="text-sm font-medium text-green-600">+7.2%</span>
        </div>
        <p className="text-sm text-gray-500">Average weekly revenue</p>
      </div>
      
      <div className="h-48 flex items-end space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-all duration-300 relative group"
              style={{ height: `${(value / maxValue) * 80}%` }}
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                ${value}
              </div>
            </div>
            <div className="w-full text-center text-xs text-gray-500 mt-2">{daysOfWeek[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueOverview;