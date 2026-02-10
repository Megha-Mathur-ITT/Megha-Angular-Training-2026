
import TodoListRenderer from "../ui/todoListRenderer.js";
import { TaskPriority } from "../types/todoListTypes";

type todoListInputHandler = {
    OnAddNewTask: (title: string, priority: TaskPriority) => void;
};

export default class TodoListInputController {
    taskInputElement: HTMLInputElement;
    addNewTaskButtonElement: HTMLButtonElement;
    prioritySelectElement: HTMLSelectElement;
    todoListUiRenderer: TodoListRenderer;

    constructor(handlers: todoListInputHandler, todoListUiRenderer: TodoListRenderer) {
        const inputField = document.getElementById("taskInput") as HTMLInputElement;
        const addNewTaskButton = document.getElementById("addNewTaskButton") as HTMLButtonElement;
        const prioritySelect = document.getElementById("prioritySelect") as HTMLSelectElement | null;

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
            this.todoListUiRenderer.showMessage("Task cannot be empty. Please enter a task title");
            return;
        }

        const priority = this.prioritySelectElement.value as TaskPriority;

        try {
            handlers.OnAddNewTask(title, priority);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.todoListUiRenderer.showMessage(error.message);
            }
        }

        this.taskInputElement.value = "";
        this.todoListUiRenderer.clearMessage();
    }
}
