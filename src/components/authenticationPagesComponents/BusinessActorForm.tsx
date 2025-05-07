import React, {JSX} from "react";
import {AtSign, Lock, Phone, User} from "lucide-react";
import Continue from "@/components/authenticationPagesComponents/Continue";
import {BusinessActorFormProps} from "@/lib/types/formProps";
import InputField from "@/ui/InputField";
import {BusinessActorFormType, businessActorSchema} from "@/lib/types/schema/businessActorSchema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";





export default function BusinessActorForm({changeStep,...continueProps}:BusinessActorFormProps):JSX.Element
{

    async  function onSubmit(data: BusinessActorFormType)
    {
        console.log(data);
        changeStep(2);
    }

    const {register, handleSubmit, formState: { errors }} = useForm<BusinessActorFormType>({resolver: zodResolver(businessActorSchema),});



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <>
                    <InputField
                        id="first_name"
                        label="Prénom"
                        placeholder="Jean"
                        icon={<User className="h-5 w-5 text-gray-400" />}
                        register={register ? register("first_name") : undefined}
                        error={errors?.first_name?.message}
                    />

                    <InputField
                        id="last_name"
                        label="Nom"
                        placeholder="Dupont"
                        icon={<User className="h-5 w-5 text-gray-400" />}
                        register={register ? register("last_name") : undefined}
                        error={errors?.last_name?.message}
                    />

                    <InputField
                        id="username"
                        label="Username"
                        placeholder="dupont123"
                        icon={<User className="h-5 w-5 text-gray-400" />}
                        register={register ? register("username") : undefined}
                        error={errors?.username?.message}
                    />

                    <InputField
                        id="email"
                        label="Email"
                        placeholder="jean.dupont@example.com"
                        type="email"
                        icon={<AtSign className="h-5 w-5 text-gray-400" />}
                        register={register ? register("email") : undefined}
                        error={errors?.email?.message}
                    />

                    <InputField
                        id="phone_number"
                        label="Numéro de téléphone"
                        placeholder="+33 6 12 34 56 78"
                        type="tel"
                        icon={<Phone className="h-5 w-5 text-gray-400" />}
                        register={register ? register("phone_number") : undefined}
                        error={errors?.phone_number?.message}
                    />

                    {/* Password Field */}
                    <InputField
                        id="password"
                        label="Mot de passe"
                        placeholder="••••••••"
                        icon={<Lock className="h-5 w-5 text-gray-400" />}
                        toggleVisibility={true}
                        register={register ? register("password") : undefined}
                        error={errors?.password?.message}
                    />

                    <InputField
                        id="confirmPassword"
                        label="Confirmer le mot de passe"
                        placeholder="••••••••"
                        icon={<Lock className="h-5 w-5 text-gray-400" />}
                        toggleVisibility={true}
                        register={register ? register("confirmPassword") : undefined}
                        error={errors?.confirmPassword?.message}

                    />
                </>
            </div>
            <Continue agreeTerms={continueProps.agreeTerms} step={continueProps.step} goBack={continueProps.goBack} setAgreeTerms={continueProps.setAgreeTerms} createAgency={continueProps.createAgency}/>
        </form>
    )
}