import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "./axios-services/axiosInstance";
import { UserResponseCreatedDTO } from "../types/models/BusinessActor";
import { ChauffeurRequestDTO } from "../types/models/BusinessActor";

const url = "/utilisateur";

export async function getDriversByAgency(
  agencyId: string
): Promise<UserResponseCreatedDTO[] | null> {
  console.log(
    `[SERVICE_REQUEST] getDriversByAgency pour agencyId: ${agencyId}`
  );
  if (!agencyId) {
    console.error(
      "[SERVICE_ERROR] getDriversByAgency: ID de l'agence manquant."
    );
    return null;
  }
  try {
    const response: AxiosResponse<UserResponseCreatedDTO[]> =
      await axiosInstance.get(`${url}/chauffeurs/${agencyId}`);
    if (response.status === 200) {
      console.log(
        `[SERVICE_SUCCESS] getDriversByAgency: ${response.data.length} chauffeur(s) trouvé(s).`
      );
      return response.data;
    }
    console.warn(
      `[SERVICE_WARN] getDriversByAgency: Statut inattendu - ${response.status}`,
      response.data
    );
    return null;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[SERVICE_FAILURE] getDriversByAgency: Erreur lors de la récupération des chauffeurs.`,
      {
        message: axiosError.message,
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      }
    );
    throw error;
  }
}

export async function createDriverForAgency(
  data: ChauffeurRequestDTO
): Promise<UserResponseCreatedDTO | null> {
  console.log("[SERVICE_REQUEST] createDriverForAgency avec payload:", data);
  try {
    const response: AxiosResponse<UserResponseCreatedDTO> =
      await axiosInstance.post(`${url}/chauffeur`, data);
    if (response.status === 201) {
      console.log(
        "[SERVICE_SUCCESS] createDriverForAgency: Chauffeur créé avec succès.",
        response.data
      );
      return response.data;
    }
    console.warn(
      `[SERVICE_WARN] createDriverForAgency: Statut inattendu - ${response.status}`,
      response.data
    );
    return null;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[SERVICE_FAILURE] createDriverForAgency: Erreur lors de la création du chauffeur.`,
      {
        message: axiosError.message,
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      }
    );
    throw error;
  }
}
