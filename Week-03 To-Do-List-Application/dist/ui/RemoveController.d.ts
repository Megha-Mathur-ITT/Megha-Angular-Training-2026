import type { RemoveStatusFilter, RemovePriorityFilter } from "../types/todoListTypes.js";
type todoListRemoveHandler = {
    onRemoveTask: (statusFilter: RemoveStatusFilter, priorityFilter: RemovePriorityFilter) => void;
};
export default class TodoListRemoveController {
    removePrioritySelect: HTMLSelectElement;
    removeStatusSelect: HTMLSelectElement;
    removeTasksButton: HTMLButtonElement;
    constructor(handlers: todoListRemoveHandler);
}
export {};
//# sourceMappingURL=RemoveController.d.ts.map