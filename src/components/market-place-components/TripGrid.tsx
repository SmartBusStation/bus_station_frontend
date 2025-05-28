import Image from "next/image";
import {ArrowRight, Clock, MapPin, Users} from "lucide-react";
import React from "react";
import {AvailableTrips} from "@/lib/hooks/useMarketPlace";
import {formatDuration} from "@/lib/services/dateServices";


export interface TripGrid {
    filteredTrips: AvailableTrips[],
    getClassColor: (classe: string) => string,
    getAmenityIcon: (amenity: string) => React.JSX.Element|null,
    navigate: (tripId: string) => void
}

export default function TripGrid( {filteredTrips, getClassColor, getAmenityIcon, navigate} : TripGrid)
{
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
                <div
                    key={trip.idVoyage}
                    className="bg-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
                >
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            width={400}
                            height={300}
                            src={trip.bigImage || "/placeholder.svg"}
                            alt={`${trip.nomAgence} trip`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getClassColor(trip.nomClasseVoyage)}`}
                        >
                            {trip.nomClasseVoyage}
                        </div>
                        {/*<div
                            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current"/>
                            <span className="text-sm font-semibold">{trip.rating}</span>
                        </div>*/}
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{trip.nomAgence}</h3>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="h-4 w-4"/>
                                    <span className="text-sm">{trip.lieuDepart}</span>
                                    <ArrowRight className="h-4 w-4"/>
                                    <span className="text-sm">{trip.lieuArrive}</span>
                                </div>
                            </div>
                            <div className="text-right flex gap-2">
                                <p className="text-2xl font-bold text-blue-600">{trip.prix.toLocaleString()}</p>
                                <p className="mt-1.5 text-sm text-gray-500">FCFA</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-blue-600"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="font-semibold text-gray-900">
                                        {formatDuration(trip.dureeVoyage.seconds)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-blue-600"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Available Seats</p>
                                    <p className="font-semibold text-gray-900">
                                        {trip.nbrPlaceRestante}/{trip.nbrPlaceReservable} seats
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {trip.amenities.map((amenity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm"
                                >
                                    {getAmenityIcon(amenity)}
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate(trip.idVoyage)}
                            className="translate-x-1/2 cursor-pointer px-4 bg-primary text-white rounded-xl py-2 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Book This Trip
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}