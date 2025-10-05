"use client";

import { Sparkles, Zap, Target, BarChart3, Globe, Shield, Video, Image, Layout, Calendar, Mic, TrendingUp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const FeaturesSection = () => {
  const { theme } = useTheme();
  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI Content Analysis",
      description: "Advanced AI analyzes your content and automatically recommends the best platforms for maximum engagement and reach.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "20+ Platform Support",
      description: "Twitter, LinkedIn, Instagram, TikTok, YouTube, Facebook, Medium, Reddit, and many more platforms supported.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quick Repurpose Mode",
      description: "Transform any content in seconds with our lightning-fast single-click repurposing for instant results.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Platform Optimization",
      description: "Get perfect hashtags, formatting, character limits, and engagement strategies tailored for each platform.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Content Analytics",
      description: "Track engagement potential, viral scores, key topics, and audience insights for smarter content decisions.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Project Management",
      description: "Organize content projects with approval workflows, status tracking, and collaborative review features.",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  const comingSoonFeatures = [
    {
      icon: <Video className="h-8 w-8" />,
      title: "Text-to-Video Generation",
      description: "Convert your content into engaging video ads, TikTok clips, and Reels with AI-powered video creation.",
      gradient: "from-red-500 to-orange-500",
      badge: "Q2 2025"
    },
    {
      icon: <Image className="h-8 w-8" />,
      title: "AI Image & Thumbnail Generator",
      description: "Create stunning graphics, social media visuals, and eye-catching thumbnails automatically.",
      gradient: "from-pink-500 to-rose-500",
      badge: "Coming Soon"
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: "Carousel Generator",
      description: "Auto-create beautiful Instagram and LinkedIn carousels from your long-form content.",
      gradient: "from-blue-500 to-indigo-500",
      badge: "In Development"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Auto-Scheduling",
      description: "Smart scheduling to optimal posting times across all platforms with automated publishing.",
      gradient: "from-green-500 to-teal-500",
      badge: "Q2 2025"
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "AI Voiceover",
      description: "Generate professional voice narration for your videos in multiple languages and accents.",
      gradient: "from-purple-500 to-violet-500",
      badge: "Beta Soon"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Track performance, engagement, and ROI across all platforms in one unified dashboard.",
      gradient: "from-cyan-500 to-blue-500",
      badge: "Coming Soon"
    }
  ];

  return (
    <section id="features" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      theme === "dark" ? "bg-gray-900" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Current Features */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-500 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Everything You Need to{" "}
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
              theme === "dark"
                ? "from-purple-400 to-blue-400"
                : "from-purple-600 to-blue-600"
            }`}>
              Scale Your Content
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Powerful features designed to transform your content workflow and multiply your reach
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                  : "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-purple-300 hover:shadow-xl"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>{feature.title}</h3>
              <p className={`leading-relaxed transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Coming Soon Features */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block transition-colors duration-500 ${
              theme === "dark"
                ? "bg-purple-950/50 border border-purple-500/30 text-purple-300"
                : "bg-purple-100 text-purple-700"
            }`}>
              🚀 Coming Soon
            </span>
          </div>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-500 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            What's{" "}
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
              theme === "dark"
                ? "from-purple-400 to-blue-400"
                : "from-purple-600 to-blue-600"
            }`}>
              Next
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Exciting new features we're building to supercharge your content creation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comingSoonFeatures.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                  : "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-purple-300 hover:shadow-xl"
              }`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold transition-colors duration-500 ${
                  theme === "dark"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {feature.badge}
                </span>
              </div>

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg opacity-80 group-hover:opacity-100`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>{feature.title}</h3>
              <p className={`leading-relaxed transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
