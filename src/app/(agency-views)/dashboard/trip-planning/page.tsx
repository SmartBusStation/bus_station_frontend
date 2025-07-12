"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import TripPlannerForm from "@/components/dashboard/trip-planning/TripPlannerForm";
import { useTripPlanner } from "@/lib/hooks/dasboard/useTripPlanner";
import Loader from "@/modals/Loader";

function TripPlannerPageContent() {
    const tripPlanner = useTripPlanner();
    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');


    useEffect(() => {
        if (editId) {
            if (!tripPlanner.isLoading && tripPlanner.drafts.length > 0) {
                tripPlanner.handleSelectDraft(editId);
            }
        }
    }, [editId, tripPlanner.isLoading, tripPlanner.drafts]);

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