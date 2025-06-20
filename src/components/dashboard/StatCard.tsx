// src/components/dashboard/StatCard.tsx
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { StatCardData } from "@/lib/types/dashboard";

const StatCard: React.FC<StatCardData> = ({
  label,
  value,
  change,
  changeType,
  icon: Icon,
}) => {
  const isIncrease = changeType === "increase";
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div
          className="flex items-center gap-1 rounded-full px-2 py-1"
          style={{ backgroundColor: isIncrease ? "#dcfce7" : "#fee2e2" }}>
          {isIncrease ? (
            <ArrowUp className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-600" />
          )}
          <span
            className={`text-sm font-medium ${
              isIncrease ? "text-green-700" : "text-red-700"
            }`}>
            {change}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
    </div>
  );
};

export default StatCard;
