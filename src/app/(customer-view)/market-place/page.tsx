"use client"

import React, { useEffect, useState } from "react"
import { Search,  Wifi, Snowflake, Usb} from "lucide-react"
import { useRouter } from "next/navigation"
import {AxiosError} from "axios";
import MarketPlaceHeader from "@/components/marketPlaceComponents/Market-Place-Header";
import Filters from "@/components/marketPlaceComponents/Filters";
import TripGrid from "@/components/marketPlaceComponents/TripGrid";
import Loader from "@/components/marketPlaceComponents/loader";

const fakeTrips = [
    {
        idVoyage: 1,
        nomAgence: "Voyage Express",
        prix: 15000,
        lieuDepart: "Douala",
        lieuArrive: "Yaoundé",
        dureeVoyage: "4h 30min",
        nbrPlaceReservable: 45,
        nbrPlaceRestante: 12,
        nomClasseVoyage: "VIP",
        bigImage: "/placeholder.svg?height=300&width=400",
        rating: 4.8,
        amenities: ["WiFi", "AC", "USB"],
    },
    {
        idVoyage: 2,
        nomAgence: "Comfort Travel",
        prix: 12500,
        lieuDepart: "Yaoundé",
        lieuArrive: "Limbé",
        dureeVoyage: "6h 15min",
        nbrPlaceReservable: 40,
        nbrPlaceRestante: 8,
        nomClasseVoyage: "Standard",
        bigImage: "/placeholder.svg?height=300&width=400",
        rating: 4.5,
        amenities: ["WiFi", "AC"],
    },
    {
        idVoyage: 3,
        nomAgence: "Luxury Lines",
        prix: 25000,
        lieuDepart: "Douala",
        lieuArrive: "Kribi",
        dureeVoyage: "3h 45min",
        nbrPlaceReservable: 30,
        nbrPlaceRestante: 15,
        nomClasseVoyage: "Premium",
        bigImage: "/placeholder.svg?height=300&width=400",
        rating: 4.9,
        amenities: ["WiFi", "AC", "USB", "Snacks"],
    },
    {
        idVoyage: 4,
        nomAgence: "City Connect",
        prix: 8500,
        lieuDepart: "Limbé",
        lieuArrive: "Douala",
        dureeVoyage: "5h 20min",
        nbrPlaceReservable: 50,
        nbrPlaceRestante: 22,
        nomClasseVoyage: "Economy",
        bigImage: "/placeholder.svg?height=300&width=400",
        rating: 4.2,
        amenities: ["AC"],
    },
    {
        idVoyage: 5,
        nomAgence: "Rapid Transit",
        prix: 18000,
        lieuDepart: "Kribi",
        lieuArrive: "Yaoundé",
        dureeVoyage: "4h 10min",
        nbrPlaceReservable: 35,
        nbrPlaceRestante: 5,
        nomClasseVoyage: "VIP",
        bigImage: "/placeholder.svg?height=300&width=400",
        rating: 4.7,
        amenities: ["WiFi", "AC", "USB"],
    },
    {
        idVoyage: 6,
        nomAgence: "Coastal Express",
        prix: 22000,
        lieuDepart: "Yaoundé",
        lieuArrive: "Kribi",
        dureeVoyage: "4h 00min",
        nbrPlaceReservable: 42,
        nbrPlaceRestante: 18,
        nomClasseVoyage: "Premium",
        bigImage: "/placeholder.svg?height=300&width=400",
        rating: 4.6,
        amenities: ["WiFi", "AC", "USB", "Meals"],
    },
]



export interface SearchFilterType {
    departure: string;
    arrival: string;
    date: string;
}

export default function MarketPlace() {


    const router = useRouter();
    const [availableTrips, setAvailableTrips] = useState(fakeTrips)
    const [filteredTrips, setFilteredTrips] = useState(fakeTrips);
    const [error, setError] = useState<AxiosError|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [searchFilters, setSearchFilters] = useState<SearchFilterType>({
        departure: "",
        arrival: "",
        date: "",
    });

    useEffect(() => {
        fetchAvailableTrips()
    }, [])

    useEffect(() => {
        filterTrips()
    }, [activeFilter, availableTrips]);



    async function fetchAvailableTrips() {
        try {
            setIsLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsLoading(false)
            setError(null)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            const axiosError = error as AxiosError
            setError(axiosError);
        }
    }

    function filterTrips() {
        if (activeFilter === "all") {
            setFilteredTrips(availableTrips)
        } else {
            const filtered = availableTrips.filter(
                (trip) => trip.lieuDepart === activeFilter || trip.lieuArrive === activeFilter,
            )
            setFilteredTrips(filtered)
        }
    }

    function handleSearch() {
        let filtered = availableTrips

        if (searchFilters.departure) {
            filtered = filtered.filter((trip) =>
                trip.lieuDepart.toLowerCase().includes(searchFilters.departure.toLowerCase()),
            )
        }

        if (searchFilters.arrival) {
            filtered = filtered.filter((trip) => trip.lieuArrive.toLowerCase().includes(searchFilters.arrival.toLowerCase()))
        }

        setFilteredTrips(filtered)
    }


    function getAmenityIcon(amenity: string): React.JSX.Element|null {
        switch (amenity.toLowerCase()) {
            case "wifi":
                return <Wifi className="h-4 w-4" />
            case "ac":
                return <Snowflake className="h-4 w-4" />
            case "usb":
                return <Usb className="h-4 w-4" />
            default:
                return null
        }
    }


    function getClassColor(className: string) {
        switch (className.toLowerCase()) {
            case "vip":
                return "bg-blue-600 text-white"
            case "premium":
                return "bg-blue-500 text-white"
            case "standard":
                return "bg-blue-400 text-white"
            case "economy":
                return "bg-gray-500 text-white"
            default:
                return "bg-gray-500 text-white"
        }
    }

    if (isLoading) return <Loader/>
    return (
        <div className="min-h-screen p-2">
            <div>
                {/* Header avec recherche */}
                <MarketPlaceHeader searchFilters={searchFilters} setSearchFilters={setSearchFilters} handleSearch={handleSearch}/>

                {/* Filtres */}
                <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>

                {/* Grille des voyages */}
              < TripGrid filteredTrips={filteredTrips} getClassColor={getClassColor} getAmenityIcon={getAmenityIcon}/>

                {/* Pagination */}
                {filteredTrips.length > 0 && (
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
                {filteredTrips.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                            <Search className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}
