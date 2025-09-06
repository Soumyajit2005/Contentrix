'use client'

import { useState } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import type { RepurposedContent, UserStats, ContentPiece } from '@/types'

export const useContent = () => {
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ContentPiece[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)

  const repurposeContent = async (originalContent: string, platform: string): Promise<RepurposedContent> => {
    setLoading(true)
    try {
      const response = await api.post('/content/repurpose', {
        originalContent,
        platform,
      })

      toast.success('Content repurposed successfully!')
      return response.data
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to repurpose content'
      toast.error(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getContentHistory = async (page: number = 1, limit: number = 10) => {
    try {
      const response = await api.get(`/content/history?page=${page}&limit=${limit}`)
      setHistory(response.data.content)
      return response.data
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch content history'
      toast.error(message)
      throw error
    }
  }

  const deleteContent = async (contentId: string) => {
    try {
      await api.delete(`/content/${contentId}`)
      toast.success('Content deleted successfully')
      
      // Remove from local state
      setHistory(prev => prev.filter(item => item.id !== contentId))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete content'
      toast.error(message)
      throw error
    }
  }

  const getUserStats = async () => {
    try {
      const response = await api.get('/user/stats')
      setStats(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
    }
  }

  return {
    loading,
    history,
    stats,
    repurposeContent,
    getContentHistory,
    deleteContent,
    getUserStats,
  }
}