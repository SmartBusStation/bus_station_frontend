"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Users, Calendar } from "lucide-react"
import {fadeInUp, staggerContainer} from "@/lib/animations/animationTool";
import {JSX} from "react";

export default function CTASection():JSX.Element {



    const [ctaRef, ctaInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })


    return (
        <motion.div
            ref={ctaRef}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="bg-white w-full py-20 overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6">
                <motion.div variants={fadeInUp} className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-blue-600">
                        Prêt à simplifier <span className="text-blue-600">vos voyages</span> et{" "}
                        <span className="text-blue-600">vos réservations</span> ?
                    </h2>

                    <p className="text-xl mb-8 text-gray-700 mx-auto">
                        Rejoignez Moving.com dès aujourd'hui et découvrez une nouvelle façon de gérer vos voyages, plus simple, plus
                        sûre et plus agréable.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            className="cursor-pointer px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:text-white hover:bg-blue-600 duration-500 transition-all flex items-center gap-2"
                        >
                            <Calendar size={20}/>
                            Planifier un voyage
                        </button>

                        <button
                            className="cursor-pointer px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-800 transition-all duration-500 flex items-center gap-2"
                        >
                            <Users size={20}/>
                            S'inscrire gratuitement
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
