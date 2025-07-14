"use client";

import React from 'react';
import { format } from 'date-fns';
import { Plus, MapPin, Users, DollarSign } from 'lucide-react';
import { CalendarMonth, CalendarEvent } from '@/lib/types/calendar';

interface EnhancedCalendarViewProps {
    calendarMonth: CalendarMonth;
    onDateSelect: (date: Date) => void;
    onEventSelect: (event: CalendarEvent) => void;
    getStatusColor: (status: string) => string;
    getStatusDotColor: (status: string) => string;
}

const EnhancedCalendarView: React.FC<EnhancedCalendarViewProps> = ({
                                                                       calendarMonth,
                                                                       onDateSelect,
                                                                       onEventSelect,
                                                                       getStatusColor,
                                                                       getStatusDotColor
                                                                   }) => {
    const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    const EventCard: React.FC<{ event: CalendarEvent }> = ({ event }) => (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onEventSelect(event);
            }}
            className={`
        p-2 rounded-md text-xs cursor-pointer border-l-4 border-l-primary
        bg-gradient-to-r from-primary/10 to-primary/5
        hover:from-primary/20 hover:to-primary/10
        transition-all duration-200 hover:shadow-md
        group relative
      `}
        >
            <div className="flex items-start justify-between gap-1">
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate group-hover:text-primary">
                        {event.title}
                    </p>
                    <div className="flex items-center gap-1 text-gray-600 mt-1">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate text-xs">{event.description}</span>
                    </div>
                    {event.price && (
                        <div className="flex items-center gap-1 text-gray-600 mt-1">
                            <DollarSign className="h-3 w-3 flex-shrink-0" />
                            <span className="text-xs font-medium">{event.price.toLocaleString()} FCFA</span>
                        </div>
                    )}
                    {event.totalSeats && (
                        <div className="flex items-center gap-1 text-gray-600 mt-1">
                            <Users className="h-3 w-3 flex-shrink-0" />
                            <span className="text-xs">
                {(event.totalSeats - (event.availableSeats || 0))} / {event.totalSeats}
              </span>
                        </div>
                    )}
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusDotColor(event.status)}`} />
            </div>

            {/* Badge de statut */}
            <div className="mt-2">
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
          {event.status.replace('_', ' ')}
        </span>
            </div>
        </div>
    );
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DayCell: React.FC<{ day: any }> = ({ day }) => (
        <div
            onClick={() => onDateSelect(day.date)}
            className={`
        min-h-[120px] p-2 border border-gray-200 cursor-pointer
        transition-all duration-200 relative group
        ${day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
        ${day.isToday ? 'ring-2 ring-primary ring-inset' : ''}
        ${day.isSelected ? 'bg-primary/5 border-primary' : ''}
        hover:shadow-md
      `}
        >
            <div className="flex items-center justify-between mb-2">
        <span
            className={`
            text-sm font-medium
            ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
            ${day.isToday ? 'text-primary font-bold' : ''}
          `}
        >
          {format(day.date, 'd')}
        </span>

                {day.events.length === 0 && (
                    <Plus className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
            </div>

            <div className="space-y-1">
                {day.events.slice(0, 2).map((event: CalendarEvent) => (
                    <EventCard key={event.id} event={event} />
                ))}

                {day.events.length > 2 && (
                    <div className="text-xs text-gray-500 text-center py-1 bg-gray-100 rounded">
                        +{day.events.length - 2} autre{day.events.length - 2 > 1 ? 's' : ''}
                    </div>
                )}
            </div>

            {/* Indicateur de jour spécial */}
            {day.isToday && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
            )}
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* En-têtes des jours */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {weekDays.map((day) => (
                    <div key={day} className="p-4 text-center">
                        <span className="text-sm font-medium text-gray-600">{day}</span>
                    </div>
                ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7">
                {calendarMonth.weeks.flat().map((day, index) => (
                    <DayCell key={index} day={day} />
                ))}
            </div>

            {/* Légende des statuts */}
            <div className="border-t border-gray-200 bg-gray-50 p-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="text-gray-600">Publié</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                        <span className="text-gray-600">En attente</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-gray-600">En cours</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-gray-600">Annulé</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                        <span className="text-gray-600">Terminé</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedCalendarView;