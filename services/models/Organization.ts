import {User} from "@/services/models/User";

/**
 * A class representing an organization
 */
export class Organization
{
    public id: string;
    public name: string;
    public owner: User;
    public members: string[];

    constructor(id: string, name: string, owner: User, members: string[])
    {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.members = members;
    }
}
