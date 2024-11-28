"use client";

import React from "react";
import { useProjectMilestones } from "@/hooks/services/ProjectService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProject } from "@/contexts/ProjectContext";

const MilestoneCard: React.FC = () => {
  const { currentProject } = useProject();
  const { data: milestones = [] } = useProjectMilestones(
    currentProject?.id || ""
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <ul className="space-y-6">
          {milestones.map((milestone) => (
            <li
              key={milestone.id}
              className="flex items-center justify-between"
            >
              <div className="flex-1 mr-4">
                <p className="font-medium text-base">{milestone.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {milestone.dueDate}
                </p>
              </div>
              <Progress value={milestone.progress || 0} className="w-24 h-6" />
            </li>
          ))}
        </ul> */}
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;
