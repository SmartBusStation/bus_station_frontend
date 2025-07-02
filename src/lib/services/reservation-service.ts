import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import {ReservationCreationSchema} from "@/lib/types/schema/reservationCreationSchema";
import {AxiosResponse} from "axios";
import {Reservation, ReservationDetails} from "@/lib/types/models/Reservation";
import {PaymentRequestFormType} from "@/lib/types/schema/paymentRequestSchema";
import {PaginatedResponse} from "@/lib/types/common";


const url :string= "reservation";





export async function createReservation(data: ReservationCreationSchema): Promise<Reservation|null>
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


export async function createPayment(data: PaymentRequestFormType): Promise<string|number>
{
    if (!data) throw new Error("payment data must not be empty");
    try
    {
        const apiResponse: AxiosResponse<void> = await axiosInstance.put(`${url}/payer`, data);
        if(apiResponse.status === 200 || apiResponse.status === 204)
        {
            console.info("payment success", apiResponse.data);
            return "payment success";
        }
        else
        {
            console.warn("unattended http code ", apiResponse.status, apiResponse);
            return apiResponse.status;
        }
    }
    catch(error)
    {
        console.error("erreur lors de la reservation ", error);
        throw new Error("Une erreur est survenue lors de la reservation");
    }

}


export async function getCustomerReservations(idUser: string): Promise<PaginatedResponse<ReservationDetails>|null>
{
    try
    {
        const apiResponse: AxiosResponse<PaginatedResponse<ReservationDetails>> = await axiosInstance.get(`/${url}/utilisateur/${idUser}`);
        if(apiResponse.status === 200)
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
    catch (error)
    {
        console.error("error during retrieving reservations ", error);
        throw new Error("error during retrieving reservations");
    }
}


export async function getReservationDetail(idReservation: string): Promise<ReservationDetails|null>
{
    try {
        const apiResponse: AxiosResponse<ReservationDetails> = await axiosInstance.get(`/${url}/${idReservation}`);
        if (apiResponse.status === 200) {
            console.log(apiResponse);
            return apiResponse.data;
        }
        else
        {
            console.warn("unattended http code ", apiResponse.status, apiResponse);
            return null;
        }
    }catch (error)
    {
        console.error("error during retrieving reservation detail ", error);
        throw new Error("error during retrieving reservation details");
    }
}

