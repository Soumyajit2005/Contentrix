"use client";

import { 
  Calendar, 
  Users, 
  Target, 
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
  onClick: () => void;
  onStatusUpdate: () => void;
}

const ProjectCard = ({ project, viewMode, onClick, onStatusUpdate }: ProjectCardProps) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'generating': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-orange-100 text-orange-700';
      case 'scheduled': return 'bg-purple-100 text-purple-700';
      case 'published': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'draft': return <Clock className="h-3 w-3" />;
      case 'generating': return <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />;
      case 'review': return <AlertCircle className="h-3 w-3" />;
      case 'scheduled': return <Calendar className="h-3 w-3" />;
      case 'published': return <CheckCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const getPlatformCount = () => {
    return project.selected_platforms?.length || 0;
  };

  const getContentCount = () => {
    return project.generatedContent?.length || 0;
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white border rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>{getPlatformCount()} platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{getContentCount()} content pieces</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white border rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Content Preview */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {project.original_content.slice(0, 120)}...
        </p>
      </div>

      {/* Analysis Info */}
      <div className="space-y-2 mb-4 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <span>Category:</span>
          <span className="font-medium text-gray-700">
            {project.analysis_results?.primaryCategory || 'General'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Platforms:</span>
          <span className="font-medium text-gray-700">{getPlatformCount()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Content:</span>
          <span className="font-medium text-gray-700">{getContentCount()} pieces</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
          <span>Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;