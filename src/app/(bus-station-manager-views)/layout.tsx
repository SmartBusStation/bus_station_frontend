"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Imports de composants
import Footer from "@/components/layouts/Footer";
import NavBar from "@/components/layouts/customer-navbar/CustomerNavBar";
import BusStationDashboardSidebar from "@/components/bus-station-dashboard/BusStationDashboardSidebar";
import { getBusStationNavLinks } from "./bsm-dashboard/busStationNavLink";

export default function BusStationManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();
  const { menuItems, secondaryMenuItems } = getBusStationNavLinks(t);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <BusStationDashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItems}
        secondaryMenuItems={secondaryMenuItems}
        // logout={logoutFunctionHere} // Logout functionality to be implemented and passed if needed
      />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <NavBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
