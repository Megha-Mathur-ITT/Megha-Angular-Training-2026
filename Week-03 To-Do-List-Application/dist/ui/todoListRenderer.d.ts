import type { Task } from "../types/todoListTypes.js";
type todoListUiHandlers = {
    onToggleStatus: (taskId: string) => void;
    onEditTask: (taskId: string, newTitle: string) => void;
    onDeleteTask: (taskId: string) => void;
    onTogglePriority: (taskId: string) => void;
};
export default class TodoListRenderer {
    taskListElement: HTMLUListElement;
    constructor();
    renderEmptyState(): void;
    createTaskInformationContainer(task: Task): HTMLDivElement;
    createToggleButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
    createEditButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
    createDeleteButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
    createPriorityButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
    createTaskActionContainer(task: Task, handlers: todoListUiHandlers): HTMLDivElement;
    createtaskListItem(task: Task, handlers: todoListUiHandlers): HTMLLIElement;
    getSortedTaskList(tasks: Task[]): Task[];
    renderTasks(tasks: Task[], handlers: todoListUiHandlers): void;
}
export {};
//# sourceMappingURL=todoListRenderer.d.ts.map