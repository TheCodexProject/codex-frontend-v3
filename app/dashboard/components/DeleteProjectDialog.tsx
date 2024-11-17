"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteProject } from "@/hooks/services/ProjectService";
import { Project } from "@/services/models/Project";

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  project: Project; // The project to delete
}

export const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({
  open,
  onOpenChange,
  project,
}) => {
  const deleteProjectMutation = useDeleteProject();

  const isDeleting = deleteProjectMutation.status === "pending";

  const handleDelete = () => {
    deleteProjectMutation.mutate(project.id, {
      onSuccess: () => {
        onOpenChange(false); // Close the dialog on successful deletion
      },
      onError: (error) => {
        console.error("Failed to delete project:", error);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the project{" "}
            <span className="font-semibold">{project.title}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
