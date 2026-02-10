import type { Task } from "../types/todoTypes.js";
export declare class TodoService {
    tasks: Task[];
    constructor();
    getAllTasks(): Task[];
    addTask(title: string): void;
    toggle(id: string): void;
    edit(id: string, newTitle: string): void;
    delete(id: string): void;
    private saveTodoList;
}
//# sourceMappingURL=toDoService.d.ts.map