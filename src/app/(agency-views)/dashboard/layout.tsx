"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import CustomerNavBar from "@/components/layouts/customer-navbar/CustomerNavBar";
import { AgencyProvider } from '@/lib/contexts/AgencyContext';


export default function DashboardLayout({children,}: { children: React.ReactNode})
{
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AgencyProvider>
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Utilisation de CustomerNavBar au lieu de DashboardHeader */}
        <CustomerNavBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isDashboard={true}
        />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </AgencyProvider>
  );
}
