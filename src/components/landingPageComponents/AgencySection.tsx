"use client"

import type { JSX } from "react"
import { motion } from "framer-motion"
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from "@/lib/animations/animationTool"
import { useInView } from "react-intersection-observer"
import { ClipboardList, Calendar, CheckCircle, Globe, Users, TrendingUp, Shield } from "lucide-react"

const FeatureItem = ({ icon: Icon, title, description }: { icon: JSX.Element; title: string; description: string }) => (
    <div className="flex items-start p-6 rounded-lg">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white flex items-center justify-center mr-5">
            {Icon}
        </div>
        <div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-white tracking-wide leading-snug">{description}</p>
        </div>
    </div>
)

const AdvantageItem = ({ icon: Icon, title, description }: { icon: JSX.Element; title: string; description: string }) => (
    <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
            {Icon}
        </div>
        <div>
            <h4 className="font-semibold text-xl">{title}</h4>
            <p className="text-white text-sm tracking-wide leading-snug">{description}</p>
        </div>
    </div>
)

export default function AgencySection(): JSX.Element {
    const [agencyRef, agencyInView] = useInView({ triggerOnce: false, threshold: 0.1 })

    const features = [
        {
            icon: <ClipboardList className="h-7 w-7 text-blue-600" />,
            title: "Planification de voyages",
            description: "Créez et planifiez facilement vos voyages avec notre interface intuitive. Définissez les dates, les itinéraires, les prix et les disponibilités en quelques clics."
        },
        {
            icon: <Calendar className="h-7 w-7 text-blue-600" />,
            title: "Publication et gestion",
            description: "Publiez vos voyages pour les rendre visibles aux clients potentiels. Modifiez ou annulez les voyages à tout moment selon vos besoins."
        },
        {
            icon: <CheckCircle className="h-7 w-7 text-blue-600" />,
            title: "Gestion des tickets",
            description: "Créez et gérez des tickets pour vos voyages. Offrez des coupons de réduction pour attirer plus de clients et fidéliser votre clientèle."
        },
    ]

    const advantages = [
        {
            icon: <Globe className="h-5 w-5 text-blue-600" />,
            title: "Visibilité internationale",
            description: "Atteignez des clients du monde entier"
        },
        {
            icon: <Users className="h-5 w-5 text-blue-600" />,
            title: "Gestion de clientèle",
            description: "Suivez les préférences de vos voyageurs"
        },
        {
            icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
            title: "Analyses détaillées",
            description: "Statistiques et rapports personnalisés"
        },
        {
            icon: <Shield className="h-5 w-5 text-blue-600" />,
            title: "Sécurité des transactions",
            description: "Paiements sécurisés et protection des données"
        },
    ]

    return (
        <motion.div
            ref={agencyRef}
            initial="hidden"
            animate={agencyInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="py-20 bg-blue-600 relative agency-section text-white"
        >
            <div className="container mx-auto px-4 md:px-6 z-10">
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">Pour les agences de voyages</h2>
                    <p className="text-xl text-white max-w-3xl mx-auto">
                        Moving.com offre aux agences de voyages une plateforme complète pour gérer leurs activités et développer leur clientèle.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-white">
                    <motion.div variants={fadeInLeft} className="order-2 md:order-1">
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <FeatureItem key={index} {...feature} />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInRight} className="order-1 md:order-2">
                        <div className="p-8 rounded-lg">
                            <h3 className="text-3xl font-extrabold mb-6 text-center">Avantages exclusifs</h3>
                            <div className="space-y-12">
                                {advantages.map((advantage, index) => (
                                    <AdvantageItem key={index} {...advantage} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
