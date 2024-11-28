"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateWorkItemDialogContent } from "./CreateWorkItemDialogContext";
import { CreateMilestoneDialogContent } from "./CreateMilestoneDialogContent";
import { CreateIterationDialogContent } from "./CreateIterationDialogContent";

const QuickActions: React.FC = () => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isMilestoneDialogOpen, setIsMilestoneDialogOpen] = useState(false);
  const [isIterationDialogOpen, setIsIterationDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            className="w-full justify-start"
            onClick={() => setIsTaskDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
          <Button
            className="w-full justify-start"
            onClick={() => setIsMilestoneDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Create Milestone
          </Button>
          <Button
            className="w-full justify-start"
            onClick={() => setIsIterationDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Start New Iteration
          </Button>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateWorkItemDialogContent
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
      />
      <CreateMilestoneDialogContent
        open={isMilestoneDialogOpen}
        onOpenChange={setIsMilestoneDialogOpen}
      />
      <CreateIterationDialogContent
        open={isIterationDialogOpen}
        onOpenChange={setIsIterationDialogOpen}
      />
    </>
  );
};

export default QuickActions;
