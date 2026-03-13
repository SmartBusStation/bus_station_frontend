import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import {GareRoutiere, GareRoutiereDetail, Service} from "@/lib/types/models/GareRoutiere";
import { TravelAgency } from "@/lib/types/models/Agency";
import { Trip } from "@/lib/types/models/Trip";
import { PaginatedResponse } from "@/lib/types/models/PaginatedResponse";

// =========================================================================
// URL CONFIGURATION
// =========================================================================

const BASE_URL_GARE = "/gares-routieres";
const BASE_URL_AGENCE = "/agence";
const BASE_URL_DEPARTS = "/voyage/all";

// =========================================================================

/**
 * Récupère la liste de toutes les gares routières.
 */
export async function getAllGares(selectedServices: Service[] = []): Promise<GareRoutiere[] | null> {
  try {
    const params: { services?: string } = {};
    if (selectedServices.length > 0) {
      params.services = selectedServices.join(',');
    }

    const response: AxiosResponse<PaginatedResponse<GareRoutiere>> = await axiosInstance.get(
      `${BASE_URL_GARE}`,
      { params }
    );
    if (response.status === 200) {
      return response.data.content;
    } else {
      console.warn(
        "[GareService] Code HTTP inattendu pour les gares:",
        response.status
      );
      return null;
    }
  } catch (error) {
    console.error(
      "[GareService] Erreur lors de la récupération des gares:",
      error
    );
    throw error;
  }
}

/**
 * Récupère les détails d'une gare routière spécifique par son ID.
 */
export async function getGareById(id: string): Promise<GareRoutiereDetail | null> {
  if (!id) throw new Error("L'ID de la gare est requis");
  try {
    const response: AxiosResponse<GareRoutiereDetail> = await axiosInstance.get(
      `${BASE_URL_GARE}/${id}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.warn(
        "[GareService] Code HTTP inattendu pour la gare:",
        response.status
      );
      return null;
    }
  } catch (error) {
    console.error(
      `[GareService] Erreur lors de la récupération de la gare ${id}:`,
      error
    );
    throw error;
  }
}

/**
 * Récupère toutes les agences pour l'affichage (Simulation: Pas de filtrage réel dans le mock pour l'instant)
 */
export async function getAgencesMock(): Promise<TravelAgency[] | null> {
  try {
    const response: AxiosResponse<TravelAgency[]> = await axiosInstance.get(
      `${BASE_URL_AGENCE}`
    );
    return response.status === 200 ? response.data : null;
  } catch (error) {
    console.error(
      "[GareService] Erreur lors de la récupération des agences:",
      error
    );
    return [];
  }
}

/**
 * Récupère tous les départs pour l'affichage (Simulation: Pas de filtrage réel dans le mock pour l'instant)
 */
export async function getDepartsMock(): Promise<Trip[] | null> {
  try {
    const response: AxiosResponse<Trip[]> = await axiosInstance.get(
      `${BASE_URL_DEPARTS}`
    );
    return response.status === 200 ? response.data : null;
  } catch (error) {
    console.error(
      "[GareService] Erreur lors de la récupération des départs:",
      error
    );
    return [];
  }
}

/**
 * Récupère les agences présentes dans une gare spécifique.
 */
export async function getAgencesByGareId(
  gareId: string
): Promise<TravelAgency[] | null> {
  try {
    const response: AxiosResponse<TravelAgency[]> = await axiosInstance.get(
      `${BASE_URL_AGENCE}/gare-routiere/${gareId}`
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`Erreur getAgencesByGareId ${gareId}:`, error);
    return [];
  }
}

/**
 * NOUVELLE LOGIQUE : Récupère les départs des agences présentes dans la gare.
 * 1. Récupère les agences de la gare.
 * 2. Récupère tous les voyages.
 * 3. Filtre les voyages dont l'agencyId correspond aux agences trouvées.
 */
export async function getDepartsByGareId(
  gareId: string
): Promise<Trip[] | null> {
  try {
    const agencesInStation = await getAgencesByGareId(gareId);

    if (!agencesInStation || agencesInStation.length === 0) {
      return [];
    }

    // On utilise les noms d'agences car Trip n'a pas d'agencyId
    const agencyNames = agencesInStation.map((agence) => agence.longName);

    const response: AxiosResponse<Trip[]> = await axiosInstance.get(
      `${BASE_URL_DEPARTS}`
    );

    if (response.status === 200) {
      return response.data.filter((trip) =>
        agencyNames.includes(trip.nomAgence)
      );
    }

    return [];
  } catch (error) {
    console.error(`Erreur getDepartsByGareId ${gareId}:`, error);
    return [];
  }
}
