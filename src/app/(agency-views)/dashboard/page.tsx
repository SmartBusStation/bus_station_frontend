"use client";

import React from "react";
import { DollarSign, BookOpen, BarChart3, Users, AlertCircle, RefreshCw, Store } from "lucide-react";
import { useAgency } from "@/lib/contexts/AgencyContext";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import OverviewCharts from "@/components/dashboard/overview/OverviewCharts";
import RecentBookings from "@/components/dashboard/overview/RecentBookings";
import { useDashboardOverview } from "@/lib/hooks/dasboard/useDashboardOverview";
import Loader from "@/modals/Loader";
import { StatCardData } from "@/lib/types/dashboard";

const DashboardOverviewPage = () => {
  const { selectedAgency } = useAgency();
  const { isLoading, apiError, generalStats, evolutionData, recentBookings } = useDashboardOverview();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  if (!selectedAgency && !isLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
          <Store className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Bienvenue sur votre tableau de bord</h2>
          <p className="mt-2 text-gray-600">Pour commencer, veuillez sélectionner une agence dans le menu latéral.</p>
        </div>
    );
  }

  if (apiError) {
    return (
        <div className="p-10 text-center text-red-600 bg-red-50 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-lg font-semibold">Erreur de chargement</h3>
          <p className="mt-1 text-sm">{apiError}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2 mx-auto">
            <RefreshCw className="h-4 w-4" /> Réessayer
          </button>
        </div>
    );
  }

  const stats: StatCardData[] = [
    {
      label: "Revenu Total",
      value: `${generalStats?.revenus?.toLocaleString() || 0} FCFA`,
      change: "N/A",
      changeType: "increase",
      icon: DollarSign,
    },
    {
      label: "Total Réservations",
      value: String(generalStats?.nombreReservations || 0),
      change: "N/A",
      changeType: "increase",
      icon: BookOpen,
    },
    {
      label: "Voyages Publiés",
      value: String(generalStats?.nombreVoyages || 0),
      change: "N/A",
      changeType: "increase",
      icon: BarChart3,
    },
    {
      label: "Nouveaux Clients",
      value: String(generalStats?.nouveauxUtilisateurs || 0),
      change: "N/A",
      changeType: "increase",
      icon: Users,
    },
  ];

  return (
      <>
        <PageHeader
            title={selectedAgency ? `Aperçu de ${selectedAgency.name}` : "Aperçu du Tableau de Bord"}
            subtitle="Voici un résumé de l'activité de votre agence."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
          {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
          <OverviewCharts data={evolutionData} />
          <RecentBookings bookings={recentBookings} />
        </div>
      </>
  );
};

export default DashboardOverviewPage;