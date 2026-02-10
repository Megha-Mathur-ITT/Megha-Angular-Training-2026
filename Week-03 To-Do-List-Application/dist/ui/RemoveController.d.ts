import type { RemoveStatusFilter, RemovePriorityFilter } from "../types/todoListTypes.js";
import TodoListRenderer from "../ui/todoListRenderer.js";
type todoListRemoveHandler = {
    onRemoveTask: (statusFilter: RemoveStatusFilter, priorityFilter: RemovePriorityFilter) => void;
};
export default class TodoListRemoveController {
    removePrioritySelect: HTMLSelectElement;
    removeStatusSelect: HTMLSelectElement;
    removeTasksButton: HTMLButtonElement;
    todoListUiRenderer: TodoListRenderer;
    constructor(handlers: todoListRemoveHandler, todoListUiRenderer: TodoListRenderer);
}
export {};
//# sourceMappingURL=RemoveController.d.ts.map