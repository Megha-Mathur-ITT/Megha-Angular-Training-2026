export class TodoListUI {
    constructor(taskList) {
        const element = document.getElementById(taskList);
        if (!element) {
            throw new Error(`Element "${taskList}" not found`);
        }
        this.taskListElement = element;
    }
    renderEmptyState() {
        const emptyMessageItem = document.createElement("li");
        emptyMessageItem.textContent = "No tasks yet, Add your first task.";
        emptyMessageItem.style.color = "gray";
        this.taskListElement.appendChild(emptyMessageItem);
    }
    createTaskInformationContainer(task) {
        const taskInformationContainer = document.createElement("div");
        taskInformationContainer.className = "task-left";
        const taskTitle = document.createElement("p");
        taskTitle.className = "task-title";
        taskTitle.textContent = task.title;
        if (task.status === "done") {
            taskTitle.style.textDecoration = "line-through";
            taskTitle.style.opacity = "0.7";
        }
        const taskCreationDate = document.createElement("small");
        taskCreationDate.className = "task-date";
        taskCreationDate.textContent = `Added: ${task.createdAt}`;
        taskInformationContainer.appendChild(taskTitle);
        taskInformationContainer.appendChild(taskCreationDate);
        return taskInformationContainer;
    }
    createTaskActionContainer(task, handlers) {
        const taskActionsContainer = document.createElement("div");
        taskActionsContainer.className = "actions";
        const toggleStatusButton = document.createElement("button");
        toggleStatusButton.className = "toggle-button";
        toggleStatusButton.textContent = task.status === "done" ? "Undo" : "Done";
        toggleStatusButton.addEventListener("click", () => handlers.onToggleStatus(task.taskId));
        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            const updated = prompt("Edit Task:", task.title);
            if (updated !== null) {
                handlers.onEditTask(task.taskId, updated);
            }
        });
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => handlers.onDeleteTask(task.taskId));
        taskActionsContainer.appendChild(toggleStatusButton);
        taskActionsContainer.appendChild(editButton);
        taskActionsContainer.appendChild(deleteButton);
        return taskActionsContainer;
    }
    createtaskListItem(task, handlers) {
        const listItem = document.createElement("li");
        listItem.className = "task-item";
        const taskInformationContainer = this.createTaskInformationContainer(task);
        const taskActionContainer = this.createTaskActionContainer(task, handlers);
        listItem.appendChild(taskInformationContainer);
        listItem.appendChild(taskActionContainer);
        return listItem;
    }
    renderTasks(tasks, handlers) {
        this.taskListElement.innerHTML = "";
        if (tasks.length === 0) {
            this.renderEmptyState();
            return;
        }
        tasks.forEach((task) => {
            const taskListItem = this.createtaskListItem(task, handlers);
            this.taskListElement.appendChild(taskListItem);
        });
    }
}
//# sourceMappingURL=todoListUi.js.map