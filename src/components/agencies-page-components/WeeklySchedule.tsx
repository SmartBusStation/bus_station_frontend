// src/components/agencies-page-components/WeeklySchedule.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { usePlannerTrips } from '@/lib/hooks/agency-public-hooks/usePlannerTrips';
import WeeklyScheduleHeader from './weekly-schedule/WeeklyScheduleHeader';
import WeeklyScheduleTimeline from './weekly-schedule/WeeklyScheduleTimeline';
import WeeklyScheduleList from './weekly-schedule/WeeklyScheduleList';
import WeeklyScheduleFooter from './weekly-schedule/WeeklyScheduleFooter';
import { PlannerTrip } from '@/lib/types/models/Trip';
import Loader from '@/modals/Loader';

interface WeeklyScheduleProps {
  agencyId: string;
}

const timeToMinutes = (time: string): number => {
  if (!time) return 0;
  const [h, m] = time.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

export default function WeeklySchedule({ agencyId }: WeeklyScheduleProps) {
  const { trips, isLoading, error } = usePlannerTrips(agencyId);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const daysOfWeek = useMemo(() => ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'], []);
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}h`), []);
  const allCategories = useMemo(() => [...new Set(trips.map(trip => trip.category))], [trips]);

  const handleFilterToggle = (category: string) => {
    setActiveFilters(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredTrips = useMemo(() => 
    activeFilters.length > 0 ? trips.filter(trip => activeFilters.includes(trip.category)) : trips,
    [trips, activeFilters]
  );

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

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader message="Chargement du planning..." />
        </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Erreur: {error}</div>;
  }
  
  if (trips.length === 0) {
      return (
          <div className="bg-white shadow-xl rounded-2xl w-full mx-auto my-8 p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-700">Aucun planning de voyage disponible</h3>
              <p className="text-gray-500">Cette agence n'a pas encore de planning hebdomadaire.</p>
          </div>
      )
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl w-full mx-auto my-8 font-sans">
      <WeeklyScheduleHeader 
        allCategories={allCategories}
        activeFilters={activeFilters}
        onFilterToggle={handleFilterToggle}
      />
      
      <WeeklyScheduleList 
        daysOfWeek={daysOfWeek}
        dailySchedules={dailySchedules}
      />
      
      <WeeklyScheduleTimeline 
        daysOfWeek={daysOfWeek}
        hours={hours}
        dailySchedules={dailySchedules}
        maxOverlapsPerDay={maxOverlapsPerDay}
      />
      
      <WeeklyScheduleFooter 
        tripCount={filteredTrips.length}
      />
    </div>
  );
}
