function createButton(buttonClassName, buttonTextContent, onclick) {
    const actionButton = document.createElement("button");
    actionButton.className = buttonClassName;
    actionButton.textContent = buttonTextContent;
    if (onclick) {
        actionButton.addEventListener("click", onclick);
    }
    return actionButton;
}
export function createUpdateButton(task, input, editTitleFormContainer, handlers) {
    const updateButton = createButton("update-button", "Update", () => {
        const newTitle = input.value.trim();
        handlers.onEditTask(task.taskId, newTitle);
        editTitleFormContainer.remove();
    });
    return updateButton;
}
export function createCancelButton(editTitleFormContainer) {
    const cancelButton = createButton("cancel-button", "Cancel", () => {
        editTitleFormContainer.remove();
    });
    return cancelButton;
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
    const updateButton = createUpdateButton(task, input, editTitleFormContainer, handlers);
    const cancelButton = createCancelButton(editTitleFormContainer);
    editForm.appendChild(input);
    editForm.appendChild(updateButton);
    editForm.appendChild(cancelButton);
    editTitleFormContainer.appendChild(editForm);
    return editTitleFormContainer;
}
export function createEditButton(task, handlers) {
    const editButton = createButton("edit-button", "Edit", () => {
        const editTitleFormContainer = createEditForm(task, handlers);
        document.body.appendChild(editTitleFormContainer);
    });
    return editButton;
}
export function createTaskActionContainer(task, handlers) {
    const taskActionsContainer = document.createElement("div");
    taskActionsContainer.className = "actions-container";
    const toggleStatusButton = createButton("status-toggle-button", task.status === "done" ? "Undo" : "Done", () => handlers.onToggleStatus(task.taskId));
    const deleteButton = createButton("delete-button", "Delete", () => handlers.onDeleteTask(task.taskId));
    const editButton = createEditButton(task, handlers);
    const priorityButton = createButton(`priority-button ${task.priority}`, task.priority === "high" ? "Low" : "High", () => handlers.onTogglePriority(task.taskId));
    taskActionsContainer.appendChild(toggleStatusButton);
    taskActionsContainer.appendChild(editButton);
    taskActionsContainer.appendChild(deleteButton);
    taskActionsContainer.appendChild(priorityButton);
    return taskActionsContainer;
}
//# sourceMappingURL=createTaskActionContainer.js.map