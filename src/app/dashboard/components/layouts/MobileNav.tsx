"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  CalendarDays, 
  BookOpen, 
  Users, 
  Compass, 
  Image as ImageIcon, 
  MessageSquare, 
  Tags,
  BarChart4, 
  X
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  toggle: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, toggle }) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggle]);

  // Nous avons supprimé l'effet qui fermait la sidebar lors des changements de route
  // pour que la sidebar reste dans l'état où l'utilisateur l'a laissée

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Package, label: 'Packages', href: '/dashboard/packages' },
    { icon: BookOpen, label: 'Bookings', href: '/dashboard/bookings' },
    { icon: CalendarDays, label: 'Calendar', href: '/dashboard/calendar' },
    { icon: Users, label: 'Travelers', href: '/dashboard/travelers' },
    { icon: Compass, label: 'Guides', href: '/dashboard/guides' },
    { icon: ImageIcon, label: 'Gallery', href: '/dashboard/gallery' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', badge: 2 },
    { icon: Tags, label: 'Deals', href: '/dashboard/deals' },
    { icon: BarChart4, label: 'Feedback', href: '/dashboard/feedback' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
      <div 
        ref={sidebarRef}
        className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center">
            <div className="text-blue-600 font-bold text-2xl flex items-center">
              <span className="text-blue-800 mr-1">●</span> 
              <span className="ml-2">Travelie</span>
            </div>
          </Link>
          <button onClick={toggle} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Items */}
        <div className="overflow-y-auto h-full py-4">
          <nav className="px-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }
                  `}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Upgrade Banner */}
          <div className="p-4 mx-4 my-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white">
            <h3 className="font-medium mb-1">Enhance Your Travelie Experience!</h3>
            <p className="text-xs mb-3 text-blue-100">Unlock premium features today.</p>
            <button 
              className="w-full bg-white text-blue-600 font-medium py-2 px-3 rounded-lg text-sm hover:bg-blue-50 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;