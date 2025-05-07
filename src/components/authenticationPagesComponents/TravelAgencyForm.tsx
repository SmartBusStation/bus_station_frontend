import {Building, Globe, Info, MapPin, Workflow} from "lucide-react";
import React, {JSX} from "react";
import Continue from "@/components/authenticationPagesComponents/Continue";
import InputField from "@/ui/InputField";
import TextareaField from "@/ui/TextareaField";
import {ContinueProps} from "@/lib/types/formProps";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TravelAgencyFormType, travelAgencySchema} from "@/lib/types/schema/travelAgencySchema";


export default function TravelAgencyForm({...continueProps}: ContinueProps): JSX.Element
{


    async  function onSubmit(data: TravelAgencyFormType)
    {
        console.log(data);
    }


    const {register, handleSubmit, formState: { errors }} = useForm<TravelAgencyFormType>({resolver: zodResolver(travelAgencySchema)});


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <InputField
                    id="agency_long_name"
                    name="long_name"
                    type="text"
                    label="Nom de l'agence"
                    placeholder="Voyages Extraordinaires"
                    icon={<Building className="h-5 w-5 text-gray-400"/>}
                    register={register(("long_name"))}
                    error={errors?.long_name?.message}
                />
                <InputField
                    id="location"
                    name="location"
                    type="text"
                    label="Localisation principale"
                    placeholder="Paris, France"
                    icon={<MapPin className="h-5 w-5 text-gray-400"/>}
                    register={register(("location"))}
                    error={errors?.location?.message}
                />
                <InputField
                    id="registration_number"
                    name="registration_number"
                    type="text"
                    label="Numéro d'immatriculation"
                    placeholder="IM075123456"
                    icon={<Workflow className="h-5 w-5 text-gray-400"/>}
                    register={register(("registration_number"))}
                    error={errors?.registration_number?.message}
                />
                <InputField
                    id="agency_tax_number"
                    name="tax_number"
                    type="text"
                    label="Numéro fiscal"
                    placeholder="FR12345678901"
                    icon={<Workflow className="h-5 w-5 text-gray-400"/>}
                    register={register(("tax_number"))}
                    error={errors?.location?.message}
                />
                <InputField
                    id="social_network"
                    name="social_network"
                    type="text"
                    label="Réseaux sociaux (optionnel)"
                    placeholder="@voyages_extraordinaires"
                    register={register(("social_network"))}
                    error={errors?.social_network?.message}
                    icon={<Globe className="h-5 w-5 text-gray-400"/>}
                />
            </div>
            <TextareaField
                id="description"
                name="description"
                label="Description de l'agence"
                placeholder="Décrivez votre agence et les services que vous proposez..."
                rows={3}
                register={register(("description"))}
                error={errors?.description?.message}
                icon={<Info className="h-5 w-5 text-gray-400"/>}
            />
            <TextareaField
                id="greeting_message"
                name="greeting_message"
                label="Message d'accueil"
                placeholder="Message qui sera affiché aux visiteurs de votre page..."
                rows={2}
                register={register(("greeting_message"))}
                error={errors?.greeting_message?.message}
                icon={<Info className="h-5 w-5 text-gray-400"/>}
            />
            <Continue agreeTerms={continueProps.agreeTerms} step={continueProps.step} goBack={continueProps.goBack}
                      setAgreeTerms={continueProps.setAgreeTerms}/>
        </form>
    )
}