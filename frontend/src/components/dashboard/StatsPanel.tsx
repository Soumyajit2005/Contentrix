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
      title: "Content Repurposed",
      value: stats?.totalContent || 0,
      change: "+12% this week",
      icon: <FileText className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: "Time Saved",
      value: `${stats?.timeSaved || 0}h`,
      change: "This month",
      icon: <Clock className="h-5 w-5" />,
      color: "text-brand-500",
    },
    {
      title: "This Month",
      value: stats?.monthlyContent || 0,
      change: "Content pieces",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-purple-500",
    },
    {
      title: "Platforms",
      value: Object.keys(stats?.platformCounts || {}).length || 0,
      change: "Active integrations",
      icon: <Zap className="h-5 w-5" />,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <div className={stat.color}>{stat.icon}</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stat.value}
          </div>
          <p className="text-sm text-gray-500">{stat.change}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
