"use client"

import HeroSection from "@/components/landingPageComponents/HeroSection";
import AgencySection from "@/components/landingPageComponents/AgencySection";
import StatisticSection from "@/components/landingPageComponents/StatisticSection";
import FeatureSection from "@/components/landingPageComponents/FeatureSection";
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
                <HeroSection />
                <CustomerSection />
                <StatisticSection />
                <FeatureSection />
                <AgencySection />
                <CTASection />
            </main>
            <Footer />
        </>


    )
}
