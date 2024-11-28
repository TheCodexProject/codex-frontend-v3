"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateProject } from "@/hooks/services/ProjectService";
import { Project } from "@/services/models/Project";

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  project: Project;
}

export const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  open,
  onOpenChange,
  project,
}) => {
  const [title, setTitle] = useState<string>(project.title);
  const updateProjectMutation = useUpdateProject();

  const isUpdating = updateProjectMutation.status === "pending";

  // Synchronize the title state with the project title when the dialog opens or the project changes
  useEffect(() => {
    if (open) {
      setTitle(project.title);
    }
  }, [open, project]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Project title cannot be empty.");
      return;
    }

    updateProjectMutation.mutate(
      {
        id: project.id,
        updates: { title: title.trim() },
      },
      {
        onSuccess: () => {
          onOpenChange(false); // Close dialog on success
        },
        onError: (error) => {
          console.error("Failed to update project:", error);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div className="py-4">
            <Input
              id="projectTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Title"
              disabled={isUpdating}
            />
            {updateProjectMutation.isError && (
              <p className="text-red-500 text-sm mt-2">
                {updateProjectMutation.error instanceof Error
                  ? updateProjectMutation.error.message
                  : "Failed to update project. Please try again."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
