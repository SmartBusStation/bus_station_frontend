"use client";

import React from 'react';
import { PieChart } from 'lucide-react';

const TopDestinations = () => {
  const destinations = [
    { name: 'Tokyo, Japan', percentage: 35, visitors: 2680 },
    { name: 'Sydney, Australia', percentage: 28, visitors: 2140 },
    { name: 'Paris, France', percentage: 22, visitors: 1680 },
    { name: 'Venice, Italy', percentage: 15, visitors: 1140 }
  ];
  
  // Colors for the chart sections
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Top Destinations</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">This Month</button>
      </div>
      
      <div className="flex items-center">
        {/* Pie Chart */}
        <div className="w-1/2 relative">
          <div className="w-full h-40 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              {/* Create pie chart segments */}
              {destinations.map((destination, index) => {
                // Calculate angles for the pie segments
                const previousTotal = destinations
                  .slice(0, index)
                  .reduce((sum, d) => sum + d.percentage, 0);
                const startAngle = (previousTotal / 100) * 360;
                const endAngle = ((previousTotal + destination.percentage) / 100) * 360;
                
                // Convert angles to radians
                const startRad = (startAngle - 90) * Math.PI / 180;
                const endRad = (endAngle - 90) * Math.PI / 180;
                
                // Calculate points
                const x1 = 50 + 40 * Math.cos(startRad);
                const y1 = 50 + 40 * Math.sin(startRad);
                const x2 = 50 + 40 * Math.cos(endRad);
                const y2 = 50 + 40 * Math.sin(endRad);
                
                // Create path for the pie segment
                const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
                const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                
                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={colors[index % colors.length]}
                    strokeWidth="1"
                    stroke="white"
                  />
                );
              })}
              
              {/* Inner circle for donut chart */}
              <circle cx="50" cy="50" r="25" fill="white" />
            </svg>
          </div>
        </div>
        
        {/* Legend */}
        <div className="w-1/2 space-y-3">
          {destinations.map((destination, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-sm text-gray-700">{destination.name} ({destination.percentage}%)</span>
              </div>
              <span className="text-sm text-gray-500">{destination.visitors.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDestinations;