import type { Task } from "../types/todoTypes.js";
type TodoUIHandlers = {
    onToggleStatus: (taskId: string) => void;
    onEditTask: (taskId: string, newTitle: string) => void;
    onDeleteTask: (taskId: string) => void;
};
export declare class TodoListUI {
    private taskListElement;
    constructor(taskList: string);
    renderEmptyState(): void;
    createTaskInformationContainer(task: Task): HTMLDivElement;
    createTaskActionContainer(task: Task, handlers: TodoUIHandlers): HTMLDivElement;
    createtaskListItem(task: Task, handlers: TodoUIHandlers): HTMLLIElement;
    renderTasks(tasks: Task[], handlers: TodoUIHandlers): void;
}
export {};
//# sourceMappingURL=todoListUi.d.ts.map