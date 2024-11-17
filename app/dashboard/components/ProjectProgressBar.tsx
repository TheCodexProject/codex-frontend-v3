"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { useWorkItems } from "@/hooks/services/WorkItemService";
import { useProject } from "@/contexts/ProjectContext";

const ProjectProgress: React.FC = () => {
  const { currentProject } = useProject(); // Access the current project from context
  const { data: workItems = [], isLoading } = useWorkItems(
    currentProject?.id || ""
  ); // Fetch work items for the current project

  // Calculate progress
  const completedCount = workItems.filter(
    (item) => item.status === "Done" || item.status === "Closed"
  ).length;
  const totalCount = workItems.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (!currentProject || isLoading) {
    return (
      <div className="text-gray-500">
        {isLoading ? "Loading progress..." : "No project selected."}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Progress value={progress} className="h-6 bg-gray-200 dark:bg-gray-700" />
      <span
        className={`absolute top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-700 dark:text-gray-300
          ${
            progress === 0
              ? "left-1/2 -translate-x-1/2 text-gray-700 dark:text-gray-300"
              : progress === 100
              ? "left-1/2 -translate-x-1/2 text-gray-300 dark:text-gray-700"
              : `left-[calc(${progress}%_-_46px)] text-white`
          }`}
      >
        {progress.toFixed(1)}% ({completedCount}/{totalCount} tasks completed)
      </span>
    </div>
  );
};

export default ProjectProgress;
