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
}).refine((data: UserType) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
});

export type BusinessActorFormType = z.infer<typeof businessActorSchema>;

