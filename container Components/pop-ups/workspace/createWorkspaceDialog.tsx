"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspaceData } from "@/hooks/services/WorkspaceContext";
import { Organization } from "@/services/models/Organization"; // Import Organization model

const TitleSchema = z.string().min(1, "Workspace title is required.");

interface CreateWorkspaceDialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  organization: Organization; // Pass the whole organization object
}

export function CreateWorkspaceDialog({
  isOpen,
  setOpen,
  organization,
}: CreateWorkspaceDialogProps) {
  if (!organization) {
    return;
  }

  const { createWorkspace } = useWorkspaceData(); // Use the createWorkspace function from the context
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    const validationResult = TitleSchema.safeParse(title);
    if (!validationResult.success) {
      setErrors([validationResult.error.errors[0].message]);
      return;
    }

    setIsLoading(true);

    try {
      // Create the workspace using the organization ID from the passed object
      await createWorkspace(title, organization.id);

      setErrors([]);
      setTitle("");
      setOpen(false); // Close the dialog
    } catch (err) {
      setErrors([
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again later.",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace to "{organization.name}".
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <div className="col-span-3">
              <Input
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter workspace title"
              />
            </div>
          </div>
          {errors.length > 0 && (
            <div className="text-red-500 text-sm mt-2">
              <ul className="list-disc ml-5">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button disabled={isLoading} type="button" onClick={handleSubmit}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Workspace"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
