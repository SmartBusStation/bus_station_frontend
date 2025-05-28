"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Calendar as CalendarIcon, Plus, MoreHorizontal, Users, MapPin, Clock } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState('July 2025');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState('City Highlights');

  // Current month days configuration
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const firstDayOfMonth = 1; // Monday (0 = Sunday, 1 = Monday, etc.)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Previous month days to fill the grid
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => 30 - i);
  
  // Events data
  const events = [
    { 
      id: 1, 
      title: 'Romantic Getaway', 
      date: '3 - 7', 
      location: 'Paris, France', 
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      attendees: ['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg']
    },
    { 
      id: 2, 
      title: 'Cultural Exploration', 
      date: '5 - 8', 
      location: 'Tokyo, Japan', 
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      attendees: ['/avatar4.jpg', '/avatar5.jpg'] 
    },
    { 
      id: 3, 
      title: 'Adventure Tour', 
      date: '15 - 19', 
      location: 'Sydney, Australia', 
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      attendees: ['/avatar6.jpg', '/avatar7.jpg', '/avatar8.jpg', '/avatar9.jpg']
    },
    { 
      id: 4, 
      title: 'City Highlights', 
      date: '10 - 13', 
      location: 'New York, USA', 
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      attendees: ['/avatar10.jpg', '/avatar11.jpg', '/avatar12.jpg']
    },
    { 
      id: 5, 
      title: 'Safari Adventure', 
      date: '16 - 19', 
      location: 'Serengeti, Tanzania', 
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      attendees: ['/avatar13.jpg', '/avatar14.jpg']
    },
    { 
      id: 6, 
      title: 'Alpine Escape', 
      date: '18 - 21', 
      location: 'Swiss Alps', 
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      attendees: ['/avatar15.jpg', '/avatar16.jpg']
    },
    { 
      id: 7, 
      title: 'Seoul Cultural Exploration', 
      date: '22 - 25', 
      location: 'Seoul, South Korea', 
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      attendees: ['/avatar17.jpg', '/avatar18.jpg', '/avatar19.jpg']
    },
    { 
      id: 8, 
      title: 'Tokyo Cultural Adventure', 
      date: '26 - 29', 
      location: 'Tokyo, Japan', 
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      attendees: ['/avatar20.jpg', '/avatar21.jpg']
    },
    { 
      id: 9, 
      title: 'Romantic Getaway', 
      date: '29 - 31', 
      location: 'Venice, Italy', 
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      attendees: ['/avatar22.jpg', '/avatar23.jpg']
    },
    { 
      id: 10, 
      title: 'Bali Beach Escape', 
      date: '30 - Aug 3', 
      location: 'Bali, Indonesia', 
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      attendees: ['/avatar24.jpg', '/avatar25.jpg']
    },
  ];

  // Selected event details
  const selectedEventDetails = {
    title: 'City Highlights',
    destination: 'New York, USA',
    duration: '8 Days / 5 Nights',
    date: '11 - 16 July 2025',
    participants: 25,
    attendees: ['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg', '/avatar4.jpg', '/avatar5.jpg'],
    meetingPoints: [
      {
        type: 'Start',
        location: 'John F. Kennedy International Airport (JFK)',
        date: '11 July 2025',
        time: '10:00 AM'
      },
      {
        type: 'Finish',
        location: 'John F. Kennedy International Airport (JFK)',
        date: '16 July 2025',
        time: '12:00 PM'
      }
    ],
    stations: [
      {
        type: 'Start',
        location: 'Grand Central Terminal',
        date: '11 July 2025',
        time: '03:00 PM'
      },
      {
        type: 'Finish',
        location: 'Grand Central Terminal',
        date: '16 July 2025',
        time: '10:30 AM'
      }
    ]
  };

  // Function to render the calendar grid
  const renderCalendarGrid = () => {
    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Day headers */}
        {daysOfWeek.map((day, index) => (
          <div key={`header-${index}`} className="p-2 text-center text-xs font-medium text-gray-500 bg-white">
            {day}
          </div>
        ))}
        
        {/* Previous month days */}
        {previousMonthDays.reverse().map((day, index) => (
          <div key={`prev-${index}`} className="h-32 p-2 bg-gray-50 text-gray-400 text-xs">
            <div className="text-right">{day}</div>
          </div>
        ))}
        
        {/* Current month days */}
        {currentMonthDays.map((day, index) => {
          // Find events for this day
          const dayEvents = events.filter(event => {
            const [startDay, endDay] = event.date.split(' - ').map(d => parseInt(d));
            return day >= startDay && (endDay ? day <= endDay : day === startDay);
          });
          
          const isToday = day === 11; // Example: day 11 is "today"
          
          return (
            <div 
              key={`current-${index}`} 
              className={`h-32 p-2 bg-white relative ${isToday ? 'ring-2 ring-blue-200' : ''}`}
            >
              <div className={`text-right ${isToday ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                {day}
              </div>
              
              <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
                {dayEvents.map((event) => (
                  <div 
                    key={`event-${day}-${event.id}`}
                    className={`px-2 py-1 text-xs truncate border-l-2 rounded-r-sm ${event.color} ${
                      selectedEvent === event.title ? 'ring-1 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedEvent(event.title)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
            <div className="inline-flex items-center space-x-1">
              <button 
                className="p-1 rounded hover:bg-gray-100"
                onClick={() => setCurrentMonth('June 2025')}
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <span className="text-lg font-medium text-gray-800">{currentMonth}</span>
              <button 
                className="p-1 rounded hover:bg-gray-100"
                onClick={() => setCurrentMonth('August 2025')}
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="flex bg-white border border-gray-200 rounded-md overflow-hidden">
              <button 
                className={`px-3 py-1.5 text-sm font-medium ${viewMode === 'day' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setViewMode('day')}
              >
                Day
              </button>
              <button 
                className={`px-3 py-1.5 text-sm font-medium ${viewMode === 'week' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setViewMode('week')}
              >
                Week
              </button>
              <button 
                className={`px-3 py-1.5 text-sm font-medium ${viewMode === 'month' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setViewMode('month')}
              >
                Month
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar and Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {renderCalendarGrid()}
            </div>
          </div>
          
          <div>
            {/* Schedule Details */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Schedule Details</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-5">
                <h3 className="text-xl font-semibold text-blue-600">{selectedEventDetails.title}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{selectedEventDetails.destination}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{selectedEventDetails.duration}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{selectedEventDetails.date}</span>
                </div>
              </div>
              
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Total Participants</span>
                  <span className="text-sm text-gray-600">{selectedEventDetails.participants}</span>
                </div>
                
                <div className="flex -space-x-2 mb-2">
                  {[1, 2, 3, 4, 5].map((avatar, index) => (
                    <div key={index} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"></div>
                  ))}
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    +{selectedEventDetails.participants - 5}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Meeting Points</h4>
                
                {selectedEventDetails.meetingPoints.map((point, index) => (
                  <div key={`meeting-${index}`} className="mb-3">
                    <div className="flex items-start">
                      <div className="bg-blue-100 h-5 w-5 rounded-full flex items-center justify-center mt-1 mr-3">
                        <div className="bg-blue-500 h-2 w-2 rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-700">{point.type}</div>
                        <div className="text-sm text-gray-800 font-medium mt-0.5">{point.location}</div>
                        <div className="flex items-center mt-0.5">
                          <div className="text-xs text-gray-500 mr-3">{point.date}</div>
                          <div className="text-xs text-gray-500">{point.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Station</h4>
                
                {selectedEventDetails.stations.map((station, index) => (
                  <div key={`station-${index}`} className="mb-3">
                    <div className="flex items-start">
                      <div className="bg-purple-100 h-5 w-5 rounded-full flex items-center justify-center mt-1 mr-3">
                        <div className="bg-purple-500 h-2 w-2 rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-700">{station.type}</div>
                        <div className="text-sm text-gray-800 font-medium mt-0.5">{station.location}</div>
                        <div className="flex items-center mt-0.5">
                          <div className="text-xs text-gray-500 mr-3">{station.date}</div>
                          <div className="text-xs text-gray-500">{station.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Edit Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;