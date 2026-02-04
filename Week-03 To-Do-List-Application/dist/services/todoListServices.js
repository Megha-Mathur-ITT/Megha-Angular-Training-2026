import { storage } from "../utils/storage.js";
export default class TodoServices {
    constructor() {
        this.tasksList = [];
        this.tasksList = storage.getTodoList();
    }
    removeTasksByFilters(statusFilter, priorityFilter) {
        this.tasksList = this.tasksList.filter((currentTask) => {
            const statusMatch = statusFilter === "all" ? true : currentTask.status === statusFilter;
            const priorityMatch = priorityFilter === "all" ? true : currentTask.priority === priorityFilter;
            const shouldRemove = statusMatch && priorityMatch;
            return !shouldRemove;
        });
        storage.saveTodoList(this.tasksList);
    }
    toggleTaskStatus(taskId) {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);
        if (!task) {
            return;
        }
        task.status = task.status === "pending" ? "done" : "pending";
        storage.saveTodoList(this.tasksList);
    }
    addTask(title, taskPriority) {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            return;
        }
        const newTask = {
            taskId: crypto.randomUUID(),
            title: trimmedTitle,
            createdAt: new Date().toLocaleString(),
            status: "pending",
            priority: taskPriority,
        };
        this.tasksList.push(newTask);
        storage.saveTodoList(this.tasksList);
    }
    editTask(taskId, newTaskTitle) {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);
        const trimmedTitle = newTaskTitle.trim();
        if (!task || !trimmedTitle) {
            return;
        }
        task.title = trimmedTitle;
        storage.saveTodoList(this.tasksList);
    }
    deleteTask(taskId) {
        this.tasksList = this.tasksList.filter((currentTask) => currentTask.taskId !== taskId);
        storage.saveTodoList(this.tasksList);
    }
    toggleTaskPriority(taskId) {
        const task = this.tasksList.find((currentTask) => currentTask.taskId === taskId);
        if (!task) {
            return;
        }
        const newPriority = task.priority === "high" ? "low" : "high";
        task.priority = newPriority;
        storage.saveTodoList(this.tasksList);
    }
}
//# sourceMappingURL=todoListServices.js.map