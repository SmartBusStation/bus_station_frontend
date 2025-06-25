"use client";

import { useState } from "react";
import { Search, Filter, Grid3X3, List, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import TransparentModal from "@/modals/TransparentModal";
import { PaymentModal } from "@/modals/PaymentRequestModal";
import {useMyReservation} from "@/lib/hooks/reservation-hooks/useMyReservation";
import LoadingSpinner from "@/components/my-reservation-components/LoadingSpinner";
import GridCardTrip from "@/components/my-reservation-components/GridCard";
import TripListItem from "@/components/my-reservation-components/TripListItem";
import FiltersPanel from "@/components/my-reservation-components/FilterPanel";
import {Pagination} from "antd";

export default function ScheduledTripsPage() {
    const router = useRouter();
    const reservationHook = useMyReservation();

    // États locaux de la page
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);

    // Filtres locaux
    const [selectedAgency, setSelectedAgency] = useState("All Agencies");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [selectedDate, setSelectedDate] = useState("");

    if (reservationHook.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen p-3">
            {/* Header */}
            <div className="bg-gray-100 rounded-2xl shadow-md mb-10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Booked Trips</h1>
                            <p className="text-gray-600">Manage your reservations and track your journeys</p>
                        </div>

                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search trips..."
                                value={reservationHook.searchQuery}
                                onChange={(e) => reservationHook.setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-end">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                                    showFilters
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                <Filter className="h-4 w-4" />
                                <span className="hidden sm:inline">Filters</span>
                            </button>

                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-gray-600"
                                    }`}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-gray-600"
                                    }`}
                                >
                                    <List className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <FiltersPanel
                            selectedAgency={selectedAgency}
                            selectedStatus={selectedStatus}
                            selectedDate={selectedDate}
                            onAgencyChange={setSelectedAgency}
                            onStatusChange={setSelectedStatus}
                            onDateChange={setSelectedDate}
                            onClearFilters={() => {
                                setSelectedAgency("All Agencies");
                                setSelectedStatus("All Status");
                                setSelectedDate("");
                                reservationHook.setSearchQuery("");
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="lg:max-w-7xl max-w-5xl">
                {reservationHook.filteredTrips?.length > 0 ? (
                    <>
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {reservationHook.filteredTrips.map((trip, index) => (
                                    <GridCardTrip
                                        key={trip.reservation.idReservation}
                                        trip={trip}
                                        onPayment={() => reservationHook.openPaymentModal(trip)}
                                        onCancel={() => reservationHook.openCancellationModal(trip)}
                                        onViewDetails={() => reservationHook.navigateToDetails(trip.reservation.idReservation)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {reservationHook.filteredTrips.map((trip, index) => (
                                    <TripListItem
                                        key={trip.reservation.idReservation}
                                        trip={trip}
                                        onPayment={() => reservationHook.openPaymentModal(trip)}
                                        onCancel={() => reservationHook.openCancellationModal(trip)}
                                        onViewDetails={() => reservationHook.navigateToDetails(trip.reservation.idReservation)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <MapPin className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                        <button
                            onClick={() => router.push("/available-trips")}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Browse Available Trips
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {reservationHook.canRenderPaginationContent && (
                    <Pagination
                        currentPage={reservationHook.currentPage}
                        totalPages={reservationHook.totalPages}
                        onPageChange={reservationHook.setCurrentPage}
                    />
                )}
            </div>

            {/* Modal de paiement */}
            <TransparentModal isOpen={reservationHook.canOpenPaymentRequestModal}>
                <PaymentModal
                    reservation={reservationHook.selectedTrip?.reservation}
                    onClose={() => reservationHook.setCanOpenPaymentRequestModal(false)}
                />
            </TransparentModal>
        </div>
    );
}