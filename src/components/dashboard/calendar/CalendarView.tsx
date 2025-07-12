"use client";

import React from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "@/lib/types/dashboard";

const locales = { fr: fr };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek: () => startOfWeek(new Date(), { locale: fr }), getDay, locales });

const eventStyleGetter = (event: CalendarEvent) => {
  const statusColors = {
    PUBLIE: "#3b82f6", // blue-500
    EN_COURS: "#16a34a", // green-600
    EN_ATTENTE: "#f59e0b", // amber-500
    TERMINE: "#6b7280", // gray-500
    ANNULE: "#ef4444", // red-500
  };

  const backgroundColor = statusColors[event.status] || "#6b7280";
  const style = { backgroundColor, borderRadius: "5px", color: "white", border: "0px", display: "block" };
  return { style };
};



interface CalendarViewProps {
  events: CalendarEvent[];
  date: Date; // AJOUTER
  onNavigate: (newDate: Date) => void; // AJOUTER
  onSelectDate: (date: Date) => void;
  onSelectEvent: (event: CalendarEvent) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, date, onNavigate, onSelectDate, onSelectEvent }) => {
  const handleSelectSlot = (slotInfo: SlotInfo) => onSelectDate(slotInfo.start);

  return (
      <div>
        <div className="h-[70vh]">
          <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              culture="fr"
              messages={{ next: "Suivant", previous: "Précédent", today: "Aujourd'hui", month: "Mois", week: "Semaine", day: "Jour", agenda: "Agenda" }}
              eventPropGetter={eventStyleGetter}
              selectable={true}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={onSelectEvent}
              date={date}
              onNavigate={onNavigate}
          />
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center"><span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>Publié</div>
          <div className="flex items-center"><span className="h-3 w-3 rounded-full bg-amber-500 mr-2"></span>Brouillon</div>
          <div className="flex items-center"><span className="h-3 w-3 rounded-full bg-green-600 mr-2"></span>En cours</div>
          <div className="flex items-center"><span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>Annulé</div>
          <div className="flex items-center"><span className="h-3 w-3 rounded-full bg-gray-500 mr-2"></span>Terminé</div>
        </div>
      </div>
  );
};

export default CalendarView;