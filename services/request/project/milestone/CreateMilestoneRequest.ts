/**
 * A request to create a new milestone for a project
 */
export class CreateMilestoneRequest
{
    public title: string;

    constructor(title: string)
    {
        this.title = title;
    }
}