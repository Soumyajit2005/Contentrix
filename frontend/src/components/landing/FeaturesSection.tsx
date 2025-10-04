"use client";

import { Sparkles, Zap, Target, BarChart3, Globe, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Generation",
      description: "Advanced AI understands your content and creates platform-optimized versions automatically with perfect formatting.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Transform hours of work into seconds. Create content for 20+ platforms in one click with instant AI processing.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Platform Optimization",
      description: "Each platform gets perfectly tailored content - character limits, hashtags, formatting, and engagement tactics.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Smart Analytics",
      description: "Track your content performance, time saved, and engagement metrics across all platforms in one dashboard.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "20+ Platforms",
      description: "Twitter, LinkedIn, Instagram, TikTok, YouTube, Facebook, Medium, Reddit, and many more platforms supported.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Your content is encrypted and secure. We never share your data. Full GDPR compliance and data privacy.",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Scale Your Content
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to transform your content workflow and multiply your reach
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
