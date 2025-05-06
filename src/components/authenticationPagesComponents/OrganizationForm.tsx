import React, {JSX} from "react";
import {Building, Calendar, Mail, User, Workflow} from "lucide-react";
import {OrganizationFormProps} from "@/lib/type";
import {motion} from "framer-motion";
import Continue from "@/components/authenticationPagesComponents/Continue";
import UserAccountType from "@/components/authenticationPagesComponents/UserAccountType";
import InputField from "@/components/authenticationPagesComponents/InputField";




export default function OrganizationForm({organizationData, handleOrganizationChange, setCreateAgency, ...continueProps}: OrganizationFormProps): JSX.Element
{
    return (
        <>
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
                            value={organizationData.long_name}
                            onChange={handleOrganizationChange}
                            icon={<Building className="h-5 w-5 text-gray-400"/>}
                            required={continueProps.createAgency}
                        />
                        <InputField
                            id="ceo_name"
                            name="ceo_name"
                            type="text"
                            value={organizationData.ceo_name || ""}
                            onChange={handleOrganizationChange}
                            label="Nom du CEO"
                            placeholder="NGOUPAYE Thierry"
                            icon={<User className="h-5 w-5 text-gray-400"/>}
                            required={continueProps.createAgency}
                        />
                        <InputField
                            id="email"
                            name="email"
                            label="Email de contact"
                            placeholder="contact@voyages-extraordinaires.com"
                            type="email"
                            value={organizationData.email}
                            onChange={handleOrganizationChange}
                            icon={<Mail className="h-5 w-5 text-gray-400"/>}
                            required={continueProps.createAgency}
                        />
                        <InputField
                            id="year_founded"
                            name="year_founded"
                            type="text"
                            value={organizationData.year_founded || ""}
                            onChange={handleOrganizationChange}
                            label="Annee de fondation"
                            placeholder="2025"
                            icon={<Calendar className="h-5 w-5 text-gray-400"/>}
                            required={continueProps.createAgency}
                        />
                        <InputField
                            id="business_registration_number"
                            name="business_registration_number"
                            label="Numéro d'immatriculation"
                            placeholder="IM075123456"
                            value={organizationData.business_registration_number}
                            onChange={handleOrganizationChange}
                            icon={<Workflow className="h-5 w-5 text-gray-400"/>}
                            required={continueProps.createAgency}
                        />
                        <InputField
                            id="tax_number"
                            name="tax_number"
                            label="Numéro fiscal"
                            placeholder="FR12345678901"
                            value={organizationData.tax_number}
                            onChange={handleOrganizationChange}
                            icon={<Workflow className="h-5 w-5 text-gray-400"/>}
                            required={continueProps.createAgency}
                        />
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                Type d'organisation
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Building className="h-5 w-5 text-gray-400"/>
                                </div>
                                <select
                                    id="type"
                                    name="type"
                                    value={organizationData.type || "SOLE_PROPRIETORSHIP"}
                                    onChange={handleOrganizationChange}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    required={continueProps.createAgency}
                                >
                                    <option value="SOLE_PROPRIETORSHIP">Entreprise individuelle</option>
                                    <option value="CORPORATION">Société anonyme</option>
                                    <option value="PARTNERSHIP">Société en nom collectif</option>
                                    <option value="LLC">SARL</option>
                                    <option value="NONPROFIT">Association à but non lucratif</option>
                                </select>
                            </div>
                        </div>
                        <InputField
                            id="web_site_url"
                            name="web_site_url"
                            type="url"
                            value={organizationData.web_site_url || ""}
                            onChange={handleOrganizationChange}
                            label="Site web (optionnel)"
                            placeholder="https://www.example.com"
                            icon={<Building className="h-5 w-5 text-gray-400"/>}
                            required={continueProps.createAgency}
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
        </>
    )
}