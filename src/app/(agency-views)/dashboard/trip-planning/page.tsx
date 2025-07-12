"use client";

import React, { Suspense } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import TripPlannerForm from "@/components/dashboard/trip-planning/TripPlannerForm";
import DraftsList from "@/components/dashboard/trip-planning/DraftsList";
import { useTripPlanner } from "@/lib/hooks/dasboard/useTripPlanner";
import Loader from "@/modals/Loader";

function TripPlannerPageContent() {
  const tripPlanner = useTripPlanner();

  if (tripPlanner.isLoading) {
    return (
      <div className="flex justify-center p-20">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Planification des Voyages"
        subtitle="Créez, modifiez et publiez vos voyages ici."
      />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Formulaire de planification */}
        <div className="lg:col-span-2">
          <TripPlannerForm hook={tripPlanner} />
        </div>

        {/* Liste des brouillons */}
        <div className="lg:col-span-1">
          <DraftsList hook={tripPlanner} />
        </div>
      </div>
    </>
  );
}

export default function TripPlanningPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-20">
          <Loader />
        </div>
      }
    >
      <TripPlannerPageContent />
    </Suspense>
  );
}
