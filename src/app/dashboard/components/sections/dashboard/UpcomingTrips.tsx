"use client";

import React from 'react';
import { Clock } from 'lucide-react';

const UpcomingTrips = () => {
  const trips = [
    {
      title: 'Romantic Getaway',
      location: 'Paris, France',
      dates: '23 - 26 July',
      images: ['/path/to/avatar1.jpg', '/path/to/avatar2.jpg'],
      extraGuests: 2
    },
    {
      title: 'Cultural Exploration',
      location: 'Tokyo, Japan',
      dates: '12 - 18 July',
      images: ['/path/to/avatar3.jpg', '/path/to/avatar4.jpg', '/path/to/avatar5.jpg'],
      extraGuests: 1
    },
    {
      title: 'Adventure Tour',
      location: 'Sydney, Australia',
      dates: '15 - 23 July',
      images: ['/path/to/avatar6.jpg', '/path/to/avatar7.jpg', '/path/to/avatar8.jpg', '/path/to/avatar9.jpg'],
      extraGuests: 0
    },
    {
      title: 'City Highlights',
      location: 'New York, USA',
      dates: '25 - 29 July',
      images: ['/path/to/avatar10.jpg', '/path/to/avatar11.jpg', '/path/to/avatar12.jpg'],
      extraGuests: 0
    }
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Trips</h2>
        <button className="p-1 text-blue-600 hover:text-blue-800 rounded-full">+</button>
      </div>
      
      <div className="space-y-4">
        {trips.map((trip, index) => (
          <div key={index} className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50">
            {/* Color block + icon */}
            <div className={`h-12 w-1 mr-3 rounded-full ${
              index % 4 === 0 ? 'bg-blue-500' : 
              index % 4 === 1 ? 'bg-purple-500' : 
              index % 4 === 2 ? 'bg-amber-500' : 
              'bg-green-500'
            }`}></div>
            
            {/* Trip details */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{trip.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">{trip.location}</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{trip.dates}</span>
                </div>
              </div>
            </div>
            
            {/* Avatars */}
            <div className="flex -space-x-2">
              {trip.images.slice(0, 3).map((image, idx) => (
                <div key={idx} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"></div>
              ))}
              {trip.extraGuests > 0 && (
                <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  +{trip.extraGuests}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTrips;