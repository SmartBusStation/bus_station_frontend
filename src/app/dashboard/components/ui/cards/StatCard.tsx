"use client";

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  trend: 'up' | 'down';
  chartColor: 'blue' | 'emerald' | 'amber' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend, 
  chartColor 
}) => {
  // Generate a simple line chart with random data
  const generateChart = () => {
    // Generate random points for the chart
    const points = Array.from({ length: 10 }, () => 
      Math.floor(Math.random() * 50) + 30
    );
    
    // Calculate chart dimensions
    const width = 80;
    const height = 30;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min;
    
    // Create SVG path
    const pathData = points.map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    return pathData;
  };

  // Get color classes based on chartColor and trend
  const getColorClasses = () => {
    const colorMap = {
      blue: {
        path: 'stroke-blue-500',
        fill: 'fill-blue-100',
        trendUp: 'text-green-600',
        trendDown: 'text-red-600',
      },
      emerald: {
        path: 'stroke-emerald-500',
        fill: 'fill-emerald-100',
        trendUp: 'text-green-600',
        trendDown: 'text-red-600',
      },
      amber: {
        path: 'stroke-amber-500',
        fill: 'fill-amber-100',
        trendUp: 'text-green-600',
        trendDown: 'text-red-600',
      },
      red: {
        path: 'stroke-red-500',
        fill: 'fill-red-100',
        trendUp: 'text-green-600',
        trendDown: 'text-red-600',
      },
    };

    return {
      pathClass: colorMap[chartColor].path,
      fillClass: colorMap[chartColor].fill,
      trendClass: trend === 'up' ? colorMap[chartColor].trendUp : colorMap[chartColor].trendDown,
    };
  };

  const { pathClass, fillClass, trendClass } = getColorClasses();
  const pathData = generateChart();

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-semibold text-gray-800">{value}</span>
            <span className={`ml-2 flex items-center text-sm ${trendClass}`}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {change}
            </span>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      <div className="mt-3">
        <svg 
          viewBox={`0 0 80 30`} 
          className="w-full h-10 mt-3"
          preserveAspectRatio="none"
        >
          {/* Area fill */}
          <path 
            d={`${pathData} L 80 30 L 0 30 Z`} 
            className={fillClass}
            opacity="0.2"
          />
          
          {/* Line */}
          <path 
            d={pathData} 
            fill="none" 
            className={`${pathClass} stroke-2`}
          />
        </svg>
      </div>
    </div>
  );
};

export default StatCard;