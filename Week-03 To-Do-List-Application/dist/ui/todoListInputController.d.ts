type todoListInputHandler = {
    OnAddNewTask: (title: string) => void;
};
export default class TodoListInputController {
    taskInputElement: HTMLInputElement;
    addNewTaskButtonElement: HTMLButtonElement;
    constructor(handlers: todoListInputHandler);
    handleAddNewTask(handlers: todoListInputHandler): void;
}
export {};
//# sourceMappingURL=todoListInputController.d.ts.map