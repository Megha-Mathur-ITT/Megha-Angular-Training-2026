import { todoListUiHandlers } from "../todoListRenderer.js";
import { createTaskActionContainer } from "./containers/createTaskActionContainer.js";
import { createTaskInformationContainer } from "./containers/createTaskInformationContainer.js";
import { Task } from "../../types/todoListTypes.js";

export function createTaskListItem(task: Task, handlers: todoListUiHandlers): HTMLLIElement {
    const listItem = document.createElement("li");
    listItem.className = "task-container";

    const taskInformationContainer = createTaskInformationContainer(task);
    const taskActionContainer = createTaskActionContainer(task, handlers);

    listItem.appendChild(taskInformationContainer);
    listItem.appendChild(taskActionContainer);

    return listItem;
}
