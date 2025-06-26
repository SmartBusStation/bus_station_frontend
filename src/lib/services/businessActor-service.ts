import axios, {AxiosResponse} from "axios";
import {BusinessActor, Customer, UserInterface} from "@/lib/types/models/BusinessActor";
import {BusinessActorFormType} from "@/lib/types/schema/businessActorSchema";
import {LoginSchemaType} from "@/lib/types/schema/loginSchema";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";



const url: string = `${process.env.NEXT_PUBLIC_TRIP_AGENCY_BACKEND_API_URL}/utilisateur`



function stripConfirmPassword(data: BusinessActorFormType) {
    const { confirmPassword, ...rest } = data;
    return {confirmPassword, rest};
}


export async function createBusinessActor(data: BusinessActorFormType): Promise<BusinessActor | null> {
    try {
        const dataToSend = stripConfirmPassword(data);
        const apiResponse: AxiosResponse<BusinessActor> = await axios.post(`${url}/inscription`, dataToSend.rest);
        if (apiResponse.status === 201 || apiResponse.status === 200)
        {
            console.log(apiResponse.data)
            return apiResponse.data;
        }
        else
        {
            console.warn("Code HTTP innatendu", apiResponse.status);
            return null;
        }
    }
    catch (error)
    {
        console.error("Error when creating the business actor ",error);
        throw error;
    }
}



export async function loginBusinessActor(data: LoginSchemaType): Promise<UserInterface | null>
{
    try
    {
        const apiResponse: AxiosResponse<UserInterface> = await axios.post(`${url}/connexion`, data);
        if (apiResponse.status === 200)
        {
            console.log(apiResponse.data);
            return apiResponse.data;
        }
        else {
            console.warn("Unattended http code", apiResponse.status);
            return null;
        }

    }
    catch (error)
    {
        console.error("error during login process ", error);
        throw new Error("Error during login processs");
    }
}



export async function getConnectedUser(token: string): Promise<Customer|null>
{
    if (token && token !=="")
    {
        try
        {
            const apiResponse: AxiosResponse<Customer> = await axiosInstance.get("/utilisateur/profil");
            if(apiResponse.status === 200)
            {
                console.log(apiResponse);
                return apiResponse.data;
            }
            else
            {
                console.warn("Unattended http code", apiResponse.status);
                return null;
            }
        }
        catch (error)
        {
            console.error("Something went wrong when getting the current user", error);
            throw new Error("Something went wrong when getting the current user");
        }
    }
    return null;
}




