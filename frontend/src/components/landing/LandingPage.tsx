"use client";

import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/auth");
  };

  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
    </div>
  );
};

export default LandingPage;
