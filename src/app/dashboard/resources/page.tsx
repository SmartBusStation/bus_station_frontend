// src/app/dashboard/resources/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation"; // NOUVEAU
import { Car, UserCheck, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import VehiclesTab from "@/components/dashboard/resources/VehiclesTab";
import DriversTab from "@/components/dashboard/resources/DriversTab";
import EmployeesTab from "@/components/dashboard/resources/EmployeesTab";
import { ResourceTab } from "@/lib/types/dashboard";

const ResourcesPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams(); // NOUVEAU
  const [activeTab, setActiveTab] = useState<ResourceTab>("vehicles");

  // NOUVEAU: Lire le paramètre d'URL au chargement
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === 'vehicles' || tab === 'drivers' || tab === 'employees') {
        setActiveTab(tab);
    }
  }, [searchParams]);




  const tabs = [
    {
      id: "vehicles",
      label: t("dashboard.resources.tabs.vehicles"),
      icon: Car,
    },
    {
      id: "drivers",
      label: t("dashboard.resources.tabs.drivers"),
      icon: UserCheck,
    },
    {
      id: "employees",
      label: t("dashboard.resources.tabs.employees"),
      icon: Users,
    },
  ];

  return (
    <>
      <PageHeader
        title={t("dashboard.resources.title")}
        subtitle={t("dashboard.resources.subtitle")}
      />

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ResourceTab)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}>
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === "vehicles" && <VehiclesTab />}
        {activeTab === "drivers" && <DriversTab />}
        {activeTab === "employees" && <EmployeesTab />}
      </div>
    </>
  );
};

export default ResourcesPage;
