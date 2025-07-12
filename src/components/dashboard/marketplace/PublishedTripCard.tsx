import React from "react";
import { MapPin, Calendar, Users, DollarSign, XCircle, Edit } from "lucide-react";
import { formatDateOnly } from "@/lib/services/date-services";
import {TripDetails} from "@/lib/types/models/Trip";

interface PublishedTripCardProps {
  trip: TripDetails;
  onCancel: (tripId: string) => void;
  onEdit: (tripId: string) => void;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {

  const statusInfo = {
    PUBLIE: { text: "Publié", color: "bg-blue-100 text-blue-700" },
    EN_COURS: { text: "En cours", color: "bg-green-100 text-green-700" },
    TERMINE: { text: "Terminé", color: "bg-gray-100 text-gray-700" },
    ANNULE: { text: "Annulé", color: "bg-red-100 text-red-700" },
  }[status || ''] || { text: "Inconnu", color: "bg-yellow-100 text-yellow-700" };

  return (
      <div className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </div>
  );
};

const PublishedTripCard: React.FC<PublishedTripCardProps> = ({ trip, onCancel, onEdit }) => {
  const reservationPercentage =
      trip.nbrPlaceReservable && trip.nbrPlaceReservable > 0
          ? ((trip.nbrPlaceReservable - trip.nbrPlaceRestante || 0) / trip.nbrPlaceReservable) * 100
          : 0;

  const estimatedRevenue = (trip.nbrPlaceReservable - trip.nbrPlaceRestante || 0) * (trip.prix || 0);

  return (
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 pr-2">{trip.titre}</h3>
          <StatusBadge status={trip.statusVoyage} />
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-400" /> {trip.lieuDepart} → {trip.lieuArrive}</p>
          <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-400" /> {formatDateOnly(trip.dateDepartPrev || '')}</p>
        </div>

        <div className="mt-auto">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700 flex items-center gap-1"><Users className="h-4 w-4" /> Réservations</span>
              <span>{trip.nbrPlaceReservable - trip.nbrPlaceRestante || 0} / {trip.nbrPlaceReservable}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${reservationPercentage}%` }}></div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="font-medium text-gray-700">Revenu Actuel:</span>
                <span className="font-semibold text-green-600">{estimatedRevenue.toLocaleString()} FCFA</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => trip.idVoyage && onEdit(trip.idVoyage)} className="p-1.5 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-md"><Edit className="h-4 w-4" /></button>
                {trip.statusVoyage !== 'ANNULE' && trip.statusVoyage !== 'TERMINE' && (
                    <button onClick={() => trip.idVoyage && onCancel(trip.idVoyage)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"><XCircle className="h-4 w-4" /></button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PublishedTripCard;