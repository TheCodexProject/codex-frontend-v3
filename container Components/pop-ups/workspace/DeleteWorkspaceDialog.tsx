"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkspaceData } from "@/hooks/services/WorkspaceContext";
import { Workspace } from "@/services/models/Workspace";

interface DeleteWorkspaceDialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  workspace: Workspace;
}

export function DeleteWorkspaceDialog({
  isOpen,
  setOpen,
  workspace,
}: DeleteWorkspaceDialogProps) {
  const { deleteWorkspace } = useWorkspaceData(); // Use context for deleting workspace

  const handleDelete = async () => {
    try {
      await deleteWorkspace(workspace.id); // Delete the workspace via context using its ID
      setOpen(false); // Close the dialog after deletion
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Are you sure you want to delete the workspace "{workspace.title}"?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
