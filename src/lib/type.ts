import React, {JSX} from "react";
import {Variants} from "framer-motion";

export type LinkList = {
    name: string,
    link: string
}

export type SocialLinkType = {
    href: string
    icon:  JSX.ElementType,
    color: string
}

export type  FeatureCardProps = {
    icon: React.ElementType
    title: string
    description: string
    variants: Variants
}

export type UserTypeComponentPropsType = {
    userType: "client"|"agency",
    toggleDropdown: () => void,
    isDropdownOpen: boolean,
    selectUserType: (type:"client"|"agency") => void
}


export type ReactNodeProps = {
  children: React.ReactNode;
};

// type.ts
export interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface TravelAgency {
  id: string;
  name: string;
  logo: string;
  location: string;
  rating: number;
  description: string;
  specialties: string[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

export interface Trip {
  id: string;
  agencyId: string;
  title: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: number;
  image: string;
  description: string;
  included: string[];
  rating: number;
}

export interface AgencySidebarProps {
  agencies: TravelAgency[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectAgency: (id: string) => void;
  selectedAgencyId: string | null;
}

export interface AgencyProfileProps {
  agency: TravelAgency;
  trips: Trip[];
  onBack: () => void;
}

export interface TripCardProps {
  trip: Trip;
  index: number;
}