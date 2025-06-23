// src/lib/hooks/useUserProfile.ts
"use client";

import { useState, useEffect } from 'react';
import { User } from '@/lib/types/user';
import { fetchUserProfile } from '@/lib/services/apiService';

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        // Le token est typiquement stocké dans le localStorage après la connexion.
        // Assurez-vous que votre logique de connexion le stocke bien.
        const token = localStorage.getItem('authToken'); 

        if (!token) {
          throw new Error("Utilisateur non authentifié.");
        }

        const userData = await fetchUserProfile(token);
        setUser(userData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Une erreur inconnue est survenue.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, []); // Le tableau vide assure que l'effet s'exécute une seule fois.

  return { user, isLoading, error };
};