export type TaskStatus = "pending" | "done";
export type TaskPriority = "high" | "low";
export type RemoveFilter = "all" | "pending" | "done" | "high" | "low";

export type Task = {
  taskId: string;
  title: string;
  createdAt: string;
  status: TaskStatus;
  priority: TaskPriority;
};
