import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from 'next/navigation';
import { TripPlannerFormType, tripPlannerSchema } from "@/lib/types/schema/tripSchema";
import { useBusStation } from "@/context/Provider";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { createTrip, updateTrip, getTripDetailsForEdit } from "@/lib/services/trip-service";
import { getVehiclesByAgency } from "@/lib/services/vehicule-service";
import { getDriversByAgency } from "@/lib/services/chauffeur-service";
import { getAllClassVoyagesByAgence } from "@/lib/services/class-voyage-service";
import { Vehicule, VoyageCreateRequestDTO, ClassVoyage } from "@/lib/types/generated-api";
import {Customer} from "@/lib/types/models/BusinessActor";
import {Amenity} from "@/lib/types/generated-api/models/VoyageCreateRequestDTO";

type ResourceState<T> = {
  data: T[];
  isLoading: boolean;
  error: string | null;
};

const toISODateTime = (date: string, time: string): string => new Date(`${date}T${time}:00`).toISOString();

export function useTripPlanner() {
  const { userData, isLoading: isUserLoading } = useBusStation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingTripId = searchParams.get('edit');

  const [agencyId, setAgencyId] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [vehicles, setVehicles] = useState<ResourceState<Vehicule>>({ data: [], isLoading: true, error: null });
  const [drivers, setDrivers] = useState<ResourceState<Customer>>({ data: [], isLoading: true, error: null });
  const [travelClasses, setTravelClasses] = useState<ResourceState<ClassVoyage>>({ data: [], isLoading: true, error: null });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formApiError, setFormApiError] = useState<string | null>(null);

  const form = useForm<TripPlannerFormType>({ resolver: zodResolver(tripPlannerSchema) });


  const loadResource = useCallback(async <T>(fetcher: () => Promise<T[] | null>, setter: React.Dispatch<React.SetStateAction<ResourceState<T>>>, resourceName: string) => {
    setter(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetcher();
      setter({ data: data || [], isLoading: false, error: null });
    } catch (error) {
      console.error(`Erreur de chargement pour ${resourceName}:`, error);
      setter({ data: [], isLoading: false, error: `Échec du chargement (${resourceName}).` });
    }
  }, []);

  useEffect(() => {
    if (isUserLoading || !userData?.userId) return;

    const initialize = async () => {
      try {
        const agency = await getAgencyByChefId(userData.userId);
        if (!agency?.agencyId) {
          setFormApiError("Agence non trouvée.");
          setIsPageLoading(false);
          return;
        }

        setAgencyId(agency.agencyId);
        form.setValue("agenceVoyageId", agency.agencyId);

        await Promise.all([
          loadResource(() => getVehiclesByAgency(agency.agencyId), setVehicles, "véhicules"),
          loadResource(() => getDriversByAgency(agency.agencyId), setDrivers, "chauffeurs"),
          loadResource(async () => (await getAllClassVoyagesByAgence(agency.agencyId)).filter(c => c.idAgenceVoyage === agency.agencyId), setTravelClasses, "classes"),
        ]);

        if (editingTripId) {
          const tripDetails = await getTripDetailsForEdit(editingTripId);
          form.reset({
            titre: tripDetails.titre,
            description: tripDetails.description,
            lieuDepart: tripDetails.lieuDepart,
            pointDeDepart: tripDetails.pointDeDepart,
            lieuArrive: tripDetails.lieuArrive,
            pointArrivee: tripDetails.pointArrivee,
            dateDepartPrev: tripDetails.dateDepartPrev?.split('T')[0] || "",
            heureArrive: tripDetails.heureArrive?.split('T')[1].substring(0, 5) || "",
            heureDepartEffectif: tripDetails.heureDepartEffectif?.split('T')[1].substring(0, 5) || "",
            dateLimiteReservation: tripDetails.dateLimiteReservation?.split('T')[0] || "",
            dateLimiteConfirmation: tripDetails.dateLimiteConfirmation?.split('T')[0] || "",
            nbrPlaceReservable: tripDetails.nbrPlaceReservable,
            vehiculeId: tripDetails.vehicule?.idVehicule,
            chauffeurId: tripDetails.chauffeur?.userId,
            classVoyageId: (tripDetails as any).classVoyageId,
            agenceVoyageId: agency.agencyId,
            amenities: tripDetails.amenities as Array<Amenity> | undefined,
          });
        }
      } catch (error) {
        console.error(error);
        setFormApiError("Erreur d'initialisation de la page.");
      } finally {
        setIsPageLoading(false);
      }
    };

    initialize();
  }, [userData, isUserLoading, form, loadResource, editingTripId, searchParams]);

  const handleSubmitForm = async (data: TripPlannerFormType, status: 'EN_ATTENTE' | 'PUBLIE') => {
    setIsSubmitting(true);
    setFormApiError(null);

    const { nbrPlaceReservable, ...restOfData } = data;
    const payload: VoyageCreateRequestDTO = {
      ...restOfData,
      nbrPlaceReservable,
      nbrPlaceRestante: nbrPlaceReservable,
      statusVoyage: status,
      heureArrive: toISODateTime(data.dateDepartPrev, data.heureArrive),
      heureDepartEffectif: toISODateTime(data.dateDepartPrev, data.heureDepartEffectif),
      nbrPlaceConfirm: 0,
      nbrPlaceReserve: 0,
    };

    try {
      if (editingTripId) {
        await updateTrip(editingTripId, payload);
        setSuccessMessage("Voyage mis à jour avec succès !");
      } else {
        await createTrip(payload);
        setSuccessMessage("Voyage créé avec succès !");
      }
      setIsSuccess(true);
      router.push(status === 'EN_ATTENTE' ? '/dashboard/drafts' : '/dashboard/marketplace');
    } catch (err) {
      console.error(err);
      setFormApiError("Une erreur est survenue lors de la sauvegarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: handleSubmitForm,
    isLoading: isPageLoading,
    isSubmitting,
    isSuccess,
    successMessage,
    formApiError,
    vehicles,
    drivers,
    travelClasses,
    isEditMode: !!editingTripId,
    setIsSuccess,
    reloadVehicles: () => agencyId && loadResource(() => getVehiclesByAgency(agencyId), setVehicles, "véhicules"),
    reloadDrivers: () => agencyId && loadResource(() => getDriversByAgency(agencyId), setDrivers, "chauffeurs"),
    reloadClasses: () => agencyId && loadResource(async () => (await getAllClassVoyagesByAgence(agencyId)).filter(c => c.idAgenceVoyage === agencyId), setTravelClasses, "classes"),
  };
}