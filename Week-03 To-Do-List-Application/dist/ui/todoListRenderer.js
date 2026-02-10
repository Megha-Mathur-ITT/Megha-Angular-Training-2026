import { createTaskListItem } from "./helpers/todoListDomBuilders.js";
export default class TodoListRenderer {
    constructor() {
        const element = document.getElementById("taskList-container");
        const messageElement = document.getElementById("input-message");
        if (!element) {
            throw new Error(`task-list container element not found`);
        }
        if (!messageElement) {
            throw new Error(`message element not found`);
        }
        this.taskListElement = element;
        this.messageElement = messageElement;
    }
    showMessage(message) {
        this.messageElement.textContent = message;
        this.messageElement.style.color = "red";
    }
    clearMessage() {
        this.messageElement.textContent = "";
    }
    renderEmptyState() {
        this.showMessage("No tasks yet, Add your first task.");
    }
    getSortedTaskList(tasks) {
        let pendingTasks = tasks.filter((currentTask) => (currentTask.status === "pending"));
        const highPriorityTasks = pendingTasks.filter((currentTask) => (currentTask.priority === "high"));
        const lowPriorityTasks = pendingTasks.filter((currentTask) => (currentTask.priority === "low"));
        pendingTasks = [...highPriorityTasks, ...lowPriorityTasks];
        const completedTasks = tasks.filter((currentTask) => (currentTask.status === "done"));
        const sortedTasks = [...pendingTasks, ...completedTasks];
        return sortedTasks;
    }
    renderTasks(tasks, handlers, todoListUiRenderer) {
        this.taskListElement.innerHTML = "";
        if (tasks.length === 0) {
            this.renderEmptyState();
            return;
        }
        const sortedTasks = this.getSortedTaskList(tasks);
        sortedTasks.forEach((task) => {
            const taskListItem = createTaskListItem(task, handlers, todoListUiRenderer);
            this.taskListElement.appendChild(taskListItem);
        });
    }
}
//# sourceMappingURL=todoListRenderer.js.map