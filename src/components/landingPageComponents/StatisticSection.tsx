"use client";
import {JSX} from "react";
import {motion} from "framer-motion";
import {fadeInLeft, fadeInRight, fadeInUp} from "@/lib/animations/animationTool";
import {useInView} from "react-intersection-observer";
import {FcCancel, FcStatistics} from "react-icons/fc";
import {HiDocumentReport} from "react-icons/hi";

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
            className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-18 md:py-18 statistic-section"
        >
            <div className="">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="py-5 text-3xl md:text-5xl font-bold mb-6 text-white">Statistiques et
                            analyses</h2>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            Suivez les performances de vos voyages avec des statistiques détaillées et des analyses
                            en
                            temps réel.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div variants={fadeInLeft} className="bg-white/90 p-8 rounded-xl shadow-xl hover:transform hover:-translate-y-6 transition duration-500">
                            <div className="flex justify-center mb-5">
                                <FcStatistics className="text-7xl "/>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Suivi des
                                réservations</h3>
                            <p className="text-gray-600 text-center">
                                Consultez le nombre de réservations par voyage, par période et par destination.
                                Identifiez vos voyages
                                les plus populaires.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}
                                    className="bg-white/90 p-8 rounded-xl shadow-xl hover:transform hover:-translate-y-6 transition duration-500">

                            <div className="flex justify-center mb-5">
                                <FcCancel className="text-7xl"/>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Analyse des
                                annulations</h3>
                            <p className="text-gray-600  text-center">
                                Suivez les taux d'annulation et comprenez les raisons pour améliorer vos offres et
                                réduire les
                                annulations futures.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInRight}
                                    className="bg-white/90 p-8 rounded-xl shadow-xl hover:transform hover:-translate-y-6 transition duration-500">

                            <div className="flex justify-center mb-5">
                                <HiDocumentReport className="text-7xl text-blue-600"/>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Rapports
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
                            className="px-8 py-4 bg-white  text-blue-800  font-bold rounded-3xl duration-300 cursor-pointer transition-colors animate-bounce">
                            Découvrir toutes les fonctionnalités
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}