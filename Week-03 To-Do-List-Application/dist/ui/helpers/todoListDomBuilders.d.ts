import { todoListUiHandlers } from "../todoListRenderer.js";
import { Task } from "../../types/todoListTypes.js";
export declare function createToggleStatusButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
export declare function createEditButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
export declare function createDeleteButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
export declare function createPriorityButton(task: Task, handlers: todoListUiHandlers): HTMLButtonElement;
export declare function createTaskActionContainer(task: Task, handlers: todoListUiHandlers): HTMLDivElement;
export declare function createTaskInformationContainer(task: Task): HTMLDivElement;
export declare function createTaskListItem(task: Task, handlers: todoListUiHandlers): HTMLLIElement;
//# sourceMappingURL=todoListDomBuilders.d.ts.map