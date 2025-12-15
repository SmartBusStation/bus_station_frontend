### 1. Spécifications Fonctionnelles & UX/UI

Cette section est le "Hub" physique de l'application. Elle répond à la question du voyageur : _"Je suis à Yaoundé au quartier Mvan, quelles agences sont ici et où vont les bus ?"_.

#### A. Page de Listing des Gares Routières (`/gares-routieres`)

**Objectif :** Permettre à l'utilisateur de trouver rapidement une gare routière spécifique ou d'explorer les gares d'une ville.

- **Composants attendus :**
  - **Hero Section / En-tête :** Titre accrocheur ("Trouvez votre point de départ") avec une image de fond subtile.
  - **Barre de Recherche Intelligente :** Champ de saisie unique permettant de chercher par **Nom de la gare** (ex: "Gare de Mvan") ou par **Ville** (ex: "Yaoundé").
  - **Système de Filtres (Badges) :** Filtrage rapide par services disponibles (ex: "Parking sécurisé", "Salle d'attente climatisée", "Ouvert 24h/24").
  - **Grille de Cartes (Grid Layout) :** Affichage des résultats sous forme de "Cards".
    - _Contenu d'une carte :_ Photo de couverture de la gare, Nom, Quartier/Ville, Nombre d'agences présentes (Badge), Note moyenne (optionnel).
    - _Interaction :_ Au clic sur une carte, redirection vers la page de détail.
  - **Vue Carte (Optionnel mais recommandé) :** Un bouton "Voir sur la carte" qui bascule l'affichage liste vers une carte interactive (Leaflet/Google Maps) montrant les pins des gares.

#### B. Page de Détail d'une Gare Routière (`/gares-routieres/[id]`)

**Objectif :** Servir de "Mini-Site" ou de vitrine numérique pour la gare. C'est le tableau de bord public du voyageur.

- **Structure de la page :**

  1.  **Header (Bandeau) :**

      - Grande photo de couverture.
      - **Infos Clés :** Nom de la gare, Adresse complète (Ville, Quartier), Indicateur d'état (Ouvert/Fermé).
      - **Actions :** Bouton "Y aller" (ouvre Google Maps/Waze).

  2.  **Section Services & Infrastructures :**

      - Liste horizontale d'icônes représentant les commodités.
      - _Exemples :_ 🅿️ Parking, 📶 Wi-Fi, 🚻 Toilettes, 🛋️ Salle d'attente, 👮 Sécurité, 🍔 Restauration.

  3.  **Système d'Onglets (Tabs) - Cœur de la page :**
      - **Onglet 1 : "Agences Présentes" (Par défaut)**
        - Affichage des logos des agences qui ont un contrat _validé_ avec cette gare.
        - Chaque logo est cliquable et mène au profil de l'agence.
        - _UX :_ Doit inspirer confiance (montrer les partenaires officiels).
      - **Onglet 2 : "Prochains Départs" (Tableau style Aéroport)**
        - Tableau listant les voyages prévus au départ de cette gare dans les prochaines heures.
        - _Colonnes :_ Heure, Destination, Agence (Logo + Nom), Prix, Action (Bouton "Réserver").
        - _Logique :_ Ce tableau agrège les données de `Voyage` de toutes les agences affiliées, filtrées par `idGare` et triées par `dateHeure`.
      - **Onglet 3 : "Infos Pratiques"**
        - Description textuelle (Histoire, localisation précise).
        - Règlement intérieur simplifié (ex: "Interdit de fumer", "Arriver 30min avant").

---

### 2. Description de la Structure de Données (Contenu pour Prompt IA)

Si vous demandez à une IA de générer ces pages, fournissez-lui ce schéma de données (en format TypeScript/JSON) pour qu'elle comprenne exactement quoi afficher.

**Prompt Context :**
_"Voici la structure de données 'GareRoutiere' que tu dois utiliser pour générer les interfaces. Note bien que la relation avec les agences et les voyages est dynamique."_

