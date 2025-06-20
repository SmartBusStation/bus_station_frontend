// src/components/dashboard/overview/OverviewCharts.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTranslation } from "react-i18next";

const data = [
  { name: "Jan", bookings: 30, revenue: 2400 },
  { name: "Fév", bookings: 45, revenue: 3800 },
  { name: "Mar", bookings: 60, revenue: 9800 },
  { name: "Avr", bookings: 50, revenue: 6000 },
  { name: "Mai", bookings: 70, revenue: 11000 },
  { name: "Juin", bookings: 85, revenue: 12500 },
];

const OverviewCharts = () => {
  const { t } = useTranslation();

  return (
    <div className="col-span-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm xl:col-span-8">
      <h4 className="mb-4 text-xl font-semibold text-gray-900">
        {t("dashboard.overview.charts.bookingsOverview")}
      </h4>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
            <YAxis stroke="#a1a1aa" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#18181b", fontWeight: "bold" }}
            />
            <Bar
              dataKey="bookings"
              fill="#3b82f6"
              name={t("dashboard.overview.charts.bookingsLabel")}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewCharts;
