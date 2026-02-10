import TodoServices from "./services/todoListServices.js";
import TodoListRenderer from "./ui/todoListRenderer.js";
import { storage } from "./utils/storage.js";
import bindInputController from "./app/bindInputController.js";
import bindRemoveController from "./app/bindRemoveController.js";
const service = new TodoServices();
const todoListUiRenderer = new TodoListRenderer();
function refreshUI() {
    todoListUiRenderer.renderTasks(storage.getTodoList(), {
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
    }, todoListUiRenderer);
}
bindInputController(service, refreshUI, todoListUiRenderer);
bindRemoveController(service, refreshUI, todoListUiRenderer);
refreshUI();
//# sourceMappingURL=main.js.map