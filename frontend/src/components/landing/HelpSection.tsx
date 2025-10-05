"use client";

import { HelpCircle, BookOpen, Video, FileQuestion } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const HelpSection = () => {
  const { theme } = useTheme();
  const faqs = [
    {
      question: "How does Contentrix work?",
      answer: "Simply upload your content (text, URL, or file), and our AI analyzes it to create platform-optimized versions for Twitter, LinkedIn, Instagram, TikTok, and 20+ other platforms. You can review, edit, and approve each piece before posting."
    },
    {
      question: "What platforms are supported?",
      answer: "We support 20+ platforms including Twitter, LinkedIn, Instagram, TikTok, YouTube, Facebook, Medium, Reddit, Product Hunt, and many more. Each platform gets content optimized for its specific requirements."
    },
    {
      question: "Is my content secure?",
      answer: "Yes! Your content is encrypted and stored securely. We never share your data with third parties. We're fully GDPR compliant and you can delete your data anytime."
    },
    {
      question: "Can I edit the AI-generated content?",
      answer: "Absolutely! You can review and edit all AI-generated content before approving it. Make any changes you need to match your brand voice and style."
    },
    {
      question: "What file types can I upload?",
      answer: "We support text files (.txt, .md), documents (.pdf, .doc, .docx), images (.jpg, .png, .gif, .webp), and videos (.mp4, .mov, .avi). Maximum file size is 100MB."
    },
    {
      question: "How much does it cost?",
      answer: "Contentrix is free to start! You can create unlimited projects and generate content for all platforms. Premium features and higher limits coming soon."
    }
  ];

  const resources = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Documentation",
      description: "Complete guides and tutorials",
      link: "#",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      link: "#",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FileQuestion className="h-8 w-8" />,
      title: "FAQ",
      description: "Common questions answered",
      link: "#",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="help" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      theme === "dark"
        ? "bg-gradient-to-br from-gray-900 to-gray-950"
        : "bg-gradient-to-br from-gray-50 to-purple-50"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-500 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Need{" "}
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
              theme === "dark"
                ? "from-purple-400 to-blue-400"
                : "from-purple-600 to-blue-600"
            }`}>
              Help?
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Find answers to common questions and learn how to get the most out of Contentrix
          </p>
        </div>

        {/* Help Resources */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className={`group p-8 rounded-2xl border transition-all ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                  : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-xl"
              }`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {resource.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>{resource.title}</h3>
              <p className={`transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>{resource.description}</p>
            </a>
          ))}
        </div>

        {/* FAQs */}
        <div className={`rounded-2xl p-8 lg:p-12 transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gray-800 border border-gray-700"
            : "bg-white"
        }`}>
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className={`h-8 w-8 transition-colors duration-500 ${
              theme === "dark" ? "text-purple-400" : "text-purple-600"
            }`} />
            <h3 className={`text-3xl font-bold transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>Frequently Asked Questions</h3>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className={`border-b pb-6 last:border-0 transition-colors duration-500 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}>
                <h4 className={`text-lg font-semibold mb-3 transition-colors duration-500 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>{faq.question}</h4>
                <p className={`leading-relaxed transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-6 rounded-xl transition-colors duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-950/50 to-blue-950/50 border border-purple-500/30"
              : "bg-gradient-to-r from-purple-50 to-blue-50"
          }`}>
            <p className={`text-center transition-colors duration-500 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              Still have questions?{" "}
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`font-semibold hover:underline transition-colors duration-300 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                Contact our support team
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
