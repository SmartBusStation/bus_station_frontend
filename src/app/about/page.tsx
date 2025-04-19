"use client";
import {JSX} from "react";
import {useTranslation} from "react-i18next";

export default function AboutUsPage(): JSX.Element
{
    const { t } = useTranslation("global");
    return(
        <div>
            {t('aboutUs.message')}
        </div>
    )
}