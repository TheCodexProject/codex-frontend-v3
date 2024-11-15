import { Workspace } from "@/services/models/Workspace";
import { CreateWorkspaceRequest } from "@/services/request/workspace/CreateWorkspaceRequest";
import { UpdateWorkspaceRequest } from "@/services/request/workspace/UpdateWorkspaceRequest";
import { Resource } from "@/services/models/Resource";
import { CreateResourceRequest } from "@/services/request/resource/CreateResourceRequest";
import { UpdateResourceRequest } from "@/services/request/resource/UpdateResourceRequest";

/**
 * A service for managing workspaces using the API
 */
export default class WorkspaceService {
  // # --------- #
  // # Workspace #
  // # --------- #

  /**
   * Create a new workspace
   * @param title The title of the workspace
   * @param organizationId The organization id of the workspace
   */
  public static async createWorkspace(
    title: string,
    organizationId: string
  ): Promise<Workspace> {
    // * Create a new workspace
    const workspace = new CreateWorkspaceRequest(title, organizationId);

    // # Send the request to the API
    const response = await fetch("https://localhost:7006/api/workspaces", {
      method: "POST",
      body: JSON.stringify(workspace),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to a workspace object
      return new Workspace(
        data.id,
        data.title,
        data.ownedBy,
        data.contacts,
        data.projects
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to create workspace");
    }
  }

  /**
   * Get all workspaces
   * @returns All workspaces
   */
  public static async getWorkspaces(): Promise<Workspace[]> {
    // # Send the request to the API
    const response = await fetch("https://localhost:7006/api/workspaces", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to workspace objects
      return data.map(
        (workspace: Workspace) =>
          new Workspace(
            workspace.id,
            workspace.title,
            workspace.ownedBy,
            workspace.contacts,
            workspace.projects
          )
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get workspaces");
    }
  }

  /**
   * Get a workspace by id
   * @param id The id of the workspace
   * @returns The workspace
   */
  public static async getWorkspaceById(id: string): Promise<Workspace> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/workspaces/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to a workspace object
      return new Workspace(
        data.id,
        data.title,
        data.ownedBy,
        data.contacts,
        data.projects
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get workspace");
    }
  }

  /**
   * Update a workspace
   * @param id The id of the workspace
   * @param title The title of the workspace
   * @param contactsToAdd The contacts to add to the workspace
   * @param contactsToRemove The contacts to remove from the workspace
   * @param projectsToAdd The projects to add to the workspace
   * @param projectsToRemove The projects to remove from the workspace
   */
  public static async updateWorkspace(
    id: string,
    title: string,
    contactsToAdd: string[],
    contactsToRemove: string[],
    projectsToAdd: string[],
    projectsToRemove: string[]
  ): Promise<Workspace> {
    // * Create a new workspace
    const workspace = new UpdateWorkspaceRequest(
      title,
      contactsToAdd,
      contactsToRemove,
      projectsToAdd,
      projectsToRemove
    );

    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/workspaces/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(workspace),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to a workspace object
      return new Workspace(
        data.id,
        data.title,
        data.ownedBy,
        data.contacts,
        data.projects
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to update workspace");
    }
  }

  /**
   * Delete a workspace
   * @param id The id of the workspace
   */
  public static async deleteWorkspace(id: string): Promise<void> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/workspaces/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (!response.ok) {
      // ! Throw an error
      throw new Error("Failed to delete workspace");
    }
  }

  // # ------------------ #
  // # Workspace Resource #
  // # ------------------ #

  /**
   * Create a new workspace resource
   * @param workspaceId The id of the workspace
   * @param title The title of the resource
   * @param url The url of the resource
   * @returns The created resource
   */
  public static async createWorkspaceResource(
    workspaceId: string,
    title: string,
    url: string
  ): Promise<Resource> {
    // * Create a new workspace resource
    const resource = new CreateResourceRequest(title, url);

    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/workspaces/${workspaceId}/resources`,
      {
        method: "POST",
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

      // * Convert the response to a resource object
      return new Resource(
        data.id,
        data.title,
        data.description,
        data.url,
        data.type
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to create workspace resource");
    }
  }

  /**
   * Get all workspace resources
   * @param workspaceId
   * @returns All workspace resources
   */
  public static async getWorkspaceResources(
    workspaceId: string
  ): Promise<Resource[]> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/workspaces/${workspaceId}/resources`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to resource objects
      return data.map(
        (resource: Resource) =>
          new Resource(
            resource.id,
            resource.title,
            resource.description,
            resource.url,
            resource.type
          )
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get workspace resources");
    }
  }

  /**
   * Get a workspace resource
   * @param workspaceId The id of the workspace
   * @param resourceId The id of the resource
   * @returns The resource
   */
  public static async getWorkspaceResource(
    workspaceId: string,
    resourceId: string
  ): Promise<Resource> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/workspaces/${workspaceId}/resources/${resourceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to a resource object
      return new Resource(
        data.id,
        data.title,
        data.description,
        data.url,
        data.type
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get workspace resource");
    }
  }

  /**
   * Update a workspace resource
   * @param workspaceId The id of the workspace
   * @param resourceId The id of the resource
   * @param title The title of the resource
   * @param url The url of the resource
   * @param description The description of the resource
   * @param type The type of the resource
   * @returns The updated resource
   */
  public static async updateWorkspaceResource(
    workspaceId: string,
    resourceId: string,
    title: string,
    url: string,
    description: string,
    type: string
  ): Promise<Resource> {
    // * Create a new workspace resource
    const resource = new UpdateResourceRequest(title, url, description, type);

    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/workspaces/${workspaceId}/resources/${resourceId}`,
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

      // * Convert the response to a resource object
      return new Resource(
        data.id,
        data.title,
        data.description,
        data.url,
        data.type
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to update workspace resource");
    }
  }

  /**
   * Delete a workspace resource
   * @param workspaceId
   * @param resourceId
   */
  public static async deleteWorkspaceResource(
    workspaceId: string,
    resourceId: string
  ): Promise<void> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/api/workspaces/${workspaceId}/resources/${resourceId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ? Check if the request was successful
    if (!response.ok) {
      // ! Throw an error
      throw new Error("Failed to delete workspace resource");
    }
  }
}
