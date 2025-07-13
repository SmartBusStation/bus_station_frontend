"use client"

import type React from "react"
import { X } from "lucide-react"
import type { useEmployeesTab } from "@/lib/hooks/dasboard/useEmployeesTab"
import InputField from "@/ui/InputField"
import SelectField from "@/ui/SelectField"

interface AddEmployeeModalProps {
    hook: ReturnType<typeof useEmployeesTab>
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ hook }) => {
    const { isModalOpen, closeModal, form, onSubmit, isSubmitting, apiError } = hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    if (!isModalOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Ajouter un nouvel employé</h2>
                        <p className="text-sm text-gray-600 mt-1">Remplissez les informations de l'employé</p>
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

                        <div className="space-y-8">
                            {/* Informations Utilisateur */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Informations Utilisateur
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            id="first_name"
                                            label="Prénom"
                                            register={register("first_name")}
                                            error={errors.first_name?.message}
                                            placeholder="Ex: Marie"
                                        />
                                        <InputField
                                            id="last_name"
                                            label="Nom"
                                            register={register("last_name")}
                                            error={errors.last_name?.message}
                                            placeholder="Ex: Martin"
                                        />
                                    </div>

                                    <InputField
                                        id="username"
                                        label="Nom d'utilisateur"
                                        register={register("username")}
                                        error={errors.username?.message}
                                        placeholder="Ex: marie.martin"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            id="email"
                                            type="email"
                                            label="Email"
                                            register={register("email")}
                                            error={errors.email?.message}
                                            placeholder="marie.martin@email.com"
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            id="password"
                                            type="password"
                                            label="Mot de passe"
                                            register={register("password")}
                                            error={errors.password?.message}
                                            toggleVisibility={true}
                                        />
                                        <InputField
                                            id="confirmPassword"
                                            type="password"
                                            label="Confirmer le mot de passe"
                                            register={register("confirmPassword")}
                                            error={errors.confirmPassword?.message}
                                            toggleVisibility={true}
                                        />
                                    </div>

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

                            {/* Informations Professionnelles */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Informations Professionnelles
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            id="poste"
                                            label="Poste"
                                            register={register("poste")}
                                            error={errors.poste?.message}
                                            placeholder="Ex: Responsable Commercial"
                                        />
                                        <InputField
                                            id="departement"
                                            label="Département"
                                            register={register("departement")}
                                            error={errors.departement?.message}
                                            placeholder="Ex: Commercial"
                                        />
                                    </div>

                                    <InputField
                                        id="salaire"
                                        type="number"
                                        label="Salaire (FCFA)"
                                        register={register("salaire")}
                                        error={errors.salaire?.message}
                                        placeholder="Ex: 150000"
                                    />
                                </div>
                            </div>
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
                            {isSubmitting ? "Création..." : "Ajouter l'employé"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployeeModal
