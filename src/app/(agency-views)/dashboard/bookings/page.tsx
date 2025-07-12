"use client";

import React from "react";
import { Eye, Filter, Search, CheckCircle, Clock, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { useBookingsPage } from "@/lib/hooks/dasboard/useBookingsPage";
import { Reservation, ReservationPreviewDTO } from "@/lib/types/generated-api";
import { formatDateOnly, formatDateToTime } from "@/lib/services/date-services";
import { Pagination, Tooltip } from 'antd';
import Loader from "@/modals/Loader";


const StatusBadge: React.FC<{ status: Reservation['statutReservation'] }> = ({ status }) => {
  const statusInfo = {
    CONFIRMER: { text: "Confirmée", icon: CheckCircle, color: "bg-green-100 text-green-700" },
    RESERVER: { text: "En attente", icon: Clock, color: "bg-yellow-100 text-yellow-700" },
    ANNULER: { text: "Annulée", icon: XCircle, color: "bg-red-100 text-red-700" },
    VALIDER: { text: "Validée", icon: CheckCircle, color: "bg-blue-100 text-blue-700" },
  }[status || 'RESERVER'] || { text: "Inconnu", icon: AlertCircle, color: "bg-gray-100 text-gray-700" };

  return (
      <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusInfo.color}`}>
        <statusInfo.icon className="h-3 w-3" />
        {statusInfo.text}
      </div>
  );
};


const BookingsPage = () => {
  const hook = useBookingsPage();

  if (hook.isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader /></div>;
  }

  if (hook.apiError) {
    return (
        <div className="p-10 text-center text-red-600 bg-red-50 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-lg font-semibold">Erreur de chargement</h3>
          <p className="mt-1 text-sm">{hook.apiError}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2 mx-auto">
            <RefreshCw className="h-4 w-4" /> Réessayer
          </button>
        </div>
    );
  }

  return (
      <>
        <PageHeader
            title="Gestion des Réservations"
            subtitle="Consultez et gérez toutes les réservations de vos clients."
        />

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200 p-4">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                  type="text"
                  placeholder="Chercher par ID ou titre..."
                  value={hook.searchTerm}
                  onChange={(e) => hook.setSearchTerm(e.target.value)}
                  className="w-full rounded-md border-gray-200 pl-9 pr-4 py-2 text-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                  value={hook.statusFilter}
                  onChange={(e) => hook.setStatusFilter(e.target.value)}
                  className="rounded-md border-gray-200 py-2 pl-2 pr-8 text-sm focus:border-primary focus:ring-primary"
              >
                <option value="all">Tous les statuts</option>
                <option value="CONFIRMER">Confirmée</option>
                <option value="RESERVER">En attente</option>
                <option value="ANNULER">Annulée</option>
                <option value="VALIDER">Validée</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Réservation ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Voyage</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Date Rés.</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Passagers</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Montant Total</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Statut</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Action</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
              {hook.filteredBookings.map(({ reservation, voyage }: ReservationPreviewDTO) => (
                  <tr key={reservation?.idReservation} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      <Tooltip title={reservation?.idReservation}>
                        #{reservation?.idReservation?.substring(0, 8)}...
                      </Tooltip>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{voyage?.titre}</td>
                    <td className="px-4 py-3 text-gray-700">{formatDateOnly(reservation?.dateReservation || '')}</td>
                    <td className="px-4 py-3 text-gray-700 text-center">{reservation?.nbrPassager}</td>
                    <td className="px-4 py-3 text-gray-700">{reservation?.prixTotal?.toLocaleString()} FCFA</td>
                    <td className="px-4 py-3"><StatusBadge status={reservation?.statutReservation} /></td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-1 text-primary hover:underline">
                        <Eye className="h-4 w-4" /> Voir
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          {hook.filteredBookings.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                Aucune réservation trouvée pour les filtres actuels.
              </div>
          )}
          <div className="flex justify-center p-4 border-t">
            <Pagination
                current={hook.currentPage}
                total={hook.totalElements}
                pageSize={10}
                onChange={(page) => hook.setCurrentPage(page)}
                showSizeChanger={false}
            />
          </div>
        </div>
      </>
  );
};

export default BookingsPage;