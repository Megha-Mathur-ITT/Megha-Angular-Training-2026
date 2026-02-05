import { Task } from "../../../types/todoListTypes.js";

export type todoListUiHandlers = {
    onToggleStatus: (taskId: string) => void;
    onEditTask: (taskId: string, newTitle: string) => void;
    onDeleteTask: (taskId: string) => void;
    onTogglePriority: (taskId: string) => void;
};

function createButton(
    buttonClassName: string,
    buttonTextContent: string,
    onclick?: () => void
) {
    const actionButton = document.createElement("button");
    actionButton.className = buttonClassName;
    actionButton.textContent = buttonTextContent;

    if (onclick) {
        actionButton.addEventListener("click", onclick);
    }

    return actionButton;
}

function createEditForm(task: Task, handlers: todoListUiHandlers): HTMLDivElement {
    const editTitleFormContainer = document.createElement("div");
    editTitleFormContainer.className = "editFormContainer";

    const editForm = document.createElement("div");
    editForm.className = "edit-form";

    const input = document.createElement("input");
    input.type = "text";
    input.value = task.title;
    input.className = "edit-input";

    const updateButton = createButton(
        "update-button",
        "Update",
        () => {
            const newTitle = input.value.trim();
            handlers.onEditTask(task.taskId, newTitle);
            editTitleFormContainer.remove();
        }
    );

    const cancelButton = createButton(
        "cancel-button",
        "Cancel",
        () => {
            editTitleFormContainer.remove();
        }
    );

    editForm.appendChild(input);
    editForm.appendChild(updateButton);
    editForm.appendChild(cancelButton);
    editTitleFormContainer.appendChild(editForm);

    return editTitleFormContainer;
}

export function createTaskActionContainer(task: Task, handlers: todoListUiHandlers): HTMLDivElement {
    const taskActionsContainer = document.createElement("div");
    taskActionsContainer.className = "actions-container";

    const toggleStatusButton = createButton(
        "status-toggle-button",
        task.status === "done" ? "Undo" : "Done",
        () => handlers.onToggleStatus(task.taskId)
    );
    const deleteButton = createButton(
        "delete-button",
        "Delete",
        () => handlers.onDeleteTask(task.taskId)
    );
    const editButton = createButton(
        "edit-button",
        "Edit",
        () => {
            const editTitleFormContainer = createEditForm(task, handlers);
            document.body.appendChild(editTitleFormContainer);
        }
    );
    const priorityButton = createButton(
        `priority-button ${task.priority}`,
        task.priority === "high" ? "Low" : "High",
        () => handlers.onTogglePriority(task.taskId)
    );

    taskActionsContainer.appendChild(toggleStatusButton);
    taskActionsContainer.appendChild(editButton);
    taskActionsContainer.appendChild(deleteButton);
    taskActionsContainer.appendChild(priorityButton);

    return taskActionsContainer;
}
