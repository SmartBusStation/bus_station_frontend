"use client";

import React, { Suspense } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import TripPlannerForm from "@/components/dashboard/trip-planning/TripPlannerForm";
import { useTripPlanner } from "@/lib/hooks/dasboard/useTripPlanner";
import Loader from "@/modals/Loader";

function TripPlannerPageContent() {
    const tripPlanner = useTripPlanner();

    if (tripPlanner.isLoading) {
        return <div className="flex justify-center p-20"><Loader /></div>;
    }

    return (
        <>
            <PageHeader
                title={tripPlanner.isEditMode ? "Modifier un Voyage" : "Planifier un Voyage"}
                subtitle="Remplissez tous les détails nécessaires pour votre nouveau voyage."
            />
            <div className="lg:col-span-3">
                <TripPlannerForm hook={tripPlanner} />
            </div>
        </>
    );
}

export default function TripPlanningPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-20"><Loader /></div>}>
            <TripPlannerPageContent />
        </Suspense>
    );
}