function createButton(buttonClassName, buttonTextContent, onclick) {
    const actionButton = document.createElement("button");
    actionButton.className = buttonClassName;
    actionButton.textContent = buttonTextContent;
    if (onclick) {
        actionButton.addEventListener("click", onclick);
    }
    return actionButton;
}
function createEditForm(task, handlers, todoListUiRenderer) {
    const editTitleFormContainer = document.createElement("div");
    editTitleFormContainer.className = "editFormContainer";
    const editForm = document.createElement("div");
    editForm.className = "edit-form";
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.title;
    input.className = "edit-input";
    const updateButton = createButton("update-button", "Update", () => {
        const newTitle = input.value.trim();
        if (!newTitle) {
            todoListUiRenderer.showMessage("Task title cannot be empty!");
            return;
        }
        try {
            handlers.onEditTask(task.taskId, newTitle);
        }
        catch (error) {
            if (error instanceof Error) {
                todoListUiRenderer.showMessage(error.message);
            }
        }
        editTitleFormContainer.remove();
    });
    const cancelButton = createButton("cancel-button", "Cancel", () => {
        editTitleFormContainer.remove();
    });
    editForm.appendChild(input);
    editForm.appendChild(updateButton);
    editForm.appendChild(cancelButton);
    editTitleFormContainer.appendChild(editForm);
    return editTitleFormContainer;
}
export function createTaskActionContainer(task, handlers, todoListUiRenderer) {
    const taskActionsContainer = document.createElement("div");
    taskActionsContainer.className = "actions-container";
    const toggleStatusButton = createButton("status-toggle-button", task.status === "done" ? "Undo" : "Done", () => {
        try {
            handlers.onToggleStatus(task.taskId);
        }
        catch (error) {
            if (error instanceof Error) {
                todoListUiRenderer.showMessage(error.message);
            }
        }
    });
    const deleteButton = createButton("delete-button", "Delete", () => handlers.onDeleteTask(task.taskId));
    const editButton = createButton("edit-button", "Edit", () => {
        const editTitleFormContainer = createEditForm(task, handlers, todoListUiRenderer);
        document.body.appendChild(editTitleFormContainer);
    });
    const priorityButton = createButton(`priority-button ${task.priority}`, task.priority === "high" ? "Low" : "High", () => {
        try {
            handlers.onTogglePriority(task.taskId);
        }
        catch (error) {
            if (error instanceof Error) {
                todoListUiRenderer.showMessage(error.message);
            }
        }
    });
    taskActionsContainer.appendChild(toggleStatusButton);
    taskActionsContainer.appendChild(editButton);
    taskActionsContainer.appendChild(deleteButton);
    taskActionsContainer.appendChild(priorityButton);
    return taskActionsContainer;
}
//# sourceMappingURL=createTaskActionContainer.js.map