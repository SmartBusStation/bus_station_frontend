// src/lib/hooks/dasboard/useTripCalendar.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useBusStation } from '@/context/Provider';
import { getAgencyByChefId } from '@/lib/services/agency-service';
import { getTripsByAgency, updateTrip } from '@/lib/services/trip-service';
import { Voyage } from '@/lib/types/generated-api';
import { CalendarEvent } from '@/lib/types/dashboard';

export function useTripCalendar() {
    const { userData, isLoading: isUserLoading } = useBusStation();
    const router = useRouter();

    const [allTrips, setAllTrips] = useState<Voyage[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

    // NOUVEAU: États pour la modale
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<Voyage | null>(null);


    const [currentDate, setCurrentDate] = useState(new Date());

    const fetchAllTrips = useCallback(async (id: string) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const response = await getTripsByAgency(id, 0, 200); // Récupérer un grand nombre de voyages
            setAllTrips(response?.content || []);
        } catch (error) {
            console.error(error);
            setApiError("Impossible de charger les voyages pour le calendrier.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isUserLoading && userData?.userId) {
            getAgencyByChefId(userData.userId).then(agency => {
                if (agency?.agencyId) {
                    setAgencyId(agency.agencyId);
                    fetchAllTrips(agency.agencyId);
                } else {
                    setApiError("Aucune agence associée trouvée.");
                    setIsLoading(false);
                }
            });
        }
    }, [userData, isUserLoading, fetchAllTrips]);

    // Conversion des voyages en événements de calendrier
    const calendarEvents: CalendarEvent[] = useMemo(() => {
        return allTrips.map(trip => ({
            id: trip.idVoyage!,
            title: trip.titre!,
            start: new Date(trip.dateDepartPrev!),
            // Pour un affichage correct sur plusieurs jours, on s'assure que la date de fin est au moins égale à la date de début
            end: new Date(trip.heureArrive && (new Date(trip.heureArrive) > new Date(trip.dateDepartPrev!)) ? trip.heureArrive : trip.dateDepartPrev!),
            status: trip.statusVoyage!,
        }));
    }, [allTrips]);

    // --- Gestion des Actions ---

    const handleSelectEvent = (event: CalendarEvent) => {
        const trip = allTrips.find(t => t.idVoyage === event.id);
        if (trip) {
            setSelectedTrip(trip);
            setIsModalOpen(true);
        }
    };

    const handleSelectSlot = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        router.push(`/dashboard/trip-planning?departureDate=${formattedDate}`);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (tripId: string) => {
        closeModal();
        router.push(`/dashboard/trip-planning?edit=${tripId}`);
    };

    const handleCancel = async (tripId: string) => {
        if (!agencyId) return;
        if (window.confirm("Voulez-vous vraiment annuler ce voyage ?")) {
            try {
                await updateTrip(tripId, { statusVoyage: 'ANNULE' });
                await fetchAllTrips(agencyId);
                closeModal();
            } catch (error) {
                console.error(error);
                alert("Erreur lors de l'annulation.");
            }
        }
    };

    const handleDelete = async (tripId: string) => {
        if (window.confirm("ACTION IRRÉVERSIBLE !\nVoulez-vous vraiment supprimer définitivement ce voyage ?")) {
            try {
              //  await deleteVoyage(tripId);
                if (agencyId) await fetchAllTrips(agencyId);
                closeModal();
            } catch (error) {
                console.error(error);
                alert("Erreur lors de la suppression.");
            }
        }
    };

    const handleNavigate = (newDate: Date) => {
        setCurrentDate(newDate);
    };

    return {
        isLoading,
        apiError,
        calendarEvents,
        isModalOpen,
        selectedTrip,
        handleSelectEvent,
        handleSelectSlot,
        closeModal,
        handleEdit,
        handleCancel,
        handleDelete,
        currentDate,
        handleNavigate,
    };
}