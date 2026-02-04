export function createToggleStatusButton(task, handlers) {
    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.className = "status-toggle-button";
    toggleStatusButton.textContent = task.status === "done" ? "Undo" : "Done";
    toggleStatusButton.addEventListener("click", () => handlers.onToggleStatus(task.taskId));
    return toggleStatusButton;
}
function createEditForm(task, handlers) {
    const editTitleFormContainer = document.createElement("div");
    editTitleFormContainer.className = "editFormContainer";
    const editForm = document.createElement("div");
    editForm.className = "edit-form";
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.title;
    input.className = "edit-input";
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.className = "update-button";
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "cancel-button";
    updateButton.addEventListener("click", () => {
        const newTitle = input.value.trim();
        if (!newTitle) {
            return;
        }
        handlers.onEditTask(task.taskId, newTitle);
        editTitleFormContainer.remove();
    });
    cancelButton.addEventListener("click", () => {
        editTitleFormContainer.remove();
    });
    editForm.appendChild(input);
    editForm.appendChild(updateButton);
    editForm.appendChild(cancelButton);
    editTitleFormContainer.appendChild(editForm);
    return editTitleFormContainer;
}
export function createEditButton(task, handlers) {
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
        const editTitleFormContainer = createEditForm(task, handlers);
        document.body.appendChild(editTitleFormContainer);
    });
    return editButton;
}
export function createDeleteButton(task, handlers) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        handlers.onDeleteTask(task.taskId);
    });
    return deleteButton;
}
export function createPriorityButton(task, handlers) {
    const priorityButton = document.createElement("button");
    priorityButton.className = `priority-button ${task.priority}`;
    priorityButton.textContent = task.priority === "high" ? "High" : "Low";
    priorityButton.addEventListener("click", () => {
        handlers.onTogglePriority(task.taskId);
    });
    return priorityButton;
}
export function createTaskActionContainer(task, handlers) {
    const taskActionsContainer = document.createElement("div");
    taskActionsContainer.className = "actions-container";
    const toggleStatusButton = createToggleStatusButton(task, handlers);
    const editButton = createEditButton(task, handlers);
    const deleteButton = createDeleteButton(task, handlers);
    const priorityButton = createPriorityButton(task, handlers);
    taskActionsContainer.appendChild(toggleStatusButton);
    taskActionsContainer.appendChild(editButton);
    taskActionsContainer.appendChild(deleteButton);
    taskActionsContainer.appendChild(priorityButton);
    return taskActionsContainer;
}
export function createTaskInformationContainer(task) {
    const taskInformationContainer = document.createElement("div");
    taskInformationContainer.className = "task-item";
    const taskTitle = document.createElement("p");
    taskTitle.className = "task-title";
    taskTitle.textContent = task.title;
    if (task.status === "done") {
        taskTitle.style.textDecoration = "line-through";
        taskTitle.style.color = "gray";
    }
    const taskPriorityBadge = document.createElement("p");
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
export function createTaskListItem(task, handlers) {
    const listItem = document.createElement("li");
    listItem.className = "task-container";
    const taskInformationContainer = createTaskInformationContainer(task);
    const taskActionContainer = createTaskActionContainer(task, handlers);
    listItem.appendChild(taskInformationContainer);
    listItem.appendChild(taskActionContainer);
    return listItem;
}
//# sourceMappingURL=todoListDomBuilders.js.map