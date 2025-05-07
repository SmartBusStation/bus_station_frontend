import {z} from "zod";




export const travelAgencySchema = z.object({
    long_name: z.string().min(1, "Le nom de l'agence est requis."),
    location: z.string().min(1, "La localisation est requise."),
    registration_number: z.string().min(1, "Le numéro d'immatriculation est requis."),
    tax_number: z.string().min(1, "Le numéro fiscal est requis."),
    social_network: z.string().optional(),
    description: z.string().min(1, "La description est requise."),
    greeting_message: z.string().min(1, "Le message d'accueil est requis."),
});


export type TravelAgencyFormType = z.infer<typeof travelAgencySchema>;
