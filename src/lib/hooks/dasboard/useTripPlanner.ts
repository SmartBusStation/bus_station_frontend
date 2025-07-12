import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripPlannerFormType, tripPlannerSchema } from "@/lib/types/schema/tripSchema";
import { useBusStation } from "@/context/Provider";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { createTrip, updateTrip, getTripsByAgency, publishTrip } from "@/lib/services/trip-service";
import { getVehiclesByAgency } from "@/lib/services/vehicule-service";
import { getDriversByAgency } from "@/lib/services/chauffeur-service";
import { getAllClassesByAgency } from "@/lib/services/class-voyage-service";
import { Vehicule, Voyage, VoyageCreateRequestDTO, ClassVoyage } from "@/lib/types/generated-api";
import {Customer} from "@/lib/types/models/BusinessActor";
import {TravelAgency} from "@/lib/types/models/Agency";


const toISODateTime = (date: string, time: string): string => {
  return new Date(`${date}T${time}:00`).toISOString();
};

export function useTripPlanner() {

  const { userData, isLoading: isUserLoading } = useBusStation();

  const [agency, setAgency] = useState<TravelAgency | null>(null);
  const [drafts, setDrafts] = useState<Voyage[]>([]);
  const [vehicles, setVehicles] = useState<Vehicule[]>([]);
  const [drivers, setDrivers] = useState<Customer[]>([]);
  const [travelClasses, setTravelClasses] = useState<ClassVoyage[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);

  const form = useForm<TripPlannerFormType>({
    resolver: zodResolver(tripPlannerSchema),
  });

  const loadAgencyData = useCallback(async (agencyId: string) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const [tripsResponse, vehiclesData, driversData, classesData] = await Promise.all([
        getTripsByAgency(agencyId, 0, 100),
        getVehiclesByAgency(agencyId),
        getDriversByAgency(agencyId),
        getAllClassesByAgency(agencyId),
      ]);

      const allTrips = tripsResponse?.content || [];
      const draftsOnly = allTrips.filter((trip) => trip.statusVoyage === "EN_ATTENTE");
      setDrafts(draftsOnly);

      setVehicles(vehiclesData || []);
      setDrivers(driversData || []);
      setTravelClasses(classesData || []);

    } catch (error) {
      console.error(error);
      setApiError("Impossible de charger les ressources de votre agence.");
    } finally {
      setIsLoading(false);
    }
  }, []);



  useEffect(() => {
    const initialize = async () => {
      if (isUserLoading || !userData?.userId) return;
      try {
        const foundAgency = await getAgencyByChefId(userData.userId);
        if (foundAgency?.agencyId && foundAgency) {
          setAgency(foundAgency);
          form.setValue("agenceVoyageId", foundAgency.agencyId);
          await loadAgencyData(foundAgency.agencyId);
        } else {
          setApiError("Aucune agence n'est associée à ce compte.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setApiError("Erreur de récupération des informations de l'agence.");
        setIsLoading(false);
      }
    };
    initialize();
  }, [userData, isUserLoading, loadAgencyData, form]);



  const handleSelectDraft = (tripId: string | null) => {
    setSelectedDraftId(tripId);
    if (tripId) {
      const draft = drafts.find((d) => d.idVoyage === tripId);
      if (draft) {
        form.reset({
          ...draft,
          nbrPlaceReservable: draft.nbrPlaceReservable,
          vehiculeId: /*draft.vehicule?.idVehicule ||*/ "",
          // chauffeurId est manquant dans le DTO de retour de voyage
          chauffeurId: '', // L'utilisateur devra le resélectionner
          classVoyageId: /*draft.classVoyageId ||*/ '',
          dateDepartPrev: draft.dateDepartPrev ? draft.dateDepartPrev.split('T')[0] : '',
          heureArrive: draft.heureArrive ? draft.heureArrive.split('T')[1].substring(0, 5) : '',
          dateLimiteReservation: draft.dateLimiteReservation ? draft.dateLimiteReservation.split('T')[0] : '',
          dateLimiteConfirmation: draft.dateLimiteConfirmation ? draft.dateLimiteConfirmation.split('T')[0] : '',
          agenceVoyageId: agency?.agencyId,
        });
      }
    } else {
      form.reset({ agenceVoyageId: agency?.agencyId });
    }
  };



  const handleSubmitForm = async (data: TripPlannerFormType, status: 'EN_ATTENTE' | 'PUBLIE') => {
    console.log(data);
    setIsSubmitting(true);
    setApiError(null);

    // Le DTO attend `nbrPlaceRestante`, qui est égal à `nbrPlaceReservable` à la création.
    const { nbrPlaceReservable, ...restOfData } = data;
    const payload: VoyageCreateRequestDTO = {
      ...restOfData,
      nbrPlaceReservable: nbrPlaceReservable,
      nbrPlaceRestante: nbrPlaceReservable,
      statusVoyage: status,
      nbrPlaceConfirm: 0,
      nbrPlaceReserve: 0,
      heureArrive: toISODateTime(data.dateDepartPrev, data.heureArrive),
    };

    try {
      if (selectedDraftId) {
        await updateTrip(selectedDraftId, payload);
        setSuccessMessage("Voyage mis à jour avec succès !");
      } else {
        await createTrip(payload);
        setSuccessMessage("Voyage créé avec succès !");
      }
      setIsSuccess(true);
      if (agency) await loadAgencyData(agency.agencyId);
      handleSelectDraft(null); // Réinitialise le formulaire
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishDraft = async (tripId: string) => {
    if(!agency?.agencyId) return;
    setIsSubmitting(true);
    try {
      await publishTrip(tripId);
      setSuccessMessage("Brouillon publié !");
      setIsSuccess(true);
      await loadAgencyData(agency.agencyId);
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Erreur de publication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: handleSubmitForm,
    isLoading,
    isSubmitting,
    isSuccess,
    successMessage,
    apiError,
    drafts,
    availableVehicles: vehicles,
    availableDrivers: drivers,
    availableTravelClasses: travelClasses,
    handleSelectDraft,
    handlePublishDraft,
    isEditMode: !!selectedDraftId,
    setIsSuccess,
  };
}