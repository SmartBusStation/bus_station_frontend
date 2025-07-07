import { Gender } from "@/lib/types/common";

export type BusinessActorType = "PROVIDER" | "CONSUMER";

export interface BusinessActor {
  created_at: string;
  updated_at: string;
  deleted_at: string;
  created_by: string;
  updated_by: string;
  id: string;
  email: string; // Corrigé de "" à string
  friendly_name: string;
  secondary_email: string;
  date_of_birth: string;
  gender: Gender;
  country_code: string;
  dial_code: string;
  secondary_phone_number: string;
  avatar_picture: string;
  profile_picture: string;
  country_id: string;
  last_login_time: string;
  keywords: string[];
  registration_date: string;
  type: BusinessActorType;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
}

export interface Customer {
  userId: string;
  last_name: string;
  first_name: string;
  email: string;
  username: string;
  phone_number: string;
  role: string[];
  avatar?: string; // Ajout optionnel pour la photo de profil
}

// Renommé pour plus de clarté, car c'est la réponse du login
export interface LoginResponseDTO extends Customer {
  token: string;
}

// Ce DTO représente la réponse complète après la création d'un utilisateur.
// Il est utilisé pour les chauffeurs, employés, etc.
export interface UserResponseCreatedDTO {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  id: string; // Correspond à userId
  email: string;
  friendly_name: string; // Souvent une combinaison de prénom/nom
  secondary_email: string | null;
  date_of_birth: string | null;
  gender: Gender;
  country_code: string | null;
  dial_code: string | null;
  secondary_phone_number: string | null;
  avatar_picture: string | null;
  profile_picture: string | null;
  country_id: string | null;
  last_login_time: string | null;
  keywords: string[];
  registration_date: string;
  type: BusinessActorType;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  roles: string[]; // Votre API backend utilise "roles" au pluriel dans la réponse
}

export interface ChauffeurRequestDTO {
  last_name: string;
  first_name: string;
  email: string;
  username: string;
  password?: string; // Le mot de passe peut être optionnel si userExist = true
  phone_number: string;
  role: ("USAGER" | "EMPLOYE" | "AGENCE_VOYAGE" | "ORGANISATION")[];
  gender: Gender;
  agenceVoyageId: string;
  userExist: boolean;
}
