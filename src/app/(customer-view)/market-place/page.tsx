"use client"

import React, {JSX} from "react"
import {Search} from "lucide-react"
import MarketPlaceHeader from "@/components/marketPlaceComponents/Market-Place-Header";
import Filters from "@/components/marketPlaceComponents/Filters";
import TripGrid from "@/components/marketPlaceComponents/TripGrid";
import Loader from "@/components/marketPlaceComponents/loader";
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
                filteredTrips={marketPlace.filteredTrips}
                getClassColor={marketPlace.getClassColor}
                getAmenityIcon={marketPlace.getAmenityIcon}
                navigate = {navigate.onGoToTripDetail}
            />

            {/* Pagination */}
            {marketPlace.filteredTrips.length > 0 && (
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

            {/* Message si aucun résultat */}
            {marketPlace.filteredTrips.length === 0  && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                        <Search className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
            )}
        </div>
    )
}
