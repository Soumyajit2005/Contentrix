"use client";

import { 
  Calendar, 
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
}

const ProjectCard = ({ project, viewMode, onClick }: ProjectCardProps) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'draft': return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-sm';
      case 'generating': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-sm animate-pulse';
      case 'review': return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 shadow-sm';
      case 'scheduled': return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 shadow-sm';
      case 'published': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 shadow-sm';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-sm';
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
        className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-purple-200 transition-all duration-300 cursor-pointer hover:scale-[1.01]"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">{project.name}</h3>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium">{getPlatformCount()} platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium">{getContentCount()} content pieces</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 cursor-pointer hover:scale-105 relative overflow-hidden"
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
            {project.name}
          </h3>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Content Preview */}
      <div className="relative mb-4 p-4 bg-gray-50 group-hover:bg-white rounded-xl transition-colors border border-gray-100">
        <p className="text-sm text-gray-600 line-clamp-2">
          {project.original_content.slice(0, 120)}...
        </p>
      </div>

      {/* Analysis Info */}
      <div className="relative space-y-3 mb-4">
        <div className="flex items-center justify-between p-2 bg-purple-50/50 rounded-lg group-hover:bg-purple-100/50 transition-colors">
          <span className="text-xs font-medium text-gray-600">Category:</span>
          <span className="text-xs font-bold text-purple-700">
            {project.analysis_results?.primaryCategory || 'General'}
          </span>
        </div>
        <div className="flex items-center justify-between p-2 bg-blue-50/50 rounded-lg group-hover:bg-blue-100/50 transition-colors">
          <span className="text-xs font-medium text-gray-600">Platforms:</span>
          <span className="text-xs font-bold text-blue-700">{getPlatformCount()}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-indigo-50/50 rounded-lg group-hover:bg-indigo-100/50 transition-colors">
          <span className="text-xs font-medium text-gray-600">Content:</span>
          <span className="text-xs font-bold text-indigo-700">{getContentCount()} pieces</span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200 group-hover:border-purple-200 transition-colors">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-purple-500" />
          <span>{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
          <span>Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;