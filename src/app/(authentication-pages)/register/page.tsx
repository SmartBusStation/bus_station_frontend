"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    Mail,
    Lock,
    User,
    Building2,
    Calendar,
    MapPin,
    CreditCard,
    Phone,
    Globe,
    Briefcase,
    ArrowRight,
    FileText,
    Home,
    MapPinned,
} from "lucide-react"
import UserType from "@/components/authenticationPagesComponents/UserType";

export default function RegisterPage() {
    const [userType, setUserType] = useState<"client" | "agency">("client")
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false)

    // État pour le formulaire client
    const [clientForm, setClientForm] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        city: "",
        idNumber: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    // État pour le formulaire agence
    const [agencyForm, setAgencyForm] = useState({
        agencyName: "",
        licenseNumber: "",
        address: "",
        otherLocations: "",
        managerName: "",
        email: "",
        phone: "",
        secondaryPhone: "",
        website: "",
        password: "",
        confirmPassword: "",
    })

    const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setClientForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleAgencyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setAgencyForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Logique d'inscription ici
        console.log(userType === "client" ? clientForm : agencyForm)
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const selectUserType = (type: "client" | "agency") => {
        setUserType(type)
        setIsDropdownOpen(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            {/* Éléments décoratifs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-blue-200 opacity-20"
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-blue-300 opacity-10"
                    animate={{
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
            </div>

            {/* Conteneur principal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                {/* En-tête */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-2xl text-blue-600">M</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Créer un compte Moving.com</h1>
                    <p className="text-blue-100 mt-2">Rejoignez notre communauté de voyageurs et d&#39;agences</p>
                </div>

                {/* Formulaire */}
                <div className="p-6 md:p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Sélecteur de type d'utilisateur */}
                        <UserType userType={userType} toggleDropdown={toggleDropdown} isDropdownOpen={isDropdownOpen} selectUserType={selectUserType}/>

                        {/* Formulaire pour client */}
                        {userType === "client" && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
                                    <p className="text-gray-500 text-sm">Veuillez remplir vos informations personnelles</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Prénom */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Prénom
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                value={clientForm.firstName}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Jean"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Nom */}
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                value={clientForm.lastName}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Dupont"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Date de naissance */}
                                    <div>
                                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                                            Date de naissance
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="birthDate"
                                                name="birthDate"
                                                type="date"
                                                value={clientForm.birthDate}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Ville de résidence */}
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                            Ville de résidence
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MapPin className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                value={clientForm.city}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Paris"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Numéro de CNI */}
                                    <div>
                                        <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                            Numéro de CNI
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CreditCard className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="idNumber"
                                                name="idNumber"
                                                type="text"
                                                value={clientForm.idNumber}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="123456789012"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Numéro de téléphone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Numéro de téléphone
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={clientForm.phone}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="+33 6 12 34 56 78"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Adresse email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={clientForm.email}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="votre@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Mot de passe */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Mot de passe
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={clientForm.password}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            8 caractères minimum, avec au moins une majuscule et un chiffre
                                        </p>
                                    </div>

                                    {/* Confirmation mot de passe */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirmer le mot de passe
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                value={clientForm.confirmPassword}
                                                onChange={handleClientChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Formulaire pour agence */}
                        {userType === "agency" && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Informations de l&#39;agence</h2>
                                    <p className="text-gray-500 text-sm">Veuillez remplir les informations de votre agence</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nom de l'agence */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="agencyName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom de l&#39;agence
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Building2 className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="agencyName"
                                                name="agencyName"
                                                type="text"
                                                value={agencyForm.agencyName}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Voyages Extraordinaires"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Numéro de licence */}
                                    <div>
                                        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                            Numéro d&#39;immatriculation / Licence
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FileText className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="licenseNumber"
                                                name="licenseNumber"
                                                type="text"
                                                value={agencyForm.licenseNumber}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="IM075123456"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Nom du responsable */}
                                    <div>
                                        <label htmlFor="managerName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom du responsable
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Briefcase className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="managerName"
                                                name="managerName"
                                                type="text"
                                                value={agencyForm.managerName}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Marie Dupont"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Adresse du siège */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                            Adresse du siège social
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Home className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                value={agencyForm.address}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="15 rue du Voyage, 75008 Paris"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Autres localisations */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="otherLocations" className="block text-sm font-medium text-gray-700 mb-2">
                                            Autres localisations / succursales (optionnel)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-3 left-3 pointer-events-none">
                                                <MapPinned className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <textarea
                                                id="otherLocations"
                                                name="otherLocations"
                                                value={agencyForm.otherLocations}
                                                onChange={handleAgencyChange}
                                                rows={3}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Listez vos autres adresses (une par ligne)"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email professionnel
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={agencyForm.email}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="contact@votreagence.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Site web */}
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                                            Site web (optionnel)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Globe className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="website"
                                                name="website"
                                                type="url"
                                                value={agencyForm.website}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="https://www.votreagence.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Téléphone principal */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone principal
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={agencyForm.phone}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="+33 1 23 45 67 89"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Téléphone secondaire */}
                                    <div>
                                        <label htmlFor="secondaryPhone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone secondaire (optionnel)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="secondaryPhone"
                                                name="secondaryPhone"
                                                type="tel"
                                                value={agencyForm.secondaryPhone}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="+33 6 12 34 56 78"
                                            />
                                        </div>
                                    </div>

                                    {/* Mot de passe */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Mot de passe
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={agencyForm.password}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            8 caractères minimum, avec au moins une majuscule et un chiffre
                                        </p>
                                    </div>

                                    {/* Confirmation mot de passe */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirmer le mot de passe
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                value={agencyForm.confirmPassword}
                                                onChange={handleAgencyChange}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Conditions d'utilisation */}
                        <div className="mt-8">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={() => setAgreeTerms(!agreeTerms)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="text-gray-700">
                                        J&#39;accepte les{" "}
                                        <Link href="/term-and-conditions" className="text-blue-600 hover:text-blue-800 font-medium">
                                            conditions d&#39;utilisation
                                        </Link>{" "}
                                        et la{" "}
                                        <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 font-medium">
                                            politique de confidentialité
                                        </Link>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Bouton d'inscription */}
                        <div className="mt-8">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!agreeTerms}
                                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                                    agreeTerms
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                } transition-colors`}
                            >
                                Créer mon compte
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </motion.button>
                        </div>
                    </form>

                    {/* Lien de connexion */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Vous avez déjà un compte ?{" "}
                            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Pied de page */}
            <p className="mt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Moving.com. Tous droits réservés.
            </p>
        </div>
    )
}
