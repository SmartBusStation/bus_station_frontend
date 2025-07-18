"use client";

import Footer from "@/components/layouts/Footer";
import React, {useState} from "react";
import NavBar from "@/components/layouts/customer-navbar/CustomerNavBar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";


export default function AgenciesLayout({children,}: { children: React.ReactNode; }) {


    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
      <div className="flex min-h-screen flex-col gap-4">
          <div className="flex h-screen overflow-hidden">
              <DashboardSidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
              />
              <div className="flex-1 flex flex-col">
                  <NavBar onMenuClick={() => setSidebarOpen(!sidebarOpen)}/>
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
                      {children}
                  </main>
              </div>
          </div>
          <Footer/>
      </div>
  );
}
