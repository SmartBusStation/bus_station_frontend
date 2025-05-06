"use client"

import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import {BusinessActor, Organization, TravelAgency} from "@/lib/type";
import {useNavigation} from "@/lib/navigation";
import BusinessActorForm from "@/components/authenticationPagesComponents/BusinessActorForm";
import OrganizationForm from "@/components/authenticationPagesComponents/OrganizationForm";
import TravelAgencyForm from "@/components/authenticationPagesComponents/TravelAgencyForm";
import ProgressStepBar from "@/components/authenticationPagesComponents/ProgressStepBar";
import AnimateCircle from "@/components/authenticationPagesComponents/AnimateCircle";



export default function RegisterPage() {

    const [step, setStep] = useState<number>(1);
    const [createAgency, setCreateAgency] = useState<boolean>(false);
    const [businessActorData, setBusinessActorData] = useState<Partial<BusinessActor>>({
        is_individual: true,
        type: "CONSUMER",
        gender: "MALE",
    });

    const [organizationData, setOrganizationData] = useState<Partial<Organization>>({
        type: "SOLE_PROPRIETORSHIP",
        business_domains: [],
        keywords: [],
        number_of_employees: 1,
    });

    const [agencyData, setAgencyData] = useState<Partial<TravelAgency>>({
        business_domains: [],
        transferable: true,
        images: [],
        average_revenue: 0,
        capital_share: 0,
    });



   const navigation = useNavigation();
   const [confirmPassword, setConfirmPassword] = useState<string>("");


    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2)
        } else if (step === 2) {
            if (createAgency) {
                setStep(3);
            } else {
                console.log("Submitting user data:", businessActorData)
            }
        } else if (step === 3) {
            console.log("Submitting complete data:", {
                businessActor: businessActorData,
                organization: organizationData,
                agency: agencyData,
            })

        }
    }


    function handleBusinessActorChange  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>):void
    {
        const { name, value } = e.target
        setBusinessActorData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    function handleOrganizationChange  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,) :void
    {
        const { name, value } = e.target
        setOrganizationData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle agency form changes
    function  handleAgencyChange (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>):void
    {
        const { name, value } = e.target
        setAgencyData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    function goBack () :void
    {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            {/* Background elements */}
            <AnimateCircle/>

            {/* Main container */}
            <div className="max-w-4xl mx-auto">
               <ProgressStepBar step={step}/>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center">
                                <span className="font-bold text-2xl text-blue-600">M</span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold">Créer un compte Moving.com</h1>
                        <p className="mt-2 font-semibold text-white">Rejoignez notre communauté de voyageurs et d'agences</p>
                        <p className="text-white mt-2">
                            {step === 1 && "Commençons par vos informations personnelles"}
                            {step === 2 && "Choisissez votre type de compte"}
                            {step === 3 && "Configurez votre agence de voyage"}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`step-${step}`}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    {step === 1 && (
                                        <BusinessActorForm
                                            businessActorData={businessActorData}
                                            handleBusinessActorChange={handleBusinessActorChange}
                                            confirmPassword={confirmPassword}
                                            setConfirmPassword={setConfirmPassword}
                                            agreeTerms={agreeTerms}
                                            step={step}
                                            setAgreeTerms={setAgreeTerms}
                                            createAgency={createAgency}
                                            goBack={goBack}
                                        />
                                    )}

                                    {step === 2 && (
                                        <>
                                            <div className="text-center mb-6">
                                                <h2 className="text-xl font-semibold text-gray-800">Choisissez votre type de compte</h2>
                                                <p className="text-gray-500 mt-2">
                                                    Vous pourrez toujours modifier votre type de compte ultérieurement
                                                </p>
                                            </div>
                                            <OrganizationForm
                                                organizationData={organizationData}
                                                handleOrganizationChange={handleOrganizationChange}
                                                createAgency={createAgency}
                                                setCreateAgency={setCreateAgency}
                                                agreeTerms={agreeTerms}
                                                step={step}
                                                setAgreeTerms={setAgreeTerms}
                                                goBack={goBack}
                                            />
                                        </>
                                    )}

                                    {step === 3 && (
                                        <>
                                            <div className="text-center mb-6">
                                                <h2 className="text-xl font-semibold text-gray-800">Détails de votre agence de voyage</h2>
                                                <p className="text-gray-500 mt-2">Ces informations seront visibles par les clients potentiels</p>
                                            </div>
                                            <TravelAgencyForm
                                                agencyData={agencyData}
                                                handleAgencyChange={handleAgencyChange}
                                                organizationData={organizationData}
                                                agreeTerms={agreeTerms}
                                                step={step}
                                                setAgreeTerms={setAgreeTerms}
                                                createAgency={createAgency}
                                                goBack={goBack}
                                            />
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </form>
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Vous avez déjà un compte ?{" "}
                                <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
                <p className="mt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Tous droits réservés.
                </p>
            </div>
        </div>
    )
}
