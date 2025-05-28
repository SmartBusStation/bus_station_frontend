import {Building, Globe, Info, MapPin} from "lucide-react";
import React, {JSX} from "react";
import Continue from "@/components/authentication-pages-components/Continue";
import InputField from "@/ui/InputField";
import TextareaField from "@/ui/TextareaField";
import {TravelAgencyFormProps} from "@/lib/types/formProps";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TravelAgencyFormType, travelAgencySchema} from "@/lib/types/schema/travelAgencySchema";
import {useAgencyCreation} from "@/lib/hooks/registration-hooks/useAgencyCreation";
import TransparentModal from "@/modals/TransparentModal";
import Loader from "@/modals/Loader";
import {SuccessModal} from "@/modals/SuccessModal";
import {useNavigation} from "@/lib/hooks/useNavigation";


export default function TravelAgencyForm({changeStep, ...continueProps}: TravelAgencyFormProps): JSX.Element
{



    const agency = useAgencyCreation();
    const navigation = useNavigation();
    const {register, handleSubmit, formState: { errors }} = useForm<TravelAgencyFormType>({resolver: zodResolver(travelAgencySchema)});


    return (
        <form onSubmit={handleSubmit(agency.handleCreateAgency)}>
            {agency.isLoading && (
                <TransparentModal isOpen={agency.isLoading}>
                    <Loader/>
                </TransparentModal>
            )}
            {agency?.errors && <p className="text-red-500 font-semibold text-sm mb-5">{agency?.errors}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <InputField
                    id="agency_long_name"
                    type="text"
                    label="Agency Name"
                    placeholder="Extraordinary Travels"
                    icon={<Building className="h-5 w-5 text-gray-400"/>}
                    register={register(("long_name"))}
                    error={errors?.long_name?.message}
                />
                <InputField
                    id="location"
                    type="text"
                    label="Main Location"
                    placeholder="Paris, France"
                    icon={<MapPin className="h-5 w-5 text-gray-400"/>}
                    register={register(("location"))}
                    error={errors?.location?.message}
                />
                <TextareaField
                    id="description"
                    label="Agency Description"
                    placeholder="Describe your agency and the services you offer..."
                    register={register(("description"))}
                    error={errors?.description?.message}
                    icon={<Info className="h-5 w-5 text-gray-400"/>}
                />
                <TextareaField
                    id="greeting_message"
                    label="Welcome Message"
                    placeholder="Message that will be displayed to visitors of your page..."
                    register={register(("greeting_message"))}
                    error={errors?.greeting_message?.message}
                    icon={<Info className="h-5 w-5 text-gray-400"/>}
                />

                <TextareaField
                    id="social_network"
                    label="Social Networks (optional)"
                    placeholder="@extraordinary_travels"
                    register={register(("social_network"))}
                    error={errors?.social_network?.message}
                    icon={<Globe className="h-5 w-5 text-gray-400"/>}
                />
            </div>
            <Continue
                agreeTerms={continueProps?.agreeTerms}
                step={continueProps?.step}
                goBack={continueProps?.goBack}
                setAgreeTerms={continueProps?.setAgreeTerms}
            />

            <TransparentModal isOpen={agency?.canOpenSuccessModal}>
                <SuccessModal
                    canOpenSuccessModal={agency?.setCanOpenSuccessModal}
                    message={agency?.message || ""}
                    makeAction={()=> { navigation?.onGoToLogin(); changeStep(1) }}
                />
            </TransparentModal>
        </form>
    )
}