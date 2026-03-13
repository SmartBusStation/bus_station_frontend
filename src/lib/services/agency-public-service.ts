import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import { TravelAgency } from "@/lib/types/models/Agency";
import { retrieveAllTrips } from "./trip-service"; // On importe le service des voyages

// La nouvelle URL relative pour les agences (quand l'endpoint existera)
const URL_AGENCE_VOYAGE = "/agence";

// Fonction idéale qui fonctionnera quand le backend ajoutera l'endpoint
// Vous pouvez la décommenter plus tard
/*
export async function getAllPublicAgencies(): Promise<TravelAgency[]> {
  try {
    // !! Endpoint à faire créer par le backend !!
    const response: AxiosResponse<TravelAgency[]> = await axiosInstance.get(`${URL_AGENCE_VOYAGE}/public`);
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("[agency-public-service] Erreur lors de la récupération des agences publiques", error);
    throw error;
  }
}
*/

// =========================================================================
// SOLUTION TEMPORAIRE : On récupère les agences à partir des voyages existants
// =========================================================================
export async function getAllPublicAgencies(): Promise<Partial<TravelAgency>[]> {
  console.log("Utilisation de la solution temporaire pour lister les agences via les voyages...");
  try {
    const tripsResponse = await retrieveAllTrips();
    if (!tripsResponse || !tripsResponse.content) {
      return [];
    }

    // On crée une liste d'agences unique à partir des voyages
    const agenciesMap = new Map<string, Partial<TravelAgency>>();

    tripsResponse.content.forEach(trip => {
      // On suppose que chaque voyage a un nom d'agence et potentiellement un ID
      // Adaptez les champs si nécessaire
      const agencyName = trip.nomAgence;
      if (agencyName && !agenciesMap.has(agencyName)) {
        agenciesMap.set(agencyName, {
          longName: agencyName,
          shortName: agencyName,
          logoUrl: "/agency-logos/default.png", // Mettre un logo par défaut
          // On ne peut pas avoir plus d'infos pour le moment
        });
      }
    });

    return Array.from(agenciesMap.values());

  } catch (error) {
    console.error("[agency-public-service] Erreur dans la solution temporaire de récupération des agences", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}


// Cette fonction utilisera le bon endpoint quand il sera prêt
export async function getPublicAgencyById(id: string): Promise<TravelAgency | null> {
  try {
    // Cet endpoint doit aussi exister publiquement
    const response: AxiosResponse<TravelAgency> = await axiosInstance.get(
      `${URL_AGENCE_VOYAGE}/public/${id}` // Assurez-vous que l'URL est correcte
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`[agency-public-service] Erreur API pour l'agence ${id}:`, error);
    return null;
  }
}

// Les autres fonctions comme updateAgencyDetails ne sont pas publiques et devraient
// probablement se trouver dans "agency-service.ts" et non "agency-public-service.ts"