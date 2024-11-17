"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/contexts/ProjectContext";
import { useProjectIterations } from "@/hooks/services/ProjectService";

const CurrentIterationsCard: React.FC = () => {
  const { currentProject } = useProject();

  // Fetch iterations for the current project
  const { data: iterations = [], isLoading } = useProjectIterations(
    currentProject?.id || ""
  );

  if (!currentProject) {
    return <p>No project selected.</p>;
  }

  if (isLoading) {
    return <p>Loading iterations...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Iterations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {iterations.map((iteration) => (
            <li key={iteration.id}>
              <p className="font-medium">{iteration.title}</p>
              <p className="text-sm text-muted-foreground">
                17-11-2024 - 20-12-2024
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CurrentIterationsCard;
