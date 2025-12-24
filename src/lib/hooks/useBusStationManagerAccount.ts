// src/lib/hooks/useBusStationManagerAccount.ts
import { useState, useEffect } from "react";
import { getBusStationManagerAccount } from "@/lib/services/bus-station-service";
import { BusStationManagerAccount } from "@/lib/types/bus-station";

export const useBusStationManagerAccount = (busStationId: string) => {
  const [account, setAccount] = useState<BusStationManagerAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBusStationManagerAccount(busStationId);
        setAccount(data);
      } catch (err) {
        setError("Failed to fetch manager account data");
      } finally {
        setLoading(false);
      }
    };

    if (busStationId) {
      fetchData();
    }
  }, [busStationId]);

  return { account, loading, error };
};