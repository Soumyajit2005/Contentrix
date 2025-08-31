"use client";

import { useState } from "react";
import { Sparkles, Check, Copy, Calendar, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import type { RepurposedContent } from "@/types";

interface ContentOutputProps {
  result: RepurposedContent | null;
  loading: boolean;
}

const ContentOutput = ({ result, loading }: ContentOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result?.content) return;

    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      toast.success("Content copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy content");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-500" />
          Repurposed Content
        </h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">AI is repurposing your content...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-500" />
          Repurposed Content
        </h2>
        <div className="text-center py-12 text-gray-500">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p>Your repurposed content will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand-500" />
        Repurposed Content
      </h2>

      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <Check className="h-5 w-5" />
            <span className="font-semibold">{result.title}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Content
          </label>
          <textarea
            value={result.content}
            readOnly
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 resize-none"
          />
        </div>

        {result.hashtags && result.hashtags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggested Hashtags
            </label>
            <div className="flex flex-wrap gap-2">
              {result.hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleCopy}
            className="flex-1 flex items-center gap-2"
            variant="secondary"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
          <Button className="flex-1 flex items-center gap-2" variant="outline">
            <Calendar className="h-4 w-4" />
            Schedule Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentOutput;
