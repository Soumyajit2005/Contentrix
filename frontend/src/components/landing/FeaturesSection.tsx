import {
  Twitter,
  Linkedin,
  Video,
  Instagram,
  FileText,
  Zap,
  Clock,
} from "lucide-react";

const FeaturesSection = () => {
  const platforms = [
    {
      icon: <Twitter className="h-8 w-8" />,
      title: "Twitter Threads",
      description:
        "Transform long-form content into engaging Twitter threads with optimal hashtags and threading structure.",
      color: "text-blue-400",
    },
    {
      icon: <Linkedin className="h-8 w-8" />,
      title: "LinkedIn Posts",
      description:
        "Create professional LinkedIn content with proper formatting, insights, and industry-relevant hashtags.",
      color: "text-blue-600",
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "TikTok Scripts",
      description:
        "Generate viral TikTok video scripts with hooks, visual cues, and trending elements.",
      color: "text-purple-400",
    },
    {
      icon: <Instagram className="h-8 w-8" />,
      title: "Instagram Posts",
      description:
        "Create Instagram captions with carousel suggestions and trending hashtags.",
      color: "text-pink-400",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI-Powered",
      description:
        "Advanced AI analyzes your content and creates platform-optimized versions automatically.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Save Time",
      description:
        "Reduce content creation time from hours to minutes with intelligent automation.",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Text Input",
      description:
        "Simply paste your blog posts, articles, or any text content to get started.",
    },
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform Features */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            One Upload, <span className="text-brand-600">Multiple Formats</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your content for every major platform with AI that
            understands each platform's unique requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className={`${platform.color} mb-4`}>{platform.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {platform.title}
              </h3>
              <p className="text-gray-600">{platform.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose RepurposePie?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-brand-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-brand-600">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
