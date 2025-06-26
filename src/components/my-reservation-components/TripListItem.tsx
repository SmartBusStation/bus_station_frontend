import React from "react";
import Image from "next/image";
import {
    Calendar,
    Clock,
    Users,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";

interface TripListItemProps {
    trip: any;
    onPayment: () => void;
    onCancel: () => void;
    onViewDetails: () => void;
}

export default function TripListItem({ trip, onPayment, onCancel, onViewDetails }: TripListItemProps) {
    const tripDetails = trip?.voyage;
    const reservation = trip?.reservation;
    const agencyInfo = trip?.agence;

    const needsPayment = reservation?.statutReservation === "RESERVER";
    const remainingAmount = Number.parseInt(reservation?.prixTotal || 0) - Number.parseInt(reservation?.montantPaye || 0);

    const getStatusInfo = (status: string, statutReservation: string) => {
        if (status === "CONFIRMER" && statutReservation === "CONFIRMER") {
            return {
                label: "Paid",
                color: "bg-green-100 text-green-700 border-green-200",
                icon: CheckCircle2
            };
        } else if (status === "CONFIRMER") {
            return {
                label: "Confirmed",
                color: "bg-blue-100 text-blue-700 border-blue-200",
                icon: CheckCircle2
            };
        } else {
            return {
                label: "Pending",
                color: "bg-orange-100 text-orange-700 border-orange-200",
                icon: AlertTriangle
            };
        }
    };

    const getClassColor = (className: string) => {
        const colors = {
            VIP: "from-purple-500 to-pink-500",
            Premium: "from-blue-500 to-purple-500",
            Standard: "from-blue-400 to-blue-500",
            Economy: "from-gray-400 to-gray-500",
        };
        return colors[className as keyof typeof colors] || colors.Standard;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const statusInfo = getStatusInfo(reservation?.status, reservation?.statutReservation);

    return (
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center gap-4">
                {/* Image */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        src={tripDetails?.bigImage || "/placeholder.svg"}
                        alt="Trip"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-semibold text-gray-900 truncate">
                                {tripDetails?.lieuDepart} → {tripDetails?.lieuArrive}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">{agencyInfo?.nom}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                                <statusInfo.icon className="h-3 w-3" />
                                {statusInfo.label}
                            </div>
                            <div className={`bg-gradient-to-r ${getClassColor(tripDetails?.nomClasseVoyage)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                                {tripDetails?.nomClasseVoyage}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(tripDetails?.dateDepartEffectif)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatTime(tripDetails?.heureDepartEffectif)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{reservation?.nbrPassager}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="font-bold text-primary">
                                    {Number.parseInt(reservation?.prixTotal || 0).toLocaleString()} FCFA
                                </div>
                                {needsPayment && (
                                    <div className="text-xs text-orange-600">
                                        {remainingAmount.toLocaleString()} FCFA remaining
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={onViewDetails}
                                    className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    Details
                                </button>
                                {needsPayment && (
                                    <button
                                        onClick={onPayment}
                                        className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                                    >
                                        Pay
                                    </button>
                                )}
                                <button
                                    onClick={onCancel}
                                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}