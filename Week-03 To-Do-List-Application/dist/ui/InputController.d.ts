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
    constructor(handlers: todoListInputHandler, todoListUiRenderer: TodoListRenderer);
    handleAddNewTask(handlers: todoListInputHandler): void;
}
export {};
//# sourceMappingURL=InputController.d.ts.map