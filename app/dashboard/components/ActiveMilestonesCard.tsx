"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MilestoneItem from "./MilestoneItem";
import { useProject } from "@/contexts/ProjectContext";
import { useProjectMilestones } from "@/hooks/services/ProjectService";
import { useWorkItems } from "@/hooks/services/WorkItemService";

const ActiveMilestonesCard: React.FC = () => {
  const { currentProject } = useProject(); // Access the current project from the context

  // Fetch milestones for the current project
  const { data: milestones = [], isLoading: milestonesLoading } =
    useProjectMilestones(currentProject?.id || "");

  // Fetch work items for the current project
  const { data: workItems = [], isLoading: workItemsLoading } = useWorkItems(
    currentProject?.id || ""
  );

  if (!currentProject) {
    return <p>No project selected.</p>;
  }

  if (milestonesLoading || workItemsLoading) {
    return <p>Loading milestones...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {milestones.map((milestone) => (
            <MilestoneItem
              key={milestone.id}
              milestone={milestone}
              workItems={workItems}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ActiveMilestonesCard;
