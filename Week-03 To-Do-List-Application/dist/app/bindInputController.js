import TodoListInputController from "../ui/InputController.js";
export default function bindInputController(service, refreshUI, todoListUirenderer) {
    new TodoListInputController({
        OnAddNewTask: (title, priority) => {
            service.addTask(title, priority);
            refreshUI();
        }
    }, todoListUirenderer);
}
//# sourceMappingURL=bindInputController.js.map