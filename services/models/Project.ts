/**
 * A class representing a project
 */
export class Project {
  public id: string;
  public title: string;
  public containedIn: string;
  public status: string;
  public priority: string;
  public timeRange: Date[];

  constructor(
    id: string,
    title: string,
    containedIn: string,
    status: string,
    priority: string,
    timeRange: Date[]
  ) {
    this.id = id;
    this.title = title;
    this.containedIn = containedIn;
    this.status = status;
    this.priority = priority;
    this.timeRange = timeRange;
  }
}
