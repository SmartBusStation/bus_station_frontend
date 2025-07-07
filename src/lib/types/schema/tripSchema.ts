import { z } from "zod";

// Schéma pour le formulaire de planification de voyage
export const tripPlannerSchema = z.object({
  titre: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z
    .string()
    .min(20, "La description doit contenir au moins 20 caractères."),

  lieuDepart: z.string().min(1, "Le lieu de départ est requis."),
  pointDeDepart: z.string().min(1, "Le point de départ précis est requis."),

  lieuArrive: z.string().min(1, "Le lieu d'arrivée est requis."),
  pointArrivee: z.string().min(1, "Le point d'arrivée précis est requis."),

  dateDepartPrev: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Veuillez entrer une date de départ valide.",
  }),
  heureArrive: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format d'heure invalide (HH:MM)."),

  dateLimiteReservation: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Veuillez entrer une date limite de réservation valide.",
  }),
  dateLimiteConfirmation: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Veuillez entrer une date limite de confirmation valide.",
  }),

  prix: z.coerce.number().positive("Le prix doit être un nombre positif."),
  nbrPlaceReservable: z.coerce
    .number()
    .int()
    .positive("Le nombre de places doit être supérieur à zéro."),

  vehiculeId: z.string().uuid("Veuillez sélectionner un véhicule valide."),
  chauffeurId: z.string().uuid("Veuillez sélectionner un chauffeur valide."),
  classVoyageId: z
    .string()
    .uuid("Veuillez sélectionner une classe de voyage valide."),
  agenceVoyageId: z.string().uuid("L'ID de l'agence est requis."), // Sera probablement caché et rempli automatiquement

  amenities: z.array(z.string()).optional(),
  smallImage: z
    .string()
    .url("URL de l'image invalide")
    .optional()
    .or(z.literal("")),
  bigImage: z
    .string()
    .url("URL de l'image invalide")
    .optional()
    .or(z.literal("")),
});

export type TripPlannerFormType = z.infer<typeof tripPlannerSchema>;
