"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  BarChart3
} from "lucide-react";
import Button from "@/components/ui/Button";
import ProjectCreation from "./ProjectCreation";
import ProjectCard from "./ProjectCard";
import ProjectWorkspace from "./ProjectWorkspace";
import StatsPanel from "./StatsPanel";
import ContentInput from "./ContentInput";
import ContentOutput from "./ContentOutput";
import { useContent } from "@/hooks/useContent";
import api from "@/lib/api";
import toast from "react-hot-toast";
import type { Project, RepurposedContent } from "@/types";

const Dashboard = () => {
  const [view, setView] = useState<'overview' | 'create' | 'project' | 'legacy'>('overview');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'generating' | 'review' | 'published'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Legacy content states
  const [currentResult, setCurrentResult] = useState<RepurposedContent | null>(null);
  const { loading: legacyLoading } = useContent();

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        status: filterStatus,
        search: searchQuery,
        page: '1',
        limit: '20'
      });

      const response = await api.get(`/projects?${params}`);
      setProjects(response.data.projects || []);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load projects';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, searchQuery]);

  useEffect(() => {
    loadProjects();
  }, [searchQuery, filterStatus, loadProjects]);

  const handleProjectCreated = (projectId: string) => {
    setCurrentProjectId(projectId);
    setView('project');
    loadProjects();
  };

  const handleProjectClick = (projectId: string) => {
    setCurrentProjectId(projectId);
    setView('project');
  };

  const handleContentRepurposed = (result: RepurposedContent) => {
    setCurrentResult(result);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Render Project Creation
  if (view === 'create') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectCreation
          onProjectCreated={handleProjectCreated}
          onCancel={() => setView('overview')}
        />
      </div>
    );
  }

  // Render Project Workspace
  if (view === 'project' && currentProjectId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectWorkspace
          projectId={currentProjectId}
          onBack={() => setView('overview')}
          onProjectUpdate={loadProjects}
        />
      </div>
    );
  }

  // Render Legacy View (your original dashboard)
  if (view === 'legacy') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <StatsPanel />
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Quick Repurpose</h2>
          <Button onClick={() => setView('overview')} variant="outline">
            Back to Projects
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContentInput onContentRepurposed={handleContentRepurposed} />
          <ContentOutput result={currentResult} loading={legacyLoading} />
        </div>
      </div>
    );
  }

  // Render Main Dashboard (Projects Overview)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Panel */}
        <div className="transform hover:scale-[1.01] transition-all duration-200">
          <StatsPanel />
        </div>

        {/* Header Section with Animated Background */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-20 bg-pattern"></div>
          
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Content Projects
              </h1>
              <p className="text-purple-100 text-lg">
                Transform your ideas into engaging content across all platforms
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setView('legacy')}
                variant="outline"
                className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              >
                ⚡ Quick Repurpose
              </Button>
              <Button
                onClick={() => setView('create')}
                className="flex items-center gap-2 bg-white text-purple-600 hover:bg-purple-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search with Enhanced Styling */}
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search your creative projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Enhanced Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'generating' | 'review' | 'published')}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-200 text-gray-900"
              >
                <option value="all">🌟 All Projects</option>
                <option value="draft">📝 Draft</option>
                <option value="generating">⚡ Generating</option>
                <option value="review">👀 Review</option>
                <option value="published">🚀 Published</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Enhanced View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1.5 shadow-inner">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-md text-purple-600 transform scale-105' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-md text-purple-600 transform scale-105' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
            {[
              { label: 'Total Projects', value: projects.length, color: 'from-gray-500 to-gray-600', icon: '📊', bg: 'from-gray-50 to-gray-100' },
              { label: 'In Progress', value: projects.filter(p => p.status === 'generating').length, color: 'from-blue-500 to-blue-600', icon: '⚡', bg: 'from-blue-50 to-blue-100' },
              { label: 'Ready to Review', value: projects.filter(p => p.status === 'review').length, color: 'from-orange-500 to-orange-600', icon: '👀', bg: 'from-orange-50 to-orange-100' },
              { label: 'Published', value: projects.filter(p => p.status === 'published').length, color: 'from-green-500 to-green-600', icon: '🚀', bg: 'from-green-50 to-green-100' }
            ].map((stat, index) => (
              <div key={index} className={`relative p-4 rounded-xl bg-gradient-to-br ${stat.bg} border border-white/50 group hover:scale-105 transition-all duration-300 cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium mt-1">{stat.label}</div>
                  </div>
                  <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Projects Grid/List */}
        {loading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-16 text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse h-6 w-6 bg-purple-600 rounded-full opacity-75"></div>
              </div>
            </div>
            <p className="text-gray-600 text-lg font-medium">Loading your creative projects...</p>
            <p className="text-gray-400 text-sm mt-2">Preparing something amazing for you ✨</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-16 text-center">
            <div className="relative mx-auto w-24 h-24 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full animate-pulse"></div>
              <BarChart3 className="h-12 w-12 text-purple-400 absolute inset-0 m-auto animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchQuery || filterStatus !== 'all' ? '🔍 No projects found' : '🚀 Ready to create?'}
            </h3>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                : 'Start your content repurposing journey by creating your first project. Transform one piece of content into multiple engaging posts!'
              }
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Button
                onClick={() => setView('create')}
                className="flex items-center gap-3 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
              >
                <Plus className="h-5 w-5" />
                Create Your First Project
              </Button>
            )}
          </div>
        ) : (
          <div className={`transition-all duration-500 ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
          }`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="transform hover:scale-[1.02] transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <ProjectCard
                  project={project}
                  viewMode={viewMode}
                  onClick={() => handleProjectClick(project.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;