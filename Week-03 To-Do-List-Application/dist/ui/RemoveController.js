export default class TodoListRemoveController {
    constructor(handlers, todoListUiRenderer) {
        const removePrioritySelect = document.getElementById("removePrioritySelect");
        const removeStatusSelect = document.getElementById("removeStatusSelect");
        const removeTasksButton = document.getElementById("removeTasksButton");
        if (!removeStatusSelect || !removePrioritySelect || !removeTasksButton) {
            throw new Error("Remove filter controls not found");
        }
        this.removePrioritySelect = removePrioritySelect;
        this.removeStatusSelect = removeStatusSelect;
        this.removeTasksButton = removeTasksButton;
        this.todoListUiRenderer = todoListUiRenderer;
        removeTasksButton.addEventListener("click", () => {
            const statusFilter = removeStatusSelect.value;
            const priorityFilter = removePrioritySelect.value;
            try {
                handlers.onRemoveTask(statusFilter, priorityFilter);
            }
            catch (error) {
                if (error instanceof Error) {
                    this.todoListUiRenderer.showMessage(error.message);
                }
            }
        });
    }
}
//# sourceMappingURL=RemoveController.js.map