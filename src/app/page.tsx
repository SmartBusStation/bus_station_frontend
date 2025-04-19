"use client";
import {JSX} from "react";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "@/lib/i18nUtils";

export default function LandingPage(): JSX.Element {

    const { t } = useTranslation("global");


    return (
        <main className="p-4 text-center">
            <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
            <p>{t('reserve')}</p>

            <div className="mt-4">
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => changeLanguage("fr")}
                >
                    🇫🇷 Français
                </button>
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() =>changeLanguage("en")}
                >
                    🇬🇧 English
                </button>
            </div>
        </main>
    );
}
