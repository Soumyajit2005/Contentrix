"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  ArrowLeft, 
  Zap, 
  Check,
  X,
  RefreshCw,
  Copy,
  Calendar,
  Download,
  Share2,
  FileText,
  Target,
  TrendingUp,
  Clock
} from "lucide-react";
import Button from "@/components/ui/Button";
import api from "@/lib/api";
import toast from "react-hot-toast";
import type { Project, GeneratedContent } from "@/types";

interface ProjectWorkspaceProps {
  projectId: string;
  onBack: () => void;
  onProjectUpdate: () => void;
}

const ProjectWorkspace = ({ projectId, onBack, onProjectUpdate }: ProjectWorkspaceProps) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'schedule'>('content');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  // Helper function to parse JSON content
  const parseContentData = (content: GeneratedContent) => {
    try {
      let jsonString = content.content;
      
      // Remove markdown code block formatting if present
      if (jsonString.includes('```json')) {
        jsonString = jsonString.replace(/```json\s*\n?/g, '').replace(/\n?\s*```/g, '');
      } else if (jsonString.includes('```')) {
        jsonString = jsonString.replace(/```\s*\n?/g, '').replace(/\n?\s*```/g, '');
      }
      
      // Clean up extra whitespace
      jsonString = jsonString.trim();
      
      const parsed = JSON.parse(jsonString);
      
      // If the parsed object has a content field, it means the entire JSON was stored
      // Otherwise, the content field itself is the actual content
      const actualContent = parsed.content || jsonString;
      const actualTitle = parsed.title || content.title;
      const actualHashtags = parsed.hashtags || content.hashtags || [];
      
      return {
        ...content,
        parsedContent: parsed,
        displayContent: actualContent,
        title: actualTitle,
        hashtags: actualHashtags
      };
    } catch (error) {
      console.error('Failed to parse content JSON:', error);
      // If parsing fails, treat the content as plain text
      return {
        ...content,
        parsedContent: null,
        displayContent: content.content,
        title: content.title,
        hashtags: content.hashtags || []
      };
    }
  };

  const loadProject = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/projects/${projectId}`);
      setProject(response.data);
      setSelectedPlatforms(response.data.selected_platforms || []);
    } catch (error) {
      console.error('Failed to load project:', error);
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const handleGenerateContent = async () => {
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    try {
      setGeneratingContent(true);
      await api.post(`/projects/${projectId}/generate`, {
        platforms: selectedPlatforms
      });
      
      toast.success('Content generation started!');
      loadProject(); // Reload to show generating status
      onProjectUpdate();
    } catch (error) {
      console.error('Failed to generate content:', error);
      toast.error('Failed to generate content');
    } finally {
      setGeneratingContent(false);
    }
  };

  const handleApproveContent = async (contentId: string, approved: boolean) => {
    try {
      await api.post(`/projects/content/${contentId}/approve`, { approved });
      toast.success(approved ? 'Content approved!' : 'Content unapproved');
      loadProject();
      onProjectUpdate();
    } catch (error) {
      console.error('Failed to update approval:', error);
      toast.error('Failed to update approval');
    }
  };

  const handleCopyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Content copied to clipboard!');
    } catch {
      toast.error('Failed to copy content');
    }
  };

  const handleRegenerateContent = async (contentId: string) => {
    try {
      const content = project?.generatedContent?.find(c => c.id === contentId);
      if (!content) return;

      // For now, just regenerate all content for that platform
      await api.post(`/projects/${projectId}/generate`, {
        platforms: [content.platform]
      });
      
      toast.success('Content regeneration started!');
      loadProject();
    } catch (error) {
      console.error('Failed to regenerate content:', error);
      toast.error('Failed to regenerate content');
    }
  };

  const getPlatformIcon = (platformId: string) => {
    const icons: Record<string, string> = {
      twitter: "🐦",
      linkedin: "💼", 
      instagram: "📸",
      tiktok: "🎵",
      medium: "📝",
      facebook: "👥",
      youtube: "📺"
    };
    return icons[platformId] || "🎯";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generating': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'complete': return 'text-green-500 bg-green-50 border-green-200';
      case 'error': return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const availablePlatforms = [
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'facebook', name: 'Facebook', icon: '👥' },
    { id: 'medium', name: 'Medium', icon: '📝' },
    { id: 'youtube', name: 'YouTube', icon: '📺' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{selectedPlatforms.length}</div>
          <div className="text-sm text-gray-600">Selected Platforms</div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{project?.generatedContent?.length || 0}</div>
          <div className="text-sm text-gray-600">Content Pieces</div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {project?.generatedContent?.filter(c => c.approved).length || 0}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">
            {project?.generatedContent?.filter(c => !c.approved && c.status === 'complete').length || 0}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
      </div>

      {/* Content Analysis */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Content Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{project?.analysis_results?.primaryCategory || 'General'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Complexity:</span>
                <span className="font-medium">{project?.analysis_results?.complexity || 'Medium'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Content Type:</span>
                <span className="font-medium">{project?.content_type || 'Text'}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Audience & Engagement</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Target Audience:</span>
                <span className="font-medium text-right max-w-32 truncate">
                  {project?.analysis_results?.targetAudience || 'General'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement Potential:</span>
                <span className={`font-medium ${
                  project?.analysis_results?.engagementPotential === 'high' ? 'text-green-600' : 
                  project?.analysis_results?.engagementPotential === 'medium' ? 'text-orange-600' : 'text-gray-600'
                }`}>
                  {project?.analysis_results?.engagementPotential || 'Medium'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Viral Potential:</span>
                <span className={`font-medium ${
                  project?.analysis_results?.viralPotential === 'high' ? 'text-green-600' : 
                  project?.analysis_results?.viralPotential === 'medium' ? 'text-orange-600' : 'text-gray-600'
                }`}>
                  {project?.analysis_results?.viralPotential || 'Medium'}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Topics</h4>
            <div className="flex flex-wrap gap-1">
              {project?.analysis_results?.keyTopics?.slice(0, 6).map((topic, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  {topic}
                </span>
              )) || <span className="text-sm text-gray-500">No topics identified</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Original Content */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Content</h3>
        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
          <p className="text-gray-700 whitespace-pre-wrap">{project?.original_content}</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project?.status === 'draft' && (
              <Button
                onClick={handleGenerateContent}
                loading={generatingContent}
                disabled={selectedPlatforms.length === 0}
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Generate Content
              </Button>
            )}
            <span className="text-sm text-gray-600">
              {project?.generatedContent?.filter(c => c.approved).length || 0} of {project?.generatedContent?.length || 0} approved
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Platform Selection for Draft Projects */}
      {project?.status === 'draft' && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {availablePlatforms.map(platform => (
              <label key={platform.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPlatforms(prev => [...prev, platform.id]);
                    } else {
                      setSelectedPlatforms(prev => prev.filter(p => p !== platform.id));
                    }
                  }}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-lg text-center transition-all ${
                  selectedPlatforms.includes(platform.id)
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <span className="text-2xl mb-2 block">{platform.icon}</span>
                  <span className="font-medium text-sm">{platform.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Generated Content */}
      {project?.generatedContent && project.generatedContent.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {project.generatedContent.map((content) => {
            const parsedData = parseContentData(content);
            const isExpanded = expandedContent === content.id;
            
            return (
              <div key={content.id} className="bg-white border rounded-lg overflow-hidden">
                {/* Content Header */}
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getPlatformIcon(content.platform)}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 capitalize">{content.platform}</h4>
                        <p className="text-sm text-gray-600">{parsedData.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(content.status)}`}>
                        {content.status === 'generating' && (
                          <div className="inline-block w-3 h-3 mr-1 animate-spin rounded-full border border-blue-500 border-t-transparent"></div>
                        )}
                        {content.status}
                      </span>
                      {content.approved && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4">
                  {/* Main Content Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Generated Content</label>
                      <Button
                        onClick={() => setExpandedContent(isExpanded ? null : content.id)}
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        {isExpanded ? 'Show Less' : 'Show More'}
                      </Button>
                    </div>
                    <div className={`text-sm text-gray-800 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                      <p className="whitespace-pre-wrap">{parsedData.displayContent}</p>
                    </div>
                  </div>

                  {/* Expanded Content Details */}
                  {isExpanded && parsedData.parsedContent && (
                    <div className="space-y-4 border-t pt-4">
                      {/* Key Points */}
                      {parsedData.parsedContent.keyPoints && (
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <h5 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Key Points & Structure
                          </h5>
                          <ul className="space-y-1">
                            {parsedData.parsedContent.keyPoints.map((point: string, index: number) => (
                              <li key={index} className="text-xs text-blue-800 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Visual Suggestions */}
                      {(parsedData.parsedContent.visualSuggestions || parsedData.parsedContent.visualCues) && (
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h5 className="font-medium text-purple-900 mb-2">Visual Recommendations</h5>
                          <ul className="space-y-1">
                            {(parsedData.parsedContent.visualSuggestions || parsedData.parsedContent.visualCues || []).map((suggestion: string, index: number) => (
                              <li key={index} className="text-xs text-purple-800 flex items-start gap-2">
                                <span className="text-purple-500">📸</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Guidance Sections */}
                      {parsedData.parsedContent.guidance && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Formatting */}
                          {parsedData.parsedContent.guidance.formatting && (
                            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                              <h6 className="font-medium text-green-900 mb-2 text-xs flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                Formatting
                              </h6>
                              <ul className="space-y-1">
                                {parsedData.parsedContent.guidance.formatting.slice(0, 3).map((tip: string, index: number) => (
                                  <li key={index} className="text-xs text-green-800">• {tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Engagement */}
                          {parsedData.parsedContent.guidance.engagement && (
                            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                              <h6 className="font-medium text-orange-900 mb-2 text-xs flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                Engagement
                              </h6>
                              <ul className="space-y-1">
                                {parsedData.parsedContent.guidance.engagement.slice(0, 3).map((tip: string, index: number) => (
                                  <li key={index} className="text-xs text-orange-800">• {tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Duration */}
                      {parsedData.parsedContent.duration && (
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 inline-block">
                          <div className="flex items-center gap-2 text-yellow-800">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">Duration: {parsedData.parsedContent.duration}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hashtags */}
                  {parsedData.hashtags && parsedData.hashtags.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {parsedData.hashtags.slice(0, 5).map((hashtag: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                            {hashtag}
                          </span>
                        ))}
                        {parsedData.hashtags.length > 5 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{parsedData.hashtags.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleCopyContent(parsedData.displayContent)}
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                      {content.status === 'complete' && (
                        <Button
                          onClick={() => handleRegenerateContent(content.id)}
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Regenerate
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {content.status === 'complete' && (
                        content.approved ? (
                          <Button
                            onClick={() => handleApproveContent(content.id, false)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-3 w-3" />
                            Unapprove
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleApproveContent(content.id, true)}
                            size="sm"
                            className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-3 w-3" />
                            Approve
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {(!project?.generatedContent || project.generatedContent.length === 0) && project?.status !== 'draft' && (
        <div className="bg-white rounded-lg border p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content generated yet</h3>
          <p className="text-gray-600">Select platforms and generate content to get started.</p>
        </div>
      )}
    </div>
  );

  const renderSchedule = () => (
    <div className="bg-white rounded-lg border p-12 text-center">
      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Scheduling Coming Soon</h3>
      <p className="text-gray-600">Schedule your approved content for optimal publishing times.</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Project not found</p>
        <Button onClick={onBack} className="mt-4">Back to Projects</Button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'content', label: 'Content', count: project.generatedContent?.length || 0 },
    { id: 'schedule', label: 'Schedule', count: project.generatedContent?.filter(c => c.approved).length || 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600">
                Status: <span className="capitalize">{project.status}</span> • Created {new Date(project.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mt-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'content' | 'schedule')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-brand-100 text-brand-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'content' && renderContent()}
      {activeTab === 'schedule' && renderSchedule()}
    </div>
  );
};

export default ProjectWorkspace;