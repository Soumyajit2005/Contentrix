const { model } = require('../config/gemini');

class GeminiService {
  static async generateContent(prompt) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate content with AI');
    }
  }

  static createRepurposePrompt(originalContent, platform) {
    const prompts = {
      twitter: `Transform the following content into an engaging Twitter thread. Create 5-7 tweets that:
- Start with a hook tweet
- Break down key points into digestible tweets
- Include relevant hashtags
- End with a call-to-action
- Use emojis appropriately
- Keep each tweet under 280 characters

Format your response as JSON:
{
  "title": "Twitter Thread Title",
  "content": "Full thread text with tweet numbers",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "tweetCount": 5
}

Original content:
${originalContent}`,

      linkedin: `Transform the following content into a professional LinkedIn post that:
- Starts with a compelling hook
- Provides valuable insights
- Uses bullet points or numbered lists for readability
- Includes a professional call-to-action
- Incorporates relevant hashtags
- Maintains a professional yet engaging tone

Format your response as JSON:
{
  "title": "LinkedIn Post Title",
  "content": "Full LinkedIn post text",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "keyPoints": ["point1", "point2", "point3"]
}

Original content:
${originalContent}`,

      tiktok: `Transform the following content into a TikTok video script that:
- Has a strong hook in the first 3 seconds
- Includes visual cues and scene descriptions
- Provides clear timing markers
- Suggests trending audio or effects
- Includes a strong call-to-action
- Uses popular hashtags

Format your response as JSON:
{
  "title": "TikTok Video Script",
  "content": "Full script with timing and visual cues",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "duration": "30 seconds",
  "visualCues": ["cue1", "cue2"]
}

Original content:
${originalContent}`,

      instagram: `Transform the following content into an Instagram post that:
- Creates an engaging caption with line breaks
- Includes relevant hashtags (mix of popular and niche)
- Suggests visual elements or carousel ideas
- Has a clear call-to-action
- Uses Instagram-friendly formatting

Format your response as JSON:
{
  "title": "Instagram Post Caption",
  "content": "Full Instagram caption",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "visualSuggestions": ["suggestion1", "suggestion2"]
}

Original content:
${originalContent}`
    };

    return prompts[platform] || prompts.twitter;
  }
}

module.exports = GeminiService;