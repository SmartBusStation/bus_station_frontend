import React from "react";
import { X } from "lucide-react";
import { useDriversTab } from "@/lib/hooks/dasboard/useDriverTab";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";

interface AddDriverModalProps {
  hook: ReturnType<typeof useDriversTab>;
}

const AddDriverModal: React.FC<AddDriverModalProps> = ({ hook }) => {
  const { closeModal, form, onSubmit, isSubmitting, apiError, editingDriver } = hook;
  const { register, handleSubmit, formState: { errors } } = form;

  const isEditMode = !!editingDriver;

  return (
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">{isEditMode ? "Modifier le chauffeur" : "Ajouter un nouveau chauffeur"}</h2>
            <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-grow overflow-y-auto">
            <div className="p-6 space-y-4">
              {apiError && <div className="p-3 bg-red-100 text-red-700 rounded-md">{apiError}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    id="first_name"
                    label="Prénom"
                    register={register("first_name")}
                    error={errors.first_name?.message}
                />
                <InputField
                    id="last_name"
                    label="Nom"
                    register={register("last_name")}
                    error={errors.last_name?.message}
                />
              </div>
              <InputField
                  id="username"
                  label="Nom d'utilisateur"
                  register={register("username")}
                  error={errors.username?.message}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    id="email"
                    type="email"
                    label="Email"
                    register={register("email")}
                    error={errors.email?.message}
                />
                <InputField
                    id="phone_number"
                    type="tel"
                    label="Téléphone"
                    register={register("phone_number")}
                    error={errors.phone_number?.message}
                />
              </div>
              <InputField
                  id="password"
                  type="password"
                  label={`Mot de passe ${isEditMode ? '(laisser vide pour ne pas changer)' : ''}`}
                  register={register("password")}
                  error={errors.password?.message}
                  toggleVisibility={true}
              />
              <SelectField
                  id="gender"
                  label="Genre"
                  register={register("gender")}
                  error={errors.gender?.message}
                  options={[{ value: "MALE", label: "Homme" }, { value: "FEMALE", label: "Femme" }]}
              />
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
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
                {isSubmitting ? (isEditMode ? 'Modification...' : 'Création...') : (isEditMode ? 'Enregistrer' : 'Créer le chauffeur')}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AddDriverModal;