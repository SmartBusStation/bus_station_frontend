import { useState, useEffect, useMemo } from "react";
import { GareRoutiere } from "@/lib/types/models/GareRoutiere";
import { getAllGares } from "@/lib/services/gare-service";

export function useGaresRoutieres() {
  const [gares, setGares] = useState<GareRoutiere[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // États de filtrage
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    fetchGares();
  }, []);

  async function fetchGares() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllGares();
      if (data) {
        setGares(data);
      } else {
        setGares([]);
        setError("Impossible de récupérer les données des gares.");
      }
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des gares.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const filteredGares = useMemo(() => {
    return gares.filter((gare) => {
      const matchesQuery =
        gare.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gare.ville.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesServices =
        selectedServices.length === 0 ||
        selectedServices.every((service) => gare.services.includes(service));

      return matchesQuery && matchesServices;
    });
  }, [gares, searchQuery, selectedServices]);

  const allServices = useMemo(() => {
    return Array.from(new Set(gares.flatMap((gare) => gare.services)));
  }, [gares]);

  return {
    gares: filteredGares,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedServices,
    handleServiceToggle,
    allServices,
    refetch: fetchGares,
  };
}
