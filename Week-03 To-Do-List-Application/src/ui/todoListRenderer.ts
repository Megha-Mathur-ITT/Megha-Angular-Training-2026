import type { Task } from "../types/todoListTypes.js";
import { createTaskListItem } from "./helpers/todoListDomBuilders.js";

export type todoListUiHandlers = {
  onToggleStatus: (taskId: string) => void;
  onEditTask: (taskId: string, newTitle: string) => void;
  onDeleteTask: (taskId: string) => void;
  onTogglePriority: (taskId: string) => void;
};

export default class TodoListRenderer {
  taskListElement: HTMLUListElement;

  constructor() {
    const element = document.getElementById("taskList-container");

    if (!element) {
      throw new Error(`Element not found`);
    }

    this.taskListElement = element as HTMLUListElement;
  }

  renderEmptyState(): void {
    const emptyMessageItem = document.createElement("li");
    emptyMessageItem.textContent = "No tasks yet, Add your first task.";
    emptyMessageItem.style.color = "gray";

    this.taskListElement.appendChild(emptyMessageItem);
  }

  getSortedTaskList(tasks: Task[]) {
    let pendingTasks = tasks.filter((currentTask) => (
      currentTask.status === "pending"
    ));

    const highPriorityTasks = pendingTasks.filter((currentTask) => (
      currentTask.priority === "high"
    ));

    const lowPriorityTasks = pendingTasks.filter((currentTask) => (
      currentTask.priority === "low"
    ))

    pendingTasks = [...highPriorityTasks, ...lowPriorityTasks];

    const completedTasks = tasks.filter((currentTask) => (
      currentTask.status === "done"
    ))

    const sortedTasks = [...pendingTasks, ...completedTasks];

    return sortedTasks;
  }

  renderTasks(tasks: Task[], handlers: todoListUiHandlers): void {
    this.taskListElement.innerHTML = "";

    if (tasks.length === 0) {
      this.renderEmptyState();
      return;
    }

    const sortedTasks = this.getSortedTaskList(tasks);

    sortedTasks.forEach((task) => {
      const taskListItem = createTaskListItem(task, handlers);
      this.taskListElement.appendChild(taskListItem);
    });
  }
}
