export default class TodoListInputController {
    constructor(handlers) {
        const inputField = document.getElementById("taskInput");
        const addNewTaskButton = document.getElementById("addNewTaskButton");
        if (!inputField) {
            throw new Error(`Element "${inputField} is not found."`);
        }
        if (!addNewTaskButton) {
            throw new Error(`Element "${addNewTaskButton} is not found."`);
        }
        this.taskInputElement = inputField;
        this.addNewTaskButtonElement = addNewTaskButton;
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
            return;
        }
        handlers.OnAddNewTask(title);
        this.taskInputElement.value = "";
    }
}
//# sourceMappingURL=todoListInputController.js.map