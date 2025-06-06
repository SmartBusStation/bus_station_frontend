import {z} from "zod";



export const loginSchema = z.object({
    username: z.string().min(1, "Your email is required"),
    password: z
        .string()
        .min(8, "Minimum 8 characters")
        .regex(/[A-Z]/, "your password must contain at least one uppercase letter")
        .regex(/\d/, "your password must contain at least one number"),
});


export type LoginSchemaType = z.infer<typeof loginSchema>;