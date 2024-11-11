/**
 * A class representing an organization resource
 */
export class Resource
{
    public id: string;
    public title: string;
    public url: string;
    public description: string;
    public type: string;

    constructor(id: string, title: string, url: string, description: string, type: string)
    {
        this.id = id;
        this.title = title;
        this.url = url;
        this.description = description;
        this.type = type;
    }
}