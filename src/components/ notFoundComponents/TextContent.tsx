import {JSX} from "react";
import {motion} from "framer-motion";
import {itemVariants} from "@/lib/animations/animationTool";

export default function TextContent(): JSX.Element
{
    return (
        <div>
            <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" variants={itemVariants}>
                Destination introuvable
            </motion.h1>

            <motion.p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto" variants={itemVariants}>
                Oups ! Il semble que vous vous soyez égaré. Cette page n'existe pas ou a été déplacée.
            </motion.p>
        </div>
    )
}