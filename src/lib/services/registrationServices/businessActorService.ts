import axios, {AxiosError, AxiosResponse} from "axios";
import {BusinessActor} from "@/lib/types/models/BusinessActor";
import {BusinessActorFormType} from "@/lib/types/schema/businessActorSchema";

//const url: string = process.env.NEXT_PUBLIC_YOWYOB_BACKEND_API_URL + "/businessactor-service";
const url= "/api/businessactor-service"



function stripConfirmPassword(data: BusinessActorFormType) {
    const { confirmPassword, ...rest } = data;
    return {confirmPassword, rest};
}



export async function createBusinessActor(data: BusinessActorFormType): Promise<BusinessActor | null> {
    try
    {
        const dataToSend = stripConfirmPassword(data);
        const apiResponse: AxiosResponse<BusinessActor> = await axios.post(`${url}/business-actors`, dataToSend.rest);
        if (apiResponse.status === 200)
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
        console.error(error);
        throw error;
    }
}


