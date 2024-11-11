/**
 * A request to create a new organization resource
 */
export class CreateResourceRequest
{
    public title: string;
    public url: string;

    constructor(title: string, url: string)
    {
        this.title = title;
        this.url = url;
    }
}