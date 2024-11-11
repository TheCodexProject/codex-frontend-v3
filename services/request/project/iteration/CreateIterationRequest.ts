/**
 * A request to create a new iteration on a project
 */
export class CreateIterationRequest
{
    public title: string;

    constructor(title: string)
    {
        this.title = title;
    }
}