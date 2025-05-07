import React from "react";

export interface ReactNodeProps  {
    children: React.ReactNode
}

export interface TranslationProps  {
    t: (key: string) => string
}

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type SupportedLanguage = 'en' | 'fr';