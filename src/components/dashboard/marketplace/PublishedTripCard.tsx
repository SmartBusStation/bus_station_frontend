// src/components/dashboard/marketplace/PublishedTripCard.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Calendar, DollarSign, XCircle } from "lucide-react";

// Type local, comme dans la page précédente
type PublishedTrip = {
  id: string;
  title: string;
  route: string;
  departureDate: string;
  reservations: number;
  capacity: number;
  estimatedRevenue: number;
  status: "on_schedule" | "completed" | "cancelled";
  departureLocation: string;
  destinationLocation: string;
  price: number;
  vehicleId: string;
  driverId: string;
};

const PublishedTripCard = ({ trip }: { trip: PublishedTrip }) => {
  const { t } = useTranslation();
  const reservationPercentage =
    trip.capacity > 0 ? (trip.reservations / trip.capacity) * 100 : 0;

  const getStatusInfo = () => {
    switch (trip.status) {
      case "on_schedule":
        return {
          text: t("dashboard.agencyMarketplace.status.onSchedule"),
          color: "bg-blue-100 text-blue-700",
        };
      case "completed":
        return {
          text: t("dashboard.agencyMarketplace.status.completed"),
          color: "bg-green-100 text-green-700",
        };
      case "cancelled":
        return {
          text: t("dashboard.agencyMarketplace.status.cancelled"),
          color: "bg-red-100 text-red-700",
        };
      default:
        return { text: "Inconnu", color: "bg-gray-100 text-gray-700" };
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{trip.title}</h3>
        <div
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            getStatusInfo().color
          }`}
        >
          {getStatusInfo().text}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" /> {trip.route}
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" /> {trip.departureDate}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">
            {t("dashboard.agencyMarketplace.reservations")}
          </span>
          <span>
            {trip.reservations} / {trip.capacity}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${reservationPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-green-500" />
          <span className="font-medium text-gray-700">
            {t("dashboard.agencyMarketplace.estRevenue")}:
          </span>
          <span className="font-semibold text-green-600">
            {trip.estimatedRevenue.toLocaleString()}FCFA
          </span>
        </div>
        {trip.status === "on_schedule" && (
          <button className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700">
            <XCircle className="h-4 w-4" />
            {t("dashboard.agencyMarketplace.cancelTrip")}
          </button>
        )}
      </div>
    </div>
  );
};

export default PublishedTripCard;
