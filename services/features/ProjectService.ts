import { Project } from "@/services/models/Project";
import { CreateProjectRequest } from "@/services/request/project/CreateProjectRequest";
import { UpdateProjectRequest } from "@/services/request/project/UpdateProjectRequest";
import { Resource } from "@/services/models/Resource";
import { UpdateResourceRequest } from "@/services/request/resource/UpdateResourceRequest";
import { ProjectActivity } from "@/services/models/ProjectActivity";
import { UpdateIterationRequest } from "@/services/request/project/iteration/UpdateIterationRequest";
import { CreateIterationRequest } from "@/services/request/project/iteration/CreateIterationRequest";
import { CreateMilestoneRequest } from "@/services/request/project/milestone/CreateMilestoneRequest";
import { UpdateMilestoneRequest } from "@/services/request/project/milestone/UpdateMilestoneRequest";

/**
 * A service for managing projects using the API
 */
export class ProjectService {
  // # ------- #
  // # Project #
  // # ------- #

  /**
   * Create a new project
   * @param name The name of the project
   * @param workspaceId The ID of the workspace to create the project in
   * @returns The created project
   */
  public static async createProject(
    name: string,
    workspaceId: string
  ): Promise<Project> {
    // * Create a new organization
    const project = new CreateProjectRequest(name, workspaceId);

    // # Send the request to the API
    const response = await fetch("https://localhost:7006/api/projects", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new Project(
        data.id,
        data.title,
        data.containedIn,
        data.description,
        data.status,
        data.priority,
        data.timeRange
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to create organization");
    }
  }

  /**
   * Get all projects
   * @returns All projects
   */
  public static async getProjects(): Promise<Project[]> {
    // # Send the request to the API
    const response = await fetch("https://localhost:7006/api/projects", {
      method: "GET",
    });

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return data.map(
        (project: Project) =>
          new Project(
            project.id,
            project.title,
            project.containedIn,
            data.description,
            project.status,
            project.priority,
            project.timeRange
          )
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get projects");
    }
  }

  /**
   * Get a project by ID
   * @param id The ID of the project
   * @returns The project
   */
  public static async getProjectById(id: string): Promise<Project> {
    // # Send the request to the API
    const response = await fetch(`https://localhost:7006/api/projects/${id}`, {
      method: "GET",
    });

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new Project(
        data.id,
        data.title,
        data.containedIn,
        data.description,
        data.status,
        data.priority,
        data.timeRange
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get project");
    }
  }

  /**
   * Update a project
   * @param id The ID of the project **(Required)**
   * @param title The name of the project (Optional)
   * @param description The description of the project (Optional)
   * @param status The status of the project (Optional)
   * @param priority The priority of the project (Optional)
   * @param startDate The start date of the project (Optional)
   * @param endDate The end date of the project (Optional)
   * @returns The updated project
   */
  public static async updateProject(
    id: string,
    title: string | null,
    description: string | null,
    status: string | null,
    priority: string | null,
    startDate: Date | null,
    endDate: Date | null
  ): Promise<Project> {
    // * Create a new organization
    const project = new UpdateProjectRequest(
      id,
      title,
      description,
      status,
      priority,
      startDate,
      endDate
    );

    // # Send the request to the API
    const response = await fetch(`https://localhost:7006/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new Project(
        data.id,
        data.title,
        data.containedIn,
        data.description,
        data.status,
        data.priority,
        data.timeRange
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to update project");
    }
  }

  /**
   * Delete a project
   * @param id The ID of the project
   */
  public static async deleteProject(id: string): Promise<void> {
    // # Send the request to the API
    const response = await fetch(`https://localhost:7006/api/projects/${id}`, {
      method: "DELETE",
    });

    // ? Check if the request was successful
    if (!response.ok) {
      // ! Throw an error
      throw new Error("Failed to delete project");
    }
  }

  // # ---------------- #
  // # Project Resource #
  // # ---------------- #

