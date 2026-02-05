import TodoListRemoveController from "../ui/RemoveController.js";
import { storage } from "../utils/storage.js";
export default function bindRemoveControls(service, refreshUI, todoListUiRenderer) {
    new TodoListRemoveController({
        onRemoveTask: (statusFilter, priorityFilter) => {
            const tasksList = storage.getTodoList();
            if (tasksList.length == 0) {
                todoListUiRenderer.showMessage("No tasks found. Please add tasks first!");
                return;
            }
            service.removeTasksByFilters(statusFilter, priorityFilter);
            refreshUI();
        }
    });
}
//# sourceMappingURL=bindRemoveController.js.map