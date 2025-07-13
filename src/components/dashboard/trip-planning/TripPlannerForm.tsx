import React from "react";
import { Save, Send, AlertCircle, RefreshCw } from "lucide-react";
import InputField from "@/ui/InputField";
import TextareaField from "@/ui/TextareaField";
import SelectField from "@/ui/SelectField";
import { useTripPlanner } from "@/lib/hooks/dasboard/useTripPlanner";
import { SuccessModal } from "@/modals/SuccessModal";
import TransparentModal from "@/modals/TransparentModal";

interface TripPlannerFormProps {
  hook: ReturnType<typeof useTripPlanner>;
}

// Composant interne pour gérer l'affichage d'un select avec chargement/erreur
const ResourceSelect: React.FC<{
  resourceState: { isLoading: boolean; error: string | null; data: any[] };
  options: { label: string; value: string }[];
  onReload: () => void;
  label: string;
  id: string;
  register: any;
  errorMsg: string | undefined;
}> = ({ resourceState, options, onReload, label, id, register, errorMsg }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {resourceState.error ? (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-md">
            <AlertCircle className="h-5 w-5"/>
            <span className="text-sm">{resourceState.error}</span>
            <button type="button" onClick={onReload} className="ml-auto p-1 hover:bg-red-100 rounded-full">
              <RefreshCw className="h-4 w-4"/>
            </button>
          </div>
      ) : (
          <SelectField
              id={id}
              options={options}
              register={register}
              error={errorMsg}
              label={""}
              // disabled={resourceState.isLoading}
          />
      )}
    </div>
);


const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ hook }) => {
  const { form, onSubmit, isSubmitting, isSuccess, successMessage, setIsSuccess, formApiError, isEditMode, vehicles, drivers, travelClasses, reloadVehicles, reloadDrivers, reloadClasses } = hook;
  const { register, handleSubmit, formState: { errors } } = form;

  const vehicleOptions = vehicles.data.map(v => ({ label: `${v.nom} (${v.plaqueMatricule}) - ${v.nbrPlaces} places`, value: v.idVehicule! }));
  const driverOptions = drivers.data.map(d => ({ label: `${d.first_name} ${d.last_name}`, value: d.userId! }));
  const travelClassOptions = travelClasses.data.map(c => ({ label: `${c.nom} (${c.prix} FCFA)`, value: c.idClassVoyage! }));
  const amenitiesList = ["WIFI", "AC", "USB", "SNACKS", "BEVERAGES", "POWER_OUTLETS", "ENTERTAINMENT"];

  return (
      <>
        <TransparentModal isOpen={isSuccess}>
          <SuccessModal canOpenSuccessModal={() => setIsSuccess(false)} message={successMessage} />
        </TransparentModal>

        <form onSubmit={(e) => e.preventDefault()} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          {formApiError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{formApiError}</div>}

          <div className="space-y-4">
            <InputField id="titre" label="Titre du voyage" register={register("titre")} error={errors.titre?.message} />
            <TextareaField id="description" label="Description" register={register("description")} error={errors.description?.message} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <InputField id="lieuDepart" label="Ville de Départ" register={register("lieuDepart")} error={errors.lieuDepart?.message} />
              <InputField id="pointDeDepart" label="Point de Départ précis" register={register("pointDeDepart")} error={errors.pointDeDepart?.message} />
              <InputField id="lieuArrive" label="Ville d'Arrivée" register={register("lieuArrive")} error={errors.lieuArrive?.message} />
              <InputField id="pointArrivee" label="Point d'Arrivée précis" register={register("pointArrivee")} error={errors.pointArrivee?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <InputField id="dateDepartPrev" type="date" label="Date de départ" register={register("dateDepartPrev")} error={errors.dateDepartPrev?.message} />
              <InputField id="heureArrive" type="time" label="Heure d'arrivée prévue" register={register("heureArrive")} error={errors.heureArrive?.message} />
              <InputField id="dateLimiteReservation" type="date" label="Date Limite Réservation" register={register("dateLimiteReservation")} error={errors.dateLimiteReservation?.message} />
              <InputField id="dateLimiteConfirmation" type="date" label="Date Limite Confirmation" register={register("dateLimiteConfirmation")} error={errors.dateLimiteConfirmation?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              {/*  <InputField id="prix" type="number" label="Prix par place (FCFA)" register={register("prix")} error={errors.prix?.message} />*/}
              <InputField id="nbrPlaceReservable" type="number" label="Nombre de places" register={register("nbrPlaceReservable")} error={errors.nbrPlaceReservable?.message} />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <ResourceSelect resourceState={travelClasses} options={travelClassOptions} onReload={reloadClasses} label="Classe de Voyage" id="classVoyageId" register={register("classVoyageId")} errorMsg={errors.classVoyageId?.message}/>
              <ResourceSelect resourceState={vehicles} options={vehicleOptions} onReload={reloadVehicles} label="Véhicule" id="vehiculeId" register={register("vehiculeId")} errorMsg={errors.vehiculeId?.message}/>
              <ResourceSelect resourceState={drivers} options={driverOptions} onReload={reloadDrivers} label="Chauffeur" id="chauffeurId" register={register("chauffeurId")} errorMsg={errors.chauffeurId?.message}/>
            </div>

            <div className="pt-4 border-t">
              <label className="block text-sm font-medium text-gray-700 mb-2">Services et Équipements</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 border rounded-lg">
                {amenitiesList.map(amenity => (
                    <label key={amenity} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" value={amenity} {...register("amenities")} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                      {amenity}
                    </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={handleSubmit((data) => onSubmit(data, "EN_ATTENTE"))} disabled={isSubmitting} className="flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50">
              <Save className="h-4 w-4" /> {isEditMode ? 'Mettre à jour le brouillon' : 'Enregistrer en brouillon'}
            </button>
            <button type="button" onClick={handleSubmit((data) => onSubmit(data, "PUBLIE"))} disabled={isSubmitting} className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:bg-primary/50">
              <Send className="h-4 w-4" /> {isEditMode ? 'Mettre à jour et Publier' : 'Publier le voyage'}
            </button>
          </div>
        </form>
      </>
  );
};

export default TripPlannerForm;