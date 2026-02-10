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
  messageElement: HTMLElement;

  constructor() {
    const element = document.getElementById("taskList-container");
    const messageElement = document.getElementById("input-message");
    
    if (!element) {
      throw new Error(`task-list container element not found`);
    }
    
    if (!messageElement) {
      throw new Error(`message element not found`);
    }

    this.taskListElement = element as HTMLUListElement;
    this.messageElement = messageElement as HTMLElement;
  }

  showMessage(message: string): void {
    this.messageElement.textContent = message;
    this.messageElement.style.color = "red";
  }

  clearMessage(): void {
    this.messageElement.textContent = "";
  }

  renderEmptyState(): void {
    this.showMessage("No tasks yet, Add your first task.");
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

  renderTasks(
    tasks: Task[],
    handlers: todoListUiHandlers,
    todoListUiRenderer: TodoListRenderer
  ): void {
    this.taskListElement.innerHTML = "";
    
    if (tasks.length === 0) {
      this.renderEmptyState();
      return;
    }

    const sortedTasks = this.getSortedTaskList(tasks);

    sortedTasks.forEach((task) => {
      const taskListItem = createTaskListItem(task, handlers, todoListUiRenderer);
      this.taskListElement.appendChild(taskListItem);
    });
  }
}
