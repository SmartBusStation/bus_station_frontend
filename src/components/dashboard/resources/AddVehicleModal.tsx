"use client"

import type React from "react"
import { X } from "lucide-react"
import type { useVehiclesTab } from "@/lib/hooks/dasboard/useVehiclesTab"
import InputField from "@/ui/InputField"
import TextareaField from "@/ui/TextareaField"

interface AddVehicleModalProps {
  hook: ReturnType<typeof useVehiclesTab>
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ hook }) => {
  const {closeModal, form, onSubmit, isSubmitting, apiError, editingVehicle } = hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const isEditMode = !!editingVehicle



  return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
        <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditMode ? "Modifier le véhicule" : "Ajouter un nouveau véhicule"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {isEditMode ? "Modifiez les informations du véhicule" : "Remplissez les informations du véhicule"}
              </p>
            </div>
            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Fermer">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              {apiError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{apiError}</p>
                  </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                      id="nom"
                      label="Nom du Véhicule"
                      register={register("nom")}
                      error={errors.nom?.message}
                      placeholder="Ex: Bus Mercedes"
                  />
                  <InputField
                      id="modele"
                      label="Modèle"
                      register={register("modele")}
                      error={errors.modele?.message}
                      placeholder="Ex: Sprinter 2023"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                      id="plaqueMatricule"
                      label="Plaque d'immatriculation"
                      register={register("plaqueMatricule")}
                      error={errors.plaqueMatricule?.message}
                      placeholder="Ex: ABC-123-DE"
                  />
                  <InputField
                      id="nbrPlaces"
                      type="number"
                      label="Nombre de places"
                      register={register("nbrPlaces")}
                      error={errors.nbrPlaces?.message}
                      placeholder="Ex: 50"
                  />
                </div>

                <TextareaField
                    id="description"
                    label="Description (Optionnel)"
                    register={register("description")}
                    error={errors.description?.message}
                    placeholder="Décrivez les caractéristiques du véhicule..."
                />

                <InputField
                    id="lienPhoto"
                    label="URL de l'image (Optionnel)"
                    register={register("lienPhoto")}
                    error={errors.lienPhoto?.message}
                    placeholder="https://exemple.com/image.jpg"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
              <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                    ? isEditMode
                        ? "Modification..."
                        : "Création..."
                    : isEditMode
                        ? "Enregistrer les modifications"
                        : "Ajouter le véhicule"}
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default AddVehicleModal
