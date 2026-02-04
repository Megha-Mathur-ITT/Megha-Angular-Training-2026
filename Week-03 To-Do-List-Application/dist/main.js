import TodoServices from "./services/todoListServices.js";
import TodoListRenderer from "./ui/todoListRenderer.js";
import { storage } from "./utils/storage.js";
import TodoListInputController from "./ui/todoListInputController.js";
const service = new TodoServices();
const todoListUi = new TodoListRenderer();
const prioritySelect = document.getElementById("prioritySelect");
const removePrioritySelect = document.getElementById("removePrioritySelect");
const removeStatusSelect = document.getElementById("removeStatusSelect");
const removeTasksButton = document.getElementById("removeTasksButton");
if (!removeStatusSelect || !removePrioritySelect || !removeTasksButton) {
    throw new Error("Remove filter controls not found");
}
if (!prioritySelect) {
    throw new Error("Priority select not found");
}
function refreshUI() {
    todoListUi.renderTasks(storage.getTodoList(), {
        onToggleStatus: (taskId) => {
            service.toggleTaskStatus(taskId);
            refreshUI();
        },
        onEditTask: (taskId, newTitle) => {
            service.editTask(taskId, newTitle);
            refreshUI();
        },
        onDeleteTask: (taskId) => {
            service.deleteTask(taskId);
            refreshUI();
        },
        onTogglePriority: (taskId) => {
            service.toggleTaskPriority(taskId);
            refreshUI();
        }
    });
}
new TodoListInputController({
    OnAddNewTask: (title) => {
        service.addTask(title, prioritySelect.value);
        refreshUI();
    }
});
removeTasksButton.addEventListener("click", () => {
    const statusFilter = removeStatusSelect.value;
    const priorityFilter = removePrioritySelect.value;
    service.removeTasksByFilters(statusFilter, priorityFilter);
    refreshUI();
});
refreshUI();
//# sourceMappingURL=main.js.map