import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useBusStation } from '@/context/Provider';
import { getAgencyByChefId } from '@/lib/services/agency-service';
import { getTripsByAgency, updateTrip, deleteVoyage } from '@/lib/services/trip-service';
import { PaginatedResponse } from '@/lib/types/common';
import {TripDetails} from "@/lib/types/models/Trip";



export function usePublishedTrips() {
    const { userData, isLoading: isUserLoading } = useBusStation();
    const router = useRouter();

    const [allTrips, setAllTrips] = useState<TripDetails[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false); // Pour les actions (annuler, supprimer)
    const [apiError, setApiError] = useState<string | null>(null);

    const [filter, setFilter] = useState<'PUBLIE' | 'EN_COURS' | 'TERMINE' | 'ANNULE' | 'all'>('all');

    const fetchTrips = useCallback(async (id: string) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const response: PaginatedResponse<TripDetails> | null = await getTripsByAgency(id);
            const nonDraftTrips = response?.content?.filter(t => t.statusVoyage !== 'EN_ATTENTE') || [];
            setAllTrips(nonDraftTrips);
        } catch (error) {
            console.error(error);
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
                    setApiError("Aucune agence associée n'a été trouvée.");
                    setIsLoading(false);
                }
            });
        }
    }, [userData, isUserLoading, fetchTrips]);

    const filteredTrips = useMemo(() => {
        if (filter === 'all') return allTrips;
        return allTrips.filter(trip => trip.statusVoyage === filter);
    }, [allTrips, filter]);

    const handleCancelTrip = async (tripId: string) => {
        if (!agencyId || !window.confirm("Êtes-vous sûr de vouloir annuler ce voyage ?")) return;

        setIsActionLoading(true);
        try {
            await updateTrip(tripId, { statusVoyage: 'ANNULE' });
            // Recharger les données pour refléter le changement
            await fetchTrips(agencyId);
        } catch (error: unknown) {
            console.error(error);
            alert("Erreur lors de l'annulation du voyage.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDeleteTrip = async (tripId: string) => {
        if (!agencyId || !window.confirm("ACTION IRRÉVERSIBLE !\nSupprimer définitivement ce voyage ?")) return;

        setIsActionLoading(true);
        try {
            await deleteVoyage(tripId);
            // Mettre à jour l'UI immédiatement sans recharger
            setAllTrips(prev => prev.filter(trip => trip.idVoyage !== tripId));
        } catch (error: unknown) {
            console.error(error);
            alert("Erreur lors de la suppression du voyage.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleEditTrip = (tripId: string) => {
        router.push(`/dashboard/trip-planning?edit=${tripId}`);
    };

    return {
        isLoading,
        isActionLoading,
        apiError,
        filteredTrips,
        filter,
        setFilter,
        handleCancelTrip,
        handleDeleteTrip,
        handleEditTrip,
    };
}