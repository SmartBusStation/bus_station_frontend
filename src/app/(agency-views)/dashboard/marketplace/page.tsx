// src/app/(agency-views)/dashboard/marketplace/page.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { AlertCircle, Bus, RefreshCw } from 'lucide-react';
import PageHeader from "@/components/dashboard/PageHeader";
import PublishedTripCard from "@/components/dashboard/marketplace/PublishedTripCard";
import { usePublishedTrips } from "@/lib/hooks/dasboard/usePublishedTrips";
import Loader from "@/modals/Loader";

const AgencyMarketplacePage = () => {
    const { t } = useTranslation();
    const hook = usePublishedTrips();

    const filterOptions = [
        { label: "Tous", value: "all" },
        { label: "Publiés", value: "PUBLIE" },
        { label: "En cours", value: "EN_COURS" },
        { label: "Terminés", value: "TERMINE" },
        { label: "Annulés", value: "ANNULE" },
    ];

    const renderContent = () => {
        if (hook.isLoading) {
            return <div className="flex justify-center p-20"><Loader /></div>;
        }

        if (hook.apiError) {
            return (
                <div className="p-10 text-center text-red-600 bg-red-50 rounded-lg">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
                    <h3 className="mt-2 text-lg font-semibold">Erreur de chargement</h3>
                    <p className="mt-1 text-sm">{hook.apiError}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2 mx-auto">
                        <RefreshCw className="h-4 w-4" /> Réessayer
                    </button>
                </div>
            );
        }

        if (hook.filteredTrips.length === 0) {
            return (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <Bus className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun voyage trouvé</h3>
                    <p className="mt-1 text-sm text-gray-500">Aucun voyage ne correspond à ce filtre. Essayez de planifier et publier un nouveau voyage !</p>
                </div>
            )
        }

        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {hook.filteredTrips.map((trip) => (
                    <PublishedTripCard
                        key={trip.idVoyage}
                        trip={trip}
                        // On passe maintenant les fonctions du hook directement
                        onCancel={hook.handleCancelTrip}
                        onEdit={hook.handleEditTrip}
                        onDelete={hook.handleDeleteTrip} // AJOUT
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <PageHeader
                title={t("dashboard.agencyMarketplace.title")}
                subtitle={t("dashboard.agencyMarketplace.subtitle")}
            >
                <div className="flex items-center gap-2 rounded-lg bg-white border p-1">
                    {filterOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => hook.setFilter(opt.value as any)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${hook.filter === opt.value ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </PageHeader>

            {hook.isActionLoading && <p className="text-center text-primary font-semibold my-2">Action en cours...</p>}
            {renderContent()}
        </>
    );
};

export default AgencyMarketplacePage;