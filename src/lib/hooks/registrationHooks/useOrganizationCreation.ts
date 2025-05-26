import {useState} from "react";
import {Organization} from "@/lib/types/models/Organization";
import {OrganizationFormType} from "@/lib/types/schema/organizationSchema";
import {createOrganization} from "@/lib/services/organizationService";
import {encryptDataWithAES} from "@/lib/services/encryptionService";

export function useOrganizationCreation (changeStep: (step: number) => void)
{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string|null>(null);






    async function saveCreatedOrganization(createdOrganization: Organization): Promise<void>
    {
        if(createdOrganization)
        {
            await encryptDataWithAES(createdOrganization)
                .then((result)=> {
                    sessionStorage.setItem("createdOrganization", result);
                })
                .catch((error) => {
                    console.error(error);
                    throw new Error("Error while saving data in the session storage");
                })
        }
        else
        {
            throw new Error("Any organization found");
        }
    }




    async function handleCreateOrganization(data: OrganizationFormType): Promise<void>
    {
        console.log(data);
        setErrors(null);
        setIsLoading(true);
        await createOrganization(data)
            .then(async (result: Organization|null): Promise<void> => {
                if(result)
                {
                    console.log(result);
                    await saveCreatedOrganization(result);
                    changeStep(3);
                }
                else
                {
                    setErrors("Something when wrong when creating your organization");
                }
            })
            .catch((error)=> {
                if(error.status === 400 || error.status === 409)
                {
                    setErrors("Something when wrong when creating your organization");
                }
                else
                {
                    setErrors("Something when wrong when creating your organization");
                }

            })
            .finally(()=> setIsLoading(false))
    }


    return {
    isLoading,
    errors,
    handleCreateOrganization
    }
}