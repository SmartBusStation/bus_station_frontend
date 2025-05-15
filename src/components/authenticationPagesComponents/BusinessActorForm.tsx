import React, {JSX, useEffect} from "react";
import {AtSign, Lock, Phone, User} from "lucide-react";
import Continue from "@/components/authenticationPagesComponents/Continue";
import {BusinessActorFormProps} from "@/lib/types/formProps";
import InputField from "@/ui/InputField";
import {BusinessActorFormType, businessActorSchema} from "@/lib/types/schema/businessActorSchema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useBusinessActorCreation from "@/lib/hooks/registrationHooks/useBusinessActorCreation";
import TransparentModal from "@/modals/TransparentModal";
import Loader from "@/modals/Loader";





export default function BusinessActorForm({changeStep,...continueProps}:BusinessActorFormProps):JSX.Element
{

    const {isLoading, handleCreateBusinessActor, axiosErrors, currentBusinessActor} = useBusinessActorCreation(changeStep);
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


    return (
        <form onSubmit={handleSubmit(handleCreateBusinessActor)}>
            {isLoading && (
                <TransparentModal isOpen={isLoading}>
                    <Loader/>
                </TransparentModal>
            )}
            {axiosErrors?.other && <p className="text-red-500 font-semibold text-sm mb-5">{axiosErrors?.other}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <>
                    <InputField
                        id="first_name"
                        label="First Name"
                        placeholder="Jean"
                        icon={<User className="h-5 w-5 text-gray-400"/>}
                        register={register && register("first_name")}
                        error={axiosErrors?.first_name || errors?.first_name?.message}
                    />

                    <InputField
                        id="last_name"
                        label="Last Name"
                        placeholder="Dupont"
                        icon={<User className="h-5 w-5 text-gray-400"/>}
                        register={register && register("last_name")}
                        error={axiosErrors?.last_name || errors?.last_name?.message}
                    />

                    <InputField
                        id="username"
                        label="Username"
                        placeholder="dupont123"
                        icon={<User className="h-5 w-5 text-gray-400"/>}
                        register={register && register("username")}
                        error={axiosErrors?.username || errors?.username?.message}
                    />

                    <InputField
                        id="email"
                        label="Email"
                        placeholder="jean.dupont@example.com"
                        type="email"
                        icon={<AtSign className="h-5 w-5 text-gray-400"/>}
                        register={register ? register("email") : undefined}
                        error={axiosErrors?.email || errors?.email?.message}
                    />

                    <InputField
                        id="phone_number"
                        label="Phone Number"
                        placeholder="+33 6 12 34 56 78"
                        type="tel"
                        icon={<Phone className="h-5 w-5 text-gray-400"/>}
                        register={register && register("phone_number")}
                        error={axiosErrors?.phoneNumber || errors?.phone_number?.message}
                    />


                    <InputField
                        id="password"
                        label="Password"
                        placeholder="••••••••"
                        icon={<Lock className="h-5 w-5 text-gray-400"/>}
                        toggleVisibility={true}
                        register={register && register("password")}
                        error={errors?.password?.message}
                    />

                    <InputField
                        id="confirmPassword"
                        label="Confirm your password"
                        placeholder="••••••••"
                        icon={<Lock className="h-5 w-5 text-gray-400"/>}
                        toggleVisibility={true}
                        register={register && register("confirmPassword")}
                        error={errors?.confirmPassword?.message}

                    />
                </>
            </div>
            <Continue agreeTerms={continueProps.agreeTerms} step={continueProps.step} goBack={continueProps.goBack}
                      setAgreeTerms={continueProps.setAgreeTerms} createAgency={continueProps.createAgency}/>
        </form>
    )
}