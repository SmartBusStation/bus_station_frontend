"use client"

import React, {JSX} from "react"
import {Search} from "lucide-react"
import MarketPlaceHeader from "@/components/market-place-components/Market-Place-Header";
import Filters from "@/components/market-place-components/Filters";
import TripGrid from "@/components/market-place-components/TripGrid";
import Loader from "@/components/market-place-components/loader";
import {useMarketPlace} from "@/lib/hooks/useMarketPlace";
import {useNavigation} from "@/lib/hooks/useNavigation";




export interface SearchFilterType {
    departure: string;
    arrival: string;
    date: string;
}

export default function MarketPlace(): JSX.Element {


    const marketPlace = useMarketPlace();
    const navigate = useNavigation();



    if (marketPlace.isLoading) return <Loader/>
    return (
        <div className="min-h-screen p-2">
            {/* Header avec recherche */}
            <MarketPlaceHeader
                searchFilters={marketPlace.searchFilters}
                setSearchFilters={marketPlace.setSearchFilters}
                handleSearch={marketPlace.handleSearch}
            />

            {/* Filtres */}
            <Filters
                activeFilter={marketPlace.activeFilter}
                setActiveFilter={marketPlace.setActiveFilter}
            />

            {/* Grille des voyages */}
            <TripGrid
                filteredTrips={marketPlace.filteredTrips || []}
                getClassColor={marketPlace.getClassColor}
                getAmenityIcon={marketPlace.getAmenityIcon}
                navigate = {navigate.onGoToTripDetail}
            />

            {/* Pagination */}
            {marketPlace.filteredTrips && marketPlace.filteredTrips.length > 0 && (
                <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors flex items-center justify-center">
                            ←
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center shadow-lg">
                            1
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors flex items-center justify-center">
                            2
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors flex items-center justify-center">
                            3
                        </button>
                        <span className="px-2 text-gray-500">...</span>
                        <button className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors flex items-center justify-center">
                            →
                        </button>
                    </div>
                </div>
            )}

            {/* État: Aucun voyage trouvé (filtre vide) */}
            {marketPlace.filteredTrips && marketPlace.filteredTrips.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-16 py-10 px-6 text-center">
                    <div className="w-20 h-20 mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Aucun voyage trouvé
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                        Aucun voyage ne correspond à vos critères de recherche actuels.
                    </p>
                    <button
                        onClick={() => {/* Fonction pour réinitialiser les filtres */}}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}

            {/* État: Erreur de chargement (données null) */}
            {marketPlace.filteredTrips === null && (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <div className="w-20 h-20 mb-6 rounded-full bg-red-50 flex items-center justify-center">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Erreur de chargement
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                        Une erreur s'est produite lors du chargement des voyages.
                        Veuillez réessayer.
                    </p>
                    <button
                        onClick={() => {window.location.reload()}}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            )}
        </div>
    )
}
