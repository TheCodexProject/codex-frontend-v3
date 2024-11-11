/**
 * A request to update a project
 */
export class UpdateProjectRequest {
  public id: string;
  public title: string | null;
  public description: string | null;
  public status: string | null;
  public priority: string | null;
  public startDate: Date | null;
  public endDate: Date | null;

  constructor(
    id: string,
    title: string | null,
    description: string | null,
    status: string | null,
    priority: string | null,
    startDate: Date | null,
    endDate: Date | null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
