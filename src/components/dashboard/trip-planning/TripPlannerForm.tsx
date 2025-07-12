"use client";

import React from "react";
import {
  Car,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Info,
  Save,
  Send,
} from "lucide-react";
import InputField from "@/ui/InputField";
import TextareaField from "@/ui/TextareaField";
import SelectField from "@/ui/SelectField";
import Loader from "@/modals/Loader";
import { useTripPlanner } from "@/lib/hooks/dasboard/useTripPlanner";
import {SuccessModal} from "@/modals/SuccessModal";
import TransparentModal from "@/modals/TransparentModal";

interface TripPlannerFormProps {
  hook: ReturnType<typeof useTripPlanner>;
}

const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ hook }) => {
  const {
    form,
    onSubmit,
    isSubmitting,
    isSuccess,
    successMessage,
    setIsSuccess,
    apiError,
    isEditMode,
    availableVehicles,
    availableDrivers,
  } = hook;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <>
      <TransparentModal isOpen={isSuccess}>
        <SuccessModal
            canOpenSuccessModal={() => setIsSuccess(false)}
            message={successMessage}
        />
      </TransparentModal>

      <form
        onSubmit={handleSubmit((data) => {
          /* No-op, handled by buttons */
        })}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">
          {isEditMode ? "Modifier le Voyage" : "Détails du Nouveau Voyage"}
        </h3>

        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {apiError}
          </div>
        )}

        {/* ... (tous les champs InputField, SelectField, TextareaField comme avant) ... */}
        {/* Je copie un seul groupe pour l'exemple, mais vous devez tous les inclure ici */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <InputField
              id="titre"
              label="Titre du voyage"
              placeholder="Ex: Aventure dans les Alpes"
              register={register("titre")}
              error={errors.titre?.message}
              icon={<Info />}
            />
          </div>
          {/* ... TOUS VOS AUTRES CHAMPS ... */}
          <InputField
            id="lieuDepart"
            label="Ville de Départ"
            register={register("lieuDepart")}
            error={errors.lieuDepart?.message}
            icon={<MapPin />}
          />
          <InputField
            id="lieuArrive"
            label="Ville d'Arrivée"
            register={register("lieuArrive")}
            error={errors.lieuArrive?.message}
            icon={<MapPin />}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "EN_ATTENTE"))}
            disabled={isSubmitting}
            className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting
              ? "Sauvegarde..."
              : isEditMode
              ? "Enregistrer les modifications"
              : "Enregistrer en brouillon"}
          </button>
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "PUBLIE"))}
            disabled={isSubmitting}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:bg-primary/50 flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            {isSubmitting
              ? "Publication..."
              : isEditMode
              ? "Mettre à jour et Publier"
              : "Publier le voyage"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TripPlannerForm;
