// src/components/dashboard/resources/VehiclesTab.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Vehicle } from "@/lib/types/dashboard";

const VehiclesTab = () => {
  const { t } = useTranslation();
  const mockVehicles: Vehicle[] = [
    {
      id: "veh-01",
      name: "Bus VIP",
      type: "Bus",
      plate: "CE 123 AB",
      capacity: 50,
      status: "available",
    },
    {
      id: "veh-02",
      name: "Minibus Confort",
      type: "Minibus",
      plate: "LT 456 XY",
      capacity: 25,
      status: "in_use",
    },
    {
      id: "veh-03",
      name: "Van Express",
      type: "Van",
      plate: "OU 789 WZ",
      capacity: 15,
      status: "maintenance",
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          {t("dashboard.resources.addVehicle")}
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t("dashboard.resources.vehicles.name")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t("dashboard.resources.vehicles.plate")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t("dashboard.resources.vehicles.capacity")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t("dashboard.resources.vehicles.status")}
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                {t("dashboard.resources.vehicles.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mockVehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  {vehicle.name} ({vehicle.type})
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{vehicle.plate}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {vehicle.capacity} {t("dashboard.resources.vehicles.seats")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap capitalize">
                  {t(`dashboard.resources.status.${vehicle.status}`)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right space-x-2">
                  <button className="text-gray-500 hover:text-primary">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesTab;
