import {
  LayoutDashboard,
  Building2,
  Store,
  Scale,
  ShieldAlert,
  Settings,
} from "lucide-react";
import { TFunction } from "i18next";

interface NavLink {
  href: string;
  icon: React.ElementType;
  label: string;
  description?: string;
  badge?: string;
}

export const getBusStationNavLinks = (t: TFunction): { menuItems: NavLink[]; secondaryMenuItems: NavLink[] } => {
  const menuItems: NavLink[] = [
    {
      href: "/bus-station-manager-views/dashboard",
      icon: LayoutDashboard,
      label: t("busStation.sidebar.overview"),
      description: "Vision globale : Statut de la gare, KPIs d'affluence, Alertes critiques.",
    },
    {
      href: "/bus-station-manager-views/infrastructure",
      icon: Building2,
      label: t("busStation.sidebar.infrastructure"),
      description: "Gestion de l'entité numérique : Profil, GPS, Superficie, Capacité.",
    },
    {
      href: "/bus-station-manager-views/affiliated-agencies",
      icon: Store,
      label: t("busStation.sidebar.affiliatedAgencies"),
      description: "Liste des locataires, Statut des contrats, Historique des présences.",
    },
    {
      href: "/bus-station-manager-views/policies-taxes",
      icon: Scale,
      label: t("busStation.sidebar.policiesTaxes"),
      description: "Cœur du réacteur : Configuration des taxes, Règlements intérieurs, T&C.",
    },
    {
      href: "/bus-station-manager-views/incidents-security",
      icon: ShieldAlert,
      label: t("busStation.sidebar.incidentsSecurity"),
      description: "Main courante numérique : Signalements, Pannes, Sécurité.",
    },
  ];

  const secondaryMenuItems: NavLink[] = [
    {
      href: "/bus-station-manager-views/settings",
      icon: Settings,
      label: t("busStation.sidebar.settings"),
      description: "Gestion du compte administrateur.",
    },
  ];

  return { menuItems, secondaryMenuItems };
};
