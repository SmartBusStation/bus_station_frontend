// // src/app/dashboard/calendar/page.tsx
// "use client";

// import React, { useState } from "react"; // MODIFIÉ: import useState
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation"; // NOUVEAU
// import { format } from "date-fns"; // NOUVEAU
// import PageHeader from "@/components/dashboard/PageHeader";
// import CalendarView from "@/components/dashboard/calendar/CalendarView";
// import { CalendarEvent } from "@/lib/types/dashboard";

// const CalendarPage = () => {
//   const { t } = useTranslation();
//   const router = useRouter(); // NOUVEAU

//   // Mock data pour les événements du calendrier
//   // NOUVEAU: Utilisation de useState pour pouvoir ajouter de nouveaux voyages
//   const [events, setEvents] = useState<CalendarEvent[]>([
//     {
//       id: "1",
//       title: "Alpes Suisses",
//       start: new Date(2025, 6, 20),
//       end: new Date(2025, 6, 26),
//       status: "published",
//     },
//     {
//       id: "2",
//       title: "Plages de Kribi",
//       start: new Date(2025, 6, 25),
//       end: new Date(2025, 6, 28),
//       status: "published",
//     },
//     {
//       id: "3",
//       title: "Safari à Waza",
//       start: new Date(2025, 4, 15),
//       end: new Date(2025, 4, 22),
//       status: "completed",
//     },
//     {
//       id: "4",
//       title: "Tour de l'Ouest",
//       start: new Date(2025, 7, 1),
//       end: new Date(2025, 7, 8),
//       status: "cancelled",
//     },
//   ]);

//   // NOUVEAU: Fonction de handler pour la redirection
//   const handleDateSelect = (date: Date) => {
//     const formattedDate = format(date, "yyyy-MM-dd");
//     router.push(`/dashboard/trip-planning?departureDate=${formattedDate}`);
//   };

//   return (
//     <>
//       <PageHeader
//         title={t("dashboard.calendar.title")}
//         subtitle={t("dashboard.calendar.subtitle")}
//       />
//       <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
//         {/* MODIFIÉ: on passe la nouvelle prop */}
//         <CalendarView events={events} onSelectDate={handleDateSelect} />
//       </div>
//     </>
//   );
// };

// export default CalendarPage;




// src/app/dashboard/calendar/page.tsx
"use client";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import PageHeader from "@/components/dashboard/PageHeader";
import CalendarView from "@/components/dashboard/calendar/CalendarView";
import { useDashboard } from "@/context/DashboardContext";
import { CalendarEvent } from "@/lib/types/dashboard";

const CalendarPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { trips } = useDashboard();

  // Convertir les voyages en événements pour le calendrier
  const events: CalendarEvent[] = useMemo(() => {
    return trips.map(trip => ({
      id: trip.id,
      title: trip.title,
      start: new Date(trip.departureDate),
      end: new Date(trip.returnDate || trip.departureDate),
      status: trip.status === 'on_schedule' ? 'published' : trip.status,
    }));
  }, [trips]);

  const handleDateSelect = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    router.push(`/dashboard/trip-planning?departureDate=${formattedDate}`);
  };

  const handleEventClick = (event: CalendarEvent) => {
    // Redirige vers le formulaire en mode édition
    router.push(`/dashboard/trip-planning?tripId=${event.id}`);
  };

  return (
    <>
      <PageHeader title={t("dashboard.calendar.title")} subtitle={t("dashboard.calendar.subtitle")} />
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <CalendarView events={events} onSelectDate={handleDateSelect} onSelectEvent={handleEventClick} />
      </div>
    </>
  );
};

export default CalendarPage;