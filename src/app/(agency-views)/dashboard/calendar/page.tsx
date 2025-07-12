// src/app/(agency-views)/dashboard/calendar/page.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { AlertCircle, RefreshCw } from 'lucide-react';
import PageHeader from "@/components/dashboard/PageHeader";
import CalendarView from "@/components/dashboard/calendar/CalendarView";
import { useTripCalendar } from "@/lib/hooks/dasboard/useTripCalendar";
import Loader from "@/modals/Loader";
import { TripDetailModal } from "@/components/dashboard/calendar/TripDetailModal";

const CalendarPage = () => {
  const { t } = useTranslation();
  const hook = useTripCalendar();

  const renderContent = () => {
    if (hook.isLoading) {
      return <div className="flex justify-center p-20"><Loader /></div>;
    }
    if (hook.apiError) {
      return (
          <div className="p-10 text-center text-red-600 bg-red-50 rounded-lg">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-2 text-lg font-semibold">Erreur de chargement</h3>
            <p className="mt-1 text-sm">{hook.apiError}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2 mx-auto">
              <RefreshCw className="h-4 w-4" /> Réessayer
            </button>
          </div>
      );
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <CalendarView
              events={hook.calendarEvents}
              onSelectDate={hook.handleSelectSlot}
              onSelectEvent={hook.handleSelectEvent}
          />
        </div>
    );
  };

  return (
      <>
        <PageHeader
            title={t("dashboard.calendar.title")}
            subtitle={t("dashboard.calendar.subtitle")}
        />
        {renderContent()}
        <TripDetailModal
            isOpen={hook.isModalOpen}
            trip={hook.selectedTrip}
            onClose={hook.closeModal}
            onEdit={hook.handleEdit}
            onCancel={hook.handleCancel}
            onDelete={hook.handleDelete}
        />
      </>
  );
};

export default CalendarPage;