import { WorkItem } from "@/services/models/WorkItem";
import { CreateWorkItemRequest } from "@/services/request/workItem/CreateWorkItemRequest";
import { UpdateWorkItemRequest } from "@/services/request/workItem/UpdateWorkItemRequest";

/**
 * A service for managing work items using the API
 */
export class WorkItemService {
  /**
   * Create a new work item in a project
   * @param projectId The ID of the project to create the work item in
   * @param title The title of the work item
   * @returns The created work item
   */
  public async createWorkItem(
    projectId: string,
    title: string
  ): Promise<WorkItem> {
    // * Make the request to create the work item
    const workItem = new CreateWorkItemRequest(title, projectId);
  
    // # Send the request to the API
    const response = await fetch("https://localhost:7006/workItems", {
      method: "POST",
      body: JSON.stringify(workItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();
  
      // * Convert the response to a work item object
      return new WorkItem(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.status,
        data.priority,
        data.type,
        data.assignedTo
      );
    } else {
      // ! Throw an error
      throw new Error(`Failed to create work item: ${response.statusText}`);
      console.log(response.body)
    }
  }
  

  /**
   * Get all work items in a project
   * @param projectId The ID of the project to get the work items from
   * @returns All work items in the project
   */
  public async getWorkItems(projectId: string): Promise<WorkItem[]> {
    // # Send the request to the API
    const response = await fetch(
      `https://localhost:7006/workItems?projectId=${projectId}`,
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

      // * Convert the response to work item objects
      return data.map(
        (item: WorkItem) =>
          new WorkItem(
            item.id,
            item.containedIn,
            item.title,
            item.description,
            item.status,
            item.priority,
            item.type,
            item.assignedTo
          )
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get work items");
    }
  }

  /**
   * Get a work item by its ID
   * @param id The ID of the work item
   * @returns The work item
   */
  public async getWorkItem(id: string): Promise<WorkItem> {
    // # Send the request to the API
    const response = await fetch(`https://localhost:7006/workItems/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to a work item object
      return new WorkItem(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.status,
        data.priority,
        data.type,
        data.assignedTo
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to get work item");
    }
  }

  /**
   * Update a work item
   * @param id The ID of the work item to update **(Required)**
   * @param title The new title of the work item (Optional)
   * @param description The new description of the work item (Optional)
   * @param status The new status of the work item (Optional)
   * @param priority The new priority of the work item (Optional)
   * @param assignee The new assignee of the work item (Optional)
   * @param subItemsToAdd The IDs of the work items to add as sub-items (Optional)
   * @param subItemsToRemove The IDs of the work items to remove as sub-items (Optional)
   * @returns The updated work item
   */
  public async updateWorkItem(
    id: string,
    title: string | null,
    description: string | null,
    status: string | null,
    priority: string | null,
    assignee: string | null,
    subItemsToAdd: string[] | null,
    subItemsToRemove: string[] | null
  ): Promise<WorkItem> {
    // * Make the request to update the work item
    const workItem = new UpdateWorkItemRequest(
      title?.replace(/\s/g, '') || '',
      description?.replace(/\s/g, '') || '',
      status?.replace(/\s/g, '') || '',
      priority?.replace(/\s/g, '') || '',
      assignee?.replace(/\s/g, '') || '',
      subItemsToAdd,
      subItemsToRemove
    );
    
    // # Send the request to the API
    const response = await fetch(`https://localhost:7006/workItems/${id}`, {
      method: "PUT",
      body: JSON.stringify(workItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ? Check if the request was successful
    if (response.ok) {
      // * Parse the response
      const data = await response.json();

      // * Convert the response to a work item object
      return new WorkItem(
        data.id,
        data.containedIn,
        data.title,
        data.description,
        data.status,
        data.priority,
        data.type,
        data.assignedTo
      );
    } else {
      // ! Throw an error
      throw new Error("Failed to update work item");
    }
  }

  /**
   * Delete a work item
   * @param id The ID of the work item to delete
   */
  public async deleteWorkItem(id: string): Promise<void> {
    // # Send the request to the API
    const response = await fetch(`https://localhost:7006/workItems/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ? Check if the request was successful
    if (!response.ok) {
      // ! Throw an error
      throw new Error("Failed to delete work item");
    }
  }
}
