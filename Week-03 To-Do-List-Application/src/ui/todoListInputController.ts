type todoListInputHandler = {
    OnAddNewTask: (title: string) => void;
};

export default class TodoListInputController {
    taskInputElement: HTMLInputElement;
    addNewTaskButtonElement: HTMLButtonElement;

    constructor(handlers: todoListInputHandler) {
        const inputField = document.getElementById("taskInput") as HTMLInputElement;
        const addNewTaskButton = document.getElementById("addNewTaskButton") as HTMLButtonElement;

        if (!inputField) {
            throw new Error(`Element "${inputField} is not found."`);
        }

        if (!addNewTaskButton) {
            throw new Error(`Element "${addNewTaskButton} is not found."`);
        }

        this.taskInputElement = inputField;
        this.addNewTaskButtonElement = addNewTaskButton;

        this.addNewTaskButtonElement.addEventListener("click", () => {
            this.handleAddNewTask(handlers)
        })

        this.taskInputElement.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "enter") {
                this.handleAddNewTask(handlers);
            }
        })
    }

    handleAddNewTask(handlers: todoListInputHandler): void {
        const title = this.taskInputElement.value.trim();

        if (!title) {
            return;
        }

        handlers.OnAddNewTask(title);
        this.taskInputElement.value = "";
    }
}