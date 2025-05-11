"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {useNavigation} from "@/lib/hooks/useNavigation";
import ProgressStepBar from "@/components/authenticationPagesComponents/ProgressStepBar";
import AnimateCircle from "@/ui/AnimateCircle";
import RegistrationForm from "@/components/authenticationPagesComponents/RegistrationForm";



export default function RegisterPage() {

    const [step, setStep] = useState<number>(1);
    function goBack () :void
    {
        if (step > 1) {
            setStep(step - 1)
        }
    }



    const navigation = useNavigation();

    return (
        <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8`}>
            <AnimateCircle/>
            <div className="max-w-4xl mx-auto">
                <ProgressStepBar step={step}/>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div onClick={navigation.goToHome} className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white text-center">
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
                <RegistrationForm step={step} goBack={goBack} changeStep={setStep}/>
                </motion.div>
                <p className="mt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Tous droits réservés.
                </p>
            </div>
        </div>
    )
}
