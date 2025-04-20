"use client";



import {JSX} from "react";
import {motion} from "framer-motion";
import {fadeInUp} from "@/lib/animations/animationTool";
import {useInView} from "react-intersection-observer";

export default function CTASection(): JSX.Element
{
    const [ctaRef, ctaInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })

    return (
        <motion.div
            ref={ctaRef}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="py-30 bg-blue-800 text-white relative"
        >
            {/* Séparateur en zigzag*/}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" fillOpacity="1.0" d="M0,0L1440,64L1440,0L0,0Z"></path>
                </svg>
            </div>
            <div className="container mx-auto px-4 md:px-6 text-center">
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
                    Prêt à simplifier vos voyages ?
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-xl mb-10 max-w-3xl mx-auto text-blue-100">
                    Rejoignez Moving.com dès aujourd'hui et découvrez une nouvelle façon de voyager, plus simple, plus
                    sûre et
                    plus agréable.
                </motion.p>
                <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                    <button
                        className="px-8 py-4 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors">
                        S'inscrire gratuitement
                    </button>
                    <button
                        className="px-8 py-4 bg-transparent border border-white text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                        En savoir plus
                    </button>
                </motion.div>
            </div>

            {/* Séparateur arrondi
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block w-full h-[60px]"
                    >
                        <path
                            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                            fill="#111827"
                        ></path>
                    </svg>
                </div>*/}
        </motion.div>
    )
}