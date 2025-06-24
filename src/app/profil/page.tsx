"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBusStation } from '@/context/Provider';

export default function ProfilPage() {
    const router = useRouter();
    const {
        userData,
        isLoading,
        isCustomerAuthenticated,
        isAgencyConnected,
        logout
    } = useBusStation();

    // Variable unifiée pour vérifier si un utilisateur, quel que soit son rôle, est connecté
    const isAuthenticated = isCustomerAuthenticated || isAgencyConnected;

    useEffect(() => {
        // Si le chargement initial est terminé ET que personne n'est authentifié
        if (!isLoading && !isAuthenticated) {
            router.push('/(authentication-pages)/login');
        }
    }, [isLoading, isAuthenticated, router]);


    if (isLoading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}><p>Chargement...</p></div>;
    }

    if (!isAuthenticated || !userData) {
        return <div style={{ padding: '20px', textAlign: 'center' }}><p>Accès non autorisé. Redirection...</p></div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
            <h1>Mon Profil</h1>
            <div style={{ background: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
                <p><strong>Nom :</strong> {userData.last_name}</p>
                <p><strong>Prénom :</strong> {userData.first_name}</p>
                <p><strong>Nom dutilisateur :</strong> {userData.username}</p>
                <p><strong>Email :</strong> {userData.email}</p>
                <p><strong>Téléphone :</strong> {userData.phone_number}</p>
                <p><strong>Rôle :</strong> {userData.role.join(', ')}</p>
            </div>
            <button
                onClick={logout}
                style={{ marginTop: '20px', padding: '10px 20px', background: '#d9534f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Déconnexion
            </button>
        </div>
    );
}