import TodoServices from "./services/todoListServices.js";
import TodoListRenderer from "./ui/todoListRenderer.js";
import { storage } from "./utils/storage.js";
import TodoListInputController from "./ui/todoListInputController.js";
import type { RemoveFilter } from "./types/todoListTypes.js";

const service = new TodoServices();
const todoListUi = new TodoListRenderer();
const prioritySelect = document.getElementById("prioritySelect") as HTMLSelectElement | null;
const removeFilterSelect = document.getElementById("removeFilterSelect") as HTMLSelectElement | null;
const removeTasksButton = document.getElementById("removeTasksButton") as HTMLButtonElement | null;

if (!prioritySelect) {
  throw new Error("Priority select not found");
}

if (!removeFilterSelect || !removeTasksButton) {
  throw new Error("Remove controls not found");
}

function refreshUI(): void {
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
    onTogglePriority: (taskId: string) => {
      service.toggleTaskPriority(taskId);
      refreshUI();
    }
  });
}

new TodoListInputController({
  OnAddNewTask: (title) => {
    service.addTask(title, prioritySelect.value as "high" | "low");
    refreshUI();
  }
});

removeTasksButton.addEventListener("click", () => {
  const selectedFilter = removeFilterSelect.value as RemoveFilter;

  service.removeTasksByFilter(selectedFilter);
  refreshUI();
});


refreshUI();
