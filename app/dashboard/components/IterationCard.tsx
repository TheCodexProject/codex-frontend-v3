"use client";

import React from "react";
import { useProjectIterations } from "@/hooks/services/ProjectService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProject } from "@/contexts/ProjectContext";

const IterationCard: React.FC = () => {
  const { currentProject } = useProject();
  const { data: iterations = [] } = useProjectIterations(
    currentProject?.id || ""
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Iterations</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <ul className="space-y-4">
          {iterations.map((iteration) => (
            <li key={iteration.id}>
              <p className="font-medium">{iteration.title}</p>
              <p className="text-sm text-muted-foreground">
                {iteration.startDate} - {iteration.endDate}
              </p>
            </li>
          ))}
        </ul> */}
      </CardContent>
    </Card>
  );
};

export default IterationCard;
