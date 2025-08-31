const supabase = require('../config/supabase');
const GeminiService = require('./geminiService');

class ContentService {
  static async repurposeContent(originalContent, platform, userId) {
    try {
      // Generate repurposed content using Gemini
      const prompt = GeminiService.createRepurposePrompt(originalContent, platform);
      const aiResponse = await GeminiService.generateContent(prompt);
      
      // Parse JSON response
      let parsedContent;
      try {
        parsedContent = JSON.parse(aiResponse);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        parsedContent = {
          title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Post`,
          content: aiResponse,
          hashtags: [`#${platform}`, '#content', '#AI']
        };
      }

      // Save to database
      const { data, error } = await supabase
        .from('repurposed_content')
        .insert({
          user_id: userId,
          original_content: originalContent.substring(0, 5000), // Limit length
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
}

module.exports = {
  repurposeContent: ContentService.repurposeContent,
  getContentHistory: ContentService.getContentHistory,
  deleteContent: ContentService.deleteContent
};