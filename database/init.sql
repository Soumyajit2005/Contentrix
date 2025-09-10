-- RepurposePie Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  usage_stats JSONB DEFAULT '{"projects_created": 0, "content_generated": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  content_type TEXT CHECK (content_type IN ('text', 'url', 'file')),
  original_content TEXT,
  source_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'review', 'published')),
  selected_platforms TEXT[],
  target_audience TEXT,
  brand_voice TEXT,
  analysis_results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated content table
CREATE TABLE IF NOT EXISTS public.generated_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  content JSONB NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'rejected', 'scheduled', 'published')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  performance_metrics JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content files table (for file uploads)
CREATE TABLE IF NOT EXISTS public.content_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  file_url TEXT,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content history table (for tracking changes)
CREATE TABLE IF NOT EXISTS public.content_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  content_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  default_platforms TEXT[],
  brand_guidelines JSONB,
  notification_settings JSONB DEFAULT '{"email": true, "browser": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for projects table
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for generated_content table
CREATE POLICY "Users can view own generated content" ON public.generated_content
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Users can manage own generated content" ON public.generated_content
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

-- RLS Policies for content_files table
CREATE POLICY "Users can view own content files" ON public.content_files
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Users can manage own content files" ON public.content_files
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

-- RLS Policies for content_history table
CREATE POLICY "Users can view own content history" ON public.content_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content history" ON public.content_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_preferences table
CREATE POLICY "Users can manage own preferences" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_generated_content_project_id ON public.generated_content(project_id);
CREATE INDEX IF NOT EXISTS idx_generated_content_platform ON public.generated_content(platform);
CREATE INDEX IF NOT EXISTS idx_content_files_project_id ON public.content_files(project_id);
CREATE INDEX IF NOT EXISTS idx_content_history_user_id ON public.content_history(user_id);
CREATE INDEX IF NOT EXISTS idx_content_history_project_id ON public.content_history(project_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generated_content_updated_at BEFORE UPDATE ON public.generated_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Legacy compatibility tables (for backend compatibility)
-- Profiles table (duplicate of users for legacy support)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Repurposed content table (legacy format for backward compatibility)
CREATE TABLE IF NOT EXISTS public.repurposed_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  original_content TEXT NOT NULL,
  platform TEXT NOT NULL,
  repurposed_content TEXT NOT NULL,
  hashtags TEXT[],
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project files table (alias for content_files for backend compatibility)
CREATE TABLE IF NOT EXISTS public.project_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  file_url TEXT,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repurposed_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for repurposed_content table
CREATE POLICY "Users can view own repurposed content" ON public.repurposed_content
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own repurposed content" ON public.repurposed_content
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for project_files table
CREATE POLICY "Users can view own project files" ON public.project_files
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Users can manage own project files" ON public.project_files
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

-- Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_profiles_id ON public.profiles(id);
CREATE INDEX IF NOT EXISTS idx_repurposed_content_user_id ON public.repurposed_content(user_id);
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON public.project_files(project_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample platform configurations (optional)
-- You can customize these based on your supported platforms
INSERT INTO public.content_history (user_id, action, content_data) 
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'system_init',
  '{
    "supported_platforms": [
      "twitter", "linkedin", "facebook", "instagram", "youtube", 
      "tiktok", "pinterest", "reddit", "medium", "blog"
    ],
    "platform_limits": {
      "twitter": {"max_length": 280, "supports_images": true, "supports_videos": true},
      "linkedin": {"max_length": 3000, "supports_images": true, "supports_videos": true},
      "facebook": {"max_length": 63206, "supports_images": true, "supports_videos": true},
      "instagram": {"max_length": 2200, "supports_images": true, "supports_videos": true},
      "youtube": {"max_length": 5000, "supports_images": true, "supports_videos": true}
    }
  }'
) ON CONFLICT DO NOTHING;
