import { TaskPriority } from "../types/todoListTypes";
type todoListInputHandler = {
    OnAddNewTask: (title: string, priority: TaskPriority) => void;
};
export default class TodoListInputController {
    taskInputElement: HTMLInputElement;
    addNewTaskButtonElement: HTMLButtonElement;
    prioritySelectElement: HTMLSelectElement;
    constructor(handlers: todoListInputHandler);
    handleAddNewTask(handlers: todoListInputHandler): void;
}
export {};
//# sourceMappingURL=todoListInputController.d.ts.map