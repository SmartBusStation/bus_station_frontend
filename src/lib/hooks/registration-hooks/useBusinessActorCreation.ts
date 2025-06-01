import {useEffect, useState} from "react";
import {BusinessActor} from "@/lib/types/models/BusinessActor";
import {createBusinessActor} from "@/lib/services/businessActorService";
import {AxiosError} from "axios";
import {BusinessActorFormType, businessActorSchema} from "@/lib/types/schema/businessActorSchema";
import {decryptDataWithAES, encryptDataWithAES} from "@/lib/services/encryptionService";
import {Option} from "@/ui/SelectField";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";




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


    /*** BUSINESS-ACTOR VARIABLES ***/
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [createdBusinessActor, setCreatedBusinessActor] = useState<BusinessActor | null>(null);
    const [currentBusinessActor, setCurrentBusinessActor] = useState<BusinessActorFormType>({
        gender: "MALE",
        role:  ["USAGER"],
        confirmPassword: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        phone_number: "",
        username: ""
    });
    const [axiosErrors, setAxiosErrors] = useState<FieldErrors|null>(null);
    const userGenderOption: Option[] = [
        {
            value: "MALE",
            label: "Male"
        },
        {
            value: "FEMALE",
            label: "Female"
        }
    ];


    /**** BUSINESS-ACTOR FORM VARIABLES  ***/
    const {register, handleSubmit,reset, formState: { errors }} = useForm<BusinessActorFormType>(
        {
            resolver: zodResolver(businessActorSchema),
            defaultValues: currentBusinessActor,
        });


    useEffect(() => {
        if (currentBusinessActor) {
            reset(currentBusinessActor);
        }
    }, [currentBusinessActor, reset]);





    /*** ENCRYPTION AND DECRYPTION FUNCTIONS ***/

    useEffect(() => {
        async function storeData()
        {
            await storeCurrentBusinessActor();
        }
        const data: string|null = sessionStorage.getItem("currentBusinessActor");
        if(data)  storeData();
    }, []);




    async function saveCurrentBusinessActor(data: BusinessActorFormType): Promise<void>
    {
        setCurrentBusinessActor(data);
        await encryptDataWithAES(data)
            .then((result: string): void => {
                sessionStorage.setItem("currentBusinessActor", result);
            })
            .catch((error): void => {
                console.error(error);
                throw new Error("Error while saving data in the session storage");
            })
    }



    async function storeCurrentBusinessActor(): Promise<void>
    {
        const encryptedData = sessionStorage.getItem("currentBusinessActor") as string;
        if(encryptedData === "") throw new Error("No user present in the session storage");
        await decryptDataWithAES(encryptedData)
            .then((result): void => {
                if(result)
                {
                    const businessActor = result as BusinessActorFormType;
                    setCurrentBusinessActor(businessActor);
                }
            })
            .catch((error)=> {
                console.error(error);
                throw new Error("Error during data decryption");
            })
    }





    /*** BUSINESS-ACTOR CREATION ***/
    async function handleCreateBusinessActor(data: BusinessActorFormType): Promise<void>
    {
        console.log(data);
        setIsLoading(true);
        setAxiosErrors(null);
        setCreatedBusinessActor(null);
        await saveCurrentBusinessActor(data);
        await createBusinessActor(data)
            .then((result: BusinessActor|null): void => {
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
                    Object.entries(badRequestError?.errors).forEach(([key, value]:[string,string]): void => {
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
        axiosErrors,
        userGenderOption,
        register,
        handleSubmit,
        errors
    }
}