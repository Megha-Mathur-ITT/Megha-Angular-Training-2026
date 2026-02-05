import TodoServices from "../services/todoListServices.js";
import TodoListRemoveController from "../ui/RemoveController.js";
import { storage } from "../utils/storage.js";
import TodoListRenderer from "../ui/todoListRenderer.js";
import type { RemoveStatusFilter, RemovePriorityFilter } from "../types/todoListTypes.js";

export default function bindRemoveControls(
    service: TodoServices,
    refreshUI: () => void,
    todoListUiRenderer: TodoListRenderer
) {
    new TodoListRemoveController({
        onRemoveTask: (statusFilter: RemoveStatusFilter, priorityFilter: RemovePriorityFilter) => {
            const tasksList = storage.getTodoList();
            
            if(tasksList.length == 0)
            {
                todoListUiRenderer.showMessage("No tasks found. Please add tasks first!");
                return;
            }

            service.removeTasksByFilters(statusFilter, priorityFilter);

            refreshUI();
        }
    })
}
