import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import { GareRoutiere } from "@/lib/types/models/GareRoutiere";
import { TravelAgency } from "@/lib/types/models/Agency";
import { Trip } from "@/lib/types/models/Trip";

// =========================================================================
// ZONE DE CONFIGURATION DE L'URL (JSON SERVER)
// =========================================================================

// ❌ LIGNE PROD (Commentée)
// const BASE_URL_GARE = "/gares";
// const BASE_URL_AGENCE = "/agences";
// const BASE_URL_VOYAGE = "/voyages";

// ✅ LIGNES DEV (Décommentées pour JSON Server)
const BASE_URL_GARE = "http://localhost:3001/gares";
const BASE_URL_AGENCE = "http://localhost:3001/agences";
const BASE_URL_DEPARTS = "http://localhost:3001/departs";

// =========================================================================

/**
 * Récupère la liste de toutes les gares routières.
 */
export async function getAllGares(): Promise<GareRoutiere[] | null> {
  try {
    const response: AxiosResponse<GareRoutiere[]> = await axiosInstance.get(
      `${BASE_URL_GARE}`
    );
    if (response.status === 200) {
      return response.data;
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
export async function getGareById(id: string): Promise<GareRoutiere | null> {
  if (!id) throw new Error("L'ID de la gare est requis");
  try {
    const response: AxiosResponse<GareRoutiere> = await axiosInstance.get(
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
 * (Simulation: json-server ne gère pas les jointures complexes nativement,
 * on filtre via query params si la structure le permet, ou on récupère tout et on filtre ici)
 */
export async function getAgencesByGareId(
  gareId: string
): Promise<TravelAgency[] | null> {
  try {
    // Avec json-server, on peut filtrer si le champ existe.
    // Ici on simule : on récupère tout et on filtre JS (car structure array simple dans le mock)
    // Dans le vrai backend: await axiosInstance.get(`${URL_AGENCES}/gare/${gareId}`);
    const response: AxiosResponse<TravelAgency[]> = await axiosInstance.get(
      `${BASE_URL_AGENCE}`
    );

    if (response.status === 200) {
      // Filtrage manuel pour simuler le comportement backend
      // @ts-ignore (Car gareIds n'est pas dans le type TravelAgency officiel mais est dans le db.json)
      return response.data.filter(
        (a: any) => a.gareIds && a.gareIds.includes(gareId)
      );
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
    // Étape 1 : Trouver les agences de cette gare
    const agencesInStation = await getAgencesByGareId(gareId);

    if (!agencesInStation || agencesInStation.length === 0) {
      return []; // Aucune agence, donc aucun départ
    }

    // On extrait les IDs des agences trouvées
    // @ts-ignore : agencyId existe dans le mock
    const agencyIds = agencesInStation.map((agence: any) => agence.agencyId);

    // Étape 2 : Récupérer les voyages
    // Dans un vrai backend, on ferait peut-être : /voyages?agencyId=1&agencyId=2...
    // Ici on récupère tout et on filtre
    const response: AxiosResponse<Trip[]> = await axiosInstance.get(
      `${BASE_URL_DEPARTS}`
    );

    if (response.status === 200) {
      // Étape 3 : Filtrer les voyages qui appartiennent à ces agences
      // @ts-ignore : On utilise le champ mock agencyId
      return response.data.filter((trip: any) =>
        agencyIds.includes(trip.agencyId)
      );
    }

    return [];
  } catch (error) {
    console.error(`Erreur getDepartsByGareId ${gareId}:`, error);
    return [];
  }
}
