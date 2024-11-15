"use client";

import { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Workspace } from "@/services/models/Workspace";
import { useWorkspaceData } from "@/hooks/services/WorkspaceContext"; // Updated to use WorkspaceContext

const TitleSchema = z.string().min(1, "Workspace title is required.");

type CreateWorkspaceDialogProps = {
  organizationId: string; // Organization ID to associate with the workspace
  trigger: React.ReactNode;
  onWorkspaceCreated?: (createdWorkspace: Workspace) => void; // Callback when workspace is created
};

export function CreateWorkspaceDialog({
  organizationId,
  trigger,
}: Omit<CreateWorkspaceDialogProps, "onWorkspaceCreated">) {
  const { createWorkspace } = useWorkspaceData(); // Use the createWorkspace function from the context
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

    setLoading(true);

    try {
      // Use createWorkspace from context
      await createWorkspace(title, organizationId);

      setErrors([]);
      setLoading(false);
      setIsOpen(false);
      setTitle("");
    } catch (err) {
      if (err instanceof Error) {
        setErrors([err.message]);
      } else {
        setErrors(["An unexpected error occurred. Please try again later."]);
      }
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setTitle("");
      setErrors([]);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Enter the details for the new workspace.
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
          <Button disabled={loading} type="button" onClick={handleSubmit}>
            {loading ? (
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
