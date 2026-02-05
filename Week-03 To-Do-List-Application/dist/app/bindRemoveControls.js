import TodoListRemoveController from "../ui/todoListRemoveController.js";
export default function bindRemoveControls(service, refreshUI) {
    new TodoListRemoveController({
        onRemoveTask: (statusFilter, priorityFilter) => {
            service.removeTasksByFilters(statusFilter, priorityFilter);
            refreshUI();
        }
    });
}
//# sourceMappingURL=bindRemoveControls.js.map