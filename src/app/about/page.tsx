"use client";

//import { useInView } from "react-intersection-observer";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import CTASection from "@/components/landingPageComponents/CTASection";
//import { staggerContainer } from "@/lib/animations/animationTool";
import HeroSection from "@/components/aboutPageComponents/HeroSection";
import MissionSection from "@/components/aboutPageComponents/MissionSection";
import StorySection from "@/components/aboutPageComponents/StorySection";
import TeamSection from "@/components/aboutPageComponents/TeamSection";
import TechSection from "@/components/aboutPageComponents/TechSection";

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <HeroSection />
        <MissionSection />
        <StorySection />
        <TeamSection />
        <TechSection />
      </div>
      <CTASection />
      <Footer />
    </>
  );
}
