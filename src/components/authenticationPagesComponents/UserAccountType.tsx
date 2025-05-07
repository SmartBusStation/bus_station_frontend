import {Building, User} from "lucide-react"
import React from "react";

import AccountTypeCard from "@/ui/AccountTypeCard";
import {UserAccountTypeProps} from "@/lib/types/ui";



export default function UserAccountType({createAgency, setCreateAgencyAction}: UserAccountTypeProps) {

    const regularUserAccountFeatures: string[] =[
        "Accès à la marketplace",
        "Réservation de voyages",
        "Gestion de votre profil"
    ];

    const agencyAccountFeatures: string[] =[
        "Tableau de bord d'agence",
        "Publication d'offres",
        "Gestion des réservations"
    ];


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Regular User Option*/}
            <AccountTypeCard
                selected={!createAgency}
                onSelect={() => setCreateAgencyAction(false)}
                icon={<User className="h-6 w-6 text-blue-600" />}
                title="Utilisateur standard"
                description="Créez un compte personnel pour rechercher et réserver des voyages."
                features={regularUserAccountFeatures}
            />

            {/*Agency Section */}
            <AccountTypeCard
                selected={createAgency}
                onSelect={() => setCreateAgencyAction(true)}
                icon={<Building className="h-6 w-6 text-blue-600" />}
                title="Agence de voyage"
                description="Créez un compte professionnel pour proposer vos services de voyage."
                features={agencyAccountFeatures}
            />
        </div>
    )
}
