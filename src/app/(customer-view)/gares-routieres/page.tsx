'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_GARES } from '@/lib/data/gares-routieres';
import HeroSection from '@/components/bus-stations-page-components/HeroSection';
import SearchBar from '@/components/bus-stations-page-components/SearchBar';
import FilterBadges from '@/components/bus-stations-page-components/FilterBadges';
import StationCard from '@/components/bus-stations-page-components/StationCard';

// Extraire tous les services uniques disponibles à partir des données
const ALL_SERVICES = Array.from(new Set(MOCK_GARES.flatMap(gare => gare.services)));

const GaresRoutieresPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const filteredGares = useMemo(() => {
    return MOCK_GARES.filter(gare => {
      const matchesQuery =
        gare.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gare.ville.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesServices = selectedServices.every(service =>
        gare.services.includes(service)
      );

      return matchesQuery && matchesServices;
    });
  }, [searchQuery, selectedServices]);

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <div className="mt-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <SearchBar 
                onSearchChange={setSearchQuery}
                placeholder="Chercher par nom de gare ou par ville..."
            />
        </div>
        
        <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Filtrer par services :</h2>
            <FilterBadges
                services={ALL_SERVICES}
                selectedServices={selectedServices}
                onServiceToggle={handleServiceToggle}
            />
        </div>
      </div>

      <div className="mt-8">
        {filteredGares.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGares.map(station => (
              <StationCard key={station.id} station={station} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700">Aucune gare ne correspond à votre recherche</h3>
            <p className="text-gray-500 mt-2">Essayez de modifier vos filtres ou votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GaresRoutieresPage;
