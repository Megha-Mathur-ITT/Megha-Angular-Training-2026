import { Task } from "../../../types/todoListTypes.js";
export type todoListUiHandlers = {
    onToggleStatus: (taskId: string) => void;
    onEditTask: (taskId: string, newTitle: string) => void;
    onDeleteTask: (taskId: string) => void;
    onTogglePriority: (taskId: string) => void;
};
export declare function createUpdateButton(task: Task, input: HTMLInputElement, editTitleFormContainer: HTMLDivElement, handlers: todoListUiHandlers): HTMLButtonElement;
export declare function createCancelButton(editTitleFormContainer: HTMLDivElement): HTMLButtonElement;
export declare function createEditButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
export declare function createTaskActionContainer(task: Task, handlers: todoListUiHandlers): HTMLDivElement;
//# sourceMappingURL=createTaskActionContainer.d.ts.map