"use client"

import { Suspense } from "react"
import PageHeader from "@/components/dashboard/PageHeader"
import TripPlannerForm from "@/components/dashboard/trip-planning/TripPlannerForm"
import { useTripPlanner } from "@/lib/hooks/dasboard/useTripPlanner"
import Loader from "@/modals/Loader"
import { MapPin, Calendar, Clock } from "lucide-react"

function TripPlannerPageContent() {
    const tripPlanner = useTripPlanner()

    if (tripPlanner.isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title={tripPlanner.isEditMode ? "Modifier un Voyage" : "Planifier un Nouveau Voyage"}
                subtitle={
                    tripPlanner.isEditMode
                        ? "Modifiez les détails de votre voyage existant"
                        : "Créez un nouveau voyage en remplissant tous les détails nécessaires"
                }
            >
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Itinéraire</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Planning</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Horaires</span>
                    </div>
                </div>
            </PageHeader>

            <TripPlannerForm hook={tripPlanner} />
        </div>
    )
}

export default function TripPlanningPage() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center py-20">
                    <Loader />
                </div>
            }
        >
            <TripPlannerPageContent />
        </Suspense>
    )
}
