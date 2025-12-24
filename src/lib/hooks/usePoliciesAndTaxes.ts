// src/lib/hooks/usePoliciesAndTaxes.ts
import { useState, useEffect } from "react";
import { getPoliciesAndTaxes } from "@/lib/services/bus-station-service";
import { PolicyAndTax } from "@/lib/types/bus-station";

export const usePoliciesAndTaxes = (stationId: string) => {
  const [policiesAndTaxes, setPoliciesAndTaxes] = useState<PolicyAndTax[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPoliciesAndTaxes(stationId);
        setPoliciesAndTaxes(data);
      } catch (err) {
        setError("Failed to fetch policies and taxes");
      } finally {
        setLoading(false);
      }
    };

    if (stationId) {
      fetchData();
    }
  }, [stationId]);

  return { policiesAndTaxes, loading, error };
};
