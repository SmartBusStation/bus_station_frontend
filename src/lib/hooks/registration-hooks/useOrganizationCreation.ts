import React, {useState} from "react";
import {Organization} from "@/lib/types/models/Organization";
import {baseOrganizationSchema, OrganizationFormType} from "@/lib/types/schema/organizationSchema";
import {createOrganization} from "@/lib/services/organization-service";
import {encryptDataWithAES} from "@/lib/services/encryption-service";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export function useOrganizationCreation (changeStep: (step: number) => void, createAgency: boolean)
{

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [axiosErrors, setAxiosErrors] = useState<string|null>(null);
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string|null>(null);


    const organizationTypes = [
        { value: "SOLE_PROPRIETORSHIP", label: "Entreprise individuelle" },
        { value: "CORPORATION", label: "Société anonyme" },
        { value: "PARTNERSHIP", label: "Société en nom collectif" },
        { value: "LLC", label: "SARL" },
        { value: "NONPROFIT", label: "Association à but non lucratif" },
    ];


    const {register, handleSubmit, formState: { errors }} = useForm<OrganizationFormType>(
        {
            resolver: zodResolver(baseOrganizationSchema),
        });




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



    function createUser(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        if(!createAgency)
        {
            sessionStorage.removeItem("createdBusinessActor");
            sessionStorage.removeItem("currentBusinessActor");
            setIsLoading(false);
            setSuccessMessage("Your account has been created successfully!");
            setCanOpenSuccessModal(true);
        }
    }



    async function handleCreateOrganization(data: OrganizationFormType): Promise<void>
    {
        setAxiosErrors(null);
        setIsLoading(true);
        setSuccessMessage(null);
        setCanOpenSuccessModal(false);
        await createOrganization(data)
            .then(async (result: Organization|null): Promise<void> => {
                if(result)
                {
                    await saveCreatedOrganization(result);
                    changeStep(3);
                }
                else
                {
                    setAxiosErrors("Something when wrong when creating your organization");
                }
            })
            .catch((error)=> {
                if(error.status === 400 || error.status === 409)
                {
                    setAxiosErrors("Something when wrong when creating your organization");
                }
                else
                {
                    setAxiosErrors("Something when wrong when creating your organization");
                }

            })
            .finally(()=> setIsLoading(false))


    }


    return {
    isLoading,
    axiosErrors,
    handleCreateOrganization,
    organizationTypes,
    register,
    handleSubmit,
    errors,
    setCanOpenSuccessModal,
    canOpenSuccessModal,
    successMessage,
    createUser
    }
}