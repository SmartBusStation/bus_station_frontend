import {useState} from "react";
import {TravelAgency} from "@/lib/types/models/Agency";
import {TravelAgencyFormType} from "@/lib/types/schema/travelAgencySchema";
import {createAgency} from "@/lib/services/agencyService";
import {decryptDataWithAES} from "@/lib/services/aesServices/encryptionService";
import {Organization} from "@/lib/types/models/Organization";

export function useAgencyCreation() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState<boolean>(false);
    const [createdAgency, setCreatedAgency] = useState<TravelAgency|null>(null);
    const [errors, setErrors] = useState<string|null>(null);
    const [message, setMessage]= useState<string|null>("OUI");



    function clearSessionStorage()
    {
        sessionStorage.removeItem("createdOrganization");
        sessionStorage.removeItem("currentBusinessActor");
    }




    async function storeCreatedOrganization(): Promise<Organization>
    {
        const encryptedData = sessionStorage.getItem("createdOrganization") as string;
        if(encryptedData === "") throw new Error("No organization present in the session storage");
        return await decryptDataWithAES(encryptedData)
            .then((result) => {
                if(result)
                {
                    console.log(result);
                    return result as Organization;
                }
                else
                {
                    console.log(result);
                    throw new Error("Error during data decryption");
                }
            })
            .catch((error)=> {
                console.error(error);
                throw new Error("Error during data decryption");
            })
    }






    async function handleCreateAgency(data: TravelAgencyFormType)
    {
        console.log(data);
        setErrors(null);
        setIsLoading(true);
        setCanOpenSuccessModal(false);
        const organization : Organization= await storeCreatedOrganization();
        await createAgency(data, organization.organization_id)
            .then((result) => {
                if(result)
                {
                    clearSessionStorage();
                    setCreatedAgency(result);
                    setMessage("Your trip agency has been created successfully! Login into your account and manage your trip agency");
                    setCanOpenSuccessModal(true);
                }
                else
                {
                    setErrors("Something went wrong when creating your travel agency");
                    throw new Error("unexpected error");
                }

            })
            .catch((error) => {
                console.error(error);
                setCanOpenSuccessModal(false);
                setErrors("Something went wrong when creating your travel agency");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }






    return {
        isLoading,
        canOpenSuccessModal,
        createdAgency,
        errors,
        handleCreateAgency,
        setCanOpenSuccessModal,
        message
    }
}