import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import { Trip } from "@/lib/types/models/Trip";
import { PaginatedResponse } from "../types/common";
import { TripAxiosResponseInterface } from "@/lib/types/models/Trip";
import {Voyage, VoyageCreateRequestDTO} from "../types/generated-api";

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

export async function createTrip(data: VoyageCreateRequestDTO): Promise<Voyage | null> {
  try {
    const response: AxiosResponse<Voyage> = await axiosInstance.post(`${url}/create`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[trip-service] Erreur lors de la création du voyage:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
}


export async function updateTrip(id: string, data: Partial<VoyageCreateRequestDTO>): Promise<Voyage | null> {
  try {
    const response: AxiosResponse<Voyage> = await axiosInstance.put(`${url}/${id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`[trip-service] Erreur de mise à jour du voyage ${id}:`, axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
}


export async function getTripsByAgency(agencyId: string, page = 0, size = 25): Promise<PaginatedResponse<Voyage> | null> {
  if (!agencyId) return null;
  try {
    const response: AxiosResponse<PaginatedResponse<Voyage>> = await axiosInstance.get(`${url}/agence/${agencyId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[trip-service] Erreur de récupération des voyages par agence:", axiosError.response?.data || axiosError.message);
    throw axiosError;
  }
}


export async function publishTrip(tripId: string): Promise<Voyage | null> {
  console.log(`[trip-service] Publication du voyage ID: ${tripId}`);
  const payload : Record<string, 'EN_ATTENTE' | 'PUBLIE' | 'EN_COURS' | 'TERMINE' | 'ANNULE'>= { statusVoyage: "PUBLIE" };
  return updateTrip(tripId, payload);
}
