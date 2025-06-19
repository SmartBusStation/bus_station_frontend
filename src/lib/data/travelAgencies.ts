// lib/data/travelAgencies.ts
export interface TravelAgency {
  id: string;
  name: string;
  logo: string;
  location: string;
  rating: number;
  description: string;
  specialties: string[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

export interface Trip {
  id: string;
  agencyId: string;
  title: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: number;
  image: string;
  description: string;
  included: string[];
  rating: number;
}

export const travelAgencies: TravelAgency[] = [
  {
    id: "1",
    name: "Aventure Tropicale",
    logo: "/agency-logos/aventure-tropicale.png",
    location: "Douala, Cameroun",
    rating: 4.8,
    description:
      "Spécialistes des voyages d'aventure en Afrique centrale depuis 15 ans. Nous offrons des expériences authentiques et mémorables.",
    specialties: ["Randonnée", "Safari", "Ecotourisme"],
    contact: {
      email: "contact@aventure-tropicale.com",
      phone: "+237 6 99 88 77 66",
      website: "www.aventure-tropicale.com",
    },
  },
  {
    id: "2",
    name: "Sunset Voyages",
    logo: "/agency-logos/sunset-voyages.png",
    location: "Yaoundé, Cameroun",
    rating: 4.5,
    description:
      "Voyages haut de gamme avec un service personnalisé. Découvrez les plus belles destinations avec un luxe abordable.",
    specialties: ["Voyages de luxe", "Honeymoon", "Croisières"],
    contact: {
      email: "info@sunset-voyages.com",
      phone: "+237 6 55 44 33 22",
      website: "www.sunset-voyages.com",
    },
  },
  {
    id: "3",
    name: "Eco Safari",
    logo: "/agency-logos/eco-safari.png",
    location: "Garoua, Cameroun",
    rating: 4.9,
    description:
      "Tourisme durable et responsable. Nous nous engageons à préserver l'environnement tout en vous offrant des expériences uniques.",
    specialties: [
      "Ecotourisme",
      "Photographie animalière",
      "Voyages éducatifs",
    ],
    contact: {
      email: "hello@eco-safari.com",
      phone: "+237 6 77 66 55 44",
      website: "www.eco-safari.com",
    },
  },
];

export const trips: Trip[] = [
  {
    id: "1",
    agencyId: "1",
    title: "Safari au Parc de Waza",
    destination: "Extrême-Nord, Cameroun",
    departureDate: "2025-06-15",
    returnDate: "2025-06-22",
    price: 45000,
    image: "/trip-images/waza-safari.jpg",
    description:
      "Découvrez la faune exceptionnelle du Parc National de Waza, l'un des plus beaux parcs d'Afrique centrale.",
    included: ["Hébergement", "Repas", "Guide francophone", "Transport"],
    rating: 4.7,
  },
  {
    id: "2",
    agencyId: "1",
    title: "Randonnée au Mont Cameroun",
    destination: "Littoral, Cameroun",
    departureDate: "2025-07-10",
    returnDate: "2025-07-12",
    price: 25000,
    image: "/trip-images/mont-cameroun.jpg",
    description:
      "Ascension du point culminant d'Afrique de l'Ouest avec des guides expérimentés.",
    included: [
      "Equipement",
      "Guide",
      "1 nuit en refuge",
      "Certificat d'ascension",
    ],
    rating: 4.9,
  },
  {
    id: "3",
    agencyId: "2",
    title: "Week-end à Kribi",
    destination: "Sud, Cameroun",
    departureDate: "2025-05-20",
    returnDate: "2025-05-23",
    price: 32000,
    image: "/trip-images/kribi-beach.jpg",
    description:
      "Détente sur les plus belles plages du Cameroun avec hébergement dans un resort 4 étoiles.",
    included: [
      "Hébergement 4*",
      "Petit-déjeuner",
      "Transfert aéroport",
      "Excursion aux chutes",
    ],
    rating: 4.6,
  },
];
