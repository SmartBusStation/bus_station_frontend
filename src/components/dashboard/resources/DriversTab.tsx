// src/components/dashboard/resources/DriversTab.tsx

import React from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2, UserCheck } from "lucide-react";
import { useDriversTab } from "@/lib/hooks/dasboard/useDriverTab";
import AddDriverModal from "./AddDriverModal";
import Loader from "@/modals/Loader";

const DriversTab = () => {
  const { t } = useTranslation();
  const hook = useDriversTab();

  if (hook.isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader />
      </div>
    );
  }

  if (hook.apiError && !hook.isModalOpen) {
    // N'affiche pas l'erreur de fond si la modale a sa propre erreur
    return (
      <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
        {hook.apiError}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={hook.openModal}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          {t("dashboard.resources.addDriver")}
        </button>
      </div>

      <AddDriverModal hook={hook} />

      {hook.drivers.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Aucun chauffeur trouvé
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez par ajouter votre premier chauffeur.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Nom
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Téléphone
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {hook.drivers.map((driver, idx) => (
                <tr key={driver.id ?? `driver-${idx}`}>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                    {driver.first_name} {driver.last_name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {driver.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {driver.phone_number}
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
      )}
    </div>
  );
};

export default DriversTab;
