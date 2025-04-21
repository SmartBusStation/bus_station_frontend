"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {JSX, useEffect, useState} from "react"
import { MapPin, Home, ArrowLeft, Compass } from "lucide-react"

export default function NotFound(): JSX.Element|null
{
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        setMounted(true)
    }, [])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    }

    const pinVariants = {
        initial: { y: -20, opacity: 0 },
        animate: {
            y: [0, -15, 0, -10, 0],
            opacity: 1,
            transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
            },
        },
    }

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
            },
        },
    }

    const cloudVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeOut",
            },
        },
    }

    const planeVariants = {
        hidden: { x: -100, y: 50, opacity: 0 },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
        hover: {
            y: -5,
            x: 5,
            transition: {
                duration: 0.3,
                yoyo: Number.POSITIVE_INFINITY,
            },
        },
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
            <motion.div
                className="max-w-3xl w-full text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Animated SVG Scene */}
                <motion.div
                    className="w-full h-64 md:h-80 mb-8 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Background Elements */}
                    <motion.svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                        {/* Clouds */}
                        <motion.g variants={cloudVariants}>
                            <path
                                d="M170,100 Q190,60 220,90 Q240,60 270,80 Q290,70 300,90 Q330,80 340,100 Q360,90 370,110 Q350,130 320,120 Q310,140 280,130 Q260,150 230,130 Q210,140 190,120 Q170,130 170,100"
                                fill="#E6F0FF"
                                stroke="#D1E3FF"
                                strokeWidth="2"
                            />
                        </motion.g>

                        <motion.g variants={cloudVariants}>
                            <path
                                d="M570,70 Q590,30 620,60 Q640,30 670,50 Q690,40 700,60 Q730,50 740,70 Q760,60 770,80 Q750,100 720,90 Q710,110 680,100 Q660,120 630,100 Q610,110 590,90 Q570,100 570,70"
                                fill="#E6F0FF"
                                stroke="#D1E3FF"
                                strokeWidth="2"
                            />
                        </motion.g>

                        {/* Path/Road */}
                        <motion.path
                            d="M100,280 C200,250 300,290 400,240 C500,190 600,220 700,200"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="4"
                            strokeDasharray="8 4"
                            variants={pathVariants}
                        />

                        {/* 404 Text */}
                        <motion.text
                            x="400"
                            y="150"
                            textAnchor="middle"
                            fontSize="80"
                            fontWeight="bold"
                            fill="#2563EB"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: 0.8,
                                    ease: "easeOut",
                                },
                            }}
                        >
                            404
                        </motion.text>

                        {/* Airplane */}
                        <motion.g variants={planeVariants} whileHover="hover">
                            <path d="M650,120 L670,110 L680,120 L670,130 Z" fill="#2563EB" />
                            <path d="M655,120 L640,115 L630,120 L640,125 Z" fill="#2563EB" />
                            <path d="M650,110 L650,130" stroke="#2563EB" strokeWidth="1" />
                        </motion.g>
                    </motion.svg>

                    {/* Pin Drop Animation */}
                    <motion.div
                       // variants={pinVariants}
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        initial="initial"
                        animate="animate"

                    >
                        <MapPin size={48} className="text-red-500 drop-shadow-md" />
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" variants={itemVariants}>
                    Destination introuvable
                </motion.h1>

                <motion.p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto" variants={itemVariants}>
                    Oups ! Il semble que vous vous soyez égaré. Cette page n'existe pas ou a été déplacée.
                </motion.p>

                {/* Action Buttons */}
                <motion.div className="flex flex-col md:flex-row gap-4 justify-center" variants={itemVariants}>
                    <Link href="/">
                        <motion.button
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Home size={18} />
                            Retour à l'accueil
                        </motion.button>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Page précédente
                    </button>
                </motion.div>

                {/* Animated Compass */}
                <motion.div className="mt-12 flex justify-center" variants={itemVariants}>
                    <motion.div
                        animate={{
                            rotate: 360,
                            transition: {
                                duration: 20,
                                ease: "linear",
                                repeat: Number.POSITIVE_INFINITY,
                            },
                        }}
                    >
                        <Compass size={40} className="text-blue-600 opacity-70" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}
