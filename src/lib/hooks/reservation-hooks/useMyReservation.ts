import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBusStation } from "@/context/Provider";
import { getCustomerReservations, getReservationDetail } from "@/lib/services/reservation-service";
import { ReservationDetails } from "@/lib/types/models/Reservation";

interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    empty: boolean;
    first: boolean;
    last: boolean;
}

export function useMyReservation() {
    const router = useRouter();
    const { userData } = useBusStation();

    // États pour les réservations
    const [myScheduledTrips, setMyScheduledTrips] = useState<ReservationDetails[]>([]);
    const [reservationDetail, setReservationDetail] = useState<ReservationDetails | null>(null);
    const [selectedTrip, setSelectedTrip] = useState<ReservationDetails | null>(null);

    // États de navigation et pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [canRenderPaginationContent, setCanRenderPaginationContent] = useState(false);

    // États de recherche et filtres
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTrips, setFilteredTrips] = useState<ReservationDetails[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // États de chargement et erreurs
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // États des modals
    const [canOpenTripAnnulationModal, setCanOpenTripAnnulationModal] = useState(false);
    const [canOpenPaymentRequestModal, setCanOpenPaymentRequestModal] = useState(false);
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState(false);

    // Messages
    const [successMessage, setSuccessMessage] = useState("");

    // Chargement initial des réservations
    useEffect(() => {
        if (userData?.userId) {
            fetchMyScheduledTrips(userData.userId);
        }
    }, [userData?.userId]);

    // Filtrage des voyages
    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = myScheduledTrips.filter((trip) => {
                const voyage = trip.voyage;
                const agence = trip.agence;
                return (
                    voyage?.titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    voyage?.lieuDepart?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    voyage?.lieuArrive?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    agence?.longName?.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredTrips(filtered);
        } else {
            setFilteredTrips(myScheduledTrips);
        }
    }, [searchQuery, myScheduledTrips]);

    async function fetchMyScheduledTrips(userId: string) {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getCustomerReservations(userId) as PaginatedResponse<ReservationDetails> | null;
            if (response?.content) {
                setMyScheduledTrips(response.content);
                setTotalPages(response.totalPages || 1);
                setCanRenderPaginationContent(!response.empty);
                setFilteredTrips(response.content);
            } else {
                setMyScheduledTrips([]);
                setFilteredTrips([]);
                setCanRenderPaginationContent(false);
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
            setError(error as Error);
            setMyScheduledTrips([]);
            setFilteredTrips([]);
        } finally {
            setIsLoading(false);
        }
    }

    function openPaymentModal(trip: ReservationDetails) {
        setSelectedTrip(trip);
        setCanOpenPaymentRequestModal(true);
    }

    function openCancellationModal(trip: ReservationDetails) {
        setSelectedTrip(trip);
        setCanOpenTripAnnulationModal(true);
    }

    function navigateToDetails(reservationId: string) {
        router.push(`/my-reservations/reservation-details/${reservationId}`);
    }

    function filterByStatus(status: string) {
        const filtered = status === "All Status"
            ? myScheduledTrips
            : myScheduledTrips.filter((trip) => {
                const reservation = trip.reservation;
                switch (status) {
                    case "Paid": return reservation?.statutPayement === "PAID";
                    case "Confirmed": return reservation?.statutReservation === "CONFIRMEE";
                    case "Pending Payment": return reservation?.statutReservation === "RESERVER";
                    case "Cancelled": return reservation?.statutReservation === "ANNULEE";
                    default: return true;
                }
            });
        setFilteredTrips(filtered);
    }

    function filterByAgency(agencyName: string) {
        const filtered = agencyName === "All Agencies"
            ? myScheduledTrips
            : myScheduledTrips.filter((trip) => trip.agence?.longName === agencyName);
        setFilteredTrips(filtered);
    }

    function filterByDate(dateString: string) {
        const filtered = !dateString
            ? myScheduledTrips
            : myScheduledTrips.filter((trip) => trip.voyage?.dateDepartEffectif?.startsWith(dateString));
        setFilteredTrips(filtered);
    }

    function clearAllFilters() {
        setSearchQuery("");
        setFilteredTrips(myScheduledTrips);
    }


    async function fetchReservationDetail(idReservation: string) {
        if (!idReservation) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await getReservationDetail(idReservation);
            setReservationDetail(response);
        } catch (error) {
            console.error("Error fetching reservation detail:", error);
            setError(error as Error);
            setReservationDetail(null);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        // Données
        myScheduledTrips, filteredTrips, selectedTrip,reservationDetail,
        // États UI
        isLoading, error, searchQuery, currentPage, totalPages, canRenderPaginationContent, viewMode,
        // Modals
        canOpenTripAnnulationModal, canOpenPaymentRequestModal, canOpenSuccessModal, successMessage,
        // Actions
        setSearchQuery, setCurrentPage, setViewMode, openPaymentModal, openCancellationModal,
        navigateToDetails, filterByStatus, filterByAgency, filterByDate, clearAllFilters,
        // Setters pour modals
        setCanOpenTripAnnulationModal, setCanOpenPaymentRequestModal, setCanOpenSuccessModal, fetchReservationDetail

    };
}