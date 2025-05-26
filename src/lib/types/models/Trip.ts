import {Vehicle} from "@/lib/types/models/vehicle";

export interface Trip {
    "idVoyage": string,
    "titre": string,
    "description": string,
    "dateDepartPrev": string,
    "lieuDepart": string,
    "dateDepartEffectif": string,
    "dateArriveEffectif": string,
    "lieuArrive": string,
    "heureDepartEffectif": string,
    "dureeVoyage": {
        "seconds": number,
        "zero": boolean,
        "nano": number,
        "negative": boolean,
        "units": [
            {
                "durationEstimated": boolean,
                "timeBased": boolean,
                "dateBased": boolean
            }
        ]
    },
    "heureArrive": string,
    "nbrPlaceReservable": number,
    "nbrPlaceRestante": number,
    "datePublication": string,
    "dateLimiteReservation": string,
    "dateLimiteConfirmation": string,
    "statusVoyage": string,
    "smallImage": string,
    "bigImage": string,
    "nomClasseVoyage": string,
    "prix": number,
    "nomAgence": string,
    "pointDeDepart": string,
    "pointArrivee": string,
    "vehicule": Vehicle
    "placeReservees": number[]
}