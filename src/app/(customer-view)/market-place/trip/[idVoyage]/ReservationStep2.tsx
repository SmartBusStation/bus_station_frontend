import { ArrowLeft, X } from "lucide-react";
import TravellerInfosForm from "./TravellerInfosForm";
import TicketPreview from "./TicketPreview";
import { useState } from "react";
import { Trip } from "@/lib/types/models/Trip";
import {PassengerFormType, passengersSchema} from "@/lib/types/schema/passengerReservationSchema";


interface ReservationStep2PropsInterface {
    selectedSeats: number[];
    tripDetails: Trip;
    onBack: () => void;
    onClose: () => void;
    setStep: (param: number) => void;
    setPassengers: (param: Record<number, PassengerFormType>) => void;
}

export default function ReservationStep2({
                                             selectedSeats,
                                             tripDetails,
                                             onBack,
                                             onClose,
                                             setStep,
                                             setPassengers
                                         }: ReservationStep2PropsInterface) {

    // État pour stocker les données de tous les passagers
    const [passengersData, setPassengersData] = useState<Record<number, PassengerFormType>>(
        Object.fromEntries(
            selectedSeats.map((seat) => [
                seat,
                {
                    numeroPieceIdentific: "",
                    nom: "",
                    genre: "Male",
                    age: 0,
                    nbrBaggage: 0,
                    placeChoisis: seat
                }
            ])
        )
    );

    // Gestion des erreurs de validation globale
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // Fonction appelée quand les données d'un passager changent
    function handlePassengerDataChange(seatNumber: number, data: PassengerFormType) {
        setPassengersData((prev) => ({
            ...prev,
            [seatNumber]: {
                ...data,
                placeChoisis: seatNumber
            }
        }));
    }

    // Vérification de la validation complète de tous les passagers
    function validateAllPassengers(): boolean {
        const result = passengersSchema.safeParse(passengersData);

        if (!result.success) {
            const errors = result.error.errors.map(err =>
                `Siège ${err.path[0]}: ${err.message}`
            );
            setValidationErrors(errors);
            return false;
        }

        setValidationErrors([]);
        return true;
    }

    // Vérification si tous les passagers ont des données complètes et valides
    function isAllPassengersDataComplete(): boolean {
        return selectedSeats.every((seat) => {
            const data = passengersData[seat];
            return data &&
                data.nom &&
                data.genre &&
                data.age &&
                data.numeroPieceIdentific !== undefined &&
                data.nbrBaggage !== undefined;
        });
    }

    // Gestion du passage à l'étape suivante
    function handleContinue() {
        if (validateAllPassengers()) {
            setStep(3);
            setPassengers(passengersData);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row h-full">
            <div className="w-full lg:w-1/2 p-4 lg:p-6 overflow-y-auto h-full">
                <div className="lg:mt-0 mt-2 flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="cursor-pointer flex justify-center items-center lg:w-10 lg:h-10 w-8 h-8 bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-all duration-300"
                        >
                            <ArrowLeft />
                        </button>
                        <h2 className="text-2xl font-semibold text-primary">Informations voyageurs</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex justify-center items-center lg:w-10 lg:h-10 w-8 h-8 text-red-500 cursor-pointer lg:hidden bg-red-100 rounded-full p-2"
                    >
                        <X />
                    </button>
                </div>

                {/* Affichage des erreurs de validation globales */}
                {validationErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <h4 className="text-red-800 font-medium mb-2">Erreurs de validation :</h4>
                        <ul className="text-red-700 text-sm space-y-1">
                            {validationErrors.map((error, index) => (
                                <li key={index}>• {error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Formulaires pour chaque siège */}
                {selectedSeats.map((seatNumber) => (
                    <TravellerInfosForm
                        key={seatNumber}
                        seatNumber={seatNumber}
                        onPassengerChange={handlePassengerDataChange}
                        initialData={passengersData[seatNumber]}
                    />
                ))}

                {/* Bouton de continuation */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleContinue}
                        disabled={!isAllPassengersDataComplete()}
                        className="bg-primary hover:bg-blue-800 transition-all duration-300 cursor-pointer text-white py-3 px-6 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Continuer vers le résumé
                    </button>
                </div>
            </div>

            {/* Aperçu des tickets */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-4 lg:p-6 overflow-y-auto h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-primary">Aperçu des tickets</h2>
                    <button
                        onClick={onClose}
                        className="cursor-not-allowed lg:cursor-pointer lg:w-10 lg:h-10 lg:bg-red-100 lg:text-red-600 lg:p-2 lg:rounded-full lg:hover:bg-red-200 lg:transition-all lg:duration-300"
                    >
                        <X className="text-transparent lg:text-red-500" />
                    </button>
                </div>
                {selectedSeats.map((seatNumber: number) => (
                    <TicketPreview
                        tripDetails={tripDetails}
                        key={seatNumber}
                        seatNumber={seatNumber}
                        passengerData={passengersData[seatNumber]}
                    />
                ))}
            </div>
        </div>
    );
}