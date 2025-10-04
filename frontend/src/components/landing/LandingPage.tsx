"use client";

import { useRef } from "react";
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
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <ContactSection />
      <HelpSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
