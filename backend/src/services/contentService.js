const supabase = require('../config/supabase');
const GeminiService = require('./geminiService');

class ContentService {
  // Legacy method for backward compatibility
  static async repurposeContent(originalContent, platform, userId) {
    try {
      // Generate repurposed content using Gemini
      const prompt = GeminiService.createRepurposePrompt(originalContent, platform);
      const aiResponse = await GeminiService.generateContent(prompt);
      
      // Parse JSON response
      let parsedContent;
      try {
        let jsonString = aiResponse;
        
        // Remove markdown code block formatting if present
        if (jsonString.includes('```json')) {
          jsonString = jsonString.replace(/```json\s*\n?/g, '').replace(/\n?\s*```/g, '');
        } else if (jsonString.includes('```')) {
          jsonString = jsonString.replace(/```\s*\n?/g, '').replace(/\n?\s*```/g, '');
        }
        
        // Clean up extra whitespace
        jsonString = jsonString.trim();
        
        parsedContent = JSON.parse(jsonString);
      } catch (parseError) {
        console.error('JSON parsing failed:', parseError);
        // Fallback if JSON parsing fails
        parsedContent = {
          title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Post`,
          content: aiResponse,
          hashtags: [`#${platform}`, '#content', '#AI']
        };
      }

      // Save to database (keeping legacy table for compatibility)
      const { data, error } = await supabase
        .from('repurposed_content')
        .insert({
          user_id: userId,
          original_content: originalContent.substring(0, 5000),
          platform,
          repurposed_content: parsedContent.content,
          hashtags: parsedContent.hashtags || [],
          title: parsedContent.title
        })
        .select()
        .single();

      if (error) throw error;

      return {
        ...parsedContent,
        id: data.id,
        createdAt: data.created_at
      };
    } catch (error) {
      console.error('Content repurpose error:', error);
      throw error;
    }
  }

