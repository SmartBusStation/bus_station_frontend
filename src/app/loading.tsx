"use client"

import { motion } from "framer-motion"

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center z-50">
            <div className="w-full max-w-md px-4">
                {/* Logo Animation */}
                <motion.div
                    className="flex justify-center items-center mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="relative h-16 w-16 mr-2 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">M</span>
                    </div>
                    <span className="text-3xl font-bold text-blue-600">Moving.com</span>
                </motion.div>

                {/* Main Animation Container */}
                <div className="relative h-32 mb-8">
                    {/* Map Path */}
                    <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid meet">
                        <motion.path
                            d="M20,50 C60,20 120,80 180,40 C240,0 300,60 380,30"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="2"
                            strokeDasharray="6 3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
                        />


                        {/* Starting Point */}
                        <motion.circle
                            cx="20"
                            cy="50"
                            r="5"
                            fill="#2563EB"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </svg>

                    {/* Airplane Animation */}
                    <motion.div
                        className="absolute top-1/2 left-0 transform -translate-y-1/2"
                        initial={{ x: -100, y: 0, opacity: 0 }}
                        animate={{
                            x: 100,
                            y: [0, -20, 0, -10, 0],
                            opacity: 1,
                        }}
                        transition={{
                            x: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                            y: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                            opacity: { duration: 0.5 },
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22 16.5H8.3C7.5 16.5 6.8 16.1 6.4 15.5L2 8.5L6.4 1.5C6.8 0.9 7.5 0.5 8.3 0.5H22C22.6 0.5 23 0.9 23 1.5V15.5C23 16.1 22.6 16.5 22 16.5Z"
                                fill="#2563EB"
                            />
                            <path d="M2 8.5H22V15.5C22 16.1 21.6 16.5 21 16.5H8.3C7.5 16.5 6.8 16.1 6.4 15.5L2 8.5Z" fill="#1d4ed8" />
                            <path d="M6.5 8.5H2L6.4 1.5C6.8 0.9 7.5 0.5 8.3 0.5H12.5L6.5 8.5Z" fill="#3b82f6" />
                        </svg>
                    </motion.div>
                </div>

                {/* Loading Text */}
                <div className="text-center">
                    <p className="text-blue-600 font-medium text-lg mb-2">Chargement en cours</p>
                    <div className="flex justify-center items-center space-x-1">
                        <motion.div
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0 }}
                        />
                        <motion.div
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.2 }}
                        />
                        <motion.div
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.4 }}
                        />
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-6 overflow-hidden">
                    <motion.div
                        className="bg-blue-600 h-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </div>
    )
}
