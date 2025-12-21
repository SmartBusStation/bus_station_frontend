// src/lib/services/planner-trip-service.ts

import { PlannerTrip } from "@/lib/types/models/Trip";
import axiosInstance from "./axios-services/axiosInstance";
import { AxiosResponse } from "axios";

const URL_PLANNER_TRIPS = "http://localhost:3001/plannerTrips";

/**
 * Fetches the planner trips for a specific agency.
 */
export const getPlannerTripsByAgencyId = async (agencyId: string): Promise<PlannerTrip[]> => {
  try {
    const response = await fetch(`${URL_PLANNER_TRIPS}?agencyId=${agencyId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch planner trips for agency ${agencyId}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getPlannerTripsByAgencyId:", error);
    return [];
  }
};

/**
 * Creates a new planner trip.
 */
export const createPlannerTrip = async (tripData: Omit<PlannerTrip, 'id'>): Promise<PlannerTrip> => {
    try {
        const response: AxiosResponse<PlannerTrip> = await axiosInstance.post(URL_PLANNER_TRIPS, tripData);
        console.log(`✅ [PlannerTripService] Trip created successfully.`);
        return response.data;
    } catch (error) {
        console.error(`❌ [PlannerTripService] Error creating trip:`, error);
        throw error;
    }
};

/**
 * Updates an existing planner trip.
 */
export const updatePlannerTrip = async (tripId: number, dataToUpdate: Partial<PlannerTrip>): Promise<PlannerTrip> => {
    try {
        const response: AxiosResponse<PlannerTrip> = await axiosInstance.patch(
            `${URL_PLANNER_TRIPS}/${tripId}`,
            dataToUpdate
        );
        console.log(`✅ [PlannerTripService] Trip ${tripId} updated successfully.`);
        return response.data;
    } catch (error) {
        console.error(`❌ [PlannerTripService] Error updating trip ${tripId}:`, error);
        throw error;
    }
};

/**
 * Deletes a planner trip.
 */
export const deletePlannerTrip = async (tripId: number): Promise<void> => {
    console.log(`🗑️ [PlannerTripService] Attempting to delete trip with ID: ${tripId}`);
    try {
        const url = `${URL_PLANNER_TRIPS}/${tripId}`;
        console.log(`🗑️ [PlannerTripService] DELETE request to URL: ${url}`);
        const response = await axiosInstance.delete(url);
        console.log(`✅ [PlannerTripService] Trip ${tripId} deleted successfully. Response status: ${response.status}`);
    } catch (error) {
        if (axiosInstance.isAxiosError(error)) {
            console.error(`❌ [PlannerTripService] Axios Error deleting trip ${tripId}:`, error.message);
            if (error.response) {
                console.error(`❌ [PlannerTripService] Response data:`, error.response.data);
                console.error(`❌ [PlannerTripService] Response status:`, error.response.status);
                console.error(`❌ [PlannerTripService] Response headers:`, error.response.headers);
            } else if (error.request) {
                console.error(`❌ [PlannerTripService] No response received. Request:`, error.request);
            } else {
                console.error(`❌ [PlannerTripService] Error setting up request:`, error.message);
            }
        } else {
            console.error(`❌ [PlannerTripService] Unknown Error deleting trip ${tripId}:`, error);
        }
        throw error;
    }
};