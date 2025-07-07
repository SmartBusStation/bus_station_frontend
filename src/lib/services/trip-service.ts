import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import { Trip } from "@/lib/types/models/Trip";
import { TripPlannerFormType } from "@/lib/types/schema/tripSchema";
import { PaginatedResponse, SortInterface } from "../types/common";
import { TripAxiosResponseInterface } from "@/lib/types/models/Trip";

const url: string = "voyage";

export async function retrieveAllTrips(): Promise<TripAxiosResponseInterface | null> {
  try {
    const apiResponse: AxiosResponse<TripAxiosResponseInterface> =
      await axiosInstance.get(`/${url}/all`);
    if (apiResponse.status === 200) {
      return apiResponse.data;
    } else {
      console.warn("Unattended http code", apiResponse.status);
      return null;
    }
  } catch (error) {
    console.error("error during retrieving trips", error);
    throw new Error("error during retrieving trips");
  }
}

export async function retrieveTripDetail(tripId: string): Promise<Trip | null> {
  if (!tripId || tripId === "") throw new Error("the trip id must not empty");
  try {
    const apiResponse: AxiosResponse<Trip> = await axiosInstance.get(
      `/${url}/byId/${tripId}`
    );
    if (apiResponse.status === 200) {
      console.log(apiResponse);
      return apiResponse.data;
    } else {
      console.warn("Unattended http code", apiResponse.status);
      return null;
    }
  } catch (error) {
    console.error("error during retrieving trips", error);
    throw new Error("error during retrieving trips");
  }
}

/**
 * Crée un nouveau voyage en utilisant le DTO défini dans l'API.
 * @param data - Les données du formulaire de planification de voyage.
 * @returns Le voyage créé ou null en cas d'échec.
 */
export async function createTrip(
  data: TripPlannerFormType
): Promise<Trip | null> {
  console.log(
    "[trip-service] Tentative de création d'un nouveau voyage avec les données:",
    data
  );
  try {
    const response: AxiosResponse<Trip> = await axiosInstance.post(
      `/${url}/create`,
      data
    );
    if (response.status === 201) {
      console.log("[trip-service] Voyage créé avec succès:", response.data);
      return response.data;
    }
    console.warn(
      `[trip-service] Réponse inattendue lors de la création du voyage: statut ${response.status}`
    );
    return null;
  } catch (error) {
    console.error(
      "[trip-service] Erreur lors de la création du voyage:",
      error
    );
    throw error;
  }
}

/**
 * Met à jour un voyage existant.
 * @param id - L'ID du voyage à mettre à jour.
 * @param data - Les données à mettre à jour.
 * @returns Le voyage mis à jour ou null en cas d'échec.
 */
export async function updateTrip(
  id: string,
  data: Partial<TripPlannerFormType>
): Promise<Trip | null> {
  console.log(
    `[trip-service] Tentative de mise à jour du voyage ID ${id} avec les données:`,
    data
  );
  try {
    const response: AxiosResponse<Trip> = await axiosInstance.put(
      `/${url}/${id}`,
      data
    );
    if (response.status === 200) {
      console.log(
        "[trip-service] Voyage mis à jour avec succès:",
        response.data
      );
      return response.data;
    }
    console.warn(
      `[trip-service] Réponse inattendue lors de la mise à jour du voyage: statut ${response.status}`
    );
    return null;
  } catch (error) {
    console.error(
      `[trip-service] Erreur lors de la mise à jour du voyage ${id}:`,
      error
    );
    throw error;
  }
}

/**
 * Récupère une page de voyages pour une agence spécifique.
 * @param agencyId - L'ID de l'agence de voyage.
 * @param page - Le numéro de la page à récupérer (commence à 0).
 * @param size - Le nombre d'éléments par page.
 * @returns Une promesse résolue avec une réponse paginée de voyages ou null.
 */
export async function getTripsByAgency(
  agencyId: string,
  page: number,
  size: number
): Promise<PaginatedResponse<Trip> | null> {
  console.log(
    `[trip-service] Récupération des voyages pour l'agence ${agencyId} (Page: ${page}, Taille: ${size})`
  );
  if (!agencyId) {
    console.error("[trip-service] Erreur: l'ID de l'agence est manquant.");
    return null;
  }

  try {
    const response: AxiosResponse<PaginatedResponse<Trip>> =
      await axiosInstance.get(`/${url}/agence/${agencyId}`, {
        params: {
          page: page,
          size: size,
        },
      });

    if (response.status === 200 || response.status === 201) {
      console.log(
        `[trip-service] ${response.data.content.length} voyage(s) trouvé(s) sur la page ${page}.`
      );
      return response.data;
    }

    console.warn(
      `[trip-service] Réponse inattendue du serveur: statut ${response.status}`
    );
    return null;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[SERVICE_FAILURE] getTripsByAgency: Erreur lors de la récupération des voyages.`,
      {
        message: axiosError.message,
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      }
    );
    throw error;
  }
}

/**
 * Publie un voyage existant (change son statut de EN_ATTENTE à PUBLIE).
 * @param tripId - L'ID du voyage à publier.
 * @returns Le voyage mis à jour ou null.
 */
export async function publishTrip(tripId: string): Promise<Trip | null> {
  console.log(
    `[trip-service] Tentative de publication du voyage ID: ${tripId}`
  );
  try {
    // L'API doit avoir un endpoint pour cette action spécifique ou utiliser le PUT général
    // en passant uniquement le statut.
    const response: AxiosResponse<Trip> = await axiosInstance.put(
      `/${url}/${tripId}`,
      {
        statusVoyage: "PUBLIE",
      }
    );
    if (response.status === 200) {
      console.log(`[trip-service] Voyage ${tripId} publié avec succès.`);
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(
      `[trip-service] Erreur lors de la publication du voyage ${tripId}:`,
      error
    );
    throw error;
  }
}
