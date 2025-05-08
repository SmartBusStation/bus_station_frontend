// app/agencies/page.tsx
"use client";

import { useState } from "react";
import { travelAgencies, trips } from "@/lib/data/travelAgencies";
import AgencySidebar from "@/components/AgenciesPageComponents/AgencySidebar";
import AgencyProfile from "@/components/AgenciesPageComponents/AgencyProfile";
import EmptyAgencyView from "@/components/AgenciesPageComponents/EmptyAgencyView";
import AgenciesHeader from "@/components/AgenciesPageComponents/AgenciesHeader";
//import { useTranslation } from "react-i18next";

export default function AgenciesPage() {
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);
  const [searchTerm, setSearchChange] = useState("");
  //  const { t } = useTranslation();

  const filteredAgencies = travelAgencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedAgency = travelAgencies.find(
    (agency) => agency.id === selectedAgencyId
  );
  const agencyTrips = selectedAgencyId
    ? trips.filter((trip) => trip.agencyId === selectedAgencyId)
    : [];

  return (
    <>
      {/* Sidebar (pleine hauteur) */}
      <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <AgencySidebar
          agencies={filteredAgencies}
          searchTerm={searchTerm}
          onSearchChange={setSearchChange}
          onSelectAgency={setSelectedAgencyId}
          selectedAgencyId={selectedAgencyId}
        />
      </div>

      {/* Contenu principal avec header */}
      <div className="flex-1 flex flex-col min-h-[calc(100vh+4rem)]">
        <AgenciesHeader />
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          {selectedAgency ? (
            <AgencyProfile
              agency={selectedAgency}
              trips={agencyTrips}
              onBack={() => setSelectedAgencyId(null)}
            />
          ) : (
            <EmptyAgencyView />
          )}
        </main>
      </div>
    </>
  );
}
