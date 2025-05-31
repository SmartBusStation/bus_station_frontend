import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useToggleSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    // Sauvegarde l'état dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarOpen', JSON.stringify(newState));
    }
  };

  // Récupère l'état depuis localStorage au chargement initial
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarOpen');
      if (savedState !== null) {
        setIsOpen(JSON.parse(savedState));
      }
    }
  }, []);

  return { isOpen, toggle };
};