// src/lib/hooks/dasboard/usePublishedTrips.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useBusStation } from '@/context/Provider';
import { getAgencyByChefId } from '@/lib/services/agency-service';
import { getTripsByAgency, updateTrip } from '@/lib/services/trip-service';
import { Voyage } from '@/lib/types/generated-api';
import { PaginatedResponse } from '@/lib/types/common';
import { useRouter } from 'next/navigation';

export function usePublishedTrips() {
    const { userData, isLoading: isUserLoading } = useBusStation();
    const router = useRouter();

    const [allTrips, setAllTrips] = useState<Voyage[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

    const [filter, setFilter] = useState<'PUBLIE' | 'EN_COURS' | 'TERMINE' | 'ANNULE' | 'all'>('all');

    const fetchTrips = useCallback(async (id: string) => {
        setIsLoading(true);
        setApiError(null);
        try {
            // On récupère un grand nombre pour simuler l'absence de pagination pour l'instant
            const response: PaginatedResponse<Voyage> | null = await getTripsByAgency(id, 0, 100);
            // On filtre les brouillons pour ne pas les afficher ici
            const publishedOrFinishedTrips = response?.content?.filter(t => t.statusVoyage !== 'EN_ATTENTE') || [];
            setAllTrips(publishedOrFinishedTrips);
        } catch (error) {
            setApiError("Impossible de charger la liste des voyages publiés.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isUserLoading && userData?.userId) {
            getAgencyByChefId(userData.userId).then(agency => {
                if (agency?.agencyId) {
                    setAgencyId(agency.agencyId);
                    fetchTrips(agency.agencyId);
                } else {
                    setApiError("Aucune agence associée trouvée.");
                    setIsLoading(false);
                }
            });
        } else if (!isUserLoading) {
            setIsLoading(false);
        }
    }, [userData, isUserLoading, fetchTrips]);

    const filteredTrips = useMemo(() => {
        if (filter === 'all') return allTrips;
        return allTrips.filter(trip => trip.statusVoyage === filter);
    }, [allTrips, filter]);

    const handleCancelTrip = async (tripId: string) => {
        if (!agencyId) return;
        if (!window.confirm("Êtes-vous sûr de vouloir annuler ce voyage ? Les réservations existantes seront impactées.")) return;

        try {
            await updateTrip(tripId, { statusVoyage: 'ANNULE' });
            await fetchTrips(agencyId); // Recharger les données
        } catch (error: any) {
            setApiError(error.response?.data?.message || "Erreur lors de l'annulation du voyage.");
        }
    };

    const handleEditTrip = (tripId: string) => {
        // Redirige vers la page de planification avec l'ID du voyage en paramètre
        router.push(`/dashboard/trip-planning?edit=${tripId}`);
    };

    return {
        isLoading,
        apiError,
        filteredTrips,
        filter,
        setFilter,
        handleCancelTrip,
        handleEditTrip,
    };
}