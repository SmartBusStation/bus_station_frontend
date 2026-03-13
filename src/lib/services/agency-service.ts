import axios, { AxiosResponse } from "axios";
import { TravelAgencyFormType } from "@/lib/types/schema/travelAgencySchema";
import { TravelAgency } from "@/lib/types/models/Agency";
import axiosInstance from "./axios-services/axiosInstance";

const url: string = `${process.env.NEXT_PUBLIC_TRIP_AGENCY_BACKEND_API_URL}`;

export async function createAgency(
  data: TravelAgencyFormType
): Promise<TravelAgency | null> {
  try {
    // Utilise axiosInstance et une URL relative. L'URL complète sera construite automatiquement.
    const response: AxiosResponse<TravelAgency> = await axiosInstance.post(
      "/agence",
      data
    );
    if (response.status === 201 || response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      console.warn("Unattended HTTP code", response.status, response.data);
      return null;
    }
  } catch (error) {
    console.error("Error when creating the agency ", error);
    throw error;
  }
}

/**
 * Récupère les informations d'une agence de voyage en utilisant l'ID de son chef.
 * @param chefId - L'ID de l'utilisateur connecté (chef d'agence).
 * @returns Une promesse résolue avec les détails de l'agence ou null.
 */
export async function getAgencyByChefId(
  chefId: string
): Promise<TravelAgency | null> {
  console.log(
    `[agency-service] Tentative de récupération de l'agence pour le chef d'agence ID: ${chefId}`
  );
  if (!chefId) {
    console.error(
      "[agency-service] Erreur: l'ID du chef d'agence est manquant."
    );
    return null;
  }

  try {
    const response: AxiosResponse<TravelAgency> = await axiosInstance.get(
      `/agence/chef-agence/${chefId}`
    );

    if (response.status === 200) {
      console.log(
        `[agency-service] Agence trouvée pour le chef d'agence ${chefId}:`,
        response.data
      );
      return response.data;
    }

    if (response.status === 404) {
      console.warn(
        `[agency-service] Aucune agence trouvée pour le chef d'agence ID: ${chefId}`
      );
      return null;
    }

    console.warn(
      `[agency-service] Réponse inattendue du serveur: statut ${response.status}`
    );
    return null;
  } catch (error) {
    console.error(
      `[agency-service] Erreur lors de la récupération de l'agence pour le chef d'agence ${chefId}:`,
      error
    );
    throw error; // Propage l'erreur pour que le contexte puisse la gérer
  }
}
