import axios, {AxiosResponse} from "axios";
import {BusinessActor} from "@/lib/types/models/BusinessActor";
import {BusinessActorFormType} from "@/lib/types/schema/businessActorSchema";

//const url: string = process.env.NEXT_PUBLIC_YOWYOB_BACKEND_API_URL + "/businessactor-service";
//const url= `${process.env.NEXT_PUBLIC_POXY_URL_YOYOWB_BACKEND}/businessactor-service`
const url: string = `${process.env.NEXT_PUBLIC_PROXY_URL_TRIP_AGENCY}/utilisateur`



function stripConfirmPassword(data: BusinessActorFormType) {
    const { confirmPassword, ...rest } = data;
    return {confirmPassword, rest};
}



export async function createBusinessActor(data: BusinessActorFormType): Promise<BusinessActor | null> {
    try
    {
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


