// src/app/dashboard/marketplace/page.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/dashboard/PageHeader";
import PublishedTripCard from "@/components/dashboard/marketplace/PublishedTripCard";

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

const publishedTrips: PublishedTrip[] = [
  {
    id: "pub-1",
    title: "Alpes Suisses Aventure",
    route: "Yaoundé - Bafoussam",
    departureDate: "2025-07-20",
    reservations: 25,
    capacity: 40,
    estimatedRevenue: 30000,
    status: "on_schedule",
    departureLocation: "Yaoundé",
    destinationLocation: "Bafoussam",
    price: 1200,
    vehicleId: "veh-1",
    driverId: "drv-1",
  },
  {
    id: "pub-2",
    title: "Plages de Kribi",
    route: "Douala - Kribi",
    departureDate: "2025-07-25",
    reservations: 38,
    capacity: 50,
    estimatedRevenue: 19000,
    status: "on_schedule",
    departureLocation: "Douala",
    destinationLocation: "Kribi",
    price: 800,
    vehicleId: "veh-2",
    driverId: "drv-2",
  },
  {
    id: "pub-3",
    title: "Safari à Waza",
    route: "Garoua - Waza",
    departureDate: "2025-05-15",
    reservations: 30,
    capacity: 30,
    estimatedRevenue: 45000,
    status: "completed",
    departureLocation: "Garoua",
    destinationLocation: "Waza",
    price: 1500,
    vehicleId: "veh-3",
    driverId: "drv-3",
  },
  {
    id: "pub-4",
    title: "Tour de l'Ouest",
    route: "Yaoundé - Bamenda",
    departureDate: "2025-08-01",
    reservations: 0,
    capacity: 45,
    estimatedRevenue: 0,
    status: "cancelled",
    departureLocation: "Yaoundé",
    destinationLocation: "Bamenda",
    price: 1000,
    vehicleId: "veh-4",
    driverId: "drv-4",
  },
];

const AgencyMarketplacePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t("dashboard.agencyMarketplace.title")}
        subtitle={t("dashboard.agencyMarketplace.subtitle")}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {publishedTrips.map((trip) => (
          <PublishedTripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </>
  );
};

export default AgencyMarketplacePage;
