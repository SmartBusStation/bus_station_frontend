"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {Lock, User } from "lucide-react"
import {useNavigation} from "@/lib/navigation";
import AnimateCircle from "@/components/authenticationPagesComponents/AnimateCircle";

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ username, password })
    }

    const navigation = useNavigation();

    return (
        <div className="h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center items-center p-4 md:p-8">
            <AnimateCircle/>
            {/* Conteneur principal */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                {/* En-tête */}
                <div onClick={navigation.goToHome} className="cursor-pointer bg-blue-600 p-6 text-white text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-2xl text-blue-600">M</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Connexion à Moving.com</h1>
                    <p className="text-blue-100 mt-2">Accédez à votre espace personnel</p>
                </div>

                {/* Formulaire */}
                <div className="p-6 md:p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Champ nom d'utilisateur */}
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Nom d'utilisateur
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Entrez votre nom d'utilisateur"
                                    required
                                />
                            </div>
                        </div>

                        {/* Champ mot de passe */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Options supplémentaires */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Se souvenir de moi
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                        </div>

                        {/* Bouton de connexion */}
                        <motion.button
                            type="submit"
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            Se connecter
                        </motion.button>
                    </form>

                    {/* Lien d'inscription */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Vous n'avez pas encore de compte ?{" "}
                            <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                                S'inscrire
                            </Link>
                        </p>
                    </div>

                    {/* Séparateur
                    <div className="mt-8 flex items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="px-4 text-gray-500 text-sm">ou continuer avec</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Boutons de connexion sociale
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <button
                            type="button"
                            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-5 w-5" fill="#4285F4" viewBox="0 0 24 24">
                                <path
                                    d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-5 w-5" fill="#000000" viewBox="0 0 24 24">
                                <path
                                    d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"/>
                            </svg>
                        </button>
                    </div>*/}
                </div>
            </motion.div>

            {/* Pied de page */}
            <p className="mt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} MangaLinks. Tous droits réservés.
            </p>
        </div>
    )
}
