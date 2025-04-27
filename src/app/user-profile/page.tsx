"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { fadeInUp, staggerContainer } from "@/lib/animations/animationTool";
import { JSX } from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";

export default function ProfilePage(): JSX.Element {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto px-4"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-gray-800 mb-8">
            Mon Profil
          </motion.h1>
          <motion.div variants={fadeInUp} className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <ul className="space-y-4">
              <li className="flex items-center"><User className="w-6 h-6 text-primary mr-3" /><span className="text-gray-700 font-medium">Nom d'utilisateur: user123</span></li>
              <li className="flex items-center"><Mail className="w-6 h-6 text-primary mr-3" /><span className="text-gray-700">user@example.com</span></li>
              <li className="flex items-center"><Phone className="w-6 h-6 text-primary mr-3" /><span className="text-gray-700">+33 6 12 34 56 78</span></li>
              <li className="flex items-center"><Calendar className="w-6 h-6 text-primary mr-3" /><span className="text-gray-700">Membre depuis: 01/01/2023</span></li>
            </ul>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}