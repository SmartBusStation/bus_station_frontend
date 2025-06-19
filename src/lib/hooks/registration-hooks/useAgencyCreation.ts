import {useState} from "react";
import {TravelAgency} from "@/lib/types/models/Agency";
import {TravelAgencyFormType, travelAgencySchema} from "@/lib/types/schema/travelAgencySchema";
import {createAgency} from "@/lib/services/agency-service";
import {decryptDataWithAES} from "@/lib/services/encryption-service";
import {Organization} from "@/lib/types/models/Organization";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BusinessActor} from "@/lib/types/models/BusinessActor";


export function useAgencyCreation() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState<boolean>(false);
    const [createdAgency, setCreatedAgency] = useState<TravelAgency|null>(null);
    const [axiosErrors, setAxiosErrors] = useState<string|null>(null);
    const [message, setMessage]= useState<string|null>(null);


    const {register, handleSubmit, formState: { errors }} = useForm<TravelAgencyFormType>({resolver: zodResolver(travelAgencySchema)});






    function clearSessionStorage()
    {
        sessionStorage.removeItem("createdOrganization");
        sessionStorage.removeItem("currentBusinessActor");
        sessionStorage.removeItem("createdBusinessActor");
    }




    async function storeCreatedOrganization(): Promise<[Organization, BusinessActor]> {
        const encryptedCreatedOrganization = sessionStorage.getItem("createdOrganization") as string;
        const encryptedCreatedBusinessActor = sessionStorage.getItem("createdBusinessActor") as string;

        if (!encryptedCreatedOrganization || encryptedCreatedOrganization === "") {
            setIsLoading(false);
            throw new Error("No organization found in session storage.");
        }

        if (!encryptedCreatedBusinessActor || encryptedCreatedBusinessActor ==="") {
            setIsLoading(false);
            throw new Error("No business actor found in session storage.");
        }
        try {
            const [organization, businessActor] = await Promise.all([decryptDataWithAES(encryptedCreatedOrganization), decryptDataWithAES(encryptedCreatedBusinessActor)]);
            return [organization as Organization, businessActor as BusinessActor];
        }
        catch (error) {
            setIsLoading(false);
            setAxiosErrors("Something went wrong when creating your travel agency, please retry!");
            console.error("Decryption failed:", error);
            throw new Error("Error during data decryption.");
        }
    }








    async function handleCreateAgency(data: TravelAgencyFormType)
    {

        setAxiosErrors(null);
        setIsLoading(true);
        setCanOpenSuccessModal(false);
        const [organization, businessActor]: [Organization, BusinessActor] = await storeCreatedOrganization();


        console.log("created organization ",organization);
        console.log("created Business actor ", businessActor);


        const finalData = {
            ...data,
            organisation_id: organization.organization_id,
            user_id: businessActor.id
        };

        console.log("agency data ",finalData);


        await createAgency(finalData)
            .then((result: TravelAgency|null): void => {
                if(result)
                {
                    clearSessionStorage();
                    setCreatedAgency(result);
                    setMessage("Your trip agency has been created successfully! Login into your account and manage your trip agency");
                    setCanOpenSuccessModal(true);
                }
                else
                {
                    setAxiosErrors("Something went wrong when creating your travel agency");
                    throw new Error("unexpected error");
                }

            })
            .catch((error): void => {
                console.error(error);
                setCanOpenSuccessModal(false);
                setAxiosErrors("Something went wrong when creating your travel agency");
            })
            .finally(() => setIsLoading(false));
    }







    return {
        isLoading,
        canOpenSuccessModal,
        createdAgency,
        axiosErrors,
        handleCreateAgency,
        setCanOpenSuccessModal,
        message,
        register,
        handleSubmit,
        errors
    }
}