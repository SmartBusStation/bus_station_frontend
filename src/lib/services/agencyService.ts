import axios, {AxiosResponse} from "axios";
import {TravelAgencyFormType} from "@/lib/types/schema/travelAgencySchema";
import {TravelAgency} from "@/lib/types/models/Agency";



//const url = `${process.env.NEXT_PUBLIC_YOWYOB_BACKEND_API_URL}/organization-service`;
const url = `${process.env.NEXT_PUBLIC_POXY_URL_YOYOWB_BACKEND}/organization-service`;



export async function createAgency(data: TravelAgencyFormType, organizationId: string): Promise<TravelAgency|null>
{
    try
    {
        const response: AxiosResponse<TravelAgency> = await axios.post(`${url}/organizations/${organizationId}/`, data);
        if(response.status === 201)
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