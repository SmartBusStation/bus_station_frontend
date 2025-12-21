"use client";

import React from 'react';
import { PlannerTrip } from '@/lib/types/models/Trip';
import { Clock, MapPin } from 'lucide-react';

interface WeeklyScheduleTimelineProps {
  daysOfWeek: string[];
  hours: string[];
  dailySchedules: PlannerTrip[][][];
  maxOverlapsPerDay: number[];
}

const categoryColors: { [key: string]: { bg: string; border: string } } = {
  'VIP': { bg: 'bg-purple-500', border: 'border-purple-700' },
  'Classic': { bg: 'bg-blue-500', border: 'border-blue-700' },
  'Premium': { bg: 'bg-yellow-500', border: 'border-yellow-700' },
  'Nocturne': { bg: 'bg-indigo-800', border: 'border-indigo-900' },
};

const getCategoryColor = (category: string) => {
  return categoryColors[category] || { bg: 'bg-gray-400', border: 'border-gray-600' };
};

const timeToMinutes = (time: string): number => {
  if (!time) return 0;
  const [h, m] = time.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

const totalMinutesInDay = 24 * 60;
const tripHeightRem = 2.5;
const tripGapRem = 0.25;

export default function WeeklyScheduleTimeline({ daysOfWeek, hours, dailySchedules, maxOverlapsPerDay }: WeeklyScheduleTimelineProps) {
  return (
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
                        const colors = getCategoryColor(trip.category);
                        const startPercent = (timeToMinutes(trip.startTime) / totalMinutesInDay) * 100;
                        const widthPercent = ((timeToMinutes(trip.endTime) - timeToMinutes(trip.startTime)) / totalMinutesInDay) * 100;
                        return (
                          <div
                            key={trip.id}
                            className={`absolute my-1 rounded-md px-2 py-1 text-white text-xs overflow-hidden cursor-pointer shadow-md border-l-4 ${colors.bg} ${colors.border} opacity-90 hover:opacity-100 transition-all duration-200`}
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
  );
}
