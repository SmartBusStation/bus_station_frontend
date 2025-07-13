"use client"

import type React from "react"
import {
  Save,
  Send,
  AlertCircle,
  RefreshCw,
  FileText,
  MapPin,
  Calendar,
  Clock,
  Users,
  Car,
  UserCheck,
  Tag,
  Settings,
  Navigation,
  Timer,
  CalendarCheck,
  DollarSign,
} from "lucide-react"
import InputField from "@/ui/InputField"
import TextareaField from "@/ui/TextareaField"
import SelectField from "@/ui/SelectField"
import type { useTripPlanner } from "@/lib/hooks/dasboard/useTripPlanner"
import { SuccessModal } from "@/modals/SuccessModal"
import TransparentModal from "@/modals/TransparentModal"
import type {UseFormRegisterReturn} from "react-hook-form";

interface TripPlannerFormProps {
  hook: ReturnType<typeof useTripPlanner>
}

// Composant pour les sections du formulaire
const FormSection: React.FC<{
  title: string
  description: string
  icon: React.ElementType
  children: React.ReactNode
}> = ({ title, description, icon: Icon, children }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
)

// Composant pour gérer l'affichage d'un select avec chargement/erreur
const ResourceSelect: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resourceState: { isLoading: boolean; error: string | null; data: any[] }
  options: { label: string; value: string }[]
  onReload: () => void
  label: string
  id: string
  register: UseFormRegisterReturn,
  errorMsg: string | undefined
  icon?: React.ReactNode
}> = ({ resourceState, options, onReload, label, id, register, errorMsg, icon }) => (
    <div>
      {resourceState.error ? (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Erreur de chargement</p>
                <p className="text-xs text-red-500">{resourceState.error}</p>
              </div>
              <button
                  type="button"
                  onClick={onReload}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Réessayer"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
      ) : (
          <SelectField
              id={id}
              options={options}
              register={register}
              error={errorMsg}
              label={label}
              icon={icon}
              disabled={resourceState.isLoading}
          />
      )}
    </div>
)

