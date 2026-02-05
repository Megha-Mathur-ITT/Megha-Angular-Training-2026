export default class TodoListRemoveController {
    constructor(handlers) {
        const removePrioritySelect = document.getElementById("removePrioritySelect");
        const removeStatusSelect = document.getElementById("removeStatusSelect");
        const removeTasksButton = document.getElementById("removeTasksButton");
        if (!removeStatusSelect || !removePrioritySelect || !removeTasksButton) {
            throw new Error("Remove filter controls not found");
        }
        this.removePrioritySelect = removePrioritySelect;
        this.removeStatusSelect = removeStatusSelect;
        this.removeTasksButton = removeTasksButton;
        removeTasksButton.addEventListener("click", () => {
            const statusFilter = removeStatusSelect.value;
            const priorityFilter = removePrioritySelect.value;
            handlers.onRemoveTask(statusFilter, priorityFilter);
        });
    }
}
//# sourceMappingURL=todoListRemoveController.js.map