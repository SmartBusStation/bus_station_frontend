import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import {ReservationCreationSchema} from "@/lib/types/schema/reservationCreationSchema";
import {AxiosResponse} from "axios";
import {Reservation} from "@/lib/types/models/Reservation";

const url :string= "reservation";


async function createReservation(data: ReservationCreationSchema): Promise<Reservation|null>
{
    if (!data) throw new Error("reservation data must not be empty");
    try
    {
        const apiResponse: AxiosResponse<Reservation> = await axiosInstance.post(`${url}/reserver`, data);
        if(apiResponse.status === 201)
        {
            console.log(apiResponse);
            return apiResponse.data;
        }
        else
        {
            console.warn("unattended http code ", apiResponse.status, apiResponse);
            return null;
        }
    }
    catch(error)
    {
        console.error("erreur lors de la reservation ", error);
        throw new Error("Une erreur est survenue lors de la reservation");
    }
}