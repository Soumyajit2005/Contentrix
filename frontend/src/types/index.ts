export interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
  }
}

// Legacy interfaces (keep for backward compatibility)
export interface RepurposedContent {
  title: string
  content: string
  hashtags: string[]
  id?: string
  createdAt?: string
  platform?: string
  tweetCount?: number
  keyPoints?: string[]
  duration?: string
  visualCues?: string[]
  visualSuggestions?: string[]
}

export interface UserStats {
  totalContent: number
  monthlyContent: number
  timeSaved: number
  platformCounts: Record<string, number>
  totalProjects?: number
  avgEngagement?: number
}

export interface ContentPiece {
  id: string
  user_id: string
  original_content: string
  platform: string
  repurposed_content: string
  hashtags: string[] | null
  title: string | null
  created_at: string
}

// New project-based interfaces
export interface ContentFile {
  id: string
  project_id: string
  user_id?: string
  file_name: string
  file_path: string
  file_size: number
  file_type: 'image' | 'document' | 'video' | 'audio' | 'text'
  mime_type: string
  url?: string
  content?: string
  created_at: string
}

export interface ContentAnalysis {
  primaryCategory: string
  secondaryCategories: string[]
  contentType: string
  complexity: 'beginner' | 'intermediate' | 'advanced'
  targetAudience: string
  tone: string
  keyTopics: string[]
  contentLength: string
  engagementPotential: 'low' | 'medium' | 'high'
  viralPotential: 'low' | 'medium' | 'high'
  demographicAppeal: string
}

export interface PlatformSuggestion {
  id: string
  name: string
  category: string
  icon: string
  description: string
  relevanceScore: number
  audience: string
  bestFor: string
  contentFormat: string
  engagementStyle: string
  competitionLevel: string
  organicReach: string
}

export interface GeneratedContent {
  id: string
  project_id: string
  user_id: string
  platform: string
  title: string
  content: string
  hashtags: string[]
  guidance?: Record<string, unknown>
  status: 'generating' | 'complete' | 'error'
  approved?: boolean
  approved_at?: string | null
  error_message?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  user_id: string
  content_type: 'text' | 'url' | 'file'
  original_content: string
  analysis_results: ContentAnalysis
  suggested_platforms: PlatformSuggestion[]
  selected_platforms: string[]
  status: 'draft' | 'generating' | 'review' | 'scheduled' | 'published'
  created_at: string
  updated_at: string
  generatedContent?: GeneratedContent[]
  files?: ContentFile[]
}

// Form interfaces
export interface ProjectCreationForm {
  name: string
  contentType: 'text' | 'url' | 'file'
  content?: string
  url?: string
  files?: File[]
  smartDetect: boolean
}

// API Response interfaces
export interface ProjectsResponse {
  projects: Project[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Utility types
export type ProjectStatus = 'draft' | 'generating' | 'review' | 'scheduled' | 'published'
export type PlatformId = 'twitter' | 'linkedin' | 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'medium'