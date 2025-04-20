'use client';
import i18next from './i18n';

export function changeLanguage (lang: string): void
{
    i18next.changeLanguage(lang).then(() => {});
    localStorage.setItem('language', lang);
}
