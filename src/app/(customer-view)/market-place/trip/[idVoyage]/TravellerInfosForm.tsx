import { Briefcase, Calendar, CreditCard, User, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { PassengerFormType, passengerSchema } from "@/lib/types/schema/passengerReservationSchema";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";


export interface TravellerInfosFormProps {
    seatNumber: number;
    onPassengerChange: (seatNumber: number, data: PassengerFormType) => void;
    initialData?: PassengerFormType;
}

const genderOptions = [
    { label: "Homme", value: "Male" },
    { label: "Femme", value: "Female" }
];

export default function TravellerInfosForm({
                                               seatNumber,
                                               onPassengerChange,
                                               initialData
                                           }: TravellerInfosFormProps) {

    const form = useForm<PassengerFormType>({
        resolver: zodResolver(passengerSchema),
        defaultValues: initialData || {
            nom: "",
            genre: undefined,
            age: undefined,
            nbrBaggage: 0,
            numeroPieceIdentific: "",
            placeChoisis: seatNumber
        },
        mode: "onChange" // Validation en temps réel
    });

    const { register, watch, formState: { errors } } = form;



    // Déclencher onChange quand les données changent
    useEffect(() => {
        const subscription = watch((data) => {
            // Vérifier si toutes les données requises sont présentes et valides
            const result = passengerSchema.safeParse(data);
            if (result.success) {
                onPassengerChange(seatNumber, result.data);
            } else {
                // Envoyer les données même si invalides pour permettre la validation globale
                onPassengerChange(seatNumber, data as PassengerFormType);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, seatNumber, onPassengerChange]);

    return (
        <div className="rounded-lg border-2 border-gray-200 p-4 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-md font-semibold text-primary mb-4 flex items-center">
                <Users className="mr-2 h-6 w-6"/>
                Siège {seatNumber}
            </h3>

            <div className="space-y-4">
                {/* Nom et Genre */}
                <div className="flex flex-row space-x-4">
                    <div className="flex-grow">
                        <InputField
                            id={`nom-${seatNumber}`}
                            name="nom"
                            label="Nom complet du voyageur"
                            placeholder="Nom complet du voyageur"
                            icon={<User className="w-4 h-4 text-gray-400"/>}
                            register={register("nom")}
                            error={errors.nom?.message}
                            required
                        />
                    </div>
                    <div className="w-1/4">
                        <SelectField
                            id={`genre-${seatNumber}`}
                            name="genre"
                            label="Genre"
                            options={genderOptions}
                            icon={<Users className="w-4 h-4 text-gray-400"/>}
                            register={register("genre")}
                            error={errors.genre?.message}
                            required
                        />
                    </div>
                </div>

                {/* Âge, Bagages et Pièce d'identité */}
                <div className="flex flex-row space-x-4">
                    <div className="w-1/3">
                        <InputField
                            id={`age-${seatNumber}`}
                            name="age"
                            label="Âge"
                            placeholder="Âge"
                            type="number"
                            icon={<Calendar className="w-4 h-4 text-gray-400"/>}
                            register={register("age")}
                            error={errors.age?.message}
                            required
                        />
                    </div>
                    <div className="w-1/3">
                        <InputField
                            id={`baggage-${seatNumber}`}
                            name="nbrBaggage"
                            label="Bagages"
                            placeholder="Nombre de bagages"
                            type="number"
                            icon={<Briefcase className="w-4 h-4 text-gray-400"/>}
                            register={register("nbrBaggage")}
                            error={errors.nbrBaggage?.message}
                            required
                        />
                    </div>
                    <div className="w-1/3">
                        <InputField
                            id={`id-${seatNumber}`}
                            name="numeroPieceIdentific"
                            label="Pièce d'identité"
                            placeholder="Numéro pièce d'identité"
                            icon={<CreditCard className="w-4 h-4 text-gray-400"/>}
                            register={register("numeroPieceIdentific")}
                            error={errors.numeroPieceIdentific?.message}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}