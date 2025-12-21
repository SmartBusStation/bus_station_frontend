import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import { TravelAgency } from "@/lib/types/models/Agency";
import { Trip } from "@/lib/types/models/Trip";

// =========================================================================
// CONFIGURATION URL (MODE DEV JSON-SERVER)
// =========================================================================
const URL_AGENCES = "http://localhost:3001/agences";
const URL_DEPARTS = "http://localhost:3001/departs";
// =========================================================================

/**
 * ADAPTATEUR: Transforme les données brutes du JSON vers ton modèle TypeScript
 * C'est ici qu'on fait correspondre 'longName' avec 'name' si besoin, etc.
 */
const mapToUIAgency = (data: any): TravelAgency => ({
  agencyId: data.id, // Use 'id' from the database as the agencyId
  organisationId: data.organisationId || "",
  userId: data.userId || "",
  longName: data.longName || data.name || "Nom Inconnu", // Sécurité
  shortName: data.shortName || "",
  logoUrl: data.logoUrl || data.logo || "/placeholder.svg", // Sécurité image
  location: data.location || "",
  socialNetwork: data.socialNetwork || "",
  description: data.description || "",
  greetingMessage: data.greetingMessage || "",
  rating: data.rating || 0,
  specialties: data.specialties || [],
  contact: data.contact || { email: "", phone: "", website: "" },
  gareIds: data.gareIds || [],
});

const mapToUITrip = (data: any): Trip => ({
  idVoyage: data.idVoyage,
  titre: data.titre,
  description: data.description || "",
  dateDepartPrev: data.dateDepartPrev,
  lieuDepart: data.lieuDepart,
  dateDepartEffectif: data.dateDepartEffectif || "",
  dateArriveEffectif: data.dateArriveEffectif || "",
  lieuArrive: data.lieuArrive,
  heureDepartEffectif: data.heureDepartEffectif || "00:00",
  dureeVoyage: data.dureeVoyage || "",
  heureArrive: data.heureArrive || "",
  nbrPlaceReservable: data.nbrPlaceReservable || 0,
  nbrPlaceRestante: data.nbrPlaceRestante || 0,
  datePublication: data.datePublication || "",
  dateLimiteReservation: data.dateLimiteReservation || "",
  dateLimiteConfirmation: data.dateLimiteConfirmation || "",
  statusVoyage: data.statusVoyage || "PUBLIE",
  smallImage: data.smallImage || "/placeholder.svg",
  bigImage: data.bigImage || "/placeholder.svg",
  nomClasseVoyage: data.nomClasseVoyage || "Standard",
  prix: data.prix || 0,
  nomAgence: data.nomAgence || "",
  pointDeDepart: data.pointDeDepart || "",
  pointArrivee: data.pointArrivee || "",
  vehicule: data.vehicule || {},
  placeReservees: [],
  amenities: [],
});

/**
 * Récupère une agence par son ID (agencyId)
 */
export async function getPublicAgencyById(
  id: string
): Promise<TravelAgency | null> {
  console.log(`🔍 [AgencyService] Recherche agence ID: ${id}`);
  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      `${URL_AGENCES}/${id}`
    );

    if (response.status === 200 && response.data) {
      console.log(
        `✅ [AgencyService] Agence trouvée : ${response.data.longName}`
      );
      return mapToUIAgency(response.data);
    }

    console.warn(`❌ [AgencyService] Aucune agence trouvée pour ${id}`);
    return null;
  } catch (error) {
    console.error(`❌ [AgencyService] Erreur API :`, error);
    return null;
  }
}

/**
 * Met à jour les détails d'une agence
 */
export async function updateAgencyDetails(
    agencyId: string,
    dataToUpdate: Partial<TravelAgency>
): Promise<TravelAgency> {
    console.log(`🔄 [AgencyService] Mise à jour de l'agence ID: ${agencyId}`);
    try {
        // json-server ne supporte pas PATCH avec ?agencyId=...
        // Il faut utiliser l'URL directe avec l'ID.
        // Assurez-vous que dans db.json, l'objet agence a bien "id": "agency-01" et non "agencyId"
        const response: AxiosResponse<TravelAgency> = await axiosInstance.patch(
            `${URL_AGENCES}/${agencyId}`,
            dataToUpdate
        );
        console.log(`✅ [AgencyService] Agence ${agencyId} mise à jour avec succès.`);
        return mapToUIAgency(response.data);
    } catch (error) {
        console.error(`❌ [AgencyService] Erreur de mise à jour pour l'agence ${agencyId}:`, error);
        throw error; // Re-throw l'erreur pour que le hook puisse la catcher
    }
}


/**
 * Récupère les voyages d'une agence spécifique
 */
export async function getTripsByAgencyId(agencyId: string): Promise<Trip[]> {
  try {
    // Filtrage par agencyId dans le fichier des départs
    const response: AxiosResponse<any[]> = await axiosInstance.get(
      `${URL_DEPARTS}?agencyId=${agencyId}`
    );
    if (response.status === 200) {
      console.log(
        `🚌 [AgencyService] ${response.data.length} voyages trouvés pour l'agence ${agencyId}`
      );
      return response.data.map(mapToUITrip);
    }
    return [];
  } catch (error) {
    console.error(`❌ [AgencyService] Erreur récupération voyages:`, error);
    return [];
  }
}

/**
 * Récupère toutes les agences pour le listing
 */
export async function getAllPublicAgencies(): Promise<TravelAgency[]> {
  try {
    const response: AxiosResponse<any[]> = await axiosInstance.get(
      `${URL_AGENCES}`
    );
    if (response.status === 200) {
      return response.data.map(mapToUIAgency);
    }
    return [];
  } catch (error) {
    return [];
  }
}