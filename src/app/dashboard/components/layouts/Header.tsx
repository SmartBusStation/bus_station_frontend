"use client";

import React, { useState } from 'react';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  toggle: () => void;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggle, isOpen }) => {
  const [notifications, setNotifications] = useState(3);
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left side - Menu Toggle & Search */}
        <div className="flex items-center flex-1">
          <button 
            onClick={toggle} 
            className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors lg:mr-2"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden md:flex ml-4 w-full max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search anything"
              className="block w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                {notifications}
              </span>
            )}
          </button>
          
          {/* Profile Menu */}
          <div className="relative ml-3 flex items-center">
            <div className="flex items-center">
              <button className="flex text-sm items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src="/public/images/team/member1.svg"
                    alt="User profile"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-2 text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-800">Ruben Herultz</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;