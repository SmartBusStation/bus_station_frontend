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
