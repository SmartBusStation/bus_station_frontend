import { useState} from "react";
import {BusinessActor} from "@/lib/types/models/BusinessActor";
import {createBusinessActor} from "@/lib/services/registrationServices/businessActorService";
import {AxiosError} from "axios";
import {BusinessActorFormType} from "@/lib/types/schema/businessActorSchema";

export default function useBusinessActorCreation(changeStep: (step:number)=> void)
{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [createdBusinessActor, setCreatedBusinessActor] = useState<BusinessActor | null>(null);
    const [error, setError] = useState<string|null>(null);



    async function handleCreateBusinessActor(data: BusinessActorFormType): Promise<void>
    {
        setIsLoading(true);
        setError(null);
        setCreatedBusinessActor(null);
        console.log(data);
        await createBusinessActor(data)
            .then((result: BusinessActor|null) => {
                if(result)
                {
                    setCreatedBusinessActor(result);
                    changeStep(2);
                }
            })
            .catch((error: AxiosError)=> {
                if (error.status === 409) setError("Un compte existe deja avec votre username ou votre email veuillez le changer");
                else setError("Une erreur est survenue lors de la creation de votre compte utilisateur, veuillez reessayer utlterieurement");
            })
            .finally(()=> setIsLoading(false));
    }


    return {
        isLoading,
        handleCreateBusinessActor,
        error,
        createdBusinessActor
    }
}