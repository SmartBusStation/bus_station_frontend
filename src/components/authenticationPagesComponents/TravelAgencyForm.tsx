import {Building, Globe, ImageIcon, Info, MapPin, Workflow} from "lucide-react";
import React, {JSX} from "react";
import {TravelAgencyFormProps} from "@/lib/type";
import Continue from "@/components/authenticationPagesComponents/Continue";
import InputField from "@/components/authenticationPagesComponents/InputField";
import TextareaField from "@/components/authenticationPagesComponents/TextareaField";


export default function TravelAgencyForm({agencyData, handleAgencyChange, organizationData,...continueProps}: TravelAgencyFormProps): JSX.Element
{
    const getValue = (primary: string, fallback = "") => primary ?? fallback;
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    id="agency_long_name"
                    name="long_name"
                    type="text"
                    label="Nom de l'agence"
                    placeholder="Voyages Extraordinaires"
                    value={getValue(agencyData.long_name, organizationData.long_name)}
                    onChange={handleAgencyChange}
                    icon={<Building className="h-5 w-5 text-gray-400" />}
                    required
                />
                <InputField
                    id="location"
                    name="location"
                    type="text"
                    label="Localisation principale"
                    placeholder="Paris, France"
                    value={agencyData.location}
                    onChange={handleAgencyChange}
                    icon={<MapPin className="h-5 w-5 text-gray-400" />}
                    required
                />
                <InputField
                    id="registration_number"
                    name="registration_number"
                    type="text"
                    label="Numéro d'immatriculation"
                    placeholder="IM075123456"
                    value={getValue(agencyData.registration_number, organizationData.business_registration_number)}
                    onChange={handleAgencyChange}
                    icon={<Workflow className="h-5 w-5 text-gray-400" />}
                    required
                />
                <InputField
                    id="agency_tax_number"
                    name="tax_number"
                    type="text"
                    label="Numéro fiscal"
                    placeholder="FR12345678901"
                    value={getValue(agencyData.tax_number, organizationData.tax_number)}
                    onChange={handleAgencyChange}
                    icon={<Workflow className="h-5 w-5 text-gray-400" />}
                    required
                />
                <InputField
                    id="social_network"
                    name="social_network"
                    type="text"
                    label="Réseaux sociaux (optionnel)"
                    placeholder="@voyages_extraordinaires"
                    value={getValue(agencyData.social_network, organizationData.social_network)}
                    onChange={handleAgencyChange}
                    icon={<Globe className="h-5 w-5 text-gray-400" />}
                />
            </div>
            <TextareaField
                id="description"
                name="description"
                label="Description de l'agence"
                placeholder="Décrivez votre agence et les services que vous proposez..."
                rows={3}
                value={getValue(agencyData.description, organizationData.description)}
                onChange={handleAgencyChange}
                icon={<Info className="h-5 w-5 text-gray-400" />}
                required
            />
            <TextareaField
                id="greeting_message"
                name="greeting_message"
                label="Message d'accueil"
                placeholder="Message qui sera affiché aux visiteurs de votre page..."
                rows={2}
                value={getValue(agencyData.greeting_message)}
                onChange={handleAgencyChange}
                icon={<Info className="h-5 w-5 text-gray-400" />}
                required
            />
            <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                    Logo de l'agence (optionnel)
                </label>
                <div className="flex items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4 border border-gray-300">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <input type="file" id="logo" name="logo" className="hidden" accept="image/*" />
                        <label
                            htmlFor="logo"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        >
                            Choisir un fichier
                        </label>
                        <p className="mt-1 text-xs text-gray-500">PNG, JPG ou GIF, max 2MB</p>
                    </div>
                </div>
            </div>
            <Continue agreeTerms={continueProps.agreeTerms} step={continueProps.step} goBack={continueProps.goBack} setAgreeTerms={continueProps.setAgreeTerms}/>
        </>
    )
}