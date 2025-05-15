import {z} from "zod";

export const travelAgencySchema = z.object({
    long_name: z.string().min(1, "Agency name is required."),
    short_name: z.string().min(1, "Short name of the agency is required.").optional(),
    location: z.string().min(1, "Location is required."),
    social_network: z.string().optional(),
    description: z.string().min(1, "Description is required."),
    greeting_message: z.string().min(1, "Welcome message is required."),
    business_domains: z.array(z.string()).optional(),
}).superRefine((data) => {
    if (!data.short_name) {
        data.short_name = data.long_name;
    }
    if(!data.business_domains)
    {
        data.business_domains = [process.env.NEXT_PUBLIC_AGENCY_BUSINESS_DOMAIN_ID as string];
    }
});

export type TravelAgencyFormType = z.infer<typeof travelAgencySchema>;