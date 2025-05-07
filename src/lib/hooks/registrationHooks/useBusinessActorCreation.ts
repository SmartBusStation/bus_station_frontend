import {useState} from "react";
import {BusinessActor} from "@/lib/types/models/BusinessActor";
import {createBusinessActor} from "@/lib/services/registrationServices/businessActorService";
import {AxiosError} from "axios";
import {BusinessActorFormType} from "@/lib/types/schema/businessActorSchema";

export default function useBusinessActorCreation()
{
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [createdBusinessActor, setCreatedBusinessActor] = useState<BusinessActor | null>({
        avatar_picture: "",
        country_code: "",
        country_id: "",
        created_at: "",
        created_by: "",
        date_of_birth: "",
        deleted_at: "",
        dial_code: "",
        email: "",
        first_name: "",
        friendly_name: "",
        gender: "MALE",
        id: "",
        keywords: [],
        last_login_time: "",
        last_name: "",
        phone_number: "",
        profile_picture: "",
        registration_date: "",
        secondary_email: "",
        secondary_phone_number: "",
        type: "PROVIDER",
        updated_at: "",
        updated_by: "",
        username: ""
    });
    const [error, setError] = useState<string|null>("");

    async function handleCreateBusinessActor(data: BusinessActorFormType): Promise<BusinessActor|void>
    {
        setIsLoading(false);
        setError(null);
        setCreatedBusinessActor(null);

        return await createBusinessActor(data)
            .then((result: BusinessActor|null) => {
                if(result)
                {
                    setCreatedBusinessActor(result);
                }
            })
            .catch((error: AxiosError)=> {
                if (error.status === 409)
                {
                    setError("Un compte existe deja avec votre username ou votre email veuillez le changer");
                }
                else if (error.status === 403 || error.status === 401 || error.status === 500)
                {
                    setError("Une erreur est survenue lors de la creation de votre compte utilisateur, veuillez reessayer utlterieurement")
                }

            })
            .finally(()=> setIsLoading(false))
    }


    return {
        isLoading,
        handleCreateBusinessActor,
        error,
        createdBusinessActor
    }
}