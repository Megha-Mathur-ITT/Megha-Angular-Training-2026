import TodoServices from "./services/todoListServices.js";
import TodoListRenderer from "./ui/todoListRenderer.js";
import { storage } from "./utils/storage.js";
import TodoListInputController from "./ui/todoListInputController.js";
const service = new TodoServices();
const todoListUi = new TodoListRenderer();
const prioritySelect = document.getElementById("prioritySelect");
const removeFilterSelect = document.getElementById("removeFilterSelect");
const removeTasksButton = document.getElementById("removeTasksButton");
if (!prioritySelect) {
    throw new Error("Priority select not found");
}
if (!removeFilterSelect || !removeTasksButton) {
    throw new Error("Remove controls not found");
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
    const selectedFilter = removeFilterSelect.value;
    service.removeTasksByFilter(selectedFilter);
    refreshUI();
});
refreshUI();
//# sourceMappingURL=main.js.map