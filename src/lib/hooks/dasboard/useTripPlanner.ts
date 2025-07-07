// src/lib/hooks/dashboard/useTripPlanner.ts

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  TripPlannerFormType,
  tripPlannerSchema,
} from "@/lib/types/schema/tripSchema";
import { useBusStation } from "@/context/Provider";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import {
  createTrip,
  updateTrip,
  getTripsByAgency,
  publishTrip,
} from "@/lib/services/trip-service";
import { getVehiclesByAgency } from "@/lib/services/vehicule-service";
import { getDriversByAgency } from "@/lib/services/chauffeur-service";
import { Vehicle } from "@/lib/types/models/vehicle";
import { UserResponseCreatedDTO as Driver } from "@/lib/types/models/BusinessActor";
import { Trip } from "@/lib/types/models/Trip";
import { TravelAgency } from "@/lib/types/models/Agency";

export function useTripPlanner() {
  // ... (tous les états restent les mêmes)
  console.log("[useTripPlanner] Initialisation du hook.");
  const router = useRouter();
  const { userData, isLoading: isUserLoading } = useBusStation();

  const [agency, setAgency] = useState<TravelAgency | null>(null);
  const [drafts, setDrafts] = useState<Trip[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);

  const form = useForm<TripPlannerFormType>({
    resolver: zodResolver(tripPlannerSchema),
  });

  // --- LOGIQUE DE CHARGEMENT ET DE FILTRAGE DES DONNÉES ---

  const loadAgencyData = useCallback(async (agencyId: string) => {
    console.log(
      `[useTripPlanner] Chargement des données pour l'agence ID: ${agencyId}`
    );
    setIsLoading(true);
    setApiError(null);
    try {
      // On récupère toutes les données en parallèle
      const [allTripsResponse, vehiclesData, driversData] = await Promise.all([
        getTripsByAgency(agencyId, 0, 25), // Récupère la page 0 avec 25 éléments
        getVehiclesByAgency(agencyId),
        getDriversByAgency(agencyId),
      ]);

      // Filtrage côté client pour les brouillons
      if (allTripsResponse && allTripsResponse.content) {
        const allTrips = allTripsResponse.content;
        const draftsOnly = allTrips.filter(
          (trip) => trip.statusVoyage === "EN_ATTENTE"
        );
        setDrafts(draftsOnly);
        console.log(
          `[useTripPlanner] ${allTrips.length} voyage(s) total récupéré(s), ${draftsOnly.length} brouillon(s) filtré(s).`
        );
      } else {
        setDrafts([]);
      }

      setVehicles(vehiclesData || []);
      setDrivers(driversData || []);

      console.log(
        "[useTripPlanner] Données de l'agence (brouillons, véhicules, chauffeurs) chargées."
      );
    } catch (error) {
      console.error(
        "[useTripPlanner] Erreur lors du chargement des données de l'agence:",
        error
      );
      setApiError("Impossible de charger les ressources de votre agence.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (isUserLoading) return;

      if (userData && userData.userId) {
        console.log(
          `[useTripPlanner] Utilisateur trouvé (ID: ${userData.userId}). Recherche de l'agence...`
        );
        try {
          const foundAgency = await getAgencyByChefId(userData.userId);
          if (foundAgency) {
            setAgency(foundAgency);
            form.setValue("agenceVoyageId", foundAgency.agencyId);
            await loadAgencyData(foundAgency.agencyId);
          } else {
            setApiError("Aucune agence n'est associée à votre compte.");
            setIsLoading(false);
          }
        } catch (error) {
          setApiError("Erreur lors de la récupération des infos de l'agence.");
          setIsLoading(false);
        }
      } else {
        setApiError("Session utilisateur non trouvée.");
        setIsLoading(false);
        // Optionnel : router.push('/login');
      }
    };
    initialize();
  }, [userData, isUserLoading, loadAgencyData, form, router]);

  const handleSelectDraft = (tripId: string | null) => {
    setSelectedDraftId(tripId);
    if (tripId) {
      const draftToEdit = drafts.find((d) => d.idVoyage === tripId);
      if (draftToEdit) {
        console.log(
          "[useTripPlanner] Sélection du brouillon pour édition:",
          draftToEdit
        );
        form.reset({
          ...draftToEdit,
          prix: Number(draftToEdit.prix),
          nbrPlaceReservable: draftToEdit.nbrPlaceReservable,
          vehiculeId: draftToEdit.vehicule.idVehicule,
          // Note: L'API ne retourne pas le chauffeur dans le DTO de voyage, il faudra peut-être l'ajuster.
          // chauffeurId: draftToEdit.chauffeur?.id,
          agenceVoyageId: agency?.agencyId || "",
          // ...autres conversions de types
        });
      }
    } else {
      console.log("[useTripPlanner] Passage en mode création.");
      form.reset({ agenceVoyageId: agency?.agencyId || "" });
    }
  };

  const handleSubmitForm = async (
    data: TripPlannerFormType,
    status: "EN_ATTENTE" | "PUBLIE"
  ) => {
    setIsSubmitting(true);
    setApiError(null);

    const payload = { ...data, statusVoyage: status };
    console.log(
      `[useTripPlanner] Soumission du formulaire avec statut ${status}. Payload:`,
      payload
    );

    try {
      if (selectedDraftId) {
        await updateTrip(selectedDraftId, payload);
        setSuccessMessage(
          status === "PUBLIE"
            ? "Voyage mis à jour et publié !"
            : "Brouillon mis à jour !"
        );
      } else {
        await createTrip(payload);
        setSuccessMessage(
          status === "PUBLIE"
            ? "Voyage créé et publié !"
            : "Voyage sauvegardé en brouillon."
        );
      }
      setIsSuccess(true);
      await loadAgencyData(agency!.agencyId);
      handleSelectDraft(null);
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishDraft = async (tripId: string) => {
    setIsSubmitting(true);
    setApiError(null);
    console.log(
      `[useTripPlanner] Publication directe du brouillon ID: ${tripId}`
    );
    try {
      await publishTrip(tripId);
      setSuccessMessage("Brouillon publié avec succès !");
      setIsSuccess(true);
      await loadAgencyData(agency!.agencyId);
    } catch (err: any) {
      setApiError(
        err.response?.data?.message || "Erreur lors de la publication."
      );
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
    handleSelectDraft,
    handlePublishDraft,
    isEditMode: !!selectedDraftId,
    setIsSuccess,
  };
}
