"use client"

import React, { JSX, useState } from "react"
import Link from "next/link"
import {MapPin, Mail, Phone, Globe, ChevronDown, Clock,} from "lucide-react"
import {FiFacebook, FiInstagram, FiLinkedin, FiTwitter} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "@/lib/services/i18n-services/languageService";
import {LinkListProps, SocialLinkProps} from "@/lib/types/ui";
import {SupportedLanguage} from "@/lib/types/common";

const FooterLink = ( linkList : LinkListProps) => (
    <li>
        <Link href={linkList.link} className="text-gray-400 hover:text-blue-400 transition-colors flex items-center text-sm">
            <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
            {linkList.name}
        </Link>
    </li>
)

const SocialLink = ({ href, icon: Icon, color }: SocialLinkProps) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-gray-800 ${color} w-8 h-8 rounded-full flex items-center justify-center transition-colors`}
    >
        <Icon size={16} />
    </Link>
)

export default function Footer(): JSX.Element {
    const { t, i18n } = useTranslation();
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);
    const languages: SupportedLanguage[] = ["fr", "en"]

    function updateLanguage(lang:SupportedLanguage):void {
        changeLanguage(lang);
        setIsLanguageMenuOpen(false);
    }

    function translate(key:string):string {
        return t("footer." + key);
    }

    const quickLinks = [
        {name: translate("trip"), link: "/market-place"},
        {name:translate("agency"), link:"/agency"},
        {name:translate("about-us"), link:"/about"},
        {name:translate("contact-us"), link:"/contact-us"},
    ];
    const legalLinks = [
        { name: translate("terms-and-condition"), link: "/term-and-conditions" },
        { name: translate("privacy-policy"), link: "/privacy-policy" },
        { name: translate("cookies"), link: "/cookies" },
        { name: translate("faq"), link: "/faq" },
    ];

    const socialMedia = [
        { href: "https://facebook.com", icon:  FiFacebook, color: "hover:bg-primary" },
        { href: "https://twitter.com", icon: FiTwitter, color: "hover:bg-primary" },
        { href: "https://instagram.com", icon: FiInstagram, color: "hover:bg-primary" },
        { href: "https://linkedin.com", icon: FiLinkedin, color: "hover:bg-primary" }
    ];

    const contactInfo = [
        { icon: MapPin, text: "BP 9878, 75001 Yaounde, Cameroon" },
        { icon: Mail, text: "contact@busstation.com", link: "mailto:contact@busstation.com" },
        { icon: Phone, text: "+237 6 98 45 67 89" },
        { icon: Clock, text: translate("schedule") }
    ];

    const LanguageOption = ({ lang }: { lang: SupportedLanguage }) => (
        <button onClick={()=> updateLanguage(lang)} className="block w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-700 hover:text-white">
            {lang.toUpperCase()}
        </button>
    )

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                {/* Haut du footer compacté */}
                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <div className="mb-6 md:mb-0 md:max-w-xs">
                        <div className="flex items-center mb-3">
                            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center mr-2">
                                <span className="font-bold text-lg">B</span>
                            </div>
                            <h2 className="text-xl font-bold text-white">Bus Station</h2>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 leading-snug">
                            {translate("slogan")}
                        </p>

                        <div>
                            <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider text-gray-500">{translate("followUs")}</h4>
                            <div className="flex space-x-3">
                                {socialMedia.map((s, i) => (
                                    <SocialLink key={i} {...s} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Grille de liens compactée */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:ml-4">
                        <div>
                            <h3 className="text-sm font-bold mb-3 border-b border-gray-800 pb-1 text-white">{translate("quickLink")}</h3>
                            <ul className="space-y-1.5">
                                {quickLinks.map((item, index) => <FooterLink key={index} link={item.link} name={item.name}/>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold mb-3 border-b border-gray-800 pb-1 text-white">{translate("legal")}</h3>
                            <ul className="space-y-1.5">
                                {legalLinks.map((item, index) => <FooterLink key={index} link={item.link} name={item.name} />)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold mb-3 border-b border-gray-800 pb-1 text-white">{translate("contact")}</h3>
                            <ul className="space-y-1.5">
                                {contactInfo.map(({ icon: Icon, text, link }, i) => (
                                    <li key={i} className="flex items-start text-gray-400 text-sm">
                                        <Icon className="h-4 w-4 mr-2 text-blue-500 shrink-0 mt-0.5" />
                                        {link ? (
                                            <a href={link} className="hover:text-blue-400 transition-colors">{text}</a>
                                        ) : (
                                            <span className="leading-tight">{text}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bas du footer compacté */}
                <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-xs mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} {translate("allRight")}
                    </p>

                    {/* Sélecteur de langue */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                            className="flex items-center text-gray-400 hover:text-white transition-colors px-2 py-1.5 rounded-md border border-gray-700 hover:border-gray-600 text-xs"
                        >
                            <Globe className="h-3 w-3 mr-1.5" />
                            <span className="mr-1">{(i18n.language || 'fr').toUpperCase()}</span>
                            <ChevronDown className="h-2 w-2" />
                        </button>

                        {isLanguageMenuOpen && (
                            <div className="absolute right-0 bottom-full mb-2 w-32 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 text-xs">
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