// src/components/agencies-page-components/weekly-schedule/WeeklyScheduleHeader.tsx
"use client";

import { Calendar } from 'lucide-react';

interface WeeklyScheduleHeaderProps {
  allCategories: string[];
  activeFilters: string[];
  onFilterToggle: (category: string) => void;
}

const categoryColors: { [key: string]: string } = {
  'VIP': 'bg-purple-500',
  'Classic': 'bg-blue-500',
  'Premium': 'bg-yellow-500',
  'Nocturne': 'bg-indigo-800',
};

const getCategoryColor = (category: string): string => {
  return categoryColors[category] || 'bg-gray-400';
};

export default function WeeklyScheduleHeader({ allCategories, activeFilters, onFilterToggle }: WeeklyScheduleHeaderProps) {
  return (
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
          const isActive = activeFilters.includes(cat);
          const bgColor = getCategoryColor(cat);
          return (
            <button
              key={cat}
              onClick={() => onFilterToggle(cat)}
              className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 text-white ${bgColor} ${isActive ? 'border-2 border-white' : 'border-2 border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'}`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  );
}
