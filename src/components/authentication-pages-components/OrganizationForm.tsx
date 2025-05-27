import React, {JSX} from "react";
import {Building, Calendar, Mail, User, Workflow} from "lucide-react";
import {motion} from "framer-motion";
import Continue from "@/components/authentication-pages-components/Continue";
import UserAccountType from "@/components/authentication-pages-components/UserAccountType";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/SelectField";
import {OrganizationFormProps} from "@/lib/types/formProps";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {baseOrganizationSchema, OrganizationFormType} from "@/lib/types/schema/organizationSchema";
import TextareaField from "@/ui/TextareaField";
import {useOrganizationCreation} from "@/lib/hooks/registrationHooks/useOrganizationCreation";
import TransparentModal from "@/modals/TransparentModal";
import Loader from "@/modals/Loader";





export default function OrganizationForm({changeStep, setCreateAgency, ...continueProps}: OrganizationFormProps): JSX.Element
{

    const organizationTypes = [
            { value: "SOLE_PROPRIETORSHIP", label: "Entreprise individuelle" },
            { value: "CORPORATION", label: "Société anonyme" },
            { value: "PARTNERSHIP", label: "Société en nom collectif" },
            { value: "LLC", label: "SARL" },
            { value: "NONPROFIT", label: "Association à but non lucratif" },
    ];


    const organization = useOrganizationCreation(changeStep);
    const {register, handleSubmit, formState: { errors }} = useForm<OrganizationFormType>(
        {
            resolver: zodResolver(baseOrganizationSchema),
        });


    return (
        <form onSubmit={handleSubmit(organization.handleCreateOrganization)}>
            {organization.isLoading && (
                <TransparentModal isOpen={organization.isLoading}>
                    <Loader/>
                </TransparentModal>
            )}
            <UserAccountType createAgency={continueProps.createAgency} setCreateAgencyAction={setCreateAgency}/>
            {continueProps.createAgency && (
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    transition={{duration: 0.3}}
                    className="space-y-6 mt-6 border-t-2 pt-6 border-primary "
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-semibold text-primary">Organization information</h3>
                        <p className="text-gray-500 text-md mt-1">
                            Start by creating an organization. This information is necessary for the creation of your agency.
                        </p>
                    </div>

                    {organization?.errors && <p className="text-red-500 font-semibold text-sm mb-5">{organization?.errors}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            id="long_name"
                            label="Name of the Organization"
                            placeholder="General Voyages"
                            icon={<Building className="h-5 w-5 text-gray-400"/>}
                            register={register && register("long_name")}
                            error={errors?.long_name?.message}
                        />
                        <InputField
                            id="ceo_name"
                            type="text"
                            label="Name of the CEO of the organization"
                            placeholder="KENFACK Adam"
                            icon={<User className="h-5 w-5 text-gray-400"/>}
                            register={register && register("ceo_name") }
                            error={errors?.ceo_name?.message}
                        />
                        <InputField
                            id="email"
                            label="Contact email"
                            placeholder="contact@voyages-extraordinaires.com"
                            type="email"
                            icon={<Mail className="h-5 w-5 text-gray-400"/>}
                            register={register && register("email")}
                            error={errors?.email?.message}
                        />
                        <InputField
                            id="year_founded"
                            type="date"
                            label="Year of foundation"
                            placeholder="2025"
                            icon={<Calendar className="h-5 w-5 text-gray-400"/>}
                            register={register && register("year_founded")}
                            error={errors?.year_founded?.message}
                        />
                        <InputField
                            id="business_registration_number"
                            label="Organization registration number"
                            placeholder="IM075123456"
                            icon={<Workflow className="h-5 w-5 text-gray-400"/>}
                            register={register && register("business_registration_number")}
                            error={errors?.business_registration_number?.message}
                        />
                        <InputField
                            id="tax_number"
                            label="Tax number of the organization"
                            placeholder="FR12345678901"
                            icon={<Workflow className="h-5 w-5 text-gray-400"/>}
                            register={register && register("tax_number")}
                            error={errors?.tax_number?.message}
                        />
                        <SelectField
                            id="type"
                            label="Type of organization"
                            options={organizationTypes}
                            register={register && register("type")}
                            error={errors?.type?.message}
                        />
                        <InputField
                            id="web_site_url"
                            type="text"
                            label="Web Site (optionnal)"
                            placeholder="https://www.example.com"
                            icon={<Building className="h-5 w-5 text-gray-400"/>}
                            register={register && register("web_site_url")}
                            error={errors?.web_site_url?.message}
                        />
                        <TextareaField
                            id="descrption"
                            label="Description of the organization"
                            placeholder="Voyages Extraordinaires"
                            icon={<Building className="h-5 w-5 text-gray-400"/>}
                            register={register && register("description")}
                            error={errors?.description?.message}
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