"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { ProjectActivity } from "@/services/models/ProjectActivity";
import { WorkItem } from "@/services/models/WorkItem";

interface MilestoneItemProps {
  milestone: ProjectActivity;
  workItems: WorkItem[];
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  milestone,
  workItems,
}) => {
  // Filter work items that belong to this milestone
  const milestoneWorkItems = workItems.filter((item) =>
    milestone.items.includes(item.id)
  );

  // Calculate progress based on the status of the work items
  const completedItemsCount = milestoneWorkItems.filter(
    (item) => item.status === "Done" || item.status === "Closed"
  ).length;
  const totalItemsCount = milestoneWorkItems.length;
  const progress =
    totalItemsCount > 0 ? (completedItemsCount / totalItemsCount) * 100 : 0;

  return (
    <li className="flex items-center justify-between">
      <div className="flex-1 mr-4">
        <p className="font-medium text-base">{milestone.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {milestone.description}
        </p>
      </div>
      <div className="w-24 relative">
        <Progress
          value={progress}
          className="h-6 bg-gray-200 dark:bg-gray-700"
          style={
            {
              "--progress-color":
                progress === 100
                  ? "rgb(59 130 246)" // Blue-500
                  : progress > 0
                  ? "rgb(96 165 250)" // Blue-400
                  : "rgb(219 234 254)", // Blue-100
            } as React.CSSProperties
          }
        />
        <span
          className={`absolute top-1/2 text-xs font-medium text-white dark:text-gray-700
            ${
              progress === 0
                ? "left-1/2 -translate-x-1/2 text-gray-700 dark:text-white"
                : progress === 100
                ? "left-1/2 -translate-x-1/2 text-white dark:text-gray-700"
                : "text-white"
            }`}
          style={{
            left: progress === 0 || progress === 100 ? "50%" : `${progress}%`,
            transform: "translate(-50%, -50%)",
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {progress.toFixed(1)}%
        </span>
      </div>
    </li>
  );
};

export default MilestoneItem;
