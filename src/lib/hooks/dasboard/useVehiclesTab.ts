import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VehicleFormType,
  vehicleFormSchema,
} from "@/lib/types/schema/vehicleSchema";
import {
  getVehiclesByAgency,
  createVehicleForAgency,
} from "@/lib/services/vehicule-service";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { useBusStation } from "@/context/Provider";
import { Vehicle } from "@/lib/types/models/vehicle";

export function useVehiclesTab() {
  console.log("[useVehiclesTab] Initialisation du hook.");
  const { userData, isLoading: isUserLoading } = useBusStation();

  // États des données
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [agencyId, setAgencyId] = useState<string | null>(null);

  // États de l'UI
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<VehicleFormType>({
    resolver: zodResolver(vehicleFormSchema),
  });

  const fetchVehicles = useCallback(async (id: string) => {
    console.log(
      `[useVehiclesTab] Récupération des véhicules pour l'agence ID: ${id}`
    );
    setIsLoading(true);
    try {
      const response = await getVehiclesByAgency(id);
      setVehicles(response || []);
    } catch (error) {
      console.error(
        "[useVehiclesTab] Erreur lors de la récupération des véhicules:",
        error
      );
      setApiError("Impossible de charger la liste des véhicules.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (isUserLoading) return;
      if (userData && userData.userId) {
        console.log(
          `[useVehiclesTab] Utilisateur trouvé (ID: ${userData.userId}). Recherche de l'agence...`
        );
        try {
          const agency = await getAgencyByChefId(userData.userId);
          if (agency && agency.agencyId) {
            setAgencyId(agency.agencyId);
            await fetchVehicles(agency.agencyId);
          } else {
            setApiError("Aucune agence n'est associée à votre compte.");
            setIsLoading(false);
          }
        } catch (error) {
          setApiError(
            "Erreur lors de la récupération des informations de votre agence."
          );
          setIsLoading(false);
        }
      } else {
        setApiError("Session utilisateur non trouvée.");
        setIsLoading(false);
      }
    };
    initialize();
  }, [userData, isUserLoading, fetchVehicles]);

  const openModal = () => {
    console.log(
      "[useVehiclesTab] Ouverture de la modale de création de véhicule."
    );
    form.reset();
    setApiError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data: VehicleFormType) => {
    if (!agencyId) {
      const errorMessage =
        "L'ID de l'agence est introuvable. Impossible de créer un véhicule.";
      console.error(`[useVehiclesTab] ${errorMessage}`);
      setApiError(errorMessage);
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    const payload = {
      ...data,
      idAgenceVoyage: agencyId,
      description: data.description ?? "",
      lienPhoto: data.lienPhoto ?? "",
    };

    console.log(
      "[useVehiclesTab] Soumission du formulaire avec le payload:",
      payload
    );

    try {
      await createVehicleForAgency(payload);
      await fetchVehicles(agencyId); // Recharger la liste après la création
      closeModal();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors de la création du véhicule.";
      console.error("[useVehiclesTab] Erreur de soumission:", error);
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    vehicles,
    isLoading,
    isSubmitting,
    isModalOpen,
    apiError,
    form,
    openModal,
    closeModal,
    onSubmit,
  };
}
