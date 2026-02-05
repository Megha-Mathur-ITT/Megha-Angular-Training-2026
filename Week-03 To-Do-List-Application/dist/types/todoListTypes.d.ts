export type TaskStatus = "pending" | "done";
export type TaskPriority = "high" | "low";
export type RemoveStatusFilter = "all" | "pending" | "done";
export type RemovePriorityFilter = "all" | "high" | "low";
export type Task = {
    taskId: string;
    title: string;
    createdAt: string;
    status: TaskStatus;
    priority: TaskPriority;
};
//# sourceMappingURL=todoListTypes.d.ts.map