"use client";

import React, { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useProject } from "@/contexts/ProjectContext";
import { useWorkItems } from "@/hooks/services/WorkItemService";

const TaskBoard: React.FC = () => {
  const { currentProject } = useProject();
  const { data: workItems = [] } = useWorkItems(currentProject?.id || "");

  // Status columns in the frontend
  const statusColumns = ["To Do", "In Progress", "Completed"];

  // Map backend status to frontend columns
  const mapStatusToColumn = (status: string): string => {
    switch (status) {
      case "Open":
        return "To Do";
      case "InProgress":
        return "In Progress";
      case "ReadyForReview":
        return "In Progress";
      case "Done":
        return "Completed";
      case "Closed":
        return "Completed";
      default:
        return "To Do"; // Default mapping
    }
  };

  // Apply mapping to all work items
  const mappedTasks = workItems.map((task) => ({
    ...task,
    status: mapStatusToColumn(task.status),
  }));

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || !currentProject) return;

    const updatedTasks = Array.from(mappedTasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);

    // Update the task's status
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    // Optional: Update the backend here
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-4 md:grid-cols-3">
        {statusColumns.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-accent p-4 rounded-md"
              >
                <h3 className="font-semibold mb-2">{status}</h3>
                <ul className="space-y-2">
                  {mappedTasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-background p-2 rounded-md shadow"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{task.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {task.description}
                                </p>
                              </div>
                              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
                                {task.priority}
                              </span>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
