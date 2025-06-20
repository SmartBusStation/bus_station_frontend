// src/app/dashboard/page.tsx
"use client";

import React from "react";
import { DollarSign, BookOpen, BarChart3, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import OverviewCharts from "@/components/dashboard/overview/OverviewCharts";
import RecentBookings from "@/components/dashboard/overview/RecentBookings";
import { useTranslation } from "react-i18next";
import { StatCardData } from "@/lib/types/dashboard";

const DashboardOverviewPage = () => {
  const { t } = useTranslation();

  const stats: StatCardData[] = [
    {
      label: t("dashboard.overview.totalRevenue"),
      value: "7 500 000 FCFA", // MODIFIÉ
      change: "12.5%",
      changeType: "increase",
      icon: DollarSign,
    },
    {
      label: t("dashboard.overview.totalBookings"),
      value: "350",
      change: "8.2%",
      changeType: "increase",
      icon: BookOpen,
    },
    {
      label: t("dashboard.overview.publishedTrips"),
      value: "45",
      change: "2.1%",
      changeType: "decrease",
      icon: BarChart3,
    },
    {
      label: t("dashboard.overview.newCustomers"),
      value: "89",
      change: "25%",
      changeType: "increase",
      icon: Users,
    },
  ];

  return (
    <>
      <PageHeader
        title={t("dashboard.overview.title")}
        subtitle={t("dashboard.overview.subtitle")}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
        <OverviewCharts />
        <RecentBookings />
      </div>
    </>
  );
};

export default DashboardOverviewPage;
