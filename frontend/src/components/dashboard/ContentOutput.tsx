"use client";

import { useState } from "react";
import { Sparkles, Check, Copy, Calendar, FileText, Lightbulb, Target, TrendingUp, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import type { RepurposedContent } from "@/types";

interface ContentOutputProps {
  result: RepurposedContent | null;
  loading: boolean;
}

const ContentOutput = ({ result, loading }: ContentOutputProps) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<'content' | 'guidance'>('content');

  // Parse JSON content if it exists
  const parsedContent = (() => {
    if (!result?.content) return null;
    
    try {
      let jsonString = result.content;
      
      // Remove markdown code block formatting if present
      if (jsonString.includes('```json')) {
        jsonString = jsonString.replace(/```json\s*\n?/g, '').replace(/\n?\s*```/g, '');
      } else if (jsonString.includes('```')) {
        jsonString = jsonString.replace(/```\s*\n?/g, '').replace(/\n?\s*```/g, '');
      }
      
      // Clean up extra whitespace
      jsonString = jsonString.trim();
      
      // Try to parse as JSON first
      const parsed = JSON.parse(jsonString);
      
      // If the parsed object has a content field, use it; otherwise use the original
      const actualContent = parsed.content || result.content;
      
      return {
        ...parsed,
        content: actualContent
      };
    } catch (error) {
      console.error('Failed to parse content JSON:', error);
      // If not JSON, return as is
      return {
        title: result.title,
        content: result.content,
        hashtags: result.hashtags || []
      };
    }
  })();

  const handleCopy = async () => {
    if (!parsedContent?.content) return;

    try {
      await navigator.clipboard.writeText(parsedContent.content);
      setCopied(true);
      toast.success("Content copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy content");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 animate-fadeIn">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
            <Sparkles className="h-5 w-5 text-purple-600" />
          </div>
          Repurposed Content
        </h2>
        <div className="text-center py-12">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">AI is repurposing your content...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a moment ✨</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 animate-fadeIn">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
            <Sparkles className="h-5 w-5 text-purple-600" />
          </div>
          Repurposed Content
        </h2>
        <div className="text-center py-12 text-gray-500">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full animate-pulse"></div>
            <FileText className="h-12 w-12 text-purple-400 absolute inset-0 m-auto" />
          </div>
          <p className="text-gray-600 font-medium">Your repurposed content will appear here</p>
          <p className="text-gray-400 text-sm mt-2">Start by pasting your content on the left</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 animate-fadeIn">
      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <Sparkles className="h-5 w-5 text-purple-600" />
        </div>
        Repurposed Content
      </h2>

      <div className="space-y-6">
        {/* Content Header with Title */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <div className="p-1.5 bg-green-500 rounded-full">
              <Check className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">{parsedContent?.title || result?.title}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 p-1.5 rounded-xl shadow-inner">
          <button
            onClick={() => setActiveSection('content')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeSection === 'content'
                ? 'bg-white text-purple-700 shadow-md scale-105'
                : 'text-gray-600 hover:text-purple-700'
            }`}
          >
            Generated Content
          </button>
          {parsedContent?.guidance && (
            <button
              onClick={() => setActiveSection('guidance')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeSection === 'guidance'
                  ? 'bg-white text-purple-700 shadow-md scale-105'
                  : 'text-gray-600 hover:text-purple-700'
              }`}
            >
              Publishing Guide
            </button>
          )}
        </div>

        {/* Content Section */}
        {activeSection === 'content' && (
          <>
            {/* Main Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Ready-to-Post Content
              </label>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {parsedContent?.content || result?.content}
                </p>
              </div>
            </div>

            {/* Hashtags */}
            {(parsedContent?.hashtags || result?.hashtags) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Suggested Hashtags
                </label>
                <div className="flex flex-wrap gap-2">
                  {(parsedContent?.hashtags || result?.hashtags || []).map((hashtag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Points (for platforms like YouTube) */}
            {parsedContent?.keyPoints && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Key Points & Structure
                </label>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <ul className="space-y-2">
                    {parsedContent.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-900">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Visual Suggestions (for Instagram/TikTok) */}
            {(parsedContent?.visualSuggestions || parsedContent?.visualCues) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Visual Recommendations
                </label>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <ul className="space-y-2">
                    {(parsedContent.visualSuggestions || parsedContent.visualCues || []).map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-purple-900">
                        <span className="text-purple-500 mt-1">📸</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Duration (for TikTok/YouTube) */}
            {parsedContent?.duration && (
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Recommended Duration: {parsedContent.duration}</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Guidance Section */}
        {activeSection === 'guidance' && parsedContent?.guidance && (
          <div className="space-y-6">
            {/* Formatting Tips */}
            {parsedContent.guidance.formatting && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Formatting Guidelines
                </h4>
                <ul className="space-y-2">
                  {parsedContent.guidance.formatting.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                      <span className="text-blue-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Engagement Tips */}
            {parsedContent.guidance.engagement && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Engagement Strategy
                </h4>
                <ul className="space-y-2">
                  {parsedContent.guidance.engagement.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                      <span className="text-green-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best Practices */}
            {parsedContent.guidance.bestPractices && (
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Best Practices
                </h4>
                <ul className="space-y-2">
                  {parsedContent.guidance.bestPractices.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-purple-800">
                      <span className="text-purple-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Posting Steps */}
            {parsedContent.guidance.postingSteps && (
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Publishing Steps
                </h4>
                <ol className="space-y-2">
                  {parsedContent.guidance.postingSteps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-orange-800">
                      <span className="flex-shrink-0 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={handleCopy}
            className="flex-1 flex items-center gap-2"
            variant="secondary"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy Content"}
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
