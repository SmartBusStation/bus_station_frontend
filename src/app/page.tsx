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

export default function LandingPage() {

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

            {/* Hero Section */}
            <HeroSection/>

            {/* Agency Section */}
            <AgencySection/>

            {/* Statistics Section */}
            <StatisticSection/>

            {/* Features Section */}
            <FeatureSection/>

            {/* Security Section */}
            <SecuritySection/>

            {/* Customer Section */}
            <CustomerSection/>

            {/* CTA Section */}
            <CTASection/>

            {/* Footer */}
            <Footer/>
        </div>
    )
}
