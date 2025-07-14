// src/components/dashboard/calendar/DayDetailView.tsx
"use client";

import React from 'react';
import { ArrowLeft, Plus, Clock, MapPin, Users, DollarSign, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent } from '@/lib/types/calendar';

interface DayDetailViewProps {
    date: Date;
    events: CalendarEvent[];
    onEventSelect: (event: CalendarEvent) => void;
    onCreateEvent: (date: Date) => void;
    onBack: () => void;
    getStatusColor: (status: string) => string;
}

const DayDetailView: React.FC<DayDetailViewProps> = ({
                                                         date,
                                                         events,
                                                         onEventSelect,
                                                         onCreateEvent,
                                                         onBack,
                                                         getStatusColor
                                                     }) => {
    const EventCard: React.FC<{ event: CalendarEvent; index: number }> = ({ event, index }) => (
        <div
            onClick={() => onEventSelect(event)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-primary/50"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
              {format(event.start, 'HH:mm', { locale: fr })}
                            {event.end && event.start.getTime() !== event.end.getTime() &&
                                ` - ${format(event.end, 'HH:mm', { locale: fr })}`
                            }
            </span>
                    </div>
                </div>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
          {event.status.replace('_', ' ')}
        </span>
            </div>

            <div className="space-y-2">
                {event.description && (
                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{event.description}</span>
                    </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    {event.price && (
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{event.price.toLocaleString()} FCFA</span>
                        </div>
                    )}

                    {event.totalSeats && (
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>
                {(event.totalSeats - (event.availableSeats || 0))} / {event.totalSeats} places
              </span>
                            {event.availableSeats && event.availableSeats > 0 && (
                                <span className="text-green-600 font-medium">
                  ({event.availableSeats} disponibles)
                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Indicateur de progression pour les places */}
            {event.totalSeats && (
                <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Réservations</span>
                        <span>{Math.round(((event.totalSeats - (event.availableSeats || 0)) / event.totalSeats) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-primary rounded-full h-2 transition-all duration-300"
                            style={{
                                width: `${((event.totalSeats - (event.availableSeats || 0)) / event.totalSeats) * 100}%`
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );

    const EmptyState = () => (
        <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun voyage programmé
            </h3>
            <p className="text-gray-500 mb-6">
                Commencez par créer un nouveau voyage pour cette date.
            </p>
            <button
                onClick={() => onCreateEvent(date)}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
                <Plus className="h-5 w-5" />
                Créer un voyage
            </button>
        </div>
    );

    return (
        <div className="bg-white">
            {/* En-tête */}
            <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Retour au calendrier"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {format(date, 'EEEE dd MMMM yyyy', { locale: fr })}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {events.length} voyage{events.length > 1 ? 's' : ''} programmé{events.length > 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => onCreateEvent(date)}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Nouveau voyage
                    </button>
                </div>
            </div>

            {/* Contenu */}
            <div className="p-6">
                {events.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-4">
                        {events
                            .sort((a, b) => a.start.getTime() - b.start.getTime())
                            .map((event, index) => (
                                <EventCard key={event.id} event={event} index={index} />
                            ))}
                    </div>
                )}
            </div>

            {/* Statistiques rapides */}
            {events.length > 0 && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Statistiques du jour</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{events.length}</p>
                            <p className="text-xs text-gray-500">Voyages</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {events.reduce((sum, e) => sum + (e.totalSeats || 0), 0)}
                            </p>
                            <p className="text-xs text-gray-500">Places totales</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-amber-600">
                                {events.reduce((sum, e) => sum + (e.availableSeats || 0), 0)}
                            </p>
                            <p className="text-xs text-gray-500">Places disponibles</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                                {events.reduce((sum, e) => sum + (e.price || 0), 0).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">Revenus potentiels</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DayDetailView;