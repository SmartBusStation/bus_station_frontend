"use client"

import HeroSection from "@/components/landingPageComponents/HeroSection";
import AgencySection from "@/components/landingPageComponents/AgencySection";
import StatisticSection from "@/components/landingPageComponents/StatisticSection";
import FeatureSection from "@/components/landingPageComponents/FeatureSection";
import SecuritySection from "@/components/landingPageComponents/SecuritySection";
import CustomerSection from "@/components/landingPageComponents/CustomerSection";
import CTASection from "@/components/landingPageComponents/CTASection";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import React from "react";


export default function LandingPage() {

    return (
        <>
            <Header />

            <main className="flex flex-col min-h-screen overflow-hidden">

                {/* Section Hero */}
                <HeroSection />

                {/* Section Clients */}
                <CustomerSection />

                {/* Section Statistiques */}
                <StatisticSection />

                {/* Section Fonctionnalités */}
                <FeatureSection />

                {/* Section Sécurité */}
                <SecuritySection />

                {/* Section Agence */}
                <AgencySection />

                {/* Section Appel à l'action */}
                <CTASection />

            </main>

            {/* Pied de page */}
            <Footer />
        </>


    )
}
