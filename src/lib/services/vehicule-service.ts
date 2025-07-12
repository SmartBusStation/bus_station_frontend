import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios-services/axiosInstance";
import { Vehicle } from "../types/models/vehicle";

const url = "/vehicule";

/**
 * Récupère tous les véhicules d'une agence spécifique.
 * @param agencyId - L'ID de l'agence de voyage.
 * @returns Une promesse résolue avec un tableau de véhicules ou null.
 */
export async function getVehiclesByAgency(
  agencyId: string
): Promise<Vehicle[] | null> {
  console.log(
    `[vehicule-service] Tentative de récupération des véhicules pour l'agence ID: ${agencyId}`
  );
  if (!agencyId) {
    console.error("[vehicule-service] Erreur: l'ID de l'agence est manquant.");
    return null;
  }

  try {
    const response: AxiosResponse<Vehicle[]> = await axiosInstance.get(
      `${url}/agence/${agencyId}`
    );

    if (response.status === 200) {
      console.log(
        `[vehicule-service] ${response.data.length} véhicule(s) trouvé(s) pour l'agence ${agencyId}.`
      );
      return response.data;
    }

    console.warn(
      `[vehicule-service] Réponse inattendue du serveur: statut ${response.status}`
    );
    return null;
  } catch (error) {
    console.error(
      `[vehicule-service] Erreur lors de la récupération des véhicules pour l'agence ${agencyId}:`,
      error
    );
    throw error;
  }
}

/**
 * Crée un nouveau véhicule pour une agence spécifique.
 * @param data - Les données du véhicule à créer, conformes au VehiculeDTO du backend.
 * @returns Une promesse résolue avec les détails du véhicule créé ou null.
 */
export async function createVehicleForAgency(
  data: Omit<Vehicle, "idVehicule">
): Promise<Vehicle | null> {
  console.log("[SERVICE_REQUEST] createVehicleForAgency avec payload:", data);
  try {
    const response: AxiosResponse<Vehicle> = await axiosInstance.post(
      url,
      data
    );

    if (response.status === 201) {
      console.log(
        "[SERVICE_SUCCESS] createVehicleForAgency: Véhicule créé avec succès.",
        response.data
      );
      return response.data;
    }

    console.warn(
      `[SERVICE_WARN] createVehicleForAgency: Statut inattendu - ${response.status}`,
      response.data
    );
    return null;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[SERVICE_FAILURE] createVehicleForAgency: Erreur lors de la création du véhicule.`,
      {
        message: axiosError.message,
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      }
    );
    throw error;
  }
}
