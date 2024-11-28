"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateWorkItem } from "@/hooks/services/WorkItemService";
import { useProject } from "@/contexts/ProjectContext";

export const CreateWorkItemDialogContent: React.FC<{
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const { currentProject } = useProject();
  const createWorkItemMutation = useCreateWorkItem();

  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      // Simple validation
      return;
    }

    if (!currentProject) {
      console.warn("No project is selected.");
      return;
    }

    createWorkItemMutation.mutate(
      {
        projectId: currentProject.id,
        title: title.trim(),
      },
      {
        onSuccess: () => {
          setTitle(""); // Reset form on success
          onOpenChange(false); // Close the dialog
        },
      }
    );
  };

  const isLoading = createWorkItemMutation.status === "pending";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a new task to this project.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
                disabled={isLoading}
              />
            </div>
            {createWorkItemMutation.status === "error" && (
              <p className="text-red-500 text-sm col-span-4 mt-2">
                {createWorkItemMutation.error?.message ||
                  "Failed to create task. Please try again."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="mr-2"
            >
              {isLoading ? "Creating..." : "Create task"}
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
