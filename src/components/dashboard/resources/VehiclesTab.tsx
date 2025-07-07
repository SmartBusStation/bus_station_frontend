// src/components/dashboard/resources/VehiclesTab.tsx

import React from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2, Car, AlertCircle } from "lucide-react";
import { useVehiclesTab } from "@/lib/hooks/dasboard/useVehiclesTab";
import AddVehicleModal from "./AddVehicleModal";
import Loader from "@/modals/Loader";

const VehiclesTab = () => {
  const { t } = useTranslation();
  const hook = useVehiclesTab();

  if (hook.isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader />
      </div>
    );
  }

  if (hook.apiError) {
    return (
      <div className="p-6 text-center text-red-700 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-lg font-semibold">Erreur de chargement</h3>
        <p className="mt-1 text-sm">{hook.apiError}</p>
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
          {t("dashboard.resources.addVehicle")}
        </button>
      </div>

      <AddVehicleModal hook={hook} />

      {hook.vehicles.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <Car className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Aucun véhicule trouvé
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez par ajouter votre premier véhicule.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Nom / Modèle
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Plaque
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Capacité
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {hook.vehicles.map((vehicle) => (
                <tr key={vehicle.idVehicule}>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                    {vehicle.nom} ({vehicle.modele})
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {vehicle.plaqueMatricule}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {vehicle.nbrPlaces} places
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

export default VehiclesTab;
