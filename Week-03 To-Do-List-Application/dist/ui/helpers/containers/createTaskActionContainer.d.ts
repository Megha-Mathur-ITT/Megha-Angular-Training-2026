import { Task } from "../../../types/todoListTypes.js";
import TodoListRenderer from "../../../ui/todoListRenderer.js";
export type todoListUiHandlers = {
    onToggleStatus: (taskId: string) => void;
    onEditTask: (taskId: string, newTitle: string) => void;
    onDeleteTask: (taskId: string) => void;
    onTogglePriority: (taskId: string) => void;
};
export declare function createTaskActionContainer(task: Task, handlers: todoListUiHandlers, todoListUiRenderer: TodoListRenderer): HTMLDivElement;
//# sourceMappingURL=createTaskActionContainer.d.ts.map