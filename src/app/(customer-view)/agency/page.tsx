// src/app/(customer-view)/agency/page.tsx
"use client";

import { useState } from "react";
import { Search, Globe } from "lucide-react";
import { travelAgencies } from "@/lib/data/travelAgencies";
import AgencyCard from "@/components/agencies-page-components/AgencyCard";

export default function AgenciesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgencies = travelAgencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* En-tête de la page */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Explorez Nos Agences Partenaires
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Découvrez des experts du voyage pour des aventures inoubliables.
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une agence par nom ou par ville..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition"
        />
      </div>

      {/* Grille des agences */}
      {filteredAgencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Aucune agence trouvée
          </h3>
          <p className="text-gray-500 mt-2">
            Essayez de modifier vos termes de recherche.
          </p>
        </div>
      )}
    </div>
  );
}
