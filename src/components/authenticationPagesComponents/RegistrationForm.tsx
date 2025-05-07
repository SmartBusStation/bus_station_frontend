import {AnimatePresence, motion} from "framer-motion";
import BusinessActorForm from "@/components/authenticationPagesComponents/BusinessActorForm";
import OrganizationForm from "@/components/authenticationPagesComponents/OrganizationForm";
import TravelAgencyForm from "@/components/authenticationPagesComponents/TravelAgencyForm";
import Link from "next/link";
import React, {useState} from "react";
import { JSX } from "react";




export default function RegistrationForm({step, goBack, changeStep} : {step:number, goBack:()=>void, changeStep:(step:number)=>void}): JSX.Element
{
    const [createAgency, setCreateAgency] = useState<boolean>(false);
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    return (
        <div className="p-6 md:p-8">
            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`step-${step}`}
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 20}}
                        transition={{duration: 0.3}}
                        className="space-y-6"
                    >
                        {step === 1 && (
                            <BusinessActorForm
                                changeStep={changeStep}
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
                                    <h2 className="text-xl font-semibold text-gray-800">Choisissez votre type de
                                        compte</h2>
                                    <p className="text-gray-500 mt-2">
                                        Vous pourrez toujours modifier votre type de compte ultérieurement
                                    </p>
                                </div>
                                <OrganizationForm
                                    changeStep={changeStep}
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
                                    <h2 className="text-xl font-semibold text-gray-800">Détails de votre agence de
                                        voyage</h2>
                                    <p className="text-gray-500 mt-2">Ces informations seront visibles par les clients
                                        potentiels</p>
                                </div>
                                <TravelAgencyForm
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
            </div>
            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Vous avez déjà un compte ?{" "}
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    )
}