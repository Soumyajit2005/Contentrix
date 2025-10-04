"use client";

import { Upload, Sparkles, Download, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-10 w-10" />,
      title: "Upload Your Content",
      description: "Paste your blog post, article, or any text content. Upload documents, images, or videos.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80"
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "AI Analyzes & Transforms",
      description: "Our AI analyzes your content and creates platform-optimized versions with perfect formatting.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80"
    },
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: "Review & Approve",
      description: "Review AI-generated content, make edits if needed, and approve the ones you like.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
    },
    {
      icon: <Download className="h-10 w-10" />,
      title: "Copy & Post",
      description: "Copy your content and post directly to your platforms. Track performance in the dashboard.",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Contentrix
            </span>{" "}
            Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your content in 4 simple steps
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-purple-600">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold">{step.title}</h3>
                <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              <div className="flex-1">
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
