"use client";
import {JSX} from "react";
import {motion} from "framer-motion";
import {fadeInLeft, fadeInRight, fadeInUp} from "@/lib/animations/animationTool";
import {useInView} from "react-intersection-observer";

export default function StatisticSection(): JSX.Element

{
    const [statsRef, statsInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })


    return (
        <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="py-20 relative block"
        >

            <div
                className="absolute top-0 left-0 w-full overflow-hidden leading-[0] text-blue-600 transform rotate-180">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-20"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-current"
                    ></path>
                </svg>
            </div>
            <div className="bg-blue-600 ">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="py-5 text-3xl md:text-5xl font-bold mb-6 text-gray-900">Statistiques et
                            analyses</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Suivez les performances de vos voyages avec des statistiques détaillées et des analyses
                            en
                            temps réel.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div variants={fadeInLeft} className="bg-white p-8 rounded-lg shadow-md">
                            <div
                                className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Suivi des
                                réservations</h3>
                            <p className="text-gray-600 text-center">
                                Consultez le nombre de réservations par voyage, par période et par destination.
                                Identifiez vos voyages
                                les plus populaires.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-lg shadow-md">
                            <div
                                className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Analyse des
                                annulations</h3>
                            <p className="text-gray-600 text-center">
                                Suivez les taux d'annulation et comprenez les raisons pour améliorer vos offres et
                                réduire les
                                annulations futures.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInRight} className="bg-white p-8 rounded-lg shadow-md">
                            <div
                                className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Rapports
                                personnalisés</h3>
                            <p className="text-gray-600 text-center">
                                Générez des rapports personnalisés sur une période donnée pour analyser vos
                                performances
                                et prendre des
                                décisions éclairées.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeInUp} className="mt-12 text-center py-10">
                        <button
                            className="px-8 py-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                            Découvrir toutes les fonctionnalités
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}