"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <section id="hero" className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500 ${
      theme === "dark"
        ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black"
        : "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50"
    }`}>
      {/* Background decorative elements for dark mode */}
      {theme === "dark" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-500 ${
                theme === "dark"
                  ? "bg-purple-950/50 border border-purple-500/30 text-purple-300 backdrop-blur-sm"
                  : "bg-purple-100 text-purple-700"
              }`}>
                🚀 AI-Powered Content Transformation
              </span>
            </div>

            <h1 className={`text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Transform Your Content for{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-purple-400 via-pink-400 to-blue-400"
                  : "from-purple-600 to-blue-600"
              }`}>
                Every Platform
              </span>
            </h1>

            <p className={`text-xl leading-relaxed transition-colors duration-500 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Create platform-optimized content in seconds with AI. One piece of content becomes
              Twitter threads, LinkedIn posts, Instagram captions, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all text-center"
              >
                Start Free Today
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className={`px-8 py-4 border-2 rounded-lg font-semibold text-lg transition-all text-center cursor-pointer ${
                  theme === "dark"
                    ? "bg-gray-800/50 text-purple-300 border-purple-500/50 hover:bg-gray-800 hover:border-purple-400 backdrop-blur-sm"
                    : "bg-white text-purple-600 border-purple-600 hover:bg-purple-50"
                }`}
              >
                See How It Works
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className={`text-3xl font-bold transition-colors duration-500 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}>20+</div>
                <div className={`transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>Platforms</div>
              </div>
              <div>
                <div className={`text-3xl font-bold transition-colors duration-500 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}>10x</div>
                <div className={`transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>Faster</div>
              </div>
              <div>
                <div className={`text-3xl font-bold transition-colors duration-500 ${
                  theme === "dark" ? "text-pink-400" : "text-indigo-600"
                }`}>Free</div>
                <div className={`transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>To Start</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Content Dashboard"
                className={`rounded-2xl shadow-2xl transition-all duration-500 ${
                  theme === "dark"
                    ? "shadow-purple-900/50 border border-purple-500/20 brightness-90 contrast-110"
                    : "shadow-purple-200/50"
                }`}
              />
            </div>
            <div className={`absolute -top-4 -right-4 w-72 h-72 rounded-full filter blur-3xl animate-blob transition-all duration-500 ${
              theme === "dark"
                ? "bg-purple-600/30 mix-blend-screen opacity-50"
                : "bg-purple-300 mix-blend-multiply opacity-70"
            }`}></div>
            <div className={`absolute -bottom-8 -left-4 w-72 h-72 rounded-full filter blur-3xl animate-blob animation-delay-2000 transition-all duration-500 ${
              theme === "dark"
                ? "bg-blue-600/30 mix-blend-screen opacity-50"
                : "bg-blue-300 mix-blend-multiply opacity-70"
            }`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
