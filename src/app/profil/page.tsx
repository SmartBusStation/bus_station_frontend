// src/app/profil/page.tsx
"use client"; // Indispensable car nous utilisons un hook (donc du code côté client)

import { useUserProfile } from "@/lib/hooks/useUserProfile";
import React from "react";

// Un composant simple pour afficher un état de chargement
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <p>Chargement du profil...</p>
    {/* Vous pouvez mettre un vrai spinner CSS ici */}
  </div>
);

// Un composant pour afficher les erreurs
const ErrorDisplay = ({ message }: { message: string }) => (
  <div style={{ color: 'red', padding: '20px', border: '1px solid red', borderRadius: '5px' }}>
    <h2>Erreur</h2>
    <p>{message}</p>
  </div>
);

// Le composant principal de la page
export default function ProfilPage() {
  const { user, isLoading, error } = useUserProfile();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  // Si tout est ok, on affiche le profil
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {user ? (
        <>
          <h1>Profil de {user.prenom} {user.nom}</h1>
          <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
            <p><strong>Nom dutilisateur :</strong> {user.username}</p>
            <p><strong>Téléphone :</strong> {user.telNumber}</p>
            <p><strong>Adresse :</strong> {user.address}</p>
            <p><strong>Rôle :</strong> {user.role.join(', ')}</p>
            <p><small>ID: {user.userId}</small></p>
          </div>
        </>
      ) : (
        // Ce cas est peu probable si error est null, mais c'est une bonne sécurité
        <p>Aucune donnée utilisateur trouvée.</p>
      )}
    </div>
  );
}