  static async getContentHistory(userId, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabase
        .from('repurposed_content')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        content: data,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      console.error('Get content history error:', error);
      throw error;
    }
  }

  static async deleteContent(contentId, userId) {
    try {
      const { error } = await supabase
        .from('repurposed_content')
        .delete()
        .eq('id', contentId)
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Delete content error:', error);
      throw error;
    }
  }

  // NEW PROJECT-BASED METHODS

  // Create a new project with full analysis
  static async createProject(projectData, userId) {
    try {
      const { name, contentType, content, url, files, smartDetect } = projectData;

      // Analyze content and suggest platforms
      const analysis = await GeminiService.analyzeContentAndSuggestPlatforms(
        content || url || '', 
        files || []
      );

      // Create project record
      const { data: project, error } = await supabase
        .from('projects')
        .insert({
          user_id: userId,
          name,
          content_type: contentType,
          original_content: content || url || '',
          analysis_results: analysis.contentAnalysis,
          suggested_platforms: analysis.suggestedPlatforms,
          selected_platforms: smartDetect 
            ? analysis.suggestedPlatforms.slice(0, 3).map(p => p.id)
            : [],
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;

      // Handle file uploads if any
      if (files && files.length > 0) {
        await ContentService.handleFileUploads(project.id, files, userId);
      }

      return {
        ...project,
        analysis: analysis.contentAnalysis,
        suggestedPlatforms: analysis.suggestedPlatforms
      };
    } catch (error) {
      console.error('Create project error:', error);
      throw error;
    }
  }

  // Handle file uploads to Supabase storage
  static async handleFileUploads(projectId, files, userId) {
    try {
      const uploadPromises = files.map(async (file) => {
        // Upload file to Supabase storage
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${userId}/${projectId}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('content-files')
          .upload(fileName, file.buffer);

        if (uploadError) throw uploadError;

        // Save file record
        const { data: fileRecord, error: fileError } = await supabase
          .from('project_files')
          .insert({
            project_id: projectId,
            user_id: userId,
            file_name: file.originalname,
            file_path: uploadData.path,
            file_size: file.size,
            file_type: ContentService.getFileType(file.mimetype),
            mime_type: file.mimetype
          })
          .select()
          .single();

        if (fileError) throw fileError;
        return fileRecord;
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  // Get file type from MIME type
  static getFileType(mimeType) {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('text') || mimeType.includes('document')) return 'document';
    return 'document';
  }

  // Generate content for selected platforms
  static async generateContent(projectId, platforms, userId) {
    try {
      // Get project data
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('user_id', userId)
        .single();

      if (projectError) throw projectError;

      // Update project status
      await supabase
        .from('projects')
        .update({ 
          status: 'generating',
          selected_platforms: platforms,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId);

      // Generate content for each platform
      const generationPromises = platforms.map(async (platform) => {
        try {
          const prompt = GeminiService.createRepurposePrompt(
            project.original_content, 
            platform
          );
          const aiResponse = await GeminiService.generateContent(prompt);
          
          // Parse AI response
          let parsedContent;
          try {
            let jsonString = aiResponse;
            
            // Remove markdown code block formatting if present
            if (jsonString.includes('```json')) {
              jsonString = jsonString.replace(/```json\s*\n?/g, '').replace(/\n?\s*```/g, '');
            } else if (jsonString.includes('```')) {
              jsonString = jsonString.replace(/```\s*\n?/g, '').replace(/\n?\s*```/g, '');
            }
            
            // Clean up extra whitespace
            jsonString = jsonString.trim();
            
            parsedContent = JSON.parse(jsonString);
          } catch (parseError) {
            console.error('JSON parsing failed for platform:', platform, parseError);
            parsedContent = {
              title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Post`,
              content: aiResponse,
              hashtags: [`#${platform}`, '#content', '#AI'],
              guidance: {}
            };
          }

          // Ensure we have the required fields
          if (!parsedContent.content) {
            console.warn('No content field found in parsed response, using full response as fallback');
            parsedContent.content = aiResponse;
          }
          if (!parsedContent.title) {
            parsedContent.title = `${platform.charAt(0).toUpperCase() + platform.slice(1)} Post`;
          }
          if (!parsedContent.hashtags) {
            parsedContent.hashtags = [`#${platform}`, '#content'];
          }

          // Save generated content
          const { data: contentData, error: contentError } = await supabase
            .from('generated_content')
            .insert({
              project_id: projectId,
              user_id: userId,
              platform,
              title: parsedContent.title,
              content: parsedContent.content,
              hashtags: parsedContent.hashtags || [],
              guidance: parsedContent.guidance || {},
              status: 'complete'
            })
            .select()
            .single();

          if (contentError) throw contentError;
          return contentData;
        } catch (error) {
          console.error(`Error generating content for ${platform}:`, error);
          
          // Save error state
          await supabase
            .from('generated_content')
            .insert({
              project_id: projectId,
              user_id: userId,
              platform,
              status: 'error',
              error_message: error.message
            });
          
          return null;
        }
      });

      const results = await Promise.all(generationPromises);
      const successfulResults = results.filter(r => r !== null);

      // Update project status
      const finalStatus = successfulResults.length === platforms.length ? 'review' : 'draft';
      await supabase
        .from('projects')
        .update({ 
          status: finalStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId);

      return successfulResults;
    } catch (error) {
      console.error('Generate content error:', error);
      
      // Update project with error status
      await supabase
        .from('projects')
        .update({ 
          status: 'draft',
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId);
      
      throw error;
    }
  }

  // Get project with all related data
  static async getProject(projectId, userId) {
    try {
      // Get project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('user_id', userId)
        .single();

      if (projectError) throw projectError;

      // Get generated content
      const { data: generatedContent, error: contentError } = await supabase
        .from('generated_content')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (contentError) throw contentError;

      // Get project files
      const { data: files, error: filesError } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId);

      if (filesError) throw filesError;

      return {
        ...project,
        generatedContent: generatedContent || [],
        files: files || []
      };
    } catch (error) {
      console.error('Get project error:', error);
      throw error;
    }
  }

  // Get user's projects with pagination
  static async getUserProjects(userId, page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      let query = supabase
        .from('projects')
        .select(`
          *,
          generated_content:generated_content(count)
        `, { count: 'exact' })
        .eq('user_id', userId);

      // Apply filters
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      const { data, error, count } = await query
        .order('updated_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        projects: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error) {
      console.error('Get user projects error:', error);
      throw error;
    }
  }

  // Update generated content
  static async updateGeneratedContent(contentId, updates, userId) {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', contentId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update content error:', error);
      throw error;
    }
  }

  // Approve/unapprove content
  static async approveContent(contentId, approved, userId) {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .update({
          approved,
          approved_at: approved ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', contentId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Approve content error:', error);
      throw error;
    }
  }

  // Get user analytics
  static async getUserAnalytics(userId) {
    try {
      // Get total projects
      const { count: totalProjects } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get total generated content
      const { count: totalContent } = await supabase
        .from('generated_content')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get this month's projects
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: monthlyProjects } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', startOfMonth.toISOString());

      // Get platform distribution
      const { data: platformData } = await supabase
        .from('generated_content')
        .select('platform')
        .eq('user_id', userId);

      const platformCounts = (platformData || []).reduce((acc, item) => {
        acc[item.platform] = (acc[item.platform] || 0) + 1;
        return acc;
      }, {});

      return {
        totalContent: totalContent || 0,
        totalProjects: totalProjects || 0,
        monthlyContent: monthlyProjects || 0,
        timeSaved: Math.round(((totalContent || 0) * 0.75) * 10) / 10,
        platformCounts,
        avgEngagement: 0 // Placeholder for future engagement tracking
      };
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }
}

module.exports = {
  // Legacy exports for backward compatibility
  repurposeContent: ContentService.repurposeContent,
  getContentHistory: ContentService.getContentHistory,
  deleteContent: ContentService.deleteContent,
  
  // New project-based exports
  createProject: ContentService.createProject,
  generateContent: ContentService.generateContent,
  getProject: ContentService.getProject,
  getUserProjects: ContentService.getUserProjects,
  updateGeneratedContent: ContentService.updateGeneratedContent,
  approveContent: ContentService.approveContent,
  getUserAnalytics: ContentService.getUserAnalytics
};