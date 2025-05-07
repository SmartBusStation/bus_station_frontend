import React, {JSX} from "react";
import {Building, Calendar, Mail, User, Workflow} from "lucide-react";
import {motion} from "framer-motion";
import Continue from "@/components/authenticationPagesComponents/Continue";
import UserAccountType from "@/components/authenticationPagesComponents/UserAccountType";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";
import {OrganizationFormProps} from "@/lib/types/formProps";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {baseOrganizationSchema, OrganizationFormType} from "@/lib/types/schema/organizationSchema";





export default function OrganizationForm({changeStep, setCreateAgency, ...continueProps}: OrganizationFormProps): JSX.Element
{

    const organizationTypes = [
            { value: "SOLE_PROPRIETORSHIP", label: "Entreprise individuelle" },
            { value: "CORPORATION", label: "Société anonyme" },
            { value: "PARTNERSHIP", label: "Société en nom collectif" },
            { value: "LLC", label: "SARL" },
            { value: "NONPROFIT", label: "Association à but non lucratif" },
        ];


    async  function onSubmit(data: OrganizationFormType)
    {
        console.log(data);
        changeStep(3);
    }

    const {register, handleSubmit, formState: { errors }} = useForm<OrganizationFormType>({resolver: zodResolver(baseOrganizationSchema)});


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <UserAccountType createAgency={continueProps.createAgency} setCreateAgencyAction={setCreateAgency}/>
            {continueProps.createAgency && (
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    transition={{duration: 0.3}}
                    className="space-y-6 mt-6 border-t pt-6"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-lg font-medium text-gray-800">Informations de l'organisation</h3>
                        <p className="text-gray-500 text-sm">
                            Commencez par creer une organisation. Ces informations sont necessaires pour la creation de
                            votre agence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            id="long_name"
                            name="long_name"
                            label="Nom de l'organisation"
                            placeholder="General Voyages"
                            icon={<Building className="h-5 w-5 text-gray-400"/>}
                            register={register ? register("long_name") : undefined}
                            error={errors?.long_name?.message}
                        />
                        <InputField
                            id="ceo_name"
                            name="ceo_name"
                            type="text"
                            label="Nom du CEO"
                            placeholder="NGOUPAYE Thierry"
                            icon={<User className="h-5 w-5 text-gray-400"/>}
                            register={register ? register("ceo_name") : undefined}
                            error={errors?.ceo_name?.message}
                        />
                        <InputField
                            id="email"
                            name="email"
                            label="Email de contact"
                            placeholder="contact@voyages-extraordinaires.com"
                            type="email"
                            icon={<Mail className="h-5 w-5 text-gray-400"/>}
                            register={register ? register("email") : undefined}
                            error={errors?.email?.message}
                        />
                        <InputField
                            id="year_founded"
                            name="year_founded"
                            type="text"
                            label="Annee de fondation"
                            placeholder="2025"
                            icon={<Calendar className="h-5 w-5 text-gray-400"/>}
                            register={register ? register("year_founded") : undefined}
                            error={errors?.year_founded?.message}
                        />
                        <InputField
                            id="business_registration_number"
                            label="Numéro d'immatriculation"
                            placeholder="IM075123456"
                            icon={<Workflow className="h-5 w-5 text-gray-400"/>}
                            register={register ? register("business_registration_number") : undefined}
                            error={errors?.business_registration_number?.message}
                        />
                        <InputField
                            id="tax_number"
                            label="Numéro fiscal"
                            placeholder="FR12345678901"
                            icon={<Workflow className="h-5 w-5 text-gray-400"/>}
                            register={register ? register("tax_number") : undefined}
                            error={errors?.tax_number?.message}
                        />
                        <SelectField
                            id="type"
                            name="type"
                            label="Type d'organisation"
                            placeholder={"Veuillez choisir un type d'organisation"}
                            options={organizationTypes}
                            register={register ? register("type") : undefined}
                            error={errors?.type?.message}
                        />
                        <InputField
                            id="web_site_url"
                            type="text"
                            label="Site web (optionnel)"
                            placeholder="https://www.example.com"
                            icon={<Building className="h-5 w-5 text-gray-400"/>}
                            register={register ? register("web_site_url") : undefined}
                            error={errors?.web_site_url?.message}
                        />
                    </div>
                </motion.div>
            )
        }
        <Continue agreeTerms={continueProps.agreeTerms}
                  step={continueProps.step}
                  goBack={continueProps.goBack}
                  setAgreeTerms={continueProps.setAgreeTerms}
                  createAgency={continueProps.createAgency}
        />
        </form>
    )
}