"use client"

import { motion } from "framer-motion"
import {JSX, useEffect, useState} from "react"
import NotFoundAnimation from "@/components/ notFoundComponents/NotFoundAnimation";
import {containerVariants} from "@/lib/animations/animationTool";
import TextContent from "@/components/ notFoundComponents/TextContent";
import ActionButton from "@/components/ notFoundComponents/ActionButton";



export default function NotFound(): JSX.Element | null {
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        setMounted(true)
    }, [])





    if (!mounted) return null

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
            <motion.div
                className="max-w-3xl w-full text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <NotFoundAnimation/>
                <TextContent/>
                <ActionButton/>
            </motion.div>
        </div>
    )
}
