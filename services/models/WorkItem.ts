/**
 * A class representing a work item (task, bug, etc.)
 */
export class WorkItem
{
    public id: string;
    public containedIn: string;
    public title: string;
    public description: string;
    public status: string;
    public priority: string;
    public type: string;
    public assignedTo: string;

    constructor(id: string, containedIn: string, title: string, description: string, status: string, priority: string, type: string, assignedTo: string)
    {
        this.id = id;
        this.containedIn = containedIn;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.type = type;
        this.assignedTo = assignedTo;
    }
}