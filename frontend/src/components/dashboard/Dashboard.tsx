"use client";

import { useState, useEffect } from "react";
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
import type { Project, ProjectsResponse, RepurposedContent } from "@/types";

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

  useEffect(() => {
    loadProjects();
  }, [searchQuery, filterStatus]);

  const loadProjects = async () => {
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
    } catch (error) {
      console.error('Failed to load projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Stats Panel */}
      <StatsPanel />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your content repurposing projects
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setView('legacy')}
            variant="outline"
            className="flex items-center gap-2"
          >
            Quick Repurpose
          </Button>
          <Button
            onClick={() => setView('create')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="generating">Generating</option>
              <option value="review">Review</option>
              <option value="published">Published</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          {[
            { label: 'Total Projects', value: projects.length, color: 'text-gray-600' },
            { label: 'In Progress', value: projects.filter(p => p.status === 'generating').length, color: 'text-blue-600' },
            { label: 'Ready to Review', value: projects.filter(p => p.status === 'review').length, color: 'text-orange-600' },
            { label: 'Published', value: projects.filter(p => p.status === 'published').length, color: 'text-green-600' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Grid/List */}
      {loading ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery || filterStatus !== 'all' ? 'No projects found' : 'No projects yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first project to start repurposing content'
            }
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Button
              onClick={() => setView('create')}
              className="flex items-center gap-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              Create Your First Project
            </Button>
          )}
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              viewMode={viewMode}
              onClick={() => handleProjectClick(project.id)}
              onStatusUpdate={loadProjects}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;