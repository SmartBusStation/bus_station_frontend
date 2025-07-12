import React from 'react';
import { X, Edit, XCircle, Trash2, Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import TransparentModal from '@/modals/TransparentModal';
import { formatDateOnly, formatDateToTime } from '@/lib/services/date-services';
import {TripDetails} from "@/lib/types/models/Trip";

interface TripDetailModalProps {
    isOpen: boolean;
    trip: TripDetails | null;
    onClose: () => void;
    onEdit: (id: string) => void;
    onCancel: (id: string) => void;
    onDelete: (id: string) => void;
}

const DetailItem: React.FC<{ icon: React.ElementType, label: string, value: React.ReactNode }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
    <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
    </div>
    </div>
);

export const TripDetailModal: React.FC<TripDetailModalProps> = ({ isOpen, trip, onClose, onEdit, onCancel, onDelete }) => {
    if (!isOpen || !trip) return null;

    const isActionable = trip.statusVoyage !== 'TERMINE' && trip.statusVoyage !== 'ANNULE';

    return (
        <TransparentModal isOpen={isOpen}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
    <div className="p-6 border-b flex justify-between items-center">
    <h2 className="text-xl font-bold text-gray-900">{trip.titre}</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X className="h-5 w-5"/></button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <DetailItem icon={MapPin} label="Trajet" value={`${trip.lieuDepart} → ${trip.lieuArrive}`} />
    <DetailItem icon={Calendar} label="Date de départ" value={formatDateOnly(trip.dateDepartPrev || '')} />
    <DetailItem icon={Clock} label="Heure de départ" value={formatDateToTime(trip.dateDepartPrev || '')} />
    <DetailItem icon={Users} label="Places" value={`${trip.nbrPlaceReservable - trip.nbrPlaceRestante || 0} / ${trip.nbrPlaceReservable}`} />
    <DetailItem icon={DollarSign} label="Prix" value={`${trip.prix?.toLocaleString()} FCFA`} />
    <DetailItem icon={MapPin} label="Véhicule" value={`${trip.vehicule?.nom} (${trip.vehicule?.plaqueMatricule})`} />
    </div>
    </div>

    {isActionable && (
        <div className="p-4 bg-gray-50 border-t flex flex-wrap justify-end gap-3">
        <button onClick={() => onEdit(trip.idVoyage!)} className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
    <Edit className="h-4 w-4"/> Modifier
        </button>
        <button onClick={() => onCancel(trip.idVoyage!)} className="flex items-center gap-2 text-sm bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
    <XCircle className="h-4 w-4"/> Annuler le voyage
    </button>
    <button onClick={() => onDelete(trip.idVoyage!)} className="flex items-center gap-2 text-sm bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
    <Trash2 className="h-4 w-4"/> Supprimer
        </button>
        </div>
    )}
    </div>
    </TransparentModal>
);
};