"use client";

import { useState } from "react";
import { Upload, Zap, Twitter, Linkedin, Video, Instagram } from "lucide-react";
import Button from "@/components/ui/Button";
import { useContent } from "@/hooks/useContent";
import type { RepurposedContent } from "@/types";

interface ContentInputProps {
  onContentRepurposed: (result: RepurposedContent) => void;
}

const ContentInput = ({ onContentRepurposed }: ContentInputProps) => {
  const [content, setContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("twitter");
  const { repurposeContent, loading } = useContent();

  const platforms = [
    {
      id: "twitter",
      name: "Twitter Thread",
      icon: <Twitter className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      id: "linkedin",
      name: "LinkedIn Post",
      icon: <Linkedin className="h-5 w-5" />,
      color: "bg-blue-700",
    },
    {
      id: "tiktok",
      name: "TikTok Script",
      icon: <Video className="h-5 w-5" />,
      color: "bg-black",
    },
    {
      id: "instagram",
      name: "Instagram Post",
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-pink-500",
    },
  ];

  const handleRepurpose = async () => {
    if (!content.trim()) return;

    try {
      const result = await repurposeContent(content, selectedPlatform);
      onContentRepurposed(result);
      setContent(""); // Clear form after success
    } catch (error) {
      console.error("Failed to repurpose content:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 animate-fadeIn">
      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <Upload className="h-5 w-5 text-purple-600" />
        </div>
        Original Content
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste your content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all"
            placeholder="Paste your blog post, article, or any long-form content here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Target Platform
          </label>
          <div className="grid grid-cols-1 gap-3">
            {platforms.map((platform) => (
              <label key={platform.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="platform"
                  value={platform.id}
                  checked={selectedPlatform === platform.id}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPlatform === platform.id
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 shadow-md scale-105"
                      : "border-gray-200 hover:border-purple-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${platform.color} text-white`}>
                      {platform.icon}
                    </div>
                    <span className="font-medium text-gray-900">
                      {platform.name}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <Button
          onClick={handleRepurpose}
          disabled={!content.trim() || loading}
          loading={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          size="lg"
        >
          <Zap className="h-5 w-5" />
          Repurpose Content
        </Button>
      </div>
    </div>
  );
};

export default ContentInput;
