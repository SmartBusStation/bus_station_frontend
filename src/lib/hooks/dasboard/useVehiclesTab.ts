// src/lib/hooks/dasboard/useVehiclesTab.ts
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleFormType, vehicleFormSchema } from "@/lib/types/schema/vehicleSchema";
import { getVehiclesByAgency, createVehicleForAgency, updateVehicle, deleteVehicle } from "@/lib/services/vehicule-service";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { useBusStation } from "@/context/Provider";
import { Vehicule, VehiculeDTO } from "@/lib/types/generated-api";

export function useVehiclesTab() {
  const { userData, isLoading: isUserLoading } = useBusStation();

  // États de données
  const [vehicles, setVehicles] = useState<Vehicule[]>([]);
  const [agencyId, setAgencyId] = useState<string | null>(null);

  // États UI
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // NOUVEAU : État pour gérer le mode (création ou édition)
  const [editingVehicle, setEditingVehicle] = useState<Vehicule | null>(null);

  const form = useForm<VehicleFormType>({
    resolver: zodResolver(vehicleFormSchema),
  });

  const fetchVehicles = useCallback(async (id: string) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await getVehiclesByAgency(id);
      setVehicles(response || []);
    } catch (error) {
      setApiError("Impossible de charger la liste des véhicules.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // ... (la logique d'initialisation reste la même) ...
    const initialize = async () => {
      if (isUserLoading || !userData?.userId) return;
      try {
        const agency = await getAgencyByChefId(userData.userId);
        if (agency?.agencyId) {
          setAgencyId(agency.agencyId);
          await fetchVehicles(agency.agencyId);
        } else {
          setApiError("Aucune agence n'est associée à votre compte.");
          setIsLoading(false);
        }
      } catch (error) {
        setApiError("Erreur de récupération de votre agence.");
        setIsLoading(false);
      }
    };
    initialize();
  }, [userData, isUserLoading, fetchVehicles]);

  const openModalForCreate = () => {
    setEditingVehicle(null);
    form.reset();
    setApiError(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (vehicle: Vehicule) => {
    setEditingVehicle(vehicle);
    form.reset({
      nom: vehicle.nom,
      modele: vehicle.modele,
      plaqueMatricule: vehicle.plaqueMatricule,
      nbrPlaces: vehicle.nbrPlaces,
      description: vehicle.description || '',
      lienPhoto: vehicle.lienPhoto || ''
    });
    setApiError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  const onSubmit = async (data: VehicleFormType) => {
    if (!agencyId) {
      setApiError("ID de l'agence introuvable.");
      return;
    }
    setIsSubmitting(true);
    setApiError(null);
    const payload: VehiculeDTO = { ...data, idAgenceVoyage: agencyId };

    try {
      if (editingVehicle && editingVehicle.idVehicule) {
        // Mode UPDATE
        await updateVehicle(editingVehicle.idVehicule, payload);
      } else {
        // Mode CREATE
        await createVehicleForAgency(payload);
      }
      await fetchVehicles(agencyId);
      closeModal();
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (vehicleId: string) => {
    // Demander une confirmation à l'utilisateur
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible.")) {
      return;
    }

    setApiError(null);
    try {
      await deleteVehicle(vehicleId);
      // Mettre à jour l'état local pour une réactivité immédiate
      setVehicles(prev => prev.filter(v => v.idVehicule !== vehicleId));
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Erreur lors de la suppression.");
    }
  };

  return {
    vehicles,
    isLoading,
    isSubmitting,
    isModalOpen,
    apiError,
    form,
    editingVehicle, // Exporter pour la modale
    openModalForCreate,
    openModalForEdit,
    closeModal,
    onSubmit,
    handleDelete
  };
}