/**
 * A class representing a project activity (Milestone or Iteration)
 */
export class ProjectActivity
{
    public id: string;
    public containedIn: string;
    public title: string;
    public description: string;
    public items: string[];

    constructor(id: string, containedIn: string, title: string, description: string, items: string[])
    {
        this.id = id;
        this.containedIn = containedIn;
        this.title = title;
        this.description = description;
        this.items = items;
    }
}