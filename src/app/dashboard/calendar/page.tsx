// src/app/dashboard/calendar/page.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/dashboard/PageHeader";
import CalendarView from "@/components/dashboard/calendar/CalendarView";
import { CalendarEvent } from "@/lib/types/dashboard";

const CalendarPage = () => {
  const { t } = useTranslation();

  // Mock data pour les événements du calendrier
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Alpes Suisses",
      start: new Date(2025, 6, 20),
      end: new Date(2025, 6, 26),
      status: "published",
    },
    {
      id: "2",
      title: "Plages de Kribi",
      start: new Date(2025, 6, 25),
      end: new Date(2025, 6, 28),
      status: "published",
    },
    {
      id: "3",
      title: "Safari à Waza",
      start: new Date(2025, 4, 15),
      end: new Date(2025, 4, 22),
      status: "completed",
    },
    {
      id: "4",
      title: "Tour de l'Ouest",
      start: new Date(2025, 7, 1),
      end: new Date(2025, 7, 8),
      status: "cancelled",
    },
  ];

  return (
    <>
      <PageHeader
        title={t("dashboard.calendar.title")}
        subtitle={t("dashboard.calendar.subtitle")}
      />
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <CalendarView events={events} />
      </div>
    </>
  );
};

export default CalendarPage;
