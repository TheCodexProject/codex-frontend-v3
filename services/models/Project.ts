/**
 * A class representing a project
 */
export class Project
{
    public id: string;
    public title: string;
    public description: string;
    public status: string;
    public priority: string;
    public timeRange: Date[];
    public containedIn: string;

    constructor(id: string, title: string, description: string, status: string, priority: string, timeRange: Date[], containedIn: string)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.timeRange = timeRange;
        this.containedIn = containedIn;
    }
}