/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponseDTO } from './UserResponseDTO';
import type { Vehicule } from './Vehicule';
export type VoyageDetailsDTO = {
    idVoyage?: string;
    titre?: string;
    description?: string;
    dateDepartPrev?: string;
    lieuDepart?: string;
    dateDepartEffectif?: string;
    dateArriveEffectif?: string;
    lieuArrive?: string;
    heureDepartEffectif?: string;
    dureeVoyage?: {
        seconds?: number;
        zero?: boolean;
        nano?: number;
        negative?: boolean;
        units?: Array<{
            durationEstimated?: boolean;
            timeBased?: boolean;
            dateBased?: boolean;
        }>;
    };
    heureArrive?: string;
    nbrPlaceReservable?: number;
    nbrPlaceRestante?: number;
    datePublication?: string;
    dateLimiteReservation?: string;
    dateLimiteConfirmation?: string;
    statusVoyage?: VoyageDetailsDTO.statusVoyage;
    smallImage?: string;
    bigImage?: string;
    nomClasseVoyage?: string;
    prix?: number;
    nomAgence?: string;
    pointDeDepart?: string;
    pointArrivee?: string;
    vehicule?: Vehicule;
    chauffeur?: UserResponseDTO;
    placeReservees?: Array<number>;
    amenities?: Array<'WIFI' | 'AC' | 'USB' | 'SNACKS' | 'BEVERAGES' | 'POWER_OUTLETS' | 'ENTERTAINMENT' | 'COMFORTABLE_SEATS' | 'RESTROOMS' | 'LUGGAGE_STORAGE' | 'CHILD_SEATS' | 'PET_FRIENDLY' | 'AIRPORT_PICKUP' | 'AIRPORT_DROP_OFF' | 'MEAL_SERVICE' | 'ONBOARD_GUIDE' | 'SEAT_SELECTION' | 'GROUP_DISCOUNTS' | 'LATE_CHECK_IN' | 'LATE_CHECK_OUT'>;
};
export namespace VoyageDetailsDTO {
    export enum statusVoyage {
        EN_ATTENTE = 'EN_ATTENTE',
        PUBLIE = 'PUBLIE',
        EN_COURS = 'EN_COURS',
        TERMINE = 'TERMINE',
        ANNULE = 'ANNULE',
    }
}