const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ hook }) => {
  const {
    form,
    onSubmit,
    isSubmitting,
    isSuccess,
    successMessage,
    setIsSuccess,
    formApiError,
    isEditMode,
    vehicles,
    drivers,
    travelClasses,
    reloadVehicles,
    reloadDrivers,
    reloadClasses,
  } = hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const vehicleOptions = vehicles.data.map((v) => ({
    label: `${v.nom} (${v.plaqueMatricule}) - ${v.nbrPlaces} places`,
    value: v.idVehicule!,
  }))

  const driverOptions = drivers.data.map((d) => ({
    label: `${d.first_name} ${d.last_name}`,
    value: d.userId!,
  }))

  const travelClassOptions = travelClasses.data.map((c) => ({
    label: `${c.nom} (${c.prix} FCFA)`,
    value: c.idClassVoyage!,
  }))

  const amenitiesList = [
    { value: "WIFI", label: "Wi-Fi" },
    { value: "AC", label: "Climatisation" },
    { value: "USB", label: "Ports USB" },
    { value: "SNACKS", label: "Collations" },
    { value: "BEVERAGES", label: "Boissons" },
    { value: "POWER_OUTLETS", label: "Prises électriques" },
    { value: "ENTERTAINMENT", label: "Divertissement" },
  ]

  return (
      <>
        <TransparentModal isOpen={isSuccess}>
          <SuccessModal canOpenSuccessModal={() => setIsSuccess(false)} message={successMessage} />
        </TransparentModal>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {/* Erreur globale */}
          {formApiError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Erreur de soumission</h4>
                    <p className="text-sm text-red-700">{formApiError}</p>
                  </div>
                </div>
              </div>
          )}

          {/* Section 1: Informations générales */}
          <FormSection title="Informations Générales" description="Titre et description de votre voyage" icon={FileText}>
            <div className="space-y-6">
              <InputField
                  id="titre"
                  label="Titre du voyage"
                  register={register("titre")}
                  error={errors.titre?.message}
                  icon={<FileText className="w-5 h-5"/>}
                  placeholder="Ex: Douala - Yaoundé Express"
              />
              <TextareaField
                  id="description"
                  label="Description"
                  register={register("description")}
                  error={errors.description?.message}
                  placeholder="Décrivez votre voyage, les services inclus, les arrêts prévus..."
              />
            </div>
          </FormSection>

          {/* Section 2: Itinéraire */}
          <FormSection title="Itinéraire" description="Points de départ et d'arrivée" icon={MapPin}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-green-600" />
                  Départ
                </h4>
                <InputField
                    id="lieuDepart"
                    label="Ville de Départ"
                    register={register("lieuDepart")}
                    error={errors.lieuDepart?.message}
                    icon={<MapPin className="w-5 h-5"/>}
                    placeholder="Ex: Douala"
                />
                <InputField
                    id="pointDeDepart"
                    label="Point de Départ précis"
                    register={register("pointDeDepart")}
                    error={errors.pointDeDepart?.message}
                    icon={<Navigation className="w-5 h-5"/>}
                    placeholder="Ex: Gare routière de Bonabéri"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  Arrivée
                </h4>
                <InputField
                    id="lieuArrive"
                    label="Ville d'Arrivée"
                    register={register("lieuArrive")}
                    error={errors.lieuArrive?.message}
                    icon={<MapPin className="w-5 h-5"/>}
                    placeholder="Ex: Yaoundé"
                />
                <InputField
                    id="pointArrivee"
                    label="Point d'Arrivée précis"
                    register={register("pointArrivee")}
                    error={errors.pointArrivee?.message}
                    icon={<Navigation className="w-5 h-5"/>}
                    placeholder="Ex: Gare routière de Mvan"
                />
              </div>
            </div>
          </FormSection>

          {/* Section 3: Planning et Horaires */}
          <FormSection title="Planning et Horaires" description="Dates et heures du voyage" icon={Calendar}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                  id="dateDepartPrev"
                  type="date"
                  label="Date de départ"
                  register={register("dateDepartPrev")}
                  error={errors.dateDepartPrev?.message}
                  icon={<Calendar className="w-5 h-5"/>}
              />
              <InputField
                  id="heureArrive"
                  type="time"
                  label="Heure d'arrivée prévue"
                  register={register("heureArrive")}
                  error={errors.heureArrive?.message}
                  icon={<Clock className="w-5 h-5"/>}
              />
              <InputField
                  id="dateLimiteReservation"
                  type="date"
                  label="Date Limite Réservation"
                  register={register("dateLimiteReservation")}
                  error={errors.dateLimiteReservation?.message}
                  icon={<CalendarCheck className="w-5 h-5"/>}
              />
              <InputField
                  id="dateLimiteConfirmation"
                  type="date"
                  label="Date Limite Confirmation"
                  register={register("dateLimiteConfirmation")}
                  error={errors.dateLimiteConfirmation?.message}
                  icon={<Timer className="w-5 h-5"/>}
              />
            </div>
          </FormSection>

          {/* Section 4: Capacité et Tarification */}
          <FormSection title="Capacité et Tarification" description="Nombre de places disponibles" icon={Users}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                  id="nbrPlaceReservable"
                  type="number"
                  label="Nombre de places"
                  register={register("nbrPlaceReservable")}
                  error={errors.nbrPlaceReservable?.message}
                  icon={<Users className="w-5 h-5"/>}
                  placeholder="Ex: 50"
              />
              {/* Placeholder pour le prix si nécessaire plus tard */}
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Le prix sera défini par la classe de voyage</p>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Section 5: Ressources */}
          <FormSection title="Ressources" description="Véhicule, chauffeur et classe de voyage" icon={Settings}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ResourceSelect
                  resourceState={travelClasses}
                  options={travelClassOptions}
                  onReload={reloadClasses}
                  label="Classe de Voyage"
                  id="classVoyageId"
                  register={register("classVoyageId")}
                  errorMsg={errors.classVoyageId?.message}
                  icon={<Tag className="w-5 h-5"/>}
              />
              <ResourceSelect
                  resourceState={vehicles}
                  options={vehicleOptions}
                  onReload={reloadVehicles}
                  label="Véhicule"
                  id="vehiculeId"
                  register={register("vehiculeId")}
                  errorMsg={errors.vehiculeId?.message}
                  icon={<Car className="w-5 h-5"/>}
              />
              <ResourceSelect
                  resourceState={drivers}
                  options={driverOptions}
                  onReload={reloadDrivers}
                  label="Chauffeur"
                  id="chauffeurId"
                  register={register("chauffeurId")}
                  errorMsg={errors.chauffeurId?.message}
                  icon={<UserCheck className="w-5 h-5"/>}
              />
            </div>
          </FormSection>

          {/* Section 6: Services et Équipements */}
          <FormSection
              title="Services et Équipements"
              description="Sélectionnez les services inclus dans ce voyage"
              icon={Settings}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {amenitiesList.map((amenity) => (
                  <label
                      key={amenity.value}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                        type="checkbox"
                        value={amenity.value}
                        {...register("amenities")}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
                  </label>
              ))}
            </div>
          </FormSection>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "EN_ATTENTE"))}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="h-4 w-4" />
                {isEditMode ? "Mettre à jour le brouillon" : "Enregistrer en brouillon"}
              </button>
              <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "PUBLIE"))}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
                {isEditMode ? "Mettre à jour et Publier" : "Publier le voyage"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Les brouillons peuvent être modifiés à tout moment. Les voyages publiés seront visibles par les clients.
              </p>
            </div>
          </div>
        </form>
      </>
  )
}

export default TripPlannerForm
