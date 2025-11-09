declare interface Task {
  id: string;
  title: string;
  description: string;
  resourceLinks: string[];
  updates: string[];
  tags: string[];
  status: TaskStatus;
  createdAt: Date;
  space: SpaceSummary | undefined;
}

declare interface TaskPayload {
  title: string;
  description: string;
  resourceLinks?: string[];
  updates?: string[];
  tags?: string[];
  status: TaskStatus;
  spaceId?: string;
}

declare type TaskStatus = "todo" | "in-progress" | "blocked" | "done";


