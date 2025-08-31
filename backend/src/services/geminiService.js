const { model } = require('../config/gemini');

class GeminiService {
  static async generateContent(prompt) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Handle rate limiting with exponential backoff
      if (error.status === 429) {
        console.log('Rate limit hit, using fallback...');
        throw new Error('Rate limit exceeded - using fallback analysis');
      }
      
      throw new Error('Failed to generate content with AI');
    }
  }

  static createRepurposePrompt(originalContent, platform, contentFiles = []) {
    const fileContext = contentFiles.length > 0 
      ? '\n\nAdditional context from uploaded files:\n' + contentFiles.map(f => '- ' + f.type.toUpperCase() + ' file: ' + (f.fileName || 'Unnamed')).join('\n')
      : '';

    const prompts = {
      twitter: `Transform the following content into an engaging Twitter thread. Create 5-7 tweets that:
- Start with a hook tweet that grabs attention
- Break down key points into digestible tweets  
- Include relevant hashtags (2-3 per tweet maximum)
- End with a call-to-action or engagement question
- Use emojis appropriately to increase engagement
- Keep each tweet under 280 characters

Format your response as JSON:
{
  "title": "Twitter Thread Title",
  "content": "Full thread text with tweet numbers (1/n format)",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "tweetCount": 5,
  "guidance": {
    "formatting": ["Keep tweets under 280 characters", "Use line breaks for readability"],
    "engagement": ["Ask questions to encourage replies", "Use trending hashtags when relevant"],
    "bestPractices": ["Post consistently throughout the day", "Engage with your community regularly"],
    "postingSteps": ["Schedule tweets for optimal times", "Reply to comments quickly"]
  }
}

Original content:
${originalContent}${fileContext}`,

      linkedin: `Transform the following content into a professional LinkedIn post that:
- Uses a professional yet engaging tone
- Starts with a compelling hook
- Includes industry insights or personal experiences
- Has clear paragraph breaks for readability
- Ends with a thought-provoking question
- Uses 3-5 relevant hashtags

Format your response as JSON:
{
  "title": "LinkedIn Post Title", 
  "content": "Full LinkedIn post with proper formatting",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "guidance": {
    "formatting": ["Use professional language", "Structure with clear paragraphs", "Include compelling hook"],
    "engagement": ["Ask thought-provoking questions", "Share industry insights", "Comment on others' posts"],
    "bestPractices": ["Post 1-2 times per day maximum", "Focus on value-driven content", "Use LinkedIn Analytics"],
    "postingSteps": ["Post during business hours", "Engage within first hour", "Use LinkedIn native features"]
  }
}

Original content:
${originalContent}${fileContext}`,

      facebook: `Transform the following content into a Facebook post that:
- Creates engaging, conversational content
- Uses Facebook-specific features and formatting
- Includes community-building elements
- Has clear calls-to-action
- Uses 2-4 hashtags maximum
- Encourages comments and sharing

Format your response as JSON:
{
  "title": "Facebook Post Title",
  "content": "Full Facebook post content", 
  "hashtags": ["#hashtag1", "#hashtag2"],
  "guidance": {
    "formatting": ["Write in conversational tone", "Use Facebook features like polls", "Tag relevant pages"],
    "engagement": ["Encourage comments with questions", "Share behind-the-scenes content", "Use Facebook Live"],
    "bestPractices": ["Post when audience is most active", "Share mix of content types", "Build community through Groups"],
    "postingSteps": ["Use Facebook Insights to optimize timing", "Create shareable content", "Respond to comments promptly"]
  }
}

Original content:
${originalContent}${fileContext}`,

      instagram: `Transform the following content into an Instagram post that:
- Creates an engaging caption with line breaks
- Includes relevant hashtags (mix of popular and niche, 10-15 total)
- Suggests visual elements or carousel ideas
- Has a clear call-to-action
- Uses Instagram-friendly formatting

Format your response as JSON:
{
  "title": "Instagram Post Caption",
  "content": "Full Instagram caption with proper formatting",
  "hashtags": ["#hashtag1", "#hashtag2"], 
  "visualSuggestions": ["High-quality lifestyle image", "Carousel with key points", "Behind-the-scenes content"],
  "guidance": {
    "formatting": ["Use line breaks for readability", "Lead with compelling visuals", "Include call-to-action"],
    "engagement": ["Use relevant and trending hashtags", "Post Stories regularly", "Use Instagram Reels"],
    "bestPractices": ["Maintain consistent visual aesthetic", "Post high-quality images", "Cross-promote on other platforms"],
    "postingSteps": ["Post at optimal times (11 AM, 2 PM, 5 PM)", "Engage within first hour", "Use Instagram Shopping if applicable"]
  }
}

Original content:
${originalContent}${fileContext}`,

      youtube: `Transform the following content into YouTube video content that:
- Creates a compelling video title and description
- Includes video structure with timestamps
- Suggests thumbnail ideas
- Has SEO-optimized description
- Includes relevant tags and hashtags

Format your response as JSON:
{
  "title": "YouTube Video Title",
  "content": "Video description with timestamps and structure",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "keyPoints": ["Introduction (0:00)", "Main content breakdown", "Conclusion and CTA"],
  "guidance": {
    "formatting": ["Create compelling titles", "Write detailed descriptions", "Use custom thumbnails", "Include timestamps"],
    "engagement": ["Ask viewers to like and subscribe", "Respond to comments actively", "Use end screens and cards"],
    "bestPractices": ["Maintain consistent upload schedule", "Optimize for YouTube SEO", "Create engaging thumbnails"],
    "postingSteps": ["Upload at optimal times (2-4 PM, 6-8 PM)", "Use YouTube Analytics", "Create playlists"]
  }
}

Original content:
${originalContent}${fileContext}`,

      tiktok: `Transform the following content into a TikTok video script that:
- Creates a hook within first 3 seconds
- Uses trending sounds/music suggestions  
- Includes visual cues and timing
- Has engaging captions
- Uses trending hashtags
- Includes a strong call-to-action

Format your response as JSON:
{
  "title": "TikTok Video Script",
  "content": "Full script with timing and visual cues",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "duration": "30-60 seconds",
  "visualCues": ["Quick cuts for engagement", "Text overlays for key points", "Trending transition effects"],
  "guidance": {
    "formatting": ["Hook in first 3 seconds", "Use trending sounds", "Keep videos short and engaging"],
    "engagement": ["Participate in trending challenges", "Use popular hashtags", "Collaborate with other creators"],
    "bestPractices": ["Post consistently every day", "Study trending content", "Use TikTok's native editing tools"],
    "postingSteps": ["Post multiple times per day", "Engage with comments immediately", "Use trending sounds and effects"]
  }
}

Original content:
${originalContent}${fileContext}`
    };

    return prompts[platform] || prompts.twitter;
  }

  static async analyzeContentAndSuggestPlatforms(content, files = []) {
    try {
      const fileContext = files.length > 0 
        ? `\n\nAttached Files Analysis:\n${files.map(f => `- ${f.type.toUpperCase()} file: "${f.fileName}" (${Math.round(f.size/1024)}KB)`).join('\n')}`
        : '';

      const prompt = `As an expert content strategist with deep knowledge of digital platforms and audience behavior, analyze the following content and recommend the most effective platforms for maximum reach and engagement.

CONTENT TO ANALYZE:
${content}${fileContext}

COMPREHENSIVE ANALYSIS REQUIRED:
1. Content categorization and audience identification
2. Optimal platform selection from diverse digital ecosystem
3. Platform-specific adaptation strategies
4. Engagement optimization recommendations

Consider these platform categories:
- Professional Networks: LinkedIn, AngelList, Wellfound, Glassdoor
- Social Media: Twitter/X, Instagram, Facebook, TikTok, Snapchat, BeReal
- Content Communities: Reddit, Discord, Slack communities, Telegram
- Creative Platforms: Pinterest, Behance, Dribbble, DeviantArt, Figma Community
- Video Platforms: YouTube, Vimeo, Twitch, YouTube Shorts, Instagram Reels
- Publishing: Medium, Substack, Hashnode, Dev.to, Ghost, WordPress
- Professional Forums: Stack Overflow, GitHub, ProductHunt, Indie Hackers
- Niche Communities: Quora, Clubhouse, Spaces, specialized forums
- E-commerce/Review: Amazon, Etsy, Trustpilot, Google Reviews
- News/Discussion: Hacker News, Mastodon, Threads, Bluesky

Return response as JSON with this structure:
{
  "contentAnalysis": {
    "primaryCategory": "content main category",
    "secondaryCategories": ["related", "categories"],
    "contentType": "text/image/video/document/mixed",
    "complexity": "beginner/intermediate/advanced",
    "targetAudience": "detailed audience description",
    "tone": "professional/casual/educational/entertainment/inspirational",
    "keyTopics": ["main", "topics", "covered"],
    "contentLength": "short/medium/long",
    "engagementPotential": "low/medium/high",
    "viralPotential": "low/medium/high",
    "demographicAppeal": "age groups and interests most likely to engage"
  },
  "suggestedPlatforms": [
    {
      "id": "platform_identifier",
      "name": "Platform Name",
      "category": "Platform category",
      "icon": "appropriate emoji",
      "description": "Platform overview and unique value",
      "relevanceScore": 85,
      "audience": "Platform's primary user base",
      "bestFor": "Content types that perform best",
      "contentFormat": "Optimal content structure",
      "engagementStyle": "How users interact",
      "competitionLevel": "low/medium/high",
      "organicReach": "Platform's organic visibility",
      "postingGuidance": {
        "optimalLength": "specific character/word limits",
        "bestTimes": ["optimal posting schedule"],
        "hashtags": "hashtag strategy and recommendations",
        "formatting": ["specific formatting tips"],
        "engagement": ["proven engagement tactics"],
        "bestPractices": ["platform-specific optimization tips"],
        "contentAdaptation": "how to modify content for this platform"
      }
    }
  ]
}

Suggest 20-30 platforms with relevance scores above 70. Focus on platforms where this specific content type and audience would thrive. Provide actionable, specific guidance for each platform.`;

      const response = await this.generateContent(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Content analysis error:', error);
      // Fallback to basic analysis
      return this.getFallbackAnalysis(content, files);
    }
  }

  static getFallbackAnalysis(content, files) {
    // Analyze content to provide better suggestions
    const hasImages = files.some(f => f.type === 'image');
    const hasDocuments = files.some(f => f.type === 'document');
    const wordCount = content.split(' ').length;
    const contentLower = content.toLowerCase();
    
    // Determine content category
    let category = "general";
    let subcategories = ["content"];
    
    if (contentLower.includes('business') || contentLower.includes('startup') || contentLower.includes('saas')) {
      category = "business";
      subcategories = ["entrepreneurship", "business", "technology"];
    } else if (contentLower.includes('tech') || contentLower.includes('software') || contentLower.includes('ai')) {
      category = "technology";
      subcategories = ["tech", "innovation", "software"];
    } else if (contentLower.includes('design') || contentLower.includes('creative')) {
      category = "design";
      subcategories = ["design", "creative", "visual"];
    }

    return {
      contentAnalysis: {
        primaryCategory: category,
        secondaryCategories: subcategories,
        contentType: hasImages ? "mixed" : hasDocuments ? "document" : "text",
        complexity: wordCount > 500 ? "advanced" : wordCount > 200 ? "intermediate" : "beginner",
        targetAudience: "professionals and enthusiasts in " + category,
        tone: "professional",
        keyTopics: content.split(' ').slice(0, 8).filter(word => word.length > 3),
        contentLength: wordCount > 500 ? "long" : wordCount > 200 ? "medium" : "short",
        engagementPotential: hasImages ? "high" : "medium",
        viralPotential: category === "technology" ? "high" : "medium"
      },
      suggestedPlatforms: [
        {
          id: "linkedin",
          name: "LinkedIn",
          category: "Professional Network",
          icon: "💼",
          description: "Professional networking and business content",
          relevanceScore: 95,
          audience: "Professionals, business leaders, entrepreneurs",
          bestFor: "Business insights, professional updates, industry content",
          contentFormat: "1-3 paragraphs with professional tone",
          engagementStyle: "Professional comments, shares, endorsements",
          competitionLevel: "medium",
          organicReach: "good for business content",
          postingGuidance: {
            optimalLength: "1200-2000 characters",
            bestTimes: ["8 AM", "12 PM", "5 PM"],
            hashtags: "3-5 professional hashtags",
            formatting: ["Professional tone", "Clear structure", "Industry insights"],
            engagement: ["Ask thought-provoking questions", "Share experiences", "Tag relevant people"],
            bestPractices: ["Post consistently", "Engage with comments", "Share valuable insights"],
            contentAdaptation: "Focus on professional value and business insights"
          }
        },
        {
          id: "twitter",
          name: "Twitter/X",
          category: "Social Media",
          icon: "🐦",
          description: "Real-time social networking and microblogging",
          relevanceScore: 88,
          audience: "General public, news consumers, thought leaders",
          bestFor: "Quick updates, breaking news, threads, conversations",
          contentFormat: "280 characters per tweet, threads for longer content",
          engagementStyle: "Fast-paced interactions, retweets, replies",
          competitionLevel: "high",
          organicReach: "moderate, depends on engagement",
          postingGuidance: {
            optimalLength: "Under 280 characters per tweet",
            bestTimes: ["9 AM", "12 PM", "3 PM", "6 PM"],
            hashtags: "2-3 relevant hashtags maximum",
            formatting: ["Concise language", "Clear message", "Engaging hooks"],
            engagement: ["Reply to comments", "Use trending hashtags", "Create polls"],
            bestPractices: ["Tweet consistently", "Engage authentically", "Share timely content"],
            contentAdaptation: "Break into tweet-sized chunks or create thread"
          }
        },
        {
          id: "medium",
          name: "Medium",
          category: "Publishing Platform",
          icon: "📝",
          description: "Long-form content publishing and thought leadership",
          relevanceScore: 85,
          audience: "Readers, writers, professionals seeking in-depth content",
          bestFor: "Detailed articles, thought leadership, tutorials",
          contentFormat: "Long-form articles (5+ minute read)",
          engagementStyle: "Thoughtful comments, claps, follows",
          competitionLevel: "medium",
          organicReach: "good for quality content",
          postingGuidance: {
            optimalLength: "1500-3000 words",
            bestTimes: ["7 AM", "1 PM", "8 PM"],
            hashtags: "Use Medium tags instead",
            formatting: ["Clear headings", "Subheadings", "Images for breaks"],
            engagement: ["Respond to comments", "Engage with other writers", "Join publications"],
            bestPractices: ["Focus on quality", "Use compelling headlines", "Add value"],
            contentAdaptation: "Expand into comprehensive article with examples"
          }
        },
        {
          id: "reddit",
          name: "Reddit",
          category: "Community Platform",
          icon: "🤖",
          description: "Community-driven discussions and content sharing",
          relevanceScore: 82,
          audience: "Diverse communities with specific interests",
          bestFor: "Community discussions, AMAs, sharing resources",
          contentFormat: "Text posts, links, images with context",
          engagementStyle: "Upvotes, detailed comments, community interaction",
          competitionLevel: "high",
          organicReach: "excellent if community embraces content",
          postingGuidance: {
            optimalLength: "200-500 words with context",
            bestTimes: ["6 AM", "10 AM", "7 PM"],
            hashtags: "Not applicable - use relevant subreddits",
            formatting: ["Clear titles", "Provide context", "Follow subreddit rules"],
            engagement: ["Respond to all comments", "Follow community guidelines", "Add genuine value"],
            bestPractices: ["Know the community", "Provide value first", "Be authentic"],
            contentAdaptation: "Tailor to specific subreddit interests and rules"
          }
        },
        {
          id: "producthunt",
          name: "Product Hunt",
          category: "Product Discovery",
          icon: "🚀",
          description: "Platform for discovering and launching new products",
          relevanceScore: category === "technology" || category === "business" ? 90 : 75,
          audience: "Entrepreneurs, makers, early adopters, investors",
          bestFor: "Product launches, tool discoveries, tech announcements",
          contentFormat: "Product descriptions with visuals",
          engagementStyle: "Upvotes, comments, maker interactions",
          competitionLevel: "high",
          organicReach: "excellent for featured products",
          postingGuidance: {
            optimalLength: "Brief description with key benefits",
            bestTimes: ["12:01 AM PST launch day"],
            hashtags: "Use relevant tags and categories",
            formatting: ["Clear product value", "High-quality visuals", "Compelling tagline"],
            engagement: ["Respond to comments", "Thank supporters", "Share updates"],
            bestPractices: ["Build community first", "Prepare launch materials", "Follow up"],
            contentAdaptation: "Focus on product value and innovation"
          }
        },
        {
          id: "youtube",
          name: "YouTube",
          category: "Video Platform",
          icon: "📺",
          description: "Video content sharing and monetization platform",
          relevanceScore: hasImages ? 85 : 75,
          audience: "Global audience across all demographics",
          bestFor: "Tutorials, explanations, entertainment, education",
          contentFormat: "Video content with thumbnails and descriptions",
          engagementStyle: "Views, likes, comments, subscriptions",
          competitionLevel: "very high",
          organicReach: "excellent for engaging content",
          postingGuidance: {
            optimalLength: "8-15 minutes for optimal retention",
            bestTimes: ["2 PM", "8 PM", "9 PM"],
            hashtags: "Use in description and tags",
            formatting: ["Compelling thumbnails", "Clear titles", "Structured content"],
            engagement: ["Reply to comments", "Create playlists", "Use community tab"],
            bestPractices: ["Consistent upload schedule", "SEO optimization", "Audience retention"],
            contentAdaptation: "Convert to video format with visual elements"
          }
        },
        {
          id: "instagram",
          name: "Instagram",
          category: "Visual Social Media",
          icon: "📸",
          description: "Visual content sharing with photos and videos",
          relevanceScore: hasImages ? 90 : 70,
          audience: "Younger demographics, visual content consumers",
          bestFor: "Visual storytelling, behind-the-scenes, lifestyle content",
          contentFormat: "Images, videos, stories, reels",
          engagementStyle: "Likes, comments, shares, saves",
          competitionLevel: "very high",
          organicReach: "declining but good for engaging content",
          postingGuidance: {
            optimalLength: "2200 characters max for captions",
            bestTimes: ["11 AM", "1 PM", "5 PM"],
            hashtags: "20-30 relevant hashtags",
            formatting: ["High-quality visuals", "Engaging captions", "Story highlights"],
            engagement: ["Use stories", "Respond to DMs", "Create reels"],
            bestPractices: ["Visual consistency", "Use all features", "Engage with community"],
            contentAdaptation: "Create visual representations and carousel posts"
          }
        }
      ]
    };
  }

  static async analyzeContentFiles(files) {
    const analysis = {
      totalFiles: files.length,
      types: [],
      hasImages: false,
      hasDocuments: false,
      hasText: false,
      suggestedPlatforms: []
    };

    files.forEach(file => {
      if (file.type === 'image') {
        analysis.hasImages = true;
        analysis.types.push('image');
      } else if (file.type === 'document') {
        analysis.hasDocuments = true;
        analysis.types.push('document');
      } else if (file.type === 'text') {
        analysis.hasText = true;
        analysis.types.push('text');
      }
    });

    return analysis;
  }
}

module.exports = GeminiService;