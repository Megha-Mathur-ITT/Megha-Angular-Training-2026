import type { Task } from "../types/todoListTypes.js";
import type { RemoveFilter } from "../types/todoListTypes.js";
export default class TodoServices {
    tasksList: Task[];
    constructor();
    removeTasksByFilter(filter: RemoveFilter): void;
    toggleTaskStatus(taskId: string): void;
    addTask(title: string, taskPriority: "high" | "low"): void;
    editTask(taskId: string, newTaskTitle: string): void;
    deleteTask(taskId: string): void;
    updatePriority(taskId: string, priority: "high" | "low"): void;
    toggleTaskPriority(taskId: string): void;
}
//# sourceMappingURL=todoListServices.d.ts.map