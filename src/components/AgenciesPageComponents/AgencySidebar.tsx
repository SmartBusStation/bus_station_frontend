// components/AgenciesPageComponents/AgencySidebar.tsx
"use client";

import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { AgencySidebarProps } from "@/lib/type";

export default function AgencySidebar({
  agencies,
  searchTerm,
  onSearchChange,
  onSelectAgency,
  selectedAgencyId,
}: AgencySidebarProps) {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6 text-primary">
        {t("agenciesPage.sidebar.title")}
      </h2>

      {/* Barre de recherche */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary"
          placeholder={t("agenciesPage.sidebar.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Liste des agences */}
      <div className="flex-1 overflow-y-auto">
        {agencies.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            {t("agenciesPage.sidebar.noResults")}
          </p>
        ) : (
          <ul className="space-y-2">
            {agencies.map((agency) => (
              <li key={agency.id}>
                <button
                  onClick={() => onSelectAgency(agency.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-colors ${
                    selectedAgencyId === agency.id
                      ? "bg-blue-100 border border-primary"
                      : "hover:bg-gray-100"
                  }`}>
                  <Image
                    src={agency.logo}
                    alt={agency.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover mr-3 border border-gray-200"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{agency.name}</h3>
                    <p className="text-sm text-gray-500">{agency.location}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 text-xs">
                        ★ {agency.rating}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
