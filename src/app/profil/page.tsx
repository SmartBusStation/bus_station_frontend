"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBusStation } from '@/context/Provider';

// Importez les icônes dont nous aurons besoin
import { User, Mail, Phone, Shield, KeyRound, Edit } from 'lucide-react';

// Un petit composant réutilisable pour afficher un champ du profil
// C'est une bonne pratique pour ne pas répéter le code
const ProfileField = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-start py-3">
        <div className="text-blue-600 mr-4 mt-1">{icon}</div>
        <div>
            <p className="text-sm font-semibold text-gray-500">{label}</p>
            <p className="text-base text-gray-800">{value}</p>
        </div>
    </div>
);

export default function ProfilPage() {
    const router = useRouter();
    const {
        userData,
        isLoading,
        isCustomerAuthenticated,
        isAgencyConnected,
        logout
    } = useBusStation();

    const isAuthenticated = isCustomerAuthenticated || isAgencyConnected;

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/(authentication-pages)/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Chargement du profil...</p>
            </div>
        );
    }

    if (!isAuthenticated || !userData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Accès non autorisé. Redirection...</p>
            </div>
        );
    }

    // --- LE NOUVE DESIGN COMMENCE ICI ---
    return (
        // Ce conteneur principal prend la place de la section "Available Trips"
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Paramètres du Compte</h1>
                <p className="mt-1 text-gray-500">Gérez vos informations personnelles et de sécurité.</p>
            </header>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    
                    {/* Colonne de Gauche : Avatar et Nom */}
                    <div className="md:w-1/3 p-8 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 ring-4 ring-blue-200">
                            <User className="w-12 h-12 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{userData.first_name} {userData.last_name}</h2>
                        <p className="text-gray-500 mt-1">{userData.email}</p>
                        <span className="mt-4 px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                            {userData.role.join(', ')}
                        </span>
                    </div>

                    {/* Colonne de Droite : Détails du Profil */}
                    <div className="md:w-2/3 p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations Personnelles</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                            <ProfileField icon={<User size={20} />} label="Prénom" value={userData.first_name} />
                            <ProfileField icon={<User size={20} />} label="Nom" value={userData.last_name} />
                            <ProfileField icon={<User size={20} />} label="Nom d'utilisateur" value={userData.username} />
                            <ProfileField icon={<Mail size={20} />} label="Email" value={userData.email} />
                            <ProfileField icon={<Phone size={20} />} label="Téléphone" value={userData.phone_number} />
                        </div>
                        
                        {/* Section Actions */}
                        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
                            <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                <Edit size={16} className="mr-2" />
                                Modifier le Profil
                            </button>
                            <button className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                                <KeyRound size={16} className="mr-2" />
                                Changer le mot de passe
                            </button>
                            <button
                                onClick={logout}
                                className="flex items-center justify-center px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors md:ml-auto"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}