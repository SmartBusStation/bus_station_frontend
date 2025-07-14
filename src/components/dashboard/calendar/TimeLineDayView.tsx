// src/components/dashboard/calendar/TimelineDayView.tsx
"use client";

import React from 'react';
import { ArrowLeft, Plus, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent } from '@/lib/types/calendar';

interface TimelineDayViewProps {
    date: Date;
    events: CalendarEvent[];
    onEventSelect: (event: CalendarEvent) => void;
    onCreateEvent: (date: Date) => void;
    onBack: () => void;
    getStatusColor: (status: string) => string;
    getStatusDotColor: (status: string) => string;
}

const TimelineDayView: React.FC<TimelineDayViewProps> = ({
                                                             date,
                                                             events,
                                                             onEventSelect,
                                                             onCreateEvent,
                                                             onBack,
                                                             getStatusColor,
                                                             getStatusDotColor
                                                         }) => {
    // Générer les créneaux horaires de 6h à 23h
    const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6);

    const getEventsForHour = (hour: number) => {
        return events.filter(event => {
            const eventHour = event.start.getHours();
            return eventHour === hour;
        });
    };

    const TimeSlot: React.FC<{ hour: number }> = ({ hour }) => {
        const hourEvents = getEventsForHour(hour);
        const timeString = `${hour.toString().padStart(2, '0')}:00`;

        return (
            <div className="flex min-h-[80px] border-b border-gray-100 last:border-b-0">
                {/* Colonne heure */}
                <div className="w-20 flex-shrink-0 p-4 bg-gray-50 border-r border-gray-200">
                    <div className="text-sm font-medium text-gray-700">{timeString}</div>
                </div>

                {/* Colonne événements */}
                <div className="flex-1 p-4 relative">
                    {hourEvents.length === 0 ? (
                        <button
                            onClick={() => {
                                const newDate = new Date(date);
                                newDate.setHours(hour, 0, 0, 0);
                                onCreateEvent(newDate);
                            }}
                            className="w-full h-full min-h-[48px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
                        >
                            <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Ajouter un voyage</span>
                        </button>
                    ) : (
                        <div className="space-y-3">
                            {hourEvents.map((event, index) => (
                                <TimelineEventCard
                                    key={event.id}
                                    event={event}
                                    onSelect={onEventSelect}
                                    getStatusColor={getStatusColor}
                                    getStatusDotColor={getStatusDotColor}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* En-tête */}
            <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-white/80 rounded-lg transition-colors"
                            title="Retour au calendrier"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Planning du {format(date, 'EEEE dd MMMM yyyy', { locale: fr })}
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                {events.length} voyage{events.length > 1 ? 's' : ''} programmé{events.length > 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => onCreateEvent(date)}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        <Plus className="h-4 w-4" />
                        Nouveau voyage
                    </button>
                </div>
            </div>

            {/* Timeline */}
            <div className="max-h-[600px] overflow-y-auto">
                {timeSlots.map(hour => (
                    <TimeSlot key={hour} hour={hour} />
                ))}
            </div>

            {/* Footer avec statistiques */}
            {events.length > 0 && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-lg font-bold text-primary">{events.length}</p>
                            <p className="text-xs text-gray-500">Voyages</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-green-600">
                                {events.reduce((sum, e) => sum + (e.totalSeats || 0), 0)}
                            </p>
                            <p className="text-xs text-gray-500">Places totales</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-amber-600">
                                {events.reduce((sum, e) => sum + (e.availableSeats || 0), 0)}
                            </p>
                            <p className="text-xs text-gray-500">Disponibles</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-blue-600">
                                {events.reduce((sum, e) => sum + (e.price || 0), 0).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">FCFA</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TimelineEventCard: React.FC<{
    event: CalendarEvent;
    onSelect: (event: CalendarEvent) => void;
    getStatusColor: (status: string) => string;
    getStatusDotColor: (status: string) => string;
}> = ({ event, onSelect, getStatusColor, getStatusDotColor }) => {
    return (
        <div
            onClick={() => onSelect(event)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer group"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusDotColor(event.status)}`} />
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {event.title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{format(event.start, 'HH:mm', { locale: fr })}</span>
                    </div>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
          {event.status.replace('_', ' ')}
        </span>
            </div>

            <div className="space-y-2 text-sm">
                {event.description && (
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{event.description}</span>
                    </div>
                )}

                <div className="flex items-center justify-between text-gray-600">
                    {event.totalSeats && (
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{(event.totalSeats - (event.availableSeats || 0))} / {event.totalSeats}</span>
                        </div>
                    )}

                    {event.price && (
                        <div className="flex items-center gap-1 font-medium">
                            <DollarSign className="h-4 w-4" />
                            <span>{event.price.toLocaleString()} FCFA</span>
                        </div>
                    )}
                </div>

                {/* Barre de progression des places */}
                {event.totalSeats && (
                    <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-primary rounded-full h-1.5 transition-all duration-300"
                                style={{
                                    width: `${((event.totalSeats - (event.availableSeats || 0)) / event.totalSeats) * 100}%`
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimelineDayView;