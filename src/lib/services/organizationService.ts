import axios, {AxiosResponse} from "axios";
import {OrganizationFormType} from "@/lib/types/schema/organizationSchema";
import {Organization} from "@/lib/types/models/Organization";



//const url = `${process.env.NEXT_PUBLIC_YOWYOB_BACKEND_API_URL}/organization-service`;
const url = `${process.env.NEXT_PUBLIC_POXY_URL_YOYOWB_BACKEND}/organization-service`;



export async function createOrganization(data: OrganizationFormType): Promise<Organization|null>
{
    try
    {
        const response: AxiosResponse<Organization> = await axios.post(`${url}/organizations`, data);
        if(response.status === 201)
        {
            console.log(response);
            return response?.data;
        }
        else
        {
            console.warn("Unattended HTTP code", response?.data);
            return null
        }
    }
    catch (error)
    {
        console.error("Error when creating the organization ",error);
        throw error;
    }
}