import axios, {AxiosResponse} from "axios";
import {TravelAgencyFormType} from "@/lib/types/schema/travelAgencySchema";
import {TravelAgency} from "@/lib/types/models/Agency";



const url: string = `${process.env.NEXT_PUBLIC_TRIP_AGENCY_BACKEND_API_URL}`



export async function createAgency(data: TravelAgencyFormType): Promise<TravelAgency|null>
{
    try
    {
        const response: AxiosResponse<TravelAgency> = await axios.post(`${url}/agence`, data);
        if(response.status === 201 || response.status ===200)
        {
            console.log(response);
            return response?.data;
        }
        else
        {
            console.warn("Unattended HTTP code", response?.data);
            return null;
        }
    }
    catch (error)
    {
        console.error("Error when creating the organization ",error);
        throw error;
    }
}