"use client";
import {JSX} from "react";
import {motion} from "framer-motion";
import {fadeInLeft, fadeInRight, fadeInUp, staggerContainer} from "@/lib/animations/animationTool";
import Image from "next/image";
import {useInView} from "react-intersection-observer";

export default function AgencySection (): JSX.Element
{

    const [agencyRef, agencyInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })

    return (
        <motion.div
            ref={agencyRef}
            initial="hidden"
            animate={agencyInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="py-20 bg-white relative"
        >
            <div className="container mx-auto px-4 md:px-6">
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Pour les agences de voyages</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Moving.com offre aux agences de voyages une plateforme complète pour gérer leurs activités et
                        développer
                        leur clientèle.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div variants={fadeInLeft} className="order-2 md:order-1">
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
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">Planification de voyages</h3>
                                    <p className="text-gray-600">
                                        Créez et planifiez facilement vos voyages avec notre interface intuitive.
                                        Définissez les dates,
                                        les itinéraires, les prix et les disponibilités en quelques clics.
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
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">Publication et gestion</h3>
                                    <p className="text-gray-600">
                                        Publiez vos voyages pour les rendre visibles aux clients potentiels. Modifiez ou
                                        annulez les
                                        voyages à tout moment selon vos besoins.
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
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">Gestion des tickets</h3>
                                    <p className="text-gray-600">
                                        Créez et gérez des tickets pour vos voyages. Offrez des coupons de réduction
                                        pour attirer plus de
                                        clients et fidéliser votre clientèle.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInRight} className="order-1 md:order-2">
                        <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src="/placeholder.svg?height=500&width=600"
                                alt="Interface agence de voyage"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Séparateur ondulé */}

        </motion.div>
    )
}