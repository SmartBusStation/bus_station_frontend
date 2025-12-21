import { useState, useEffect } from "react";
import { TravelAgency } from "@/lib/types/models/Agency";
import { Trip } from "@/lib/types/models/Trip";
import {
  getPublicAgencyById,
  getTripsByAgencyId,
} from "@/lib/services/agency-public-service";

export function useAgencyPublicDetails(agencyId: string) {
  const [agency, setAgency] = useState<TravelAgency | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (agencyId) {
      fetchDetails(agencyId);
    }
  }, [agencyId]);

  async function fetchDetails(id: string) {
    setIsLoading(true);
    setError(null);
    try {
      const [agencyData, tripsData] = await Promise.all([
        getPublicAgencyById(id),
        getTripsByAgencyId(id),
      ]);

      if (agencyData) {
        setAgency(agencyData);
        setTrips(tripsData);
      } else {
        setError("Agence introuvable.");
      }
    } catch (err) {
      setError("Erreur lors du chargement des détails.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    agency,
    trips,
    isLoading,
    error,
    refetch: () => fetchDetails(agencyId),
  };
}
