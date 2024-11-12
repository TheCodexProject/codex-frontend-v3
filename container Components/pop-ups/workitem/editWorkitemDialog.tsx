"use client";

import { useState, useEffect } from "react";
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
import { WorkItemService } from "@/services/features/WorkItemService";
import { WorkItem } from "@/services/models/WorkItem";
import { User } from "@/services/models/User";

const TitleSchema = z.string().min(1, "Title is required.");

export enum Status {
  None = "None",
  Open = "Open",
  InProgress = "In Progress",
  ReadyForReview = "Ready For Review",
  Done = "Done",
  Closed = "Closed",
}

export enum Priority {
  None = "None",
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

type EditWorkItemDialogProps = {
  workItem: WorkItem;
  users?: User[];
  trigger: React.ReactNode; // Add trigger prop
  onWorkItemUpdated?: (updatedWorkItem: WorkItem) => void;
  onWorkItemDeleted?: (workItemId: string) => void;
};

const workItemService = new WorkItemService();

export function EditWorkItemDialog({
  workItem,
  users,
  trigger, // Add trigger prop
  onWorkItemUpdated,
  onWorkItemDeleted,
}: EditWorkItemDialogProps) {
  const [currentWorkItem, setCurrentWorkItem] = useState<WorkItem>(workItem);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setCurrentWorkItem({
        ...workItem,
        status: workItem.status === Status.None ? Status.Open : workItem.status,
        priority:
          workItem.priority === Priority.None
            ? Priority.Low
            : workItem.priority,
      });
    }
  }, [isOpen, workItem]);

  const handleChange = (field: keyof WorkItem, value: string) => {
    setCurrentWorkItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const validationResult = TitleSchema.safeParse(currentWorkItem.title);
    if (!validationResult.success) {
      setErrors([validationResult.error.errors[0].message]);
      return;
    }

    setLoading(true);

    try {
      const updatedWorkItem = await workItemService.updateWorkItem(
        currentWorkItem.id,
        currentWorkItem.title,
        currentWorkItem.description,
        currentWorkItem.status === Status.Open ? null : currentWorkItem.status,
        currentWorkItem.priority === Priority.Low
          ? null
          : currentWorkItem.priority,
        currentWorkItem.assignedTo,
        null,
        null
      );

      setErrors([]);
      setLoading(false);
      setIsOpen(false);

      onWorkItemUpdated?.(updatedWorkItem);
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "An unexpected error occurred.",
      ]);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await workItemService.deleteWorkItem(currentWorkItem.id);

      setLoading(false);
      setIsOpen(false);

      onWorkItemDeleted?.(currentWorkItem.id);
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "An unexpected error occurred.",
      ]);
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
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
          <DialogTitle>Edit Work Item</DialogTitle>
          <DialogDescription>
            Update the details for the selected work item or delete it.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <div className="col-span-3">
              <Input
                id="title"
                value={currentWorkItem.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter title"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <div className="col-span-3">
              <Input
                id="description"
                value={currentWorkItem.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter description"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status">Status</Label>
            <div className="col-span-3">
              <select
                id="status"
                value={currentWorkItem.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                {Object.values(Status)
                  .filter((statusOption) => statusOption !== Status.None)
                  .map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority">Priority</Label>
            <div className="col-span-3">
              <select
                id="priority"
                value={currentWorkItem.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                {Object.values(Priority)
                  .filter((priorityOption) => priorityOption !== Priority.None)
                  .map((priorityOption) => (
                    <option key={priorityOption} value={priorityOption}>
                      {priorityOption}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignee">Assignee</Label>
            <div className="col-span-3">
              <select
                id="assignee"
                value={currentWorkItem.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select an assignee</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstname} {user.lastname}
                  </option>
                ))}
              </select>
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
            disabled={loading}
            variant="destructive"
            type="button"
            onClick={handleDelete}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Delete Work Item"
            )}
          </Button>
          <Button disabled={loading} type="button" onClick={handleSubmit}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Work Item"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
