"use client"

import { JSX, useState } from "react"
import Link from "next/link"
import {MapPin, Mail, Phone, Globe, ChevronDown, Clock,} from "lucide-react"
import {FiFacebook, FiInstagram, FiLinkedin, FiTwitter} from "react-icons/fi";

const quickLinks = ["Voyages", "Agences", "À propos", "Contact"]
const legalLinks = [
    "Conditions d'utilisation", "Politique de confidentialité", "Cookies", "FAQ"
]

const socialMedia = [
    { href: "https://facebook.com", icon:  FiFacebook, color: "hover:bg-blue-600" },
    { href: "https://twitter.com", icon: FiTwitter, color: "hover:bg-blue-400" },
    { href: "https://instagram.com", icon: FiInstagram, color: "hover:bg-pink-600" },
    { href: "https://linkedin.com", icon: FiLinkedin, color: "hover:bg-blue-700" }
]

const contactInfo = [
    { icon: MapPin, text: "BP 9878, 75001 Yaounde, Cameroon" },
    { icon: Mail, text: "contact@moving.com", link: "mailto:contact@moving.com" },
    { icon: Phone, text: "+237 6 98 45 67 89", link: "tel:+33123456789" },
    { icon: Clock, text: "Lun-Ven: 9h-18h" }
]

const languages = ["Français", "English"]

const FooterLink = ({ text }: { text: string }) => (
    <li>
        <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
            {text}
        </Link>
    </li>
)

const SocialLink = ({ href, icon: Icon, color }: any) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-gray-800 ${color} w-10 h-10 rounded-full flex items-center justify-center transition-colors`}
    >
        <Icon size={18} />
    </Link>
)

const LanguageOption = ({ lang }: { lang: string }) => (
    <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
        {lang}
    </button>
)

export default function Footer(): JSX.Element {
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

    return (
        <footer className="bg-gray-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Haut du footer */}
                <div className="flex flex-col md:flex-row justify-between mb-12">
                    <div className="mb-8 md:mb-0 md:max-w-sm">
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                                <span className="font-bold text-xl">M</span>
                            </div>
                            <h2 className="text-2xl font-bold">Moving.com</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            La plateforme qui connecte les agences de voyages et les voyageurs pour une expérience de réservation fluide et sécurisée.
                        </p>

                        <div>
                            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Suivez-nous</h4>
                            <div className="flex space-x-4">
                                {socialMedia.map((s, i) => (
                                    <SocialLink key={i} {...s} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Colonnes de liens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:ml-10">
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-2">Liens rapides</h3>
                            <ul className="space-y-2">
                                {quickLinks.map((l, i) => <FooterLink key={i} text={l} />)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-2">Légal</h3>
                            <ul className="space-y-2">
                                {legalLinks.map((l, i) => <FooterLink key={i} text={l} />)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-2">Contact</h3>
                            <ul className="space-y-3">
                                {contactInfo.map(({ icon: Icon, text, link }, i) => (
                                    <li key={i} className="flex items-start text-gray-400">
                                        <Icon className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                                        {link ? (
                                            <a href={link} className="hover:text-blue-400 transition-colors">{text}</a>
                                        ) : (
                                            <span>{text}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bas du footer */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Moving.com. Tous droits réservés.
                    </p>

                    {/* Sélecteur de langue */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                            className="flex items-center text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-md border border-gray-700 hover:border-gray-600"
                        >
                            <Globe className="h-4 w-4 mr-2" />
                            <span className="mr-1">Français</span>
                            <ChevronDown className="h-3 w-3" />
                        </button>

                        {isLanguageMenuOpen && (
                            <div className="absolute right-0 bottom-full mb-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                                <div className="py-1">
                                    {languages.map((lang, i) => (
                                        <LanguageOption key={i} lang={lang} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}
