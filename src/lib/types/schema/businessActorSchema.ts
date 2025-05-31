import { z } from "zod";




const allowedRoles = ["USAGER", "AGENCE_VOYAGE", "ORGANISATION", "EMPLOYE"] as const;
const allowedGenders = ["MALE", "FEMALE"] as const;



export const businessActorSchema = z.object({
    first_name: z.string().min(1, "Your firstname is required"),
    last_name: z.string().min(1, "Your lastname is required"),
    username: z.string().min(3, "Your username is required"),
    email: z.string().min(1, "Your email is required").email("Enter a valid email"),
    phone_number: z.string().min(8, "Enter a valid phone number"),
    password: z
        .string()
        .min(8, "Minimum 8 characters")
        .regex(/[A-Z]/, "your password must contain at least one uppercase letter")
        .regex(/\d/, "your password must contain at least one number"),
    confirmPassword: z.string(),
    role: z.array(z.enum(allowedRoles))
          .nonempty("Au moins un rôle est requis"),
    gender: z.enum(allowedGenders, {
            errorMap: () => ({ message: "Please select a gender" }),
        })
        .refine((val) => !!val, { message: "Your gender is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
}).superRefine((data) => {
    if (!data.role) {
        data.role = ["USAGER"];
    }
});

export type BusinessActorFormType = z.infer<typeof businessActorSchema>;

