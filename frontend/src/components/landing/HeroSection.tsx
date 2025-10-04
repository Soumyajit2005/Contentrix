"use client";

import Link from "next/link";

const HeroSection = () => {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                🚀 AI-Powered Content Transformation
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your Content for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Every Platform
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Create platform-optimized content in seconds with AI. One piece of content becomes
              Twitter threads, LinkedIn posts, Instagram captions, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all text-center"
              >
                Start Free Today
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all text-center"
              >
                See How It Works
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-purple-600">20+</div>
                <div className="text-gray-600">Platforms</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">10x</div>
                <div className="text-gray-600">Faster</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">Free</div>
                <div className="text-gray-600">To Start</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Content Dashboard"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
