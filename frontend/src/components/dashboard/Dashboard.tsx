"use client";

import { useState } from "react";
import ContentInput from "./ContentInput";
import ContentOutput from "./ContentOutput";
import StatsPanel from "./StatsPanel";
import { useContent } from "@/hooks/useContent";
import type { RepurposedContent } from "@/types";

const Dashboard = () => {
  const [currentResult, setCurrentResult] = useState<RepurposedContent | null>(
    null
  );
  const { loading } = useContent();

  const handleContentRepurposed = (result: RepurposedContent) => {
    setCurrentResult(result);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Stats Panel */}
      <StatsPanel />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <ContentInput onContentRepurposed={handleContentRepurposed} />

        {/* Output Section */}
        <ContentOutput result={currentResult} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