  /**
   * Add a resource to a project
   * @param projectId The ID of the project
   * @param resourceId The ID of the resource
   */
  public static async addResourceToProject(
    projectId: string,
    resourceId: string
  ): Promise<Resource> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/resources/${resourceId}`,
      {
        method: "POST",
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new Resource(
        data.id,
        data.title,
        data.url,
        data.description,
        data.type
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to add resource to project");
    }
  }

  /**
   * Get all resources for a project
   * @param projectId The ID of the project
   * @returns All resources for the project
   */
  public static async getResourcesForProject(
    projectId: string
  ): Promise<Resource[]> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/resources`,
      {
        method: "GET",
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return data.map(
        (resource: Resource) =>
          new Resource(
            resource.id,
            resource.title,
            resource.url,
            resource.description,
            resource.type
          )
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get resources for project");
    }
  }

  /**
   * Get a resource for a project by ID
   * @param projectId The ID of the project
   * @param resourceId The ID of the resource
   */
  public static async getResourceForProjectById(
    projectId: string,
    resourceId: string
  ): Promise<Resource> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/resources/${resourceId}`,
      {
        method: "GET",
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new Resource(
        data.id,
        data.title,
        data.url,
        data.description,
        data.type
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get resource for project");
    }
  }

  /**
   * Update a resource for a project
   * @param projectId The ID of the project
   * @param resourceId The ID of the resource
   * @param title The name of the resource (Optional)
   * @param url The URL of the resource (Optional)
   * @param description The description of the resource (Optional)
   * @param type The type of the resource (Optional)
   * @returns The updated resource
   */
  public static async updateResourceForProject(
    projectId: string,
    resourceId: string,
    title: string | null,
    url: string | null,
    description: string | null,
    type: string | null
  ): Promise<Resource> {
    // * Create a new organization
    const resource = new UpdateResourceRequest(title, url, description, type);

    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/resources/${resourceId}`,
      {
        method: "PUT",
        body: JSON.stringify(resource),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new Resource(
        data.id,
        data.title,
        data.url,
        data.description,
        data.type
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to update resource for project");
    }
  }

  /**
   * Delete a resource for a project
   * @param projectId The ID of the project
   * @param resourceId The ID of the resource
   */
  public static async deleteResourceForProject(
    projectId: string,
    resourceId: string
  ): Promise<void> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/resources/${resourceId}`,
      {
        method: "DELETE",
      }
    );

    // ? Check if the request was successful
    if (!response.ok) {
      // ! Throw an error
      throw new Error("Failed to delete resource for project");
    }
  }

  // # ----------------- #
  // # Project Iteration #
  // # ----------------- #

  /**
   * Create a new iteration for a project
   * @param projectId The ID of the project where the iteration will be created
   * @param title The title of the iteration
   * @returns The created iteration
   */
  public static async createIterationForProject(
    projectId: string,
    title: string
  ): Promise<ProjectActivity> {
    // * Create the request body
    const iteration = new CreateIterationRequest(title);

    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/iterations`,
      {
        method: "POST",
        body: JSON.stringify(iteration),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new ProjectActivity(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.items
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to create iteration for project");
    }
  }

  /**
   * Get all iterations for a project
   * @param projectId The ID of the project
   * @returns All iterations for the project
   */
  public static async getIterationsForProject(
    projectId: string
  ): Promise<ProjectActivity[]> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/iterations`,
      {
        method: "GET",
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return data.map(
        (iteration: ProjectActivity) =>
          new ProjectActivity(
            iteration.id,
            iteration.containedIn,
            iteration.title,
            iteration.description,
            iteration.items
          )
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get iterations for project");
    }
  }

  /**
   * Get an iteration for a project by ID
   * @param projectId The ID of the project
   * @param iterationId The ID of the iteration
   * @returns The iteration
   */
  public static async getIterationForProjectById(
    projectId: string,
    iterationId: string
  ): Promise<ProjectActivity> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/iterations/${iterationId}`,
      {
        method: "GET",
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new ProjectActivity(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.items
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get iteration for project");
    }
  }