```typescript
// Type Definition for Bus Station (Frontend DTO)

interface GareRoutiere {
  id: string; // UUID
  nom: string; // Ex: "Gare Routière de Mvan"
  ville: string; // Ex: "Yaoundé"
  quartier: string; // Ex: "Mvan"
  adresse: string; // Adresse textuelle complète

  // Coordonnées pour l'affichage sur la carte (Leaflet/Google Maps)
  localisation: {
    latitude: number;
    longitude: number;
  };

  description: string; // Texte de présentation
  imageUrl: string; // URL de l'image de couverture

  // Liste des services disponibles (à afficher sous forme d'icônes)
  services: string[]; // Ex: ["WIFI", "TOILETTES", "PARKING", "RESTAURATION", "SALLE_ATTENTE"]

  // Statistiques pour l'affichage des badges
  nbAgencesAffiliees: number;

  // État d'ouverture (Optionnel)
  estOuvert: boolean;
  horaires?: string; // Ex: "24h/24" ou "05h00 - 23h00"
}

// Type pour l'onglet "Agences Présentes"
interface AgenceSommaire {
  id: string;
  nom: string;
  logoUrl: string;
  lignesDesservies: string[]; // Ex: ["Douala", "Bafoussam"] - Juste pour info visuelle
}

// Type pour l'onglet "Prochains Départs" (Tableau dynamique)
interface VoyageDepart {
  id: string;
  heureDepart: string; // Format ISO ou Time string
  villeDestination: string;
  nomAgence: string;
  logoAgenceUrl: string;
  prix: number;
  typeVehicule: string; // Ex: "VIP", "Classique"
  placesRestantes: number;
}
```

### 3. Exemple de Données (Mock Data)

Ajoutez ceci au prompt pour que l'IA génère une prévisualisation réaliste.

```json
const MOCK_GARE: GareRoutiere = {
  id: "gare-001",
  nom: "Gare Routière de Mvan",
  ville: "Yaoundé",
  quartier: "Mvan",
  adresse: "Carrefour Mvan, Route de l'aéroport",
  localisation: { latitude: 3.8480, longitude: 11.5021 },
  description: "Principal hub de transport pour les voyages vers le sud et le littoral. Gare sécurisée et moderne.",
  imageUrl: "/images/gares/mvan-main.jpg",
  services: ["WIFI", "PARKING", "RESTAURATION", "SALLE_ATTENTE"],
  nbAgencesAffiliees: 12,
  estOuvert: true,
  horaires: "24h/24"
};

const MOCK_DEPARTS: VoyageDepart[] = [
  {
    id: "v-101",
    heureDepart: "08:00",
    villeDestination: "Douala",
    nomAgence: "General Express",
    logoAgenceUrl: "/logos/general.png",
    prix: 5000,
    typeVehicule: "Classique",
    placesRestantes: 15
  },
  {
    id: "v-102",
    heureDepart: "08:30",
    villeDestination: "Kribi",
    nomAgence: "Touristique",
    logoAgenceUrl: "/logos/touristique.png",
    prix: 6500,
    typeVehicule: "VIP",
    placesRestantes: 4
  }
];
```

voici des propositions pour les techno
tu utilisera des images du site unsplash, egalement il faudra integrer une map de google ( frame ou un truc du genre je crois)

1.  **Framework :** Utilise Next.js avec Tailwind CSS.
2.  **Composants UI :** Utilise `lucide-react` pour les icônes (Wifi, MapPin, Bus).
3.  **Design :** Adopte un style épuré et moderne ("Card based design"). Les cartes des gares doivent avoir un effet de "hover" léger.
4.  **Onglets :** Utilise un système de gestion d'état (`useState`) pour basculer entre "Agences" et "Prochains Départs" sans recharger la page.
5.  **Responsive :** Sur mobile, le tableau des départs doit rester lisible (peut-être passer en format carte sur petit écran).
