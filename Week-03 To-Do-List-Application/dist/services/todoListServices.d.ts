import type { Task } from "../types/todoListTypes.js";
import type { RemoveStatusFilter, RemovePriorityFilter, TaskPriority } from "../types/todoListTypes.js";
export default class TodoServices {
    tasksList: Task[];
    constructor();
    removeTasksByFilters(statusFilter: RemoveStatusFilter, priorityFilter: RemovePriorityFilter): void;
    toggleTaskStatus(taskId: string): void;
    addTask(title: string, taskPriority: TaskPriority): void;
    editTask(taskId: string, newTaskTitle: string): void;
    deleteTask(taskId: string): void;
    toggleTaskPriority(taskId: string): void;
}
//# sourceMappingURL=todoListServices.d.ts.map