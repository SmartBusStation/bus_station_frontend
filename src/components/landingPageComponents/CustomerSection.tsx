"use client";


import {JSX} from "react";
import {motion} from "framer-motion";
import {fadeInLeft, fadeInRight, fadeInUp, staggerContainer} from "@/lib/animations/animationTool";
import Image from "next/image";
import {useInView} from "react-intersection-observer";

export default function CustomerSection(): JSX.Element
{
    const [customerRef, customerInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })


    return (
        <motion.div
            ref={customerRef}
            initial="hidden"
            animate={customerInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="py-5 bg-white flex flex-col"
        >
            <div className="container mx-auto px-4 md:px-6">
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Pour les voyageurs</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Découvrez une nouvelle façon de réserver vos voyages, simple, sécurisée et flexible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div variants={fadeInLeft}>
                        <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src="/guest-filling-registration-forms.jpg"
                                alt="Interface voyageur"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInRight}>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">Recherche facile</h3>
                                    <p className="text-gray-600">
                                        Trouvez rapidement des voyages qui correspondent à vos critères grâce à notre
                                        moteur de recherche
                                        avancé.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">Paiement flexible</h3>
                                    <p className="text-gray-600">
                                        Payez en partie ou en totalité selon votre budget, avec des options de paiement
                                        sécurisées via
                                        Orange Money et Mobile Money.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">Gestion des réservations</h3>
                                    <p className="text-gray-600">
                                        Réservez une ou plusieurs places, annulez ou modifiez vos réservations
                                        facilement depuis votre
                                        espace personnel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </motion.div>
    )
}