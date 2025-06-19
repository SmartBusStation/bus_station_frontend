"use client";

import React, { useState } from 'react';
import { Search, Filter, Calendar, ArrowUpRight, ArrowDownRight, Plus, ChevronDown, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const BookingsPage = () => {
  const [selectedDate, setSelectedDate] = useState('today');

  // Mock data
  const stats = [
    {
      title: 'Total Booking',
      value: '1,200',
      change: '+2.8%',
      trend: 'up',
      icon: 'document'
    },
    {
      title: 'Total Participants',
      value: '2,845',
      change: '-1.6%',
      trend: 'down',
      icon: 'users'
    },
    {
      title: 'Total Earnings',
      value: '$14,795',
      change: '+3.75%',
      trend: 'up',
      icon: 'money'
    }
  ];

  const topPackages = [
    { name: 'Tokyo Cultural Adventure', participants: 580, color: 'bg-blue-500' },
    { name: 'Bali Beach Escape', participants: 405, color: 'bg-indigo-500' },
    { name: 'Safari Adventure', participants: 346, color: 'bg-amber-500' },
    { name: 'Greek Island Hopping', participants: 276, color: 'bg-emerald-500' }
  ];

  const bookings = [
    { id: 'BK012345', name: 'Camelia Swan', package: 'Venice Dreams', duration: '8 Days / 7 Nights', date: 'June 25 - June 30', price: '$1,500', status: 'Confirmed' },
    { id: 'BK012346', name: 'Raphael Goodman', package: 'Safari Adventure', duration: '8 Days / 7 Nights', date: 'Jun 25 - Jul 2', price: '$3,200', status: 'Pending' },
    { id: 'BK012347', name: 'Ludwig Contessa', package: 'Alpine Escape', duration: '7 Days / 6 Nights', date: 'Jun 26 - Jul 2', price: '$2,100', status: 'Confirmed' },
    { id: 'BK012348', name: 'Armina Raul Meyes', package: 'Caribbean Cruise', duration: '10 Days / 9 Nights', date: 'Jun 26 - Jul 5', price: '$2,800', status: 'Cancelled' },
    { id: 'BK012349', name: 'James Dunn', package: 'Parisian Romance', duration: '5 Days / 4 Nights', date: 'Jun 28 - Jun 30', price: '$1,200', status: 'Confirmed' },
    { id: 'BK012350', name: 'Hilary Grey', package: 'Tokyo Cultural Adventure', duration: '7 Days / 6 Nights', date: 'Jun 27 - Jul 3', price: '$1,800', status: 'Confirmed' },
    { id: 'BK012351', name: 'Lucas O\'Connor', package: 'Greek Island Hopping', duration: '10 Days / 9 Nights', date: 'Jun 28 - Jul 7', price: '$2,500', status: 'Pending' },
    { id: 'BK012352', name: 'Layla Uneh', package: 'Bali Beach Escape', duration: '8 Days / 7 Nights', date: 'Jun 29 - Jul 6', price: '$1,600', status: 'Confirmed' }
  ];

  // Monthly chart data
  const months = ['Aug 27', 'Sep 27', 'Oct 27', 'Nov 27', 'Dec 27', 'Jan 28', 'Feb 28', 'Mar 28', 'Apr 28', 'May 28', 'Jun 28', 'Jul 28'];
  const doneData = [600, 800, 900, 1000, 1200, 1000, 1100, 1300, 1400, 1200, 1300, 1750];
  const cancelledData = [300, 400, 350, 500, 600, 550, 600, 650, 700, 600, 550, 520];
  const maxValue = Math.max(...doneData, ...cancelledData);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-semibold text-gray-800">{stat.value}</span>
                    <span 
                      className={`ml-2 flex items-center text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-0.5" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">from last week</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {stat.icon === 'document' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    ) : stat.icon === 'users' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="relative h-8">
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 100 20" className="w-full h-full">
                      <path 
                        d={`M0 20 Q 20 ${index === 0 ? 10 : (index === 1 ? 15 : 5)} 40 ${index === 0 ? 5 : (index === 1 ? 18 : 10)} T 60 ${index === 0 ? 15 : (index === 1 ? 8 : 15)} T 80 ${index === 0 ? 7 : (index === 1 ? 12 : 5)} T 100 ${index === 0 ? 12 : (index === 1 ? 5 : 10)}`} 
                        fill="none" 
                        className={`stroke-2 ${
                          index === 0 
                            ? 'stroke-blue-500' 
                            : index === 1 
                              ? 'stroke-red-500' 
                              : 'stroke-green-500'
                        }`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trips Overview Chart */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800">Trips Overview</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
              Last 12 Months
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <div className="h-72">
            <svg viewBox={`0 0 ${months.length * 60} 250`} className="w-full h-full">
              {/* Y-axis grid lines */}
              {[0, 500, 1000, 1500, 2000].map((value, i) => (
                <g key={i}>
                  <line 
                    x1="0" 
                    y1={250 - (value / maxValue) * 200} 
                    x2={months.length * 60} 
                    y2={250 - (value / maxValue) * 200} 
                    stroke="#e5e7eb" 
                    strokeWidth="1" 
                  />
                  <text 
                    x="-5" 
                    y={250 - (value / maxValue) * 200} 
                    fill="#9ca3af" 
                    fontSize="10" 
                    textAnchor="end" 
                    dominantBaseline="middle"
                  >
                    {value}
                  </text>
                </g>
              ))}
              
              {/* X-axis months */}
              {months.map((month, i) => (
                <text 
                  key={i} 
                  x={i * 60 + 30} 
                  y="245" 
                  fill="#9ca3af" 
                  fontSize="10" 
                  textAnchor="middle"
                >
                  {month}
                </text>
              ))}
              
              {/* Vertical line at July 2023 */}
              <line 
                x1={11 * 60} 
                y1="50" 
                x2={11 * 60} 
                y2="220" 
                stroke="#3b82f6" 
                strokeWidth="1" 
                strokeDasharray="4" 
              />
              <text 
                x={11 * 60} 
                y="40" 
                fill="#3b82f6" 
                fontSize="10" 
                textAnchor="middle"
              >
                July 2023
              </text>
              
              {/* Done data line */}
              <path 
                d={doneData.map((value, i) => 
                  `${i === 0 ? 'M' : 'L'} ${i * 60 + 30} ${250 - (value / maxValue) * 200}`
                ).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              
              {/* Cancelled data line */}
              <path 
                d={cancelledData.map((value, i) => 
                  `${i === 0 ? 'M' : 'L'} ${i * 60 + 30} ${250 - (value / maxValue) * 200}`
                ).join(' ')}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="4"
              />
              
              {/* Data points for Done */}
              {doneData.map((value, i) => (
                <circle 
                  key={i} 
                  cx={i * 60 + 30} 
                  cy={250 - (value / maxValue) * 200} 
                  r="3" 
                  fill="#3b82f6" 
                />
              ))}
            </svg>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-2">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Done: 620</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 border border-gray-300 bg-gray-100 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Cancelled: 115</span>
            </div>
          </div>
        </div>

        {/* Top Packages and Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Top Packages Chart */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Top Packages</h2>
            
            <div className="relative mt-2">
              <div className="flex justify-center mb-2">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-800">1,856</span>
                  <div className="text-xs text-gray-500">Total Participants</div>
                </div>
              </div>
              
              {/* Donut Chart */}
              <div className="relative h-40 w-40 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Create pie chart sections with different colors and percentages */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  
                  {/* Calculate stroke-dasharray and stroke-dashoffset for each segment */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="20" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#818cf8" 
                    strokeWidth="20" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="188.4" // 251.2 - (251.2 * 0.25)
                    transform="rotate(-90 50 50)"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#fbbf24" 
                    strokeWidth="20" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="125.6" // Previous offset - (251.2 * 0.25)
                    transform="rotate(-90 50 50)"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="20" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="62.8" // Previous offset - (251.2 * 0.25)
                    transform="rotate(-90 50 50)"
                  />
                  
                  {/* Inner white circle */}
                  <circle cx="50" cy="50" r="30" fill="white" />
                </svg>
              </div>
              
              {/* Legend */}
              <div className="mt-4 space-y-2">
                {topPackages.map((pkg, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 ${pkg.color} rounded-full mr-2`}></div>
                      <span className="text-sm text-gray-700 truncate w-32">{pkg.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{pkg.participants}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="lg:col-span-3 bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">Bookings</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select 
                    className="appearance-none block pl-3 pr-8 py-1.5 text-sm rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="text-sm">Add Booking</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Code
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {bookings.map((booking, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {booking.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.id}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.package}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.duration}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.date}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {booking.price}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'Pending' 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">8</span> out of <span className="font-medium">286</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded-md text-gray-600 hover:bg-gray-100">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="h-8 w-8 text-sm flex items-center justify-center rounded-md bg-blue-600 text-white">
                  1
                </button>
                <button className="h-8 w-8 text-sm flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100">
                  2
                </button>
                <button className="h-8 w-8 text-sm flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100">
                  3
                </button>
                <span className="text-gray-500">...</span>
                <button className="h-8 w-8 text-sm flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100">
                  16
                </button>
                <button className="p-1 rounded-md text-gray-600 hover:bg-gray-100">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookingsPage;