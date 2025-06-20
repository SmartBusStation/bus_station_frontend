// src/app/dashboard/layout.tsx
"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import CustomerNavBar from "@/components/layouts/customer-navbar/CustomerNavBar"; // Changer l'import
import Footer from "@/components/layouts/Footer"; // Importer le Footer

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100/50">
      <div className="flex flex-1">
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Utilisation de CustomerNavBar au lieu de DashboardHeader */}
          <CustomerNavBar
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            isDashboard={true} // Indiquer que nous sommes dans le dashboard
          />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
