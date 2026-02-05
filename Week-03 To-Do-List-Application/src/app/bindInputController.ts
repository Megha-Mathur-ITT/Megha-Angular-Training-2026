import TodoServices from "../services/todoListServices.js";
import TodoListInputController from "../ui/InputController.js";
import TodoListRenderer from "../ui/todoListRenderer.js";
import type { TaskPriority } from "../types/todoListTypes.js";

export default function bindInputController(
    service: TodoServices,
    refreshUI: () => void,
    todoListUirenderer: TodoListRenderer
) {
    new TodoListInputController({
        OnAddNewTask: (title: string, priority: TaskPriority) => {
            service.addTask(title, priority );
            
            refreshUI();
        }
    },todoListUirenderer);
}
