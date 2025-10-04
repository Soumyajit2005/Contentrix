"use client";

import { HelpCircle, BookOpen, Video, FileQuestion } from "lucide-react";

const HelpSection = () => {
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
    <section id="help" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Need{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Help?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions and learn how to get the most out of Contentrix
          </p>
        </div>

        {/* Help Resources */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {resource.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
            </a>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-8 w-8 text-purple-600" />
            <h3 className="text-3xl font-bold">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <h4 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
            <p className="text-center text-gray-700">
              Still have questions?{" "}
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-purple-600 font-semibold hover:underline"
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
