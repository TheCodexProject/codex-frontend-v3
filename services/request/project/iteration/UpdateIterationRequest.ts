/**
 * A request to update an iteration in a project
 */
export class UpdateIterationRequest
{
    public title: string | null;
    public description: string | null;
    public itemsToAdd: string[] | null;
    public itemsToRemove: string[] | null;

    constructor(title: string | null, description: string | null, itemsToAdd: string[] | null, itemsToRemove: string[] | null)
    {
        this.title = title;
        this.description = description;
        this.itemsToAdd = itemsToAdd;
        this.itemsToRemove = itemsToRemove;
    }
}