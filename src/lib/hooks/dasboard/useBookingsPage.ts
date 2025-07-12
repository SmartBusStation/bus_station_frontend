import { useState, useEffect, useCallback, useMemo } from 'react';
import { useBusStation } from '@/context/Provider';
import { getAgencyByChefId } from '@/lib/services/agency-service';
import { getReservationsByAgency } from '@/lib/services/reservation-service';
import { ReservationPreviewDTO } from '@/lib/types/generated-api';
import { PaginatedResponse } from '@/lib/types/common';

export function useBookingsPage() {
    const { userData, isLoading: isUserLoading } = useBusStation();

    const [bookings, setBookings] = useState<ReservationPreviewDTO[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const fetchBookings = useCallback(async (id: string, page: number) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const response: PaginatedResponse<ReservationPreviewDTO> = await getReservationsByAgency(id);
            setBookings(response.content || []);
            setTotalPages(response.totalPages || 1);
            setTotalElements(response.totalElements || 0);
        } catch (error) {
            console.error(error);
            setApiError("Impossible de charger les réservations.");
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        if (!isUserLoading && userData?.userId) {
            getAgencyByChefId(userData.userId).then(agency => {
                if (agency?.agencyId) {
                    setAgencyId(agency.agencyId);
                    fetchBookings(agency.agencyId, 1);
                } else {
                    setApiError("Aucune agence associée trouvée.");
                    setIsLoading(false);
                }
            });
        } else if (!isUserLoading) {
            setIsLoading(false);
        }
    }, [userData, isUserLoading, fetchBookings]);


    useEffect(() => {
        if (agencyId) {
            fetchBookings(agencyId, currentPage);
        }
    }, [currentPage, agencyId, fetchBookings]);


    const filteredBookings = useMemo(() => {
        return bookings.filter(booking => {
            const reservation = booking.reservation;
            const voyage = booking.voyage;
            const searchLower = searchTerm.toLowerCase();

            const matchesSearch = searchTerm === '' ||
                reservation?.idReservation?.toLowerCase().includes(searchLower) ||
                voyage?.titre?.toLowerCase().includes(searchLower);

            const matchesStatus = statusFilter === 'all' ||
                reservation?.statutReservation === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [bookings, searchTerm, statusFilter]);

    return {
        isLoading,
        apiError,
        filteredBookings,
        currentPage,
        totalPages,
        totalElements,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter
    };
}