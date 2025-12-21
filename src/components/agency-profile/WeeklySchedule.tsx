// src/components/agency-profile/WeeklySchedule.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { PlannerTrip } from '@/lib/types/models/Trip';
import { Calendar, Clock, MapPin, Lightbulb } from 'lucide-react';

interface WeeklyScheduleProps {
  agencyId: string;
}

// Updated color map to simplify and meet new legend requirements
const categoryColors: { [key: string]: { bg: string; text: string; border: string } } = {
  'VIP': { bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-700' },
  'Classic': { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-700' },
  'Premium': { bg: 'bg-yellow-500', text: 'text-white', border: 'border-yellow-700' },
  'Nocturne': { bg: 'bg-indigo-800', text: 'text-white', border: 'border-indigo-900' },
};

const getCategoryColor = (category: string) => {
  return categoryColors[category] || { bg: 'bg-gray-400', text: 'text-white', border: 'border-gray-600' };
};

export default function WeeklySchedule({ agencyId }: WeeklyScheduleProps) {
  const [trips, setTrips] = useState<PlannerTrip[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}h`);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('http://localhost:3001/trips');
        if (!response.ok) throw new Error('Failed to fetch trips');
        const allTrips: PlannerTrip[] = await response.json();
        const agencyTrips = allTrips.filter(trip => String(trip.agencyId) === agencyId);
        setTrips(agencyTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };
    fetchTrips();
  }, [agencyId]);
  
  const allCategories = useMemo(() => [...new Set(trips.map(trip => trip.category))], [trips]);

  const handleFilterToggle = (category: string) => {
    setActiveFilters(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredTrips = activeFilters.length > 0 ? trips.filter(trip => activeFilters.includes(trip.category)) : trips;

  const timeToMinutes = (time: string): number => {
    if (!time) return 0;
    const [h, m] = time.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  
  const dailySchedules = useMemo(() => daysOfWeek.map((_, dayIndex) => {
    const dayTrips = filteredTrips
      .filter(trip => trip.dayOfWeek === dayIndex + 1)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    const lanes: PlannerTrip[][] = [];
    dayTrips.forEach(trip => {
      let placed = false;
      for (const lane of lanes) {
        const lastTrip = lane[lane.length - 1];
        if (timeToMinutes(trip.startTime) >= timeToMinutes(lastTrip.endTime)) {
          lane.push(trip);
          placed = true;
          break;
        }
      }
      if (!placed) lanes.push([trip]);
    });
    return lanes;
  }), [filteredTrips, daysOfWeek]);

  const maxOverlapsPerDay = useMemo(() => dailySchedules.map(lanes => lanes.length), [dailySchedules]);

  const totalMinutesInDay = 24 * 60;
  const tripHeightRem = 2.5;
  const tripGapRem = 0.25;

  return (
    <div className="bg-white shadow-xl rounded-2xl w-full mx-auto my-8 font-sans">
      
      <div className="bg-gray-800 text-white p-4 rounded-t-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6" />
          <div>
            <h2 className="text-xl font-bold">Planning Hebdomadaire</h2>
            <p className="text-sm text-gray-300">Aperçu des voyages de la semaine</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
            {allCategories.map(cat => {
                const colors = getCategoryColor(cat);
                const isActive = activeFilters.includes(cat);
                return (
                    <button 
                        key={cat} 
                        onClick={() => handleFilterToggle(cat)}
                        className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 text-white ${colors.bg} ${isActive ? 'border-2 border-white' : 'border-2 border-transparent hover:border-gray-300'}`}
                    >
                        {cat}
                    </button>
                )
            })}
        </div>
      </div>

      <div className="p-4 md:hidden">
        {daysOfWeek.map((day, dayIndex) => {
          const dayHasTrips = dailySchedules[dayIndex] && dailySchedules[dayIndex].flat().length > 0;
          if (!dayHasTrips) return null;

          return (
            <div key={day} className="mb-4">
              <h3 className="font-bold text-lg text-gray-700 border-b-2 border-gray-200 pb-1 mb-2">{day}</h3>
              <div className="space-y-2">
                {dailySchedules[dayIndex].flat().map(trip => (
                  <div key={trip.id} className={`p-2 rounded-lg border-l-4 ${getCategoryColor(trip.category).bg} ${getCategoryColor(trip.category).border} text-white`}>
                    <div className="font-bold flex items-center gap-1.5"><MapPin className="w-4 h-4" /><span className="truncate">{trip.title}</span></div>
                    <div className="text-sm flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>{`${trip.startTime} - ${trip.endTime}`}</span></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:block p-4 overflow-x-auto">
        <div className="relative" style={{ minWidth: `${hours.length * 3.5}rem` }}>
          <div className="flex h-10 items-center">
            <div className="w-28 flex-shrink-0" />
            {hours.map(hour => (
              <div key={hour} className="w-14 text-center text-xs text-gray-500 flex-shrink-0">{hour}</div>
            ))}
          </div>
          <div className="relative">
            {daysOfWeek.map((day, dayIndex) => {
              const rowHeight = maxOverlapsPerDay[dayIndex] > 0 ? maxOverlapsPerDay[dayIndex] * (tripHeightRem + tripGapRem) + tripGapRem : 4;
              return (
                <div key={day} className="flex items-start border-t border-gray-200" style={{ minHeight: `${rowHeight}rem` }}>
                  <div className="w-28 flex-shrink-0 pr-4 text-right font-bold text-gray-600 pt-3 text-sm">{day}</div>
                  <div className="relative w-full h-full">
                    {hours.slice(0, -1).map((_, hourIndex) => (
                        <div key={`line-${hourIndex}`} className="absolute h-full border-l border-gray-200/70" style={{ left: `${((hourIndex + 1) / hours.length) * 100}%`, top: 0 }} />
                    ))}
                    {dailySchedules[dayIndex] && dailySchedules[dayIndex].map((lane, laneIndex) => (
                      <React.Fragment key={laneIndex}>
                        {lane.map(trip => {
                          const startPercent = (timeToMinutes(trip.startTime) / totalMinutesInDay) * 100;
                          const widthPercent = ((timeToMinutes(trip.endTime) - timeToMinutes(trip.startTime)) / totalMinutesInDay) * 100;
                          return (
                            <div
                              key={trip.id}
                              className={`absolute my-1 rounded-md px-2 py-1 text-white text-xs overflow-hidden cursor-pointer shadow-md border-l-4 ${getCategoryColor(trip.category).bg} ${getCategoryColor(trip.category).border} opacity-90 hover:opacity-100 transition-all duration-200`}
                              style={{
                                left: `${startPercent}%`,
                                width: `${widthPercent}%`,
                                top: `${laneIndex * (tripHeightRem + tripGapRem)}rem`,
                                height: `${tripHeightRem}rem`,
                              }}
                              title={`${trip.title}\n${trip.startTime} - ${trip.endTime}`}
                            >
                              <div className="font-bold flex items-center gap-1.5"><MapPin className="w-3 h-3" /><span className="truncate">{trip.title}</span></div>
                              <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /><span className="truncate">{`${trip.startTime} - ${trip.endTime}`}</span></div>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 p-3 rounded-b-2xl flex justify-between items-center text-sm">
          <div className="font-medium text-gray-700">{filteredTrips.length} voyages planifiés</div>
          <div className="hidden sm:flex items-center gap-2 text-gray-500">
              <Lightbulb className="w-4 h-4 text-yellow-500"/>
              <span className="italic">Astuce: Glissez un voyage pour le déplacer</span>
          </div>
      </div>
    </div>
  );
}