  /**
   * Update an iteration for a project
   * @param projectId The ID of the project
   * @param iterationId The ID of the iteration
   * @param title The title of the iteration (Optional)
   * @param description The description of the iteration (Optional)
   * @param itemsToAdd The items to add to the iteration (Optional)
   * @param itemsToRemove The items to remove from the iteration (Optional)
   * @returns The updated iteration
   */
  public static async updateIterationForProject(
    projectId: string,
    iterationId: string,
    title: string | null,
    description: string | null,
    itemsToAdd: string[] | null,
    itemsToRemove: string[] | null
  ): Promise<ProjectActivity> {
    // * Create the request body
    const iteration = new UpdateIterationRequest(
      title,
      description,
      itemsToAdd,
      itemsToRemove
    );

    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/iterations/${iterationId}`,
      {
        method: "PUT",
        body: JSON.stringify(iteration),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new ProjectActivity(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.items
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to update iteration for project");
    }
  }

  /**
   * Delete an iteration for a project
   * @param projectId The ID of the project
   * @param iterationId The ID of the iteration
   */
  public static async deleteIterationForProject(
    projectId: string,
    iterationId: string
  ): Promise<void> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/iterations/${iterationId}`,
      {
        method: "DELETE",
      }
    );

    // ? Check if the request was successful
    if (!response.ok) {
      // ! Throw an error
      throw new Error("Failed to delete iteration for project");
    }
  }

  // # ----------------- #
  // # Project Milestone #
  // # ----------------- #

  /**
   * Create a new milestone for a project
   * @param projectId The ID of the project where the milestone will be created
   * @param title The title of the milestone
   * @returns The created milestone
   */
  public static async createMilestoneForProject(
    projectId: string,
    title: string
  ): Promise<ProjectActivity> {
    // * Create the request body
    const iteration = new CreateMilestoneRequest(title);

    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/milestones`,
      {
        method: "POST",
        body: JSON.stringify(iteration),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new ProjectActivity(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.items
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to create milestone for project");
    }
  }

  /**
   * Get all milestones for a project
   * @param projectId The ID of the project
   * @returns All milestones for the project
   */
  public static async getMilestonesForProject(
    projectId: string
  ): Promise<ProjectActivity[]> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/milestones`,
      {
        method: "GET",
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return data.map(
        (milestone: ProjectActivity) =>
          new ProjectActivity(
            milestone.id,
            milestone.containedIn,
            milestone.title,
            milestone.description,
            milestone.items
          )
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get milestones for project");
    }
  }

  /**
   * Get a milestone for a project by ID
   * @param projectId The ID of the project
   * @param milestoneId The ID of the milestone
   * @returns The milestone
   */
  public static async getMilestoneForProjectById(
    projectId: string,
    milestoneId: string
  ): Promise<ProjectActivity> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/milestones/${milestoneId}`,
      {
        method: "GET",
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new ProjectActivity(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.items
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get milestone for project");
    }
  }

  /**
   * Update a milestone for a project
   * @param projectId The ID of the project
   * @param milestoneId The ID of the milestone
   * @param title The title of the milestone (Optional)
   * @param description The description of the milestone (Optional)
   * @param itemsToAdd The items to add to the milestone (Optional)
   * @param itemsToRemove The items to remove from the milestone (Optional)
   * @returns The updated milestone
   */
  public static async updateMilestoneForProject(
    projectId: string,
    milestoneId: string,
    title: string | null,
    description: string | null,
    itemsToAdd: string[] | null,
    itemsToRemove: string[] | null
  ): Promise<ProjectActivity> {
    // * Create the request body
    const milestone = new UpdateMilestoneRequest(
      title,
      description,
      itemsToAdd,
      itemsToRemove
    );

    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/milestones/${milestoneId}`,
      {
        method: "PUT",
        body: JSON.stringify(milestone),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to an organization object
      return new ProjectActivity(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.items
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to update milestone for project");
    }
  }

  /**
   * Delete a milestone for a project
   * @param projectId The ID of the project
   * @param milestoneId The ID of the milestone
   */
  public static async deleteMilestoneForProject(
    projectId: string,
    milestoneId: string
  ): Promise<void> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/projects/${projectId}/milestones/${milestoneId}`,
      {
        method: "DELETE",
      }
    );

    // ? Check if the request was successful
    if (!response.ok) {
      // ! Throw an error
      throw new Error("Failed to delete milestone for project");
    }
  }
}
