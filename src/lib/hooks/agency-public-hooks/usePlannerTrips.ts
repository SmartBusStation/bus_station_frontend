// src/lib/hooks/agency-public-hooks/usePlannerTrips.ts

import { useState, useEffect } from 'react';
import { PlannerTrip } from '@/lib/types/models/Trip';
import { getPlannerTripsByAgencyId } from '@/lib/services/planner-trip-service';

interface UsePlannerTripsReturn {
  trips: PlannerTrip[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch and manage planner trips for a specific agency.
 * @param agencyId - The ID of the agency.
 * @returns An object containing the trips, loading state, and error state.
 */
export const usePlannerTrips = (agencyId: string): UsePlannerTripsReturn => {
  const [trips, setTrips] = useState<PlannerTrip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Do not fetch if agencyId is not provided
    if (!agencyId) {
      setIsLoading(false);
      return;
    }

    const fetchTrips = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPlannerTripsByAgencyId(agencyId);
        setTrips(data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        console.error(errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, [agencyId]); // Re-run the effect if agencyId changes

  return { trips, isLoading, error };
};
