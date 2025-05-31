"use client";

import React from 'react';
import { Activity, User, BookOpen, Check, X } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      icon: User,
      color: 'bg-blue-100 text-blue-700',
      text: 'Noah Carter updated his profile and updated new payment method',
      time: '9:15 AM'
    },
    {
      icon: BookOpen,
      color: 'bg-green-100 text-green-700',
      text: 'Camelia Swan booked the Venice Dreams package for Jun 25, 2024',
      time: '10:07 AM'
    },
    {
      icon: Check,
      color: 'bg-purple-100 text-purple-700',
      text: 'Payment was processed for Ludwig Contessa\'s Alpine Escape package',
      time: '11:14 AM'
    },
    {
      icon: X,
      color: 'bg-red-100 text-red-700',
      text: 'Armina Raul Meyes canceled her Caribbean Cruise package',
      time: '12:30 PM'
    },
    {
      icon: Activity,
      color: 'bg-amber-100 text-amber-700',
      text: 'Layla Phillips submitted a review for Bali Beach package',
      time: '2:25 PM'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
      </div>
      
      <div className="relative">
        {/* Timeline with activities */}
        <div className="absolute top-0 bottom-0 left-5 border-l-2 border-dashed border-gray-200 z-0"></div>
        
        <div className="space-y-5 relative z-10">
          {activities.map((activity, index) => (
            <div key={index} className="flex">
              <div className={`h-10 w-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm text-gray-700">{activity.text}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;