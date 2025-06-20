import { z } from "zod";

const allowedGenders = ["Male", "Female"] as const;

// Schema pour un passager individuel
export const passengerSchema = z.object({
    nom: z.string().min(1, "Le nom complet est requis"),
    genre: z.enum(allowedGenders, {
        errorMap: () => ({ message: "Veuillez sélectionner un genre" }),
    }),
    age: z.coerce.number()
        .min(1, "L'âge doit être supérieur à 0")
        .max(120, "L'âge doit être réaliste"),
    nbrBaggage: z.coerce.number()
        .min(0, "Le nombre de bagages ne peut pas être négatif")
        .max(4, "Maximum 4 bagages autorisés"),
    numeroPieceIdentific: z.string().min(1, "Le numéro de pièce d'identité est requis"),
    placeChoisis: z.number(),
});

// Schema pour tous les passagers (Record<number, PassengerInterface>)
export const passengersSchema = z.record(z.number(), passengerSchema);

export type PassengerFormType = z.infer<typeof passengerSchema>;
export type PassengersFormType = z.infer<typeof passengersSchema>;