// src/app/dashboard/trip-planning/page.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/dashboard/PageHeader";
import TripPlannerForm from "@/components/dashboard/trip-planning/TripPlannerForm";
import { Plus } from "lucide-react";

const TripPlanningPage = () => {
  const { t } = useTranslation();

  // Placeholder pour les brouillons de voyages
  const draftTrips = [
    {
      id: "draft-1",
      title: "Alpes Suisses Aventure",
      lastSaved: "Il y a 2 jours",
    },
    {
      id: "draft-2",
      title: "Tour de la Toscane",
      lastSaved: "Il y a 1 semaine",
    },
  ];

  return (
    <>
      <PageHeader
        title={t("dashboard.tripPlanning.title")}
        subtitle={t("dashboard.tripPlanning.subtitle")}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Formulaire de planification */}
        <div className="lg:col-span-2">
          <TripPlannerForm />
        </div>

        {/* Liste des brouillons */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("dashboard.tripPlanning.drafts.title")}
            </h3>
            {draftTrips.length > 0 ? (
              <ul className="space-y-3">
                {draftTrips.map((draft) => (
                  <li
                    key={draft.id}
                    className="flex items-center justify-between rounded-md p-3 hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-800">{draft.title}</p>
                      <p className="text-xs text-gray-500">{draft.lastSaved}</p>
                    </div>
                    <button className="text-sm text-primary hover:underline">
                      {t("dashboard.tripPlanning.drafts.edit")}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                {t("dashboard.tripPlanning.drafts.noDrafts")}
              </p>
            )}
            <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              <Plus className="h-4 w-4" />
              {t("dashboard.tripPlanning.drafts.newTrip")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripPlanningPage;
