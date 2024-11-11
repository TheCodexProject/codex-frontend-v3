import {User} from "@/services/models/User";

/**
 * Workspace model
 */
export class Workspace
{
    public id: string;
    public title: string;
    public ownedBy: string;
    public contacts: User[];
    public projects: string[];

    constructor(id: string, title: string, ownedBy: string, contacts: User[], projects: string[])
    {
        this.id = id;
        this.title = title;
        this.ownedBy = ownedBy;
        this.contacts = contacts;
        this.projects = projects;
    }
}