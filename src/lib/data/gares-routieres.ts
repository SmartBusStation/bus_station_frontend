import { AgenceSommaire, GareRoutiere, VoyageDepart } from "@/lib/types/gares-routiere";

export const MOCK_GARES: GareRoutiere[] = [
  {
    id: "gare-001",
    nom: "Gare Routière de Mvan",
    ville: "Yaoundé",
    quartier: "Mvan",
    adresse: "Carrefour Mvan, Route de l'aéroport, Yaoundé",
    localisation: { latitude: 3.8480, longitude: 11.5021 },
    description: "Principal hub de transport pour les voyages vers le sud et le littoral. Gare sécurisée et moderne, offrant une multitude de services pour un voyage confortable.",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop",
    services: ["WIFI", "PARKING", "RESTAURATION", "SALLE_ATTENTE", "TOILETTES", "SECURITE"],
    nbAgencesAffiliees: 12,
    estOuvert: true,
    horaires: "24h/24"
  },
  {
    id: "gare-002",
    nom: "Gare de Buca",
    ville: "Douala",
    quartier: "Buca",
    adresse: "123 Rue de la Liberté, Douala",
    localisation: { latitude: 4.0483, longitude: 9.7043 },
    description: "La gare la plus moderne de Douala, servant de point de départ principal pour l'ouest du pays. Elle est réputée pour sa propreté et son organisation.",
    imageUrl: "https://images.unsplash.com/photo-1566411726332-53a773593204?q=80&w=1931&auto=format&fit=crop",
    services: ["WIFI", "SALLE_ATTENTE", "TOILETTES", "SECURITE"],
    nbAgencesAffiliees: 8,
    estOuvert: true,
    horaires: "05h00 - 23h00"
  },
  {
    id: "gare-003",
    nom: "Gare d'Etoudi",
    ville: "Yaoundé",
    quartier: "Etoudi",
    adresse: "Près du marché d'Etoudi, Yaoundé",
    localisation: { latitude: 3.8999, longitude: 11.5213 },
    description: "Une gare plus petite mais très active, idéale pour les voyages vers les régions du nord. Ambiance locale et authentique.",
    imageUrl: "https://images.unsplash.com/photo-1628102390352-a895c4a7587c?q=80&w=1887&auto=format&fit=crop",
    services: ["RESTAURATION", "TOILETTES"],
    nbAgencesAffiliees: 5,
    estOuvert: false,
    horaires: "06h00 - 20h00"
  },
    {
    id: "gare-004",
    nom: "Gare de Kribi",
    ville: "Kribi",
    quartier: "Centre-ville",
    adresse: "Avenue des plages, Kribi",
    localisation: { latitude: 2.9474, longitude: 9.9145 },
    description: "La porte d'entrée de la cité balnéaire. Parfait pour commencer vos vacances en toute sérénité.",
    imageUrl: "https://images.unsplash.com/photo-1588666312528-2a879a4c3305?q=80&w=1887&auto=format&fit=crop",
    services: ["PARKING", "RESTAURATION", "SALLE_ATTENTE"],
    nbAgencesAffiliees: 4,
    estOuvert: true,
    horaires: "07h00 - 19h00"
  },
];

export const MOCK_AGENCES: AgenceSommaire[] = [
    { id: "agency-01", nom: "General Express", logoUrl: "/agency-logos/aventure-tropicale.png", lignesDesservies: ["Douala", "Bafoussam"] },
    { id: "agency-02", nom: "Touristique Express", logoUrl: "/agency-logos/eco-safari.png", lignesDesservies: ["Kribi", "Yaoundé"] },
    { id: "agency-03", nom: "Finex Voyage", logoUrl: "/agency-logos/sunset-voyages.png", lignesDesservies: ["Ngaoundéré", "Bertoua"] },
    { id: "agency-04", nom: "Buca Voyages", logoUrl: "/agency-logos/aventure-tropicale.png", lignesDesservies: ["Limbé", "Bamenda"] },
    { id: "agency-05", nom: "Global Voyages", logoUrl: "/agency-logos/eco-safari.png", lignesDesservies: ["Ebolowa", "Sangmélima"] },
];

export const MOCK_DEPARTS: VoyageDepart[] = [
  {
    id: "v-101",
    heureDepart: "08:00",
    villeDestination: "Douala",
    nomAgence: "General Express",
    logoAgenceUrl: "/agency-logos/aventure-tropicale.png",
    prix: 7000,
    typeVehicule: "Classique",
    placesRestantes: 15
  },
  {
    id: "v-102",
    heureDepart: "08:30",
    villeDestination: "Kribi",
    nomAgence: "Touristique Express",
    logoAgenceUrl: "/agency-logos/eco-safari.png",
    prix: 8500,
    typeVehicule: "VIP",
    placesRestantes: 4
  },
  {
    id: "v-103",
    heureDepart: "09:00",
    villeDestination: "Bafoussam",
    nomAgence: "Finex Voyage",
    logoAgenceUrl: "/agency-logos/sunset-voyages.png",
    prix: 6000,
    typeVehicule: "Classique",
    placesRestantes: 25
  },
  {
    id: "v-104",
    heureDepart: "09:15",
    villeDestination: "Douala",
    nomAgence: "Buca Voyages",
    logoAgenceUrl: "/agency-logos/aventure-tropicale.png",
    prix: 7500,
    typeVehicule: "VIP Climatisé",
    placesRestantes: 10
  },
   {
    id: "v-105",
    heureDepart: "10:00",
    villeDestination: "Ngaoundéré",
    nomAgence: "Global Voyages",
    logoAgenceUrl: "/agency-logos/eco-safari.png",
    prix: 15000,
    typeVehicule: "Premium",
    placesRestantes: 8
  },
];
