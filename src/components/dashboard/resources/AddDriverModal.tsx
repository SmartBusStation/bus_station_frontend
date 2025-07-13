"use client"

import type React from "react"
import { X } from "lucide-react"
import type { useDriversTab } from "@/lib/hooks/dasboard/useDriverTab"
import InputField from "@/ui/InputField"
import SelectField from "@/ui/SelectField"

interface AddDriverModalProps {
  hook: ReturnType<typeof useDriversTab>
}

const AddDriverModal: React.FC<AddDriverModalProps> = ({ hook }) => {
  const { closeModal, form, onSubmit, isSubmitting, apiError, editingDriver } = hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const isEditMode = !!editingDriver

  return (
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditMode ? "Modifier le chauffeur" : "Ajouter un nouveau chauffeur"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {isEditMode ? "Modifiez les informations du chauffeur" : "Remplissez les informations du chauffeur"}
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
                      id="first_name"
                      label="Prénom"
                      register={register("first_name")}
                      error={errors.first_name?.message}
                      placeholder="Ex: Jean"
                  />
                  <InputField
                      id="last_name"
                      label="Nom"
                      register={register("last_name")}
                      error={errors.last_name?.message}
                      placeholder="Ex: Dupont"
                  />
                </div>

                <InputField
                    id="username"
                    label="Nom d'utilisateur"
                    register={register("username")}
                    error={errors.username?.message}
                    placeholder="Ex: jean.dupont"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                      id="email"
                      type="email"
                      label="Email"
                      register={register("email")}
                      error={errors.email?.message}
                      placeholder="jean.dupont@email.com"
                  />
                  <InputField
                      id="phone_number"
                      type="tel"
                      label="Téléphone"
                      register={register("phone_number")}
                      error={errors.phone_number?.message}
                      placeholder="+237 6XX XXX XXX"
                  />
                </div>

                <InputField
                    id="password"
                    type="password"
                    label={`Mot de passe ${isEditMode ? "(laisser vide pour ne pas changer)" : ""}`}
                    register={register("password")}
                    error={errors.password?.message}
                    toggleVisibility={true}
                />

                <SelectField
                    id="gender"
                    label="Genre"
                    register={register("gender")}
                    error={errors.gender?.message}
                    options={[
                      { value: "MALE", label: "Homme" },
                      { value: "FEMALE", label: "Femme" },
                    ]}
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
                        ? "Enregistrer"
                        : "Créer le chauffeur"}
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default AddDriverModal
