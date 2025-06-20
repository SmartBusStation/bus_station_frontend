import {AxiosResponse} from "axios";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";
import {Trip} from "@/lib/types/models/Trip";

const url: string = "voyage";


interface TripAxiosResponseInterface {
    content: Partial<Trip>[],
    empty:boolean,
    last: boolean,
    number: number,
    numberOfElements:number,
    pageable: {
        offset: number,
        sort:SortInterface
        scrollPosition:
            {
                initial:boolean,
                pagingState: string,
            }
        pageNumber: number,
        pageSize: number,
        pagingState:string,
        paged:boolean,
        unpaged: boolean,
    }
    size: number,
    sort: SortInterface
    totalElements:number,
    totalPages:number
}

interface SortInterface {
    unsorted: boolean,
    sorted: boolean,
    empty:boolean,
}

export async function retrieveAllTrips(): Promise<TripAxiosResponseInterface | null> {
    try
    {
        const apiResponse: AxiosResponse<TripAxiosResponseInterface> = await axiosInstance.get(`/${url}/all`);
        if (apiResponse.status === 200)
        {
            return apiResponse.data;
        }
        else
        {
            console.warn("Unattended http code", apiResponse.status);
            return null;
        }
    } catch (error) {
        console.error("error during retrieving trips", error);
        throw new Error("error during retrieving trips");
    }
}


export async function retrieveTripDetail(tripId: string): Promise<Trip | null>
{
    if(!tripId || tripId === "") throw new Error("the trip id must not empty");
    try
    {
        const apiResponse: AxiosResponse<Trip> = await axiosInstance.get(`/${url}/byId/${tripId}`);
        if (apiResponse.status === 200)
        {
            console.log(apiResponse);
            return apiResponse.data;
        }
        else
        {
            console.warn("Unattended http code", apiResponse.status);
            return null;
        }
    } catch (error) {
        console.error("error during retrieving trips", error);
        throw new Error("error during retrieving trips");
    }
}
