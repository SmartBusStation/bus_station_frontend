import {Gender} from "@/lib/types/common";

export type BusinessActorType = "PROVIDER" | "CONSUMER"

export  interface BusinessActor {
    created_at: string,
    updated_at: string,
    deleted_at: string,
    created_by: string,
    updated_by: string,
    id: string ,
    email: "",
    friendly_name: string,
    secondary_email: string,
    date_of_birth: string,
    "gender": Gender,
    country_code: string,
    dial_code: string,
    secondary_phone_number: string,
    avatar_picture: string,
    profile_picture: string,
    country_id: string ,
    last_login_time: string,
    keywords: string[],
    registration_date: string
    type: BusinessActorType,
    first_name: string,
    last_name: string,
    username: string,
    phone_number: string,
}


export interface Customer {
    userId: string,
    last_name: string,
    first_name: string,
    email:string,
    username: string,
    phone_number: string,
    role: string[],
}

export interface UserInterface extends Customer{
    token: string,
}

