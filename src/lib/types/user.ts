// src/lib/types/user.ts

export interface User {
    userId: string;
    nom: string;
    prenom: string;
    username: string;
    telNumber: string;
    role: string[];
    address: string;
    idcoordonneeGPS: string;
  }