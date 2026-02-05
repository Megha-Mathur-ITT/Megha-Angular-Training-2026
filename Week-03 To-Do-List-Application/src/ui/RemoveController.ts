import type { RemoveStatusFilter, RemovePriorityFilter } from "../types/todoListTypes.js";

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

    constructor(handlers: todoListRemoveHandler) {
        const removePrioritySelect = document.getElementById("removePrioritySelect") as HTMLSelectElement | null;
        const removeStatusSelect = document.getElementById("removeStatusSelect") as HTMLSelectElement | null;
        const removeTasksButton = document.getElementById("removeTasksButton") as HTMLButtonElement | null;

        if (!removeStatusSelect || !removePrioritySelect || !removeTasksButton) {
            throw new Error("Remove filter controls not found");
        }

        this.removePrioritySelect = removePrioritySelect
        this.removeStatusSelect = removeStatusSelect;
        this.removeTasksButton = removeTasksButton;

        removeTasksButton.addEventListener("click", () => {
            const statusFilter = removeStatusSelect.value as RemoveStatusFilter;
            const priorityFilter = removePrioritySelect.value as RemovePriorityFilter;

            handlers.onRemoveTask(statusFilter, priorityFilter);
        })
    }
}
