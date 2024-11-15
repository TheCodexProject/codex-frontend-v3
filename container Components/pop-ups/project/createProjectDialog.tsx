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
import { useProjectData } from "@/hooks/services/ProjectContext"; // Import useProjectData

const TitleSchema = z.string().min(1, "Project name is required.");

type CreateProjectDialogProps = {
  workspaceId: string;
  trigger: React.ReactNode;
};

export function CreateProjectDialog({
  workspaceId,
  trigger,
}: CreateProjectDialogProps) {
  const { createProject } = useProjectData(); // Access createProject from context
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    const validationResult = TitleSchema.safeParse(value);
    setIsDisabled(!validationResult.success);
  };

  const handleSubmit = async () => {
    const validationResult = TitleSchema.safeParse(name);
    if (!validationResult.success) {
      setErrors([validationResult.error.errors[0].message]);
      return;
    }

    setLoading(true);

    try {
      // Use createProject from context instead of calling ProjectService directly
      await createProject(name, workspaceId);

      setErrors([]);
      setLoading(false);
      setIsOpen(false);
      setName("");
      setIsDisabled(true);
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "An unexpected error occurred.",
      ]);
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setName("");
      setErrors([]);
      setIsDisabled(true);
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
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Enter the details for the new project.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Project Name</Label>
            <div className="col-span-3">
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter project name"
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
          <Button
            disabled={isDisabled || loading}
            type="button"
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
