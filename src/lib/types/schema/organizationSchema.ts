import { z } from "zod";


export const baseOrganizationSchema = z.object({
    long_name: z.string().min(1, "Nom requis"),
    ceo_name: z.string().min(1, "Nom du CEO requis"),
    email: z.string().email("Email invalide"),
    year_founded: z.string().regex(/^\d{4}$/, "Année invalide").min(4, "Annee invalide").max(4, "Annee invalide"),
    business_registration_number: z.string().min(1, "Numéro d'immatriculation requis"),
    tax_number: z.string().min(1, "Numéro fiscal requis"),
    type: z.enum(["SOLE_PROPRIETORSHIP", "CORPORATION", "PARTNERSHIP", "LLC", "NONPROFIT"])
        .refine((val) => !!val, {
            message: "Le type d'organisation est requis.",
        }),
    web_site_url: z.string().url("URL invalide").optional().or(z.literal("")),
});

export type OrganizationFormType = z.infer<typeof baseOrganizationSchema>;



