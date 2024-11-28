"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateProject } from "@/hooks/services/ProjectService";

export const CreateProjectDialogContent: React.FC<{
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  workspaceId: string; // ID of the workspace where the project will be created
}> = ({ open, onOpenChange, workspaceId }) => {
  const [name, setName] = useState("");
  const createProjectMutation = useCreateProject();
  const isCreating = createProjectMutation.status === "pending";

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Project name cannot be empty.");
      return;
    }

    createProjectMutation.mutate(
      { name: name.trim(), workspaceId },
      {
        onSuccess: () => {
          setName(""); // Reset the form
          onOpenChange(false); // Close the dialog
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Enter a name for the new project. It will be created in the selected
            workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateProject}>
          <div className="py-4">
            <Input
              id="projectName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project Name"
              disabled={isCreating}
            />
            {createProjectMutation.isError && (
              <p className="text-red-500 text-sm mt-2">
                {createProjectMutation.error instanceof Error
                  ? createProjectMutation.error.message
                  : "Failed to create project. Please try again."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Project"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
