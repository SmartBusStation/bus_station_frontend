import { z } from "zod";

interface UserType {
    email: string,
    phone_number: string,
    first_name: string,
    last_name: string,
    password: string,
    username: string,
    confirmPassword?:string,
}

export const businessActorSchema = z.object({
    first_name: z.string().min(1, "Prénom requis"),
    last_name: z.string().min(1, "Nom requis"),
    username: z.string().min(3, "Username requis"),
    email: z.string().email("Email invalide"),
    phone_number: z.string().min(8, "Numéro de telephone invalide"),
    password: z
        .string()
        .min(8, "Minimum 8 caractères")
        .regex(/[A-Z]/, "Au moins une majuscule")
        .regex(/\d/, "Au moins un chiffre"),
    confirmPassword: z.string(),
}).refine((data: UserType) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export type BusinessActorFormType = z.infer<typeof businessActorSchema>;

