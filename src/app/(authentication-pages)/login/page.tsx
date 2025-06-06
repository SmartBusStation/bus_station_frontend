"use client"

import React, {JSX} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {Lock, User } from "lucide-react";
import {useNavigation} from "@/lib/hooks/useNavigation";
import AnimateCircle from "@/ui/AnimateCircle";
import InputField from "@/ui/InputField";
import {useLogin} from "@/lib/hooks/useLogin";
import SocialConnexionButton from "@/components/authentication-pages-components/SocialConnexionButton";

export default function LoginPage(): JSX.Element {

    const {onLogin,...zodParams} = useLogin();
    const navigation = useNavigation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center items-center p-4 md:p-8">
            <AnimateCircle/>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3}}
                className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                <div onClick={navigation.goToHome} className="cursor-pointer bg-blue-600 p-6 text-white text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-2xl text-blue-600">B</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Login to Bus Station</h1>
                    <p className="text-blue-100 mt-2">Accédez à votre espace personnel</p>
                </div>
                <div className="p-6 md:p-8">
                    <form onSubmit={zodParams.handleSubmit(onLogin)}>

                        <div className="space-y-6 ">
                            <InputField
                                id={"username"}
                                label={"Username"}
                                placeholder={"Enter your username here"}
                                icon={<User className="h-5 w-5 text-gray-400"/>}
                                register={zodParams.register("username")}
                                error={zodParams.errors.username?.message}
                            />
                            <InputField
                                id={"password"}
                                label={"Password"}
                                placeholder={"Enter your password here"}
                                icon={<Lock className="h-5 w-5 text-gray-400"/>}
                                register={zodParams.register("password")}
                                error={zodParams.errors.password?.message}
                            />
                            <div className="flex items-center justify-end mb-6">
                                <div className="text-sm">
                                    <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
                                        Forgotten password ?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            Login
                        </motion.button>
                    </form>


                    {/* Lien d'inscription */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            You don't have an account yet ?{" "}
                            <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                                Register
                            </Link>
                        </p>
                    </div>

                    {/* Boutons de connexion sociale*/}
                    <SocialConnexionButton/>
                </div>
            </motion.div>
            <p className="mt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Bus Station. Tous droits réservés.
            </p>
        </div>
    )
}
