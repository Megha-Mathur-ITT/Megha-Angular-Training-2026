import type { RemoveStatusFilter, RemovePriorityFilter } from "../types/todoListTypes.js";
import TodoListRenderer from "../ui/todoListRenderer.js";

type todoListRemoveHandler = {
    onRemoveTask: (
        statusFilter: RemoveStatusFilter,
        priorityFilter: RemovePriorityFilter,
    ) => void;
};

export default class TodoListRemoveController {
    removePrioritySelect: HTMLSelectElement;
    removeStatusSelect: HTMLSelectElement;
    removeTasksButton: HTMLButtonElement;
    todoListUiRenderer: TodoListRenderer;

    constructor(
        handlers: todoListRemoveHandler,
        todoListUiRenderer: TodoListRenderer
    ) {
        const removePrioritySelect = document.getElementById("removePrioritySelect") as HTMLSelectElement | null;
        const removeStatusSelect = document.getElementById("removeStatusSelect") as HTMLSelectElement | null;
        const removeTasksButton = document.getElementById("removeTasksButton") as HTMLButtonElement | null;

        if (!removeStatusSelect || !removePrioritySelect || !removeTasksButton) {
            throw new Error("Remove filter controls not found");
        }

        this.removePrioritySelect = removePrioritySelect
        this.removeStatusSelect = removeStatusSelect;
        this.removeTasksButton = removeTasksButton;
        this.todoListUiRenderer = todoListUiRenderer;

        removeTasksButton.addEventListener("click", () => {
            const statusFilter = removeStatusSelect.value as RemoveStatusFilter;
            const priorityFilter = removePrioritySelect.value as RemovePriorityFilter;

            try {
                handlers.onRemoveTask(statusFilter, priorityFilter);
            }
            catch (error: unknown) {
                if (error instanceof Error) {
                    this.todoListUiRenderer.showMessage(error.message);
                }
            }
        })
    }
}
