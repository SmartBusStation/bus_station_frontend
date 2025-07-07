// src/components/dashboard/resources/AddVehicleModal.tsx

import React from "react";
import { X } from "lucide-react";
import { useVehiclesTab } from "@/lib/hooks/dasboard/useVehiclesTab";
import InputField from "@/ui/InputField";
import TextareaField from "@/ui/TextareaField";

interface AddVehicleModalProps {
  hook: ReturnType<typeof useVehiclesTab>;
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ hook }) => {
  const { isModalOpen, closeModal, form, onSubmit, isSubmitting, apiError } =
    hook;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold">Ajouter un nouveau véhicule</h2>
          <button
            onClick={closeModal}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow overflow-y-auto"
        >
          <div className="p-6 space-y-4">
            {apiError && (
              <div className="p-3 bg-red-100 text-red-800 border border-red-200 rounded-md text-sm">
                {apiError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="nom"
                label="Nom du Véhicule"
                placeholder="Bus VIP 01"
                register={register("nom")}
                error={errors.nom?.message}
              />
              <InputField
                id="modele"
                label="Modèle"
                placeholder="Coaster"
                register={register("modele")}
                error={errors.modele?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="plaqueMatricule"
                label="Plaque d'immatriculation"
                register={register("plaqueMatricule")}
                error={errors.plaqueMatricule?.message}
              />
              <InputField
                id="nbrPlaces"
                type="number"
                label="Nombre de places"
                register={register("nbrPlaces")}
                error={errors.nbrPlaces?.message}
              />
            </div>

            <TextareaField
              id="description"
              label="Description (Optionnel)"
              register={register("description")}
              error={errors.description?.message}
            />
            <InputField
              id="lienPhoto"
              label="URL de l'image (Optionnel)"
              register={register("lienPhoto")}
              error={errors.lienPhoto?.message}
            />
          </div>
          <div className="p-6 bg-gray-50 border-t flex justify-end gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-white border rounded-md text-sm font-medium hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:bg-primary/50"
            >
              {isSubmitting ? "Création en cours..." : "Ajouter le véhicule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
