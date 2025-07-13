"use client"

import type React from "react"
import { X } from "lucide-react"
import type { useClassVoyageTab } from "@/lib/hooks/dasboard/useClassVoyageTab"
import InputField from "@/ui/InputField"

interface AddClassVoyageModalProps {
    hook: ReturnType<typeof useClassVoyageTab>
}

const AddClassVoyageModal: React.FC<AddClassVoyageModalProps> = ({ hook }) => {
    const { form, onSubmit, isSubmitting, apiError, editingClass, closeModal } = hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    const isEditMode = !!editingClass

    return (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEditMode ? "Modifier la Classe de Voyage" : "Ajouter une Classe de Voyage"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {isEditMode ? "Modifiez les informations de la classe" : "Définissez une nouvelle classe de voyage"}
                    </p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Fermer">
                    <X className="h-5 w-5 text-gray-500" />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 space-y-4">
                    {apiError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{apiError}</p>
                        </div>
                    )}

                    <InputField
                        id="nom"
                        label="Nom de la classe"
                        placeholder="Ex: VIP Climatisé"
                        register={register("nom")}
                        error={errors.nom?.message}
                    />

                    <InputField
                        id="prix"
                        type="number"
                        label="Prix de base (FCFA)"
                        placeholder="Ex: 8000"
                        register={register("prix")}
                        error={errors.prix?.message}
                    />

                    <InputField
                        id="tauxAnnulation"
                        type="number"
                        label="Taux d'annulation (%)"
                        placeholder="Ex: 10"
                        register={register("tauxAnnulation")}
                        error={errors.tauxAnnulation?.message}
                    />
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
                        {isSubmitting ? "Sauvegarde..." : isEditMode ? "Mettre à jour" : "Créer la classe"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddClassVoyageModal
