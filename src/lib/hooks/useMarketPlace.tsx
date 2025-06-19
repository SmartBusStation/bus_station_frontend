import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {SearchFilterType} from "@/app/(customer-view)/market-place/page";
import { Wifi, Snowflake, Usb } from "lucide-react";



export interface AvailableTrips {
    "idVoyage": string,
    "nomAgence": string,
    "lieuDepart": string,
    "lieuArrive": string,
    "nbrPlaceRestante": number,
    "nbrPlaceReservable": number,
    "dureeVoyage": {
        "seconds": number,
        "zero": boolean,
        "nano": number,
        "negative": boolean,
        "units": [
            {
                "durationEstimated": boolean,
                "timeBased": boolean,
                "dateBased": boolean
            }
        ]
    },
    "nomClasseVoyage": string,
    "prix": number,
    "smallImage": string,
    "bigImage": string
    "amenities": Amenities[],
}


export type Amenities = "WiFi"|"AC"|"USB"|"Snacks"|"Meals";

/*const fakeTrips = [
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
*/


const fakeTrips: AvailableTrips[] = [
    {
        idVoyage: "1",
        nomAgence: "Voyage Express",
        prix: 15000,
        lieuDepart: "Douala",
        lieuArrive: "Yaoundé",
        dureeVoyage: {
            seconds: 16200, // 4h 30min en secondes
            zero: false,
            nano: 0,
            negative: false,
            units: [
                {
                    durationEstimated: true,
                    timeBased: true,
                    dateBased: false
                }
            ]
        },
        nbrPlaceReservable: 45,
        nbrPlaceRestante: 12,
        nomClasseVoyage: "VIP",
        bigImage: "/placeholder.svg?height=300&width=400",
        smallImage: "/placeholder.svg?height=150&width=200",
        amenities: ["WiFi", "AC", "USB"],
    },
    {
        idVoyage: "2",
        nomAgence: "Comfort Travel",
        prix: 12500,
        lieuDepart: "Yaoundé",
        lieuArrive: "Limbé",
        dureeVoyage: {
            seconds: 22500, // 6h 15min en secondes
            zero: false,
            nano: 0,
            negative: false,
            units: [
                {
                    durationEstimated: true,
                    timeBased: true,
                    dateBased: false
                }
            ]
        },
        nbrPlaceReservable: 40,
        nbrPlaceRestante: 8,
        nomClasseVoyage: "Standard",
        bigImage: "/placeholder.svg?height=300&width=400",
        smallImage: "/placeholder.svg?height=150&width=200",
        amenities: ["WiFi", "AC"],
    },
    {
        idVoyage: "3",
        nomAgence: "Luxury Lines",
        prix: 25000,
        lieuDepart: "Douala",
        lieuArrive: "Kribi",
        dureeVoyage: {
            seconds: 13500, // 3h 45min en secondes
            zero: false,
            nano: 0,
            negative: false,
            units: [
                {
                    durationEstimated: true,
                    timeBased: true,
                    dateBased: false
                }
            ]
        },
        nbrPlaceReservable: 30,
        nbrPlaceRestante: 15,
        nomClasseVoyage: "Premium",
        bigImage: "/placeholder.svg?height=300&width=400",
        smallImage: "/placeholder.svg?height=150&width=200",
        amenities: ["WiFi", "AC", "USB", "Snacks"],
    },
    {
        idVoyage: "4",
        nomAgence: "City Connect",
        prix: 8500,
        lieuDepart: "Limbé",
        lieuArrive: "Douala",
        dureeVoyage: {
            seconds: 19200, // 5h 20min en secondes
            zero: false,
            nano: 0,
            negative: false,
            units: [
                {
                    durationEstimated: true,
                    timeBased: true,
                    dateBased: false
                }
            ]
        },
        nbrPlaceReservable: 50,
        nbrPlaceRestante: 22,
        nomClasseVoyage: "Economy",
        bigImage: "/placeholder.svg?height=300&width=400",
        smallImage: "/placeholder.svg?height=150&width=200",
        amenities: ["AC"],
    },
    {
        idVoyage: "5",
        nomAgence: "Rapid Transit",
        prix: 18000,
        lieuDepart: "Kribi",
        lieuArrive: "Yaoundé",
        dureeVoyage: {
            seconds: 15000, // 4h 10min en secondes
            zero: false,
            nano: 0,
            negative: false,
            units: [
                {
                    durationEstimated: true,
                    timeBased: true,
                    dateBased: false
                }
            ]
        },
        nbrPlaceReservable: 35,
        nbrPlaceRestante: 5,
        nomClasseVoyage: "VIP",
        bigImage: "/placeholder.svg?height=300&width=400",
        smallImage: "/placeholder.svg?height=150&width=200",
        amenities: ["WiFi", "AC", "USB"],
    },
    {
        idVoyage: "6",
        nomAgence: "Coastal Express",
        prix: 22000,
        lieuDepart: "Yaoundé",
        lieuArrive: "Kribi",
        dureeVoyage: {
            seconds: 14400, // 4h 00min en secondes
            zero: false,
            nano: 0,
            negative: false,
            units: [
                {
                    durationEstimated: true,
                    timeBased: true,
                    dateBased: false
                }
            ]
        },
        nbrPlaceReservable: 42,
        nbrPlaceRestante: 18,
        nomClasseVoyage: "Premium",
        bigImage: "/placeholder.svg?height=300&width=400",
        smallImage: "/placeholder.svg?height=150&width=200",
        amenities: ["WiFi", "AC", "USB", "Meals"],
    },
]

export function useMarketPlace()
{


    const [availableTrips, setAvailableTrips] = useState<AvailableTrips[]>(fakeTrips)
    const [filteredTrips, setFilteredTrips] = useState<AvailableTrips[]>(fakeTrips);
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


    function getAmenityIcon(amenity: string) {
        switch (amenity.toLowerCase()) {
            case "wifi":
                return <Wifi className="h-4 w-4"/>
            case "ac":
                return <Snowflake className="h-4 w-4" />
            case "usb":
                return <Usb className="h-4 w-4" />
            default:
                return null
        }
    }

    return {
        filterTrips,
        handleSearch,
        getAmenityIcon,
        getClassColor,
        isLoading,
        filteredTrips,
        activeFilter,
        setActiveFilter,
        searchFilters,
        setSearchFilters

    }
}