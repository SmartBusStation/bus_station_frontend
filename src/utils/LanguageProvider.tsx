'use client';

import React, {JSX, useEffect, useState} from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from '../lib/i18n/i18n';

interface Props {children: React.ReactNode}

export default function LanguageProvider({ children }: Props): JSX.Element {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('language') || 'en';
        i18next.changeLanguage(savedLang).then(() => {
            setIsLoaded(true);
        });
    }, []);

    if (!isLoaded) return <div>Chargement ...</div>;
    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
