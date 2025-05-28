// components/agencies-page-components/TripCard.tsx
"use client";

import { Star, MapPin, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import {TripCardProps} from "@/lib/types/ui";


export default function TripCard({ trip }: TripCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={trip.image}
          alt={trip.title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{trip.title}</h3>
          <div className="flex items-center text-white/90">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{trip.destination}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-medium">{trip.rating}</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {trip.price.toLocaleString()} FCFA
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {new Date(trip.departureDate).toLocaleDateString()} -{" "}
            {new Date(trip.returnDate).toLocaleDateString()}
          </span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {trip.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {trip.included.slice(0, 3).map((item, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-50 text-primary rounded-full text-xs">
              {item}
            </span>
          ))}
          {trip.included.length > 3 && (
            <span className="px-2 py-1 bg-blue-50 text-primary rounded-full text-xs">
              +{trip.included.length - 3} {t("agenciesPage.profile.moreItems")}
            </span>
          )}
        </div>

        <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-start-color transition-colors">
          {t("agenciesPage.profile.viewTripButton")}
        </button>
      </div>
    </div>
  );
}
