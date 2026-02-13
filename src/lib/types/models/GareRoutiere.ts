export type Service = "WIFI" | "PARKING" | "RESTAURATION" | "SALLE_ATTENTE" | "TOILETTES" | "SECURITE";

export interface GareRoutiere {
    idGareRoutiere: string;
    nomGareRoutiere: string;
    ville: string;
    quartier: string;
    photoUrl: string;
    services: Service[];
    nbreAgence: number;
    isOpen: boolean;
}

export interface GareRoutiereDetail {
    idGareRoutiere: string;
    nomGareRoutiere: string;
    adresse: string;
    ville: string;
    quartier: string;
    description: string;
    services: Service[];
    horaires: string;
    photoUrl: string;
    nomPresident: string;
    idCoordonneeGPS: string;
    managerId: string;
    nbreAgence: number;
}
