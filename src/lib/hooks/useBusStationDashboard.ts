import { useState, useEffect } from "react";
import {
    getBusStationDetails,
    getAffiliatedAgencies,
    getAffiliationTaxes,
} from "@/lib/services/bus-station-service";
import { getTripsByAgency } from "@/lib/services/trip-service";
import {
    BusStation,
    Agency,
    Trip,
    TripsByDate,
    AffiliationTax,
} from "@/lib/types/bus-station";

export interface AgencyWithTaxStatus extends Agency {
    taxStatus?: "payé" | "en attente" | "en retard";
    taxAmount?: number;
    taxDueDate?: string;
}

export const useBusStationDashboard = (stationId: string) => {
    const [station, setStation] = useState<BusStation | null>(null);
    const [agencies, setAgencies] = useState<AgencyWithTaxStatus[]>([]);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [tripsByDate, setTripsByDate] = useState<TripsByDate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const stationDetails = await getBusStationDetails(stationId);
                setStation(stationDetails);

                const affiliatedAgencies = await getAffiliatedAgencies(stationId);
                const taxes = await getAffiliationTaxes(stationId);

                const agenciesWithTax = affiliatedAgencies.map((agency) => {
                    const taxInfo = taxes.find((tax) => tax.agencyId === agency.id);
                    return {
                        ...agency,
                        taxStatus: taxInfo?.status,
                        taxAmount: taxInfo?.amount,
                        taxDueDate: taxInfo?.dueDate,
                    };
                });
                setAgencies(agenciesWithTax);

                const agencyIds = affiliatedAgencies.map((agency) => agency.id);
                const tripsPerAgency = await Promise.all(
                  agencyIds.map((id) =>
                    getTripsByAgency(id)
                    .then((res) => (res?.content ?? []) as unknown as Trip[])
                    .catch(() => [] as Trip[])
                  )
                );
                const allTrips: Trip[] = tripsPerAgency.flat();
                setTrips(allTrips);

                // Groupement par date
                const tripsCountByDate = allTrips.reduce(
                    (acc: { [key: string]: number }, trip) => {
                        const date = trip.dateDepartPrev.split("T")[0];
                        acc[date] = (acc[date] || 0) + 1;
                        return acc;
                    },
                    {}
                );

                const formattedTripsByDate = Object.keys(tripsCountByDate).map(
                    (date) => ({
                        date,
                        count: tripsCountByDate[date],
                    })
                );
                setTripsByDate(formattedTripsByDate);

            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        if (stationId) fetchData();
    }, [stationId]);

    return { station, agencies, trips, tripsByDate, loading, error };
};