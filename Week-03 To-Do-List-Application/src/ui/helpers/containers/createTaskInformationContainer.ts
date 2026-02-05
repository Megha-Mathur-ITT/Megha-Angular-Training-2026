import { Task } from "../../../types/todoListTypes.js";

function createTaskTitle(task: Task): HTMLParagraphElement {
    const taskTitle = document.createElement("p");
    taskTitle.className = "task-title";
    taskTitle.textContent = task.title;

    if (task.status === "done") {
        taskTitle.style.textDecoration = "line-through";
        taskTitle.style.color = "gray";
    }

    return taskTitle;
}

function createPriorityBadge(task: Task): HTMLParagraphElement {
    const taskPriorityBadge = document.createElement("p");
    taskPriorityBadge.className = `task-priority ${task.priority}`;
    taskPriorityBadge.textContent = task.priority.toUpperCase();

    if (task.priority === "high") {
        taskPriorityBadge.style.fontWeight = "bold";
    }

    return taskPriorityBadge;
}

function createTaskCreationDate(task: Task): HTMLParagraphElement {
    const taskCreationDate = document.createElement("p");
    taskCreationDate.className = "task-date";
    taskCreationDate.textContent = `Added: ${task.createdAt}`;

    return taskCreationDate;
}

export function createTaskInformationContainer(task: Task): HTMLDivElement {
    const taskInformationContainer = document.createElement("div");
    taskInformationContainer.className = "task-item";

    const taskTitle = createTaskTitle(task);
    const taskPriorityBadge = createPriorityBadge(task);
    const taskCreationDate = createTaskCreationDate(task);

    taskInformationContainer.appendChild(taskTitle);
    taskInformationContainer.appendChild(taskPriorityBadge);
    taskInformationContainer.appendChild(taskCreationDate);

    return taskInformationContainer;
}
