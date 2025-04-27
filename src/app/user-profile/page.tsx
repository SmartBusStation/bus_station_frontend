"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { fadeInUp, staggerContainer } from "@/lib/animations/animationTool";
import { JSX } from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { ClipboardList, CheckCircle, XCircle } from "lucide-react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="bg-white shadow-lg rounded-lg p-6">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <User className="w-6 h-6 text-primary mr-3" />
                  <span className="text-gray-700 font-medium">Nom d'utilisateur: user123</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-3" />
                  <span className="text-gray-700">user@example.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-6 h-6 text-primary mr-3" />
                  <span className="text-gray-700">+33 6 12 34 56 78</span>
                </li>
                <li className="flex items-center">
                  <Calendar className="w-6 h-6 text-primary mr-3" />
                  <span className="text-gray-700">Membre depuis: 01/01/2023</span>
                </li>
              </ul>
            </motion.div>
            <div className="space-y-8">
              <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <ClipboardList className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Historique des Réservations</h3>
                </div>
                <ul className="text-gray-600 space-y-1">
                  <li>17/04/2025 - Paris → Lyon</li>
                  <li>22/03/2025 - Marseille → Nice</li>
                  <li>15/02/2025 - Bordeaux → Toulouse</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Confirmations</h3>
                </div>
                <ul className="text-gray-600 space-y-1">
                  <li>12/04/2025 - Réservation #12345 confirmée</li>
                  <li>05/04/2025 - Réservation #67890 confirmée</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <XCircle className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Annulations</h3>
                </div>
                <ul className="text-gray-600 space-y-1">
                  <li>10/03/2025 - Réservation #54321 annulée</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}