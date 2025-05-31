"use client";

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  CalendarDays, 
  BookOpen, 
  Users, 
  Compass, 
  Image, 
  MessageSquare, 
  Tags,
  Car,
  Route,  
  BarChart4, 
  LogOut,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { 
      icon: BarChart4, 
      label: 'Resources', 
      submenu: [
        { icon: Car, label: 'Vehicles', href: '/dashboard/resources/vehicles' },
        { icon: Users, label: 'Drivers', href: '/dashboard/resources/drivers' }
      ]
    },
    { icon: Route, label: 'Trip Planning', href: '/dashboard/trip-planning' },
    { icon: BookOpen, label: 'Bookings', href: '/dashboard/bookings' },
    { icon: Package, label: 'Packages', href: '/dashboard/packages' },
    { icon: CalendarDays, label: 'Calendar', href: '/dashboard/calendar' },
   // { icon: Users, label: 'Travelers', href: '/dashboard/travelers' },
    //{ icon: Compass, label: 'Guides', href: '/dashboard/guides' },
    //{ icon: Image, label: 'Gallery', href: '/dashboard/gallery' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 2 },
    { icon: Tags, label: 'Deals', href: '/dashboard/deals' },
    { icon: BarChart4, label: 'Feedback', href: '/dashboard/feedback' },
  ];

  return (
    <div className="h-full bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-center">
        <Link href="/dashboard" className="flex items-center">
          <div className="text-blue-600 font-bold text-2xl flex items-center">
            <span className="text-blue-800 mr-1">●</span> 
            {isOpen && (
              <span className="ml-2 transition-opacity duration-300 tracking-tight">Mooving.com</span>
            )}
          </div>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.submenu && item.submenu.some(subItem => pathname === subItem.href));
            
            if (item.submenu) {
              const isDropdownOpen = openDropdown === item.label;
              return (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon className={`${isOpen ? 'mr-3' : ''} h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      {isOpen && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>
                    {isOpen && (
                      <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                  
                  {isOpen && isDropdownOpen && (
                    <div className="ml-7 space-y-1">
                      {item.submenu.map(subItem => {
                        const isSubItemActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`
                              flex items-center px-3 py-2 rounded-md text-sm transition-colors
                              ${isSubItemActive 
                                ? 'bg-blue-50 text-blue-700 font-medium' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                              }
                            `}
                          >
                            <subItem.icon className={`mr-3 h-4 w-4 ${isSubItemActive ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className="truncate">{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }
                `}
              >
                <item.icon className={`${isOpen ? 'mr-3' : ''} h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                {isOpen && (
                  <span className="truncate">{item.label}</span>
                )}
                {isOpen && item.badge && (
                  <span className="ml-auto bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Upgrade Banner */}
      {isOpen && (
        <div className="p-4 mx-3 my-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white shadow-md">
          <h3 className="font-medium mb-1 text-sm">Enhance Your Experience!</h3>
          <p className="text-xs mb-3 text-blue-100 opacity-90">Unlock premium features today.</p>
          <button 
            className="w-full bg-white text-blue-600 font-medium py-2 px-3 rounded-md text-sm hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Upgrade Now
          </button>
        </div>
      )}

      {/* Logout Button */}
      <div className="p-3 border-t border-gray-100">
        <button className={`
          flex items-center px-3 py-2.5 w-full rounded-md text-sm font-medium
          text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-200 focus:outline-none
        `}>
          <LogOut className={`${isOpen ? 'mr-3' : ''} h-5 w-5 flex-shrink-0 text-gray-500`} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;