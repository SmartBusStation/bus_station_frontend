export interface GareRoutiere {
  id: string;
  nom: string;
  ville: string;
  quartier: string;
  adresse: string;
  localisation: {
    latitude: number;
    longitude: number;
  };
  description: string;
  imageUrl: string;
  services: string[];
  nbAgencesAffiliees: number;
  estOuvert: boolean;
  horaires?: string;
}
