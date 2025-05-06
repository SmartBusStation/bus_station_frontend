import React, {JSX} from "react";
import {Variants} from "framer-motion";

export interface LinkListProps {
    name: string,
    link: string
}

export interface SocialLinkProps {
    href: string
    icon:  JSX.ElementType,
    color: string
}

export interface  FeatureCardProps  {
    icon: React.ElementType
    title: string
    description: string
    variants: Variants
}



export interface ReactNodeProps  {
        children: React.ReactNode
    }

export interface TranslationProps  {
    t: (key: string) => string
}

export type Gender = "MALE" | "FEMALE" | "OTHER"
export type BusinessActorType = "PROVIDER" | "CONSUMER"
export type OrganizationType = "SOLE_PROPRIETORSHIP" | "CORPORATION" | "PARTNERSHIP" | "LLC" | "NONPROFIT"

export  interface BusinessActor  {
    password:string
    username:string
    phone_number: string
    email: string
    avatar_picture: string
    profile_picture: string
    first_name: string
    last_name: string
    is_individual: boolean
    birth_date: string
    gender: Gender
    nationality: string
    profession: string
    biography: string
    type: BusinessActorType
}

export interface Organization  {
    long_name: string
    short_name: string
    email: string
    description: string
    business_domains: string[]
    logo_url: string
    type: OrganizationType
    web_site_url: string
    social_network: string
    business_registration_number: string
    tax_number: string
    capital_share: number
    registration_date: string
    ceo_name: string
    year_founded: string
    keywords: string[]
    number_of_employees: number
}

export interface TravelAgency  {
    short_name: string
    long_name: string
    description: string
    location: string
    business_domains: string[]
    transferable: boolean
    images: string[]
    greeting_message: string
    registration_date: string
    average_revenue: number
    capital_share: number
    registration_number: string
    social_network: string
    tax_number: string
}

export interface BusinessActorFormProps extends ContinueProps {
    businessActorData:BusinessActor,
    handleBusinessActorChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    confirmPassword:string,
    setConfirmPassword: (param: string)=>void
}

export interface OrganizationFormProps  extends ContinueProps{
    organizationData: Organization,
    handleOrganizationChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    createAgency: boolean,
    setCreateAgency: (param: boolean) => void
}

export interface TravelAgencyFormProps extends ContinueProps{
    agencyData: TravelAgency,
    handleAgencyChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    organizationData: Partial<Organization>
}

export interface ContinueProps{
    agreeTerms: boolean
    step: number
    goBack: ()=>void
    setAgreeTerms: (param: boolean)=> void,
    createAgency?: boolean
}

export interface UserAccountTypeProps {
    createAgency: boolean,
    setCreateAgencyAction: (param: boolean) => void
}

export interface AccountTypeCardProps {
    selected: boolean;
    onSelect: () => void;
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
}