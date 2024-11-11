/**
 * A request to update an organization resource
 */
export class UpdateResourceRequest
{
    public title: string | null;
    public url: string | null;
    public description: string | null;
    public type: string | null;

    constructor(title: string | null, url: string | null, description: string | null, type: string | null)
    {
        this.title = title;
        this.url = url;
        this.description = description;
        this.type = type;
    }
}