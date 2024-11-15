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
import { useProjectData } from "@/hooks/services/ProjectContext"; // Import ProjectContext
import { Project } from "@/services/models/Project";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { DateRange } from "react-day-picker";

const TitleSchema = z.string().min(1, "Project title is required.");

// Status and Priority enums for dropdown options
export enum Status {
  None = "None",
  Open = "Open",
  InProgress = "In Progress",
  ReadyForReview = "Ready for Review",
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

type EditProjectDialogProps = {
  project: Project;
  trigger: React.ReactNode;
};

export function EditProjectDialog({
  project,
  trigger,
}: EditProjectDialogProps) {
  const {
    updateProject,
    deleteProject, // Use methods from ProjectContext
  } = useProjectData();

  const [currentProject, setCurrentProject] = useState<Project>(project);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: project.timeRange[0] ? new Date(project.timeRange[0]) : undefined,
    to: project.timeRange[1] ? new Date(project.timeRange[1]) : undefined,
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setCurrentProject({
        ...project,
        status: project.status === Status.None ? Status.Open : project.status,
        priority:
          project.priority === Priority.None ? Priority.Low : project.priority,
      });
    }
  }, [isOpen, project]);

  const handleChange = (field: keyof Project, value: string) => {
    setCurrentProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const validationResult = TitleSchema.safeParse(currentProject.title);
    if (!validationResult.success) {
      setErrors([validationResult.error.errors[0].message]);
      return;
    }

    setLoading(true);

    try {
      // Use updateProject from context
      await updateProject(
        currentProject.id,
        currentProject.title,
        currentProject.description,
        currentProject.status,
        currentProject.priority,
        dateRange?.from || null,
        dateRange?.to || null
      );

      setErrors([]);
      setLoading(false);
      setIsOpen(false);
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
      // Use deleteProject from context
      await deleteProject(currentProject.id);
      setLoading(false);
      setIsOpen(false);
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
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update the details for the selected project.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Project Title</Label>
            <div className="col-span-3">
              <Input
                id="title"
                value={currentProject.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter project title"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <div className="col-span-3">
              <Input
                id="description"
                value={currentProject.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter project description"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status">Status</Label>
            <div className="col-span-3">
              <select
                id="status"
                value={currentProject.status}
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
                value={currentProject.priority}
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
            <Label>Date Range</Label>
            <div className="col-span-3">
              <DatePickerWithRange
                dateRange={dateRange}
                onDateChange={setDateRange}
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
        <DialogFooter className="flex justify-between">
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
              "Delete Project"
            )}
          </Button>
          <Button disabled={loading} type="button" onClick={handleSubmit}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
