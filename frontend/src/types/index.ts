export interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
  }
}

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