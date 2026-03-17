"use client";

import React, { useMemo } from "react";
// Correction 1 : useBusStationManager au lieu de logique dupliquée
import { useBusStationManager } from "@/lib/hooks/useBusStationManager";
import StationDetails from "@/components/bus-station-dashboard/StationDetails";
import DetailedAffiliatedAgenciesList from "@/components/bus-station-dashboard/affiliated-agencies/DetailedAffiliatedAgenciesList";
import TripsChart from "@/components/bus-station-dashboard/TripsChart";
import Loader from "@/modals/Loader";
import { AlertCircle, RefreshCw, Building2, Bus, Wallet, MapPin } from "lucide-react";

//Correction 3 : StatCard typé proprement
interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: { bg: string; text: string };
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color.bg}`}>
            <Icon className={`h-6 w-6 ${color.text}`} />
        </div>
    </div>
);

const BusStationDashboardPage = () => {
    // Correction 1 : toute la logique centralisée dans useBusStationManager
    const { station, agencies, tripsByDate, loading, error } = useBusStationManager();

    const stats = useMemo(() => {
        return {
            totalAgencies: agencies?.length || 0,
            activeAgencies: agencies?.filter((a) => a.taxStatus === "payé").length || 0,
            totalTrips: tripsByDate?.reduce((acc, curr) => acc + curr.count, 0) || 0,
            pendingTaxes: agencies?.filter((a) => a.taxStatus === "en retard").length || 0,
        };
    }, [agencies, tripsByDate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)]">
                <Loader message="Chargement de votre espace..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] p-4">
                <div className="p-8 text-center text-red-600 bg-red-50 rounded-2xl border border-red-100 max-w-md w-full shadow-lg">
                    <AlertCircle className="mx-auto h-16 w-16 text-red-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Oups !</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                    >
                        <RefreshCw className="h-4 w-4" /> Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* SECTION 1 : KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Agences Affiliées"
                    value={stats.totalAgencies}
                    icon={Building2}
                    color={{ bg: "bg-blue-100", text: "text-blue-600" }}
                />
                <StatCard
                    title="Voyages Programmés"
                    value={stats.totalTrips}
                    icon={Bus}
                    color={{ bg: "bg-purple-100", text: "text-purple-600" }}
                />
                <StatCard
                    title="Taxes en Retard"
                    value={stats.pendingTaxes}
                    icon={Wallet}
                    color={{ bg: "bg-red-100", text: "text-red-600" }}
                />
                <StatCard
                    title="Taux d'occupation"
                    value="-- %" // TODO: connecter quand endpoint disponible
                    icon={MapPin}
                    color={{ bg: "bg-green-100", text: "text-green-600" }}
                />
            </div>

            {/* SECTION 2 : Détails de la gare */}
            {station && (
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <StationDetails station={station} />
                </div>
            )}

            {/* SECTION 3 : Liste des Agences */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Agences Affiliées</h2>
                    <p className="text-sm text-gray-500">
                        Liste des compagnies opérant dans votre gare
                    </p>
                </div>
                {agencies && agencies.length > 0 ? (
                    <DetailedAffiliatedAgenciesList agencies={agencies} />
                ) : (
                    <div className="p-10 text-center text-gray-400 bg-gray-50/50">
                        <Building2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p>Aucune agence affiliée pour le moment.</p>
                    </div>
                )}
            </div>

            {/* SECTION 4 : Graphique */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Analyse des Voyages</h2>
                </div>
                {tripsByDate && tripsByDate.length > 0 ? (
                    <TripsChart data={tripsByDate} />
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <Bus className="h-12 w-12 mb-3 opacity-20" />
                        <p>Pas assez de données pour afficher le graphique.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusStationDashboardPage;