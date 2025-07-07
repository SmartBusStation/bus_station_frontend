import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DriverFormType,
  driverFormSchema,
} from "@/lib/types/schema/driverSchema";
import {
  getDriversByAgency,
  createDriverForAgency,
} from "@/lib/services/chauffeur-service";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { useBusStation } from "@/context/Provider";
import { UserResponseCreatedDTO } from "@/lib/types/models/BusinessActor";
import { ChauffeurRequestDTO } from "@/lib/types/models/BusinessActor";

export function useDriversTab() {
  console.log("[useDriversTab] Initialisation du hook.");
  const { userData } = useBusStation();

  // États des données
  const [drivers, setDrivers] = useState<UserResponseCreatedDTO[]>([]);
  const [agencyId, setAgencyId] = useState<string | null>(null);

  // États de l'UI
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<DriverFormType>({
    resolver: zodResolver(driverFormSchema),
  });

  const fetchDrivers = useCallback(async (id: string) => {
    console.log(
      `[useDriversTab] Récupération des chauffeurs pour l'agence ID: ${id}`
    );
    setIsLoading(true);
    try {
      const data = await getDriversByAgency(id);
      setDrivers(data || []);
    } catch (error) {
      console.error(
        "[useDriversTab] Erreur lors de la récupération des chauffeurs:",
        error
      );
      setApiError("Impossible de charger la liste des chauffeurs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effet pour trouver l'agence et charger les chauffeurs
  useEffect(() => {
    const initialize = async () => {
      if (userData && userData.userId) {
        console.log(
          "[useDriversTab] Utilisateur détecté, recherche de l'agence..."
        );
        try {
          const agency = await getAgencyByChefId(userData.userId);
          if (agency && agency.agencyId) {
            setAgencyId(agency.agencyId);
            await fetchDrivers(agency.agencyId);
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
        // Gérer le cas où userData n'est pas encore disponible
        setIsLoading(true);
      }
    };

    initialize();
  }, [userData, fetchDrivers]);

  const openModal = () => {
    console.log(
      "[useDriversTab] Ouverture de la modale de création de chauffeur."
    );
    form.reset();
    setApiError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data: DriverFormType) => {
    if (!agencyId) {
      const errorMessage =
        "L'identifiant de l'agence est introuvable. Impossible de créer un chauffeur.";
      console.error(`[useDriversTab] ${errorMessage}`);
      setApiError(errorMessage);
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    const payload: ChauffeurRequestDTO = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
      gender: data.gender,
      role: ["USAGER"],
      agenceVoyageId: agencyId,
      userExist: false,
    };

    console.log(
      "[useDriversTab] Soumission du formulaire avec le payload:",
      payload
    );

    try {
      await createDriverForAgency(payload);
      await fetchDrivers(agencyId); // Recharger la liste après la création
      closeModal();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors de la création du chauffeur.";
      console.error("[useDriversTab] Erreur de soumission:", error);
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    drivers,
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
