// src/lib/services/planner-trip-service.ts

import { PlannerTrip } from "@/lib/types/models/Trip";

/**
 * Fetches the planner trips for a specific agency.
 * @param agencyId - The ID of the agency.
 * @returns A promise that resolves to an array of planner trips.
 */
export const getPlannerTripsByAgencyId = async (agencyId: string): Promise<PlannerTrip[]> => {
  try {
    // In a real app, this URL would come from a config file.
    const response = await fetch(`http://localhost:3001/plannerTrips?agencyId=${agencyId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch planner trips for agency ${agencyId}`);
    }
    
    const data: PlannerTrip[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getPlannerTripsByAgencyId:", error);
    // In a real app, you'd want a more robust error handling/logging mechanism.
    return []; // Return an empty array on error to prevent crashes.
  }
};
