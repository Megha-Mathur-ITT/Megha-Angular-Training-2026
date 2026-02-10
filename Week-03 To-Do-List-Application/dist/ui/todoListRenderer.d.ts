import type { Task } from "../types/todoListTypes.js";
export type todoListUiHandlers = {
    onToggleStatus: (taskId: string) => void;
    onEditTask: (taskId: string, newTitle: string) => void;
    onDeleteTask: (taskId: string) => void;
    onTogglePriority: (taskId: string) => void;
};
export default class TodoListRenderer {
    taskListElement: HTMLUListElement;
    messageElement: HTMLElement;
    constructor();
    showMessage(message: string): void;
    clearMessage(): void;
    renderEmptyState(): void;
    getSortedTaskList(tasks: Task[]): Task[];
    renderTasks(tasks: Task[], handlers: todoListUiHandlers, todoListUiRenderer: TodoListRenderer): void;
}
//# sourceMappingURL=todoListRenderer.d.ts.map