import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useBusStation } from '@/context/Provider';
import { getAgencyByChefId } from '@/lib/services/agency-service';
import { getTripsByAgency, publishTrip } from '@/lib/services/trip-service';
import { Voyage } from '@/lib/types/generated-api';

export function useDraftsPage() {
    const { userData } = useBusStation();
    const router = useRouter();
    const [drafts, setDrafts] = useState<Voyage[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

    const fetchDrafts = useCallback(async (id: string) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const response = await getTripsByAgency(id, 0, 200);
            const draftTrips = response?.content?.filter(t => t.statusVoyage === 'EN_ATTENTE') || [];
            setDrafts(draftTrips);
        } catch (error) {
            console.error(error);
            setApiError("Impossible de charger les brouillons.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userData?.userId) {
            getAgencyByChefId(userData.userId).then(agency => {
                if (agency?.agencyId) {
                    setAgencyId(agency.agencyId);
                    fetchDrafts(agency.agencyId);
                } else {
                    setApiError("Agence non trouvée.");
                    setIsLoading(false);
                }
            });
        }
    }, [userData, fetchDrafts]);

    const handleEdit = (tripId: string) => {
        router.push(`/dashboard/trip-planning?edit=${tripId}`);
    };

    const handlePublish = async (tripId: string) => {
        if (!agencyId) return;
        if (!window.confirm("Voulez-vous publier ce voyage ?")) return;
        try {
            await publishTrip(tripId);
            await fetchDrafts(agencyId);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la publication.");
        }
    };

    const handleDelete = async (tripId: string) => {
        if (!window.confirm("Voulez-vous supprimer ce brouillon ?")) return;
        try {
            //await deleteVoyage(tripId);
            setDrafts(prev => prev.filter(d => d.idVoyage !== tripId));
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la suppression.");
        }
    };

    return { isLoading, apiError, drafts, handleEdit, handlePublish, handleDelete };
}