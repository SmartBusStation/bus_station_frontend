// src/components/dashboard/calendar/ElegantTripDetailModal.tsx
import React from 'react';
import { X, Edit, XCircle, Trash2, Calendar, Clock, MapPin, Users, DollarSign, Car, Route, Info } from 'lucide-react';
import TransparentModal from '@/modals/TransparentModal';
import { formatDateOnly, formatDateToTime } from '@/lib/services/date-services';
import { TripDetails } from "@/lib/types/models/Trip";

interface ElegantTripDetailModalProps {
    isOpen: boolean;
    trip: TripDetails | null;
    onClose: () => void;
    onEdit: (id: string) => void;
    onCancel: (id: string) => void;
    onDelete: (id: string) => void;
}

const InfoSection: React.FC<{
    icon: React.ElementType;
    title: string;
    children: React.ReactNode
}> = ({ icon: Icon, title, children }) => (
    <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {children}
    </div>
);

const DetailRow: React.FC<{
    icon: React.ElementType;
    label: string;
    value: React.ReactNode;
    highlight?: boolean;
}> = ({ icon: Icon, label, value, highlight = false }) => (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
        <Icon className={`h-5 w-5 ${highlight ? 'text-primary' : 'text-gray-400'} flex-shrink-0`} />
        <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <div className={`font-semibold ${highlight ? 'text-primary' : 'text-gray-900'}`}>
                {value}
            </div>
        </div>
    </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getStatusConfig = (status: string) => {
        const configs = {
            PUBLIE: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Publié', dot: 'bg-primary' },
            EN_COURS: { color: 'bg-green-50 text-green-700 border-green-200', label: 'En cours', dot: 'bg-green-500' },
            EN_ATTENTE: { color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'En attente', dot: 'bg-amber-500' },
            TERMINE: { color: 'bg-gray-50 text-gray-700 border-gray-200', label: 'Terminé', dot: 'bg-gray-500' },
            ANNULE: { color: 'bg-red-50 text-red-700 border-red-200', label: 'Annulé', dot: 'bg-red-500' },
        };
        return configs[status as keyof typeof configs] || configs.EN_ATTENTE;
    };

    const config = getStatusConfig(status);

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${config.color}`}>
            <div className={`w-2 h-2 rounded-full ${config.dot}`} />
            {config.label}
        </div>
    );
};

export const ElegantTripDetailModal: React.FC<ElegantTripDetailModalProps> = ({
                                                                                  isOpen,
                                                                                  trip,
                                                                                  onClose,
                                                                                  onEdit,
                                                                                  onCancel,
                                                                                  onDelete
                                                                              }) => {
    if (!isOpen || !trip) return null;

    const isActionable = trip.statusVoyage !== 'TERMINE' && trip.statusVoyage !== 'ANNULE';
    const occupancyRate = trip.nbrPlaceReservable > 0
        ? ((trip.nbrPlaceReservable - trip.nbrPlaceRestante) / trip.nbrPlaceReservable) * 100
        : 0;

    const reservedSeats = trip.nbrPlaceReservable - trip.nbrPlaceRestante;
    const totalRevenue = (trip.prix || 0) * reservedSeats;

    return (
        <TransparentModal isOpen={isOpen}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* En-tête élégant */}
                <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white p-8">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

                    <div className="relative flex justify-between items-start">
                        <div className="flex-1 pr-4">
                            <h2 className="text-3xl font-bold mb-3">{trip.titre}</h2>
                            <div className="flex items-center gap-6 text-primary-100">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <span className="font-medium">{formatDateOnly(trip.dateDepartPrev || '')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    <span className="font-medium">{formatDateToTime(trip.dateDepartPrev || '')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <StatusBadge status={trip.statusVoyage!} />
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Informations du voyage */}
                        <InfoSection icon={Route} title="Détails du voyage">
                            <div className="space-y-0">
                                <DetailRow
                                    icon={MapPin}
                                    label="Trajet"
                                    value={`${trip.lieuDepart} → ${trip.lieuArrive}`}
                                    highlight={true}
                                />
                                <DetailRow
                                    icon={Calendar}
                                    label="Date de départ"
                                    value={formatDateOnly(trip.dateDepartPrev || '')}
                                />
                                <DetailRow
                                    icon={Clock}
                                    label="Heure de départ"
                                    value={formatDateToTime(trip.dateDepartPrev || '')}
                                />
                            </div>
                        </InfoSection>

                        {/* Réservations et revenus */}
                        <InfoSection icon={Users} title="Réservations & Revenus">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                                        <p className="text-2xl font-bold text-primary">{reservedSeats}</p>
                                        <p className="text-sm text-gray-500">Réservées</p>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                                        <p className="text-2xl font-bold text-green-600">{trip.nbrPlaceRestante}</p>
                                        <p className="text-sm text-gray-500">Disponibles</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Taux d'occupation</span>
                                        <span className="font-semibold">{occupancyRate.toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-700 relative overflow-hidden"
                                            style={{ width: `${occupancyRate}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Prix unitaire</span>
                                        <span className="font-bold text-lg">{trip.prix?.toLocaleString()} FCFA</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-gray-600">Revenus actuels</span>
                                        <span className="font-bold text-xl text-primary">{totalRevenue.toLocaleString()} FCFA</span>
                                    </div>
                                </div>
                            </div>
                        </InfoSection>

                        {/* Informations véhicule */}
                        {trip.vehicule && (
                            <InfoSection icon={Car} title="Véhicule assigné">
                                <div className="space-y-0">
                                    <DetailRow
                                        icon={Car}
                                        label="Nom du véhicule"
                                        value={trip.vehicule.nom}
                                    />
                                    <DetailRow
                                        icon={Info}
                                        label="Plaque d'immatriculation"
                                        value={trip.vehicule.plaqueMatricule}
                                    />
                                </div>
                            </InfoSection>
                        )}

                        {/* Statistiques supplémentaires */}
                        <InfoSection icon={DollarSign} title="Analyse financière">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                                        <span className="text-gray-600">Revenus potentiels max</span>
                                        <span className="font-bold text-green-600">
                      {((trip.prix || 0) * trip.nbrPlaceReservable).toLocaleString()} FCFA
                    </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                                        <span className="text-gray-600">Manque à gagner</span>
                                        <span className="font-bold text-amber-600">
                      {((trip.prix || 0) * trip.nbrPlaceRestante).toLocaleString()} FCFA
                    </span>
                                    </div>
                                </div>
                            </div>
                        </InfoSection>
                    </div>
                </div>

                {/* Actions */}
                {isActionable && (
                    <div className="border-t border-gray-200 bg-gray-50/50 p-6">
                        <div className="flex flex-wrap justify-end gap-3">
                            <button
                                onClick={() => onEdit(trip.idVoyage!)}
                                className="flex items-center gap-2 text-sm bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                            >
                                <Edit className="h-4 w-4" />
                                Modifier
                            </button>
                            <button
                                onClick={() => onCancel(trip.idVoyage!)}
                                className="flex items-center gap-2 text-sm bg-amber-500/90 text-white px-6 py-3 rounded-xl hover:bg-amber-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                            >
                                <XCircle className="h-4 w-4" />
                                Annuler
                            </button>
                            <button
                                onClick={() => onDelete(trip.idVoyage!)}
                                className="flex items-center gap-2 text-sm bg-red-500/90 text-white px-6 py-3 rounded-xl hover:bg-red-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                            >
                                <Trash2 className="h-4 w-4" />
                                Supprimer
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </TransparentModal>
    );
};