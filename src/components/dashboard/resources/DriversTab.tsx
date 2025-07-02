// src/components/dashboard/resources/DriversTab.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Driver } from "@/lib/types/dashboard";
import { useDashboard } from "@/context/DashboardContext"; // NOUVEAU

const DriversTab = () => {
  const { t } = useTranslation();
  const { drivers } = useDashboard(); // Utiliser les données du contexte

  const mockDrivers: Driver[] = [
    {
      id: "drv-01",
      name: "Jean Dupont",
      license: "Permis D",
      phone: "0612345678",
      status: "available",
    },
    {
      id: "drv-02",
      name: "Amina Diallo",
      license: "Permis D",
      phone: "0687654321",
      status: "on_trip",
    },
    {
      id: "drv-03",
      name: "Paul Martin",
      license: "Permis D",
      phone: "0611223344",
      status: "on_leave",
    },
  ];

  const getStatusClasses = (status: Driver["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700";
      case "on_trip":
        return "bg-blue-100 text-blue-700";
      case "on_leave":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          {t("dashboard.resources.addDriver")}
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Nom
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Permis
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Téléphone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Statut
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mockDrivers.map((driver) => (
              <tr key={driver.id}>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                  {driver.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {driver.license}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {driver.phone}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses(
                      driver.status
                    )}`}>
                    {driver.status.replace("_", " ")}
                  </span>
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

export default DriversTab;
