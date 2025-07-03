// src/components/dashboard/calendar/CalendarView.tsx
"use client";

import React from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar"; // MODIFIÉ: import SlotInfo
import { format } from "date-fns";
import { parse } from "date-fns";
import { startOfWeek } from "date-fns";
import { getDay } from "date-fns/getDay";
import { fr } from "date-fns/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "@/lib/types/dashboard";

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: fr }),
  getDay,
  locales,
});

const eventStyleGetter = (event: CalendarEvent) => {
  let backgroundColor = "#3b82f6"; // primary
  switch (event.status) {
    case "completed":
      backgroundColor = "#16a34a";
      break; // green
    case "cancelled":
      backgroundColor = "#ef4444";
      break; // red
  }
  const style = {
    backgroundColor,
    borderRadius: "5px",
    opacity: 0.8,
    color: "white",
    border: "0px",
    display: "block",
  };
  return { style };
};

// // MODIFIÉ: Ajout de la prop onSelectDate
// const CalendarView = ({
//   events,
//   onSelectDate,
// }: {
//   events: CalendarEvent[];
//   onSelectDate: (date: Date) => void;
// }) => {
//   // NOUVEAU: Handler pour la sélection d'un slot
//   const handleSelectSlot = (slotInfo: SlotInfo) => {
//     // On appelle la fonction passée en prop avec la date de début du slot
//     onSelectDate(slotInfo.start);
//   };


const CalendarView = ({
  events,
  onSelectDate,
  onSelectEvent, // NOUVEAU
}: {
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  onSelectEvent: (event: CalendarEvent) => void; // NOUVEAU
}) => {
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    onSelectDate(slotInfo.start);
  };


  return (
    <div>
      <div className="h-[70vh]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          culture="fr"
          messages={{
            next: "Suivant",
            previous: "Précédent",
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            agenda: "Agenda",
          }}
          eventPropGetter={eventStyleGetter}
          selectable={true} // NOUVEAU: Permet de sélectionner les dates
          onSelectSlot={handleSelectSlot} // NOUVEAU: Gère l'événement de sélection
          onSelectEvent={onSelectEvent} // NOUVEAU
        />
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-primary mr-2"></span>Publié
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-green-600 mr-2"></span>
          Terminé
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-red-600 mr-2"></span>Annulé
        </div>
      </div>
    </div>
  );
};

export default CalendarView;