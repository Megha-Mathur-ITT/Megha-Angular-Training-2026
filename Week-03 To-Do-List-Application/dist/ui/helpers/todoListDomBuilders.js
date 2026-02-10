import { createTaskActionContainer } from "./containers/createTaskActionContainer.js";
import { createTaskInformationContainer } from "./containers/createTaskInformationContainer.js";
export function createTaskListItem(task, handlers, todoListUiRenderer) {
    const listItem = document.createElement("li");
    listItem.className = "task-container";
    const taskInformationContainer = createTaskInformationContainer(task);
    const taskActionContainer = createTaskActionContainer(task, handlers, todoListUiRenderer);
    listItem.appendChild(taskInformationContainer);
    listItem.appendChild(taskActionContainer);
    return listItem;
}
//# sourceMappingURL=todoListDomBuilders.js.map