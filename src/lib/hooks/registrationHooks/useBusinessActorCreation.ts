import {useEffect, useState} from "react";
import {BusinessActor} from "@/lib/types/models/BusinessActor";
import {createBusinessActor} from "@/lib/services/businessActorService";
import {AxiosError} from "axios";
import {BusinessActorFormType} from "@/lib/types/schema/businessActorSchema";
import {decryptDataWithAES, encryptDataWithAES} from "@/lib/services/aesServices/encryptionService";



interface BadRequestErrorInterface {
    data:string|null
    message:string
    errors: FieldErrors
    ok:boolean
    status:string
}

interface FieldErrors
{
    email?: string,
    first_name?: string,
    last_name?: string,
    phoneNumber?: string,
    username?: string,
    other?:string
}


export default function useBusinessActorCreation(changeStep: (step:number)=> void)
{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [createdBusinessActor, setCreatedBusinessActor] = useState<BusinessActor | null>(null);
    const [currentBusinessActor, setCurrentBusinessActor] = useState<BusinessActorFormType>({
        confirmPassword: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        phone_number: "",
        username: ""
    });
    const [axiosErrors, setAxiosErrors] = useState<FieldErrors|null>(null);




    useEffect(() => {
        async function storeData()
        {
            await storeCurrentBusinessActor();
        }
        const data = sessionStorage.getItem("currentBusinessActor");
        if(data)  storeData();
    }, []);




    async function saveCurrentBusinessActor(data: BusinessActorFormType): Promise<void>
    {
        setCurrentBusinessActor(data);
        await encryptDataWithAES(data)
            .then((result)=> {
                sessionStorage.setItem("currentBusinessActor", result);
            })
            .catch((error) => {
                console.error(error);
                throw new Error("Error while saving data in the session storage");
            })
    }



    async function storeCurrentBusinessActor(): Promise<void>
    {
        const encryptedData = sessionStorage.getItem("currentBusinessActor") as string;
        if(encryptedData === "") throw new Error("No user present in the session storage");
        await decryptDataWithAES(encryptedData)
            .then((result) => {
                if(result)
                {
                    const businessActor = result as BusinessActorFormType;
                    setCurrentBusinessActor(businessActor);
                }
            })
            .catch((error)=> {
                console.error(error);
                throw new Error("Error during data decryptionk,k");
            })
    }




    async function handleCreateBusinessActor(data: BusinessActorFormType): Promise<void>
    {
        setIsLoading(true);
        setAxiosErrors(null);
        setCreatedBusinessActor(null);
        await saveCurrentBusinessActor(data);
        await createBusinessActor(data)
            .then((result: BusinessActor|null) => {
                if(result)
                {
                    setCreatedBusinessActor(result);
                    changeStep(2);
                }
            })
            .catch((error: AxiosError) =>
            {
                if(error.status === 400 || error.status === 409)
                {
                    const badRequestError = error?.response?.data as BadRequestErrorInterface;
                    Object.entries(badRequestError?.errors).forEach(([key, value]:[string,string]) => {
                        setAxiosErrors((prevState) => ({
                            ...prevState,
                            [key]: value,
                            other:"An account already exists with some of the identifiers you provided, please change them!"
                        }));
                    })
                }
                else
                {
                    setAxiosErrors(
                        {
                        ...axiosErrors,
                        other:"An error occurred while creating your user account, please try again later.",
                    })
                }
            })
            .finally(()=> setIsLoading(false));
    }


    return {
        isLoading,
        handleCreateBusinessActor,
        createdBusinessActor,
        currentBusinessActor,
        axiosErrors
    }
}