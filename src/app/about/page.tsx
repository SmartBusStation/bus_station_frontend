"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import CTASection from "@/components/landingPageComponents/CTASection";
import { fadeInUp, staggerContainer } from "@/lib/animations/animationTool";
import {
  GraduationCap,
  Code,
  Globe,
  MapPin,
  Users,
  Heart,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { JSX } from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

const TeamMember = ({
  name,
  role,
  description,
  imageUrl,
  github,
  linkedin,
  email,
}: TeamMemberProps) => {
  //const [t] = useTranslation();

  return (
    <>
      <motion.div
        variants={fadeInUp}
        className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-full border-4 border-primary">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-primary font-semibold mb-3">{role}</p>
        <p className="text-gray-600 text-center mb-4">{description}</p>
        <div className="flex space-x-4 mt-auto">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-gray-600 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </motion.div>
    </>
  );
};

const AboutCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

export default function AboutUsPage(): JSX.Element {
  const [heroRef, heroInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [missionRef, missionInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [t] = useTranslation();

  function translate(key: string): string {
    return t("aboutUs." + key);
  }

  const teamMembers: TeamMemberProps[] = [
    {
      name: translate("team.member1.name"),
      role: translate("team.member1.role"),
      description: translate("team.member1.description"),
      imageUrl: "/images/team/member1.svg",
      github: "https://github.com/member1",
      linkedin: "https://linkedin.com/in/member1",
      email: "member1@example.com",
    },
    {
      name: translate("team.member2.name"),
      role: translate("team.member2.role"),
      description: translate("team.member2.description"),
      imageUrl: "/images/team/member1.svg",
      github: "https://github.com/member2",
      linkedin: "https://linkedin.com/in/member2",
      email: "member2@example.com",
    },
    {
      name: translate("team.member3.name"),
      role: translate("team.member3.role"),
      description: translate("team.member3.description"),
      imageUrl: "/images/team/member1.svg",
      github: "https://github.com/member3",
      linkedin: "https://linkedin.com/in/member3",
      email: "member3@example.com",
    },
    {
      name: translate("team.member4.name"),
      role: translate("team.member4.role"),
      description: translate("team.member4.description"),
      imageUrl: "/images/team/member1.svg",
      github: "https://github.com/member4",
      linkedin: "https://linkedin.com/in/member4",
      email: "member4@example.com",
    },
    {
      name: translate("team.member5.name"),
      role: translate("team.member5.role"),
      description: translate("team.member5.description"),
      imageUrl: "/images/team/member1.svg",
      github: "https://github.com/member5",
      linkedin: "https://linkedin.com/in/member5",
      email: "member5@example.com",
    },
    {
      name: translate("team.member6.name"),
      role: translate("team.member6.role"),
      description: translate("team.member6.description"),
      imageUrl: "/images/team/member1.svg",
      github: "https://github.com/member6",
      linkedin: "https://linkedin.com/in/member6",
      email: "member6@example.com",
    },
  ];

  const aboutCards = [
    {
      icon: GraduationCap,
      title: translate("values.education.title"),
      description: translate("values.education.description"),
    },
    {
      icon: Code,
      title: translate("values.innovation.title"),
      description: translate("values.innovation.description"),
    },
    {
      icon: Globe,
      title: translate("values.global.title"),
      description: translate("values.global.description"),
    },
    {
      icon: Heart,
      title: translate("values.passion.title"),
      description: translate("values.passion.description"),
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative bg-primary py-20 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                {translate("hero.title")}
              </h1>
              <p className="text-xl mb-8">{translate("hero.subtitle")}</p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{translate("hero.location")}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{translate("hero.team")}</span>
                </div>
                <div className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  <span>{translate("hero.project")}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Wave SVG shape divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="fill-gray-50 w-full h-16">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z"></path>
            </svg>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          ref={missionRef}
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="py-20">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                {translate("mission.title")}
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                {translate("mission.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutCards.map((card, index) => (
                <AboutCard key={index} {...card} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2">
                <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/office.svg"
                    alt="Notre histoire"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  {translate("story.title")}
                </h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
                <p className="text-gray-600 mb-4">
                  {translate("story.paragraph1")}
                </p>
                <p className="text-gray-600 mb-4">
                  {translate("story.paragraph2")}
                </p>
                <p className="text-gray-600">{translate("story.paragraph3")}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <motion.section
          ref={teamRef}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                {translate("team.title")}
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                {translate("team.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Technologies Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                {translate("tech.title")}
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                {translate("tech.description")}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-12">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center mb-4">
                  <Image
                    src="/images/tech/nextjs.png"
                    alt="Next.js"
                    width={80}
                    height={80}
                  />
                </div>
                <span className="text-gray-800 font-medium">Next.js</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center mb-4">
                  <Image
                    src="/images/tech/typescript.png"
                    alt="TypeScript"
                    width={80}
                    height={80}
                  />
                </div>
                <span className="text-gray-800 font-medium">TypeScript</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center mb-4">
                  <Image
                    src="/images/tech/tailwind.png"
                    alt="Tailwind CSS"
                    width={80}
                    height={80}
                  />
                </div>
                <span className="text-gray-800 font-medium">Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center mb-4">
                  <Image
                    src="/images/tech/framer.png"
                    alt="Framer Motion"
                    width={80}
                    height={80}
                  />
                </div>
                <span className="text-gray-800 font-medium">Framer Motion</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <CTASection />
      <Footer />
    </>
  );
}
