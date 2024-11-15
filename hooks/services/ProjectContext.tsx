"use client";

import React, { createContext, useContext, useState } from "react";
import { ProjectService } from "@/services/features/ProjectService";
import { Project } from "@/services/models/Project";
import { Resource } from "@/services/models/Resource";
import { ProjectActivity } from "@/services/models/ProjectActivity";

interface ProjectContextType {
  projects: Project[] | null;
  resources: Record<string, Resource[]>; // Map projectId -> resources
  iterations: Record<string, ProjectActivity[]>; // Map projectId -> iterations
  milestones: Record<string, ProjectActivity[]>; // Map projectId -> milestones
  getProjects: () => Promise<void>;
  createProject: (name: string, workspaceId: string) => Promise<void>;
  updateProject: (
    id: string,
    title?: string | null,
    description?: string | null,
    status?: string | null,
    priority?: string | null,
    startDate?: Date | null,
    endDate?: Date | null
  ) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getResourcesForProject: (projectId: string) => Promise<void>;
  createIterationForProject: (
    projectId: string,
    title: string
  ) => Promise<void>;
  getIterationsForProject: (projectId: string) => Promise<void>;
  createMilestoneForProject: (
    projectId: string,
    title: string
  ) => Promise<void>;
  getMilestonesForProject: (projectId: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [resources, setResources] = useState<Record<string, Resource[]>>({});
  const [iterations, setIterations] = useState<
    Record<string, ProjectActivity[]>
  >({});
  const [milestones, setMilestones] = useState<
    Record<string, ProjectActivity[]>
  >({});

  const getProjects = async () => {
    const data = await ProjectService.getProjects();
    setProjects(data);
  };

  const createProject = async (name: string, workspaceId: string) => {
    const newProject = await ProjectService.createProject(name, workspaceId);
    setProjects((prev) => (prev ? [...prev, newProject] : [newProject]));
  };

  const updateProject = async (
    id: string,
    title?: string | null,
    description?: string | null,
    status?: string | null,
    priority?: string | null,
    startDate?: Date | null,
    endDate?: Date | null
  ) => {
    const updatedProject = await ProjectService.updateProject(
      id,
      title ?? null, // Convert undefined to null
      description ?? null, // Convert undefined to null
      status ?? null, // Convert undefined to null
      priority ?? null, // Convert undefined to null
      startDate ?? null, // Convert undefined to null
      endDate ?? null // Convert undefined to null
    );

    setProjects((prev) =>
      prev ? prev.map((proj) => (proj.id === id ? updatedProject : proj)) : null
    );
  };

  const deleteProject = async (id: string) => {
    await ProjectService.deleteProject(id);
    setProjects((prev) =>
      prev ? prev.filter((project) => project.id !== id) : null
    );
  };

  const getResourcesForProject = async (projectId: string) => {
    const data = await ProjectService.getResourcesForProject(projectId);
    setResources((prev) => ({ ...prev, [projectId]: data }));
  };

  const createIterationForProject = async (
    projectId: string,
    title: string
  ) => {
    const newIteration = await ProjectService.createIterationForProject(
      projectId,
      title
    );
    setIterations((prev) => ({
      ...prev,
      [projectId]: prev[projectId]
        ? [...prev[projectId], newIteration]
        : [newIteration],
    }));
  };

  const getIterationsForProject = async (projectId: string) => {
    const data = await ProjectService.getIterationsForProject(projectId);
    setIterations((prev) => ({ ...prev, [projectId]: data }));
  };

  const createMilestoneForProject = async (
    projectId: string,
    title: string
  ) => {
    const newMilestone = await ProjectService.createMilestoneForProject(
      projectId,
      title
    );
    setMilestones((prev) => ({
      ...prev,
      [projectId]: prev[projectId]
        ? [...prev[projectId], newMilestone]
        : [newMilestone],
    }));
  };

  const getMilestonesForProject = async (projectId: string) => {
    const data = await ProjectService.getMilestonesForProject(projectId);
    setMilestones((prev) => ({ ...prev, [projectId]: data }));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        resources,
        iterations,
        milestones,
        getProjects,
        createProject,
        updateProject,
        deleteProject,
        getResourcesForProject,
        createIterationForProject,
        getIterationsForProject,
        createMilestoneForProject,
        getMilestonesForProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectData = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectData must be used within a ProjectProvider");
  }
  return context;
};
