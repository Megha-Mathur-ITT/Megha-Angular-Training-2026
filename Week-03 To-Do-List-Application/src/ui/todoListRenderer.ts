import type { Task } from "../types/todoListTypes.js";

type todoListUiHandlers = {
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

  createTaskInformationContainer(task: Task): HTMLDivElement {
    const taskInformationContainer = document.createElement("div");
    taskInformationContainer.className = "task-item";

    const taskTitle = document.createElement("p");
    taskTitle.className = "task-title";
    taskTitle.textContent = task.title;

    if (task.status === "done") {
      taskTitle.style.textDecoration = "line-through";
      taskTitle.style.color = "gray";
    }

    const taskPriorityBadge = document.createElement("span");
    taskPriorityBadge.className = `task-priority ${task.priority}`;
    taskPriorityBadge.textContent = task.priority.toUpperCase();

    if (task.priority === "high") {
      taskPriorityBadge.style.fontWeight = "bold";
    }

    const taskCreationDate = document.createElement("p");
    taskCreationDate.className = "task-date";
    taskCreationDate.textContent = `Added: ${task.createdAt}`;

    taskInformationContainer.appendChild(taskTitle);
    taskInformationContainer.appendChild(taskPriorityBadge);
    taskInformationContainer.appendChild(taskCreationDate);

    return taskInformationContainer;
  }

  createToggleButton(task: Task, handlers: todoListUiHandlers) {
    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.className = "toggle-button";
    toggleStatusButton.textContent = task.status === "done" ? "Undo" : "Done";

    toggleStatusButton.addEventListener("click", () =>
      handlers.onToggleStatus(task.taskId)
    );

    return toggleStatusButton;
  }

  createEditButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement {
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
      const newTaskTitle = prompt("Edit Task:", task.title);

      if (newTaskTitle !== null) {
        handlers.onEditTask(task.taskId, newTaskTitle);
      }
    });

    return editButton;
  }

  createDeleteButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      handlers.onDeleteTask(task.taskId);
    })

    return deleteButton;
  }

  createPriorityButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement {
    const priorityButton = document.createElement("button");
    priorityButton.className = `priority-button ${task.priority}`;
    priorityButton.textContent = task.priority === "high" ? "High" : "Low";

    priorityButton.addEventListener("click", () => {
      handlers.onTogglePriority(task.taskId);
    });

    return priorityButton;
  }

  createTaskActionContainer(task: Task, handlers: todoListUiHandlers): HTMLDivElement {
    const taskActionsContainer = document.createElement("div");
    taskActionsContainer.className = "actions-container";

    const toggleStatusButton = this.createToggleButton(task, handlers);
    const editButton = this.createEditButton(task, handlers);
    const deleteButton = this.createDeleteButton(task, handlers);
    const priorityButton = this.createPriorityButton(task, handlers);
    
    taskActionsContainer.appendChild(toggleStatusButton);
    taskActionsContainer.appendChild(editButton);
    taskActionsContainer.appendChild(deleteButton);
    taskActionsContainer.appendChild(priorityButton);

    return taskActionsContainer;
  }

  createtaskListItem(task: Task, handlers: todoListUiHandlers): HTMLLIElement {
    const listItem = document.createElement("li");
    listItem.className = "task-container";

    const taskInformationContainer = this.createTaskInformationContainer(task);
    const taskActionContainer = this.createTaskActionContainer(task, handlers);

    listItem.appendChild(taskInformationContainer);
    listItem.appendChild(taskActionContainer);

    return listItem;
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
      const taskListItem = this.createtaskListItem(task, handlers);
      this.taskListElement.appendChild(taskListItem);
    });
  }
}
