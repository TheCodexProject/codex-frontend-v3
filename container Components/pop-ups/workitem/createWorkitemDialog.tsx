"use client";

import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react"; // Import the loader icon
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
import { useWorkItems } from "@/hooks/services/WorkItemContext"; // Use the WorkItemContext hook

// Define a zod schema for the title
const TitleSchema = z.string().min(1, "Title is required.");

type CreateWorkitemDialogProps = {
  projectId: string;
  trigger: React.ReactNode;
};

export function CreateWorkitemDialog({
  projectId,
  trigger,
}: CreateWorkitemDialogProps) {
  const { createWorkItem } = useWorkItems(); // Access createWorkItem from context
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    const validationResult = TitleSchema.safeParse(value);
    setIsDisabled(!validationResult.success);
  };

  const handleSubmit = async () => {
    const validationResult = TitleSchema.safeParse(title);
    if (!validationResult.success) {
      setErrors([validationResult.error.errors[0].message]);
      return;
    }

    setLoading(true);

    try {
      // Use createWorkItem from context
      await createWorkItem(projectId, title);

      setErrors([]);
      setLoading(false);
      setIsOpen(false);
      setTitle("");
      setIsDisabled(true);
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
          <DialogTitle>Create Work Item</DialogTitle>
          <DialogDescription>
            Enter the details for the new work item.
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
                placeholder="Enter work item title"
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
              "Create Work Item"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
