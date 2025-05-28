"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useToggleSidebar } from '../../hooks/useToggleSidebar';
import { useWindowSize } from '../../hooks/useWindowSize';

// Retirez cette importation
// import { ResourceProvider } from '@/app/dashboard/context/ResourceContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isOpen, toggle } = useToggleSidebar();
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width < 1024);
  }, [width]);

  return (
    // Retirez le ResourceProvider ici
    <div className="flex h-screen bg-gray-50">
      <div className={`${isOpen ? 'w-64' : 'w-20'} hidden lg:block transition-all duration-300 ease-in-out`}>
        <Sidebar isOpen={isOpen} />
      </div>
      
      {isMobile && <MobileNav isOpen={isOpen} toggle={toggle} />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggle={toggle} isOpen={isOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;