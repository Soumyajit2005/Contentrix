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
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Upload className="h-5 w-5 text-brand-500" />
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
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
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
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPlatform === platform.id
                      ? "border-brand-500 bg-brand-50"
                      : "border-gray-200 hover:border-gray-300"
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
          className="w-full flex items-center gap-2"
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
