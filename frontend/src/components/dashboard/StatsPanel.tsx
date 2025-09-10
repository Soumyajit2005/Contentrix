"use client";

import { useEffect, useCallback } from "react";
import { TrendingUp, Clock, Zap, FileText } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const StatsPanel = () => {
  const { stats, getUserStats } = useContent();

  const loadStats = useCallback(() => {
    getUserStats();
  }, [getUserStats]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const statCards = [
    {
      title: "Content Created",
      value: stats?.totalContent || 0,
      change: "Total pieces generated",
      icon: <FileText className="h-6 w-6" />,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-100",
      emoji: "📝",
      description: "AI-powered content pieces"
    },
    {
      title: "Time Saved",
      value: `${stats?.timeSaved || 0}h`,
      change: "Hours automated",
      icon: <Clock className="h-6 w-6" />,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      emoji: "⏰",
      description: "Workflow efficiency gained"
    },
    {
      title: "This Month",
      value: stats?.monthlyContent || 0,
      change: "Recent projects",
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      emoji: "📈",
      description: "Monthly activity"
    },
    {
      title: "Platforms",
      value: Object.keys(stats?.platformCounts || {}).length || 0,
      change: "Active channels",
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      emoji: "🚀",
      description: "Cross-platform reach"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {statCards.map((stat, index) => (
        <div 
          key={index} 
          className={`group relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl shadow-lg hover:shadow-xl border border-white/60 p-8 transition-all duration-300 hover:scale-105 cursor-pointer`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-50 bg-dots-pattern"></div>
          
          {/* Floating emoji */}
          <div className="absolute top-4 right-4 text-2xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
            {stat.emoji}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {stat.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.change}</p>
            </div>

            {/* Progress bar animation */}
            <div className="mt-4 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out group-hover:w-full`}
                style={{
                  width: `${Math.min((stat.value as number || 0) * 10, 100)}%`
                }}
              ></div>
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
