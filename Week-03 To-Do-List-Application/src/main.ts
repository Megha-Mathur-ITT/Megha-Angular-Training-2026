import TodoServices from "./services/todoListServices.js";
import TodoListRenderer from "./ui/todoListRenderer.js";
import { storage } from "./utils/storage.js";
import TodoListInputController from "./ui/todoListInputController.js";
import type { RemoveStatusFilter, RemovePriorityFilter, TaskPriority } from "./types/todoListTypes.js";

const service = new TodoServices();
const todoListUi = new TodoListRenderer();

const prioritySelect = document.getElementById("prioritySelect") as HTMLSelectElement | null;
const removePrioritySelect = document.getElementById("removePrioritySelect") as HTMLSelectElement | null;
const removeStatusSelect = document.getElementById("removeStatusSelect") as HTMLSelectElement | null;
const removeTasksButton = document.getElementById("removeTasksButton") as HTMLButtonElement | null;

if (!removeStatusSelect || !removePrioritySelect || !removeTasksButton) {
  throw new Error("Remove filter controls not found");
}

if (!prioritySelect) {
  throw new Error("Priority select not found");
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
    service.addTask(title, prioritySelect.value as TaskPriority);
    refreshUI();
  }
});

removeTasksButton.addEventListener("click", () => {
  const statusFilter = removeStatusSelect.value as RemoveStatusFilter;
  const priorityFilter = removePrioritySelect.value as RemovePriorityFilter;

  service.removeTasksByFilters(statusFilter, priorityFilter);
  refreshUI();
});


refreshUI();
