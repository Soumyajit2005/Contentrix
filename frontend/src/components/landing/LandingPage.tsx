"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import ContactSection from "./ContactSection";
import HelpSection from "./HelpSection";
import Footer from "./Footer";

const LandingPage = () => {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500">
        <Navbar onNavigate={handleNavigate} />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <ContactSection />
        <HelpSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
