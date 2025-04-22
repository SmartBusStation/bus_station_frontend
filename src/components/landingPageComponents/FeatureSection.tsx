"use client"

import type React from "react"

import { type JSX, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { DollarSign, MessageSquare, Star, Ticket, Shield, Layout } from "lucide-react"
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/lib/animations/animationTool"

export default function FeatureSection(): JSX.Element {
    const [featuresRef, featuresInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })


    const features = [
        {
            icon: DollarSign,
            title: "Gestion financière",
            description:
                "Suivez vos revenus, gérez les paiements partiels et complets, et offrez des options de paiement flexibles à vos clients.",
            animation: fadeInLeft,
        },
        {
            icon: MessageSquare,
            title: "Chat intégré",
            description:
                "Communiquez directement avec vos clients via notre système de chat intégré pour répondre à leurs questions et finaliser les détails.",
            animation: fadeInUp,
        },
        {
            icon: Star,
            title: "Système d'avis",
            description:
                "Recevez des avis de vos clients et construisez votre réputation. Les avis positifs vous aideront à attirer plus de voyageurs.",
            animation: fadeInRight,
        },
        {
            icon: Ticket,
            title: "Coupons et promotions",
            description:
                "Créez des coupons de réduction et des offres promotionnelles pour stimuler les ventes pendant les périodes creuses.",
            animation: fadeInLeft,
        },
        {
            icon: Shield,
            title: "Sécurité avancée",
            description:
                "Protégez vos données et celles de vos clients avec notre système de sécurité avancé et nos paiements sécurisés.",
            animation: fadeInUp,
        },
        {
            icon: Layout,
            title: "Interface intuitive",
            description:
                "Profitez d'une interface utilisateur intuitive et facile à utiliser, conçue pour simplifier la gestion de vos voyages.",
            animation: fadeInRight,
        },
    ]

    return (
        <motion.div
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="relative bg-white text-white py-5"
        >
            <div className="container mx-auto px-4 md:px-6">
                <motion.h2 variants={fadeInUp}
                           className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    Fonctionnalités principales
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            variants={feature.animation}
                        />
                    ))}
                </div>
            </div>

            <motion.div variants={fadeInUp} className="mt-12 text-center py-10">
                <button
                    className="px-8 py-4 bg-blue-600  text-white  font-bold rounded-3xl duration-300 cursor-pointer transition-colors hover:bg-blue-800 transition-all duration-500 animate-bounce">
                    Découvrir toutes les fonctionnalités
                </button>
            </motion.div>
        </motion.div>
    )
}

interface FeatureCardProps {
    icon: React.ElementType
    title: string
    description: string
    variants: any
}

function FeatureCard({icon: Icon, title, description, variants}: FeatureCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            variants={variants}
            className="bg-gray-100 p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all hover:transform hover:-translate-y-4 transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col items-center text-center">
                <motion.div
                    className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4"
                    animate={isHovered ? {scale: 1.1, backgroundColor: "#dbeafe"} : {scale: 1}}
                    transition={{duration: 0.3}}
                >
                    <Icon className="h-8 w-8 text-blue-600" strokeWidth={isHovered ? 2.5 : 2}/>
                </motion.div>
                <motion.h3
                    className="text-xl font-bold mb-3 text-gray-900"
                    animate={isHovered ? {color: "#2563eb"} : {color: "#111827"}}
                    transition={{duration: 0.3}}
                >
                    {title}
                </motion.h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </motion.div>
    )
}
