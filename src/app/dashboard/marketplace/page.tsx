// src/app/dashboard/marketplace/page.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/dashboard/PageHeader";
import PublishedTripCard from "@/components/dashboard/marketplace/PublishedTripCard";
import { PublishedTrip } from "@/lib/types/dashboard";

const AgencyMarketplacePage = () => {
  const { t } = useTranslation();

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
    },
  ];

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
