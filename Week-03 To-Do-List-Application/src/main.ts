import TodoServices from "./services/todoListServices.js";
import TodoListRenderer from "./ui/todoListRenderer.js";
import { storage } from "./utils/storage.js";
import bindInputController from "./app/bindInputController.js";
import bindRemoveController from "./app/bindRemoveController.js";

const service = new TodoServices();
const todoListUiRenderer = new TodoListRenderer();

function refreshUI(): void {
  todoListUiRenderer.renderTasks(storage.getTodoList(), {
    onToggleStatus: (taskId: string) => {
      service.toggleTaskStatus(taskId);
      refreshUI();
    },
    onEditTask: (taskId: string, newTitle: string) => {
      service.editTask(taskId, newTitle);
      refreshUI();
    },
    onDeleteTask: (taskId: string) => {
      service.deleteTask(taskId);
      refreshUI();
    },
    onTogglePriority: (taskId: string) => {
      service.toggleTaskPriority(taskId);
      refreshUI();
    }
  });
}

bindInputController(service, refreshUI, todoListUiRenderer);
bindRemoveController(service, refreshUI, todoListUiRenderer);

refreshUI();
