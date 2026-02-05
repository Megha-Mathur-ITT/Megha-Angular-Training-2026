export default class TodoListInputController {
    constructor(handlers, todoListUiRenderer) {
        const inputField = document.getElementById("taskInput");
        const addNewTaskButton = document.getElementById("addNewTaskButton");
        const prioritySelect = document.getElementById("prioritySelect");
        if (!inputField) {
            throw new Error(`Element "${inputField} is not found."`);
        }
        if (!addNewTaskButton) {
            throw new Error(`Element "${addNewTaskButton} is not found."`);
        }
        if (!prioritySelect) {
            throw new Error(`Element "${prioritySelect} is not found."`);
        }
        this.taskInputElement = inputField;
        this.addNewTaskButtonElement = addNewTaskButton;
        this.prioritySelectElement = prioritySelect;
        this.todoListUiRenderer = todoListUiRenderer;
        this.addNewTaskButtonElement.addEventListener("click", () => {
            this.handleAddNewTask(handlers);
        });
        this.taskInputElement.addEventListener("keydown", (event) => {
            if (event.key.toLowerCase() === "enter") {
                this.handleAddNewTask(handlers);
            }
        });
    }
    handleAddNewTask(handlers) {
        const title = this.taskInputElement.value.trim();
        if (!title) {
            this.todoListUiRenderer.showMessage("Task cannot be empty. Please enter a task title");
            return;
        }
        const priority = this.prioritySelectElement.value;
        handlers.OnAddNewTask(title, priority);
        this.taskInputElement.value = "";
        this.todoListUiRenderer.clearMessage();
    }
}
//# sourceMappingURL=InputController.js.map