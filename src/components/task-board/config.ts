export interface Column {
  status: string;
  title: string;
}

export interface Task {
  id: string;
  title: string;
  status: string;
}

export const COLUMNS: Column[] = [
  { status: "todo", title: "To Do" },
  { status: "in-progress", title: "In Progress" },
  { status: "blocked", title: "Blocked" },
  { status: "done", title: "Done" },
];
