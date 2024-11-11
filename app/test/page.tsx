"use client";

import React, { useState } from "react";
import { EditWorkItemDialog } from "@/container Components/pop-ups/workitem/editWorkitemDialog";
import { WorkItem } from "@/services/models/WorkItem"; // Adjust the import path as needed
import {
  Status,
  Priority,
} from "@/container Components/pop-ups/workitem/editWorkitemDialog";
import { User } from "@/services/models/User";

// Sample users list for assignee selection
const sampleUsers: User[] = [
  {
    id: "1",
    firstname: "Alice",
    lastname: "Smith",
    email: "alice.smith@example.com",
    OwnedOrganizations: [],
    MemberOfOrganizations: [],
  },
  {
    id: "2",
    firstname: "Bob",
    lastname: "Johnson",
    email: "bob.johnson@example.com",
    OwnedOrganizations: [],
    MemberOfOrganizations: [],
  },
  {
    id: "3",
    firstname: "Carol",
    lastname: "Williams",
    email: "carol.williams@example.com",
    OwnedOrganizations: [],
    MemberOfOrganizations: [],
  },
];

// Sample work item data
const initialWorkItem = new WorkItem(
  "123",
  "project-1",
  "Initial Title",
  "Initial Description",
  Status.Open,
  Priority.Medium,
  "task",
  "1" // Assigned to Alice
);

export default function EditWorkItemTestPage() {
  const [workItem, setWorkItem] = useState<WorkItem>(initialWorkItem);

  // Callback to handle the updated work item
  const handleWorkItemUpdated = (updatedWorkItem: WorkItem) => {
    console.log("Updated WorkItem:", updatedWorkItem);
    setWorkItem(updatedWorkItem); // Update the state with the new work item
  };

  return (
    <div>
      <h1>Edit Work Item Test Page</h1>
      <p>Current Work Item:</p>
      <ul>
        <li>
          <strong>ID:</strong> {workItem.id}
        </li>
        <li>
          <strong>Title:</strong> {workItem.title}
        </li>
        <li>
          <strong>Description:</strong> {workItem.description}
        </li>
        <li>
          <strong>Status:</strong> {workItem.status}
        </li>
        <li>
          <strong>Priority:</strong> {workItem.priority}
        </li>
        <li>
          <strong>Type:</strong> {workItem.type}
        </li>
        <li>
          <strong>Assignee:</strong> {workItem.assignedTo}
        </li>
      </ul>

      <EditWorkItemDialog
        workItem={workItem}
        users={sampleUsers}
        onWorkItemUpdated={handleWorkItemUpdated} // Pass the callback
      />
    </div>
  );
}
